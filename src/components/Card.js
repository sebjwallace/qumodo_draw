
import React, {Component}  from 'react'
import styles from './Card.scss'

class Card extends Component {

    render(){

        return <div className={styles.Card}>
            {this.props.children}
        </div>

    }

}

export default Card;