import { StyleSheet, Text, View } from 'react-native';

type ProgressHeaderProps = {
  questionNumber: number;
  totalQuestions: number;
  score: number;
};

export function ProgressHeader({ questionNumber, totalQuestions, score }: ProgressHeaderProps) {
  return (
    <View style={styles.row}>
      <View style={styles.pill}>
        <Text style={styles.label}>Pytanie</Text>
        <Text style={styles.value}>
          {questionNumber}/{totalQuestions}
        </Text>
      </View>
      <View style={styles.pill}>
        <Text style={styles.label}>Punkty</Text>
        <Text style={styles.value}>{score}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: '100%',
    flexDirection: 'row',
    gap: 12,
  },
  pill: {
    flex: 1,
    minHeight: 58,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#4dd0e1',
  },
  label: {
    color: '#546e7a',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  value: {
    color: '#102033',
    fontSize: 24,
    fontWeight: '900',
  },
});
