import { StyleSheet, Text, View } from 'react-native';

type FlagCardProps = {
  flag: string;
};

export function FlagCard({ flag }: FlagCardProps) {
  return (
    <View style={styles.card}>
      <Text accessibilityLabel={`Flaga ${flag}`} style={styles.flag}>
        {flag}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    minHeight: 172,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderWidth: 4,
    borderColor: '#ffd166',
    elevation: 5,
    shadowColor: '#263238',
    shadowOpacity: 0.16,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  flag: {
    fontSize: 116,
    lineHeight: 132,
  },
});
