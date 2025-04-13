const canvas= document.getElementById('canvas-board');
let ctx= canvas.getContext('2d');

// Fullscreen canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Drawing state
let isDrawing = false;
let lastX = 0;
let  lastY = 0;

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
    saveState()
  });
  
  // Stop drawing
  canvas.addEventListener('mouseup', () => isDrawing = false);
  canvas.addEventListener('mouseout', () => isDrawing = false);
  
  // Draw on canvas
  canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;
  
    ctx.strokeStyle = isErasing ? '#ffffff' : currentColor;
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
  
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
  });

const colorPicker = document.getElementById('colorPicker');
const sizePicker = document.getElementById('sizePicker');
const eraserBtn = document.getElementById('eraserBtn');
const clearBtn = document.getElementById('clearBtn');

let currentColor = '#000000';
let currentSize = 2;
let isErasing = false;

colorPicker.addEventListener('input', (e) => {
  currentColor = e.target.value;
  isErasing = false;
});

// Update size
sizePicker.addEventListener('input', (e) => {
  currentSize = e.target.value;
});

// Eraser toggle
eraserBtn.addEventListener('click', () => {
  isErasing = true;
});

// Clear button
clearBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
const undoBtn = document.getElementById('undoBtn');
const redoBtn = document.getElementById('redoBtn');

let drawingHistory = [];
let redoStack = [];

// Save state after drawing
function saveState() {
  if (drawingHistory.length > 50) drawingHistory.shift(); 
  drawingHistory.push(canvas.toDataURL());
  redoStack = []; 
}

// Undo last draw
undoBtn.addEventListener('click', () => {
  if (drawingHistory.length === 0) return;
  redoStack.push(canvas.toDataURL());

  const lastState = drawingHistory.pop();
  const img = new Image();
  img.src = lastState;
  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
  };
});

// Redo
redoBtn.addEventListener('click', () => {
  if (redoStack.length === 0) return;

  const redoState = redoStack.pop();
  drawingHistory.push(canvas.toDataURL());

  const img = new Image();
  img.src = redoState;
  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
  };
});
const penBtn = document.getElementById('penBtn');

penBtn.addEventListener('click', () => {
  isErasing = false;
});
