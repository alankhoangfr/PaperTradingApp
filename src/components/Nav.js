import React, {Component} from "react"

import {NavLink } from "react-router-dom"

class Nav extends Component {
	render(){
		return(
			<div className="navBar">
				<div className="navElement">
					<NavLink exact to = "/Home">
						Home
					</NavLink>
				</div>
				<div className="navElement">
					<NavLink exact to = "/about">
						About
					</NavLink>
				</div>
				<div className="navElement">
					<NavLink exact to = "/Research">
						Research
					</NavLink>
				</div>

			</div>
			);
	}
}

export default Nav