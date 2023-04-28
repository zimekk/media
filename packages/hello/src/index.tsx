import { useEffect, useState } from "react";
// import { Text, View } from "react-native";

const Text = 'div'
const View = 'div'

function Loading() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

// https://docs.expo.dev/guides/environment-variables/#using-babel-to-inline-environment-variables-during-build-time
const { API_URL = '' } = process.env;

export function Hello() {
  const [data, setData] = useState<object | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/api/hello`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch(console.error);
  }, []);
  
  if (data === null) return <Loading />;

  return (
    <View>
      <Text>{`API_URL: ${API_URL}`}</Text>
      <Text>{JSON.stringify(data)}</Text>
    </View>
  );
}
