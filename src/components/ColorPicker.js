import React, {Component} from 'react'
import styles             from './ColorPicker.scss'
import PropTypes          from 'prop-types'

class ColorPicker extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedColor: props.colors[0]
        };
    }

    componentDidMount() {
        this.props.handleColorChange(this.state.selectedColor);
    }

    handleColorSelection(color, event) {
        if (event) event.preventDefault();
        let {handleColorChange} = this.props;
        handleColorChange(color);
        this.setState({selectedColor: color});
    }

    render() {
        let {colors} = this.props;
        let {selectedColor} = this.state;
        return (
            <ul className={styles.ColorPicker}>
                { colors.map(color =>
                    <li key={color}>
                        <button className={color === selectedColor ? styles.selected : ''}
                                style={{backgroundColor: color}}
                                onClick={this.handleColorSelection.bind(this, color)}>{color}</button>
                    </li>
                ) }
            </ul>
        );
    }
}

ColorPicker.propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleColorChange: PropTypes.func.isRequired
};

export default ColorPicker;