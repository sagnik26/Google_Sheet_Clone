for(let i=0; i<rows; i++) {
    for(let j=0; j<cols; j++) {
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        cell.addEventListener("blur", (e) => {
            let address = addressBar.value;
            let [activeCell, cellProp] = activecell(address);
            cellProp.value = activeCell.innerText;
            console.log("CELLPROP", cellProp);
        })
    }
}

let formulaBar = document.querySelector(".formula-bar");
formulaBar.addEventListener("keydown", (e) => {
    let inputFormula = formulaBar.value;
    if(e.key === "Enter" && inputFormula) {
        // If change in formula, break old P-C relation, evaluate new formula, add new P-C relation
        let address = addressBar.value;
        let [cell, cellProp] = activecell(address);
        if(inputFormula !== cellProp.formula) removeChildFromParent(cellProp.formula);

        let evaluatedVal = evaluateFormula(inputFormula);

        // To update UI and cellProp in DB
        setCellUIAndCellProp(evaluatedVal, inputFormula);
        addChildToParent(inputFormula);
        console.log("SHEET", sheetDB);
    }
});

function updateChildrenCells(address) {
    
}

function addChildToParent(formula) {
    let childAddress = addressBar.value;
    let encodedFormula = formula.split(" ");
    for (let i = 0; i < encodedFormula.length; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [parentCell, parentCellProp] = activecell(encodedFormula[i]);
            parentCellProp.children.push(childAddress);
        }
    }
}

function removeChildFromParent(formula) {
    let childAddress = addressBar.value;
    let encodedFormula = formula.split(" ");
    for (let i = 0; i < encodedFormula.length; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [parentCell, parentCellProp] = activecell(encodedFormula[i]);
            let idx = parentCellProp.children.indexOf(childAddress);
            parentCellProp.children.splice(idx, 1);
        }
    }
}

function evaluateFormula(formula) {
    let encodedFormula = formula.split(" ");
    for(let i=0; i<encodedFormula.length; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <= 90) {
            let [cell, cellProp] = activecell(encodedFormula[i]);
            encodedFormula[i] = cellProp.value;
        }
    }
    let decodedFormula = encodedFormula.join(" ");
    return eval(decodedFormula);
}

function setCellUIAndCellProp(evaluatedVal, formula) {
    let address = addressBar.value;
    let [cell, cellProp] = activecell(address);

    // UI update
    cell.innerText = evaluatedVal;

    // DB update
    cellProp.value = evaluatedVal;
    cellProp.formula = formula;
}


