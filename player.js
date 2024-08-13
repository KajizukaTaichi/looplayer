const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

if (id !== null) {
  document.getElementById("videoId").value = id;
}

const start = urlParams.get("start");
if (start !== null) {
  document.getElementById("startTime").value = start;
}

const end = urlParams.get("end");
if (end !== null) {
  document.getElementById("endTime").value = end;
}

var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var timer;
var player;

function play() {
  var videoId = document.getElementById("videoId").value;

  const startTimeStr = document.getElementById("startTime").value;
  const endTimeStr = document.getElementById("endTime").value;

  const [startMinutes, startSeconds] = startTimeStr.split(":").map(Number);
  const [endMinutes, endSeconds] = endTimeStr.split(":").map(Number);

  var startTime = startMinutes * 60 + startSeconds;
  var endTime = endMinutes * 60 + endSeconds;

  window.history.pushState(
    null,
    null,
    `${window.location.origin}${window.location.pathname}?id=${videoId}&start=${startTimeStr}&end=${endTimeStr}`,
  );

  var player = new YT.Player("player", {
    width: "100%",
    videoId: videoId,
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });

  function onPlayerReady(event) {
    if (isNaN(startTime) || startTime >= player.getDuration()) {
      startTime = 0;
    }
    if (isNaN(endTime) || endTime >= player.getDuration()) {
      endTime = player.getDuration() - 1;
    }

    player.seekTo(startTime);
    player.playVideo();
  }

  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
      timer = setInterval(checkTime, 1000);
    } else if (event.data == YT.PlayerState.PAUSED) {
      clearInterval(timer);
    }
  }

  function checkTime() {
    var currentTime = player.getCurrentTime();

    if (currentTime > endTime || currentTime < startTime) {
      player.seekTo(startTime);
    }
  }
}
