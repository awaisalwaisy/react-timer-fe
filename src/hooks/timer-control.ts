export const useTimerControl = ({
  initialData,
  setInitialData,
  setData,
  setRunning,
  setPaused,
  intervalRef,
}: TimerControlParams) => {
  // submit form
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    // convert each value to number
    const data: FieldValues = {
      hours: Number(formData.get("hours")),
      minutes: Number(formData.get("minutes")),
      seconds: Number(formData.get("seconds")),
    };

    setData(data);
    setInitialData(data);
    setRunning(true);
  }

  // pause timer
  function handlePause() {
    setRunning(false);
    setPaused(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }

  // resume timer
  function handleResume() {
    setRunning(true);
    setPaused(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }

  // reset timer
  function handleReset() {
    setData(initialData);
    setRunning(false);
    setPaused(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }

  return {
    handleSubmit,
    handlePause,
    handleResume,
    handleReset,
  };
};
