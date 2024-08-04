export const makeErrorMessagesReadable = (message) => {
  const start = message.indexOf("(") + 1;
  const end = message.indexOf(")");
  let hyphenatedPart = message.slice(start, end);

  if (hyphenatedPart.startsWith("auth/")) {
    hyphenatedPart = hyphenatedPart.replace("auth/", "").replace(/-/g, " ");
  }
  return hyphenatedPart;
};

export const truncateString = (string, maxLength) => {
  if (string.length <= maxLength) {
    return string;
  }
  return string.slice(0, maxLength - 3) + "...";
};
