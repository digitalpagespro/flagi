import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from '../components/PrimaryButton';

type ResultScreenProps = {
  score: number;
  totalQuestions: number;
  onPlayAgain: () => void;
  onHome: () => void;
};

export function ResultScreen({ score, totalQuestions, onPlayAgain, onHome }: ResultScreenProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const message = getResultMessage(percentage);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.resultBox}>
          <Text style={styles.title}>Wynik</Text>
          <Text style={styles.score}>
            {score}/{totalQuestions}
          </Text>
          <Text style={styles.percent}>{percentage}% poprawnych odpowiedzi</Text>
          <Text style={styles.message}>{message}</Text>
        </View>

        <View style={styles.actions}>
          <PrimaryButton title="Zagraj ponownie" onPress={onPlayAgain} />
          <PrimaryButton title="Ekran startowy" variant="secondary" onPress={onHome} />
        </View>
      </View>
    </SafeAreaView>
  );
}

function getResultMessage(percentage: number): string {
  if (percentage >= 90) {
    return 'Mistrz geografii';
  }

  if (percentage >= 70) {
    return 'Świetny wynik';
  }

  if (percentage >= 50) {
    return 'Dobrze';
  }

  return 'Ćwicz dalej';
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e1bee7',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 34,
  },
  resultBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  title: {
    color: '#102033',
    fontSize: 38,
    fontWeight: '900',
  },
  score: {
    color: '#ff6f00',
    fontSize: 76,
    fontWeight: '900',
  },
  percent: {
    color: '#263238',
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
  },
  message: {
    color: '#00695c',
    fontSize: 30,
    fontWeight: '900',
    textAlign: 'center',
  },
  actions: {
    gap: 16,
  },
});
