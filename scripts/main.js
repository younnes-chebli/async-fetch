////// 1

const becodeRulesDisplayButton = document.getElementById("display-becode-rules-button");
const rulesUl = document.getElementById("becode-rules-list");

const populateUl = (elements) => {
    for(element of elements) {
        const li = document.createElement("li");
        li.innerText = element;
        rulesUl.append(li);
    }
};

const getBecodeRules = async () => {
    rulesUl.innerText = "";
    try {
        const response = await fetch("./assets/scripts/becode.json");
        const rules = await response.json();
        populateUl(rules);
    } catch(err) {
        console.log(err);
    }
}

becodeRulesDisplayButton.addEventListener("click", getBecodeRules);

////// 2 + extra

const nameInput = document.getElementById("name-input");
const fetchNameButton = document.getElementById("fetch-name-button");
const resetNames = document.getElementById("reset-names");
const namesDisplay = document.getElementById("names-display");
const countrySelect = document.getElementById("country-select");

const populateDivs = (responseJSON, responseString) => {
    const div = document.createElement("div");
    div.innerHTML = `There are ${responseJSON.count} ${responseJSON.name} and the average age is ${responseJSON.age} years old <br> ${responseString}`;
    namesDisplay.append(div);
};

const isAvailable = (nameIn) => {
    return localStorage.getItem(nameIn);
};

const isAvailableC= (nameIn, countryIn) => {
    return localStorage.getItem(`${nameIn}${countryIn}`);
}

const firstCharToUpperCase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const countrySelected = (countrySelectedOption) => {
    return countrySelectedOption != "";
};

const fetchName = async () => {
    let nameIn = nameInput.value;
    if(nameIn == "") {
        const div = document.createElement("div");
        div.innerHTML = "No name to fetch!";
        namesDisplay.append(div);
    } else {
        nameIn = firstCharToUpperCase(nameIn);
        const countrySelectedOption = countrySelect.value;
        let response;
        let available = false;
        let responseString;
        let responseJSON;
        try {
            if(countrySelected(countrySelectedOption)) {
                if(isAvailableC(nameIn, countrySelectedOption)) {
                    responseString = localStorage.getItem(`${nameIn}${countrySelectedOption}`);
                    available = true;
                    responseJSON = JSON.parse(responseString);
                    console.log("no fetch needed!");
                } else {
                    console.log("fetch needed!");
                    response = await fetch(`https://api.agify.io/?name=${nameIn}&country_id=${countrySelectedOption}`);
                    responseJSON = await response.json();
                    responseString = JSON.stringify(responseJSON);
                    localStorage.setItem(`${nameIn}${countrySelectedOption}`, responseString);  
                }
            } else {
                if(isAvailable(nameIn)) {
                    responseString = localStorage.getItem(`${nameIn}`);
                    available = true;
                    responseJSON = JSON.parse(responseString);
                    console.log("no fetch needed!");
                } else {
                    console.log("fetch needed!");
                    response = await fetch(`https://api.agify.io/?name=${nameIn}`);
                    responseJSON = await response.json();
                    responseString = JSON.stringify(responseJSON);
                    localStorage.setItem(`${nameIn}`, responseString);
                }
            }

            if(responseJSON != undefined) {
                populateDivs(responseJSON, responseString);
            } else {

            }
    
        } catch(err) {
            console.log(err);
        }    
    }
};

const resetNamesDivs = () => {
    namesDisplay.innerHTML = "";
    nameInput.value = "";
    countrySelect.value = "";
};

fetchNameButton.addEventListener("click", fetchName);
resetNames.addEventListener("click", resetNamesDivs);