import React, {Component}        from 'react'
import TitleBar                  from '../components/TitleBar'
import ToolBar                   from '../components/ToolBar'
import EventListener             from '../controllers/EventListener'
import Canvas                    from '../components/Canvas'
import {DrawMode}                from '../controllers/CanvasController'
import {AppColors}               from '../data/AppColors'
import {CanvasEvents}            from '../components/Canvas'

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

    render() {
        let {selectedTool, color} = this.state;

        return (
            <div>

                <TitleBar handleAppAction={this.handleAppAction} />

                <ToolBar selectedTool={selectedTool}
                         handleToolSelection={this.handleToolSelection}
                         selectedColor={color}
                         handleColorChange={this.handleColorChange} />

                <Canvas onReady={this.canvasReady} />

            </div>
        );
    }

}

export default QumodoDraw;
