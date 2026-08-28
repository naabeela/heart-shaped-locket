import { useEffect, useRef, useState } from "react";

/** Optional ambient room tone: soft filtered tape hiss. Never autoplays. */
export function RoomTone() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    return () => {
      void ctxRef.current?.close();
      ctxRef.current = null;
    };
  }, []);

  const toggle = () => {
    if (on) {
      const g = gainRef.current;
      const ctx = ctxRef.current;
      if (g && ctx) g.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
      setOn(false);
      return;
    }
    let ctx = ctxRef.current;
    if (!ctx) {
      ctx = new AudioContext();
      ctxRef.current = ctx;
      const bufferSize = ctx.sampleRate * 4;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let last = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        last = (last + 0.02 * white) / 1.02;
        data[i] = last * 3.2;
      }
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      src.loop = true;
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 900;
      const gain = ctx.createGain();
      gain.gain.value = 0.0001;
      src.connect(filter).connect(gain).connect(ctx.destination);
      src.start();
      gainRef.current = gain;
    }
    void ctx.resume();
    gainRef.current?.gain.linearRampToValueAtTime(0.045, ctx.currentTime + 1.2);
    setOn(true);
  };

  return (
    <button
      onClick={toggle}
      aria-pressed={on}
      className="meta fixed bottom-4 left-4 z-40 border border-border bg-paper/85 px-2.5 py-1.5 text-muted-foreground backdrop-blur-[2px] transition-colors hover:border-madder hover:text-madder"
    >
      {on ? "ROOM TONE · ON" : "ROOM TONE · OFF"}
    </button>
  );
}
