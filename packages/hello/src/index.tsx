import { useEffect, useState } from "react";
import { Text, View } from "react-native";

function Loading() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export function Hello() {
  const [data, setData] = useState<object | null>(null);

  useEffect(() => {
    // fetch(`${NEXT_PUBLIC_API_URL}/api/hello`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setData(data);
    //   })
    //   .catch(console.error);
  }, []);

  if (data === null) return <Loading />;

  return (
    <View>
      <Text>{`API_URL: ${NEXT_PUBLIC_API_URL}`}</Text>
      <Text>{JSON.stringify(data)}</Text>
    </View>
  );
}
