
import * as tf from '@tensorflow/tfjs';

class CNNController {

    constructor(canvas) {
        this.canvas = canvas;
        this.setupCanvas();
        this.loadModel();
    }

    setupCanvas(){
        this.canvas.addEventListener('mouseup', this.predict.bind(this));
    }

    async loadModel(){
        this.model = await tf.loadLayersModel('http://localhost:3000/model');
        console.log(this.model);
    }

    async predict({target: canvas}){

        const tensor = tf.browser.fromPixels(canvas)
            .resizeNearestNeighbor([28, 28])
            .mean(2)
            .expandDims(2)
            .expandDims()
            .toFloat()
            .div(255.0);

        const prediction = this.model.predict(tensor);
        const [guess] = Array.from(prediction.argMax(1).dataSync());
        const vector = prediction.dataSync();
        
        console.log(vector)
        console.log(guess)

        return {
            vector,
            guess
        }

    }

}

export default CNNController;