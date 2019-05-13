import React, {Component} from "react"
import DataBase from "./DataBase"

class Query extends Component{
	constructor(props){
		super(props)
	}
	render(){
		if(this.props.input!==""){
			return(
				<div className="query" >
					<table className="queryTable">
						<tbody>
							<tr>
								<th>Symbol</th>
								<th>Name</th>
							</tr>
							<DataBase input={this.props.input} onClick={this.props.onClick}/>
						</tbody>
					</table>
				</div>
				);
		}else return null
	
	}
}

export default Query