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
            text: "Добавлена темная тема для нового дизайна."
        },
        {
            type: changeTypes.new,
            text: "Улучшен дизайн профиля пользователя."
        },
    ]

    return (
        <div className="changelog">
            <p className="changelog__title">Список изменений от 02.01.2022</p>
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
