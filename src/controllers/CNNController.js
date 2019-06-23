
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

        // const img = Array.from(await tensor.data());
        // const ctx = this.canvas.getContext('2d')
        // ctx.clearRect(0,0,280,280)

        // let i = 0
        // for(var x = 0; x < 28; x++){
        //     for(var y = 0; y < 28; y++){
        //         ctx.fillStyle = `rgba(0,0,0,${img[i]})`
        //         ctx.fillRect(y,x,1,1)
        //         i++
        //     }
        // }

        const prediction = this.model.predict(tensor);
        const [guess] = Array.from(prediction.argMax(1).dataSync());
        const vector = Array.from(prediction.dataSync());
        
        // console.log(vector)
        // console.log(guess)

        this.callback && this.callback({ vector, guess });

        const activations = this.getActivations(tensor);

        return {
            predictions: vector,
            guess
        }

    }

    getActivations(input){

        return this.model.layers.map(layer => {
            const output = layer.apply(input);
            input = output;
            
            if(output.shape.length === 4){
                const canvas = document.createElement('canvas')
                canvas.width = 800
                canvas.height = 100
                document.body.appendChild(canvas)
                const ctx = canvas.getContext('2d')
                const activations = output.arraySync()
                for(var x = 0; x < activations[0].length; x++){
                    for(var y = 0; y < activations[0][x].length; y++){
                        for(var z = 0; z < activations[0][x][y].length; z++){
                            const unit = activations[0][x][y][z]
                            ctx.fillStyle = `rgba(255,255,255,${unit})`
                            ctx.fillRect(z*28+y,x,1,1)
                        }
                    }
                }
            }

            return Array.from(output.dataSync());
            // return {
            //     shape: layer.output.shape.filter(v => v),
            //     tensor: output.reshape(layer.output.shape.filter(v => v)).dataSync()
            // }
        })

    }

}

export default CNNController;