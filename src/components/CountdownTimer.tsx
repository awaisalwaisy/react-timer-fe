import { calculateTimeDiff, formatTimeDifference } from "@/utils";
import { Button, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";

type FieldValues = Record<"hours" | "minutes" | "seconds", number>;

const CountdownTimer = () => {
  const [data, setData] = useState<FieldValues>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isRunning, setRunning] = useState(false);

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
    setRunning(true);
  }

  useEffect(() => {
    // check status
    if (!isRunning) {
      return;
    }

    // validate data
    if (
      data.hours < 0 ||
      data.minutes < 0 ||
      data.minutes >= 60 ||
      data.seconds < 0 ||
      data.seconds >= 60
    ) {
      setRunning(false);
      return;
    }

    const interval = setInterval(() => {
      const timeDiff = calculateTimeDiff(data);
      const formattedTimeDiff = formatTimeDifference(timeDiff);

      setData(formattedTimeDiff);
    }, 1000);
    return () => clearInterval(interval);
  }, [data, isRunning]);

  return (
    <section>
      <h3 className="text-3xl font-medium">Countdown Timer</h3>
      {isRunning ? (
        <p className="text-5xl font-bold">
          {data.hours.toString().padStart(2, "0")}:
          {data.minutes.toString().padStart(2, "0")}:
          {data.seconds.toString().padStart(2, "0")}
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-16">
          <div className="flex gap-x-3 mb-8">
            <Input
              type="text"
              name="hours"
              placeholder="Hours"
              className="w-20"
              maxLength={2}
              pattern="[0-9]{1,2}"
              inputMode="numeric"
            />
            <Input
              type="text"
              name="minutes"
              placeholder="Minutes"
              className="w-20"
              maxLength={2}
              pattern="[0-9]{1,2}"
              inputMode="numeric"
            />
            <Input
              type="text"
              name="seconds"
              placeholder="Seconds"
              className="w-20"
              maxLength={2}
              pattern="[0-9]{1,2}"
              inputMode="numeric"
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
