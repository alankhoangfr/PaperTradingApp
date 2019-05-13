import React, {Component} from "react"
import Query from "../../Data/Query"

class SearchStock extends Component {
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

	handleSubmitSearch = (event)=>{
		event.preventDefault()
		this.props.SearchStock(this.state.input.toUpperCase())
		this.setState({input:""})

	}
	onClick = (data)=>{
		this.setState({
			input:""
		})
		this.props.onClick(data)
	}


	render(){
		return(
			<div className="searchQuoteSingle">
				<h1>Search</h1>
				<form onSubmit={this.handleSubmitSearch}>
					<input 
						className="inputText"
						type="text" 
						value={this.state.input} 
						placeholder="type in the symbols"
						onChange={this.handleChange}
					></input>
					<input
						type="submit"
						value="Search">
					</input>
				</form>
				<Query input={this.state.input} onClick={this.onClick}/>
			</div>
			);
	}
}

export default SearchStock