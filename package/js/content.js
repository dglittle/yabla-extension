// added file scripts.js

var s = document.createElement('script');
s.src = chrome.extension.getURL("js/scripts.js");
s.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head||document.documentElement).appendChild(s);


chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        alert('zzzzz');
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.greeting == "hello")
            sendResponse({farewell: "goodbye"});
    });