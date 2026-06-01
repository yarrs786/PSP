window.onload = function() {

    // === Переменные для хранения чисел и операций ===
    let a = '';
    let b = '';
    let expressionResult = '';
    let selectedOperation = null;
    let accumulator = 0;

    // === Доступ к элементам калькулятора ===
    const outputElement = document.getElementById("result");
    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');
    const equalButton = document.getElementById("btn_op_equal");
    const calculatorElement = document.querySelector(".calculator");
    const screenElement = document.getElementById("result");
    const bodyElement = document.body;

    // === Функция обработки нажатия на цифровые кнопки ===
    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit !== '.') || (digit === '.' && !a.includes(digit))) {
                a += digit;
            }
            outputElement.innerHTML = a;
        } else {
            if ((digit !== '.') || (digit === '.' && !b.includes(digit))) {
                b += digit;
                outputElement.innerHTML = b;
            }
        }
    }

    // === Обработчики для цифровых кнопок ===
    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML;
            onDigitButtonClicked(digitValue);
        };
    });

    // === Кнопка удаления последнего символа (delete) ===
    document.getElementById("btn_delete").onclick = function() {
        if (!selectedOperation) {
            if (a.length > 0) {
                a = a.slice(0, -1);
                outputElement.innerHTML = a === '' ? '0' : a;
            }
        } else {
            if (b.length > 0) {
                b = b.slice(0, -1);
                outputElement.innerHTML = b === '' ? '0' : b;
            }
        }
    };

    // === Кнопки операций ===
    document.getElementById("btn_op_mult").onclick = function() {
        if (a === '') return;
        selectedOperation = 'x';
    };
    document.getElementById("btn_op_plus").onclick = function() {
        if (a === '') return;
        selectedOperation = '+';
    };
    document.getElementById("btn_op_minus").onclick = function() {
        if (a === '') return;
        selectedOperation = '-';
    };
    document.getElementById("btn_op_div").onclick = function() {
        if (a === '') return;
        selectedOperation = '/';
    };

    // === Кнопка очистки (C) ===
    document.getElementById("btn_op_clear").onclick = function() {
        a = '';
        b = '';
        selectedOperation = null;
        expressionResult = '';
        outputElement.innerHTML = '0';
    };

    // === Кнопка равно (=) ===
    document.getElementById("btn_op_equal").onclick = function() {
        if (a === '' || b === '' || !selectedOperation) return;

        switch (selectedOperation) {
            case 'x':
                expressionResult = (+a) * (+b);
                break;
            case '+':
                expressionResult = (+a) + (+b);
                break;
            case '-':
                expressionResult = (+a) - (+b);
                break;
            case '/':
                expressionResult = (+a) / (+b);
                break;
            default:
                break;
        }

        a = expressionResult.toString();
        b = '';
        selectedOperation = null;
        outputElement.innerHTML = a;
    };

    // === Кнопка смены знака (+/-) ===
    document.getElementById("btn_op_sign").onclick = function() {
        if (!selectedOperation) {
            if (a !== '' && a !== '0') {
                a = a.startsWith('-') ? a.slice(1) : '-' + a;
                outputElement.innerHTML = a;
            }
        } else {
            if (b !== '' && b !== '0') {
                b = b.startsWith('-') ? b.slice(1) : '-' + b;
                outputElement.innerHTML = b;
            }
        }
    };

    // === Кнопка процента (%) ===
    document.getElementById("btn_op_percent").onclick = function() {
        if (!selectedOperation) {
            if (a !== '') {
                a = (parseFloat(a) / 100).toString();
                outputElement.innerHTML = a;
            }
        } else {
            if (b !== '') {
                b = (parseFloat(b) / 100).toString();
                outputElement.innerHTML = b;
            }
        }
    };

    // === Кнопка квадратного корня (√) ===
    document.getElementById("btn_sqrt").onclick = function() {
        if (!selectedOperation) {
            if (a !== '') {
                const value = parseFloat(a);
                if (value < 0) {
                    outputElement.innerHTML = 'Ошибка';
                } else {
                    a = Math.sqrt(value).toString();
                    outputElement.innerHTML = a;
                }
            }
        } else {
            if (b !== '') {
                const value = parseFloat(b);
                if (value < 0) {
                    outputElement.innerHTML = 'Ошибка';
                } else {
                    b = Math.sqrt(value).toString();
                    outputElement.innerHTML = b;
                }
            }
        }
    };

    // === Кнопка квадрата (x²) ===
    document.getElementById("btn_square").onclick = function() {
        if (!selectedOperation) {
            if (a !== '') {
                a = ((+a) * (+a)).toString();
                outputElement.innerHTML = a;
            }
        } else {
            if (b !== '') {
                b = ((+b) * (+b)).toString();
                outputElement.innerHTML = b;
            }
        }
    };

    // === Функция факториала (рекурсивная) ===
    function fact(n) {
        if (n === 0 || n === 1) return 1;
        if (n < 0) return NaN;
        return n * fact(n - 1);
    }

    // === Кнопка факториала (x!) ===
    document.getElementById("btn_factorial").onclick = function() {
        if (!selectedOperation) {
            if (a !== '') {
                const value = parseInt(a);
                if (value < 0 || isNaN(value)) {
                    outputElement.innerHTML = 'Ошибка';
                } else if (value > 170) {
                    outputElement.innerHTML = 'Слишком большое';
                } else {
                    a = fact(value).toString();
                    outputElement.innerHTML = a;
                }
            }
        } else {
            if (b !== '') {
                const value = parseInt(b);
                if (value < 0 || isNaN(value)) {
                    outputElement.innerHTML = 'Ошибка';
                } else if (value > 170) {
                    outputElement.innerHTML = 'Слишком большое';
                } else {
                    b = fact(value).toString();
                    outputElement.innerHTML = b;
                }
            }
        }
    };

    // === Кнопка 000 ===
    document.getElementById("btn_000").onclick = function() {
        if (!selectedOperation) {
            a += '000';
            outputElement.innerHTML = a;
        } else {
            b += '000';
            outputElement.innerHTML = b;
        }
    };

    // === Кнопка накапливаемого сложения (Σ) ===
    document.getElementById("btn_accum_plus").onclick = function() {
        if (!selectedOperation && a !== '') {
            accumulator += parseFloat(a);
            a = accumulator.toString();
            outputElement.innerHTML = a;
        } else if (selectedOperation && b !== '') {
            accumulator += parseFloat(b);
            b = accumulator.toString();
            outputElement.innerHTML = b;
        }
    };

    // === Кнопка накапливаемого вычитания (Δ) ===
    document.getElementById("btn_accum_minus").onclick = function() {
        if (!selectedOperation && a !== '') {
            accumulator -= parseFloat(a);
            a = accumulator.toString();
            outputElement.innerHTML = a;
        } else if (selectedOperation && b !== '') {
            accumulator -= parseFloat(b);
            b = accumulator.toString();
            outputElement.innerHTML = b;
        }
    };

    // === Сброс накопителя ===
    document.getElementById("btn_accum_clear").onclick = function() {
        accumulator = 0;
    };

    // === Изменение яркости кнопки "=" ===
    document.getElementById("btn_brightness").onclick = function() {
        let value;
        if (!selectedOperation && a !== '') {
            value = parseFloat(a);
        } else if (selectedOperation && b !== '') {
            value = parseFloat(b);
        } else {
            return;
        }

        if (value >= 0 && value <= 10) {
            const brightness = value * 10;
            equalButton.style.filter = `brightness(${brightness}%)`;
        }
    };

    // === Смена цвета окна вывода ===
    let screenColorIndex = 0;
    const screenColors = ['#f8fafd', '#e3f2fd', '#fce4ec', '#f3e5f5', '#e0f2f1', '#fff9c4'];

    document.getElementById("btn_change_screen").onclick = function() {
        screenColorIndex = (screenColorIndex + 1) % screenColors.length;
        screenElement.style.backgroundColor = screenColors[screenColorIndex];
    };

    // === Активация выпадающего списка "Сменить тему" ===
    const themeSelect = document.getElementById("theme-select");

    const themes = {
        default: {
            bodyBg: '#f2f5f9',
            calcBg: '#ffffff',
            screenBg: '#f8fafd',
            btnBg: '#f0f4fa',
            btnHover: '#dce5f2',
            funcBg: '#e4eaf2',
            funcHover: '#d0daea',
            opBg: '#0052B4',
            opHover: '#003d8a',
            execBg: '#0D6EFD',
            execHover: '#0b5ed7',
            extraBg: '#d4e0f2',
            extraHover: '#bfd0ea',
            brightBg: '#fff3cd',
            brightHover: '#ffe69c',
            textColor: '#1a1a1a',
            screenText: '#1a1a1a',
            calcBorder: '#e4eaf2',
            screenBorder: '#e4eaf2'
        },
        dark: {
            bodyBg: '#1a1a2e',
            calcBg: '#2a2a3e',
            screenBg: '#1a1a3e',
            btnBg: '#3a3a4e',
            btnHover: '#4a4a5e',
            funcBg: '#3a3a4e',
            funcHover: '#4a4a5e',
            opBg: '#0D6EFD',
            opHover: '#0b5ed7',
            execBg: '#0052B4',
            execHover: '#003d8a',
            extraBg: '#3a3a5e',
            extraHover: '#4a4a6e',
            brightBg: '#4a4a30',
            brightHover: '#5a5a40',
            textColor: '#ffffff',
            screenText: '#ffffff',
            calcBorder: '#3a3a4e',
            screenBorder: '#3a3a4e'
        },
        light: {
            bodyBg: '#e8f5e9',
            calcBg: '#ffffff',
            screenBg: '#f1f8e9',
            btnBg: '#f0f4fa',
            btnHover: '#dce5f2',
            funcBg: '#e4eaf2',
            funcHover: '#d0daea',
            opBg: '#2e7d32',
            opHover: '#1b5e20',
            execBg: '#43a047',
            execHover: '#2e7d32',
            extraBg: '#c8e6c9',
            extraHover: '#a5d6a7',
            brightBg: '#fff9c4',
            brightHover: '#fff59d',
            textColor: '#1a1a1a',
            screenText: '#1a1a1a',
            calcBorder: '#c8e6c9',
            screenBorder: '#c8e6c9'
        }
    };

    function applyTheme(themeName) {
        const t = themes[themeName];
        if (!t) return;

        bodyElement.style.backgroundColor = t.bodyBg;
        calculatorElement.style.backgroundColor = t.calcBg;
        calculatorElement.style.borderColor = t.calcBorder;
        screenElement.style.backgroundColor = t.screenBg;
        screenElement.style.borderColor = t.screenBorder;
        screenElement.style.color = t.screenText;

        // Кнопки цифр
        document.querySelectorAll('.calc-btn').forEach(btn => {
            if (!btn.classList.contains('calc-btn--operation') &&
                !btn.classList.contains('calc-btn--execute') &&
                !btn.classList.contains('calc-btn--function') &&
                !btn.classList.contains('calc-btn--extra') &&
                !btn.classList.contains('calc-btn--brightness') &&
                !btn.classList.contains('calc-btn--theme')) {
                btn.style.backgroundColor = t.btnBg;
                btn.style.color = t.textColor;
                btn.onmouseenter = function() { this.style.backgroundColor = t.btnHover; };
                btn.onmouseleave = function() { this.style.backgroundColor = t.btnBg; };
            }
        });

        // Функциональные кнопки
        document.querySelectorAll('.calc-btn--function').forEach(btn => {
            btn.style.backgroundColor = t.funcBg;
            btn.onmouseenter = function() { this.style.backgroundColor = t.funcHover; };
            btn.onmouseleave = function() { this.style.backgroundColor = t.funcBg; };
        });

        // Кнопки операций
        document.querySelectorAll('.calc-btn--operation').forEach(btn => {
            btn.style.backgroundColor = t.opBg;
            btn.onmouseenter = function() { this.style.backgroundColor = t.opHover; };
            btn.onmouseleave = function() { this.style.backgroundColor = t.opBg; };
        });

        // Кнопка равно
        equalButton.style.backgroundColor = t.execBg;
        equalButton.onmouseenter = function() { this.style.backgroundColor = t.execHover; };
        equalButton.onmouseleave = function() { this.style.backgroundColor = t.execBg; };

        // Дополнительные кнопки
        document.querySelectorAll('.calc-btn--extra').forEach(btn => {
            btn.style.backgroundColor = t.extraBg;
            btn.onmouseenter = function() { this.style.backgroundColor = t.extraHover; };
            btn.onmouseleave = function() { this.style.backgroundColor = t.extraBg; };
        });

        // Кнопка яркости
        document.querySelectorAll('.calc-btn--brightness').forEach(btn => {
            btn.style.backgroundColor = t.brightBg;
            btn.onmouseenter = function() { this.style.backgroundColor = t.brightHover; };
            btn.onmouseleave = function() { this.style.backgroundColor = t.brightBg; };
        });
    }

    themeSelect.onchange = function() {
        applyTheme(this.value);
    };

};