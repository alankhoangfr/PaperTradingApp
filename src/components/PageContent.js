import React, {Component} from "react"
import {Switch, Route} from "react-router-dom"
import Research from "./Research"
import About from "./About"
import Home from "./Home"

class PageContent extends Component {
	render(){
		return(
			<div className="trading">
				<Switch>
					<Route exact path="/research" component={Research}/>
					<Route exact path="/about" component={About}/>
					<Route exact path="/home" component={Home}/>
				</Switch>
			</div>
			);
	}
}

export default PageContent