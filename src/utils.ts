export const createErrorMessage = (messages: object): string => {
  return Object.values(messages).join(", ");
};
