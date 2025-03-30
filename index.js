//Taking elements from HTML to DOM
const slider = document.querySelector('[pass-slider]');
const length_display = document.querySelector('[pass-slider-value]');
const clipboard = document.querySelector('[clipboard]');
const checkboxes = document.querySelector('#check-pass');
const generatePasswordButton = document.querySelector('[gen-pass]');
const passwordDisplayZone = document.querySelector('#password-display-zone');
let copiedText = document.querySelector('#copied_text');
const indicator = document.querySelector('.indicator');
// Slider value
let slider_value = parseInt(slider.value);
slider_value = 10;
slider.style.backgroundSize = "48% 100%";
function handle_slider() {
    let slider_value = parseInt(slider.value);
    length_display.innerText = slider_value;
    const min = 1;
    const max = 20;
    // General Formula:
    // Percentage = ((Value - Minimum) / (Maximum - Minimum)) * 100
    slider.style.backgroundSize = (((slider_value - min) / (max - min)) * 100) + "% 100%";
};

slider.addEventListener('input', handle_slider);

//Checkboxes;

checkbox_arr = [true, false, false, false];
function checkTick(event) {
    if (event.target.type == 'checkbox') {
        let text = event.target.value;
        if (text == 'uppercase' && event.target.checked) {
            checkbox_arr[0] = true;
        }
        else if (text == 'uppercase') {
            checkbox_arr[0] = false;
        }
        else if (text == 'lowercase' && event.target.checked) {
            checkbox_arr[1] = true;
        }
        else if (text == 'lowercase') {
            checkbox_arr[1] = false;
        }
        else if (text == 'numbers' && event.target.checked) {
            checkbox_arr[2] = true;
        }
        else if (text == 'numbers') {
            checkbox_arr[2] = false;
        }
        else if (text == 'symbols' && event.target.checked) {
            checkbox_arr[3] = true;
        }
        else if (text == 'symbols') {
            checkbox_arr[3] = false;
        }
    }
};

checkboxes.addEventListener('click', checkTick);
//Generating Password 

//Fisher Yeates Method

function genPassLogic() {
    let Password = [];
    function generateRandomUpper(values) {
        const upperCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const upperCharacters_arr = [...upperCharacters];
        let randomArr = [];
        for (let i = 0; i < values; i++) {
            let temp = Math.floor((Math.random() * 26));
            randomArr.push(upperCharacters_arr[temp]);
        };
        return randomArr;
    };

    function generateRandomLower(values) {
        const lowerCharacters = 'abcdefghijklmnopqrstuvwxyz';
        const lowerCharacters_arr = [...lowerCharacters];
        let randomArr = [];
        for (let i = 0; i < values; i++) {
            let temp = Math.floor((Math.random() * 26));
            randomArr.push(lowerCharacters_arr[temp]);
        };
        return randomArr;
    };

    function generateRandomNumbers(values) {
        let randomArr = [];
        for (let i = 0; i < values; i++) {
            let temp = Math.floor((Math.random() * 9));
            randomArr[i] = temp;
        };
        return randomArr;
    };

    function generateRandomSymbols(values) {
        const symbols = '!@#$%^&*()_{}[]:;<>,./?~`';
        const symbols_arr = [...symbols];
        let randomArr = [];
        for (let i = 0; i < values; i++) {
            let temp = Math.floor((Math.random() * symbols_arr.length));
            randomArr.push(symbols_arr[temp]);
        };
        return randomArr;
    };

    //Determining the values to be given to each option

    let no_of_options = 0;
    let slider_value = parseInt(slider.value);
    // Password.length = slider_value;
    for (let i = 0; i < 4; i++) {
        if (checkbox_arr[i] == true) {
            no_of_options++;
        }
    };
    if (no_of_options == 0) {
        alert('Select atleast one Option!');
        // return;
    };
    let eachOptionLength = Math.trunc(slider_value / no_of_options);
    if (slider_value % no_of_options == 0) {
        if (checkbox_arr[0] == true) {
            Password.push(...generateRandomUpper(eachOptionLength));
        }

        if (checkbox_arr[1] == true) {
            Password.push(...generateRandomLower(eachOptionLength));
        }

        if (checkbox_arr[2] == true) {
            Password.push(...generateRandomNumbers(eachOptionLength));
        }

        if (checkbox_arr[3] == true) {
            Password.push(...generateRandomSymbols(eachOptionLength));
        }
    } else {
        let remainder = slider_value % no_of_options;
        if (checkbox_arr[0] == true) {
            Password.push(...generateRandomUpper(eachOptionLength));
        }

        if (checkbox_arr[1] == true) {
            Password.push(...generateRandomLower(eachOptionLength));
        }

        if (checkbox_arr[2] == true) {
            Password.push(...generateRandomNumbers(eachOptionLength));
        }

        if (checkbox_arr[3] == true) {
            Password.push(...generateRandomSymbols(eachOptionLength));
        }
        while (remainder > 0) {
            if (checkbox_arr[0] == true) {
                Password.push(...generateRandomUpper(1));
                remainder--;
                if (remainder == 0) {
                    break;
                }
            }

            if (checkbox_arr[1] == true) {
                Password.push(...generateRandomLower(1));
                remainder--;
                if (remainder == 0) {
                    break;
                }
            }

            if (checkbox_arr[2] == true) {
                Password.push(...generateRandomNumbers(1));
                remainder--;
                if (remainder == 0) {
                    break;
                }
            }

            if (checkbox_arr[3] == true) {
                Password.push(...generateRandomSymbols(1));
                remainder--;
                if (remainder == 0) {
                    break;
                }
            }
        }
    }

    //Fisher Yeates Shuffling
    for (let i = (Password.length - 1); i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = Password[i];
        Password[i] = Password[j];
        Password[j] = temp;
    }
    passwordDisplayZone.value = Password.join("");
    checkStrength();
};
generatePasswordButton.addEventListener('click', genPassLogic);

//Clipboard 
function password_copy() {
    navigator.clipboard.writeText(passwordDisplayZone.value);
    copiedText.style.opacity = 1;
};

clipboard.addEventListener('click', password_copy);

//Indicator

function checkStrength() {
    if (slider_value >= 10 && checkbox_arr[2] == true && checkbox_arr[3] == true) {
        indicator.style.backgroundColor = '#00FF00';
        indicator.style.boxShadow = '0px 0px 20px 0px rgba(0, 204, 0, 0.5)';
    } else if (slider_value >= 10 && (checkbox_arr[2] == true || checkbox_arr[3] == true)) {
        indicator.style.backgroundColor = '#FFDE21';
        indicator.style.boxShadow = '0px 0px 20px 0px rgba(255, 255, 0, 0.5)';
    } else {
        indicator.style.backgroundColor = '#FF0000';
        indicator.style.boxShadow = '0px 0px 20px 0px (255, 0, 0, 0.5)';
    }
}