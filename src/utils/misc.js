export const makeErrorMessagesReadable = (message) => {
  const start = message.indexOf("(") + 1;
  const end = message.indexOf(")");
  let hyphenatedPart = message.slice(start, end);

  if (hyphenatedPart.startsWith("auth/")) {
    hyphenatedPart = hyphenatedPart.replace("auth/", "").replace(/-/g, " ");
  }
  return hyphenatedPart;
};
