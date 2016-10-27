var fs= require("fs");
var i=0;
var age=[];
var literate_popu=[];
var lit_obj=[];
var obj={};
var lineReader = require('readline').createInterface({input: require('fs').createReadStream('./csv_files/India2011.csv')}); //retrieving file line by line
lineReader.on('line', function(line) {
i++;
lines=line.split(","); //
if(lines[4]=="Total"){
  if(i>1 && i<=31){
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
    var lineReader2 = require('readline').createInterface({input: require('fs').createReadStream('./csv_files/IndiaSC2011.csv')});
    lineReader2.on('line', function(line) {
    i++;
    lines=line.split(",");
    if(lines[4]=="Total"){
      if(i>1 && i<=31){
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
    lineReader2.on('close',function()
      {
        var lineReader3 = require('readline').createInterface({input: require('fs').createReadStream('./csv_files/IndiaST2011.csv')});
        lineReader3.on('line', function(line) {
        i++;
        lines=line.split(",");
        if(lines[4]=="Total"){

          if(i>1 && i<=31){
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
        lineReader3.on('close',function()
          {
      for(var i in age)
      {
        obj={"Age":age[i],"Literate_population":literate_popu[i]};
        lit_obj.push(obj);
      }
      fs.writeFileSync('json/first_json.json',JSON.stringify(lit_obj),'utf8',function(err){console.log(err);}); //writing to the json file
    });
  });
});
