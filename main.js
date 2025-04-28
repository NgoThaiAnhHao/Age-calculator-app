"use strict";

let inputs = document.querySelectorAll(".input");

let labels = document.querySelectorAll(".label");
let invalidsValue = document.querySelectorAll(".invalidValue");

let outputDay = document.querySelector(".age-calculator__output--day--answer");
let outputMonth = document.querySelector(
  ".age-calculator__output--month--answer"
);
let outputYear = document.querySelector(
  ".age-calculator__output--year--answer"
);

let resultDay;
let resultMonth;
let resultYear;

///////////////////////////////////////////////////////////////////////////////////////////

const validInput = function (
  day,
  month,
  year,
  currentDay,
  currentMonth,
  currentYear
) {
  // Day, month, year valid
  if (day > 31 || day < 1 || month > 12 || month < 1 || year < 0) return false;

  // Check months have 30 days
  if (month === 4 || month === 6 || month === 9 || month === 11) {
    if (day > 30) return false;
  }

  // Check months have 31 days
  if (
    month === 1 ||
    month === 3 ||
    month === 5 ||
    month === 7 ||
    month === 8 ||
    month === 10 ||
    month === 12
  )
    if (day > 31) return false;

  // Check February
  if (month === 2) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      if (day > 29) return false;
    } else if (day > 28) return false;
  }

  // Check current year > Input year
  if (year > currentYear) return false;
  if (year === currentYear && month > currentMonth) return false;
  if (year === currentYear && month === currentMonth && day > currentDay)
    return false;

  return true;
};

///////////////////////////////////////////////////////////////////////////////////

const checkInput = function (day, month, year) {
  if (day === "" || month === "" || year === "") return false;
  return true;
};

const displayInvalid = function () {
  inputs.forEach((inp) => (inp.style.border = "0.1rem solid var(--Red-400)"));
  labels.forEach((lab) => (lab.style.color = "var(--Red-400)"));
  invalidsValue.forEach(function (inv) {
    inv.classList.remove("invalidInput");
  });
};

const displayValid = function () {
  inputs.forEach((inp) => (inp.style.border = "0.1rem solid var(--Grey-200)"));
  labels.forEach((lab) => (lab.style.color = "var(--Grey-500)"));
  invalidsValue.forEach(function (inv) {
    inv.classList.add("invalidInput");
  });
};

const calcAge = function (
  resultDay,
  resultMonth,
  resultYear,
  currentMonth,
  currentYear
) {
  if (resultDay < 0) {
    resultMonth--;

    const previousMonth = new Date(currentYear, currentMonth - 1, 0);
    resultDay += previousMonth.getDate();
  }

  if (resultMonth < 0) {
    resultYear--;
    resultMonth += 12;
  }

  return {
    d: resultDay,
    m: resultMonth,
    y: resultYear,
  };
};

const displayResult = function (resultDay, resultMonth, resultYear) {
  outputDay.textContent = resultDay < 10 ? "0" + resultDay : resultDay;
  outputMonth.textContent = resultMonth < 10 ? "0" + resultMonth : resultMonth;
  outputYear.textContent = resultYear < 10 ? "0" + resultYear : resultYear;
};

//////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();

    let day = document.querySelector(".input--day").value;
    let month = document.querySelector(".input--month").value;
    let year = document.querySelector(".input--year").value;

    if (!checkInput(day, month, year)) {
      displayInvalid();
    } else {
      const currentDate = new Date();
      const currentDay = currentDate.getDate();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();

      day = +day;
      month = +month;
      year = +year;

      if (!validInput(day, month, year, currentDay, currentMonth, currentYear)) {
        displayInvalid();
      } else {
        displayValid();

        // Calc age
        resultDay = currentDay - day;
        resultMonth = currentMonth - month;
        resultYear = currentYear - year;

        let { d, m, y } = calcAge(
          resultDay,
          resultMonth,
          resultYear,
          currentMonth,
          currentYear
        );

        //Display
        displayResult(d, m, y);
      }
    }
  }
});
