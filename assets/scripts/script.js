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

////// 2

const nameInput = document.getElementById("name-input");
const fetchNameButton = document.getElementById("fetch-name-button");
const resetNames = document.getElementById("reset-names");
const namesDisplay = document.getElementById("names-display");

const populateDivs = (nameResponse, brut) => {
    const div = document.createElement("div");
    nameResponse.name === "" ? div.innerHTML = "No name to fetch!" : div.innerHTML = `There are ${nameResponse.count} ${nameResponse.name} and the average age is ${nameResponse.age} years old <br> ${brut}`;
    namesDisplay.append(div);
};

const fetchName = async () => {
    try {
        const nameIN = nameInput.value;
        const response = await fetch(`https://api.agify.io/?name=${nameIN}`);
        const nameResponse = await response.json();
        const brutNameResponse = JSON.stringify(nameResponse);
        populateDivs(nameResponse, brutNameResponse);
    } catch(err) {
        console.log(err);
    }
};

const resetNamesDivs = () => {
    namesDisplay.innerHTML = "";
};

fetchNameButton.addEventListener("click", fetchName);
resetNames.addEventListener("click", resetNamesDivs);