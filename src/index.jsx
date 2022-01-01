import Config from './core/utils/config.js';
import ui from './core/ui.jsx';

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

        if (config.store.hideSignatures) {
            // Fix for signatures where some elements are not inside it's div
            window.addEventListener('DOMContentLoaded', () => {
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
