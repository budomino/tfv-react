import './App.css';
import React, {useState, useEffect} from 'react';
import Card from 'material-ui/Card';

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
			<div className="Item" style={color ? {backgroundColor: color}  : {} }>
				<h5>FROM: {specificItem.from}</h5>
				<h6>{specificItem.description}</h6>
				<h5>STATUS: {specificItem.itemstatus}</h5>
				<h5>PRIORITY: {specificItem.priority}</h5>
			</div>
		)
	}

	function ColumnDisplay({itemsColumn}) {
		const currentColumn = Array.from(itemsColumn);
		return (
			<div className="SubColumn">
			{currentColumn.map( item => (
				<Item specificItem={item}/>
			))}
			</div>
		);
	};


	return (
	<div className="App">
		Task Feed Visualizer - 10 August 2021 
		<div>
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
		</div>
	</div> 
  );
}

export default App;
