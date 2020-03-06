const drawing = document.getElementById('drawing');
const context = drawing.getContext('2d');
context.translate(0.5, 0.5);

// funcion para dibujar una linea entre dos puntos
function drawLine(pointZero, pointOne, color = "black") {
    context.beginPath();
    context.moveTo(pointZero.x, pointZero.y);
    context.lineTo(pointOne.x, pointOne.y);
    context.strokeStyle = color;
    context.stroke();
}

// funcion para dibujar un triangulo
function drawTriangle(pointZero, pointOne, pointTwo) {
    drawLine(pointZero, pointOne);
    drawLine(pointOne, pointTwo);
    drawLine(pointTwo, pointZero);
}

// funcion recursiva
function sierpinskiTriangle(pointZero, pointOne, pointTwo, depth) {
    if (depth > 0) {
        const pointA = {
            x: pointZero.x + (pointOne.x - pointZero.x) / 2,
            y: pointZero.y - (pointZero.y - pointOne.y) / 2
        };
        const pointB = {
            x: pointOne.x + (pointTwo.x - pointOne.x) / 2,
            y: pointOne.y - (pointOne.y - pointZero.y) / 2
        };
        const pointC = {
            x: pointZero.x + (pointTwo.x - pointZero.x) / 2,
            y: pointZero.y
        }
        sierpinskiTriangle(pointZero, pointA, pointC, depth - 1);
        sierpinskiTriangle(pointA, pointOne, pointB, depth - 1);
        sierpinskiTriangle(pointC, pointB, pointTwo, depth - 1);
    } else {
        drawTriangle(pointZero, pointOne, pointTwo);
    }
}

// agregamos escuchador de eventos al form
const changeDepth = document.querySelector('#depth-form');
changeDepth.addEventListener('submit', (event) => {
    // prevenir que reinicie la pagina al menos de que yo lo quiera
    event.preventDefault();
    
    // limpiar el canvas cada que agreguemos una nueva profundidad
    context.clearRect(0, 0, drawing.width, drawing.height);

    // obtener la profundidad
    const depth = changeDepth['depth'].value;

    // por problemas de hardware nos quedamos en menor de cierto numero
    if (depth > 10) {
        alert('Lamentamos que solo podemos hasta 10 de profundidad');
        location.reload(true);
    } else {
        // mando llamar la funcion recursiva los datos y modificando profundidad
        sierpinskiTriangle({ x: 0, y: 400 }, { x: 200, y: 0 }, { x: 400, y: 400 }, depth);
    }
})