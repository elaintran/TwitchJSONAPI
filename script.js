var streamers = document.querySelector(".streamers");

var channels = [
    "akariss",
    "dire_thunder",
    "nimious",
    "joshjepson",
    "teegrassi",
    "taj1ma",
    "mechaf",
    "shietz",
    "vinsonte",
    "doremy_puyotet",
    "wumbotize",
    "itsaruvn",
    "etce",
    "cpokemon12",
    "cryaotic",
    "sykkuno",
    "kilimepie"
];

var callback = "iuxioif0oajo72w7a5kgbeuj7cppwp";

function getChannelInfo() {
    channels.forEach(function(channel) {
        //gets basic user info from streamers
        $.ajax({
            method: "GET",
            headers: {
                "Client-Id": callback
            },
            url: makeStreamURL("users?login=", channel)
        }).then(function(userData) {
            var status = "";
            var game = "";
            var preview = userData.data[0].offline_image_url;
            var gameLink = "";
            //gets info from users currently streaming
            $.ajax({
                method: "GET",
                headers: {
                    "Client-ID": callback
                },
                url: makeStreamURL("streams?user_login=", channel)
            }).then(function(streamData) {
                if (streamData.data.length === 0) {
                    status = "offline";
                    game = "Offline";
                } else {
                    status = "live";
                    preview = "https://static-cdn.jtvnw.net/previews-ttv/live_user_" + channel + "-1920x1080.jpg";
                    return $.ajax({
                        method: "GET",
                        headers: {
                            "Client-ID": callback
                        },
                        url: makeStreamURL("games?id=", streamData.data[0].game_id)
                    }).then(function(gameName) {
                        game = gameName.data[0].name;
                    });
                }
            }).then(function() {
                if (status === "offline" && preview === "") {
                    preview = "images/black-background.png";
                }
                gameLink = "<a href ='https://www.twitch.tv/directory/game/" + game + "' class='game-link' target='_blank'>" + game + "</a>";
                var html = "<div class='col-sm-4 " + status + "'><a href ='https://www.twitch.tv/" + channel +
                "' target='_blank'><div class='box'><div class='circle'></div>" + status + "</div><img src='" + preview +
                "' class='preview'></a><div class='streamers'><h4><a href ='https://www.twitch.tv/" + channel + "' target='_blank'>" + userData.data[0].display_name +
                "</a></h4><p>" + gameLink + "</p></div></div>";
                if (status === "live") {
                    $(".row").prepend(html);
                } else {
                    $(".row").append(html);
                }
            });
        });
    });
}
getChannelInfo();

function makeStreamURL(type, name) {
    return "https://api.twitch.tv/helix/" + type + name;
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