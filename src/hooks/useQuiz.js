import { useState, useEffect } from "react";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

async function fetchAudio(word) {
  const res = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  const data = await res.json();

  const usAudio = data[0]?.phonetics.find((p) =>
    p.audio.includes("_us_")
  )?.audio;

  const fallback = data[0]?.phonetics.find((p) => p.audio)?.audio;

  const selectedAudio = usAudio || fallback;

  return selectedAudio?.startsWith("http")
    ? selectedAudio
    : `https:${selectedAudio}`;
}

export default function useQuiz(wordBank, maxRounds = 5) {
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);

  const nextRound = async () => {
    const correct = wordBank[Math.floor(Math.random() * wordBank.length)];
    const wrong = shuffle(wordBank.filter((w) => w !== correct)).slice(0, 4);
    const opts = shuffle([correct, ...wrong]);
    setAnswer(correct);
    setOptions(opts);
    setFeedback("");
    const audio = await fetchAudio(correct);
    setAudioUrl(audio);
  };

  useEffect(() => {
    nextRound();
  }, []);

  const select = (word) => {
    const isCorrect = word === answer;
    if (isCorrect) setScore((prev) => prev + 1);
    setFeedback(
      isCorrect ? "Muito Bem! Acertou!" : `Que Pena! Errou, era "${answer}"`
    );

    setTimeout(() => {
      if (round + 1 < maxRounds) {
        setRound((prev) => prev + 1);
        nextRound();
      } else {
        setFeedback(
          `Fim de Jogo! Score final: ${isCorrect ? score + 1 : score}`
        );
        setIsGameOver(true);
      }
    }, 1000);
  };

  const reset = () => {
    setScore(0);
    setRound(0);
    setFeedback("");
    setIsGameOver(false);
    nextRound();
  };

  return {
    round,
    score,
    options,
    audioUrl,
    feedback,
    isGameOver,
    select,
    reset,
    maxRounds,
  };
}
