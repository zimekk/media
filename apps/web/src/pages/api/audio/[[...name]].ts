// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createReadStream, statSync } from "fs";
import { glob } from "glob";
import { resolve } from "path";

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
  const { name } = req.query;
  if (name) {
    // https://medium.com/@yelee2369/node-js-streaming-audio-files-10dd5e8670d0
    const filepath = `${cwd}/${Array.isArray(name) ? name[0] : name}`;
    const { size } = statSync(filepath);
    const { range = "" } = req.headers;
    const [start, end] = (([_, start, end]) => [
      Number(start),
      end ? Number(end) : size - 1,
    ])(range.match(/bytes=(\d+)-(\d*)/) || []) as [number, number];
    Object.entries({
      "Content-Type": "audio/flac",
      "Content-Length": end - start + 1,
      "Content-Range": `bytes ${start}-${end}/${size}`,
    }).forEach(([name, value]) => res.setHeader(name, value));
    createReadStream(filepath, { start, end }).pipe(res.status(206));
  } else {
    res.status(200).json(
      await glob("**/*.flac", {
        cwd,
      })
    );
  }
}
