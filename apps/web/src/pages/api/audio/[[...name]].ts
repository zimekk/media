// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createReadStream, statSync } from "node:fs";
import { resolve } from "node:path";
import { glob } from "glob";
import mime from "mime-types";
import { parseFile } from "music-metadata";

const { INIT_CWD = "", SHARE_PATH = "../../share" } = process.env;

const cwd = resolve(INIT_CWD, SHARE_PATH);

console.info(`Audio share path: ${cwd}`);

// https://nextjs.org/docs/messages/api-routes-response-size-limit#possible-ways-to-fix-it
export const config = {
  api: {
    responseLimit: false,
    // responseLimit: '8mb',
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { headers, query } = req;
  const { name } = query;
  if (name) {
    // https://medium.com/@yelee2369/node-js-streaming-audio-files-10dd5e8670d0
    const filepath = `${cwd}/${Array.isArray(name) ? name[0] : name}`;
    const { size } = statSync(filepath);
    const { range = "" } = headers;
    const [start, end] = (([_, start, end]) => [
      Number(start),
      end ? Number(end) : size - 1,
    ])(range.match(/bytes=(\d+)-(\d*)/) || []) as [number, number];
    Object.entries(
      Object.assign(
        ((type) => (type ? { "Content-Type": mime.lookup(filepath) } : {}))(
          mime.lookup(filepath)
        ),
        !isNaN(start)
          ? {
              "Content-Length": `${end - start + 1}`,
              "Content-Range": `bytes ${start}-${end}/${size}`,
            }
          : {}
      )
    ).forEach(([name, value]) => value && res.setHeader(name, value));
    createReadStream(filepath, !isNaN(start) ? { start, end } : {}).pipe(
      res.status(isNaN(start) ? 200 : 206)
    );
  } else {
    const list = await glob("**/*.{flac,mp3,wav}", {
      cwd,
    });

    // const encoding = "base64";

    list
      .reduce(
        (promise, name) =>
          promise.then((list) =>
            parseFile(`${cwd}/${name}`).then(
              ({
                common: { year, album, title, artists, picture },
                format: { duration },
              }) =>
                list.concat({
                  name,
                  year,
                  title,
                  album,
                  artists,
                  // picture2: picture?.map(
                  //   ({ format, data }) =>
                  //     `data:${format};${encoding},${data.toString(encoding)}`
                  // ),
                  picture: picture?.map(({ format, data }) =>
                    URL.createObjectURL(new Blob([data], { type: format }))
                  ),
                  duration,
                })
            )
          ),
        Promise.resolve([]) as Promise<any>
      )
      .then((data) => res.status(200).json(data));
  }
}
