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

// Получение логина второго пользователя
url = new URL(window.location.href);
user_to = url.searchParams.get("user_to");

$('.name_dialog').html(user_to);

refreshDialog();
function refreshDialog() {
    chrome.storage.local.get(['login', 'pswd'], function(result) {
        login = result.login;
        pswd = result.pswd;

        $('.login').html(login);

        $.ajax({
            url: 'https://wikigame/messages.php',
            method: 'POST',
            data: {
                login: login,
                pswd: pswd,
                action: 'get_messages',
                user_to: user_to,
            },
            crossDomain: true,
            success: function(data) {
                if (data == '') {
                    return;
                }
                var messages = JSON.parse(data);
                for (var i in messages) {
                    if (messages[i]['user_from'] == login) {
                        $('#dialog_window').append(`
                            <div id="youmessage" class="col-10 offset-2 text-center">${messages[i]['content']}</div>
                        `);
                    }
                    else {
                        $('#dialog_window').append(`
                            <div id="frendmessage" class="col-10 text-center">${messages[i]['content']}</div>
                        `);
                    }
                }
            },
            error: function() {
                alert('Не удалось совершить запрос');
            }
        });
    });
}

$('#submit').on('click', function() {
    // Проверка сообщения
    if ($('#plach').val() == '') {
        alert('Введите сообщение');
        return;
    }

    $.ajax({
        url: 'https://wikigame/messages.php',
        method: 'POST',
        data: {
            login: login,
            pswd: pswd,
            action: 'send',
            user_to: user_to,
            content: $('#plach').val()
        },
        crossDomain: true,
        success: function(data) {
        },
        error: function() {
            alert('Не удалось отправить сообщение');
        }
    });
    $('#submit').val('');
    $('#dialog_window').empty();
    refreshDialog();
});
