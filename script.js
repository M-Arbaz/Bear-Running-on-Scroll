
document.addEventListener('DOMContentLoaded',()=>{

 
const frmaeSVG = document.querySelectorAll('.frame svg');
const canvas = document.getElementById('canvas');
const canvasSvg = canvas.querySelector('svg');
const loaderDiv = document.querySelector('.loader');
const runningFrameG = [];

frmaeSVG.forEach((frmaeG) => {
    const frameGT = frmaeG.querySelector('g');
    runningFrameG.push(frameGT)
})

function getScrollPercentage() {
    const scrollDistance = window.scrollY || document.documentElement.scrollTop;
    const viewportHeight = window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;

    const scrollableHeight = pageHeight - viewportHeight;
    const scrollPercentage = (scrollDistance / scrollableHeight) * 100;

    return Math.min(Math.max(scrollPercentage, 0), 100); // Clamp between 0 and 100
}
const scrollValue = [];
const scrollArray =[...runningFrameG, ...runningFrameG.slice().reverse()];
let currentFrame = null;

window.addEventListener('scroll', () => {
    const xScroll = getScrollPercentage().toFixed(2);
    canvas.style.transform = `translate(${xScroll}vw,0)`;
    const scrollPosition = window.scrollY;

    const frameIndex = Math.floor((scrollPosition / 100) % scrollArray.length);
    if (currentFrame !== frameIndex) {

        canvasSvg.innerHTML = "";

        canvasSvg.appendChild(scrollArray[frameIndex]);

        currentFrame = frameIndex;
    }
    scrollValue.push(xScroll);


    if (scrollValue.length > 2) {
        scrollValue.shift();
    }
    const a = parseInt(scrollValue[0]);
    const b = parseInt(scrollValue[1]);
    if (a > b) {
        canvas.classList.add('back-svg')
        return;
    } else if (a < b) {
        canvas.classList.remove('back-svg')
        return
    }

});

document.body.addEventListener('click',()=>{
    canvas.classList.add('jump');
      setTimeout(()=>{
      canvas.classList.remove('jump');},500)
    })

(() => {
    const timings = [10, 700, 900, 1100, 1300, 1500, 1700, 1900, 2100, 2300, 2500];
    timings.forEach((time, i) => {
    setTimeout(() => {
        if (i < 10) {
            const currentFrame = runningFrameG[i % 6];
            const nextFrame = runningFrameG[(i + 1) % 6];
            canvasSvg.appendChild(nextFrame);
            canvasSvg.removeChild(currentFrame);
     
        } else {
            canvas.classList.remove('middle-screen');
            canvas.classList.remove('lod');
            loaderDiv.classList.remove('loader');
            const xScroll = getScrollPercentage().toFixed(2);
            canvas.style.transform = `translate(${xScroll}vw,0)`;
        }
    }, time);
    });
  })();

})  