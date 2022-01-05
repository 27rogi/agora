import { h } from "preact";

function Changelog() {
    const changeTypes = {
        change: { text: "🪄 изменено", class: "change" },
        new: { text: "✨ новое", class: "new" },
        fix: { text: "🏗️ исправлено", class: "fix" },
        breaking: { text: "⚠️ ВАЖНОЕ", class: "breaking" }
    }
    const changes = [
        {
            type: changeTypes.new,
            text: "Режим для перекрашивания тем в ваши любимые цвета (кривой)."
        },
        {
            type: changeTypes.change,
            text: "Новая тема теперь использует переменные из CSS, благодаря этому перекрашивание элементов стало лучше и размер файла стилей уменшился на 20%."
        },
        {
            type: changeTypes.change,
            text: "Переделана система сохранения настроек скрипта."
        },
    ]

    return (
        <div className="changelog">
            <p className="changelog__title">Список изменений от 04.01.2022</p>
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
