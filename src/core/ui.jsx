import { h, render } from "preact";
import Screen from './settings.jsx';

const animationTimings = {
    duration: 200,
    iterations: 1
};

function toggleSettingsScreen() {
    if (document.body.querySelector('#script-config-screen')) {
        const screenNode = document.body.querySelector('#script-config-screen');
        screenNode.animate([
            { opacity: 100, transform: 'translateX(0)' },
            { opacity: 0, transform: 'translateX(300px)' }
        ], animationTimings)
            .finished.then(() => {
                render(null, screenNode);
                screenNode.remove();
            });

        return;
    }

    const settingsScreen = document.createElement('div')
    settingsScreen.id = 'script-config-screen'
    document.body.insertBefore(settingsScreen, document.body.querySelector('.topmenu-wrapper')).animate([
        { opacity: 0, transform: 'translateX(300px)' },
        { opacity: 100, transform: 'translateX(0)' }
    ], animationTimings);

    render(<Screen />, settingsScreen);

    return settingsScreen;
}

function toggleLoader() {
    if (document.body.querySelector('#agora-loader')) {
        const loader = document.body.querySelector('#agora-loader');
        loader.animate([
            { opacity: 100 },
            { opacity: 0 }
        ], animationTimings)
            .finished.then(() => {
                render(null, document.body, loader);
                loader.remove();
            });
        return;
    }
    const loader = document.createElement('div')
    loader.id = 'agora-loader'
    document.body.insertBefore(loader, document.body.querySelector('.topmenu-wrapper')).animate([
        { opacity: 0 },
        { opacity: 100 }
    ], {
        duration: 50,
        iterations: 1
    });

    const styles = {
        wrapper: {
            display: "flex",
            "z-index": 999,
            position: "fixed",
            width: "100%",
            height: "100%",
            bottom: "0px",
            background: 'linear-gradient(0deg, rgba(24,32,41,1) 0%, rgba(24,32,41,0.9) 100%)',
            WebkitBackdropFilter: "blur(12px)",
            backdropFilter: "blur(12px)"
        },
        loader: {
            display: "flex",
            margin: "auto"
        },
        heading: {
            "font-size": "16px",
            color: "white",
        }
    }

    render((
        <div id="agora-loader" style={styles.wrapper}>
            <div className="loader" style={styles.loader}>
                <h1 style={styles.heading}>Выполняется загрузка страницы...</h1>
            </div>
        </div>
    ), document.body, loader);

    return loader;
}

// Creating new button and inserting it between others
function renderSettingsButton() {
    const futureConfigButton = document.createElement('div')
    futureConfigButton.id = 'script-config'
    document.body.querySelector(".topmenu").insertBefore(futureConfigButton, document.body.querySelector(".topmenu-msg"))

    render((
        <a href="javascript:void(0);" onClick={toggleSettingsScreen} class="topmenu-msg">
            <i class="fa fa-cog" />
        </a>
    ), futureConfigButton);

    return futureConfigButton;
}

export default {
    renderSettingsButton,
    toggleSettingsScreen,
    toggleLoader,
    animationTimings,
}
