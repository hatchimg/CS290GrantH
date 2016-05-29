document.addEventListener("DOMContentLoaded", loadTable);



function loadTable(){

var req = new XMLHttpRequest();

req.open("get", "http://52.32.212.47:2500/all", true);

req.addEventListener('load', function(){
		if(req.status >= 200 && req.status < 400){
			var res = JSON.parse(req.responseText);
			createTable(res);
		}
		
		else{
			console.log("Error in network request: " + req.statusText);
		}
		
	});
	req.send(null);

}


function addRow(){

	if(document.getElementById("name").value == ""){
		alert("Name must be filled out.");
		return;
	}
	var name = document.getElementById("name").value;
	var reps = document.getElementById("reps").value;
	var weight = document.getElementById("weight").value;
	var date = document.getElementById("date").value;
	var type = document.getElementById("unit").value;
	
	var payload = {name: null, reps: null, weight: null, date: null, type: null};
	payload.name = name;
	payload.reps = reps;
	payload.weight = weight;
	payload.date = date;
	payload.type = type;
	
	var req = new XMLHttpRequest();
	req.open("POST", "http://52.32.212.47:2500/add-item?name=" + name + "&reps=" + reps + "&weight=" + weight + "&date=" + date + "&lbs=" + type, true);
	
	req.addEventListener('load', function(){
		if(req.status >= 200 && req.status < 400){
			var res = JSON.parse(req.responseText);
			createTable(res);
		}
		
		else{
			console.log("Error in network request: " + req.statusText);
		}
		
	});
	
	req.send(JSON.stringify(payload));
		
	
	};

function deleteRow(theRow){
	
	var req = new XMLHttpRequest();
	req.open("GET", "http://52.32.212.47:2500/delete-row?id=" + theRow, true);
	if(req.status >= 200 && req.status < 400)
	{
		var res = JSON.parse(req.responseText);
		createTable(res);
	}
	else{
		console.log("Error in network request: " + req.statusText);
	}
}
	
/*function updateTable(info){
		
		var p = (info.length-1)
		var newRow = document.createElement("TR");
	
		for(r in info[p]){
			var newCell = document.createElement("TD");
			newCell.innerHTML = info[p][r];
			newRow.appendChild(newCell);
		}
		
		var deleteButton = document.createElement("Input");
		var updateButton = document.createElement("Input");
		
		deleteButton.setAttribute("type", "button");
		deleteButton.setAttribute("id", info[p].id);
		deleteButton.setAttribute("onclick", deleteRow(info[p].id));
		deleteButton.value = "Delete exercise";
		updateButton.setAttribute("type", "button");
		updateButton.setAttribute("id", info[p].id);
		updateButton.value = "Update exercise";
		
		newRow.appendChild(deleteButton);
		newRow.appendChild(updateButton);
		
		document.getElementById("myTable").appendChild(newRow);
	}*/
	
	
function createTable(info){

	var myNode = document.getElementById("myTable");
	while(myNode.firstChild){
		myNode.removeChild(myNode.firstChild);
	}
	for(p in info){
	var newRow = document.createElement("TR");
	
		for(r in info[p]){
			var newCell = document.createElement("TD");
			newCell.innerHTML = info[p][r];
			newRow.appendChild(newCell);
		}
		var deleteButton = document.createElement("Input");
		var updateButton = document.createElement("Input");
		
		deleteButton.setAttribute("type", "button");
		deleteButton.setAttribute("id", info[p].id);
		deleteButton.setAttribute("onclick", deleteRow(info[p].id));
		deleteButton.value = "Delete exercise";
		updateButton.setAttribute("type", "button");
		updateButton.setAttribute("id", info[p].id);
		updateButton.value = "Update exercise";

		
		newRow.appendChild(deleteButton);
		newRow.appendChild(updateButton);

		document.getElementById("myTable").appendChild(newRow);
	}
		
	}