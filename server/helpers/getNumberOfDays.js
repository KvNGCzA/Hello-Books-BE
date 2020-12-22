/* istanbul ignore file */
const noOfMillisecondsPerSecond = 1000;
const noOfSecondsPerMinute = 60;
const noOfMinutesPerHour = 60;
const noOfHoursPerDay = 24;
const fullDay = noOfHoursPerDay * noOfSecondsPerMinute
* noOfMinutesPerHour * noOfMillisecondsPerSecond;
export default (expiryDate, switchDate) => {
  const todaysDate = new Date(Date.now());
  const daysRemainingInTimeFormat = switchDate
    ? todaysDate.getTime() - expiryDate.getTime()
    : expiryDate.getTime() - todaysDate.getTime();
  if (daysRemainingInTimeFormat < 1) return null;
  const daysRemaining = Math.floor(daysRemainingInTimeFormat / fullDay);
  return daysRemaining;
};
