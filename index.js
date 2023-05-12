// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
const daysTag = document.querySelector('.days'),
  currentDate = document.querySelector('.current-date'),
  prevNextIcon = document.querySelectorAll('.icons span');
// Get new date, current year and month
let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const renderCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // Get day of the month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // Get last date of the month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // Get last day of the month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // Get last date of the previous month
  let liTag = '';

  for (let i = firstDayofMonth; i > 0; i--) {
    // create li for previous month last days
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }
  for (let i = 1; i <= lastDateofMonth; i++) {
    // create li of all days of current month
    // Add active class to li for todays day of the month and a year.
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? 'active'
        : '';
    liTag += `<li class=${isToday}>${i}</li>`;
  }
  for (let i = lastDayofMonth; i < 6; i++) {
    // create li of next month first days
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }
  currentDate.innerText = `${months[currMonth]} ${currYear}`;
  daysTag.innerHTML = liTag;
  let allDays = document.querySelectorAll('.days li');
  console.log(allDays);
};

renderCalendar();

prevNextIcon.forEach((icon) => {
  icon.addEventListener('click', () => {
    // Add click event for next and prev icons
    // If prev icon is clicked, minus current month by 1  or next is clicked add by 1 month.
    currMonth = icon.id === 'prev' ? currMonth - 1 : currMonth + 1;

    if (currMonth < 0 || currMonth > 11) {
      // if current month is less than 0 or greater than 11
      date = new Date(currYear, currMonth);
      currYear = date.getFullYear();
      currMonth = date.getMonth();
    } else {
      date = new Date();
    }
    renderCalendar();
  });
});
