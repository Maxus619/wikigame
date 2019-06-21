$('.pd_menu').hide();
$(".hide_pd_menu").css({ WebkitTransform: 'rotate(' + 90 + 'deg)' });

$("#burger").on( "click", function () {
    $('.pd_menu').show();
    $('.osnov').css('filter', 'blur(2px)');
});

$(".hide_pd_menu").on( "click", function () {
    $('.pd_menu').hide();
    $('.osnov').css('filter', 'blur(0px)');
});

chrome.storage.local.get(['login', 'pswd'], function(result) {
    login = result.login;
    pswd = result.pswd;

    $('.login').html(login);

    // Вывод запланированного
    $.ajax({
        url: 'https://wikigame/articles.php',
        method: 'POST',
        data: {
            login: login,
            pswd: pswd,
            action: 'get',
            table: 'toread_article'
        },
        crossDomain: true,
        success: function(data) {
            $('.toread').html('Запланировано (' + Object.keys(JSON.parse(data)).length + ')');
        },
        error: function() {
            alert('Не удалось совершить запрос');
        }
    });

    // Вывод уровня
    $.ajax({
        url: 'https://wikigame/articles.php',
        method: 'POST',
        data: {
            login: login,
            pswd: pswd,
            action: 'get',
            table: 'users'
        },
        crossDomain: true,
        success: function(data) {
            var base_exp = 20.0;
            var lvl = 1;
            var user = JSON.parse(data);
            var exp = parseFloat(user.experience);
            // TODO: вычисление опыта
            while (exp >= base_exp) {
                exp -= base_exp;
                lvl++;
                base_exp *= 1.5;
            }

            $('.col-2').html('Lvl.' + lvl);
            $('.col-1').html(exp + '/' + parseInt(base_exp));

            $('.progress-bar').css('width', exp / base_exp * 100 + '%');
        },
        error: function() {
            alert('Не удалось совершить запрос');
        }
    });

    // Вывод рейтинга
    $.ajax({
        url: 'https://wikigame/rating.php',
        method: 'POST',
        crossDomain: true,
        success: function(data) {
            if (data == '') {
                return;
            }
            var users = JSON.parse(data);
            place = 0;
            lastExp = 0;
            for (var i in users) {
                if (users[i]['experience'] != lastExp) {
                    place++;
                    lastExp = users[i]['experience'];
                }

                if (users[i]['login'] == login)
                    $('.rating').append(place.toString() + ') <b>Вы</b> | ' + users[i]['experience'] + '<br>');
                else
                    $('.rating').append(place.toString() + ') ' + users[i]['login'] + ' | ' + users[i]['experience'] + '<br>');

                if (place == 5)
                    return;
            }
        },
        error: function() {
            alert('Не удалось совершить запрос');
        }
    });
});
