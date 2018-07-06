import moment from 'moment';
export const dateDiffList = (dateStartSearch, dateEndSearch) => {
  const timeValues = [];
  const dateStart = moment(dateStartSearch, 'MM/YYYY');
  const dateEnd = moment(dateEndSearch, 'MM/YYYY');
  if (__DEV__) console.log("dateDiffList.js - dateDiffList", dateEnd > dateStart);
  while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
    timeValues.push(dateStart.format('MM/YYYY'));
    dateStart.add(1, 'month');
  }
  return timeValues;
};
