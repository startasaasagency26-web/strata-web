import { useEffect } from 'react';
import { useMotionValue, type MotionValue } from 'framer-motion';

const mapProgressToStages = (value: number, stepCount: number) =>
  Array.from({ length: stepCount }, (_, index) => {
    const start = index / stepCount;
    const end = (index + 1) / stepCount;
    return Math.min(1, Math.max(0, (value - start) / (end - start)));
  });

export const useStageProgress = (progress: MotionValue<number>, stepCount: number) => {
  const stageProgress = useMotionValue(mapProgressToStages(progress.get(), stepCount));

  useEffect(() => {
    stageProgress.set(mapProgressToStages(progress.get(), stepCount));
    return progress.on('change', (value) => {
      stageProgress.set(mapProgressToStages(value, stepCount));
    });
  }, [progress, stageProgress, stepCount]);

  return stageProgress;
};
