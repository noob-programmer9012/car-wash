export default (error) => {
  const keys = Object.keys(error.errors);
  const messages = [];
  for (let i = 0; i < keys.length; i++) {
    messages.push(error.errors[keys[i]].properties.message);
  }
  return messages;
};
