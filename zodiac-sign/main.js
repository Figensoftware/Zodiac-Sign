const birthEl = document.getElementById("birthday");
const buttonEl = document.getElementById("button");
const btnEl = document.getElementById("btn");
const resultsEl = document.getElementById("results");
const photoEl = document.getElementById("photo");
const resultEl = document.getElementById("result");
import { zodiacSigns } from "./zodiacSigns.js";


function getCalculate() {
    const birthValue = birthEl.value;
    if (birthValue === "") {
        alert("Please write your birthday date.");
    } else {
        const age = getAge(birthValue);
        resultsEl.style.display = "block";
        resultEl.innerText = `Your age is ${age} ${age > 1 ? "years" : "year"} old.`;
    }
}

function getAge(birthValue) {
    const currentDate = new Date();
    const birthdayDate = new Date(birthValue);
    let age = currentDate.getFullYear() - birthdayDate.getFullYear();
    const month = currentDate.getMonth() - birthdayDate.getMonth();

    if (month < 0 || (month === 0 && currentDate.getDate() < birthdayDate.getDate())) {
        age--;
    }

    return age;
}


function getSign() {
    const birthValue = birthEl.value;
    if (birthValue === "") {
        alert("Please write your birthday date.");
    } else {
        const date = new Date(birthValue + 'T00:00:00');
        const month = date.getMonth() + 1;
        const day = date.getDate();

        const sign = zodiacSigns.find(sign => {
            const { start, end } = sign.dateRange;
            return (month === start.month && day >= start.day) ||
                (month === end.month && day <= end.day) ||
                (month > start.month && month < end.month) ||
                (start.month > end.month && (month > start.month || month < end.month));
        });

        if (sign) {
            resultsEl.style.display = "block";
            photoEl.innerHTML = `<img src="${sign.image}" alt="${sign.name}" >`;
            resultEl.innerText = `Your zodiac sign is ${sign.name}.\nYour personality: ${sign.personality}`;
        } else {
            resultEl.innerText = `Unable to determine your zodiac sign.`;
        }
    }
}



buttonEl.addEventListener("click", getCalculate);
btnEl.addEventListener("click", getSign);