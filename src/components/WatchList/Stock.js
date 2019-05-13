import React,{Component} from "react"
import Table from "./Table"


class Stock extends Component{


	render(){
		
		
		console.log("rendering fav",this.state )

		
		return( 
			this.props.fav.map((stock)=>
				<Table 
					eachStock = { this.props.quoteDataFav.filter((stockQuote)=> {
									return stockQuote["symbol"]===stock
									})}
					eachChart= {this.props.chartFavData.filter((stockQuote)=>{
									return stockQuote["symbol"]===stock
					})}
					stockName={stock}
					key = {stock}
					removeFromFav={this.props.removeFromFav}
					/>
			)
	
			)
		
	}

			
	}


export default Stock

