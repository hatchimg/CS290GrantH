function addRow(){

	if(document.getElementById("name").value == ""){
		alert("Name must be filled out.");
		return;
	}
	var name = document.getElementById("name").value;
	var reps = document.getElementById("reps").value;
	var weight = document.getElementById("weight").value;
	var date = document.getElementById("date").value;
	var type = document.getElementById("unit");
	
	var req = new XMLHttpRequest();
	req.open("GET", "http://localhost:2500/add-item?name=" + name + "&reps=" + reps + "&weight=" + weight + "&date=" + date + "&lbs=" + type, true);
	req.send(null);
	
	if(req.status >= 200 && req.status < 400){
	//add row to HTML table
	
	var newRow = document.createElement("TR");
	
	//name
	var nameCell = document.createElement("TD");
	nameCell.innerHTML = document.getElementById("name").value;
	newRow.appendChild("nameCell")
	
	//reps
	var repsCell = document.createElement("TD");
	repsCell.innerHTML = document.getElementById("reps").value;
	newRow.appendChild("repsCell")
	
	//weight
	var weightCell = document.createElement("TD");
	weightCell.innerHTML = document.getElementById("weight").value;
	newRow.appendChild("weightCell")
	
	//date
	var dateCell = document.createElement("TD");
	dateCell.innerHTML = document.getElementById("date").value;
	newRow.appendChild("dateCell")
	
	//type
	var typeCell = document.createElement("TD");
	typeCell.innerHTML = document.getElementById("type").value;
	newRow.appendChild("typeCell")
	
	
	getElementById("myTable").appendChild(newRow);
	}
	else{
		console.log("Row not successfully added. Error code " + req.status);
	}
	


};