import logger from "./logger";

const ConfigApplyEvent = new Event('ConfigApplyEvent');

const Config = {
    init() {
        const defaultConfig = {
            loader: true,
            redesign: true,
            theme: 'default',
            hideSignatures: true,
            hideStats: false,
            sidebar: true,
        }

        if (window.localStorage.getItem('rumctheme')) {
            const activeConfig = JSON.parse(window.localStorage.getItem('rumctheme'));
            if (activeConfig === defaultConfig) return;
            logger.info('Found modified config, merging with default...', 'Config')
            window.localStorage.setItem('rumctheme', JSON.stringify({ ...defaultConfig, ...activeConfig }));
        } else {
            logger.info('No config found, created new record in localStorage.', 'Config')
            window.localStorage.setItem('rumctheme', JSON.stringify(defaultConfig));
        }

        return this;
    },
    get store() {
        return JSON.parse(window.localStorage.getItem('rumctheme'));
    },
    doChangelogMatch(versionToCheck = 0) {
        return this.store.changelogV === versionToCheck;
    },
    set(newStore) {
        window.localStorage.setItem('rumctheme', JSON.stringify(newStore))
        logger.info('New values should be applied.', 'Config')
        this.apply();
        return;
    },
    apply() {
        logger.info('Applying changes to config', 'Config')
        document.body.setAttribute("class", "");

        if (this.store.redesign) {
            document.body.classList.add("ruminetheme_1");
            if (!document.head.querySelector(`link[href="${process.env.SOURCE_URL}/dist/theme.css"]`)) {
                document.head.insertAdjacentHTML("beforeend", `<link href="${process.env.SOURCE_URL}/dist/theme.css" type="text/css" rel="stylesheet">`)
            }
        } else if (document.head.querySelector(`link[href="${process.env.SOURCE_URL}/dist/theme.css"]`)) {
            document.head.querySelector(`link[href="${process.env.SOURCE_URL}/dist/theme.css"]`).remove();
        }
        if (this.store.theme) {
            if (this.store.theme === "orange") document.body.classList.add("orange");
        }
        if (this.store.hideSignatures) {
            document.body.classList.add("hideSignatures");
        }
        if (this.store.hideStats) {
            document.body.classList.add("hideStats");
        }
        if (this.store.sidebar) {
            document.body.classList.add("enableSidebar");
        }

        document.dispatchEvent(ConfigApplyEvent);
    }
}

export default Config;
