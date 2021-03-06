import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    if (replace) {
      setHistory(prev => {
        return [...prev.slice(0, prev.length - 1), mode]
      })
    }
    else {
      setHistory(prev => {
        return [...prev, mode]
      })
    }
  }

  const back = () => {
    if (history.length < 2) {
      return;
    }
    setHistory(prev => {
      return [...prev.slice(0, history.length - 1)]
    });
  }


  return { mode: history[history.length - 1], transition, back };






}