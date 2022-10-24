import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/index.css';
import Logo from "../images/logo.png";
import Favicon from "../../favicon.ico";
import {initdb} from "./database"

// import bootstrap after npm install bootstrap && @popperjs/core
import { Tooltip, Toast, Popover } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

if (typeof editor === 'undefined') {
  loadSpinner();
}

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox('/src-sw.js');
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}

window.addEventListener("load", function () {
  initdb();
  document.getElementById('logo').src = Logo;
  document.getElementById('favicon').src = Favicon;
})