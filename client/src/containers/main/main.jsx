import React, {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

// import {NavBar} from 'antd-mobile'

import Index from './../Index/index'
import Message from './../message/message'
import Profile from './../profile/profile'
import MyWork from './../myWork/myWork'
import MyLocation from './../location/location'
import HeaderTop from './../../components/headerTop/headerTop'
import FooterGuide from './../../components/footerGuide/footerGuide'
import NotFound from './../../components/notFound/notFound'

class Main extends Component {
	navList = require('./route.js').default

    /** 跳转到某个路由之前触发 **/
    onEnter(Component, props) {
        const userInfo = sessionStorage.getItem("userInfo");
        if (userInfo) {
          return <Component {...props} />;
        }
        return <Redirect to="/login" />;
    }


    render () {
 
    	const navList = this.navList,
    		  path    = this.props.location.pathname,
    	currentNav = navList.find(nav => path === nav.path) // es6找到当前router
    	return (
    		 <div>
    		  {currentNav && currentNav.show ? <HeaderTop title={currentNav.title} /> : null}
    		  <Switch>
	    		  <Route path='/index'   render={props => this.onEnter(Index, props)}   />
	    		  <Route path='/message' render={props => this.onEnter(Message, props)} />
	    		  <Route path='/profile' render={props => this.onEnter(Profile, props)} />
				  <Route path='/myWork'  render={props => this.onEnter(MyWork, props)}  />
                  <Route path='/myLocation' render={props => this.onEnter(MyLocation, props)} />
	    		  <Route component={NotFound} />
    		  </Switch>
    		  {currentNav && currentNav.show ? <FooterGuide navList={navList} /> : null}
    		</div>
    	)

    }

}
	
export default Main