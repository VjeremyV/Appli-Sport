const form = document.querySelector('form'),
 fileInput = document.querySelector('.file-input'),
 progressArea = document.querySelector('.progress-area'), 
 uploadedArea = document.querySelector('.uploaded-area')

 form.addEventListener('click', ()=> {
    fileInput.click();
 })