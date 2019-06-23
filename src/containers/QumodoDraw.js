import React, {Component}        from 'react'
import TitleBar                  from '../components/TitleBar'
import ToolBar                   from '../components/ToolBar'
import EventListener             from '../controllers/EventListener'
import Canvas                    from '../components/Canvas'
import {DrawMode}                from '../controllers/CanvasController'
import {AppColors}               from '../data/AppColors'
import {CanvasEvents}            from '../components/Canvas'
import CNNController from '../controllers/CNNController'
import Prediction from '../components/Prediction'
import Card from '../components/Card'
import Button from '../components/Button'

export const AppActions = {
    NewImage: 0,
    OpenImage: 1,
    SaveImage: 2
};

class QumodoDraw extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedTool: DrawMode.draw,
            color: AppColors.black,
            filename: 'MyImage'
        };

        this.cnnController = new CNNController()
    }

    componentWillMount() {
        EventListener
            .getAppEventListener()
            .addEventListener(CanvasEvents.CanvasReady, this.canvasReady);
    }

    componentWillUnmount() {
        EventListener
            .getAppEventListener()
            .removeEventListener(CanvasEvents.CanvasReady, this.canvasReady);
    }

    canvasReady = () => {
        this.canvasLoaded = true;

        if (this.cachedColor) {
            this.handleColorChange(this.cachedColor);
            delete this.cachedColor;
        }
    };

    handleAppAction = (action) => {
        switch (action) {
            case AppActions.NewImage:
                EventListener
                    .getAppEventListener()
                    .dispatchEvent(new Event(CanvasEvents.NewImage));
                break;
            case AppActions.SaveImage:
                EventListener
                    .getAppEventListener()
                    .dispatchEvent(new Event(CanvasEvents.SaveImage));
                break;
            case AppActions.OpenImage:
                EventListener
                    .getAppEventListener()
                    .dispatchEvent(new Event(CanvasEvents.OpenImage));
                break;
        }
    };

    handleToolSelection = (selectedTool) => {
        this.setState({selectedTool});

        let event = new Event(CanvasEvents.DrawingToolChanged);
        event.tool = selectedTool;

        EventListener
            .getAppEventListener()
            .dispatchEvent(event);
    };

    handleColorChange = (color) => {
        this.setState({color});

        if (this.canvasLoaded) {
            let event = new Event(CanvasEvents.ColorChanged);
            event.color = color;

            EventListener
                .getAppEventListener()
                .dispatchEvent(event);
        } else {
            this.cachedColor = color;
        }
    };

    async handleCanvasDraw(canvas){
        const { predictions, guess } = await this.cnnController.predict(canvas);
        this.setState({ predictions, guess });
    }

    render() {

        const {predictions, guess} = this.state;

        return (
            <div>

                <TitleBar handleAppAction={this.handleAppAction} />

                <Card>
                    <Canvas
                        onReady={this.canvasReady}
                        onDrawn={this.handleCanvasDraw.bind(this)}
                    />
                    <br/>
                    <Button>
                        Clear
                    </Button>
                    <br/>
                    <Prediction
                        prediction={predictions}
                        guess={guess}
                    />
                </Card>

            </div>
        );
    }

}

export default QumodoDraw;