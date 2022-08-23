import { inputEncode, CopyText, checkUrl } from "./functions";

const fileForm = document.getElementById("fileForm"),
  fileInput = document.getElementById("csv-input"),
  tHead = document.querySelector("thead"),
  tBody = document.querySelector("tbody"),
  urlPos = document.getElementById("urlPos"),
  messageContainer = document.querySelector(".messageContainer");
let fileData;

////////////////////////////////////////////////////Functions////////////////////////////////////////////

/**
 * lance la copie pour les listes d'éléments
 */
function askCopy(){
  let spans = document.querySelectorAll(".copyText");
  spans.forEach((element) => {
    let span = element;
      element.addEventListener('click', () => {
        CopyText(span.textContent);
      })
    })
}

/**
 * affiche le contenu du csv
 * @param {*} tableaHeader 
 * @param {*} data 
 */
function displayData(tableaHeader, data) {
  // on affiche l'en-tête du tableau
  let ids = [];
  let hideCheckbox = tableaHeader.map((el) =>
    ` 
    <div class='border rounded p-3 mx-2'>
    <input type="checkbox" id="hide-${el.replaceAll('"', "")}" name="hide" class='hideBtn' data-col="${el.replaceAll('"', "")}">
    <label for="hide-${el.replaceAll('"', "")}">Cacher ${el.replaceAll('"', "")}</label>
    </div>
    `
  ).join('')

document.querySelector('.settings').innerHTML = hideCheckbox;

displayHeader(tableaHeader, ids, data);

displayTab(data, ids)



//on ajoute l'événement pour les boutons encoder 
let hideBtn = document.querySelectorAll('.hideBtn');
hideBtn.forEach(btn=>{
  btn.addEventListener('click', () => {
    ids =[];
    let header = tableaHeader.map((el) => el.replaceAll('"', ""))
    hideBtn.forEach(btn=> {
      if(btn.checked ){
        let btnId = btn.dataset.col
        ids.push(header.indexOf(btnId))
      }
    })
    displayTab(data, ids);
    displayHeader(tableaHeader, ids, data)
  })
})
}



/**
 * affiche le header du tableau
 * @param {*} tableaHeader 
 * @param {*} ids 
 * @param {*} data 
 */
function displayHeader(tableaHeader, ids, data){
  let th = [`<th scope="col">B64 span</th>`];

  tableaHeader.forEach((el, i) => {
    if(!ids.includes(tableaHeader.indexOf(el))){
      th.push(
        `<th scope="col" class='text-center'>colone ${i + 1}<br> "${el.replaceAll('"', "")}"
        <div class=' p-2 m-2'>
        <button id='${el.replaceAll('"', "")}' class="btn btn-primary encodeBtn">Encoder</button>
        <div>
        </div>
        </div></th>`
        );
    }
    
  tHead.innerHTML = `<tr>
  ${th.join("")}
</tr>`;
  });

  //on ajoute l'événement pour les boutons encoder 
let encodeBtn = document.querySelectorAll('.encodeBtn');
encodeBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    let btnId = btn.getAttribute('id');
    let header = tableaHeader.map((el) => el.replaceAll('"', ""))
    let index = header.indexOf(btnId);
      displayTab(data, ids, index);
  })
});
}

/**
 * affiche le contenu du tableau du csv
 * @param {*} data 
 * @param {*} ids 
 * @param {*} index 
 */
function displayTab(data, ids, index=null){
  let trs = []; //tableau qui va contenir l'ensemble des éléments td de la ligne tr
  let err = null; //variable qui ressence les erreurs

  for (let i = 1; i < data.length; i++) {//on crée une boucle qui ira de 1 jusqu'à la longueur du tableau de données

    let dataTr = data[i][0].split(",");//dataTr contiendra la data à partir de l'index i=1 car l'index 0 est celui du header, on utilise split pour transformer la chaine de caractère en tableau
    let b64 = "";//on crée une variable qui contiendra nos données en b64
    if(index){//si la variable index est renseignée
      let string = dataTr[index].replaceAll('"', "");//on insère dans la variable string le contenu de notre element auquel on retire les guillements doubles si il en a
        if (checkUrl(string)) {//si string est une url
            b64 = `&lt; span class='qcd' data-qcd='${inputEncode(string)}'&gt;Ancre à changer&lt;/span&gt;`;
        } else {
          err = 'errUrlCol'//sinon on revoit une erreur dans la varialbe err
        }
    }
    let tr = [`<td class='copyText'>${b64}</td>`];//on créée la variable tr qui contiendra notre ligne et nos td, dans laquelle on insère un premier élément qui correspond à la colone b64
    dataTr.forEach((el) => {//pour chaque ligne du tableau dataTr on boucle pour créer toutes les lignes de notre tableau html que l'on revoit dans la variable tr
      if(!ids.includes(dataTr.indexOf(el))){//on ne renvoit une ligne que si l'index de l'élément en question n'est pas contenu dans le tableau des ids à cacher
        tr.push(`<td>${el.replaceAll('"', "")}</td>`);
      }
    });
    trs.push(`<tr>${tr.join("")}</tr>`);
  }

  //on affiche les erreurs de saisi de l'input colone à encoder
  switch (err) {
    case "errUrlCol":
      messageContainer.innerHTML = `<p class ="alert alert-danger text-align-center" >La colone selectionnée ne contient pas d'URL valide</p>`;
      break;
    default:
      messageContainer.innerHTML = ``;
  }
  tBody.innerHTML = trs.join("");
}



/////////////////////////////////////////////////////////////////////////////////Events//////////////////////////////////////////////////
fileForm.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", ({ target }) => {
  // les ({target}) === (e.target)
  let file = target.files[0];
  if (file) {
    getCSVdata(file);
  }
  
});

function getCSVdata(file) {
  let formData = new FormData();
  formData.append("csv", file);

  const options = {
    method: "POST",
    body: formData,
  };

  fetch("./../../php/upload.php", options)
    .then((res) => res.json())
    .then((data) => {
      let tableaHeader = data[0][0].split(",");
      fileData = data;
      displayData(tableaHeader, data);
      askCopy();
    });
}


