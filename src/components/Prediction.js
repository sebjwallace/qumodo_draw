import React, {Component}  from 'react'
import styles from './Prediction.scss'

class Prediction extends Component {

    constructor(props){

        super(props);

    }

    getStyle(score){
        return {
            width: `${score*260}px`,
        };
    }

    getClassName(index){
        return index === this.props.guess ? styles.guess : styles.score;
    }

    render(){

        const { prediction } = this.props;

        return <div className={styles.Prediction}>{
            prediction && prediction.map((score,index) =>
                <div key={index}>
                    <span>{index}</span>
                    <span
                        className={`${styles.row} ${this.getClassName(index)}`}
                        style={this.getStyle(score)}
                    ></span>
                </div>
            )
        }</div>

    }

}

export default Prediction;