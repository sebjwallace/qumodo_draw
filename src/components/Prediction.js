import React, {Component}  from 'react'
import styles from './Prediction.scss'

const colours = {
    orange: 'rgb(195,85,28)',
    blue: score => `rgba(30,94,158,${score+0.1})`
}

class Prediction extends Component {

    constructor(props){

        super(props);

    }

    getStyle(score,index){
        const {orange, blue} = colours;
        const background = index === this.props.guess ? orange : blue(score);
        return {
            width: `${score*260}px`,
            background
        };
    }

    render(){

        const { prediction } = this.props;

        return <div className={styles.Prediction}>{
            prediction && prediction.map((score,index) =>
                <div key={index}>
                    <span>{index}</span>
                    <span
                        className={styles.row}
                        style={this.getStyle(score,index)}
                    ></span>
                </div>
            )
        }</div>

    }

}

export default Prediction;