import moment from 'moment';
export const dateDiffList = (dateStartSearch, dateEndSearch) => {
  const timeValues = [];
  const dateStart = moment(dateStartSearch, 'MM/YYYY');
  const dateEnd = moment(dateEndSearch, 'MM/YYYY');
  console.log(dateEnd > dateStart);
  while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
    timeValues.push(dateStart.format('MM/YYYY'));
    dateStart.add(1, 'month');
  }
  return timeValues;
};
