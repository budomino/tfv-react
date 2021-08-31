const statusList = ["CANCELED","NOTSTARTED","ONHOLD","ONGOING","DONE","MOVED"];
const prioList = ["ASAP","URGENT","HIGH","NORMAL/HIGH","NORMAL/MEDIUM","NORMAL/LOW","LOW"];

export function cfu_filterStatus(statusIndex, itemfile, allowInvalidItems = false, allowCanceledItems = false)
{
	let processedArray = [];
	// sort using if statements
	for (let i = 0 ; i < itemfile.length ; i++)
	{
		if (cfu_testIfStatusIsValid(itemfile[i]))
		{
			if (itemfile[i].itemstatus === statusIndex)
			{
				processedArray.push(itemfile[i]);
				//console.log(itemfile[i].description +" added to " + statusName);
			}
			if (allowCanceledItems && (itemfile[i].itemstatus === 0)){
				processedArray.push(itemfile[i]);
			}
		} else if (allowInvalidItems){
			processedArray.push(itemfile[i]);
		} 
	}
	processedArray.sort((a, b) => parseInt(a.priority) - parseInt(b.priority));
	console.log("Returning " + processedArray.length + " items in " + cfu_statusFromIndex(statusIndex));
	return processedArray;
}


// functions to test validity of statuses and priorities


export function cfu_testIfStatusIsValid(itemToProcess){
	const item = itemToProcess.itemstatus;
	//console.log("Item status for "+ itemToProcess.description + " is: " + item);
	if (Number.isInteger(item)) 
	{
		if ((item > 7)||(item < 0)){
			console.log(itemToProcess.description + "is greater than 7 or less than 0");
			return false;
		}
		else 
		{
			return true;
		}
	}
	else {
		console.log("Status for item " + itemToProcess.description + " is not an integer");
		return false;
	}
}


export function cfu_testIfPriorityIsValid(itemToProcess){
	const prio = itemToProcess.priority
	if (Number.isInteger(prio))
	{
		if ((prio > 6)||(prio < 0)) 
		{
			return false;
		}
		else 
			return true;
	}
	else {
		console.log("Priority for item " + itemToProcess.description + " is not an integer");
		return false;
	}
}

// convert priority index to word form

export function cfu_priorityFromIndex(priorityIndex)
{
	for (let i = 0; i < prioList.length; i++) { 
		if (i === priorityIndex){
			return prioList[i].toString();
		}
	}
	// if none of them fit the index, return an error
	return "INVALID PRIORITY";
}

export function cfu_statusFromIndex(statusIndex){

	for (let i = 0; i < statusList.length; i++) { 
		if (i === statusIndex){
			return statusList[i].toString();
		}
	}
	// if none of them fit the index, return an error
	return "INVALID STATUS";
}