//client id=iuxioif0oajo72w7a5kgbeuj7cppwp

  var channels = [
  "akariss",
  "dire_thunder",
  "disguisedtoasths",
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
/*  var URL_Streams = 'https://api.twitch.tv/kraken/streams/';
  var URL_Channel = 'https://api.twitch.tv/kraken/channels/';
  var callback = '?&client_id=iuxioif0oajo72w7a5kgbeuj7cppwp';

  function getChannelInfo() {
    channels.forEach(function(channel) {
      function makeURL(type, name) {
        return URL_Streams  + name + callback;
      };*/
$(function() {
  $.getJSON("https://api.twitch.tv/kraken/users/nimious?client_id=iuxioif0oajo72w7a5kgbeuj7cppwp").done(function(data) {
    console.log(data);
  })
});

/*            description = status === "online" ? var streamimage === preview + channel + ending : var streamimage === data.video_banner;*/

  var preview = "https://static-cdn.jtvnw.net/previews-ttv/live_user_";
  var ending = "-640x360.jpg"

  var URL_Streams = 'https://api.twitch.tv/kraken/streams/';
  var URL_Channel = 'https://api.twitch.tv/kraken/channels/';
  var callback = '?client_id=iuxioif0oajo72w7a5kgbeuj7cppwp';

  function getChannelInfo() {
    channels.forEach(function(channel) {
      function makeURL(type, name) {
        return 'https://api.twitch.tv/kraken/' + type + '/' + name + callback;
        /*return URL_Streams + name + callback;
        return URL_Channels + name + callback;*/
      };
      $.getJSON(makeURL("streams", channel), function(data) {
        var game,
            status;
        if (data.stream === null) {
          game = "Offline";
          status = "offline";
        } else {
          game = data.stream.game;
          status = "online";
        };
        $.getJSON(makeURL("channels", channel), function(data) {
          var logo = data.logo != null ? data.logo : "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F",
            name = data.display_name != null ? data.display_name : channel,
            description = status === "online" ? data.status : "";
            html = '<div class="row-' + 
            status + '"><div class="col-sm-6"><div class="card"><a href="' + 
            data.url + '" target="_blank"><div class="twitch-thumbnail"><div class="live"><div class="circle"></div>' +
            status + '</div><img src="https://steamstore-a.akamaihd.net/public/shared/images/apphubs/play_icon80.png" class="play-icon"><img class="category__image" src="' + 
            data.video_banner + ')"></a></div><div class="info"><div class="col-xs-2"><a href="' +
            data.url + '/videos" target="_blank"><img class="avatar category__image" src="' +
            logo + '"></a></div></div><div class="words col-xs-10"><a href="' + 
            data.url + '" target="_blank"><div class="description"><span class="game">[' +
            game + '] </span>' +
            description + '</div></a><a href="' +
            data.url + '/videos" target="_blank">' + 
            name + '<div class="streaming">'+ 
            game + '</div></a></div></div></div></div>';
          status === "online" ? $(".results").prepend(html) : $(".results").append(html);
        });
      });
    });
  };

$(document).ready(function() {
  getChannelInfo();
  $(".selector").click(function() {
    $(".selector").removeClass("active");
    $(this).addClass("active");
    var status = $(this).attr('id');
    if (status === "all") {
      $("#live-channels, #offline").removeClass("hidden");
    } else if (status === "online") {
      $("#live-channel").removeClass("hidden");
      $("#offline").addClass("hidden");
    } else {
      $(".offline").removeClass("hidden");
      $(".online").addClass("hidden");
    }
  })
});

//fix data.stream.viewers
//fix data.stream.preview.large

/*$(document).ready(function() {

  // URL for Twitch TV Streams
  var URL_Streams = 'https://api.twitch.tv/kraken/streams/';

  // URL for Twitch TV Channels
  var URL_Channel = 'https://api.twitch.tv/kraken/channels/';

  var callbak = '?callback=?&client_id=j15r3tcqv1ies1opd4ve46kq74106un';

  var twitchUsers = [
	"akariss",
	"attackingtucans",
	"dire_thunder",
	"disguisedtoasths",
	"joshjepson",
	"nimious"
	];

  var twitchUsersData = [];
  var streamStatus = '';
  var MAX_INFO = 45;
  var refreshRate = 300000;
  var active = 'all';

  function getStatus() {
    $(".results").empty();
    loading();
    twitchUsersData = [];

    twitchUsers.forEach(function(user) {

      var URL = URL_Streams + user + callbak;
      $.getJSON(URL, user)
        .done(function(data, textStatus, jqXHR) {

          var tempUsersData = {};

          tempUsersData.name = user;

          tempUsersData.status = data.status;
          

          tempUsersData.streaming = (data.stream !== null);
          if (tempUsersData.streaming) {
            tempUsersData.viewers = data.stream.viewers;
            tempUsersData.preview = data.stream.preview.large;
          } else {
            tempUsersData.viewers = null;
            tempUsersData.preview = null;
          }

          var URL = URL_Channel + user + callbak;

          $.getJSON(URL)
            .done(function(data, textStatus, jqXHR) {
              

              if (data.status === 422) {
                tempUsersData.streaming = null;
                tempUsersData.info = "account closed";
                tempUsersData.viewers = null;
                tempUsersData.preview = null;

              } else if (data.status === 404) {
                tempUsersData.streaming = null;
                tempUsersData.info = "non-existant account";
                tempUsersData.viewers = null;
                tempUsersData.preview = null;
              }

              tempUsersData.logo = data.logo;
              tempUsersData.url = null;
              if (data.status !== 422 && data.status !== 404) {
                tempUsersData.info = data.status;
                tempUsersData.displayName = data.display_name;
                tempUsersData.game = data.game;

                if (tempUsersData.preview === null && data.profile_banner !== null) {
                  tempUsersData.preview = data.profile_banner;
                }
                if (tempUsersData.preview === null && data.video_banner !== null) {
                  tempUsersData.preview = data.video_banner;
                }
                if (tempUsersData.preview === null && data.video_banner === null) {
                  tempUsersData.preview = "twitch";
                }
                //tempUsersData.url = data.url;
                tempUsersData.url = 'https://www.twitch.tv/' + data.name;
              }
              twitchUsersData.push(tempUsersData);
              // showUserData(tempUsersData);
              if (twitchUsersData.length == twitchUsers.length) {
                $(".results").empty();
                twitchUsersData.sort(sortList);
                twitchUsersData.forEach(function(who) {
                  $(".btn-group > .btn").removeClass("active");
                  $("#browse").addClass("active");
                  showUserData(who);
                });
              }
            })

          .fail(function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown.toString());
          });
        })

      .fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown.toString());
      });
    });
  }

  function showUserData(who) {

    var html = '';
    html += '<div class="col-xs-12 col-md-6 col-lg-4">';

    if (who.url !== null) {
      html += '<a href="' + who.url + '" target="_blank">';
    }

    html += '<div class="infocard" id="infocard_' + who.name + '">';

    if ((who.logo === null) || (who.logo === undefined)) {
      userLogo = 'http://2am.ninja/twitch/img/unknown.png';
    } else {
      userLogo = who.logo;
    }

    if (who.streaming) {
      streamStatus = 'stream-on';
    } else {
      streamStatus = 'stream-off';
    }

    html += '<img class="logo ' + streamStatus + '" src="' + userLogo + '" alt="">';

    if (who.url !== null) {
      html += '<div class="play"><i class="fa fa-play-circle-o fa-5x" aria-hidden="true"></i></div>';
    }

    html += '<div class="info"><ul>';

    var displayName = who.displayName;
    if (who.displayName === undefined) {
      displayName = who.name;
    }
    html += '<li"><span class="name">' + displayName + '</span></li>';

    if (who.info !== null) {
      html += '<li class="smaller">' + truncate(who.info, MAX_INFO) + '</li>';
    }

    var game = "";
    if (who.game !== null) {
      game = who.game;
    }
    if (who.streaming) {
      html += '<li class="smaller2">' + game + '&nbsp;&nbsp;<span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> ' + who.viewers + '</li>';
    }
    html += '</ul></div>';
    html += '</div>';
    html += '</a>';
    html += '</div>';

    $("#results").append(html);

    if (who.preview !== null && who.preview !== 'twitch') {
      $('#infocard_' + who.name).css({
        "background-image": 'url(' + who.preview + ')',
        "background-color": "black"
      });
    }

    if (who.preview === "twitch") {
      $('#infocard_' + who.name).css(
        "background-color", "#6441A5"
      );
    }

    //$('#infocard_' + who.name).toggle();
    $('#infocard_' + who.name).addClass('animated fadeIn');

  }

  function truncate(str, num) {
    if (typeof(str) !== 'undefined') {
      if (str.length > num) {
        return str.slice(0, num - 3) + '&#8230;';
      }
    }
    return str;
  }


  $("#browse").click(function() {
    $(".results").empty();
    twitchUsersData.sort(sortList);
    twitchUsersData.forEach(function(who) {
      showUserData(who);
    });
  });

  $("#live-channels").click(function() {
    $(".results").empty();
    twitchUsersData.sort(sortList);
    twitchUsersData.filter(function(channel) {
      return channel.streaming;
    }).forEach(function(who) {
      showUserData(who);
    });
  });

  $("#offline").click(function() {
    $(".results").empty();
    twitchUsersData.sort(sortList);
    twitchUsersData.filter(function(channel) {
      return (!channel.streaming);
    }).forEach(function(who) {
      showUserData(who);
    });
  });

    $(".results").empty();
    twitchUsersData.sort(sortList);
    results.forEach(function(who) {
      showUserData(who);
    });
  });

  getStatus();

  // update info every 5 mins
  intervalID = setInterval(getStatus, refreshRate);

});*/