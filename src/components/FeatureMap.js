import React, {Component}  from 'react'
import styles from './FeatureMap.scss'
import LayerViz from './LayerViz'

class FeatureMap extends Component {

    constructor(props){

        super(props)

    }

    render(){

        const { activations, summary } = this.props;

        const layers = activations && activations.map((layer,i) => {
            const { name, activation } = summary[i];
            return <div key={i} className={styles.layer}>
                <div>
                    <b className={styles.name}>{name} </b>
                    <span className={styles.description}>{activation}</span>
                </div>
                <LayerViz activations={layer}/>
            </div>
        })

        return <div className={styles.FeatureMap}>
            { layers }
        </div>

    }

}

export default FeatureMap;