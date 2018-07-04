(window.MIP = window.MIP || []).push({
    name: "mip-globrand-canyinfilter",
    func: function () {
        define(function (require) {
            var customElement = require('customElement').create();
            return customElement.prototype.firstInviewCallback = function () {
                    var comp = this.element;
                    var renderDom = comp.getAttribute("data-target");
                    var util = require('util');
                    var naboo = util.naboo;
                    var speed = 300;
                    var containerHeight = 409;
                    var filter = comp.querySelector('.box-filter');
                    var boxtab = filter.querySelector('.box-tab');
                    var container = filter.querySelector('.box-container');
                    var pop = comp.querySelector('.bgfixed');
                    var html = document.querySelector("html");
                    var isOpen = false;

                    function bindEvent() {
                        util.event.delegate(boxtab,
                            boxtab.querySelectorAll('.box-tab-item'),
                            'click',
                            clickTab);

                        pop.addEventListener('click', hide);

                        util.event.delegate(container,
                            container.querySelectorAll('ul li'),
                            'click',
                            clickItem);
                    }

                    function clickTab() {
                        var targetDom = event.target;
                        var targetId = targetDom.getAttribute('data-target');
                        if (targetDom.classList.contains('selected')) {
                            // 点击展开的 关闭
                            hide();
                        } else {
                            !isOpen && show();

                            var uls = comp.querySelectorAll('.box-item');
                            forEach(uls, function (item) {
                                item.classList.add('hidden');
                                if (item.getAttribute('data-id') === targetId) {
                                    item.classList.remove('hidden');
                                }
                            });

                            forEach(comp.querySelectorAll('.box-tab-item'), function (dom) {
                                if (dom === targetDom) {
                                    dom.classList.add('selected');
                                } else {
                                    dom.classList.remove('selected');
                                }
                            });
                        }
                    }

                    function clickItem() {
                        var targetDom = event.target;
                        var targetId = targetDom.getAttribute('data-id');
                        var key = targetDom.parentNode.getAttribute('data-id');
                        var url = '?isAjax=1&' + key + '=' + targetId;
                        fetch(url).then(function (res) {
                            return res.text();
                        }).then(function (text) {
                            document.querySelector(renderDom).outerHTML = text;
                            hide();
                        });
                    }

                    function hide() {
                        filter.style.top = '0px';
                        forEach(boxtab.querySelectorAll('.box-tab-item'), function (dom) {
                            dom.classList.remove('selected');
                        });

                        container.classList.add('hidden');

                        forEach(container.querySelectorAll('.box-item'), function (dom) {
                            dom.classList.add('hidden');
                        });

                        html.style.overflow = 'auto';
                        pop.classList.remove('bgfixedoff');
                        isOpen = false;
                    }

                    function show() {
                        isOpen = true;
                        html.style.overflow = 'hidden';
                        pop.classList.add('bgfixedoff');

                        var mTop = filter.offsetTop;
                        var sTop = window.scrollY;
                        var result = mTop - sTop;

                        filter.style.top = '-' + result + 'px';
                        container.style.height = '0px';
                        container.classList.remove('hidden');

                        naboo.animate(container, {
                            height: containerHeight
                        }, {
                            duration: speed,
                            ease: 'linear',
                            delay: 0,
                            mode: 'transition'
                        }).start();

                    }

                    function forEach(doms, func) {
                        for (var i = 0, l = doms.length; i < l; i++) {
                            func(doms[i]);
                        }
                    }
                    bindEvent();
                }, define("mip-globrand-canyinfilter", ["mip-globrand-canyinfilter/mip-globrand-canyinfilter"], function (e) {
                    return e
                }),
                function () {
                    function e(e, t) {
                        e.registerMipElement("mip-globrand-canyinfilter", t, "")
                    }
                    if (window.MIP) require(["mip-globrand-canyinfilter"], function (t) {
                        e(window.MIP, t)
                    });
                    else require(["mip", "mip-globrand-canyinfilter"], e)
                }()
        })
    }
});