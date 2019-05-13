import React, {Component} from "react"

class Time extends Component {
	constructor (){
		super()
		this.state={
			time: String(this.newDate(new Date())),

		}
	}
	newDate = (d)=>{
			return d.toDateString() + " " + (d.getUTCHours()-5) + ":" + d.getUTCMinutes() + ":" + d.getUTCSeconds();
		}
	componentDidMount (){
		
		this.timer = setInterval(()=>{
			this.setState({time : String(this.newDate(new Date()))})},
			1000
			)
	}

	componentWillUnmount(){
		clearInterval(this.timer) 
	}

	render(){
		return(
			<div>		
				<p>New York City:  <b>   {this.state.time}</b></p>
			</div>
			)
	}
}
	
export default Time