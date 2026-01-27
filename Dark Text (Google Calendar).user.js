// ==UserScript==
// @name         Dark Text (Google Calendar)
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Changes the color of text inside Google Calendar events.
// @author       RealLalka
// @match        https://calendar.google.com/*
// @grant        GM_addStyle
// @run-at       document-end
// @icon         https://www.google.com/s2/favicons?sz=64&domain=calendar.google.com
// ==/UserScript==

(function () {
    'use strict';
    const css = `
        .gcal-has-background,
        .gcal-has-background span,
        .gcal-has-background div {color: rgb(0, 0, 0, 0.8) !important;}

        .gcal-no-background,
        .gcal-no-background span:not([class*="bullet"]),
        .gcal-no-background div:not([class*="bullet"]) {color: rgb(255, 255, 255, 0.7) !important;}
    `;
    GM_addStyle(css);

    function hasBackgroundColor(element) {
        let style = window.getComputedStyle(element);
        if (style.backgroundColor && style.backgroundColor !== 'rgba(0, 0, 0, 0)' && style.backgroundColor !== 'transparent') {
            return true;
        }
        const children = element.querySelectorAll('div');
        for (let child of children) {
            style = window.getComputedStyle(child);
            if (style.backgroundColor && style.backgroundColor !== 'rgba(0, 0, 0, 0)' && style.backgroundColor !== 'transparent') {
                return true;
            }
        }
        return false;
    }

    function updateEventColors() {
        const events = document.querySelectorAll('div[role="main"] [role="button"]');
        events.forEach(event => {
            if (hasBackgroundColor(event)) {
                event.classList.add('gcal-has-background');
                event.classList.remove('gcal-no-background');
            } else {
                event.classList.add('gcal-no-background');
                event.classList.remove('gcal-has-background');
            }
        });
    }

    const observer = new MutationObserver((mutations) => {
        if (window.updateTimeout) clearTimeout(window.updateTimeout);
        window.updateTimeout = setTimeout(updateEventColors, 50);
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
    });
    setTimeout(updateEventColors, 200);
    setTimeout(updateEventColors, 220);
    setInterval(updateEventColors, 240);
    console.log('Simple Contrast v4.0 Applied');
})();
