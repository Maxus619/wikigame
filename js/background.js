// Для ссылок с разных языков
var langArray =  ["ar","az","bg","nan","be","ca","cs","da","de","et","el","en","es","eo","eu","fa","fr","gl","ko","hy","hi","hr","id","it","he","ka","la","lt","hu","ms","min","nl","ja","no","nn","ce","uz","pl","pt","kk","ro","ru","ceb","sk","sl","sr","sh","fi","sv","ta","th","tr","uk","ur","vi","vo","war","zh"];
var detailArray = ["العربية","Azərbaycanca","Български","Bân-lâm-gú / Hō-ló-oē","Беларуская (Акадэмічная)","Català","Čeština","Dansk","Deutsch","Eesti","Ελληνικά","English","Español","Esperanto","Euskara","فارسی","Français","Galego","한국어","Հայերեն","हिन्दी","Hrvatski","Bahasa Indonesia","Italiano","עברית","ქართული","Latina","Lietuvių","Magyar","Bahasa Melayu","Bahaso Minangkabau","Nederlands","日本語","Norsk (Bokmål)","Norsk (Nynorsk)","Нохчийн","Oʻzbekcha / Ўзбекча","Polski","Português","Қазақша / Qazaqşa / قازاقشا","Română","Русский","Sinugboanong Binisaya","Slovenčina","Slovenščina","Српски / Srpski","Srpskohrvatski / Српскохрватски","Suomi","Svenska","தமிழ்","ภาษาไทย","Türkçe","Українська","اردو","Tiếng Việt","Volapük","Winaray","中文"];

// Проверка настроек и версии
chrome.runtime.onInstalled.addListener(function(details) {
	if (details.reason == "update" || "install") {
		if (localStorage.getItem("language") === null) {
			// Определение языка системы
			var lang = navigator.languages[0];
			// Обрезать название локализации (en-US -> en) для формата Википедии
			var n = lang.indexOf('-');
			lang = lang.substring(0, n != -1 ? n : lang.length);
			// Проверить язык на сайте Википедии
			if (langArray.includes(lang)) {
				console.log("Language auto-detected as '" + lang + "' (" + detailArray[langArray.indexOf(lang)] + ")");
				localStorage["language"] = lang;
				localStorage["full-language"] = detailArray[langArray.indexOf(lang)];
			}
			else {
				// Поставить язык на английский
				console.log("Could not auto-detect language, defaulting to 'en' (English)")
				localStorage["language"] = "en";
				localStorage["full-language"] = detailArray[langArray.indexOf("en")];
			}
		}
		if (localStorage.getItem("full-language") === null) {
			localStorage["full-language"] = detailArray[langArray.indexOf(localStorage["language"])];
		}
		if (localStorage.getItem("protocol") === null) {
			localStorage["protocol"] = "https://";
		}
        /*
		if (localStorage.getItem("settings-modified") === null) {
			localStorage["settings-modified"] = "false";
		}
        */
	}
	if (localStorage.getItem("version") != chrome.runtime.getManifest().version) {
		//chrome.tabs.create({'url': chrome.extension.getURL('welcome.html')});
		localStorage["version"] = chrome.runtime.getManifest().version;
	}
});

// Контекстное меню
chrome.contextMenus.create({
	title: "Search in Wikipedia",
	contexts: ["selection"],
	onclick: function searchText(info) {
		// TODO: Добавление под разные языки
        // var url = encodeURI(localStorage["protocol"] + localStorage["language"] + ".wikipedia.org/w/index.php?title=Special:Search&search=" + info.selectionText);
        var url = encodeURI(localStorage["protocol"] + 'ru' + ".wikipedia.org/w/index.php?title=Special:Search&search=" + info.selectionText);
        chrome.tabs.create({url: url});
	}
});
