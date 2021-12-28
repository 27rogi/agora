// ==UserScript==
// @name         RuMinecraft-Theme
// @namespace    *://ru-minecraft.ru/forum*
// @version      1.0.1
// @description  🪄 A new look for old memories
// @author       rogi27
// @match        *://ru-minecraft.ru/forum*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @run-at       document-start
// @updateURL    https://raw.githack.com/rogi27/ruminecraft-theme/main/userscript.user.js
// @downloadURL  https://raw.githack.com/rogi27/ruminecraft-theme/main/userscript.user.js
// @license      MIT
// ==/UserScript==

(function () {
  ("use strict");

    // настройки темы
    // true - да, false - нет

    // использовать серо-оранжевую тему?
    const classic = false;
    // скрывать подписи?
    const hideSignatures = true;

    // конец

    document.body.classList.add("ruminetheme_1");
    if(classic) {
        document.body.classList.add("orange");
    }
    if(hideSignatures) {
        document.body.classList.add("hideSignatures");
    }
    document.head.insertAdjacentHTML("beforeend", `<link href="https://rawcdn.githack.com/rogi27/ruminecraft-theme/main/build/theme.css?min=1" type="text/css" rel="stylesheet">`)

    console.log("Тема применилась!")
})();
