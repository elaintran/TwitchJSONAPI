var streamers = document.querySelector(".streamers");

var channels = [
  "akariss",
  "dire_thunder",
  "disguisedtoast",
  "joshjepson",
  "nimious",
  "marbelsoda",
  "scarra",
  "fedmyster",
  "lilypichu",
  "pokimane",
  "xell",
  "teegrassi",
  "taj1ma"
];

var streamURL = 'https://api.twitch.tv/kraken/streams/';
var streamChannel = 'https://api.twitch.tv/kraken/channels/';
var callback = '?&client_id=iuxioif0oajo72w7a5kgbeuj7cppwp';

getChannelInfo();

function getChannelInfo() {
  channels.forEach(function(channel) {
    function makeStreamURL(type, name) {
      return "https://api.twitch.tv/kraken/" + type + "/" + name + callback;
    }
      $.getJSON(makeStreamURL("streams", channel), function(data) {
        //console.log(data);
        if (data.stream === null) {
          var status = "offline";
          var game = "Offline";
          var viewers = "";
        } else {
          var game = data.stream.game;
          var live = data.stream.stream_type;
          var status = "live";
          var preview = data.stream.preview.large;
          var viewers = data.stream.viewers;
          //var preview = data.video_banner;
        }
        $.getJSON(makeStreamURL("channels", channel), function(channelData) {
          if (game == "Offline") {
            var newPreview = channelData.video_banner;
            var gameLink = game;
          } else {
            var newPreview = preview;
            var gameLink = "<a href ='https://www.twitch.tv/directory/game/" + game + "' class='game-link' target='_blank'>" + game + "</a>";
          }
          var html = "<div class='col-sm-4 " + status + "'><a href ='" + channelData.url +
          "' target='_blank'><div class='box'><div class='circle'></div>" + status + "</div><img src='" + newPreview +
          "' class='preview'><div class='viewers'><i class='fa fa-user'></i> " + viewers +
          "</div></a><div class='streamers'><h4><a href ='" + channelData.url + "' target='_blank'>" + channelData.display_name +
          "</a></h4><p>" + gameLink + "</p></div></div>";
          if (status === "live") {
            $(".row").prepend(html);
          } else {
            $(".row").append(html);
          }
          console.log(channelData);
        });
      });
  });
}

$(document).ready(function() {
  $(".all-tag").on("click", function() {
    $(".all-tag").addClass("active");
    $(".live-tag").removeClass("active");
    $(".offline-tag").removeClass("active");
    $(".live").show();
    $(".offline").show();
  })
  $(".live-tag").on("click", function() {
    $(".live-tag").addClass("active");
    $(".all-tag").removeClass("active");
    $(".offline-tag").removeClass("active");
    $(".live").show();
    $(".offline").hide();
  })
  $(".offline-tag").on("click", function() {
    $(".offline-tag").addClass("active");
    $(".all-tag").removeClass("active");
    $(".live-tag").removeClass("active");
    $(".offline").show();
    $(".live").hide();
  })
})

//https://www.twitch.tv/directory/game/