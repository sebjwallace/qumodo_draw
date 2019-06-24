import React, {Component}  from 'react'
import styles from './NNArchitecture.scss'
import NNLayer from './NNLayer'

class NNArchitecture extends Component {

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
                <NNLayer activations={layer}/>
            </div>
        })

        return <div>
            { layers }
        </div>

    }

}

export default NNArchitecture;