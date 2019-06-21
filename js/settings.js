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

$('.exit').on('click', function() {
    chrome.storage.local.set({
        login: '',
        pswd: ''
    });
    window.location.href = 'popup_auth.html';
});

$('.delete').on('click', function() {
    if (confirm('Удалить профиль?')) {
        $.ajax({
            url: 'https://wikigame/delete_user.php',
            method: 'POST',
            data: {
                login: $('#login').val(),
                pswd: $('#pswd').val()
            },
            crossDomain: true,
            success: function(data) {
                if (data == 'Success') {
                    chrome.storage.local.set({
                        login: '',
                        pswd: ''
                    });
                    window.location.href = 'popup_auth.html';
                }
            },
            error: function() {
                alert('Не удалось совершить запрос');
            }
        });
    }
})
