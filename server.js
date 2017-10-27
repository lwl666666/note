var http = require("http");
var url = require("url");
var fs = require("fs");
var querystring = require("querystring");

http.createServer(function(req,res){
	console.log("server accept request");
	var pathname = url.parse(req.url).pathname;
	console.log(req.method);
	if(req.method === "GET"){
		getHTML(pathname,res);
	}
	if(req.method === "POST"){
		var str = '';
		req.on("data",function(data){
			console.log(1);
			str += data;
		})
		req.on("end",function(data){
			console.log("data has achieved")
			var reqData = querystring.parse(str);
			switch(pathname){
			case "/login":
				if(reqData.username === "admin" && reqData.password === "123456"){
					res.writeHead(200,{
						"Content-Type":"text/html"
					});
					res.write("<h1>登录成功</h1>");
				}else{
					res.writeHead(200,{
						"Content-Type":"text/html"
					});
					res.write("<h1>用户名和密码输入错误</h1>");
				}
				break;
		}
		});
	}
}).listen(8080);

function getHTML(path,res){
	fs.exists("./html/"+path+".html", function(exsit){
		if(exsit){
			res.writeHead(200,{
				"Content-Type":"text/html"
			});
			var content = fs.readFileSync("./html/"+path+".html", "utf-8");
			res.write(content,"utf-8")
		}else{
			res.writeHead(404,{
				"Content-Type":"text/html"
			});
			res.write("<h1>404!页面被兰祥超吃了</h1>","utf-8");
		}
		res.end();
	});
}
