const capitalizeFirstLetter = (word) => {
  const formattedWord = word.toLowerCase().split(' ')
    .map(f => f.charAt(0).toUpperCase() + f.substring(1)).join(' ');
  return formattedWord;
};
export default capitalizeFirstLetter;
