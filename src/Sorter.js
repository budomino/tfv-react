
export function cfu_filterStatus(statusName, itemfile)
{
	let processedArray = [];
	// sort using if statements
	for (let i = 0 ; i < itemfile.length ; i++)
	{
		if (itemfile[i].itemstatus === statusName)
		{
			processedArray.push(itemfile[i]);
			console.log(itemfile[i].description +" added to " + statusName);
		}
	}
	console.log("Returning " + processedArray.length + " items in " + statusName);
	return processedArray;
}
