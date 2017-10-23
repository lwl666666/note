### 什么是组件？
组件（component）是Vue最强大的功能之一。组件可以扩展HTML代码，封装可重用的代码。在第一篇已经简要介绍了组件。我理解的组件就是具有业务意义的代码块，具体点的话就由html标签，css和js组成，它实现了某一功能，且大部分情况下它是可复用的。比如页面的导航栏，列表等都可以做成一个组件。页面就是一个组件容器，我们开发一个页面就是把这些组件都放进这个容器中。
### 怎么使用组件？
使用组件，首先要先注册组件，注册分为全局注册，即注册之后所有实例都可以使用该组件。对应的就是局部注册，局部注册的组件只能在注册的实例内使用。
#### 全局组件
``` bash
	<div id="app">
		<global></global>
	</div>
	<script type="text/javascript">
	//注册全局组件
	Vue.component("global",{
		template:"<h1>我是一个全局注册的组件</h1>"
	});
	new Vue({
		el:"#app"
	});
	</script>
```
#### 局部组件
``` bash
	<div id="app">
		<child></child>
	</div>
	<script type="text/javascript">
	//定义局部组件
	var child=Vue.extend({
		template:"<h2>我是一个局部注册的组件</h2>"
	});
	new Vue({
		el:"#app",
		//注册局部组件
		components:{
			child:child
		}
	});
	</script>
```
### 数据传递
再看复杂一点的场景，子组件中所需的数据是父组件的数据，但组件实例的作用域都是孤立的。这意味着子组件不能直接引用父组件的数据，父组件只有通过prop属性下发数据到子组件
``` bash
	<div id="demo2">
		<child :message="msg"></child>
	</div>
	
	//定义局部组件7
	var child2=Vue.extend({
		template:"<h2>{{message}}</h2>",
		props:["message"]
	});
	<script type="text/javascript">	
	new Vue({
		el:"#demo2",
		data(){
			return {
				msg:"我来自父组件"
			}
		},
		components:{
			child:child2
		}
	});
	</script>
```
### prop验证
组件可以为prop指定验证要求
``` bash
Vue.component("test",{
	props:{
		//必须是数字
		propA:Number,
		//数字且有默认值
		propB:{
			type:Number,
			default:100
		},
		//必传且必须是字符串
		propC:{
			type:String,
			required:true
		},
		//多种类型
		propD:[String,Number],
		//数组/对象，默认值由一个工厂函数返回
		propE:{
			type:Object,
			default:function(){
				return {
					message:"hello world"
				}
			}
		},
		//自定义校验
		propF:{
			validator:function(value){
				return value>10
			}
		}
	}
})
```
type可选值如下:
``` bash
String
Number
Boolean
Object
Function
Array
```
type也可以是一个自定义构造函数，使用instanceof检测
### 自定义事件
父组件通过prop可以把数据下发到子组件，相对应的子组件通过自定义事件跟父组件通信。
每个vue实例都实现了事件接口：
``` bash
使用$on(eventName)监听事件
使用$emit(eventName)触发事件
```
下面是一个运用自定义的demo，分别注册了计数增加按钮组件和计数减少按钮组件，当点击这两个按钮的时候都会触发对应的增加和减少事件，相应调用父组件中的方法。
``` bash
	<div id="demo3">
		<p>{{total}}</p>
		<count-add-btn v-on:addtotal="totalAdd"></count-add-btn>
		<count-less-btn v-on:lesstotal="totalLess"></count-less-btn>
	</div>
	<script type="text/javascript">
	Vue.component("countAddBtn",{
		template:"<button v-on:click='add'>{{count}}</button>",
		data(){
			return {
				count:0
			}
		},
		methods:{
			add:function(){
				debugger;
				this.count++;
				this.$emit("addtotal");
			}
		}
	});
	Vue.component("countLessBtn",{
		template:"<button v-on:click='less'>{{count}}</button>",
		data(){
			return {
				count:0
			}
		},
		methods:{
			less:function(){
				this.count--;
				this.$emit("lesstotal");
			}
		}
	});	
	new Vue({
		el:"#demo3",
		data(){
			return {
				total:0
			}
		},
		methods:{
			totalAdd:function(){
				this.total++;
			},
			totalLess:function(){
				this.total--;
			}
		}
	});
	</script>
``` 
