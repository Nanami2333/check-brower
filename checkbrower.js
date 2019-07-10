(function (root,factory) {
    if (typeof define === 'function' && define.amd) {
        /*AMD. Register as an anonymous module.
        *define([], factory); */
        define([], factory());
    } else if (typeof module === 'object' && module.exports) {
        /*Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.*/
        module.exports = factory();

    } else {
        /*Browser globals (root is window)*/
        root['check'] = factory();
    }
}(this, function (global) {
    global.browserCheck=function () {
        var userAgentString = global.navigator&&global.navigator.userAgent || this.http&&this.http.userAgent() ||  '',
            match2 = userAgentString.match(/Android|BlackBerry|iPhone|iPad|iPod|IEMobile|Mobile/);
        var browsers = [
            [ 'Edge', /Edge\/([0-9\._]+)/ ],
            [ 'Yandexbrowser', /YaBrowser\/([0-9\._]+)/ ],
            [ 'Chrome', /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/ ],
            [ 'Crios', /CriOS\/([0-9\.]+)(:?\s|$)/ ],
            [ 'Firefox', /Firefox\/([0-9\.]+)(?:\s|$)/ ],
            [ 'Opera', /Opera\/([0-9\.]+)(?:\s|$)/ ],
            [ 'Opera', /OPR\/([0-9\.]+)(:?\s|$)$/ ],
            [ 'IE', /Trident\/7\.0.*rv\:([0-9\.]+)\).*Gecko$/ ],
            [ 'IE', /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/ ],
            [ 'IE', /MSIE\s([6-8]\.0)/ ],
            [ 'bb10', /BB10;\sTouch.*Version\/([0-9\.]+)/ ],
            [ 'Android', /Android\s([0-9\.]+)/ ],
            [ 'IOS', /Version\/([0-9\._]+).*Mobile.*Safari.*/ ],
            [ 'Safari', /Version\/([0-9\._]+).*Safari/ ],
            [ 'UCBrowser', /UCBrowser\/([0-9\._]+)/ ]
        ];
        var check={};
        for(var i=0;i<browsers.length;i++){
            if (browsers[i][1].test(userAgentString)) {
                var match = browsers[i][1].exec(userAgentString);
                var version = match && match[1].split(/[._]/).slice(0,3);
                if (version.length < 3) {
                    version.length = 3;
                    version[2]=0;
                }
                check= {
                    browser: browsers[i][0],
                    //version: version.join('.')
                    version: version[0],
                    mobile:browsers[i][0]=='Android'||browsers[i][0]=='IOS' || browsers[i][0]=='bb10' || (match2 && match2[0]) || false
                };
            }
        }
        return check;
    };
}))
