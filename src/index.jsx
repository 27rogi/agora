import Config from './core/utils/config.js';
import ui from './core/ui.jsx';

(function () {
    document.head.insertAdjacentHTML("beforeend", `<link href="http://127.0.0.1:8080/dist/base.css" type="text/css" rel="stylesheet">`)

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
