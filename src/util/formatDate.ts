import { format } from "date-fns";

const formatDate = (
  dateString: string,
  options?: { yearOnly?: boolean }
): string => {
  const correctDateString = getCorrectDateString(dateString);
  const date = new Date(correctDateString);
  if (isNaN(date as any)) return dateString;
  return format(date, options && options.yearOnly ? "yyyy" : "dd.MM.yyyy");
};

export default formatDate;

export function getCorrectDateString(dateString: string) {
  if (dateString.length > 10) return dateString;
  return `${dateString.slice(3, 5)}.${dateString.slice(
    0,
    2
  )}.${dateString.slice(6, 10)}`;
}

export function getMilliseconds(dateString: string) {
  return new Date(getCorrectDateString(dateString)).getTime();
}

// TODO: store correct date string in database
