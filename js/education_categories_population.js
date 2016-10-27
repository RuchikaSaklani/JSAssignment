//variables declaration
var fs= require("fs");
edu_category=[]; //creating array
population=[];
edu_obj={};
headerFlag=true;
headers=[];
var i=0;
lines=[];
category_obj=[];
var lineReader = require('readline').createInterface({input: require('fs').createReadStream('../csv_files/main.csv')});
lineReader.on('line', function(line) { //read function starts

lines=line.split(","); //splitting the lines
if(headerFlag==true)
headerFlag=false;
if(edu_category.length==0)
{
  for(i=15; i<=44;i=i+3)
   edu_category.push(lines[i]);
 }
else{
 if(population.length==0){
    for(i=15; i<=44;i+=3)
  population.push(Number(lines[i]));
}
else {
  if(lines[4]=="Total" && lines[5]=="All ages")
  {
    var j=0;
    for(i=15; i<=44;i+=3){
    population[j]+=Number(lines[i]);
    j++;
  }
  }
}
    }
  }); //read function ends

      lineReader.on('close',function()
          {
      for(var category in edu_category) //check in the existing array
      {
        edu_obj={"Education_category":edu_category[category], "Population":population[category]};
        category_obj.push(edu_obj);
      }
      fs.writeFileSync('../json/education_categories_population.json',JSON.stringify(category_obj),'utf8',function(err){edu_obj.log(err);});
}); //write file to json
