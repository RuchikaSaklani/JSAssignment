var fs= require("fs");
edu_category=[]; //creating aaray
population=[];
edu_obj={};
headers=[];
var i=0,count=0;
lines=[];
category_obj=[];
var lineReader = require('readline').createInterface({input: require('fs').createReadStream('./csv_files/India2011.csv')});
lineReader.on('line', function(line) {
if(count==0)
{
headers=line.split(",");
count++;
}
else{
lines=line.split(",");
count++;
}
if(count==1 )
{
  for(i=15; i<=44;i=i+3){
   edu_category.push(headers[i]);
 }
}
else if(count==2){
    for(i=15; i<=44;i+=3){
  population.push(Number(lines[i]));
 }
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
});
lineReader.on('close',function()
  {
    var lineReader2 = require('readline').createInterface({input: require('fs').createReadStream('./csv_files/IndiaSC2011.csv')});
    lineReader2.on('line', function(line) {
    lines=line.split(",");

    if(lines[4]=="Total" && lines[5]=="All ages" )
    { var j=0;
      for(i=15; i<=44;i+=3){
     population[j]+=Number(lines[i]);
     j++;
   }
    }
    });
    lineReader2.on('close',function()
      {
        var lineReader3 = require('readline').createInterface({input: require('fs').createReadStream('./csv_files/IndiaST2011.csv')});
        lineReader3.on('line', function(line) {
        lines=line.split(",");
        if(lines[4]=="Total" && lines[5]=="All ages" )
        { var j=0;
          for(i=15; i<=44;i+=3){
         population[j]+=Number(lines[i]);
         j++;
       }
        }
        });
        lineReader3.on('close',function()
          {
      for(var i in edu_category)
      {
        edu_obj={"Education_category":edu_category[i], "Population":population[i]};
        category_obj.push(edu_obj);
      }
      console.log(category_obj);
      fs.writeFileSync('json/third_json.json',JSON.stringify(category_obj),'utf8',function(err){edu_obj.log(err);});
    });
  });
});
