export const availableTimeSlots = Array.from({ length: 12 }, (_, index) => {
  const hour = 8 + index;
  const period = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour > 12 ? hour - 12 : hour;
  return `${formattedHour}:00 ${period}`;
});
