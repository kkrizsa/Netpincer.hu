var file;
var timer;

window.onload = function(){
	document.getElementById("process").addEventListener("click", excelParser);
}

function populate(data){

	for (var i=0; i<data.Sheet1.length; i++){
		if (data.Sheet1[i].geo){
			mark(data.Sheet1[i].geo, data, i);
		}else{
			geocodeAddress(data.Sheet1[i].address, data, i);
		}
	}
}

function filter(data){
	//check GMV
	var minGmv = document.getElementById('minGmv').value;
	
	for(var i=0; i<data.Sheet1.length; i++){
		console.log(data.Sheet1[i].shopName);
		if(minGmv != null){
			console.log(data.Sheet1[i].gmv+" "+ minGmv);
			if(Number(data.Sheet1[i].gmv) < Number(minGmv)){
				console.log("here, removing: "+data.Sheet1[i].shopName);
				data.Sheet1.splice(i, 1);
				i--;
			}
		}
	}
	
	populate(data);
}


/* function processInput(){
	console.log("excelParser");
	excelParser();
} */

/* function getFileExtension(filename) {
	return filename.split('.').pop();
} */

/* document.getElementById('file').onchange = function(){

  file = this.files[0];
  
  var fileName = document.getElementById('file').name;
  console.log("File Name: " + fileName);
  console.log(getFileExtension(fileName));

  var reader = new FileReader();
  reader.onload = function(progressEvent){
    // Entire file
    //console.log(this.result);

    // By lines
    var lines = this.result.split('\n');
    for(var line = 0; line < lines.length; line++){
		//console.log(lines[line]);
		timer = setTimeout(geocodeAddress(lines[line]), 1000);//geocode address here
    }
  };
  reader.readAsText(file);
}; */
