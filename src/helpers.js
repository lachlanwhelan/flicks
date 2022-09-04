export const truncate = (text) => {
  if (text.length > 100) {
    return text.substring(0, 250) + '...';
  }
  return text;
};

export const formatDate = (dateInput) => {
  const new_date = new Date(dateInput);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const month = months[new_date.getMonth()];

  const date = new_date.getDate();

  const year = new_date.getFullYear();

  return `${month} ${date}, ${year}`;
};
