import React, { Component } from 'react'
import { Layout } from 'antd'

import './index.scss'

const { Footer } = Layout
export default class FooterBox extends Component {
	
	render() {
		return (
			<Footer className="footer">
                © 2019 <a href="http://github.com" target="_blank" rel="noopener noreferrer">github.com</a>, Junho Inc.
            </Footer>
		)
	}
}