import React       from 'react'
import styles      from './ToolBar.scss'
import Tools       from './Tools'
import ColorPicker from './ColorPicker'
import PropTypes   from 'prop-types'
import {AppColors} from '../data/AppColors'
import '../css/controls.scss'


const ToolBar = ({selectedTool, handleToolSelection, handleColorChange}) => (
    <div className={styles.ToolBar}>

        <Tools selected={selectedTool}
              handleSelectionChange={handleToolSelection} />

        <ColorPicker colors={Object.keys(AppColors).map(k => AppColors[k])}
                     handleColorChange={handleColorChange}/>
    </div>
);

ToolBar.propTypes = {
    selectedTool: PropTypes.number.isRequired,
    handleToolSelection: PropTypes.func.isRequired,
    handleColorChange: PropTypes.func.isRequired
};

export default ToolBar;