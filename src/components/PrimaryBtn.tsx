import { ReactNode } from "react";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface Props extends PressableProps {
  title: string;
  rightIcon?: ReactNode;
}

export default function PrimaryBtn({ title, rightIcon, ...props }: Props) {
  return (
    <Pressable {...props} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
      <View style={styles.buttonIcon}>{rightIcon}</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#005055",
    padding: 20,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
    letterSpacing: 1.5,
  },

  buttonIcon: {
    position: "absolute",
    right: 20,
  },
});
