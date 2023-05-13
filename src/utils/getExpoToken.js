export const removeExpoTokenString = (token) => {
  return token.replace('ExponentPushToken[', '').replace(']', '');
}