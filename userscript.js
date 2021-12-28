// ==UserScript==
// @name         Theme
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://ru-minecraft.ru/forum*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // настройки темы

    // включить серо-оранжевую тему
    // true - да, false - нет
    const classic = false;

    // конец

    document.body.classList.add("ruminetheme_1");
    if(classic) {
        document.body.classList.add("orange");
    }
    document.head.insertAdjacentHTML("beforeend", `<link href="http://127.0.0.1:8080/build/root.css" type="text/css" rel="stylesheet">`)

    console.log("Тема применилась!")
})();
