chrome.runtime.onMessage.addListener(
  function (request) {
    console.log("Message received: " + request.greeting);
    if (request.greeting === "color")
      get(completedColor, local).then(updateColors);
  });

$(document).ready(() => {
  get(completedColor, local).then(updateColors);
});