export const toISODate = (date) => {
  const [day, month, year] = date.split('/');
  return `${year}-${month}-${day}`;
}