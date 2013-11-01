var WhenInDOM = function (el, callback, observeEl) {
    var MObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    
    this.observer = null;
    this.callback = callback;
    this.el = el;
    this.observeEl = observeEl || document;

    var nodeInList = function (list, node) {
        for (var i = list.length; i--;) {
            if (list[i] === node || contains(list[i], node)) {
                return true;
            }
        }
        return false;
    };

    var contains = function (container, element) {
        var documentElement = document.documentElement;
        if (documentElement.contains) {
            if (element.nodeType !== 1) {
                element = element.parentNode;
            }
            return container !== element && container.contains(element);
        } else if (documentElement.compareDocumentPosition) {
            return !!(container.compareDocumentPosition(element) & 16);
        }
    };

    this.init = function () {
        var that = this;
        var config = {
            childList: true,
            subtree: true
        };
        this.observer = new MObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.type == "childList" && nodeInList(mutation.addedNodes, that.el)) {
                    that.stop();
                    that.callback();
                }
            });
        });
        this.observer.observe(this.observeEl, config);
    };
    
    this.crawl = function() {
        if (this.crawlEl && this.crawlEl.parentNode) {
            if (this.crawlEl.parentNode === this.observeEl || this.crawlEl.parentNode.nodeType > 8) {
                this.stop();
                this.callback();
            } else {
                this.crawlEl = this.crawlEl.parentNode;
            }
        }
    };
    
    this.crawlInit = function() {
        var that = this;
        this.crawlEl = this.el;
        this.crawlHandler = setInterval(function () {
            that.crawl.call(that);
        }, 10);
    };

    this.stop = function () {
        if (this.observer) { this.observer.disconnect(); }
        if (this.crawlHandler) { clearInterval(this.crawlHandler); }
    };
    
    if (MObserver) {
        this.init();
    } else {
        this.crawlInit();
    }
};