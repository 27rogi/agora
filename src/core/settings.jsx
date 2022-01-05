// eslint-disable-next-line no-unused-vars
import { Component, h } from "preact";
import { html } from 'htm/preact';
import ui from "./ui.jsx";
import logger from "./utils/logger.js";
import dotProp from 'dot-prop';

import Config from "./utils/config";
import Changelog from './changelog.jsx';
import Designer from "./utils/designer.js";
import { colord } from "colord";

class SettingsScreen extends Component {
    constructor() {
        super();
        this.state = { store: Config.store, changelogIsOpen: false };
    }

    setConfigValue = (configKey, value) => {
        let newStore = Config.store;
        dotProp.set(newStore, configKey, value);
        Config.set(newStore);

        this.setState({ store: newStore }, () => {
            if (configKey === "recolor") Designer.clearPalette();
            if (this.state.store.recolor) {
                Designer.clearPalette();
                this.generatePalette(this.state.store.colors.primary);
            }
        })

        logger.info(`Value ${this.state.store} is changed to ${value}...`, 'Settings')
    }

    generatePalette = () => {
        if (this.state.store.recolor) {
            if (colord(this.state.store.colors.primary).isValid()) {
                Designer.capturePallette().makeNewPalette(
                    this.state.store.colors.primary,
                    this.state.store.theme === "default" ? "cave" : "stone",
                    this.state.store.dark
                ).applyPalette();
            }
        }
    }

    setPalette = (event) => {
        this.setConfigValue("colors.primary", event.target.value);
    }

    resetPalette = () => {
        this.setConfigValue("colors.primary", null);
        Designer.clearPalette();
    }

    toggleChangelog = () => {
        this.setState({ changelogIsOpen: !this.state.changelogIsOpen })
    }

    render() {
        const names = {
            default: "Пещерная",
            orange: "Классическая"
        }

        const ThemeButton = props => {
            return html`
            <button className=${(this.state.store.theme === props.theme) ? 'active' : null} onClick=${() =>
                this.setConfigValue('theme',
                props.theme)}>${names[props.theme]}</button>
            `;
        }

        const OptionCheckbox = props => {
            const storeProperty = dotProp.get(this.state.store, props.option);
            return html`
            <button className=${storeProperty ? 'active' : null} onClick=${() => this.setConfigValue(props.option,
                !storeProperty)}>${props.title}</button>
            `
        }

        return html`
            <div className="rumc-screen">
                <div className="screen__section">
                    <div className="screen__title">
                        <h2><b>Project Agora</b> <span>(Настройки)</span></h2>
                        <div className="title__controls">
                            <a href="javascript:void(0);" onClick=${this.toggleChangelog}>
                                <i class="fa fa-th-list fa-1x"></i>
                            </a>
                            <a href="javascript:void(0);" onClick=${()=> ui.toggleSettingsScreen()}>
                                <i class="fa fa-times-circle fa-1x"></i>
                            </a>
                        </div>
                    </div>
                    ${(this.state.changelogIsOpen) ? html`
                    <div className="screen__changelog">
                        <${Changelog} />
                    </div>
                    ` : null}
                    <div className="screen__options">
                        ${(this.state.store.redesign) ? html`
                        <div className="screen__option">
                            <p>Текущая тема</p>
                            <${ThemeButton} theme="default" />
                            <${ThemeButton} theme="orange" />
                        </div>` : null}
            
                        ${(this.state.store.redesign) ? html`
                        <div className="screen__option">
                            <p>Дополнения темы</p>
                            <${OptionCheckbox} title="Темный режим (beta)" option="dark" />
                        </div>` : null}
            
                        ${(this.state.store.recolor) ? html`
                        <div className="screen__option">
                            <p>Режим перекрашивания</p>
                            <input type="color" onInput=${this.setPalette} />
                            <button onClick=${Designer.clearPalette}>Очистить</button>
                        </div>` : null}
            
                        <div className="screen__option">
                            <p>Дополнения</p>
                            <${OptionCheckbox} title="Показывать загрузку" option="loader" />
                            <${OptionCheckbox} title="Обновленная тема" option="redesign" />
                            <${OptionCheckbox} title="Сворачивать подписи" option="hideSignatures" />
                            <${OptionCheckbox} title="Скрывать статистику пользователей" option="hideStats" />
                            <${OptionCheckbox} title="Показывать боковое меню" option="sidebar" />
                            <${OptionCheckbox} title="Режим перекрашивания" option="recolor" />
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

export default SettingsScreen;
