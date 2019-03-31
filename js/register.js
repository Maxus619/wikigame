function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

$('#submit').click(function() {
    // Проверка на заполненные поля
    if ($('#email').val() == '' || $('#login').val() == '' || $('#pswd').val() == '') {
        alert('Не все поля заполнены');
        return;
    }
    // Проврека на электронную почту
    if (!validateEmail($('#email').val())) {
        alert('Email введён неправильно');
        return;
    }
    if ($('#pswd').val().length < 6) {
        alert('Пароль должен состоять из минимум 6 символов');
        return;
    }

    $.ajax({
        url: 'https://donexufa.ru/register.php',
        method: 'POST',
        data: {
            email: $('#email').val(),
            login: $('#login').val(),
            pswd: $('#pswd').val()
        },
        crossDomain: true,
        success: function(data) {
            if (data == 'Success') {
                window.location.href = 'popup_auth.html';
            }
            else if (data == 'Login is taken') {
                alert('Такой логин уже занят');
            }
            else if (data == 'Email is taken') {
                alert('Такой email уже занят');
            }
        },
        error: function() {
            alert('Не удалось совершить запрос');
        }
    });
});
