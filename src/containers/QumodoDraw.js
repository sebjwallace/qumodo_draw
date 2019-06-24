import React, {Component}       from 'react'
import TitleBar                 from '../components/TitleBar'
import Canvas                   from '../components/Canvas'
import CNNController            from '../controllers/CNNController'
import Prediction               from '../components/Prediction'
import NNArchitecture          from '../components/NNArchitecture'
import Card                     from '../components/Card'
import Button                   from '../components/Button'
import styles                   from './QumodoDraw.scss'

class QumodoDraw extends Component {

    constructor(props) {

        super(props);
        this.state = {};
        this.cnnController = new CNNController();

    }

    handleCanvasDraw = async canvas => {

        const {
            predictions,
            guess,
            activations
        } = await this.cnnController.predict(canvas);

        this.setState({
            predictions,
            guess,
            activations,
            cnnSummary: this.cnnController.summary
        });

    }

    render() {

        const {
            predictions,
            guess,
            activations,
            cnnSummary
        } = this.state;

        const { canvas } = this.refs;

        const drawCard = <Card title="Draw &amp; Predict">
            <Canvas
                onReady={this.canvasReady}
                onDrawn={this.handleCanvasDraw}
                ref="canvas"
            />
            <br/>
            <Button onClick={canvas && canvas.clearCanvas}>
                Clear
            </Button>
            <br/>
            <Prediction
                prediction={predictions}
                guess={guess}
            />
        </Card>

        const analysisCard = <Card title="Analysis">
            <NNArchitecture
                activations={activations}
                summary={cnnSummary}
            />
        </Card>

        return <div>

            <TitleBar/>

            <div className={styles.container}>
                { drawCard }
                { activations && analysisCard }
            </div>

        </div>
    }

}

export default QumodoDraw;