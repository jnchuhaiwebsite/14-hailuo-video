// 异步加载ch4.js文件
(function() {
    var script = document.createElement('script');
    script.src = '/js/ch6.js';
    script.async = true;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(script, s);
})(); 