const prefix = {
    info: {
        text: "Agora",
        style: "background: #526d78; border-rounded: 6px; padding: 4px; text-weight: semibold;"
    }
}

const logger = {
    info(text, module = "Info") {
        return console.info(`%c${prefix.info.text}(${module})`, prefix.info.style, text);
    }
}

export default logger;
