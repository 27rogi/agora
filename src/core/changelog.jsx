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
            text: "Небольшие обновления дизайна."
        },
        {
            type: changeTypes.fix,
            text: "(возможно) устранен баг при бесконечной загрузке IFrame на Firefox."
        },
        {
            type: changeTypes.fix,
            text: "Устранен баг с перекрытием меню."
        },
        {
            type: changeTypes.fix,
            text: "Устранен баг со скрытием подписей."
        },
        {
            type: changeTypes.fix,
            text: "Устранен баг с отображением эмодзи."
        },
    ]

    return (
        <div className="changelog">
            <p className="changelog__title">Список изменений от 01.01.2022</p>
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
