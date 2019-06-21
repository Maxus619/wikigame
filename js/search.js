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

$('.btn-info').on('click', function() {
    $('.users').empty();

    chrome.storage.local.get(['login', 'pswd'], function(result) {
        login = result.login;
        pswd = result.pswd;

        $('.login').html(login);

        $.ajax({
            url: 'https://wikigame/users.php',
            method: 'POST',
            data: {
                login: login,
                pswd: pswd,
                user: $('#plach').val()
            },
            crossDomain: true,
            success: function(data) {
                if (data == 'Success') {
                    $('.users').append(`
                        <div class="username row">
                            <div class="col-9 user">${$('#plach').val()}</div>
                            <form method="post" action="popup_dialog.html?user_to=${$('#plach').val()}">
                                <button type="submit" id="submit" class="btn btn-info col-md-3">Написать</button>
                            </form>
                        </div>
                    `);
                }
                else {
                    $('.users').append('Пользователь не найден');
                }
            },
            error: function() {
                alert('Не удалось совершить запрос');
            }
        });
    });
});
