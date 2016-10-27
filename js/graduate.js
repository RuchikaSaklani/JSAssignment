//variable declaration
var fs= require("fs");
state=[];
grad_male=[];
grad_female=[];
grad_obj=[];
state_obj={};
var lineReader = require('readline').createInterface({input: require('fs').createReadStream('../csv_files/main.csv')});
lineReader.on('line', function(line) { //read function starts
lines=line.split(",");
if(lines[4]=="Total" && lines[5]=="All ages" )
{
   state.push(lines[3]);
   grad_male.push(Number(lines[40])); //first insertion
   grad_female.push(Number(lines[41])); //first insertion
}
else {
   var pos=state.indexOf(lines[3]);
   grad_male[pos]+=Number(lines[40]);
   grad_female[pos]+=Number(lines[41]);
}
});
     lineReader.on('close',function()
      {
      for(var graduate in state)
      {
        state_obj={"State":state[graduate],"Graduate-Males":grad_male[graduate] ,"Graduate-Females":grad_female[graduate]};
        grad_obj.push(state_obj);
      }
      fs.writeFileSync('../json/graduated.json',JSON.stringify(grad_obj),'utf8',function(err){console.log(err);}); //writing to the json file

});
