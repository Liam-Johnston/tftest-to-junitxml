export const calculateDuration = (startTime?: Date, endTime?: Date) => {
  if (endTime === undefined || startTime === undefined) {
    return undefined;
  }

  return (endTime.getTime() - startTime.getTime()) / 1000;
};