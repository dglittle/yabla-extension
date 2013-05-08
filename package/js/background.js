// check current tab url. If url starts with spanish.yabla.com/player_cdn then extension icon is shown

chrome.tabs.onUpdated.addListener(function(tabId, change, tab) {
    if (change.status == "complete") {
        checkYabla(tabId);
    }
});

chrome.tabs.onSelectionChanged.addListener(function(tabId, info) {
    checkYabla(tabId);
});

// Ensure the current selected tab is set up.
chrome.tabs.getSelected(null, function(tab) {
    checkYabla(tab.id);
});

function checkYabla(tabId) {
    chrome.tabs.get(tabId, function(tab) {
        if (/^.*?\/\/spanish\.yabla\.com\/player_cdn\.php/.test(tab.url)) {
            chrome.pageAction.show(tab.id);
        }
    })
}

chrome.pageAction.onClicked.addListener(function(tab) {
    chrome.extension.sendMessage({}, function(response) {

    });
});