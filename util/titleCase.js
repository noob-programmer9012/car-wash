export default (string) => {
  return string
    .trim()
    .split(" ")
    .filter((word) => word !== "") // to remove extra white space in middle
    .map(
      (word) => word[0].toUpperCase() + word.slice(1, word.length).toLowerCase()
    )
    .join(" ");
};
