import { useEffect, useState } from 'react';

export default function useVoiceInput() {
  const [voiceText, setVoiceText] = useState('');

  useEffect(() => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = true;
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      setVoiceText(transcript);
    };

    recognition.start();

    return () => recognition.stop();
  }, []);

  return voiceText;
}