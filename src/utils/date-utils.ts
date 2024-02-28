/**
 * Calculates the time difference in milliseconds between a future date and the current date, based on a specified duration in hours, minutes, and seconds.
 *
 * @param timeDuration An object containing the duration:
 *  - `hours`: Non-negative number representing hours.
 *  - `minutes`: Non-negative number less than 60 representing minutes.
 *  - `seconds`: Non-negative number less than 60 representing seconds.
 * @returns The time difference in milliseconds between the future date and the current date.
 *
 * @throws {Error} If any of the duration values are invalid.
 */
export const calculateTimeDiff = (
  timeDuration: {
    hours: number;
    minutes: number;
    seconds: number;
  },
  interval: number = 1000
): number => {
  // convert string to number
  const duration = {
    hours: timeDuration.hours,
    minutes: timeDuration.minutes,
    seconds: timeDuration.seconds,
  };

  // Validate input
  if (
    duration.hours < 0 ||
    duration.minutes < 0 ||
    duration.minutes >= 60 ||
    duration.seconds < 0 ||
    duration.seconds >= 60
  ) {
    throw new Error(
      "Invalid duration values. Hours must be non-negative, and minutes and seconds must be non-negative numbers less than 60."
    );
  }

  // Calculate total duration in milliseconds
  const totalDuration =
    duration.hours * 60 * 60 * 1000 +
    duration.minutes * 60 * 1000 +
    duration.seconds * 1000;

  // Get the current date and time
  const currentDate = new Date();

  // Add the duration to the current time
  currentDate.setTime(currentDate.getTime() + (totalDuration - interval));

  // Calculate the time difference in milliseconds
  const timeDifference = currentDate.getTime() - Date.now();

  // Return the time difference in milliseconds
  return timeDifference;
};

/**
 * Calculates the time difference in seconds, minutes, hours, and days from a given time difference in milliseconds.
 *
 * @param timeDifferenceInMilliseconds The time difference in milliseconds.
 * @returns An object containing the time difference in different units:
 *  - seconds: The time difference in seconds.
 *  - minutes: The time difference in minutes.
 *  - hours: The time difference in hours.
 *  - days: The time difference in days.
 */
export const formatTimeDifference = (
  timeDifferenceInMilliseconds: number
): {
  seconds: number;
  minutes: number;
  hours: number;
  // days: number;
} => {
  const timeDiffSecs = Math.floor(timeDifferenceInMilliseconds / 1000);
  const timeDiffMins = Math.floor(timeDiffSecs / 60);
  const timeDiffHours = Math.floor(timeDiffMins / 60);
  // const timeDiffDays = Math.floor(timeDiffHours / 24);

  return {
    seconds: timeDiffSecs,
    minutes: timeDiffMins,
    hours: timeDiffHours,
    // days: timeDiffDays,
  };
};
