const modeBtn = document.querySelector("#fill-btn");
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const color = document.querySelector("#color");
const lineWidth = document.querySelector("#line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;
//css랑 같은 크기를 줘야함
ctx.lineWidth = lineWidth.value;
let isPainting = false;
let isFilling = false;

function onMove(e) {
    if (isPainting) {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        return;
    }
    ctx.beginPath(); // 크기조절을할때 모든 path가 연결돼 있기때문에 beginPath로 연결을 끊어줌
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
function onLineWidthChange(e) {
    console.log(e.target.value);
    ctx.lineWidth = e.target.value;
}
function onColorChange(e) {
    // console.log(e.target.value);
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
}
function onColorClick(e) {
    //console.dir(e.target.dataset.color);
    //console.dir은 객체까지 확인할수 있음
    const colorValue = e.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
}
function onModeClick(e) {
    //console.log(e);
    if (isFilling) {
        isFilling = false;
        modeBtn.innerText = "그리기";
    } else {
        isFilling = true;
        modeBtn.innerText = "채우기";
    }
}
function onCanvasClick() {
    if (isFilling) {
        ctx.fillRect(0, 0, 800, 800);
    }
}

//그리기 부분
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);

//input이벤트부분
lineWidth.addEventListener("change", onLineWidthChange);

//color부분
color.addEventListener("change", onColorChange);
//console.log(colorOptions);
colorOptions.forEach(con => con.addEventListener("click", onColorClick));
modeBtn.addEventListener("click", onModeClick);