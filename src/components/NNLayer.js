import React, {Component}  from 'react'
import styles from './NNLayer.scss'

class NNLayer extends Component {

    constructor(props){

        super(props)

    }

    renderLayer(){
        const { activations } = this.props;
        const { canvas } = this.refs;
        const ctx = canvas.getContext('2d');
        const isVector = !isNaN(activations[0]);
        isVector ? this.renderVector(canvas,ctx,activations)
            : this.renderMatrix(canvas,ctx,activations);
    }

    renderMatrix(canvas,ctx,activations){
        canvas.height = activations[0].length
        for(let x = 0; x < activations.length; x++){
            for(let y = 0; y < activations[x].length; y++){
                for(let z = 0; z < activations[x][y].length; z++){
                    const unit = activations[x][y][z]
                    ctx.fillStyle = `rgba(255,255,255,${unit})`
                    ctx.fillRect(z*28+y,x,1,1)
                }
            }
        }
    }

    renderVector(canvas,ctx,activations){
        canvas.height = 20;
        const size = 5;
        for(let i = 0, y = 0, x = 0; i < activations.length; i++, x++){
            if(x * size > canvas.width){
                y += size;
                x = 0;
            }
            const unit = activations[i];
            ctx.fillStyle = `rgba(255,255,255,${unit+0.02})`;
            ctx.fillRect(x*size,y,size,size);
        }
    }

    componentDidMount(){
        this.renderLayer()
    }

    componentDidUpdate(){
        this.renderLayer()
    }

    render(){

        return <div className={styles.NNLayer}>
            <canvas
                ref="canvas"
                width="1000"
                height="40"
            >
                Sorry, your browser does not support HTML5 Canvas
            </canvas>
        </div>

    }

}

export default NNLayer;