const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;
//css랑 같은 크기를 줘야함
ctx.fillRect(50,50,100,200)
//fillRect 4가지 속성이 존재(x:number, y:number, w:number, h: number)
