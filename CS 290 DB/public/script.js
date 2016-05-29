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
			updateTable(res);
		}
		
		else{
			console.log("Error in network request: " + req.statusText);
		}
		
	});
	
	req.send(JSON.stringify(payload));
		
	
	};
	
function updateTable(info){
	
		var newRow = document.createElement("TR");
	
		for(r in info[0]){
			var newCell = document.createElement("TD");
			newCell.innerHTML = info[0][r];
			newRow.appendChild(newCell);
		}
		document.getElementById("myTable").appendChild(newRow);
	}
	
}
	
function createTable(info){
	
	var myTable = document.createElement("TABLE");
	document.getElementById("tablehere").appendChild(myTable);
	
	for(p in info){
	var newRow = document.createElement("TR");
	
		for(r in info[p]){
			var newCell = document.createElement("TD");
			newCell.innerHTML = info[p][r];
			newRow.appendChild(newCell);
		}
		myTable.appendChild(newRow);
	}
		
	}