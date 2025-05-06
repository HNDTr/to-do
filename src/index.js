import "./style.css";
import { firstPageLoad } from "./mainPage";
import { menuPage } from "./menuPage";
import { aboutPage } from "./aboutPage";


const homeButton = document.querySelector('.home');
const menuButton = document.querySelector('.menu');
const aboutButton = document.querySelector('.about');

const contentDiv = document.querySelector('#content');

//DOM first load 
firstPageLoad()
// menuPage()

homeButton.addEventListener('click', () => {
    contentDiv.innerHTML = '';
    firstPageLoad();
})

menuButton.addEventListener('click', () => {
    contentDiv.innerHTML = '';
    menuPage()
})

aboutButton.addEventListener('click', () => {
    contentDiv.innerHTML = '';
    aboutPage()
})
