(function (documents, windows) {
    var domElement= documents.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        setRem= function () {
            var clientWidth = domElement.clientWidth;
            if (!clientWidth) return;
            if (clientWidth >= 1366) {
                domElement.style.fontSize = '1px';
            } else {
                domElement.style.fontSize = 1* (clientWidth / 1366) + 'px';
            }
        };

    if (!documents.addEventListener) return;
    setRem();
    windows.addEventListener(resizeEvt, setRem, false);
    documents.addEventListener('DOMContentLoaded', setRem, false);
})(document, window);
