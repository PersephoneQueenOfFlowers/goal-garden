const validFutureDate = dateISO => {
  if (typeof dateISO != "string") return false;
  const date = new Date(dateISO + "T00:00:00");
  if (date == "Invalid Date") return false;
  return date > Date.now();
}

module.exports = validFutureDate;