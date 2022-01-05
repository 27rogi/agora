![Agora Logo](/logo.png "Logo")

# Project Agora

Project Agora is a **~31kB** userscript and my personal project for the community of Ru-Minecraft website, it adds new functionality and theme with ability to control color palette.

> ⚠️ This is my experimental project that mostly acts like hack and its code might be very poor in some places, but I try to keep it understandable.

## 📦 Libraries

This userscript includes several JavaScript libraries in its compiled code:

* [Preact (+ JSX)](https://github.com/preactjs/preact)
* [colord](https://github.com/omgovich/colord)
* [dot-prop](https://www.npmjs.com/package/dot-prop)

## 🏗️ Building

I use **Gulp** with **Rollup** and **Babel** for bundling all code in one file.

You can run development mode by typing `yarn dev` to start compiling, and watching file changes, this will also run **http-server** to host local files. Another option is `yarn devProd` which will compile script with repo links instead of local ones.

## 🔌 Installation

Latest userscript version can be installed via [this link](https://raw.githack.com/rogi27/agora/main/userscript.user.js).
