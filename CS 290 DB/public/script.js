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

function bindDelete(theButtons){
	
	for (i = 0; i < theButtons.length; i++){
		
		theButtons[i].addEventListener("click", function(x){
			return function(){
			deleteRow(theButtons[x].id);
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
	
	var radioResults = document.getElementsByName("lbs");
	for(i = 0; i < radioResults.length; i++){
		if (radioResults[i].checked){
			var lbs = radioResults[i].value;
		}
	}

	
	
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
	
function updateRow(theID){
	var newName = document.getElementById("editName").value;
	var newReps = document.getElementById("editReps").value;
	var newWeight = document.getElementById("editWeight").value;
	var newDate = document.getElementById("editDate").value;
	var newLbs = document.getElementById("editLbs").value;
	
	var payload = {id: null, name: null, reps: null, weight: null, date: null, lbs: null};
	payload.id = theID;
	payload.name = newName;
	payload.reps = newReps;
	payload.weight = newWeight;
	payload.date = newDate;
	payload.lbs = newLbs;
	
	var req = new XMLHttpRequest();
	req.open("POST", "http://52.32.212.47:2500/?id=" + theID + "&name=" + newName + "&reps=" + newReps + "&weight=" + newWeight + "&date=" + newDate + "&lbs=" + newLbs, true)
	req.send(null);
	
}

function redirect(theRow){
	
	var req = new XMLHttpRequest();
	req.open("GET", "http://52.32.212.47:2500/redirect?id=" + theRow, true);
	
	req.addEventListener('load', function(){
	if(req.status >= 200 && req.status < 400)
	{
		console.log(req.status);
	}
	else{
		console.log("Error in network request: " + req.statusText);
	}
	
	});
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
	
	
function createTable(info){

if(document.getElementById("myTable"))
{
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
		var updateLink = document.createElement("a");
		
		updateLink.setAttribute("name", "updateLink");
		updateLink.href = "/redirect?id=" + info[p].id;
		
		deleteButton.setAttribute("name", "deleteButton");
		deleteButton.setAttribute("type", "button");
		deleteButton.setAttribute("id", info[p].id);
		deleteButton.value = "Delete exercise";
		updateButton.setAttribute("name", "updateButton");
		updateButton.setAttribute("type", "button");
		updateButton.setAttribute("id", info[p].id);
		updateButton.value = "Update exercise";
		updateLink.appendChild(updateButton);

		
		newRow.appendChild(deleteButton);
		newRow.appendChild(updateLink);

		document.getElementById("myTable").appendChild(newRow);
	}



	var deleteButtons = document.getElementsByName("deleteButton");
	bindDelete(deleteButtons);
	document.getElementById("newEx").reset();
	}
}