// Storage
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


// Selectors for cell properties
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

let addressBar = document.querySelector(".address-bar");

// APPLICATION OF TWO WAY BINDING //
// Attach property listeners
bold.addEventListener("click", (e) => {
    let address = addressBar.value;
    activecell(address);
});

function activecell(address) {
    let [rid, cid] = decodeRIDCIDFromAddress(address);
    // Access cell and storage object
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`)
}

function decodeRIDCIDFromAddress(address) {
    let rid = Number(address.slice()-1);
    let cid = Number(address.charCodeAt(0))-65;
    return [rid, cid];
}
