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



