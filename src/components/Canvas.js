import React, {Component}  from 'react'
import styles              from './Canvas.scss'
import CanvasController    from '../controllers/CanvasController'

const canvasBackgroundColor = '#000';

class Canvas extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        const { canvas } = this.refs;
        const { onDrawn } = this.props;
        this.canvasController = new CanvasController(canvas);
        canvas.addEventListener('mouseup', () => onDrawn && onDrawn(canvas));
    }

    clearCanvas = () => {
        const { canvas } = this.refs;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = canvasBackgroundColor;
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }

    render() {
        return <div className={styles.Canvas}>
            <canvas ref="canvas">
                Your browser does not support this app!
            </canvas>
        </div>
    }
}

export default Canvas;