import { BackHandler, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from '../components/PrimaryButton';

type HomeScreenProps = {
  onPlay: () => void;
};

export function HomeScreen({ onPlay }: HomeScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.titleBox}>
          <Text style={styles.emoji}>🌍</Text>
          <Text style={styles.title}>Jaka To Flaga?</Text>
          <Text style={styles.subtitle}>Quiz flag państw świata</Text>
        </View>

        <View style={styles.actions}>
          <PrimaryButton title="Graj" onPress={onPlay} />
          <PrimaryButton title="Zakończ" variant="danger" onPress={() => BackHandler.exitApp()} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#b3e5fc',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 34,
  },
  titleBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  emoji: {
    fontSize: 78,
  },
  title: {
    color: '#102033',
    fontSize: 40,
    fontWeight: '900',
    textAlign: 'center',
  },
  subtitle: {
    color: '#37474f',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  actions: {
    width: '100%',
    gap: 16,
  },
});
