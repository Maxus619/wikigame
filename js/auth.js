var login = '';
var pswd = '';

chrome.storage.local.get(['login', 'pswd'], function(result) {
    login = result.login;
    pswd = result.pswd;

    if (login && pswd) {
        $.ajax({
            url: 'https://wikigame/auth.php',
            method: 'POST',
            data: {
                login: login,
                pswd: pswd
            },
            crossDomain: true,
            success: function(data) {
                if (data == 'Success') {
                    window.location.href = 'popup_main.html';
                }
            }
        });
    }
});

$('#submit').click(function() {
    // Проверка на заполненные поля
    if ($('#login').val() == '' || $('#pswd').val() == '') {
        alert('Не все поля заполнены');
        return;
    }

    $.ajax({
        url: 'https://wikigame/auth.php',
        method: 'POST',
        data: {
            login: $('#login').val(),
            pswd: $('#pswd').val()
        },
        crossDomain: true,
        success: function(data) {
            if (data == 'Success') {
                window.location.href = 'popup_main.html';
                chrome.storage.local.set({
                    login: $('#login').val(),
                    pswd: $('#pswd').val()
                });
            }
            else {
                alert('Неправильный логин или пароль');
            }
        },
        error: function() {
            alert('Не удалось совершить запрос');
        }
    });
});
