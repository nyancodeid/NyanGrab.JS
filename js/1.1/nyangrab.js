/* NyanGrab.JS - Copyright (c) 2017 - Nyan ID - github.com/NyanGrab.JS */

(function ($) {
    "use strict";

    console.info('NyanGrab Loaded');
    $.nyangrab = function(config, callback) {
        var o;
        var configuration = {
            isDebug: false
        };

        printDebug('Getting Content');
        $.each(config, function(i, f) {
            var qj;
            var d = '';
            if (f.url.search(',') != -1) {
                qj = f.url.split(','); 
            }
            if (Array.isArray(qj)) {
                $.each(qj, function (k, n) {
                   $.ajax({
                        url: 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select content from data.headers where url="' + n + '"') + '&format=xml&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',
                        async: true
                    }).done(function(a) {
                        printDebug('Prosessing Response');
                        var e = $(a).find("content").text();
                        d = removeElements(e);
                        callback(grabTools(config, d));
                    });  
                });
            } else {
                $.ajax({
                    url: 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select content from data.headers where url="' + f.url + '"') + '&format=xml&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',
                    async: true
                }).done(function(a) {
                    printDebug('Prosessing Response');
                    var e = $(a).find("content").text();
                    d = removeElements(e);
                    callback(grabTools(config, d));
                }); 
            }
            
        });
        
        function grabTools(h, e) {
            var j = { result: [] };
            if (Object.prototype.toString.call(h) === '[object Array]') {
                /* If Config more than 1 Data Config */
                $.each(h, function(i, a) {  
                    if (a.loop) {
                        /* if using loop */
                        $.each($(e).find(a.selector), function (indexnum) {
                            var c = $(this);
                            var d = {};
                            var gr = {}; /* Var for Group */
                            $.each(a.result, function(x, v) {
                                /* Make object of results */
                                var qw = c.find(v.find);
                                var b = '';
                                if (v.grab.by == 'text') {
                                    b = qw.text()
                                } else if (v.grab.by == 'html') {
                                    b = qw.html()
                                } else if (v.grab.by == 'val') {
                                    b = qw.val()
                                } else if (v.grab.by == 'attr') {
                                    b = qw.attr(v.grab.value)
                                }
                                /* Replace */
                                if (v.replace != null || v.replace != undefined) {
                                    b = replaceAll(b, v.replace[0], v.replace[1]);
                                }
                                /* Format using string */
                                if (v.format != undefined) {
                                    var r;
                                    r = v.format.replace('{{index:num}}', indexnum + 1);
                                    r = r.replace('{{data}}', b);
                                    b = r;
                                }
                                /* Format using funtion */
                                if (v.grab.custom != undefined) {
                                    /* is a function */
                                    var jf = {};
                                    if (typeof v.grab.custom === "function") {
                                        b = v.grab.custom(b);
                                    }
                                } 

                                d[v.name] = b;
                            });
                            j.result.push(d);
                        })
                    } else {
                        /* if not using loop */
                        var f = $(e).find(a.selector + ':eq(0)');
                        var g = {};
                        $.each(a.result, function(x, v) {
                            var a = f.find(v.find);
                            var b = '';
                            var y = [];
                            if (v.loop) {
                                $.each(a, function(g) {
                                    var k = $(this)
                                    if (v.grab.by == 'text') {
                                        b = k.text()
                                    } else if (v.grab.by == 'html') {
                                        b = k.html()
                                    } else if (v.grab.by == 'val') {
                                        b = qw.val()
                                    } else if (v.grab.by == 'attr') {
                                        b = k.attr(v.grab.value)
                                    }
                                    if (v.replace != null || v.replace != undefined) {
                                        b = replaceAll(b, v.replace[0], v.replace[1]);
                                    }
                                    if (v.format != undefined) {
                                        var r;
                                        r = r.replace('{{data}}', b);
                                        r = v.format.replace('{{index:num}}', indexnum + 1);
                                        b = r;
                                    }
                                    /* Format using funtion */
                                    if (v.grab.custom != undefined) {
                                        /* is a function */
                                        var jf = {};
                                        if (v.grab.custom && jf.toString.call(v.grab.custom) === '[object Function]') {
                                            b = v.grab.custom(b);
                                        }
                                    } 
                                    y.push(b)
                                    b = y
                                })
                            } else {
                                if (v.grab.by == 'text') {
                                    b = a.text()
                                } else if (v.grab.by == 'val') {
                                    b = qw.val()
                                } else if (v.grab.by == 'html') {
                                    b = a.html()
                                } else if (v.grab.by == 'attr') {
                                    b = a.attr(v.grab.value)
                                }
                            }
                            if (v.replace != null || v.replace != undefined) {
                                b = replaceAll(b, v.replace[0], v.replace[1]);
                            }
                            if (v.format != undefined) {
                                var r;
                                r = r.replace('{{data}}', b);
                                r = v.format.replace('{{index:num}}', indexnum + 1);
                                b = r;
                            }
                            /* Format using funtion */
                            if (v.grab.custom != undefined) {
                                /* is a function */
                                var jf = {};
                                if (v.grab.custom && jf.toString.call(v.grab.custom) === '[object Function]') {
                                    b = v.grab.custom(b);
                                }
                            } 
                            g[v.name] = b
                        }); 
                        j.result.push(g)
                    }
                })
            }
            
            printDebug('Preparing Output');

            return j;
        }

        function removeElements(a) {
            printDebug('Cleaning Response');
            var b = $("<div>" + a + "</div>");
            b.find('style').remove();
            b.find("script").remove();
            b.find("iframe").remove();
            b.find("embed").remove();
            return b.html()
        }
        
        /* Replace All */
        function replaceAll(str, find, replace) {
          return str.replace(new RegExp(find, 'g'), replace);
        }

        function printDebug(msg) {
            if (configuration.isDebug) {
                console.info(Date() + ' - ' + msg);
            }
        }
    }

}(jQuery));


