import { useTimerControl, useTimerLifecycle } from "@/hooks";
import { Button, Input } from "@nextui-org/react";
import { useRef, useState } from "react";

type FieldValues = Record<"hours" | "minutes" | "seconds", number>;

const CountdownTimer = () => {
  const [data, setData] = useState<FieldValues>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [initialData, setInitialData] = useState<FieldValues>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isRunning, setRunning] = useState(false);
  const [isPaused, setPaused] = useState(false);
  const intervalRef = useRef<number>();

  // form submission and control
  const { handleSubmit, handlePause, handleResume, handleReset } =
    useTimerControl({
      initialData,
      setInitialData,
      setData,
      setRunning,
      setPaused,
      intervalRef,
    });

  useTimerLifecycle({
    initialData,
    data,
    setData,
    setRunning,
    setPaused,
    intervalRef,
    isRunning,
  });

  return (
    <section>
      <h3 className="text-3xl font-medium">Countdown Timer</h3>
      {isRunning || isPaused ? (
        <>
          <p className="text-5xl font-bold">
            {data.hours.toString().padStart(2, "0")}:
            {data.minutes.toString().padStart(2, "0")}:
            {data.seconds.toString().padStart(2, "0")}
          </p>
          {isPaused ? (
            <Button color="success" onClick={handleResume}>
              Resume
            </Button>
          ) : (
            <Button color="primary" onClick={handlePause}>
              Pause
            </Button>
          )}
          <Button color="danger" onClick={handleReset}>
            Reset
          </Button>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="mt-16">
          <div className="flex gap-x-3 mb-8">
            <Input
              type="text"
              name="hours"
              placeholder="HH"
              className="w-20"
              maxLength={2}
              pattern="[0-9]{1,2}"
              inputMode="numeric"
              aria-label="hours"
            />
            <Input
              type="text"
              name="minutes"
              placeholder="MM"
              className="w-20"
              maxLength={2}
              pattern="[0-9]{1,2}"
              inputMode="numeric"
              aria-label="minutes"
            />
            <Input
              type="text"
              name="seconds"
              placeholder="SS"
              className="w-20"
              maxLength={2}
              pattern="[0-9]{1,2}"
              inputMode="numeric"
              aria-label="seconds"
            />
          </div>
          <Button color="primary" type="submit">
            Start
          </Button>
        </form>
      )}
    </section>
  );
};

export default CountdownTimer;
