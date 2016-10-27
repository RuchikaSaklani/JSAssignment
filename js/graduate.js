var fs= require("fs");
state=[];
grad_male=[];
grad_female=[];
grad_obj=[];
state_obj={};
var lineReader = require('readline').createInterface({input: require('fs').createReadStream('./csv_files/India2011.csv')});
lineReader.on('line', function(line) {
lines=line.split(",");
if(lines[4]=="Total" && lines[5]=="All ages" )
{
   state.push(lines[3]);
   grad_male.push(Number(lines[40]));
   grad_female.push(Number(lines[41]));
}
else {
   var pos=state.indexOf(lines[3]);
   grad_male[pos]+=Number(lines[40]);
   grad_female[pos]+=Number(lines[41]);
}
});
lineReader.on('close',function()
  {
    var lineReader2 = require('readline').createInterface({input: require('fs').createReadStream('./csv_files/IndiaSC2011.csv')});
    lineReader2.on('line', function(line) {
    lines=line.split(",");
    if(lines[4]=="Total" && lines[5]=="All ages" )
    {
       var pos=state.indexOf(lines[3]);
       grad_male[pos]+=Number(lines[40]);
       grad_female[pos]+=Number(lines[41]);
    }
    });
    lineReader2.on('close',function()
      {
        var lineReader3 = require('readline').createInterface({input: require('fs').createReadStream('./csv_files/IndiaST2011.csv')});
        lineReader3.on('line', function(line) {
        lines=line.split(",");
        if(lines[4]=="Total" && lines[5]=="All ages" )
        {
           var pos=state.indexOf(lines[3]);
           grad_male[pos]+=Number(lines[40]);
           grad_female[pos]+=Number(lines[41]);
        }
        });
        lineReader3.on('close',function()
          {
      for(var i in state)
      {
        state_obj={"State":state[i],"Graduate-Males":grad_male[i] ,"Graduate-Females":grad_female[i]};
        grad_obj.push(state_obj);
      }
      fs.writeFileSync('json/second.json',JSON.stringify(grad_obj),'utf8',function(err){console.log(err);}); //writing to the json file
    });
  });
});
