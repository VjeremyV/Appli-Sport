const main = document.querySelector("main");
const exercises = {
  a: {
    letter: "a",
    name: "jumping jack",
    repetition: 50,
    time: 0,
    pic: "jumpingJack",
  },
  b: {
    letter: "b",
    name: "crunches",
    repetition: 20,
    time: 0,
    pic: "crunches",
  },
  c: { letter: "c", name: "squats", repetition: 30, time: 0, pic: "squats" },
  d: { letter: "d", name: "pompes", repetition: 15, time: 0, pic: "pompes" },
  e: { letter: "e", name: "chaise", repetition: 0, time: 1, pic: "chaise" },
  f: { letter: "f", name: "burpees", repetition: 10, time: 0, pic: "burpees" },
  g: { letter: "g", name: "fentes", repetition: 20, time: 0, pic: "fentes" },
  h: {
    letter: "h",
    name: "ciseaux abdo",
    repetition: 30,
    time: 0,
    pic: "ciseauxAbdo",
  },
  i: { letter: "i", name: "burpees", repetition: 20, time: 0, pic: "burpees" },
  j: { letter: "j", name: "planche", repetition: 0, time: 1, pic: "planche" },
  k: { letter: "k", name: "pompes", repetition: 10, time: 0, pic: "pompes" },
  l: { letter: "l", name: "dips", repetition: 20, time: 0, pic: "dips" },
  m: {
    letter: "m",
    name: "jumping jacks",
    repetition: 30,
    time: 0,
    pic: "jumpingJack",
  },
  n: { letter: "n", name: "burpees", repetition: 25, time: 0, pic: "burpees" },
  o: {
    letter: "o",
    name: "abdos touches/pieds",
    repetition: 40,
    time: 0,
    pic: "abdoTP",
  },
  p: {
    letter: "p",
    name: "fentes sautées",
    repetition: 15,
    time: 0,
    pic: "fentesSautees",
  },
  q: {
    letter: "q",
    name: "crunches",
    repetition: 30,
    time: 0,
    pic: "crunches",
  },
  r: { letter: "r", name: "pompes", repetition: 20, time: 0, pic: "pompes" },
  s: {
    letter: "s",
    name: "jumps squats",
    repetition: 30,
    time: 0,
    pic: "jumpSquat",
  },
  t: { letter: "t", name: "burpees", repetition: 15, time: 0, pic: "burpees" },
  u: {
    letter: "u",
    name: "crunches tendus",
    repetition: 30,
    time: 0,
    pic: "crunchesTendu",
  },
  v: { letter: "v", name: "chaise", repetition: 0, time: 2, pic: "chaise" },
  w: {
    letter: "w",
    name: "ciseaux abdos",
    repetition: 50,
    time: 0,
    pic: "ciseauxAbdo",
  },
  x: {
    letter: "x",
    name: "jumpings jacks",
    repetition: 60,
    time: 0,
    pic: "jumpingJack",
  },
  y: { letter: "y", name: "planche", repetition: 0, time: 2, pic: "planche" },
  z: { letter: "z", name: "pompes", repetition: 30, time: 0, pic: "pompes" },
};
let liste = [];
let wordLenght = 0;
let mapArray;

////////////////////////////////////////////fonctions utiles/////////////////////////////////////////////////////
class Exercice {
  constructor() {
    this.index = 0;
    this.minute = liste[this.index].time;
    this.seconde = 0;
    this.repetitions = 0;
  }
  updateCountdow() {
    if (liste[this.index].time !== 0) {
      this.seconde = this.seconde < 10 ? "0" + this.seconde : this.seconde;

      setTimeout(() => {
        if (this.minute === 0 && this.seconde === "00") {
          this.index++;
          if (this.index < liste.length) {
            this.minute = liste[this.index].time;
            this.seconde = 0;
            this.updateCountdow();
          } else {
            return page.end();
          }
        } else if (this.seconde === "00") {
          this.minute--;
          this.seconde = 59;
          this.updateCountdow();
        } else {
          this.seconde--;
          this.updateCountdow();
        }
      }, 10);

      return (main.innerHTML = `
        <div>
        <p>Chrono ${this.minute}:${this.seconde}</p>
        <img src="./assets/${liste[this.index].pic}.jpg"/>
        <div>${this.index + 1} / ${liste.length}</div>

        </div>
        `);
    } else {
      setTimeout(() => {
        if (this.repetitions == liste[this.index].repetition) {
          this.index++;
          if (this.index < liste.length) {
            this.repetitions = 0;
            this.minute = liste[this.index].time;
            this.updateCountdow();
          } else {
            return page.end();
          }
        } else {
          this.repetitions++;
          this.updateCountdow();
        }
      }, 100);

      return (main.innerHTML = `
        <div>
        <p>Répétitions ${this.repetitions}/${liste[this.index].repetition}</p>
        <img src="./assets/${liste[this.index].pic}.jpg"/>
        <div>${this.index + 1} / ${liste.length}</div>

        </div>
        `);
    }
  }
}
const utils = {
  pageContent: function (title, content, btn) {
    document.querySelector("h1").innerHTML = title;
    main.innerHTML = content;
    document.querySelector(".btn-container").innerHTML = btn;
  },
  generateCards: function (carteRoutine) {
    document.querySelector(".carte-routine").innerHTML = carteRoutine;
  },
  errorDisplay: function (message, valid) {
    const span = document.querySelector(".checker");

    if (!valid) {
      span.classList.add("err");
      span.textContent = message;
    } else {
      span.classList.remove("err");
      span.textContent = message;
    }
  },
  inputChecker: function (value) {
    if (!value.match(/^[a-z]*$/)) {
      this.errorDisplay("écrire uniquement des lettres en minuscules", false);
    } else {
      this.errorDisplay("", true);
    }
  },

  getSelectionStart: function (o) {
    if (o.createTextRange) {
      var r = document.selection.createRange().duplicate();
      r.moveEnd("character", o.value.length);
      if (r.text == "") {
        return o.value.length;
      } else {
        return o.value.lastIndexOf(r.text);
      }
    } else {
      return o.selectionStart;
    }
  },
  reboot: function () {
    page.lobby();
    mapArray="";
    liste = [];
    wordLenght = 0;
    this.generateCards("")
  },

};
/////////////////////////////////////////////////génération de PAGE////////////////////////////////////////////////////////
const page = {
  lobby: function () {
    utils.pageContent(
      "Créer ta propre séance !",
      "Chaque lettre de l'alphabet correspond à un exercice différent.<br> Tu écris quelque chose dans l'encart ci-dessous,<br> et l'application génère ta séance !<br> Utilise ton nom, ton prénom ou même les jours de la semaine<br> pour personnaliser une routine.<br> Essaye ! ",
      ` <input type="text" placeholder='écrire ici'> <span class="checker"></span><button id="start">C'est parti!</button>`
    );
    const input = document.querySelector("input");
    input.addEventListener("input", (e) => {
      utils.inputChecker(e.target.value);
      wordLenght++;
      //   console.log(wordLenght);
      if (e.target.value.length == 0) {
        wordLenght = 0;
        liste.length = 0;
        mapArray = "";
        utils.generateCards(`<ul>${mapArray}</ul>`);
      } else if (wordLenght == e.target.value.length) {
        const chars = e.target.value.split("");
        console.log(chars[utils.getSelectionStart(input) - 1]);
        liste.splice(
          utils.getSelectionStart(input) - 1,
          0,
          exercises[chars[utils.getSelectionStart(input) - 1]]
        );
        // liste.push(exercises[e.target.value.slice(e.target.value.length - 1)]);
        // console.log(liste);
        let mapArray = liste
          .map(
            (exo) =>
              `
            <li>
              <div class="card">
                <h2>Lettre "${exo.letter}"</h2>
                <img src="./assets/${exo.pic}.jpg"/>
                <span>${exo.name}</span>
                <span>Répétition : ${exo.repetition} / temps : ${exo.time} min</span>
              </div>
            </li>
            `
          )
          .join("");
        utils.generateCards(`<ul>${mapArray}</ul>`);
      } else {
        wordLenght = e.target.value.length;
        liste.splice(utils.getSelectionStart(input), 1);
        // liste.pop();
        let mapArray = liste
          .map(
            (exo) =>
              `
            <li>
              <div class="card">
                <h2>Lettre "${exo.letter}"</h2>
                <img src="./assets/${exo.pic}.jpg"/>
                <span>${exo.name}</span>
                <span>Répétition ${exo.repetition} / temps ${exo.time}</span>
              </div>
            </li>
            `
          )
          .join("");
        utils.generateCards(`<ul>${mapArray}</ul>`);
        
      }
    });
    start.addEventListener("click", () => {
      page.routine();
    });
  },
  routine: function () {
    const exercice = new Exercice();
    utils.pageContent("Routine", exercice.updateCountdow(), null);
  },
  end: function () {
    utils.pageContent("Bravo ! Vos êtes allé au bout de votre séance !", "<button id='restart'>Recommencer</button>",
    "<button id='reboot' class='btn-reboot'>Réinitialiser <i class='fas fa-times-circle'></i></button>")
    restart.addEventListener("click", () => {
      this.routine();
    });
    reboot.addEventListener("click", () => {
      utils.reboot();
    });
  },
  
};

page.lobby();

///////////////////////////////////////////////////////checker////////////////////////
