const getPatrons = (data) => {
  const temporary = [];
  data.filter((history) => {
    const getTotalTime = Math.abs(Date.now() - new Date(history.createdAt).getTime());
    const numOfDays = Math.ceil(getTotalTime / (1000 * 60 * 60 * 24));
    if (history.duration < numOfDays) {
      temporary.push(history.userId);
    }
});
  return temporary;
};
export default getPatrons;
