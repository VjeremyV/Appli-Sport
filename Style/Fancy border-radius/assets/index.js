let container = document.getElementById('container');
let br = document.getElementById('shape');
let aSpan = document.getElementById('span1');
let bSpan = document.getElementById('span2');
let cSpan = document.getElementById('span3');
let dSpan = document.getElementById('span4');

let a = document.getElementById('1');
let b = document.getElementById('2');
let c = document.getElementById('3');
let d = document.getElementById('4');

let inputs = Array.from(document.querySelectorAll("[type='range']"));
let spanW = 10;
window.addEventListener("load",()=>{br.style.cssText = getBR();})



inputs.map((inp)=>{ 
  let span = inp.parentNode.querySelector("span");
  span.innerHTML = inp.value;
  inp.addEventListener("input", ()=>{
      span.innerHTML = inp.value;
      br.style.cssText = getBR(); 
   
  })
})

function getBR(){
  let _a = Number(a.value);
  let _b = Number(b.value);
  let _c = Number(c.value);
  let _d = Number(d.value);
  
  
  aSpan.style.left = _a+"%";
  bSpan.style.top = _b+"%";
  cSpan.style.right = _c+"%";
  dSpan.style.bottom = _d+"%";

  let s = `
border-top-left-radius:${_a}% ${100-_d}%;/*A*/
border-top-right-radius:${100 - _a}% ${_b}%;/*B*/
border-bottom-right-radius:${_c}% ${100-_b}%;/*C*/
border-bottom-left-radius:${100 - _c}% ${_d}%;/*D*/
`;
  
 let cssRoule = `${_a}% ${100 - _a}% ${_c}% ${100 - _c}% / ${100-_d}% ${_b}% ${100-_b}% ${_d}%`; 
 output.value = cssRoule;
//border-radius: [top-left horizontal radius] [top-right horizontal radius]? [bottom-right horizontal radius]? [bottom-left horizontal radius]? / [top-left vertical radius] [top-right vertical radius]? [bottom-right vertical radius]? [bottom-left vertical radius]?

  return s;
}



//Events draggable

let draggable = false;
let m = {}
let spans = Array.from(document.querySelectorAll("#shape span"));
let thisSp = null;
let thisSlider = null;

spans.map(span =>{

  span.addEventListener("mousedown",()=>{
    draggable = true;
    thisSp = span;
    thisSlider = document.querySelector("#"+String(span.id).charAt(0));
    thisSp.classList.add("active")
  })
  
  document.body.addEventListener("mousemove",(evt)=>{
    //console.log(sp.id)
    if(draggable == true){
      m = oMousePos(container, evt);
      thisSlider.value = window[thisSp.id+"Func"](m)
      br.style.cssText = getBR();
      
    };
  })
  
  document.body.addEventListener("mouseup",()=>{
    draggable = false;
    thisSp.classList.remove("active")
  })
})



function aSpanFunc(m){
  return(100 * m.x/300)
}

function bSpanFunc(m){
  return(100 * m.y/300)
}

function cSpanFunc(m){
  return(100 - 100 * m.x/300)
}

function dSpanFunc(m){
  return(100 - 100 * m.y/300)
}


function oMousePos(elemento, evt) {
  var ClientRect = elemento.getBoundingClientRect();
	return { //objeto
	x: Math.round(evt.clientX - ClientRect.left),
	y: Math.round(evt.clientY - ClientRect.top)
   }
}


output.addEventListener("click", function(event) {   
    output.select();
 try {
      let ok = document.execCommand("copy");// true or false
      let msg = ok ? "ok" : "error";
      console.log(msg);
} catch (error) {
      let err = error;
      console.log("error");
    }
  }); 