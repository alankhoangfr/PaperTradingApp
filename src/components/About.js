import React, {Component} from "react"
import Query from "../Data/Query"


class About extends Component {
	constructor(){
		super()
		this.state={
			input:""
		}
	}
	render(){
		console.log(this.state)
		return(
			<div>
				<h1>About</h1>

			</div>
			);
	}
}

export default About