import { h } from "preact";

function Changelog() {
    const changeTypes = {
        new: { text: "🟢 новое", class: "new" },
        fix: { text: "🟠 исправлено", class: "fix" },
        breaking: { text: "🔴 ВАЖНОЕ", class: "breaking" }
    }
    const changes = [
        {
            type: changeTypes.new,
            text: "Теперь это не просто скрипт для стилей, это комбайн для различных улучшений, новвоведений и исправлений."
        },
        {
            type: changeTypes.new,
            text: "Переделана структура стилей, теперь она модульная, в дальнейшем поможет оптимизировать размер файлов и поможет при конфликтах с расширениями."
        },
        {
            type: changeTypes.fix,
            text: "Поправил (надеюсь) работу расширения от Саба для скрытия сообщений."
        },
        {
            type: changeTypes.breaking,
            text: "Настройки из прошлой версии будут сброшены!"
        }
    ]

    return (
        <div className="changelog">
            <p className="changelog__title">Список изменений от 30.12.2021</p>
            <ul>
                {changes.map((change, key) => {
                    return (
                        <li key={key}>
                            <p className={`badge badge_${change.type.class}`}>{change.type.text}</p>
                            <p>{change.text}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default Changelog;
