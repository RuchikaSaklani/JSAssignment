var fs= require("fs");
age=[];
header=[];
literate_popu=[];
lit_obj=[];
obj={};
var lineReader = require('readline').createInterface({input: require('fs').createReadStream('../csv_files/main.csv')}); //retrieving file line by line
lineReader.on('line', function(line) {
header=line.split(",");
lines=line.split(","); //array of lines
if(lines[4]=="Total"){
  if(!(age.includes(lines[5]))){
  age.push(lines[5]);
  literate_popu.push(Number(lines[12]));
}
  else
  {
   var pos=age.indexOf(lines[5]);
   literate_popu[pos]+=Number(lines[12]);
}
 }
});
lineReader.on('close',function()
  {
for(var population in age)
{
obj={"Age":age[population],"Literate_population":literate_popu[population]};
lit_obj.push(obj);
}
console.log("reached");
fs.writeFileSync('../json/ageWiseLiterate.json',JSON.stringify(lit_obj),'utf8',function(err){console.log(err);}); //writing to the json file
});
