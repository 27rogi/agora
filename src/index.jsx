import Config from './core/utils/config.js';
import ui from './core/ui.jsx';
import Designer from './core/utils/designer.js';
import { colord } from 'colord';

(function () {
    document.head.insertAdjacentHTML("beforeend", `<link href="${process.env.SOURCE_URL}/dist/base.css" type="text/css" rel="stylesheet">`)

    if (!window.frameElement) {
        const config = Config.init();
        if (config.store.loader) {
            ui.toggleLoader();
            window.addEventListener('load', () => {
                ui.toggleLoader();
            });
        }
        config.apply();

        if (config.store.recolor && config.store.colors.primary) {
            window.addEventListener('load', () => {
                if (colord(config.store.colors.primary).isValid()) {
                    Designer.capturePallette().makeNewPalette(
                        config.store.colors.primary,
                        config.store.theme === "default" ? "cave" : "stone",
                        config.store.dark
                    ).applyPalette();
                }
            });
        }


        if (config.store.hideSignatures) {
            window.addEventListener('DOMContentLoaded', () => {
                // Fix for signatures where some elements are not inside it's div
                if (document.body.querySelectorAll("#forum-topicMsgShtuff")) {
                    for (const message of document.body.querySelectorAll("#forum-topicMsgShtuff")) {
                        const signature = message.querySelector(".signature");
                        if (signature) {
                            let sibling = signature.nextElementSibling;
                            while (sibling) {
                                signature.append(sibling);
                                sibling = sibling.nextElementSibling;
                            }
                        }
                    }
                }
            });
        }
        ui.renderSettingsButton();
    }
})();
