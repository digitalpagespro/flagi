import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from '../components/PrimaryButton';
import { Difficulty } from '../types';

type DifficultyScreenProps = {
  onSelect: (difficulty: Difficulty) => void;
  onBack: () => void;
};

export function DifficultyScreen({ onSelect, onBack }: DifficultyScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Wybierz poziom</Text>
          <Text style={styles.subtitle}>Każda gra ma 20 pytań</Text>
        </View>

        <View style={styles.actions}>
          <PrimaryButton title="Łatwy" onPress={() => onSelect('easy')} />
          <PrimaryButton title="Średni" variant="secondary" onPress={() => onSelect('medium')} />
          <PrimaryButton title="Trudny" variant="danger" onPress={() => onSelect('hard')} />
        </View>

        <PrimaryButton title="Wróć" variant="secondary" onPress={onBack} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#c8e6c9',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 34,
  },
  header: {
    alignItems: 'center',
    gap: 8,
    paddingTop: 34,
  },
  title: {
    color: '#102033',
    fontSize: 36,
    fontWeight: '900',
    textAlign: 'center',
  },
  subtitle: {
    color: '#455a64',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  actions: {
    gap: 16,
  },
});
