import './App.css';
import React, {useState, useEffect} from 'react';
import {CardContent, Card, Typography, CardActions, Button, Toolbar, Paper } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";

import {cfu_filterStatus} from './Sorter'

function App() {
	const feedFile = require('./Task Feed - 10 August 2021.json');

	const [notStartedColumn,cfu_setNotStarted] = useState([]);
	const [onHoldColumn, cfu_setOnHold] = useState([]);
	const [onGoingColumn, cfu_setOnGoing] = useState([]);
	const [doneColumn, cfu_setDone] = useState([]);
	const [movedColumn, cfu_setMoved] = useState([]);

	useEffect(() => cfu_getItems(feedFile), []);	

	const cfu_getItems = (itemfile) => {
		cfu_setNotStarted(cfu_filterStatus("NOTSTARTED",itemfile));
		cfu_setOnHold(cfu_filterStatus("ONHOLD",itemfile));
		cfu_setOnGoing(cfu_filterStatus("ONGOING",itemfile));
		cfu_setDone(cfu_filterStatus("DONE",itemfile));
		cfu_setMoved(cfu_filterStatus("MOVED",itemfile));
	}

	const Item = ({specificItem}) => {
		let color;
		if (specificItem.itemstatus === "DONE"){
			color = "#D9D9D9";
		}
		else if (specificItem.itemstatus === "ONHOLD"){
			color = "yellow";
		}
		else if (specificItem.itemstatus === "MOVED"){
			color = "#00B0F0";
		}
		return (
		<Grid item xs="auto" >
			<Card className="Item" style={{backgroundColor: color ? color : "white"}}>
				<CardContent>
					<Typography color="textSecondary" variant="caption" gutterBottom style={{fontSize: "7px"}}>
						FROM: {specificItem.from}
					</Typography>
					<Typography variant="body2" style={{fontSize: "13px"}} gutterBottom>
						{specificItem.description}
					</Typography>
					<Typography  color="textSecondary" style={{fontSize: "10px",lineHeight:"100%"}}>
						STATUS: {specificItem.itemstatus}	<br />
						PRIORITY: {specificItem.priority}
					</Typography>
				</CardContent>
			</Card >
		</Grid>
		)
	}

	function ColumnDisplay({itemsColumn}) {
		const currentColumn = Array.from(itemsColumn);
		return (
			<Grid container direction="row" className="" xs="12" spacing="2">
			{currentColumn.map( item => (
				<Item specificItem={item}/>
			))}
			</Grid>
		);
	};


	return (
	<Paper className="App">
		<Toolbar>Task Feed Visualizer - 10 August 2021</Toolbar>
		<Grid container direction="row" >
			<Grid item   > 
				<Card className="CategoryBox">NOTSTARTED</Card>
				<ColumnDisplay itemsColumn={notStartedColumn}/>
			</Grid>
			<Grid item  >
				<Grid item spacing="2"><Card className="CategoryBox" style={{backgroundColor: "yellow"}}>ONHOLD</Card></Grid>
				<ColumnDisplay itemsColumn={onHoldColumn}/>
			</Grid>
			<Grid >
				<Card className="CategoryBox">ONGOING</Card>
				<ColumnDisplay itemsColumn={onGoingColumn}/>
			</Grid>
			<Grid item  >
				<Card className="CategoryBox" style={{backgroundColor: "gray"}}>DONE</Card>
				<ColumnDisplay itemsColumn={doneColumn}/>
			</Grid>
			<Grid item  >
				<Paper className="CategoryBox" style={{backgroundColor: "skyblue"}}>MOVED</Paper>
				<ColumnDisplay itemsColumn={movedColumn}/>
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
