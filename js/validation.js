const mainForm = document.inscreption;

const name = mainForm.nom;
const prenom = mainForm.Prenom;
const mois = mainForm.moin;
const jour = mainForm.jour;
const anne = mainForm.anne;
const motDePass = mainForm.motDePass;
const motDePassvirefication = mainForm.motDePassV;
const progressBar = document.querySelector('#progressBar');

let width = 0;

const inputsVAlid = [];

const currentDate = new Date();

let addOptions = (parent, max, min, text) => {
    const Selectio = document.createDocumentFragment();

    const optionTitle = document.createElement('option');
    optionTitle.textContent = text;
    optionTitle.value = "";
    Selectio.append(optionTitle);
    for (let i = min; i <= max; i++) {
        const option = document.createElement('option');
        option.textContent = i;
        option.value = i;
        Selectio.append(option);
    }
    parent.append(Selectio);
}

window.addEventListener('load', () => {
    const year = currentDate.getFullYear();
    addOptions(anne, year, year - 50, "--année--");
})

function setmonthVAlue(obj) {
    mois.value = "";
    jour.value = "";
    fillProgress(obj);
}

function setVAlidDay(obj) {
    const fullMonths = [0, 2, 4, 6, 7, 9, 11];
    jour.value = "";
    let max;
    if (anne.value !== "" && mois.value !== "") {
        if (mois.value == 1) {
            max = (isLeapYear(anne.value)) ? 29 : 28;
        } else {
            if (fullMonths.indexOf(parseInt(mois.value)) !== -1) {
                max = 31;
            } else max = 30;
        }
    }
    let joursOptions = jour.querySelectorAll("option");
    joursOptions.forEach(option => {
        jour.remove(option);
    })
    addOptions(jour, max, 1, "--jour--");
    fillProgress(obj);
}

function isLeapYear(year) {
    return year % 4 === 0;
}

function fillProgress(obj, validation = null) {
    if (validation === null || validation) {
        if (obj.value === "" && inputsVAlid.indexOf(obj) !== -1) {
            const objIndex = inputsVAlid.indexOf(obj);
            inputsVAlid.splice(objIndex, 1);
            width -= 11.12;
        }
        if (inputsVAlid.indexOf(obj) === -1 && obj.value !== "") {
            obj.classList.toggle('valid')

            width += 11.12;
            inputsVAlid.push(obj)
        }
    } else if (inputsVAlid.indexOf(obj) !== -1) {
        const objIndex = inputsVAlid.indexOf(obj);
        inputsVAlid.splice(objIndex, 1);
        width -= 11.12;
    }
    progressBar.style.width = width + "%";
    console.log(width)
}

function emailValidation(obj) {
    const emailReg = /^\w.{3,}@\w{3,5}\.\w{2,4}$/;
    if (emailReg.test(obj.value)) {

    }
    return emailReg.test(obj.value);
}

function passwordVAlidation(obj) {
    motDePassvirefication.value = "";
    return !(obj.value.length < 6)
}

function passwordfirificationVAlidation(obj) {
    return obj.value === motDePass.value
}

function passwordStatus(obj) {
    if (obj.value.length < 6) {
        obj.classList.add('week');
        return false;
    } else if (obj.value.length >= 6 && obj.value.length < 8) {
        obj.classList.remove('week')
        obj.classList.add('meduim')
    } else if (obj.value.length >= 8) {
        obj.classList.remove('meduim')
        obj.classList.add('fort')
    }
}

function SignIn() {
    if (width > 100) {
        alert("account Created")
    }
}