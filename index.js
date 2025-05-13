const display = document.getElementById("display");

function appendToDisplay(char) {
    if (display.value === "Error") return;

    if (display.value === "" && /[+*/)]/.test(char)) return;

    const lastChar = display.value.slice(-1);
    if (/[+\-*/]/.test(lastChar) && /[+\-*/]/.test(char)) return;

    display.value += char;
}

function clearDisplay() {
    display.value = "";
}

function backspace() {
    if (display.value === "Error") {
        clearDisplay();
    } else {
        display.value = display.value.slice(0, -1);
    }
}

function calculate() {
    try {
        const result = new Function(`return (${display.value})`)();

        if (
            result === Infinity ||
            result === -Infinity ||
            isNaN(result)
        ) {
            display.value = "Error";
        } else {
            display.value = result;
        }
    } catch (error) {
        display.value = "Error";
    }
}

document.addEventListener("keydown", function (event) {
    if (event.key === " ") {
        event.preventDefault(); 
        return;
    }

    if (display.value === "Error") {
        if (event.key === "Escape" || event.key === "Backspace") {
            clearDisplay();
        }
        return;
    }

    if (!isNaN(event.key)) {
        appendToDisplay(event.key);
    } else if (["+", "-", "*", "/"].includes(event.key)) {
        appendToDisplay(event.key);
    } else if (event.key === "." || event.key === "(" || event.key === ")") {
        appendToDisplay(event.key);
    } else if (event.key === "Enter" || event.key === "=") {
        event.preventDefault();
        calculate();
    } else if (event.key === "Backspace") {
        backspace();
    } else if (event.key === "Escape") {
        clearDisplay();
    }
});

