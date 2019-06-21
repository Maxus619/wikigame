// Переход по ссылке
$(document).on('click', '.article', function() {
    chrome.tabs.create({url: $(this).attr('href')});
});
// Удаление статьи из списка
$(document).on('click', '.btn_delete', function() {
     deleteArticle($(this).attr('name'));
});

// Взять параметр ссылки
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Поиск статей
$('#search').on('keyup', function() {
    $('#scroll_articles').html('');
    for (var i in all_articles) {
        if (all_articles[i][0].toLowerCase().includes($('#search').val().toLowerCase())) {
            $('#scroll_articles').append(`
                <div class="row">
                    <a class="col-12 article" href="${all_articles[i][1]}">
                        ${all_articles[i][0]}
                    </a>
                    <a class="btn_delete" name="${all_articles[i][1]}">Удалить</a>
                </div>
            `);
        }
    }
});

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

var table = getParameterByName('table');
var all_articles = [];

function deleteArticle(url) {
    $.ajax({
        url: 'https://wikigame/articles.php',
        method: 'POST',
        data: {
            login: login,
            pswd: pswd,
            action: 'del',
            table: table + '_article',
            url: url
        },
        crossDomain: true,
        success: function(data) {
            location.reload();
        },
        error: function() {
            alert('Не удалось совершить удаление');
        }
    });
}

chrome.storage.local.get(['login', 'pswd'], function(result) {
    login = result.login;
    pswd = result.pswd;

    $('.login').html(login);

    if (table == 'toread') {
        $('.toread').html('Запланированное');
    }
    else if (table == 'read') {
        $('.toread').html('Прочитанное');
    }
    else if (table == 'favorite') {
        $('.toread').html('Избранное');
    }

    $.ajax({
        url: 'https://wikigame/articles.php',
        method: 'POST',
        data: {
            login: login,
            pswd: pswd,
            action: 'get',
            table: table + '_article'
        },
        crossDomain: true,
        success: function(data) {
            if (data == '') {
                return;
            }
            var articles = JSON.parse(data);
            for (var i in articles) {
                $('#scroll_articles').append(`
                    <div class="row">
                        <a class="col-12 article" href="${articles[i]['url']}">
                            ${articles[i]['title']}
                        </a>
                        <a class="btn_delete" name="${articles[i]['url']}">Удалить</a>
                    </div>
                `);
                all_articles.push([articles[i]['title'], articles[i]['url']]);
            }
            console.dir(all_articles);
        },
        error: function() {
            alert('Не удалось совершить запрос');
        }
    });
});
