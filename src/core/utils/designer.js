
import { colord, extend } from "colord";
import a11yPlugin from "colord/plugins/a11y";

extend([a11yPlugin]);

const Designer = {
    colors: {
        original: {
            cave: {

            },
            stone: {

            }
        },
        new: {
            cave: {

            },
            stone: {

            }
        },
    },
    capturePallette() {
        const variables = getComputedStyle(document.documentElement);
        const levels = {
            cave: [10, 20, 30, 40, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
            stone: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
        }

        for (const level in levels) {
            for (const index of levels[level]) {
                this.colors.original[level][index] = variables.getPropertyValue(`--colors-${level}-${index}`)
            }
        }

        return this;
    },
    shiftColor(from, to, isBackground = false, isDarkMode = false) {
        let newColor = null;

        const prev = colord(from);
        const next = colord(to);

        newColor = colord({
            h: next.hue(),
            s: prev.luminance() * 100,
            l: prev.brightness() * 100
        });


        if (newColor.brightness() > 0.7) {
            if (isDarkMode) newColor = newColor.darken(next.brightness() / 2)
            else newColor = newColor.darken(prev.brightness() / 2);
        } else if (newColor.brightness() > 0.5) {
            newColor = newColor.darken(next.brightness() / 4)
        }

        if (!isBackground) {
            if (newColor.brightness() < 0.4) {
                newColor = newColor.saturate(next.luminance() / 2)
                newColor = newColor.darken(next.brightness() / 6)
            }
        }

        // TODO: Do something with bright colors on light stone theme.
        if (isBackground && !isDarkMode) {
            if (newColor.toHsl().s > 60) {
                console.log("isbg !isdark")
                const { h } = newColor.toHsl();
                newColor = colord({
                    h,
                    s: (prev.brightness() * 2) * 100,
                    l: (next.luminance() * 2) * 100,
                });
            }
            else if (newColor.brightness() < 0.4) {
                newColor = newColor.saturate(next.luminance() / 2)
            }
        }

        const rgb = colord(newColor).toRgb();
        return `${rgb.r} ${rgb.g} ${rgb.b}`;
    },
    makeNewPalette(newColor, theme = "cave", isDarkMode) {
        if (colord(newColor).isValid()) {
            for (const palette in this.colors.original) {
                for (const index in this.colors.original[palette]) {
                    console.log(this.colors.original[palette][index])
                    const currentColor = `rgb(${(this.colors.original[palette][index].replaceAll(" ", ","))})`;
                    const isBackground = theme !== "cave";
                    this.colors.new["cave"][index] = this.shiftColor(currentColor, newColor, isBackground, isDarkMode);
                    this.colors.new["stone"][index] = this.shiftColor(currentColor, newColor, isBackground, isDarkMode);
                }
            }
        }

        return this;
    },
    applyPalette() {
        const variables = document.body.style;
        for (const palette in this.colors.new) {
            for (const index in this.colors.new[palette]) {
                const color = this.colors.new[palette][index];
                variables.setProperty(`--colors-${palette}-${index}`, color);
            }
        }
    },
    clearPalette() {
        document.body.style = null;
    }
}

export default Designer;
