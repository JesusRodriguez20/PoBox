function LeerConfig() {
    sessionStorage.Language = localStorage.Language;
    localStorage.clear();
    $.ajax({
        url: 'Config.txt',
        error: function () {
            alert('No se encontro configuracion');
        },
        async: false,
        success: function (data) {
            process(data);
        }
    });
    sessionStorage.Language = localStorage.Language;
};
function LeerConfigLogin() {
    sessionStorage.Language = localStorage.Language;
    localStorage.clear();
    $.ajax({
        url: '../Config.txt',
        error: function () {
            alert('No se encontro configuracion');
        },
        async: false,
        success: function (data) {
            process(data);
        }
    });
    localStorage.Language = sessionStorage.Language;
};

function process(data) {
    var arr = data.split('\n');
    for (var i in arr) {
        if (lineValid(arr[i])) {
            var obj = arr[i].split('=>');
            switch (obj[0]) {
                case "ApiUrl":
                    localStorage.ApiUrl = obj[1];
                    break;
                case "LogoUrl":
                    localStorage.LogoUrl = obj[1];
                    break;
                case "ResponseUrlPSE":
                    localStorage.ResponseUrlPSE = obj[1];
                    break;
                case "ConfirmationUrlCash":
                    localStorage.ConfirmationUrlCash = obj[1];
                    break;
                default:
                    break;
            }
        }
    }
}

function lineValid(line) {
    return (line.trim().length > 0);
}

function iniciar() {
    if (!checkCookie()) {
        exit();
        return false;
    }
    if (localStorage.hfPoboxNumber == null || localStorage.hfPoboxNumber == "undefined" ||
                localStorage.hfPoboxNumber == "") {
        exit();
        return false;
    }
    $('#imgLogo').attr('src', localStorage.LogoUrl);
    document.getElementById("lblUserName").innerHTML = localStorage.hfCompleteName;
    startLang();
    setCookie();
}
function exit() {
    localStorage.clear();
    window.location.href = '../index.html';
}

//Lenguaje para HTML
function startLang() {
    if (localStorage.Language == null || localStorage.Language == "undefined" ||
                localStorage.Language == "") {
        localStorage.Language = "en"
    }
    loadLang(localStorage.Language);
    $('html').attr('lang', localStorage.Language);
}

function loadLang(lang) {
    var processLang = function (data) {
        var arr = data.split('\n');
        for (var i in arr) {
            if (lineValid(arr[i])) {
                var obj = arr[i].split('=>');
                assignText(obj[0], obj[1]);
            }
        }
    };
    var assignText = function (key, value) {
        $('[data-lang="' + key + '"]').each(function () {
            var attr = $(this).attr('data-destine');
            if (typeof attr !== 'undefined') {
                $(this).attr(attr, value);
            } else {
                $(this).html(value);
            }
        });
    };
    var lineValid = function (line) {
        return (line.trim().length > 0);
    };

    $.ajax({
        url: '../lang/' + lang + '.txt',
        error: function () {
            alert('No se cargó traducción');
        },
        success: function (data) {
            processLang(data);
        }
    });
};

function GetResourcesDatatable() {
    if (localStorage.Language == "es") {
        return "../Js/DataTable_Spanish.js";
    } else {
        return "../Js/DataTable_English.js";
    }
}

function AjaxBaseUrl() {
    return localStorage.ApiUrl + "/";
}

function AjaxBasicRequestGet(strMethod, handleData) {

    var StrUrl = AjaxBaseUrl() + strMethod;
    $.ajax({
        cache: false,
        type: "GET",
        async: true,
        crossDomain: true,
        dataType: "json",
        contentType: "application/json",
        url: StrUrl,
        success: function (data) {
            handleData(data);
        },
        error: function (a, b, c) {
            //if (a.statusText == 'Unauthorized') {
            //    window.location = "../LOGIN/wfrLogin.aspx";
            //}
            //else
            //if (a.statusText = "BadRequest") {
            //    displayErrorMessageConection(a.responseText);
            //}
            //else {
            //try {
            //    displayErrorMessage(a.responseText);
            //} catch (ex) { }
            //}

        }
    });
}


function AjaxBasicRequestDelete(strMethod, handleData) {

    var StrUrl = AjaxBaseUrl() + strMethod;
    $.ajax({
        cache: false,
        type: "DELETE",
        async: true,
        crossDomain: true,
        dataType: "json",
        contentType: "application/json",
        url: StrUrl,
        success: function (data) {
            handleData(data);
        },
        error: function (a, b, c) {
        }
    });
}


function AjaxBasicRequestPOST(jasonData, strMethod, handleData) {

    var StrUrl = AjaxBaseUrl() + strMethod;
    $.ajax({
        cache: false,
        type: "POST",
        async: true,
        crossDomain: true,
        dataType: "json",
        data: JSON.stringify(jasonData),
        contentType: "application/json",
        url: StrUrl,
        success: function (data) {
            handleData(data);
        },
        error: function (a, b, c) {
            //if (a.statusText == 'Unauthorized') {
            //    window.location = "../LOGIN/wfrLogin.aspx";
            //}
            //else
            //if (a.statusText = "BadRequest") {
            //    displayErrorMessageConection(a.responseText);
            //}
            //else {
            //try {
            //    displayErrorMessage(a.responseText);
            //} catch (ex) { }
            //}

        }
    });
}

function AjaxBasicRequestSyncGET(strMethod, handleData) {

    var StrUrl = AjaxBaseUrl() + strMethod;
    $.ajax({
        cache: false,
        type: "GET",
        async: false,
        crossDomain: true,
        dataType: "json",
        contentType: "application/json",
        url: StrUrl,
        success: function (data) {
            handleData(data);
        },
        error: function (a, b, c) {
            //if (a.statusText == 'Unauthorized') {
            //    window.location = "../LOGIN/wfrLogin.aspx";
            //}
            //else
            //if (a.statusText = "BadRequest") {
            //    displayErrorMessageConection(a.responseText);
            //}
            //else {
            //try {
            //    displayErrorMessage(a.responseText);
            //} catch (ex) { }
            //}
        }
    });
}

function AjaxBasicRequestSyncPOST(jasonData, strMethod, handleData) {

    var StrUrl = AjaxBaseUrl() + strMethod;
    $.ajax({
        cache: false,
        type: "POST",
        async: false,
        crossDomain: true,
        dataType: "json",
        data: JSON.stringify(jasonData),
        contentType: "application/json",
        url: StrUrl,
        success: function (data) {
            handleData(data);
        },
        error: function (a, b, c) {
        }
    });
}

function tryParseInt(val) {
    var ret;
    ret = parseInt(val);
    if (isNaN(ret)) {
        ret = 0;
    }
    return ret;
}

function tryParseFloat(val) {
    var ret;
    ret = parseFloat(val);
    if (isNaN(ret)) {
        ret = 0;
    }
    return ret;
}

function looksLikeMSDate(s) {
    return /^\/Date\(/.test(s);
}

var isoDateRegex = /^(\d\d\d\d)-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)(\.\d\d?\d?)?([\+-]\d\d:\d\d|Z)?$/;

function looksLikeIsoDate(s) {
    return isoDateRegex.test(s);
}

function parseIsoDate(s) {
    var m = isoDateRegex.exec(s);

    // Is this UTC, offset, or undefined? Treat undefined as UTC.
    if (m.length == 7 ||                // Just the y-m-dTh:m:s, no ms, no tz offset - assume UTC
        (m.length > 7 && (
            !m[7] ||                    // Array came back length 9 with undefined for 7 and 8
            m[7].charAt(0) != '.' ||    // ms portion, no tz offset, or no ms portion, Z
            !m[8] ||                    // ms portion, no tz offset
            m[8] == 'Z'))) {            // ms portion and Z
        // JavaScript's weirdo date handling expects just the months to be 0-based, as in 0-11, not 1-12 - the rest are as you expect in dates.
        var d = new Date(Date.UTC(m[1], m[2] - 1, m[3], m[4], m[5], m[6]));
    } else {
        // local
        var d = new Date(m[1], m[2] - 1, m[3], m[4], m[5], m[6]);
    }

    return d;
}

function parseIsoDate(s) {
    return new Date(s);
}

function hasTime(d) {
    return !!(d.getUTCHours() || d.getUTCMinutes() || d.getUTCSeconds());
}

function zeroFill(n) {
    if ((n + '').length == 1)
        return '0' + n;

    return n;
}

function formatDate(d) {
    if (hasTime(d)) {
        var s = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
        s += ' ' + d.getHours() + ':' + zeroFill(d.getMinutes()) + ':' + zeroFill(d.getSeconds());
    } else {
        var s = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
    }

    return s;
}

function parseDate(s) {
    var d;
    if (looksLikeMSDate(s))
        d = parseMSDate(s);
    else if (looksLikeIsoDate(s))
        d = parseIsoDate(s);
    else
        return null;

    return formatDate(d);
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getUserIP(onNewIP) { //  onNewIp - your listener function for new IPs
    //compatibility for firefox and chrome
    var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    var pc = new myPeerConnection({
        iceServers: []
    }),
    noop = function () { },
    localIPs = {},
    ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
    key;
    function iterateIP(ip) {
        if (!localIPs[ip]) onNewIP(ip);
        localIPs[ip] = true;
    }

    //create a bogus data channel
    pc.createDataChannel("");
    // create offer and set local description
    pc.createOffer().then(function (sdp) {
        sdp.sdp.split('\n').forEach(function (line) {
            if (line.indexOf('candidate') < 0) return;
            line.match(ipRegex).forEach(iterateIP);
        });

        pc.setLocalDescription(sdp, noop, noop);
    }).catch(function (reason) {
        // An error occurred, so handle the failure to connect
    });

    //listen for candidate events
    pc.onicecandidate = function (ice) {
        if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
    };
}


function setCookie() {
    var d = new Date();
    d.setTime(d.getTime() + (30 * 60 * 1000));//30 minutos
    var expires = "expires=" + d.toGMTString();
    document.cookie = "IsActivePobox=true; " + expires + " ;path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var user = getCookie("IsActivePobox");
    if (user == "true") {
        return true;
       //Use local Storage
    } else {
        exit();
        return false;
    }
}