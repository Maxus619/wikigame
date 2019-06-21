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

updateDialogs();

function updateDialogs() {
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
                action: 'get_dialogs'
            },
            crossDomain: true,
            success: function(data) {
                if (data == '') {
                    return;
                }
                var messages = JSON.parse(data);
                var users = [];
                for (var i in messages) {
                    if (messages[i]['user_from'] != login) {
                        if (users.includes(messages[i]['user_from']))
                            continue;
                        user_to = messages[i]['user_from'];
                        users.push(user_to);
                    }
                    else {
                        if (users.includes(messages[i]['user_to']))
                            continue;
                        user_to = messages[i]['user_to'];
                        users.push(user_to);
                    }
                    $('.dialogs').append(`
                        <a href="popup_dialog.html?user_to=${user_to}">
                            <div class="col-12 dialog">
                                <div>
                                    <h6>${user_to}</h6>
                                </div>
                                <div>${messages[i]['content']}</div>
                            </div>
                        </a>
                    `);
                }
            },
            error: function() {
                alert('Не удалось совершить запрос');
            }
        });
    });
}
