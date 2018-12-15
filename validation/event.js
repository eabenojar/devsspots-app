const validator = require("validator");

const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

// Validate create form
module.exports = function validateCreateEventForm(data) {
  let errors = {};

  data.eventTitle = !isEmpty(data.eventTitle) ? data.eventTitle : "";
  data.eventDescription = !isEmpty(data.eventDescription)
    ? data.eventDescription
    : "";
  data.eventAddress = !isEmpty(data.eventAddress) ? data.eventAddress : "";
  data.eventCategory = !isEmpty(data.eventCategory) ? data.eventCategory : "";
  data.timeStart = !isEmpty(data.timeStart) ? data.timeStart : "";
  data.timeEnd = !isEmpty(data.timeEnd) ? data.timeEnd : "";
  data.eventDate = !isEmpty(data.eventDate) ? data.eventDate : "";

  if (validator.isEmpty(data.eventTitle)) {
    errors.eventTitle = "Event title is required";
  }
  if (validator.isEmpty(data.eventDescription)) {
    errors.eventDescription = "Event description is required";
  }
  if (validator.isEmpty(data.eventAddress)) {
    errors.eventAddress = "Event address is required";
  }
  if (validator.isEmpty(data.eventCategory)) {
    errors.eventCategory = "Event category is required";
  }
  if (validator.isEmpty(data.timeStart)) {
    errors.timeStart = "Time start is required";
  }
  if (validator.isEmpty(data.timeEnd)) {
    errors.timeEnd = "Time end is required";
  }
  if (validator.isEmpty(data.eventDate)) {
    errors.eventDate = "Event date is required";
  }
  const today = new Date();
  console.log("VALIDATE EVENT TODAY", today);
  const first = new Date(data.timeStart).getTime();
  const second = new Date(data.timeEnd).getTime();
  if (first > second) {
    errors.timeStart = "Time Start must be before Time End";
  }
  if (second < first) {
    errors.timeEnd = "Time End must be after Time Start";
  }
  console.log("CHECK TIMES BEGIN AND END", first, second);
  if (!validator.isAfter(data.eventDate)) {
    errors.eventDate = "Event cannot be in the past";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
