/**
 * transofrme une URL en base 64
 * @param {string} url 
 * @returns 
 */
 let inputEncode = function (url) {
    let urlToBeEncoded = url;
    let urlEncoded =
      urlToBeEncoded && window.btoa(encodeURIComponent(urlToBeEncoded.trim()));
      return urlEncoded
  };
  

  function unsecuredCopyToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Unable to copy to clipboard', err);
    }
    document.body.removeChild(textArea);
  }
  /**
   * copie le texte
   * @param {} copyText 
   */
  function CopyText(copyText) {
    if (window.isSecureContext && navigator.clipboard) {
    navigator.clipboard.writeText(copyText);}
    else {
      unsecuredCopyToClipboard(copyText);
    }
        alert("Copié: " + copyText);
    
  }

  /**
   * vérifie si une string est une URL valide
   * @param {string} url 
   * @returns 
   */
  function checkUrl(url){
    let httpregex =/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    return httpregex.test(url)
  }
  
  export { inputEncode, CopyText, checkUrl }