import moment from "moment";

export const getRelativeTime = (start: Date) => {
  const now = moment();
  const target = moment(start);

  const isPast = target.isBefore(now);
  const duration = moment.duration(Math.abs(target.diff(now)));

  const days = Math.floor(duration.asDays());
  const hours = duration.hours();

  return isPast
    ? `${days} day(s) and ${hours} hour(s) ago`
    : `in ${days} day(s) and ${hours} hour(s)`;
};
