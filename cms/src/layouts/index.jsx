import React , { Component } from 'react'
import { Layout } from 'antd'

import Sider from './../components/Sider'
import Bread from './../components/Bread'
import Header from './../components/Header'
import Footer from './../components/Footer'
import PropTypes from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom'
import './index.scss'


// router components
import UserAdmin from './../containers/main/userAdmin'
import WorkAdmin from './../containers/main/workAdmin'
import AchieveAdmin from './../containers/main/achieveAmin'
import AttendAdmin from './../containers/main/attendAdmin'
import NotifyAdmin from './../containers/main/notifyAdmin'
import StatAdmin from './../containers/main/statAdmin'

const { Content } = Layout
class BasicLayout extends Component {
	
	static propTypes = {
		location: PropTypes.any
	}

	constructor(props) {
		super(props)
		this.state = {		
		}
	}

	render() {
		return (
			<Layout className="page">
			  <Sider />
		      <Layout>
		      	<Header></Header>
		      	<Bread  location={this.props.location} ></Bread>
		      	<Content className="content">
		      		<Switch>
		      			<Redirect exact from="/" to="/useradmin" />
		      			<Route exact path="/useradmin"  component={UserAdmin} />
		      			<Route exact path="/workadmin"  component={WorkAdmin} />
		      			<Route exact path="/achieveAmin"  component={AchieveAdmin} />
						<Route exact path="/attendAdmin"  component={AttendAdmin} />
						<Route exact path="/notifyAdmin"  component={NotifyAdmin} />
						<Route exact path="/statAdmin"  component={StatAdmin} />
		      		</Switch>
		      	</Content>
		      	<Footer></Footer>
		      </Layout>
		    </Layout>
		)
	}
}

export default BasicLayout