import { useMemo, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import countriesJson from './data/countries.json';
import { DifficultyScreen } from './screens/DifficultyScreen';
import { HomeScreen } from './screens/HomeScreen';
import { QuizScreen } from './screens/QuizScreen';
import { ResultScreen } from './screens/ResultScreen';
import { Country, CountryFromJson, Difficulty } from './types';

type Screen = 'home' | 'difficulty' | 'quiz' | 'result';

const TOTAL_QUESTIONS = 20;

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [lastScore, setLastScore] = useState(0);

  const countries = useMemo(() => {
    return (countriesJson as CountryFromJson[]).map((country) => ({
      ...country,
      flag: codeToFlag(country.code),
    }));
  }, []);

  function startQuiz(selectedDifficulty: Difficulty) {
    setDifficulty(selectedDifficulty);
    setLastScore(0);
    setScreen('quiz');
  }

  function finishQuiz(score: number) {
    setLastScore(score);
    setScreen('result');
  }

  return (
    <>
      <StatusBar style="dark" />
      {screen === 'home' && <HomeScreen onPlay={() => setScreen('difficulty')} />}
      {screen === 'difficulty' && (
        <DifficultyScreen onSelect={startQuiz} onBack={() => setScreen('home')} />
      )}
      {screen === 'quiz' && (
        <QuizScreen countries={countries} difficulty={difficulty} onFinish={finishQuiz} />
      )}
      {screen === 'result' && (
        <ResultScreen
          score={lastScore}
          totalQuestions={TOTAL_QUESTIONS}
          onPlayAgain={() => startQuiz(difficulty)}
          onHome={() => setScreen('home')}
        />
      )}
    </>
  );
}

function codeToFlag(code: string): string {
  if (code === 'XK') {
    return '🇽🇰';
  }

  // Kody ISO zamieniamy lokalnie na znaki flag Unicode, bez pobierania obrazów z Internetu.
  return code
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}
