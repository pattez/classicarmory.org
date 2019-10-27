const BACKEND_URL = "http://localhost:8090";
const genders = {
  1: "Neutrum / Unknown",
  2: "Male",
  3: "Female"
};
function zerolize(number) {
  if (number < 10) {
    return `0${number}`;
  }
  return number;
}
const formatDate = d => {
  const date = new Date(d);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${zerolize(
    date.getDate()
  )}
  ${zerolize(date.getHours())}:${zerolize(date.getMinutes())}:${zerolize(
    date.getSeconds()
  )}`;
};

export {BACKEND_URL, genders, zerolize, formatDate};
