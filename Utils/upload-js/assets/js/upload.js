const form = document.querySelector("form"),
  fileInput = document.querySelector(".file-input"),
  progressArea = document.querySelector(".progress-area"),
  uploadedArea = document.querySelector(".uploaded-area");

form.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", ({ target }) => {
  // les ({target}) === (e.target)
  let file = target.files[0];
  if (file) {
    let fileName = file.name;
    uploadFile(fileName);
  }
});

function uploadFile(name) {
  let xhr = new XMLHttpRequest(); //on créée un nouvel objet xml
  xhr.open("POST", "assets/php/upload.php"); //on  appelle le bon URL avec la bonne methode
  xhr.upload.addEventListener("progress", ({ loaded, total }) => {
    let fileLoaded = Math.floor((loaded / total) * 100);
    let filTotal = Math.floor(total / 1000);
    let progressHTML = ` <li class="row">
    <div class="content">
      <i class="fas fa-file-alt"></i>
    <div class="details">
      <span class="name"> ${name} · Uploading </span>
      <span class="percent">${fileLoaded}%</span>
    </div>
    <div class="progress-bar">
      <div class="progress" style='width: ${fileLoaded}'></div>
    </div>
  </div>
</li>`;
progressArea.innerHTML= progressHTML;
let uploadedHTML = ` <li class="row">
<div class="content">
  <i class="fas fa-file-alt"></i>
  <div class="details">
    <span class="name">image_01.png · Uploaded</span>
    <span class="size">70 Ko</span>
  </div>
</div>
<i class="fas fa-check"></i>
</li>`;


  });
  let formData = new FormData(form); //on utilise l'objet FormData pour envoyer l'objet form
  xhr.send(formData); //on envoie le formulaire au fichier php
}
