const display = document.getElementById("display");

function appendToDisplay(char) {
    if (display.value === "Error" || display.value === "Infinity" || display.value === "-Infinity") {
        display.value = "";
    }

    const lastChar = display.value.slice(-1);

    // Only allow + or - at the beginning
    if (display.value === "") {
        if (!/[+-]/.test(char) && !/\d/.test(char) && char !== '(') return;
    }

    // Prevent invalid operator replacement at the start
    if (display.value.length === 1 && /[+\-]/.test(display.value) && /[*/]/.test(char)) {
        return;
    }

    // Disallow ")" if no matching "(" exists
    if (char === ")") {
        const openParens = (display.value.match(/\(/g) || []).length;
        const closeParens = (display.value.match(/\)/g) || []).length;
        if (openParens <= closeParens) return;
    }

    // Replace last operator with new one
    if (/[+\-*/]/.test(lastChar) && /[+\-*/]/.test(char)) {
        display.value = display.value.slice(0, -1) + char;
    }
    // Insert * between ) and number or (
    else if (lastChar === ')' && (/\d/.test(char) || char === '(')) {
        display.value += '*' + char;
    }
    // Insert * between number and (
    else if (/\d/.test(lastChar) && char === '(') {
        display.value += '*' + char;
    }
    else {
        display.value += char;
    }

    display.scrollLeft = display.scrollWidth;
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
        display.value = result;
    } catch (error) {
        alert("Invalid expression!");
        clearDisplay();
    }
}


document.addEventListener("keydown", function (event) {
    if (event.ctrlKey || event.altKey || event.metaKey) {
        return;
    }

    if (event.key === " ") {
        event.preventDefault();
        return;
    }

    if (
        display.value === "Error" ||
        display.value === "Infinity" ||
        display.value === "-Infinity"
    ) {
        if (event.key === "Escape" || event.key === "Backspace") {
            clearDisplay();
            return;
        } else {
            clearDisplay();
        }
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
