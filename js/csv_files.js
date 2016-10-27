//variables used
var fs = require("fs");
var isHeader = true;
var writeStream = fs.createWriteStream('../csv_files/main.csv',{'flags':'a'});

var rl = require('readline').createInterface({
input: require('fs').createReadStream('../csv_files/India2011.csv')
});

rl.on('line', function (line) //reads line by line
{
writeStream.write(line + "\n"); //write line to the file
});

rl.on('close',function()
{
var rl1 = require('readline').createInterface({
input: require('fs').createReadStream('../csv_files/IndiaSC2011.csv')
});

rl1.on('line', function (line) //reads line by line
{
if(isHeader)
{
  isHeader=false;
}
else {
writeStream.write(line + "\n"); //write line to the file
}
});
rl1.on('close',function()
{
isHeader=true;
var rl2 = require('readline').createInterface({
input: require('fs').createReadStream('../csv_files/IndiaST2011.csv')
});

rl2.on('line', function (line) //reads line by line
{
if(isHeader)
{
isHeader=false;
}
else {
writeStream.write(line + "\n"); //write line to the file
}
});
});
});
