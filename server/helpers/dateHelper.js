const noOfMillisecondsPerSecond = 1000;
const noOfSecondsPerMinute = 60;
const noOfMinutesPerHour = 60;
const noOfHoursPerDay = 24;
const fullDay = noOfHoursPerDay * noOfSecondsPerMinute
* noOfMinutesPerHour * noOfMillisecondsPerSecond;
exports.getNumberOfDays = (expiryDate, switchDate) => {
  const todaysDate = new Date(Date.now());
  const daysRemainingInTimeFormat = switchDate
    ? todaysDate.getTime() - expiryDate.getTime()
    : expiryDate.getTime() - todaysDate.getTime();
  if (daysRemainingInTimeFormat < 1) return null;
  const daysRemaining = Math.ceil(daysRemainingInTimeFormat / fullDay);
  return daysRemaining;
};

exports.getDateString = numberOfDays => new Date(Date.now() + (numberOfDays * fullDay));

exports.formatDuration = (duration) => {
  const spiltData = duration.split(' ');
  spiltData[0] = parseInt(spiltData[0], 10) + 1;
  if (parseInt(spiltData[0], 10) > 1 && spiltData[1][spiltData[1].length - 1] !== 's') spiltData[1] += 's';
  return spiltData.join(' ');
};
