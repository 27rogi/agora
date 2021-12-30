import Config from './core/utils/config.js';
import ui from './core/ui.jsx';

(function () {
    document.head.insertAdjacentHTML("beforeend", `<link href="https://raw.githack.com/rogi27/agora/main/dist/base.css" type="text/css" rel="stylesheet">`)

    const config = Config.init();
    if (config.store.loader) {
        ui.toggleLoader();
        window.addEventListener('load', () => {
            ui.toggleLoader();
        });
    }
    config.apply();

    ui.renderSettingsButton();
})();
