var main_div = document.createElement('div');
var toread_div = document.createElement('div');
var read_div = document.createElement('div');
var favorite_div = document.createElement('div');

main_div.style.position = 'fixed';
main_div.style.bottom = '0px';
main_div.style.right = '0px';
main_div.style.zIndex = '101';
main_div.style.width = '150px';
main_div.style.height = '50px';

toread_div.className = 'toread';
toread_div.style.display = 'inline-block';
toread_div.style.width = '50px';
toread_div.style.height = '50px';
toread_div.style.background = 'url(https://wikigame/images/toread.png)';
toread_div.style.backgroundSize = 'cover';
toread_div.style.title = 'Добавить в запланированное';
toread_div.onclick = function() {
    addArticle('toread_article');
};

read_div.className = 'read';
read_div.style.display = 'inline-block';
read_div.style.width = '50px';
read_div.style.height = '50px';
read_div.style.background = 'url(https://wikigame/images/read.png)';
read_div.style.backgroundSize = 'cover';
read_div.style.title = 'Пометить статью прочитанной';
read_div.onclick = function() {
    addArticle('read_article');
};

favorite_div.className = 'favorite';
favorite_div.style.display = 'inline-block';
favorite_div.style.width = '50px';
favorite_div.style.height = '50px';
favorite_div.style.background = 'url(https://wikigame/images/fav1.png)';
favorite_div.style.backgroundSize = 'cover';
favorite_div.style.title = 'Добавить в избранное';
favorite_div.onclick = function() {
    addArticle('favorite_article');
};

document.body.appendChild(main_div);
main_div.appendChild(toread_div);
main_div.appendChild(read_div);
main_div.appendChild(favorite_div);

function addArticle(table) {
    var url = window.location.toString();
    var title = document.getElementById('firstHeading').innerHTML;

    chrome.storage.local.get(['login', 'pswd'], function(result) {
        login = result.login;
        pswd = result.pswd;

        if (login && pswd) {
            $.ajax({
                url: 'https://wikigame/articles.php',
                method: 'POST',
                data: {
                    login: login,
                    pswd: pswd,
                    action: 'add',
                    table: table,
                    title: title,
                    url: url
                },
                crossDomain: true,
                success: function(data) {
                    if (data == 'Success') {
                        if (table == 'toread_article') {
                            alert('Страница добавлена в запланированные');
                        }
                        else if (table == 'read_article') {
                            alert('Страница добавлена в прочитанные');
                            clearInterval(checkScrollPercent);
                        }
                        else if (table == 'favorite_article') {
                            alert('Страница добавлена в избранные');
                        }
                    }
                    else if (data == 'Auth fail') {
                        alert('Авторизируйтесь в приложении');
                    }
                    else if (data == 'Already exists') {
                        alert('Такая запись уже существует');
                    }
                },
                error: function() {
                    alert('Авторизируйтесь в расширении');
                }
            });
        }
    });
}

function getScrollPercent() {
    var h = document.documentElement,
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';
    return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
}

var checkScrollPercent = setInterval(function() {
    if (getScrollPercent() > 85.0) {
        clearInterval(checkScrollPercent);
        addArticle('read_article');
    }
}, 2000);
