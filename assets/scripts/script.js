const button = document.getElementById("display-becode-rules-button");
const ul = document.getElementById("becode-rules-list");

const getBecodeRules = async () => {
    ul.innerText = "";
    try {
        const response = await fetch("./assets/scripts/becode.json");
        const rules = await response.json();
        for(rule of rules) {
            const li = document.createElement("li");
            li.innerText = rule;
            ul.append(li);
        }
        return rules;
    } catch(err) {
        return `Error: ${err}`;
    }
}

button.addEventListener("click", getBecodeRules);