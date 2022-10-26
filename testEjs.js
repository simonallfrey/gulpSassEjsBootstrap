var ejs = require('ejs');
const fs = require('fs');
const _ = require('lodash');

const content = fs.readFileSync('app/ejs/index.ejs');
const str = content.toString();

let  users = ['geddy', 'neil', 'alex'];
let v1 = ejs.render('<p>[?= users.join(" | "); ?]</p>', {users: users}, {delimiter: '?', openDelimiter: '[', closeDelimiter: ']'});
console.log(v1)

v1 = ejs.render('<p><%= users.join(" | "); %></p>', {users: users}, {});

v1 = ejs.render('<p>1<% _=require("lodash") %> <%= _.join(["a","b","c"],"~") %></p>', {require: source => {return require(source)}}, {});
console.log(v1);

v1 = ejs.render('<p>2<%= _.join(["a","b","c"],"~") %></p>', {_: _}, {});
console.log(v1);

v1 = ejs.render('<p>3<% _=require("lodash") %> <%= _.join(["a","b","c"],"~") %></p>', {require: require}, {});
console.log(v1);


// Or globally
ejs.delimiter = '?';
ejs.openDelimiter = '[';
ejs.closeDelimiter = ']';
v1 = ejs.render('<p>[?= users.join(" | "); ?]</p>', {users: users});

// const resolveRequirePaths = content => {
//   const requirePattern = /<%[_\W]?.*(require\(.*\)).*[_\W]?%>/g
//   let resultContent = content

//   let matches = requirePattern.exec(content)

//   while (matches) {
//     const matchFilename = matches[1].match(/(['"`])[^'"`]*\1/)
//     const requestSource = matchFilename !== null ? matchFilename[0].replace(/['"`]/g, '') : null

//     if (requestSource !== null) {
//       let result = await context.getResolve()(context.context, requestSource)
//       if (sep === '\\') {
//         result = result.replace(/\\/g, '\\\\')
//       }
//       resultContent = resultContent.replace(matches[1], `require('${result}')`)
//     }

//     matches = requirePattern.exec(content)
//   }

//   return resultContent
// }

//console.log(ejs.render(content,{}));


// ejs.renderFile('app/ejs/index.ejs',{},{},(err,str) =>{
//     if (err) {
//         console.log(err)

//     }else{
//         console.log(str)

//     }
// })
