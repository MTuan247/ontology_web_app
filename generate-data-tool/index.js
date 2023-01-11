var fs = require('fs');
var XLSX = require('xlsx');
var prefixes = require('./constant').prefixes;

// read xlsx data
var workbook = XLSX.readFile('./input/raw_data1.xlsx', {
  cellText:false, 
  cellDates: true
});
var sheet_name_list = workbook.SheetNames;
var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]], {
  raw: false,
  dateNF: 'dd"/"mm"/"yyyy'
});
// console.log(xlData);

// build turtle content
let content = '';
// add prefix
prefixes.forEach(x => {
  content += `@prefix ${x.prefix}: <${x.uri}> .\n`;
});
// add triples
xlData.forEach(x => {
  let {name, ...rest} = x;
  let triple = `ex:${name.replaceAll(' ', '')} ex:name "${x.name}";\n`;

  for(let key of Object.keys(rest)) {
    switch(key) {
      case "status":
        triple += `\t\tex:status ex:${rest[key]};\n`;
        break;
      case "bodyDimensions":
        triple += `\t\tex:bodyDimensions [
          rdf:value "${rest[key]}";
          ex:unit "mm"
        ];\n`;
        break;
      case "bodyWeight":
        triple += `\t\tex:bodyWeight [
          rdf:value "${rest[key]}";
          ex:unit "g"
        ];\n`;
        break;
      case "bodyBuild":
      case "colors":
        triple += `\t\tex:${key} (${rest[key].split(', ').map(x => `"${x}"`).join(' ')});\n`;
        break;
      default:
        triple += `\t\tex:${key} "${rest[key]}";\n`;
        break;
    }
  } 

  // triple = triple.slice(0, -2);
  // triple += '.\n';
  triple += "\t\trdfs:subClassOf ex:mobilePhone .\n\n";
  content = content + triple;
})

// save content
fs.writeFile('./output/abox1.ttl', content, function (err) {
  if (err) throw err;
  console.log('Saved!');
});

