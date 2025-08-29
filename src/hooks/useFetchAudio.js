import { useRef, useState } from "react";

export function useFetchAudio() {
  const cache = useRef({});
  const [loadingWord, setLoadingWord] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);

  const fetchAudio = async (word) => {
    if (cache.current[word]) {
      setAudioUrl(cache.current[word]);
      return;
    }

    setLoadingWord(word);
    setAudioUrl(null);

    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const data = await res.json();
      const phonetic =
        data[0]?.phonetics.find((p) => p.audio)?.audio ||
        data[0]?.phonetics[0]?.audio;

      if (phonetic) {
        const finalUrl = phonetic.startsWith("http")
          ? phonetic
          : `https:${phonetic}`;
        cache.current[word] = finalUrl;
        setAudioUrl(finalUrl);
      } else {
        alert("Áudio não encontrado.");
      }
    } catch {
      alert("Erro ao buscar a pronúncia.");
    } finally {
      setLoadingWord(null);
    }
  };

  return { fetchAudio, audioUrl, loadingWord };
}
