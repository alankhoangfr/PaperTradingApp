import React, {Component} from "react"
import axios from "axios"
import Stock from "./WatchList/Stock"
import SearchStock from "./SingleQuote/SearchStock"
import Quote from "./SingleQuote/Quote"
import Time from "./Time"
import AddToFav from "./WatchList/AddToFav"



class Research extends Component {
	constructor (){
		super()
		this.state={
			existQuote:"",
			quote:"",
			quoteData:"",
			duplicateQuote:"",
			quoteComment:"",
			chartData:"",
			exist:"",
			fav:[],
			quoteDataFav:[],
			duplicateInFav:false,
			chartFavData:[],
			comment:"",
			
			
		}
	}


	componentDidMount (){
		
		this.timerData = setInterval(()=>{
			this.setState({quoteDataFav:[]})
			this.refreshFav(this.state.fav)
			console.log("refreshQuoteDataFav",this.state)}
			,5000)
	}

	componentWillUnmount(){
		clearInterval(this.timerData)
	}


	refreshFav(favArray){favArray.forEach((stock)=>{
		this.refreshSingleQuoteFav(stock.toUpperCase())})}


	refreshSingleQuoteFav(symbol){axios.get('https://api.iextrading.com/1.0/stock/market/batch?symbols='+symbol+'&types=quote,chart&range=1d')
		.then((response)=>{
		const obj= response.data
		console.log("fetchingDtaRefresh",symbol,obj)
		this.setState({
			quoteDataFav: this.state.quoteDataFav.concat(obj[symbol]["quote"])
		})})
		.catch((err)=>{
		console.log(err)
		})}

	shouldComponentUpdate(nextProps, nextState) {
		function matchFav(array1,array2){
			var result = []
			array1.forEach((element)=>{
				result.push(array2.indexOf(element))
			})
			return result.every((element)=>{return element>=0})
		}	
		
		const titleQuoteDataFav = nextState.quoteDataFav.map((element)=>{
			return element["symbol"]
		})


		if(matchFav(titleQuoteDataFav,nextState.fav)===true &&titleQuoteDataFav.length===nextState.fav.length){
			return true
		}else{
			console.log(this.state)
			return false
		} 
	}

	
	//Quote

	handleSubmitSearch = (quote)=>{
		console.log("start")
		let temp=""
		this.state.fav.indexOf(quote)>=0?temp=true:temp=false
		axios.get('https://api.iextrading.com/1.0/stock/market/batch?symbols='+quote+'&types=quote,chart&range=1d')
		.then((response)=>{
		console.log("fetchingDtaSearch",quote)
		const obj= response.data	
		this.setState({
			quote:quote,
			quoteData: obj[quote]["quote"],
			existQuote:true,
			duplicateQuote:temp,
			chartData:obj[quote]["chart"],
			
		})
		console.log(this.state.quoteData)
		})
		.catch((err)=>{
		this.setState({
			quote:"",
			quoteData:"",
			existQuote:false,
			quoteComment:quote + " doesn't exist",

		})
		console.log(this.state,err	)
		})


		console.log("submit",this.state)
	}

	addToFav = (quote)=>{
		console.log("start Fav",quote)	
		this.setState({	
		fav:[quote[0]["symbol"],...this.state.fav],	
		quoteDataFav:[quote[0],...this.state.quoteDataFav],
		duplicateQuote:true,
		comment: quote[0]["symbol"] + " has been added to the WatchList",
		chartFavData:[{"symbol":quote[0]["symbol"],"data":quote[1]},...this.state.chartFavData],
		})
		console.log("submit",this.state)	
		}


//Watchlist


	addToFavWatchList = (quote)=>{
		if(this.state.fav.indexOf(quote)>=0){	
			this.setState({
				comment:quote + " is already exist in the Watchlist",
				duplicateInFav: true,
			})
		}
		else{
			console.log("notduplicate")
			axios.get('https://api.iextrading.com/1.0/stock/market/batch?symbols='+quote+'&types=quote,chart&range=1d')
			.then((response)=>{
				let tempFav = [quote,...this.state.fav]
				let temp = ""
				const obj= response.data
				console.log("obj",Object.keys(obj)==="")
				tempFav.indexOf(quote)>=0?temp=true:temp=false
				this.setState({
					exist:true,
					comment:quote + " has been added",
					duplicateInFav:false,
					fav:[quote,...this.state.fav],	
					quoteDataFav:[obj[quote]["quote"],...this.state.quoteDataFav],
					duplicateQuote:temp,
					chartFavData:[{"symbol":quote,"data":obj[quote]["chart"]},...this.state.chartFavData],

				})		
				})
			.catch((err)=>{
				console.log(err)
				this.setState({
						exist:false,
						duplicateInFav:false,
						comment:quote + " doesn't exist"
				})					
				})
		}
	}


	removeFromFav=(quote)=>{
		console.log("remove")
		const newFav = this.state.fav.filter((stockQuote)=>{
			return stockQuote!==quote
		})
		const newQuoteDataFav = this.state.quoteDataFav.filter((stockQuote)=>{
			return stockQuote["symbol"]!==quote
		})
		let temp=""
		newFav.indexOf(this.state.quote)>=0?temp=true:temp=false
		this.setState({
			fav:newFav,
			quoteDataFav:newQuoteDataFav,
			duplicateInFav:false,
			duplicateQuote:temp,
			comment: quote + " has been removed"
		})
	}


	render(){
		console.log(this.state.chartFavData)

		const header = 	(
						<tbody>
	          				<tr>
	          					<th>Symbol</th>
	          					<th>Price</th>
	          					<th>Graph (1min)</th>
	          					<th>Change</th>
		           				<th className="tdEliminate"> Percentage Change</th>
		           				<th className="tdEliminate"> Open</th>
		           				<th className="tdEliminate"> Close</th>
		           				<th className="tdEliminate"> High</th>
		           				<th className="tdEliminate"> Low</th>
		           				<th className="appear"> Remove from Watchlist</th>

	          				</tr>
					    </tbody>)

		return(
			<React.Fragment>
				<h1 id="researchH1">Research</h1>
				<Time/>
				<div className="tableSearchAdd">
					<div className = "searchAdd">
						<SearchStock SearchStock={this.handleSubmitSearch} onClick={this.handleSubmitSearch}/>
						<div className="addQuote" style={{display:this.state.existQuote===true?"block":"none"}} >
							<Quote
							quote={this.state.quote}
							quoteData={this.state.quoteData} 
							addToFav={this.addToFav}
							duplicateQuote={this.state.duplicateQuote}
							existQuote={this.state.existQuote}
							quoteComment={this.state.quoteComment}
							chartData={this.state.chartData}
							/>			
						</div>

						<div className="quoteComment"style={{display:this.state.existQuote===false?"block":"none"}}>
							<strong>{this.state.quoteComment}</strong>
						</div>
					</div>
					<div className="tableDiv">
						<h1>WatchList</h1>
						<table className="table">
							{header}
								<Stock
								fav={this.state.fav}
								quoteDataFav={this.state.quoteDataFav}
								removeFromFav={this.removeFromFav}
								status={"ok"}
								check={this.state.exist}
								chartFavData={this.state.chartFavData}
								/>
							<tbody>
								<tr>
									<AddToFav addToFav = {this.addToFavWatchList}/>	
								</tr>
							</tbody>
						</table>					
						<div >
							{<p>{this.state.comment}</p>}
						</div>
					</div>
				</div>
			</React.Fragment>
			);
		}
	}

export default Research