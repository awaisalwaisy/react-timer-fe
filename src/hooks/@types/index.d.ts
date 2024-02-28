type FieldValues = Record<"hours" | "minutes" | "seconds", number>;

interface TimerControlParams {
  initialData: FieldValues;
  setInitialData: React.Dispatch<React.SetStateAction<FieldValues>>;
  setData: React.Dispatch<React.SetStateAction<FieldValues>>;
  setRunning: React.Dispatch<React.SetStateAction<boolean>>;
  setPaused: React.Dispatch<React.SetStateAction<boolean>>;
  intervalRef: React.MutableRefObject<number | undefined>;
}
