const canvas =document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let scenario = new Board();
let bird = new Bird();
let interval = 0;
let frames = 0;
let pipes = [];
let animateHelper = 0;