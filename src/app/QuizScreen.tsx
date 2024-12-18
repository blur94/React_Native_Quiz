import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import QuestionCard from "../components/QuestionCard";
import { FontAwesome6 } from "@expo/vector-icons";
import PrimaryBtn from "../components/PrimaryBtn";
import React, { Fragment } from "react";
import { useQuizContext } from "../providers/QuizProvider";
import questions from "../questions";
import Card from "../components/Card";
import { useTimer } from "../hooks/useTimer";
import LottieView from "lottie-react-native";

export default function QuizScreen() {
  const { questionIndex, handleNext, question, score, total, bestScore } =
    useQuizContext();
  const { time } = useTimer({
    initialTime: 20,
    dep: question,
    onNext: handleNext,
  });

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        <View>
          {questionIndex <= questions.length - 1 && (
            <Text style={styles.title}>
              Question {`${questionIndex + 1}/${total}`}
            </Text>
          )}
        </View>

        {question ? (
          <Fragment>
            <QuestionCard />
            <Text style={styles.time}>{time} sec</Text>
          </Fragment>
        ) : (
          <>
            <LottieView
              autoPlay
              source={require("../../assets/party.json")}
              style={StyleSheet.absoluteFill}
              // loop={false}
            />
            <Card title="Well done">
              <Text>
                Correct answers: {score}/{total}
              </Text>
              <Text>Best score: {bestScore}</Text>
            </Card>
          </>
        )}

        <PrimaryBtn
          title="Next"
          rightIcon={
            <FontAwesome6 name="arrow-right-long" size={16} color="#fff" />
          }
          onPress={handleNext}
          onLongPress={() => console.warn("long Pressed")}
        />
      </View>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#fdfef4",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  title: {
    textAlign: "center",
    color: "#005055",
  },
  time: {
    marginTop: 15,
    textAlign: "center",
    color: "#005055",
    fontWeight: "bold",
  },
});
