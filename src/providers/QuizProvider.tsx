import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface QuizContextType {
  question: Question | null;
  questionIndex: number;
  score: number;
  selectedOption: string;
  setSelectedOption: Dispatch<SetStateAction<string>>;
  handleNext: () => void;
  total: number;
  bestScore: number;
}
import questions from "../questions";
import { Question } from "../types";

const QuizContext = createContext<QuizContextType>({
  question: null,
  questionIndex: 0,
  selectedOption: "",
  setSelectedOption: () => {},
  score: 0,
  handleNext: () => {},
  total: 0,
  bestScore: 0,
});

export default function QuizProvider({ children }: PropsWithChildren) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const question = questions[questionIndex];
  const isFinished = questionIndex >= questions.length;

  const restart = () => {
    setQuestionIndex(0);
    setSelectedOption("");
    setScore(0);
  };

  const handleNext = () => {
    if (isFinished) return restart();

    setQuestionIndex((prev) =>
      prev <= questions.length - 1 ? prev + 1 : prev
    );
    setScore((prev) => {
      if (selectedOption === question?.correctAnswer) return prev + 1;
      return prev;
    });
  };

  useEffect(() => {
    if (isFinished && score > bestScore) {
      setBestScore(score);
      saveBestScore(score);
    }
  }, [isFinished]);

  useEffect(() => {
    const fetchBestScore = async () => {
      const score = await AsyncStorage.getItem("best-score");
      if (score) setBestScore(Number.parseInt(score));
    };
    fetchBestScore();
  }, []);

  const saveBestScore = async (value: number) => {
    try {
      await AsyncStorage.setItem("best-score", value.toString());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <QuizContext.Provider
      value={{
        question,
        questionIndex,
        selectedOption,
        setSelectedOption,
        score,
        handleNext,
        total: questions.length,
        bestScore,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export const useQuizContext = () => useContext(QuizContext);
