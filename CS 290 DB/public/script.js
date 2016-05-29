function addRow(event){

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
	req.open("POST", "http://localhost:2500/add-item?name=" + name + "&reps=" + reps + "&weight=" + weight + "&date=" + date + "&lbs=" + type, true);
	
	req.addEventListener('load', function(){
		if(req.status >= 200 && req.status < 400){
			var res = JSON.parse(req.responseText);
			for(p in res){
				var newRow = document.createElement("TR");
	
	//name
	var nameCell = document.createElement("TD");
	nameCell.innerHTML = p.name;
	newRow.appendChild("nameCell")
	
	//reps
	var repsCell = document.createElement("TD");
	repsCell.innerHTML = p.reps;
	newRow.appendChild("repsCell")
	
	//weight
	var weightCell = document.createElement("TD");
	weightCell.innerHTML = p.weight;
	newRow.appendChild("weightCell")
	
	//date
	var dateCell = document.createElement("TD");
	dateCell.innerHTML = p.date;
	newRow.appendChild("dateCell")
	
	//type
	var typeCell = document.createElement("TD");
	typeCell.innerHTML = p.type;
	newRow.appendChild("typeCell")
	
	
	getElementById("myTable").appendChild(newRow);
			}
		}
		else{
			console.log("Error in network request: " + req.statusText);
		}
		
	});
	
	req.send(JSON.stringify(payload));
	event.preventDefault();
		
	
	};