var jsonOutput;
var file;

function return_json(json){
	return json;
}

function to_json(workbook) {
  var result = {};
  workbook.SheetNames.forEach(function(sheetName) {
    var roa = XLS.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
    if(roa.length > 0){
      result[sheetName] = roa;
    }
  });
  return result;
}
 
function b64it() {
  var cfb = XLS.CFB.read(tarea.value, {type: 'base64'});
  var wb = XLS.parse_xlscfb(cfb);
  process_wb(wb);
}
 
function process_wb(wb) {
  var output = "";
  //THIS IS WHERE THE JSON IS OUTPUT!!!
  output = JSON.stringify(to_json(wb), 2, 2);
  var x = JSON.parse(output);
  filter(x);
  
}
 
var drop = document.getElementById('file');

document.getElementById('file').onchange = function(){
	files = this.files;
}

function excelParser(){

  var i,f;
  for (i = 0, f = files[i]; i != files.length; ++i) {
    var reader = new FileReader();
    var name = f.name;
    reader.onload = function(e) {
      var data = e.target.result;
      var cfb = XLS.CFB.read(data, {type: 'binary'});
      //var arr = String.fromCharCode.apply(null, new Uint8Array(data));
      //var cfb = XLS.CFB.read(btoa(arr), {type: 'base64'});
      var wb = XLS.parse_xlscfb(cfb);
      process_wb(wb);
    };
    reader.readAsBinaryString(f);
    //reader.readAsArrayBuffer(f);
  }
}

 

