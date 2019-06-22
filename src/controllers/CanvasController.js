
export const DrawMode = {
    draw: 0,
    rectangle: 1,
    ellipse: 2
};

class CanvasController {

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.setupCanvas();
        this.drawMode = DrawMode.draw;
    }

    setupCanvas() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        this.canvas.addEventListener('mousedown', this.mouseDown);
        this.canvas.addEventListener('mouseup', this.mouseUp);
        this.clearCanvas();
    }

    mouseDown = (event) => {
        this.canvas.addEventListener('mousemove', this.mouseMove);
        this.canvas.addEventListener('mouseleave', this.mouseLeave);

        this.ctx.beginPath();
        this.ctx.moveTo(event.offsetX, event.offsetY);
        this.ctx.lineWidth = 22;
    };

    mouseMove = (event) => {
        this.ctx.strokeStyle = 'white'
        this.ctx.lineTo(event.offsetX, event.offsetY);
        this.ctx.stroke();
    };

    mouseUp = (event) => {
        this.removeListeners();

        // this.clearCanvas();

        this.tidyMemory();
    };

    mouseLeave = (event) => {
        this.removeListeners();
        if (this.drawMode !== DrawMode.draw) {
            this.restoreContext();
            this.tidyMemory();
        }
    };

    removeListeners() {
        this.canvas.removeEventListener('mousemove', this.mouseMove);
        this.canvas.removeEventListener('mouseleave', this.mouseLeave);
    }

    tidyMemory() {
        delete this.startPosition;
        delete this.cachedImage;
    }

    drawEllipse(event, startPosition) {
        this.restoreContext();
        this.ctx.beginPath();
        this.ctx.ellipse(...this.getEllipse(event, startPosition));
    }

    restoreContext() {
        this.clearCanvas();
        this.ctx.drawImage(this.cachedImage, 0, 0);
    }

    getRectangle(event, startPosition) {
        return [
            startPosition.x,
            startPosition.y,
            event.offsetX - startPosition.x,
            event.offsetY - startPosition.y
        ];
    }

    getEllipse(event, startPosition) {
        let radiusX = (startPosition.x - event.offsetX) / 2;
        let radiusY = (startPosition.y - event.offsetY) / 2;

        return [
            startPosition.x - radiusX,
            startPosition.y - radiusY,
            Math.abs(radiusX),
            Math.abs(radiusY),
            0,
            Math.PI * 2,
            false
        ];
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#fff';
    }

    loadImageData(file) {
        let reader = new FileReader();
        reader.onload = (e) => {
            let image = new Image();
            image.src = e.target.result;
            image.onload = () => {
                this.clearCanvas();
                this.ctx.drawImage(image, 0, 0);
            };
        };
        reader.readAsDataURL(file);
    }

    downloadImageData(filename='my_image') {
        let link = document.createElement('a');
        link.href = this.canvas.toDataURL('image/jpeg', 0.8);
        link.download = filename + '.jpg';
        document.body.appendChild(link);
        link.click();
        document.removeChild(link);
    }

    setColor(color) {
        console.log(color);
        this.color = color;
        this.ctx.strokeStyle = color;
        this.ctx.fillStyle = color;
    }

    setMode(drawingMode) {
        this.drawMode = drawingMode;
    }
}



export default CanvasController;