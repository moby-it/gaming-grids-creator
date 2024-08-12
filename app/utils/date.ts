export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export function getCurrentMonth(): number {
  const now = new Date();
  return now.getMonth();
}
export function getCurrentYear(): number {
  const now = new Date();
  return now.getFullYear();
}
export function formatDateAsMonthYear(monthIdx: number, year: number): string {
  return `${MONTHS[monthIdx]} ${year}`;
}

export function getDaysInMonth(year: number, month: number): number {
  const date = new Date(year, month, 1);
  date.setMonth(date.getMonth() + 1, 0);
  return date.getDate();
}
export function getFirstDayOfMonth(monthIndex: number, year: number): string {
  const date = new Date(year, monthIndex, 1);
  return date.toLocaleDateString();
}
export function getLastDayOfMonth(monthIndex: number, year: number): string {
  const date = new Date(year, monthIndex, getDaysInMonth(year, monthIndex));
  return date.toLocaleDateString();
}
export function formatDate(day: number, month: number, year: number) {
  const date = new Date(year, month, day);
  const offset = date.getTimezoneOffset();
  const noOffsetdate = new Date(date.getTime() - offset * 60 * 1000);
  return noOffsetdate.toISOString().split("T")[0];
}
export function isValidDate(dateString: unknown): dateString is string {
  if (typeof dateString !== "string") return false;
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateString.match(regEx)) return false; // Invalid format
  var d = new Date(dateString);
  var dNum = d.getTime();
  if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
  return d.toISOString().slice(0, 10) === dateString;
}
export function fromPuzzleDateToParamDate(date: string): string {
  return date.split("-").slice(0, 2).reverse().join("-");
}

function getWeekOfMonth(day: number, month: number, year: number): number {
  const firstDay = new Date(year, month, 1).getDay() === 0 ? 7 : new Date(year, month, 1).getDay();
  const weekOfMonth = Math.ceil((firstDay + day - 1) / 7);
  return weekOfMonth;
}

export function getGridArea(day: number, month: number, year: number) {
  const date = new Date(year, month, day);
  const dayOfWeek = date.getDay();
  const weekOfMonth = getWeekOfMonth(day, month, year);
  const dayOfWeekName = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][
    dayOfWeek
  ];
  const gridArea = `${dayOfWeekName}${weekOfMonth}`;
  return gridArea;
}