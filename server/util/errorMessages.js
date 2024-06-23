export default (error) => {
  const keys = Object.keys(error.errors);
  const messages = [];
  for (let i = 0; i < keys.length; i++) {
    const message = error.errors[keys[i]].properties.message;
    messages.push(message);
  }
  return messages;
};
