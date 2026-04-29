import { useEffect, useState } from "react";

type State = { progress: number; active: boolean };

export function useChamberProgress(panelId: number, videoRef?: React.RefObject<HTMLVideoElement | null>) {
  const [state, setState] = useState<State>({ progress: 0, active: false });

  useEffect(() => {
    let raf = 0;
    let lastP = -1;
    let lastA = false;

    const tick = () => {
      const journey = document.querySelector<HTMLElement>("[data-journey]");
      if (!journey) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const rect = journey.getBoundingClientRect();
      const scrolled = -rect.top;
      const vh = window.innerHeight;
      const start = (panelId - 1) * vh;
      const within = (scrolled - start) / vh;
      const p = within < 0 ? 0 : within > 1 ? 1 : within;
      const active = within >= 0 && within <= 1;

      if (Math.abs(p - lastP) > 0.005 || active !== lastA) {
        lastP = p;
        lastA = active;
        setState({ progress: p, active });
      }

      const v = videoRef?.current;
      if (v && v.duration > 0 && active) {
        const target = p * v.duration;
        if (Math.abs(v.currentTime - target) > 0.05) {
          v.currentTime = target;
        }
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [panelId, videoRef]);

  return state;
}
