export const setRigthDuration = (duration) => {
  return `${duration}`.endsWith(1) ? `${duration} минута` :
  ['2', '3', '4'].some(char => `${duration}`.endsWith(char)) ? `${duration} минуты` : `${duration} минут`;
};
