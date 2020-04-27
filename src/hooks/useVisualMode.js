import { useState } from "react";

export default function useVisualMode(starting) {

  const [mode, setMode] = useState(starting);
  const [history, setHistory] = useState([starting]);

  function transition(newMode, replace = false) {
    const historyUpdate = [...history];
    if (replace) {
      historyUpdate.pop();
    }
    historyUpdate.push(newMode);
    setHistory(historyUpdate);
    setMode(newMode);
  }

  function back() {
    const historyUpdate = [...history];
    if (historyUpdate.length > 1) {
      historyUpdate.pop();
      setMode(historyUpdate[historyUpdate.length - 1]);
      setHistory(historyUpdate);
    }
  }
  return { mode, transition, back };
}