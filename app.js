const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;
//css랑 같은 크기를 줘야함
ctx.lineWidth = 2;
let isPainting = false;

function onMove(e) {
    if (isPainting) {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(e.offsetX, e.offsetY);
}
function startPainting() {
    isPainting = true;
    //console.log("마우스다운",startPainting)
}
function cancelPainting() {
    isPainting = false;
    //console.log("마우스업",cancelPainting)
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);