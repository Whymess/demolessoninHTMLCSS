(function() {
  "use strict";
  fetch("https://api.myjson.com/bins/1geede")
    .then(response => {
      return response.json();
    })
    .then(myJson => {
      var { conversationDate, messages } = myJson.data;
      parseConversationDate(conversationDate);
      parseConversationsObjects(messages);
    })
    .catch(error => console.error("Error:", error));

  // Parsing functions
  function parseConversationDate(conversationDate) {
    var weekDayAbbrationObject = {
      Sun: "Sunday",
      Mon: "Monday",
      Tue: "Tuesday",
      Wed: "Wednesday",
      Thur: "Thursday",
      Fri: "Friday",
      Sat: "Saturday",
      Sun: "Sunday"
    };

    var ts = new Date(conversationDate);
    var dateToString = ts.toString();
    console.log(dateToString);
    var onlyTheDateWeNeed = dateToString.substr(0, 15);
    var getWeekAbrivation = onlyTheDateWeNeed.substr(0, 3);
    var arrayOfDate = onlyTheDateWeNeed.split(" ");
    arrayOfDate[0] = weekDayAbbrationObject[getWeekAbrivation];
    var finalDateFormat = arrayOfDate.join(" ");
    renderConversationDate(finalDateFormat);
  }

  function parseConversationTimeStamp(time, index) {
    var fomrattedTime = new Date(time).toLocaleTimeString();
    renderConvoTime(fomrattedTime, index);
  }

  function parseConversationsObjects(messages) {
    var message;
    var index;
    var image;
    var time;
    var name;
    messages.forEach(function(el, i) {
      if (el["username"] === "Mygel van Trabel") {
        message = el["message"];
        index = i;
        image = el["image"];
        time = el["timestamp"];
        name = el["username"];

        renderMessages(message, index);
        renderImages(image, index);
        parseConversationTimeStamp(time, index);
        renderName(name, index);
      } else {
        message = el["message"];
        index = i;
        image = el["image"];
        time = el["timestamp"];
        name = el["username"];

        renderMessages(message, index);
        renderImages(image, index);
        parseConversationTimeStamp(time, index);
        renderName(name, index);
      }
    });
  }

  // RENDERING FUNCTIONS
  function renderConversationDate(onlyTheDateWeNeed) {
    var dateOfConversation = document.getElementsByClassName(
      "header-timestamp"
    )[0];
    dateOfConversation.innerHTML = onlyTheDateWeNeed;
  }

  function renderMessages(message, index) {
    document.getElementsByClassName("text-for-dialogue")[
      index
    ].innerHTML = message;
  }

  function renderImages(image, index) {
    if (index % 2 == 0) {
      document.getElementsByClassName("image-thumbnail")[0].src = image;
      document.getElementsByClassName("image-thumbnail")[1].src = image;
    } else {
      document.getElementsByClassName("image-thumbnail-card")[1].src = image;
      document.getElementsByClassName("image-thumbnail-card")[0].src = image;
    }
  }

  function renderConvoTime(fomrattedTime, index) {
    document.getElementsByClassName("time")[index].innerHTML = fomrattedTime;
  }

  function renderName(name, index) {
    document.getElementsByClassName("name")[index].innerHTML = name;
    styleName(index);
  }

  function styleName(index) {
    if (index % 2 != 0) {
      document.getElementsByClassName("name")[index].style.color = "blue";
    }
  }
}.call(this));

//# sourceMappingURL=index.js.map
