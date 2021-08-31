import './App.css';
import React, {useState, useEffect} from 'react';
import {CardContent, Card, Typography, CardActions, Button, Toolbar, Paper } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";

import BreakpointMasonry from './MasonryWrapper'

import {
	cfu_filterStatus,
	cfu_priorityFromIndex,
	cfu_statusFromIndex,
	cfu_testIfPriorityIsValid,
	cfu_testIfStatusIsValid,
} from './Sorter'

function App() {
	const feedFile = require('./Task Feed - 10 August 2021.json');

	const [notStartedColumn,cfu_setNotStarted] = useState([]);
	const [onHoldColumn, cfu_setOnHold] = useState([]);
	const [onGoingColumn, cfu_setOnGoing] = useState([]);
	const [doneColumn, cfu_setDone] = useState([]);
	const [movedColumn, cfu_setMoved] = useState([]);

	useEffect(() => cfu_getItems(feedFile), []);	

	const cfu_getItems = (itemfile) => {
		cfu_setNotStarted(cfu_filterStatus(1,itemfile,true,true));
		cfu_setOnHold(cfu_filterStatus(2,itemfile));
		cfu_setOnGoing(cfu_filterStatus(3,itemfile));
		cfu_setDone(cfu_filterStatus(4,itemfile));
		cfu_setMoved(cfu_filterStatus(5,itemfile));
	}



	const Item = ({specificItem}) => {
		let color;

		// ONHOLD and MOVED
		if (specificItem.itemstatus === 2){
			color = "yellow";
		}
		else if (specificItem.itemstatus === 5){
			color = "#00B0F0";
		}

		// DONE, high priorities, and CANCELED
		if (specificItem.itemstatus === 4){
			color = "#D9D9D9";
		} 
		else if (specificItem.itemstatus === 0)
		{
			color = "#595959";
		}
		else if (specificItem.priority < 3)
		{
			color = "red";
		}
		

		// invalid items
		if ((cfu_testIfPriorityIsValid(specificItem)===false)||(cfu_testIfStatusIsValid(specificItem)===false))
		{
			color = "green";
		}

		return (
		<Grid item xs="auto">
			<Card square className="Item" style={{backgroundColor: color ? color : "white"}}>
				<CardContent>
					<Typography color="textSecondary" variant="caption" gutterBottom style={{fontSize: "7px"}}>
						FROM: {specificItem.from}
					</Typography>
					<Typography variant="body2" style={{fontSize: "13px"}} gutterBottom>
						{specificItem.description}
					</Typography>
					<Typography  color="textSecondary" style={{fontSize: "10px",lineHeight:"100%"}}>
						STATUS: {cfu_statusFromIndex(specificItem.itemstatus)}	<br />
						PRIORITY: {cfu_priorityFromIndex(specificItem.priority)}
					</Typography>
				</CardContent>
			</Card >
		</Grid>
		)
	}

	function ColumnDisplay({itemsColumn}) {
		const currentColumn = Array.from(itemsColumn);
		return (
			<BreakpointMasonry>
			{/*<Grid container spacing="1" alignItems="flex-start">*/}
			{currentColumn.map( item => (
				<Item specificItem={item}/>
			))}
			</BreakpointMasonry>
		);
	};


	return (
	<Paper className="App">
		<Toolbar>Task Feed Visualizer - 10 August 2021</Toolbar>
		<Grid container direction="row" >
			<Grid item  className="CategoryPaper"> 
				<Paper>
					<Paper square className="CategoryBox" elevation="0">NOTSTARTED</Paper>
					<ColumnDisplay itemsColumn={notStartedColumn}/>
				</Paper>
			</Grid>
			<Grid item className="CategoryPaper">
				<Paper>
					<Paper square className="CategoryBox" style={{backgroundColor: "yellow"}} elevation="0">ONHOLD</Paper>
					<ColumnDisplay itemsColumn={onHoldColumn}/>
				</Paper>
			</Grid>
			<Grid item className="CategoryPaper">
				<Paper>
					<Paper square className="CategoryBox" elevation="0">ONGOING</Paper>
					<ColumnDisplay itemsColumn={onGoingColumn}/>
				</Paper>
			</Grid>
			<Grid item className="CategoryPaper">
				<Paper>
					<Paper square elevation="0" className="CategoryBox" style={{backgroundColor: "gray"}}>DONE</Paper>
					<ColumnDisplay itemsColumn={doneColumn}/>
				</Paper>
			</Grid>
			<Grid item className="CategoryPaper">
				<Paper>
					<Paper square className="CategoryBox" style={{backgroundColor: "skyblue"}}>MOVED</Paper>
					<ColumnDisplay itemsColumn={movedColumn}/>
				</Paper>
			</Grid>
		</Grid>
		{/* <div>
			<div className="FirstRow">

				<div className="Column">
					<h1 className="CategoryBox">NOTSTARTED</h1>
					<ColumnDisplay itemsColumn={notStartedColumn}/>
				</div>

				<div className="Column">
					<h1 className="CategoryBox" style={{backgroundColor: 'yellow'}}>ONHOLD</h1>
					<ColumnDisplay itemsColumn={onHoldColumn}/>	
				</div>

				<div className="Column">
					<h1 className="CategoryBox">ONGOING</h1>
					<ColumnDisplay itemsColumn={onGoingColumn}/>
				</div>

				<div className="Column">
					<h1 className="CategoryBox" style={{backgroundColor: '#D9D9D9',textColor: 'white'}}>DONE</h1>
					<ColumnDisplay itemsColumn={doneColumn}/>
				</div>

				<div className="Column">
					<h1 className="CategoryBox" style={{backgroundColor: '#00B0F0'}}>MOVED</h1>
					<ColumnDisplay itemsColumn={movedColumn}/>
				</div>

			</div>
		</div> */}
	</Paper> 
  );
}

export default App;
