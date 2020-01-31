
var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHTML(title,list,body){

    return     `
            <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>Title</title>
                </head>
                <body>
                
                <h1><a href="/">node.js</a></h1>
                  ${list}
                
                ${body}
                </body>
              </html>
                 `;
}

function templateList(filelist){
    var list = '<ul>';

    for(var  i=0; i<filelist.length;i++){
        list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    }
    list = list + '</ul>';
    return list;
}

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathName = url.parse(_url, true).pathname;
    var title = queryData.id;

    // console.log(url.parse(_url, true));

    console.log(queryData.id);

    if(pathName === '/'){
        if(queryData.id === undefined){

            fs.readdir('./data',(err,filelist)=>{

                console.log(filelist);

                title = 'Welcome';
                var data = 'Hello Node.js';
                var list = templateList(filelist);

                var template = templateHTML(title,list,`<h1>${title}</h1>${data}`);
                response.writeHead(200);
                response.end(template);


            });


        }else{

            fs.readdir('./data',(err,filelist)=>{

                fs.readFile(`data/${queryData.id}`,'utf8',(err,data)=>{
                    var list = templateList(filelist);
                    var template = templateHTML(title,list,`<h1>${title}</h1>${data}`);
                    response.writeHead(200);
                    response.end(template);
                })
            });
        }

    }else{
        response.writeHead(404);
        response.end('Not found');
    }



});
app.listen(3000);