const validFutureDate = dateISO => {
  if (typeof dateISO != "string") return false;
  const date = new Date(dateISO);
  if (date == "Invalid Date") return false;
  return date > Date.now();
}

module.exports = validFutureDate;