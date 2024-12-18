import { FlatList } from "react-native";
import AnswerOption from "./AnswerOption";
import Card from "./Card";
import { useQuizContext } from "../providers/QuizProvider";

export default function QuestionCard() {
  const { question, selectedOption, setSelectedOption } = useQuizContext();

  const handleSelectOption = (option: string) => {
    setSelectedOption((prev) => (prev === option ? "" : option));
  };
  return (
    <Card title={question?.title as string}>
      <FlatList
        data={question?.options}
        contentContainerStyle={{ gap: 10 }}
        renderItem={({ item }) => <AnswerOption option={item} />}
        keyExtractor={(item) => item}
      />
    </Card>
  );
}
