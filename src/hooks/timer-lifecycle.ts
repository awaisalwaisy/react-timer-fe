import { calculateTimeDiff, formatTimeDifference } from "@/utils";
import { useEffect } from "react";

interface TimerLifecycleParams {
  initialData: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  setData: React.Dispatch<
    React.SetStateAction<{
      hours: number;
      minutes: number;
      seconds: number;
    }>
  >;
  data: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  setRunning: React.Dispatch<React.SetStateAction<boolean>>;
  setPaused: React.Dispatch<React.SetStateAction<boolean>>;
  intervalRef: React.MutableRefObject<number | undefined>;
  isRunning: boolean;
}

export const useTimerLifecycle = ({
  initialData,
  setData,
  data,
  setRunning,
  setPaused,
  intervalRef,
  isRunning,
}: TimerLifecycleParams) => {
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

    intervalRef.current = setInterval(() => {
      const timeDiff = calculateTimeDiff(data);
      const formattedTimeDiff = formatTimeDifference(timeDiff);

      setData(formattedTimeDiff);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isRunning, initialData]);

  // show notification as the timer is finished
  useEffect(() => {
    if (!isRunning) {
      return;
    }
    if (data.hours === 0 && data.minutes === 0 && data.seconds === 0) {
      setRunning(false);
      setPaused(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      // show notification

      // check if the browser supports notifications
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
        return;
      }
      const notification = new Notification("Timer finished", {
        body: "Time is up!",
      });
      notification.onclick = () => {
        window.focus();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isRunning]);
};
