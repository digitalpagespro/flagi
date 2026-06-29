import { Pressable, StyleSheet, Text } from 'react-native';

export type AnswerState = 'idle' | 'correct' | 'wrong';

type AnswerButtonProps = {
  title: string;
  state: AnswerState;
  disabled: boolean;
  onPress: () => void;
};

export function AnswerButton({ title, state, disabled, onPress }: AnswerButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        state === 'correct' && styles.correct,
        state === 'wrong' && styles.wrong,
        pressed && !disabled && styles.pressed,
      ]}
    >
      <Text numberOfLines={2} adjustsFontSizeToFit style={styles.text}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    minHeight: 58,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderWidth: 3,
    borderColor: '#90caf9',
  },
  correct: {
    backgroundColor: '#43a047',
    borderColor: '#2e7d32',
  },
  wrong: {
    backgroundColor: '#e53935',
    borderColor: '#b71c1c',
  },
  pressed: {
    transform: [{ scale: 0.98 }],
  },
  text: {
    color: '#263238',
    fontSize: 21,
    fontWeight: '800',
    textAlign: 'center',
  },
});
