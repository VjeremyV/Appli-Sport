const days = ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche']

let today = new Date();
let options = {weekday: 'long'};
let currentDay = today.toLocaleDateString('fr-FR', options);

currentDay = currentDay.charAt(0).toLocaleUpperCase() + currentDay.slice(1);

let daysArray = days.slice(days.indexOf(currentDay)).concat(days.slice(0, days.indexOf(currentDay)));

export default daysArray;