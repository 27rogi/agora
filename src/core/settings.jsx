// eslint-disable-next-line no-unused-vars
import { Component, h } from "preact";
import { html } from 'htm/preact';
import ui from "./ui.jsx";
import logger from "./utils/logger.js";

import Config from "./utils/config";
import Changelog from './changelog.jsx';

class SettingsScreen extends Component {
    constructor() {
        super();
        this.state = { ...Config.store, changelogIsOpen: false };
    }

    setConfigValue = (configKey, value) => {
        const newStore = Config.store;
        this.setState({ [configKey]: value })
        newStore[configKey] = value;
        Config.set(newStore);

        logger.info(`Value ${this.state[configKey]} is changed to ${value}...`, 'Settings')
    }

    toggleChangelog = () => {
        this.setState({ changelogIsOpen: !this.state.changelogIsOpen })
    }

    render() {
        const names = {
            default: "Стандартная",
            orange: "Классическая"
        }

        const ThemeButton = props => {
            return html`
            <button className=${(this.state.theme===props.theme) ? 'active' : null} onClick=${()=> this.setConfigValue('theme',
                props.theme)}>${names[props.theme]}</button>
            `;
        }

        const OptionCheckbox = props => {
            return html`
            <button className=${this.state[props.option] ? 'active' : null} onClick=${()=> this.setConfigValue(props.option,
                !this.state[props.option])}>${props.title}</button>
            `
        }

        return html`
            <div className="rumc-screen">
                <div className="screen__section">
                    <div className="screen__title">
                        <h2><b>Project Agora</b> <span>(Настройки)</span></h2>
                        <div className="title__controls">
                            <a href="javascript:void(0);" onClick=${this.toggleChangelog}>
                                <i class="fa fa-th-list fa-2x"></i>
                            </a>
                            <a href="javascript:void(0);" onClick=${() => ui.toggleSettingsScreen()}>
                                <i class="fa fa-times-circle fa-2x"></i>
                            </a>
                        </div>
                    </div>
                    ${(this.state.changelogIsOpen) ? html`
                    <div className="screen__changelog">
                        <${Changelog} />
                    </div>
                    ` : null}
                    <div className="screen__options">
                        ${(this.state.redesign) ? html`
                        <div className="screen__option">
                            <p>Текущая тема</p>
                            <${ThemeButton} theme="default" />
                            <${ThemeButton} theme="orange" />
                        </div>` : null}
            
                        <div className="screen__option">
                            <p>Дополнения</p>
                            <${OptionCheckbox} title="Ожидать загрузки страницы" option="loader" />
                            <${OptionCheckbox} title="Использовать новую тему" option="redesign" />
                            <${OptionCheckbox} title="Сворачивать подписи" option="hideSignatures" />
                            <${OptionCheckbox} title="Скрывать статистику пользователей" option="hideStats" />
                            <${OptionCheckbox} title="Показывать сайдбар" option="sidebar" />
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

export default SettingsScreen;
