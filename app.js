const saveBtn = document.querySelector("#save");
const textInput = document.querySelector("#text");
const fontSize = document.querySelector("#fontSize");
const fileInput = document.querySelector("#file");
const modeBtn = document.querySelector("#fill-btn");
const destroyBtn = document.querySelector("#destroy-btn");
const eraserBtn = document.querySelector("#eraser-btn");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const color = document.querySelector("#color");
const lineWidth = document.querySelector("#line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

//css랑 같은 크기를 줘야함
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
let isPainting = false;
let isFilling = false;
let isClicked = false;

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
function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "🔪 그리기";
  } else {
    isFilling = true;
    modeBtn.innerText = "🎨 채우기";
  }
}
function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}
function onDestroyClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}
function onEraserClick(e) {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "🔪 그리기";
}
function onFileChange(e) {
  // console.dir(e.target.files);
  const file = e.target.files[0];
  const url = URL.createObjectURL(file); // 업로드한 이미지를 URL로 변환
  //console.log(url);
  const image = new Image(); //html 표기법 <img src=""/> or document.createElement("img") 와 같음 
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    //   좌표       넓이          높이
    fileInput.value = null;
  };
}
function onDoubleClick(e) {
  console.log("x좌표", e.offsetX, "y좌표", e.offsetY);
  const text = textInput.value;
  const size = fontSize.value;
  
  console.log(size);
  if (text !== "") {
    ctx.save(); //현재상태,색상,스타일 등 을 저장
    ctx.lineWidth = 1;
    ctx.font = `${size}px serif`;
    ctx.fillText(text, e.offsetX, e.offsetY);
    ctx.restore(); // 저장해놨던 것들을 저장해뒀던 버전으로 리턴
    console.log(ctx.font);
  }
}
function onSaveClick() {
  const url = canvas.toDataURL();
  // 다운로드 에 필요한 그림정보를 URL화 해서 다운로드
  const a = document.createElement("a");
  a.href = url;
  a.download = "myImage.png";
  a.click();
}

//그리기 부분
// canvas.onmousemove = function () {
//   onMove;
// }; addEventListener() 의 다른 작성법
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
colorOptions.forEach((con) => con.addEventListener("click", onColorClick));
modeBtn.addEventListener("click", onModeClick);

//지우기
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);

//이미지 컨트롤러
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);

//텍스트 컨트롤러
canvas.addEventListener("dblclick", onDoubleClick);
