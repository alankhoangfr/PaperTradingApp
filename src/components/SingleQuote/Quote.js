import React from "react"
import Graph from "./Graph"


const Quote = (props)=> {

		const info = props.quoteData
		console.log("rendering single", info)
		return (
			<React.Fragment>
				<div>
					<h2>{info["companyName"]}</h2>
				</div>
				<div className="quoteElements">
					<div className="element"><b>Symbol</b> : {info["symbol"]}</div>
					<div className="element"><b>Price </b>: {info["latestPrice"]}</div>
					<div className="element">
						<b>Change </b>: <b style={{color:info["change"]>0?"green":"red"}}>  {info["change"]}</b></div>
					<div className="element">
						<b>Percentage Change</b> : <b style={{color:info["change"]>0?"green":"red"}}>{(info["changePercent"]*100).toFixed(2)} % </b></div>
					<div className="element"><b>Open </b>: {info["open"]}</div>
					<div className="element"><b>Close</b> : {info["close"]}</div>
					<div className="element"><b>High </b>: {info["high"]}</div>
					<div className="element"><b>Low </b>: {info["low"]}</div>
				</div>
				<div id="divBtnAddFav" style={{display:props.duplicateQuote===true?"none":"block"}}>
					<button 
						className="btnAddFav"
						
						onClick = {props.addToFav.bind(this,[info,props.chartData])}>
						Add to Favourites
					</button>
				</div>
				<div style={{display:props.chartData===""?"none":"block"}}>
					<Graph 
					chartData={props.chartData}
					quote={props.quote}
					/>
				</div>
			</React.Fragment>

		);
			
		
	}




export default Quote