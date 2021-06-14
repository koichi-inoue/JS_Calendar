// Setup /////////////////////////////////

let monthsOfTheYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let dayOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

// Set Years Option
let yearsList = "";
for (let y = 2000; y <= 2100; y++) {
  yearsList += "<option value='" + y + "'>" + y + "</option>";
}
document.getElementById("year").innerHTML = yearsList;

// Set Months of the Year Option
let monthsOfTheYearList = "";
for (let m = 0; m <= 12; m++) {
  monthsOfTheYearList += "<option value='" + m + "'>" + monthsOfTheYear[m] + "</option>";
}
document.getElementById("month").innerHTML = monthsOfTheYearList;

// Set Day of Week
let dayOfWeekList = "<tr>";
for (let d in dayOfWeek) {
  dayOfWeekList += "<th data-days='" + dayOfWeek[d] + "'>" + dayOfWeek[d] + "</th>";
}
dayOfWeekList += "</tr>";
document.getElementById("theadMonth").innerHTML = dayOfWeekList;

// Add Event Listener
let selectYear = document.getElementById("year");
selectYear.addEventListener('click', changeView, false);

let selectMonth = document.getElementById("month");
selectMonth.addEventListener('click', changeView, false);

let prv = document.getElementById("previous");
prv.addEventListener('click', movePrevious, false);

let nxt = document.getElementById("next");
nxt.addEventListener('click', moveNext, false);

// Get Date Information
let today = new Date();
let thisMonth = today.getMonth();
let thisYear = today.getFullYear();
let calendar = document.getElementById("calendar");

// Set Today’s Tabele Calendar
setCalendar(thisYear, thisMonth);


// Functions ////////////////////////////

// 日付がクリックされたときのイベントサンプル
function displayDate() {
  let message = monthsOfTheYear[this.m] + ' '
                + this.d + ', '
                + this.y;
  alert(message);
}

// Table Calendar の生成
function setCalendar(year, month) {

  // #selector に年月を設定
  selectYear.value = year;
  selectMonth.value = month;

  // 当該年月の 1日の曜日を取得
  let firstDay = new Date( year, month ).getDay();
  // 当該年月の日数を取得（ 当月末日 = 翌月の0日 が何日かを取得）
  let days = new Date(year, month+1, 0).getDate();

　// Calendar td の追加生成
  let tbl = document.getElementById("calendarBody");
  tbl.innerHTML = "";
  let date = 1;

  for ( var i = 0; i < 6; i++ ) {

    var row = document.createElement("tr");

    for ( var j = 0; j < 7; j++ ) {

      cell = document.createElement("td");
      cell.className = "date";

      if ( i === 0 && j < firstDay ) {
        cell.innerHTML ="";
      } else if (date > days) {
        cell.innerHTML ="";
      } else {
        cell.innerHTML = date;
        if ( date === today.getDate()
          && year === today.getFullYear()
          && month === today.getMonth() ) {
          cell.id = "today";
        }
        date++;
      }
      row.appendChild(cell);
    }

    tbl.appendChild(row);
    if (date > days) break;
  }

  // Calendar td にイベントリスナーを登録
  let cells = document.getElementsByTagName('td');
  date = 1;

  for ( var i = 0; i < 6; i++ ) {
    for ( var j = 0; j < 7; j++ ) {
      if ( i === 0 && j < firstDay ) {
        // Nothing to do
      } else if (date > days) {
        // Nothing to do
      } else {
        // 引数とハンドラをオブジェクトとして渡す
        cells[i*7+j].addEventListener('click', {
          y: year,
          m: month,
          d: date,
          handleEvent: displayDate },
        false);
        cells[i*7+j].style.cursor = 'pointer';
        date++;
      }
    }
  }

}

function moveNext() {
  thisYear = (thisMonth === 11) ? thisYear + 1 : thisYear;
  thisMonth = (thisMonth + 1) % 12;
  setCalendar(thisYear, thisMonth);
}

function movePrevious() {
  thisYear = (thisMonth === 0) ? thisYear - 1 : thisYear;
  thisMonth = (thisMonth === 0) ? 11 : thisMonth - 1;
  setCalendar(thisYear, thisMonth);
}

function changeView() {
  thisYear = parseInt(selectYear.value);
  thisMonth = parseInt(selectMonth.value);
  setCalendar(thisYear, thisMonth);
}
