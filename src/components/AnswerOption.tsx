import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { useQuizContext } from "../providers/QuizProvider";

interface Props {
  option: string;
}

export default function AnswerOption({ option }: Props) {
  const { selectedOption, setSelectedOption } = useQuizContext();
  const isSelected = selectedOption === option;
  return (
    <Pressable
      onPress={() => setSelectedOption(option)}
      style={[
        styles.container,
        isSelected && {
          backgroundColor: "#e1f396",
          borderColor: "#b3d94d",
        },
      ]}
    >
      <Text>{option}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "lightgray",
    padding: 20,
    borderRadius: 100,
  },
});
