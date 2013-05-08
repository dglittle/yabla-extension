// check current tab url. If url starts with spanish.yabla.com/player_cdn then extension icon is shown
var enabledYablaExtension = true;
var REGEX_YABLA = /^.*?\/\/spanish\.yabla\.com\/player_cdn\.php/;

chrome.tabs.onUpdated.addListener(function(tabId, change, tab) {
    if (change.status == "complete") {
        checkYabla(tabId, true);
    }
});

chrome.tabs.onSelectionChanged.addListener(function(tabId, info) {
    checkYabla(tabId);
});

// Ensure the current selected tab is set up.
chrome.tabs.getSelected(null, function(tab) {
    checkYabla(tab.id);
});

function checkYabla(tabId, updated) {
    chrome.tabs.get(tabId, function(tab) {
        if (REGEX_YABLA.test(tab.url)) {
            setTrueIcon(enabledYablaExtension, tabId);
            chrome.pageAction.show(tab.id);
            if (updated === true) {
                chrome.tabs.sendMessage(tab.id, {"enabled": enabledYablaExtension});
            }
        }
    })
}

chrome.pageAction.onClicked.addListener(function(tab) {
    enabledYablaExtension = !enabledYablaExtension;
    chrome.tabs.query({}, function(tabs) {
        for (var i = 0; i < tabs.length; i++) {
            if (REGEX_YABLA.test(tabs[i].url)) {
                setTrueIcon(enabledYablaExtension, tabs[i].id);
                chrome.tabs.sendMessage(tabs[i].id, {"enabled": enabledYablaExtension});
            }
        }
    })
});

function setTrueIcon(en, tabId) {
    var icon = 'img/icon.png';
    if (!en) {
        icon = 'img/icon1.png';
    }
    chrome.pageAction.setIcon({
        path: icon,
        tabId: tabId
    });
}