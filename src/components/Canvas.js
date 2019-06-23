import React, {Component}  from 'react'
import styles              from './Canvas.scss'
import EventListener       from '../controllers/EventListener'
import CanvasController    from '../controllers/CanvasController'
import Panel, {PanelTypes} from './Panel'

export const CanvasEvents = {
    NewImage: 'new_image',
    OpenImage: 'open_image',
    SaveImage: 'save_image',
    ColorChanged: 'color_changed',
    DrawingToolChanged: 'drawing_tool_changed',
    CanvasReady: 'canvas_ready'
};

class Canvas extends Component {

    constructor(props) {
        super(props);

        this.state = {
            filename: 'my_image',
            panel: null,
            prediction: null
        };
    }

    componentWillMount() {
        EventListener
            .getAppEventListener()
            .addEventListener(CanvasEvents.NewImage,           this.newImage)
            .addEventListener(CanvasEvents.OpenImage,          this.openImage)
            .addEventListener(CanvasEvents.SaveImage,          this.saveImage)
            .addEventListener(CanvasEvents.ColorChanged,       this.colorChanged)
            .addEventListener(CanvasEvents.DrawingToolChanged, this.drawingToolChanged);
    }

    componentDidMount() {
        EventListener
            .getAppEventListener()
            .dispatchEvent(new Event(CanvasEvents.CanvasReady));
    }

    componentWillUnmount() {
        EventListener
            .getAppEventListener()
            .removeEventListener(CanvasEvents.NewImage,           this.newImage)
            .removeEventListener(CanvasEvents.OpenImage,          this.openImage)
            .removeEventListener(CanvasEvents.SaveImage,          this.saveImage)
            .removeEventListener(CanvasEvents.ColorChanged,       this.colorChanged)
            .removeEventListener(CanvasEvents.DrawingToolChanged, this.drawingToolChanged);
    }

    componentDidMount(){
        this.canvasController = new CanvasController(this.refs.canvas);
        this.refs.canvas.addEventListener('mouseup', () => {
            this.props.onDrawn && this.props.onDrawn(this.refs.canvas);
        });
    }

    newImage  = async () => {
        try {
            await this.openPanel(
                'New Image',
                'Choose a filename for you new image:',
                PanelTypes.text,
                this.onTextPanelComplete
            );

            this.canvasController.clearCanvas();
        } catch (err) {}
    };

    saveImage = async () => {
        try {
            let filename = await this.openPanel(
                'Save Image',
                'Download image file as:',
                PanelTypes.text,
                this.onTextPanelComplete
            );

            this.canvasController.downloadImageData(filename);
        } catch (err) {}
    };

    openImage = async () => {
        try {
            let file = await this.openPanel(
                'Open Image',
                'Choose image to edit:',
                PanelTypes.file,
                this.onFilePanelComplete
            );

            this.canvasController.loadImageData(file);
        } catch (err) {}
    };

    colorChanged = (event) => {
        this.canvasController.setColor(event.color);
    };

    drawingToolChanged = (event) => {
        this.canvasController.setMode(event.tool);
    };

    openPanel(title, message, type, onComplete) {
        this.setState({panel: {title, message, type, onComplete}});
        return new Promise((resolve, reject) => {
            this.panelResolve = resolve;
            this.panelReject  = reject;
        });
    }

    clearPromise() {
        this.panelResolve = null;
        this.panelReject  = null;
    }

    closePanel = () => {
        this.setState({panel: null});
        if (this.panelReject) {
            this.panelReject();
            this.clearPromise();
        }
    };

    resolvePanel(result) {
        if (this.panelResolve) {
            this.panelResolve(result);
            this.clearPromise();
        }
    }

    onTextPanelComplete = (filename) => {
        this.setState({filename, panel: null});
        this.resolvePanel(filename);
    };

    onFilePanelComplete = (file) => {
        if (file && file.name) {
            this.setState({filename: file.name.split('.')[0], panel: null});
            this.resolvePanel(file);
        } else {
            this.closePanel();
        }
    };

    renderPanel() {
        let {panel: {title, message, type, onComplete}, filename} = this.state;
        return (
            <Panel title={title}
                   message={message}
                   type={type}
                   onCancel={this.closePanel}
                   onComplete={onComplete}
                   value={type !== PanelTypes.file ? filename : ''}/>
        );
    }

    clearCanvas = () => {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#000';
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }

    render() {
        return (
            <div className={styles.Canvas}>
                <canvas ref="canvas">
                    Your browser does not support this app!
                </canvas>
            </div>
        );
    }
}

export default Canvas;