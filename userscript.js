// ==UserScript==
// @name         RuMinecraft-Theme
// @namespace    *://ru-minecraft.ru/forum*
// @version      1.0.0
// @description  🪄 A new look for old memories
// @author       rogi27
// @match        *://ru-minecraft.ru/forum*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @run-at       document-start
// @updateURL    https://raw.githubusercontent.com/rogi27/ruminecraft-theme/main/userscript.js
// @downloadURL  https://raw.githubusercontent.com/rogi27/ruminecraft-theme/main/userscript.js
// @license      MIT
// ==/UserScript==

(function () {
  ("use strict");

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
