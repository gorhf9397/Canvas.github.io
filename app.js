const lineWidth = document.querySelector("#line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;
//css랑 같은 크기를 줘야함
ctx.lineWidth = lineWidth.value;
let isPainting = false;

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

//그리기 부분
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);

//input이벤트부분
lineWidth.addEventListener("change", onLineWidthChange);