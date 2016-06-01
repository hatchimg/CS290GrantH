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

function bindDelete(theButtons, theUpdates){
	
	for (i = 0; i < theButtons.length; i++){
		
		theButtons[i].addEventListener("click", function(x){
			return function(){
			deleteRow(theButtons[x].id);
			};
		}(i));
		} 
	for (i = 0; i < theUpdates.length; i++){
		
		theUpdates[i].addEventListener("click", function(x){
			return function(){
			redirect(theButtons[x].id);
			};
		}(i));
		} 
	};



function addRow(){

	if(document.getElementById("name").value == ""){
		alert("Name must be filled out.");
		return;
	}
	var name = document.getElementById("name").value;
	var reps = document.getElementById("reps").value;
	var weight = document.getElementById("weight").value;
	var date = document.getElementById("date").value;
	var lbs = document.getElementById("unit").value;
	
	/*var payload = {name: null, reps: null, weight: null, date: null, lbs: null};
	payload.name = name;
	payload.reps = reps;
	payload.weight = weight;
	payload.date = date;
	payload.lbs = lbs;*/
	
	var req = new XMLHttpRequest();
	req.open("POST", "http://52.32.212.47:2500/add-item?name=" + name + "&reps=" + reps + "&weight=" + weight + "&date=" + date + "&lbs=" + lbs, true);
	
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
	
		
	
	};
	
function updateRow(){
	//take values from form to assemble query string in post call to edit-row
}

function redirect(theRow){
	
	var req = new XMLHttpRequest();
	req.open("GET", "http://52.32.212.47:2500/redirect?id=" + theRow, true);
	
	/*req.addEventListener('load', function(){
	if(req.status >= 200 && req.status < 400)
	{
		console.log(req.status);
	}
	else{
		console.log("Error in network request: " + req.statusText);
	}
	
	});*/
	req.send(null);


}

function deleteRow(theRow){
	
	var req = new XMLHttpRequest();
	req.open("GET", "http://52.32.212.47:2500/delete-row?id=" + theRow, true);
	
	req.addEventListener('load', function(){
	if(req.status >= 200 && req.status < 400)
	{
		var res = JSON.parse(req.responseText);
		createTable(res);
	}
	else{
		console.log("Error in network request: " + req.statusText);
	}
	
	});
	req.send(null);
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
	while(myNode.childNodes.length > 2){
		myNode.removeChild(myNode.lastChild);
	}
	for(p in info){
	var newRow = document.createElement("TR");
	newRow.setAttribute("name", "datarow");
	newRow.setAttribute("id", info[p].id);
	
		for(r in info[p]){
			if(r == "id"){}else{
			var newCell = document.createElement("TD");
			newCell.textContent = info[p][r];
			newRow.appendChild(newCell);
			}
		}

		var deleteButton = document.createElement("Input");
		var updateButton = document.createElement("Input");
		
		deleteButton.setAttribute("name", "deleteButton");
		deleteButton.setAttribute("type", "button");
		deleteButton.setAttribute("id", info[p].id);
		deleteButton.value = "Delete exercise";
		updateButton.setAttribute("name", "updateButton");
		updateButton.setAttribute("type", "button");
		updateButton.setAttribute("id", info[p].id);
		updateButton.value = "Update exercise";

		
		newRow.appendChild(deleteButton);
		newRow.appendChild(updateButton);

		document.getElementById("myTable").appendChild(newRow);
	}



	var deleteButtons = document.getElementsByName("deleteButton");
	var updateButtons = document.getElementsByName("updateButton");
	bindDelete(deleteButtons, updateButtons);
	document.getElementById("newEx").reset();
	}