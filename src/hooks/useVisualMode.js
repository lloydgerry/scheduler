import React, {useState} from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);


  const transition = (newMode) => {
    setMode(newMode);
    history.push(newMode);
  }

  const back = () => {
    const h = history;
    if ((h[h.length - 2] === h[h.length - 1]) || (h.length <= 1 )) {
      return;
    } else {
    h.pop(h.length - 1)
    return setMode(h[h.length - 1]);
    }
  }

  const replace = () => {
    setHistory(mode);
  }

  return { mode, transition, back, replace };
}