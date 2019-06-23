
import * as tf from '@tensorflow/tfjs';

const MODEL_URL = 'http://localhost:3000/model';

class CNNController {

    constructor() {
        this.loadModel();
    }

    async loadModel(){
        this.model = await tf.loadLayersModel(MODEL_URL);
    }

    async predict(canvas){

        const tensor = tf.browser.fromPixels(canvas)
            .resizeNearestNeighbor([28, 28])
            .mean(2)
            .expandDims(2)
            .expandDims()
            .toFloat()
            .div(255.0);

        const prediction = this.model.predict(tensor);
        const [guess] = Array.from(prediction.argMax(1).dataSync());
        const vector = Array.from(prediction.dataSync());
        const activations = this.getActivations(tensor);

        return {
            predictions: vector,
            guess,
            activations
        }

    }

    getActivations(input){

        return this.model.layers.map(layer => {
            const output = layer.apply(input);
            input = output;
            return output.arraySync().pop();
        })

    }

    get summary(){
        return this.model.updatedConfig().config.map(({
            config: {
                name,
                activation,
                batchInputShape,
                filters
            }
        }) => ({
            name,
            activation,
            batchInputShape,
            filters
        }));
    }

}

export default CNNController;