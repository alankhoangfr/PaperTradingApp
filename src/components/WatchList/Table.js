import React, {Component} from "react"
import {Line } from 'react-chartjs-2';

class Table extends Component{

	render(){
		console.log("table",this.props.eachChart)
		const stockData = [...this.props.eachChart[0]["data"]]
		const labels = stockData.map((element)=>{return element["minute"]})
		const data = stockData.map((element)=>{ 
			let price 
			element["marketClose"]===0?price=element["marketOpen"]:price=element["marketClose"]
			return price})
		const chartData = {
			labels:labels,
			datasets:[
			{label:"Price",
			data:data,
			radius: 0

			}]
		}
		const info = this.props.eachStock[0]
		if(info!==undefined){
			return (
				<tbody>
					<tr>
						<td>{this.props.stockName}</td>
						<td >{info["latestPrice"]}</td>
						<td className="tableGraph"><Line 
							data={chartData}
							options={{
								elements: { point: { radius: 0 } },
								cubicInterpolationMode:"default",
								spanGaps:true,
								fill:false,
								 scales: {
							          xAxes: [{
							            display: false
							          }],
							          yAxes: [{
							            display: false
							          }],
							        },
								legend:{
									display:false,}
							}}/>
						</td>
						<td style={{color:info["change"]>0?"green":"red"}}>{info["change"]}</td>
						<td className="tdEliminate" style={{color:info["change"]>0?"green":"red"}}>{(info["changePercent"]*100).toFixed(2)} %</td>
						<td className="tdEliminate">{info["open"]}</td>
						<td className="tdEliminate">{info["close"]}</td>
						<td className="tdEliminate">{info["high"]}</td>
						<td className="tdEliminate">{info["low"]}</td>
						<td id="tdBtn"><button className="btnRemove" onClick = {this.props.removeFromFav.bind(this,info["symbol"])}>X</button></td>
					</tr>
				</tbody>
				)}
		else{
			return (
				<tbody>
					<tr>
						<td>{this.props.stockName}</td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td id="tdBtn"><button className="btnRemove" onClick = {this.props.removeFromFav.bind(this,this.props.stockName)}>X</button></td>
					</tr>
				</tbody>)
		}
		
		}

		
	}

export default Table



