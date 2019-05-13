import React, {Component} from "react"

class AddToFav extends Component{

	constructor(){
		super()
		this.state={
			input:"",
			quote:"",
		}
	}
	handleChange = (event)=>{
		this.setState({input:event.target.value})
	}

	addToFav = (event)=>{
		event.preventDefault()
		this.props.addToFav(this.state.input.toUpperCase())
		this.setState({input:""})

	}
	render(){
		return(
			<React.Fragment>
			<td colSpan="9" className="searchQuoteLarge">
				<form onSubmit={this.addToFav}>
					<input 
						className="inputWatchList"
						type="text" 
						value={this.state.input} 
						placeholder="type in the symbols"
						onChange={this.handleChange}
					></input>
				</form>
			</td>
			<td colSpan="5" className="searchQuoteSmall">
				<form onSubmit={this.addToFav}>
					<input 
						className="inputWatchList"
						type="text" 
						value={this.state.input} 
						placeholder="type in the symbols"
						onChange={this.handleChange}
					></input>
				</form>
			</td>
			</React.Fragment>
			);
	}

}





export default AddToFav