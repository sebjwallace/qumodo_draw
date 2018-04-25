import React                   from 'react'
import styles                  from './Tools.scss'
import icons                   from '../icons/icons.scss'
import PropTypes               from 'prop-types'
import controls                from '../css/controls.scss'
import {DrawMode as DrawTools} from '../controllers/CanvasController'
import '../css/controls.scss'

function clickHandler(selection, handler, event) {
    event.preventDefault();
    handler(selection);
}

const Tools = ({selected, handleSelectionChange}) => (
    <ul className={styles.Tools}>
        <li>
            <button className={[
                        icons.drawButton,
                        selected === DrawTools.draw ? controls.selected : ''
                    ].join(' ')}
                    title='Draw'
                    onClick={clickHandler.bind(this, DrawTools.draw, handleSelectionChange)}>
                Draw
            </button>
        </li>
        <li>
            <button className={[
                        icons.rectangleButton,
                        selected === DrawTools.rectangle ? controls.selected : ''
                    ].join(' ')}
                    title='Rectangle'
                    onClick={clickHandler.bind(this, DrawTools.rectangle, handleSelectionChange)}>
                Rectangle
            </button>
        </li>
        <li>
            <button className={[
                        icons.ellipseButton,
                        selected === DrawTools.ellipse ? controls.selected : ''
                    ].join(' ')}
                    title='Ellipse'
                    onClick={clickHandler.bind(this, DrawTools.ellipse, handleSelectionChange)}>
                Ellipse
            </button>
        </li>
    </ul>
);

Tools.propTypes = {
    selected: PropTypes.number.isRequired,
    handleSelectionChange: PropTypes.func.isRequired
};

export default Tools;