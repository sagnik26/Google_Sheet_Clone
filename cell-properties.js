                                        // *****Storage***** //
let sheetDB = [];

for(let i=0; i<rows; i++) {
    let sheetRow = [];
    for(let j=0; j<cols; j++) {
        let cellProp = {
            bold: false,
            italic: false,
            underline: false,
            alignment: "left",
            fontFamily: "monospace",
            fontSize: "14",
            fontColor: "#000000",
            BGcolor: "#000000",  // Just for indication purpose,
            value: "",
            formula: "",
            children: [], 
        }
        sheetRow.push(cellProp);
    }
    sheetDB.push(sheetRow);
}


                            // *****Selectors for cell properties***** //
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontSize = document.querySelector(".font-size-prop");
let fontFamily = document.querySelector(".font-family-prop");
let fontColor = document.querySelector(".font-color-prop");
let BGColor = document.querySelector(".BGcolor-prop");
let alignment = document.querySelectorAll(".alignment");
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];

let activeColorProp = "#d1d8e0";
let inactiveColorProp = "#ecf0f1";

                            // *****APPLICATION OF TWO WAY BINDING***** //
                            // *****Attach property listeners***** //

// Property BOLD
bold.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    // Modification //
    cellProp.bold = !cellProp.bold // Data change

    // UI change
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal"; 
    bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;
});

// Property ITALIC
italic.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    // Modification //    
    cellProp.italic = !cellProp.italic // Data change

    // UI change
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal"; 
    italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;
});

// Property UNDERLINE
underline.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    // Modification //    
    cellProp.underline = !cellProp.underline // Data change

    // UI change
    cell.style.textDecoration = cellProp.underline ? "underline" : "none"; 
    underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
});

// Property FONT_SIZE_SELECT 
fontSize.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    // Modification //    
    cellProp.fontSize = fontSize.value // Data change

    // UI change
    cell.style.fontSize = cellProp.fontSize + "px";
    fontSize.value = cellProp.fontSize;
});

// Property FONT_FAMILY_SELECT
fontFamily.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    // Modification //    
    cellProp.fontFamily = fontFamily.value // Data change

    // UI change
    cell.style.fontFamily = cellProp.fontFamily;
    fontFamily.value = cellProp.fontFamily;
});

// Property FONT_COLOR_SELECT
fontColor.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    // Modification //    
    cellProp.fontColor = fontColor.value // Data change

    // UI change
    cell.style.color = cellProp.fontColor;
    fontColor.value = cellProp.fontColor;
});

// Property BG_COLOR_SELECT
BGColor.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    // Modification //    
    cellProp.BGColor = BGColor.value // Data change

    // UI change
    cell.style.backgroundColor = cellProp.BGColor;
    BGColor.value = cellProp.BGColor;
});

// Property ALIGNMENT
alignment.forEach((alignElem) => {
    alignElem.addEventListener("click", (e) => {
        let address = addressBar.value;
        let [cell, cellProp] = getCellAndCellProp(address);

        let alignValue = e.target.classList[0];
        cellProp.alignment = alignValue; // Data change
        cell.style.textAlign = cellProp.alignment;

        switch(alignValue) {
            case 'left':
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case 'center':
                centerAlign.style.backgroundColor = activeColorProp;
                leftAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case 'right':
                rightAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                leftAlign.style.backgroundColor = inactiveColorProp;
                break;
        }
        
    })
})


let allCells = document.querySelectorAll(".cell");
for(let i=0; i<allCells.length; i++) {
    addListenerToAttachCellProperties(allCells[i]);
}

function addListenerToAttachCellProperties(cell) {
    cell.addEventListener("click", (e) => {
        let address = addressBar.value;
        let [rid, cid] = decodeRIDCIDFromAddress(address);
        let cellProp = sheetDB[rid][cid];
        // console.log('CELL-PROP', cellProp);

        // Apply cell properties
        cell.style.fontWeight = cellProp.bold ? "bold" : "normal"; 
        cell.style.fontStyle = cellProp.italic ? "italic" : "normal"; 
        cell.style.textDecoration = cellProp.underline ? "underline" : "none"; 
        cell.style.fontSize = cellProp.fontSize + "px";
        cell.style.fontFamily = cellProp.fontFamily;
        cell.style.color = cellProp.fontColor;
        cell.style.backgroundColor = cellProp.BGColor;

        // Apply properties to the actions menu UI (contains Bold, Italic, Underline etc...)
        bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;
        italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;
        underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
        fontFamily.value = cellProp.fontFamily;
        fontSize.value = cellProp.fontSize;
        fontColor.value = cellProp.fontColor;
        BGColor.value = cellProp.BGColor;

        switch(cellProp.alignment) {
            case 'left':
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case 'center':
                centerAlign.style.backgroundColor = activeColorProp;
                leftAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case 'right':
                rightAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                leftAlign.style.backgroundColor = inactiveColorProp;
                break;
        }

        
    })
}

function getCellAndCellProp(address) {
    let [rid, cid] = decodeRIDCIDFromAddress(address);
    // Access cell and storage object
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellProp = sheetDB[rid][cid];
    return [cell, cellProp];
}

function decodeRIDCIDFromAddress(address) {
    let rid = Number(address.slice(1)-1);
    let cid = Number(address.charCodeAt(0))-65;
    return [rid, cid];
}
