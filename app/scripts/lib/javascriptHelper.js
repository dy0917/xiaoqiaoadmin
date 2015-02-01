/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function getRestAPIURL() {
//    var api_url = document.domain;
//    api_url = "http://api." + api_url;
//    console.log(api_url);
//    return api_url;
    var api_url = document.domain;
    if (api_url.indexOf("www.") > -1)
    {
        api_url = api_url.replace("www.", "");
    }

    api_url = "http://api." + api_url;
    return api_url;
}

function createGuid() {

    var dateObject = new Date();
    var randomnumber = Math.random().toString().slice(2, 5);
    randomnumber = randomnumber.toString();
    randomnumber = removeZero(randomnumber);
    var result = randomnumber +
            dateObject.getTime().toString();
    return "image_" + result.toString();
}

function createReviewid() {

    var dateObject = new Date();
    var randomnumber = Math.random().toString().slice(2, 3);
    randomnumber = randomnumber.toString();
    randomnumber = removeZero(randomnumber);
    var result = randomnumber +
            dateObject.getTime().toString();

    return result.toString();
}

function createMessageid() {

    var dateObject = new Date();
    var randomnumber = Math.random().toString().slice(2, 5);
    randomnumber = randomnumber.toString();
    randomnumber = removeZero(randomnumber);
    var result = randomnumber +
            dateObject.getTime().toString();

    return  result.toString();
}

function removeZero(string)
{

    if (string.charAt(0) === "0")
    {
        string = string.substring(1);
        removeZero(string);
    }

    return string;
}

function getDomain()
{
    var domain = document.domain;
    var n = domain.split(".");
    var domain = "";
    for (var i = 1; i < n.length; i++) {
        domain += n[i];
        if (i < n.length - 1) {
            domain += ".";
        }
    }
    return domain;
}
function getImageWidth(imgSrc)
{
    var deferred = $.Deferred();
    deferred.done(function(imgSrc) {
        var img = new Image();

        img.onload = function() {
            return img.width;
        };
        img.src = imgSrc;
    });

    deferred.resolve(imgSrc);

}

function getImageWidth(imgSrc, callback) {
    var img = new Image();
    img.src = imgSrc;
    img.onload = function() {

        callback(this.width, this.height);

    };

}

function isImageExists(image_url){

    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    return http.status != 404;

}

function requiredBackEnd(controller, method, para, ajaxType, callback, error) {
    {
        var tempurl = getRestAPIURL();

        $.ajax({
            url: tempurl + '/' + controller + '/' + method,
            type: ajaxType,
            data: JSON.stringify(para),
            success: function(feedback) {
                callback(feedback);
            }, error: function(feedback)
            {
                error(feedback);
                console.log("post back error");
            }

        });
    }
}

function getTarget(obj, type) {
    var targ;
    var e = obj;
    if (e.target)
        targ = e.target;
    else if (e.srcElement)
        targ = e.srcElement;
    if (type === "single") {
        if (targ.nodeType === 3) // defeat Safari bug
            targ = targ.parentNode;
    }
    return targ;
}

function ReplaceContentInContainer(matchClass, content)
{
    var elems = document.getElementsByTagName('*'), i;
    for (i in elems)
    {
        if ((" " + elems[i].className + " ").indexOf(" " + matchClass + " ") > -1)
        {
            console.log("match");
            elems[i].style.display = 'none';
        }
    }
}

function getCookiebyName(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2)
        return parts.pop().split(";").shift();
}

function setCookie(cname, cvalue)
{
    var d = new Date();
    d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}



