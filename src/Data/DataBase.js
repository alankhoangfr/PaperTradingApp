import React, {Component} from "react"
import ListOfStocks from "./ListOfStocks"

class DataBase extends Component{
	constructor(props){
		super(props)
	}

	highlight(name){
		let input = this.props.input.toUpperCase()
		let regex = RegExp(	"("+input+")","i")
		let splitWord = name.split(regex)
		if (input===name.toUpperCase()){splitWord=true}	
		let html = []
		if(splitWord===true){
			html.push(<span key="sameWord" className="highlightedItemClass">{input}</span>)
			return html
			}
		if(splitWord.indexOf("")==-1&&input!==""){
			html.push(<span key="middleOfWord0">{splitWord[0]}</span>)
			html.push(<span key="middleOfWord1" className="highlightedItemClass">{splitWord[1]}</span>)
			html.push(<span key="middleOfWord2">{splitWord[2]}</span>)
			return html
		}else{
			if(this.props.input!==""){
				splitWord.forEach((word,index)=>{
				word.toUpperCase()===input?html.push(<span key={index} className="highlightedItemClass">{this.props.input.toUpperCase()}</span>):html.push(<span key={index} >{word}</span>)
				})
				return html}
			else{
				html.push(name)
				return html}
		}

		}

	render(){
		
		let regex = RegExp(	"("+this.props.input.toUpperCase()+")","i")
		let FilteredData = ListOfStocks.filter((stock)=>{	
			return (regex.test(stock["symbol"])==true||regex.test(stock["name"])==true)
		})
		return(
		FilteredData.map((stock,index)=>
			<tr key={index}>
				<td onClick={this.props.onClick.bind(this,stock["symbol"])}>{this.highlight(stock["symbol"])}</td>
				<td onClick={this.props.onClick.bind(this,stock["symbol"])}>{this.highlight(stock["name"])}</td>
			</tr>

			)
		);
	}
}

export default DataBase