import React       from 'react'
import ReactDom    from 'react-dom'
import QumodoDraw  from './containers/QumodoDraw'
import './css/base_styles.scss'

const container = document.createElement('div');
document.body.appendChild(container);

ReactDom.render(<QumodoDraw />, container);

