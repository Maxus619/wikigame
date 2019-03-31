$(document).ready(function() {
    $('.article').on('click', 'a', function() {
        chrome.tabs.create({url: $(this).attr('href')});
    });
});

// Взять параметр ссылки
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$('.pd_menu').hide();
$(".hide_pd_menu").css({ WebkitTransform: 'rotate(' + 90 + 'deg)' });

$('#burger').on('click', function() {
    $('.pd_menu').show();
    $('.osnov').css('filter', 'blur(2px)');
});

$('.hide_pd_menu').on('click', function() {
    $('.pd_menu').hide();
    $('.osnov').css('filter', 'blur(0px)');
});

$('.btn_delete').on('click', function() {
    deleteArticle($(this).attr('name'));
});

var table = getParameterByName('table');

function deleteArticle(url) {
    $.ajax({
        url: 'https://donexufa.ru/articles.php',
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

    $.ajax({
        url: 'https://donexufa.ru/articles.php',
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
                $('#scrol_articles').append(`
                    <div class="row">
                        <a class="col-12 article" href="${articles[i]['url']}">
                            ${articles[i]['title']}
                        </a>
                    </div>
                `);
            }
        },
        error: function() {
            alert('Не удалось совершить запрос');
        }
    });
});
