const parseCookies = (req, res, next) => {
    if (req.headers.cookie) {
        var seriesStr = req.headers.cookie;
        var obj = {};
        var cookieArr = seriesStr.split('; ').forEach(
            (i) => {
                var p = i.split('=');
                obj[p[0]] = p[1];
            });
        req.cookies = obj;
    } else {
        req.cookies = {};
    }
    next();
};

module.exports = parseCookies;


