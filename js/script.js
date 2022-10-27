console.log('SCRIPT JS');
var VERIFYKEY = 'aead19ca';

var notificationHandler = function (data) {
  console.log('notificationHandler', data);
  // Do something with the notifications
};

var focusHandler = function () {
  console.log('focusHandler');
  // Do something when the visitor is focused
  // Assume the visitor is focused to begin with
};

var blurHandler = function () {
  console.log('blurHandler');
  // Do something when the visitor is blurred
  // Assume the visitor is focused to begin with
};

console.log('SCRIPT JS', lpTag.agentSDK);

lpTag.agentSDK.init({
  notificationCallback: notificationHandler,
  visitorFocusedCallback: focusHandler,
  visitorBlurredCallback: blurHandler,
});

var updateCallback = function (data) {
  // Do something with the returning data
  var path = data.key;
  var value = data.newValue;
  console.log('updateCallback', value);
  console.log('updateCallback', value[0]);
  if (value && value[0].source === 'visitor') {
    console.log('VISITOR TEXT', value[0].text);
    var title = value[0].text;
    fetch(`https://www.omdbapi.com/?apikey=${VERIFYKEY}&t=${title}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json && json.Title) {
          var info = `Movie: ${json.Title}\nPlot: ${json.Plot}\nDirector: ${json.Director}\n Actors: ${json.Actors}`;
          return createElement(info);
        }
      });
  }
};

function createElement(info) {
  const element = document.getElementById('info');
  console.log('Element', element);
  if (element) {
    element.innerText = info;
  } else {
    const para = document.createElement('p');
    para.innerText = info;
    para.id = 'info';
    // Append to body:
    document.body.appendChild(para);
  }
}

var notifyWhenDone = function (err) {
  if (err) {
    console.log('notifyWhenDone', err);
    // Do something with the error
  }
  // called when the bind is completed successfully,
  // or when the action terminated with an error.
};

//var pathToData = 'visitorInfo.visitorName';
var pathToData = 'chatTranscript.lines';

lpTag.agentSDK.bind(pathToData, updateCallback, notifyWhenDone);
