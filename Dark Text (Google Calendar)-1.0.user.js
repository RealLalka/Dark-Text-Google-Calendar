// ==UserScript==
// @name         Dark Text (Google Calendar)
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Делает текст событий черным (90%)
// @author       RealLalka
// @match        https://calendar.google.com/*
// @grant        GM_addStyle
// @run-at       document-end
// @icon         https://www.google.com/s2/favicons?sz=64&domain=calendar.google.com
// ==/UserScript==

(function() {
    'use strict';
    setTimeout(() => {
        const css = `
            div[role="main"] [role="button"],
            div[role="main"] [role="button"] span {
                color: rgba(0, 0, 0, 0.7) !important;
            }
        `;
        GM_addStyle(css);
        console.log('GCal Darken Script applied via GM_addStyle');
    }, 200);
})();
