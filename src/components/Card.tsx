import { PropsWithChildren } from "react";
import { StyleSheet, View, Text } from "react-native";

interface Props {
  title: string;
}

export default function Card({ title, children }: PropsWithChildren<Props>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingVertical: 40,
    borderRadius: 20,
    backgroundColor: "#fff",

    // shadows
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 20,
  },
});
