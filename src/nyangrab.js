/******************************************************
* #### NyanGrab.JS v0.0.1 ####
* Original Code By Ican Bachors 2016 
* Retouch By NyanCode Indonesia 2017
* http://nyancode.web.id/product/nyangrab
******************************************************/

(function ($) {
    "use strict";

    $.nyangrab = function(config, callback) {
        var o;
        $.each(config, function(i, f) {
            var d = '';
            $.ajax({
                url: 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('SELECT content FROM data.headers WHERE url="' + f.url + '" and ua="Googlebot/2.1 (http://www.googlebot.com/bot.html)"') + '&format=xml&env=http://datatables.org/alltables.env',
                async: true
            }).done(function(a) {
                var e = $(a).find("content").text();
                d = removeElements(e);

                callback(grabTools(config, d));
            }); 
        });
        
        function grabTools(h, e) {
            var j = { result: [] };

            if (Object.prototype.toString.call(h) === '[object Array]') {
                $.each(h, function(i, a) {
                    if (a.loop) {
                        $.each($(e).find(a.selector), function() {
                            var c = $(this);
                            var d = {};
                            $.each(a.result, function(x, v) {
                                var a = c.find(v.find);
                                var b = '';
                                if (v.grab.by == 'text') {
                                    b = a.text()
                                } else if (v.grab.by == 'html') {
                                    b = a.html()
                                } else if (v.grab.by == 'attr') {
                                    b = a.attr(v.grab.value)
                                } else if (v.grab.by == 'data') {
                                    b = a.data(v.grab.value)
                                }
                                d[v.name] = b
                            });
                            j.result.push(d)
                        })
                    } else {
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
                                    } else if (v.grab.by == 'attr') {
                                        b = k.attr(v.grab.value)
                                    } else if (v.grab.by == 'data') {
                                        b = k.data(v.grab.value)
                                    }
                                    y.push(b)
                                    b = y
                                })
                            } else {
                                if (v.grab.by == 'text') {
                                    b = a.text()
                                } else if (v.grab.by == 'html') {
                                    b = a.html()
                                } else if (v.grab.by == 'attr') {
                                    b = a.attr(v.grab.value)
                                } else if (v.grab.by == 'data') {
                                    b = a.data(v.grab.value)
                                }
                            }
                            if (v.replace != null || v.replace != undefined) {
                                b = b.replace(v.replace[0], v.replace[1])
                            }
                            g[v.name] = b
                        });
                        j.result.push(g)
                    }
                })
            } else {
                var a = h;
                var k = yql(a.url);
                if (a.loop) {
                    $.each($(k).find(a.selector), function() {
                        var c = $(this);
                        var d = {};
                        $.each(a.result, function(x, v) {
                            var a = c.find(v.find);
                            var b = '';
                            if (v.grab.by == 'text') {
                                b = a.text()
                            } else if (v.grab.by == 'html') {
                                b = a.html()
                            } else if (v.grab.by == 'attr') {
                                b = a.attr(v.grab.value)
                            } else if (v.grab.by == 'data') {
                                b = a.data(v.grab.value)
                            }
                            d[v.name] = b
                        });
                        j.result.push(d)
                    })
                } else {
                    var l = $(k).find(a.selector + ':eq(0)');
                    var m = {};
                    $.each(a.result, function(x, v) {
                        var a = l.find(v.find);
                        var b = '';
                        if (v.grab.by == 'text') {
                            b = a.text()
                        } else if (v.grab.by == 'html') {
                            b = a.html()
                        } else if (v.grab.by == 'attr') {
                            b = a.attr(v.grab.value)
                        } else if (v.grab.by == 'data') {
                            b = a.data(v.grab.value)
                        }
                        m[v.name] = b
                    });
                    j.result.push(m)
                }
            }
            
            return j;
        }

        function removeElements(a) {
            var b = $("<div>" + a + "</div>");
            b.find('style').remove();
            b.find("script").remove();
            b.find("iframe").remove();
            b.find("embed").remove();
            return b.html()
        }
    }

}(jQuery));


