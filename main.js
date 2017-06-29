document.addEventListener('DOMNodeInserted', function() {
    var calendarContainers = document.getElementsByClassName('aY ac X s2');
    if (calendarContainers.length > 0) {
        var firstCalendarEvent = calendarContainers[0];

        if (firstCalendarEvent.getElementsByClassName("calendarButton-JS").length === 0) {
            var btn = createCalendarButton();

            var buttonContainer = firstCalendarEvent.getElementsByClassName("iQ")[0].appendChild(btn);

            var eventName = firstCalendarEvent.getElementsByClassName("nM")[0].innerText;
            var eventDateString = firstCalendarEvent.getElementsByClassName("aL pj")[0].innerText;
            var locationString = firstCalendarEvent.getElementsByClassName("aL pj")[1].innerText;

            var dateObject = getDateStringAsJson(eventDateString);

            btn.onclick = function() {
                window.open(encodeURI("https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + eventName + "&dates=" +
                    dateObject.year + dateObject.month + dateObject.day + "T" + dateObject.startTime.replace(":", "") + "00/" +
                    dateObject.year + dateObject.month + dateObject.day + "T" + dateObject.endTime.replace(":", "") + "00&location=" +
                    locationString + "&sf=true&output=xml#eventpage_6"));
            };
        }
    }

    function createCalendarButton() {
        var btn = document.createElement("BUTTON");
        btn.classList.add("gb_Fa");
        btn.classList.add("gb_sf");
        btn.classList.add("gbp1");
        btn.classList.add("gb_je");
        btn.classList.add("gb_xb");
        btn.classList.add("calendarButton-JS");
        btn.style = "margin: 10px; width: 35%;";

        var t = document.createTextNode("Add to calendar");
        btn.appendChild(t);

        return btn;
    }
    //example string 7 dec. 2016 09:30–10:00
    //example string 7 dec. 09:30–10:00
    function getDateStringAsJson(dateString) {
        var splitString = dateString.split(' ');
        var months = {
            "jan.": "01",
            "Jan,": "01",
            "Jan": "01",

            "feb.": "02",
            "Feb,": "02",
            "Feb": "02",

            "maa.": "03",
            "Mar,": "03",
            "Mar": "03",

            "apr.": "04",
            "Apr,": "04",
            "Apr": "04",

            "mei": "05",
            "May,": "05",
            "May": "05",

            "jun.": "06",
            "Jun,": "06",
            "Jun": "06",

            "jul.": "07",
            "Jul,": "07",
            "Jul": "07",

            "aug.": "08",
            "Aug,": "08",
            "Aug": "08",

            "sep.": "09",
            "Sep,": "09",
            "Sep": "09",

            "okt.": "10",
            "Oct,": "10",
            "Oct": "10",

            "nov.": "11",
            "Nov,": "11",
            "Nov": "11",

            "dec.": "12",
            "Dec,": "12",
            "Dec": "12"
        }

        if (splitString.length === 3) {
            var day = splitString[0];
            var month = splitString[1];
            var times = splitString[2].split('–');

            return {
                day: (day.length === 1) ? "0" + day : day,
                month: months[month],
                year: new Date().getFullYear(),
                startTime: times[0],
                endTime: times[1]
            };
        } else if (splitString.length === 4) {
            var day = splitString[0];
            var month = splitString[1];
            var year = splitString[2].replace(',', '');
            var times = splitString[3].split('–');

            return {
                day: (day.length === 1) ? "0" + day : day,
                month: months[month],
                year: year,
                startTime: times[0],
                endTime: times[1]
            };
        }
    }
    /// call your function here
});
