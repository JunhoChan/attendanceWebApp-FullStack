import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Router from './router/index.js'

import store from './redux/store'

// commom styles
import './styles/index.scss'
import './styles/index.css'

ReactDOM.render(
	 <Provider store={store}>	
		<Router />
	 </Provider>
	, document.getElementById('root'))