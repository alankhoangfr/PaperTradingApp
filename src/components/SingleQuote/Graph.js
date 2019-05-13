import React, {Component} from "react"
import {Line } from 'react-chartjs-2';
import axios from "axios"


class Graph extends Component {
	constructor(){
		super()
		this.state={
			currentTimeFrame:"1d",
			chartTimeFrameData:"",
			status:0,
			header:{
				"1d":"1 Day: 1 Minute",
				"1m":"1 Month: Daily",
				"3m":"3 Month: Daily",
				"6m":"6 Month: Daily",
				"1y":"1 Year: Daily",
				"2y":"2 Year: Daily",
				"5y":"5 Year: Daily"}

		}
	}
	data=(data,currentTimeFrame)=>{
			const result=[]
			console.log("this.data",this.state.currentTimeFrame)
			data.map((element)=>{ 
				let price 
				if(currentTimeFrame==="1d"){
					element["marketClose"]===0?price=element["marketOpen"]:price=element["marketClose"]
				}else{
					price=element["close"]
				}
				return result.push(price)})
			return result}
	labels=(data)=>{
			const result=[]
			data.map((element)=>{result.push(element["label"])})
			return result}


	onChange=(event)=>{
		event.persist()
		const timeFrame = event.target.value
		console.log("click",event.target.value,'https://api.iextrading.com/1.0/stock/'+this.props.quote+'/chart/'+event.target.value+'')
		axios.get('https://api.iextrading.com/1.0/stock/'+this.props.quote+'/chart/'+event.target.value+'')
		.then((response)=>{
			let obj = response.data
			const chartData = {
				labels:[...this.labels([...obj])],
				datasets:[
					{label:"Price",
					data:[...this.data([...obj],timeFrame)]
					}]
				}
				console.log(timeFrame,chartData)
			this.setState({
				currentTimeFrame:timeFrame,
				status:1,
				chartTimeFrameData:chartData
			})
		})
		.catch((err)=>{
			console.log(err)
		})
	}


	render(){
		const header = this.state.header[this.state.currentTimeFrame]
		const chartDataParent = [...this.props.chartData]
		const chartDataProps = {
			labels:this.labels(chartDataParent),
			datasets:[
			{label:"Price",
			data:this.data(chartDataParent,"1d")
			}]
		}
		let chartData = ""
		this.state.status===0?chartData=chartDataProps:chartData=this.state.chartTimeFrameData
		console.log(this.state.currentTimeFrame,"chartData",chartData)
	
		return(

			<React.Fragment>
				<div>
					<h2>TimeFrame : {header}</h2>
					<form> 
  						<select id="dropdown" onChange={this.onChange}>
    						<option value="1d">1min Chart</option>
						    <option value="1m">1 Month</option>
						    <option value="3m">3 Months</option>
						    <option value="6m">6 Months</option>
						    <option value="1y">1 Year</option>
						    <option value="2y">2 Year</option>
						    <option value="5y">5 Year</option>
  						</select>
  					
				</form>
				</div>
				<Line 
					data={chartData}
					options={{
						cubicInterpolationMode:"default",
						spanGaps:true,
						legend:{
							display:false,}
					}}/>
			</React.Fragment>
			);
	}
}

export default Graph