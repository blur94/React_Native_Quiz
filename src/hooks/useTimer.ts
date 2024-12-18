import { Fragment, useEffect, useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { styles } from "../app/QuizScreen";
import questions from "../questions";
import { useQuizContext } from "../providers/QuizProvider";

export const useTimer = ({
  initialTime = 20,
  dep,
  onNext,
}: {
  initialTime: number;
  dep: any;
  onNext: () => void;
}) => {
  const [time, setTime] = useState(initialTime);
  useEffect(() => {
    if (dep) {
      const interval = setInterval(() => {
        setTime((prev) => {
          if (prev === 0) {
            onNext && onNext();
            return 20;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [dep]);

  return { time };
};
