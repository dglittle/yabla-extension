// added file scripts.js:
var s = document.createElement('script');
s.src = chrome.extension.getURL("js/scripts.js");
s.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head||document.documentElement).appendChild(s);


// switch on/off extension:
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    var actualCode = [
        'if (window.setEnabledExtension) {',
        '   setEnabledExtension(' + request.enabled.toString() + ')',
        '}'].join('\n');

    var script = document.createElement('script');
    script.textContent = actualCode;
    (document.head||document.documentElement).appendChild(script);
    script.parentNode.removeChild(script);
});
