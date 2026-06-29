import { useEffect, useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { AnswerButton, AnswerState } from '../components/AnswerButton';
import { FlagCard } from '../components/FlagCard';
import { ProgressHeader } from '../components/ProgressHeader';
import { Country, Difficulty, QuizQuestion } from '../types';

type QuizScreenProps = {
  countries: Country[];
  difficulty: Difficulty;
  onFinish: (score: number) => void;
};

const QUESTION_COUNT = 20;

export function QuizScreen({ countries, difficulty, onFinish }: QuizScreenProps) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const questions = useMemo(
    () => buildQuestions(countries, difficulty, QUESTION_COUNT),
    [countries, difficulty],
  );

  const currentQuestion = questions[questionIndex];

  useEffect(() => {
    setQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
  }, [difficulty]);

  function handleAnswer(answer: string) {
    if (selectedAnswer || !currentQuestion) {
      return;
    }

    const isCorrect = answer === currentQuestion.correct.name;
    const nextScore = isCorrect ? score + 1 : score;

    setSelectedAnswer(answer);
    if (isCorrect) {
      setScore(nextScore);
    }

    // Krótka pauza pozwala dziecku zobaczyć kolor odpowiedzi przed następną flagą.
    setTimeout(() => {
      const isLastQuestion = questionIndex + 1 >= questions.length;

      if (isLastQuestion) {
        onFinish(nextScore);
        return;
      }

      setQuestionIndex((current) => current + 1);
      setSelectedAnswer(null);
    }, 1000);
  }

  if (!currentQuestion) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ProgressHeader
          questionNumber={questionIndex + 1}
          totalQuestions={QUESTION_COUNT}
          score={score}
        />

        <View style={styles.questionArea}>
          <Text style={styles.prompt}>Czyja to flaga?</Text>
          <FlagCard flag={currentQuestion.correct.flag} />
        </View>

        <View style={styles.answers}>
          {currentQuestion.answers.map((answer) => (
            <AnswerButton
              key={answer}
              title={answer}
              disabled={Boolean(selectedAnswer)}
              state={getAnswerState(answer, selectedAnswer, currentQuestion.correct.name)}
              onPress={() => handleAnswer(answer)}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

function buildQuestions(
  countries: Country[],
  difficulty: Difficulty,
  questionCount: number,
): QuizQuestion[] {
  const pool = difficulty === 'hard'
    ? countries
    : countries.filter((country) => country.difficulty === difficulty);
  const selectedCountries = shuffle(pool).slice(0, questionCount);

  return selectedCountries.map((correct) => {
    const wrongAnswers = shuffle(countries.filter((country) => country.name !== correct.name))
      .slice(0, 3)
      .map((country) => country.name);

    return {
      correct,
      answers: shuffle([correct.name, ...wrongAnswers]),
    };
  });
}

function getAnswerState(answer: string, selectedAnswer: string | null, correctAnswer: string): AnswerState {
  if (!selectedAnswer) {
    return 'idle';
  }

  if (answer === correctAnswer) {
    return 'correct';
  }

  return answer === selectedAnswer ? 'wrong' : 'idle';
}

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff3e0',
  },
  container: {
    flex: 1,
    gap: 18,
    paddingHorizontal: 18,
    paddingVertical: 20,
  },
  questionArea: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  prompt: {
    color: '#102033',
    fontSize: 30,
    fontWeight: '900',
    textAlign: 'center',
  },
  answers: {
    gap: 10,
    paddingBottom: 8,
  },
});
