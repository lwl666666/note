指令（Directive）是带有“v-”前缀的特殊属性，它的值是单个JavaScript表达式，指令的职责是当表达式的值发生变化时，响应式的更新dom。
Vue和Angular的指令十分相似，如果有学过Angular在学习vue的指令时会感到十分亲切。
1.文本
Vue中向html中插值的方法有三种
{{}} v-html v-text 
（1）Mustache语法
Mustache语法（双大括号）是比较常见的数据绑定形式,当大双括号中绑定的数据对象更新时，相应的插值处的值也会更新
```bash
<sapn>{{message}}</sapn>
```bash
如果有时你只希望只在页面初始化时进行插值，之后数据更新不在更新插值出的内容可以使用“v-once”指令
```bash
<sapn v-once>{{message}}</sapn>
```bash
对于绑定的数据可以使用JavaScript表达式（注：每个绑定只能是单个表达式，不能是语句）
```bash
<sapn>{{ number+1 }}</sapn>
<sapn>{{ ok?'yes':'no' }}</sapn>
<sapn>{{ message.split('').reverse().join('') }}</sapn>
```bash
（2）v-text
v-text和Mustache语法使用规则基本一致基本一致
```bash
<sapn v-text="message"></sapn>
```bash
（3）v-html
v-text和Mustache语法会直接将数据展示，对于数据是html代码将不会进行解释会之间原封不动的展示，而如果你想输出正真的html代码，就可以使用v-html,testtHtml="<sapn>Hello World</sapn>"
```bash
<div v-text="rawHtml"></div>
```bash
渲染为
```bash
<div>
	<sapn>Hello World</sapn>
</div>
```bash
2.属性
Mustache语法不能将数据绑定到html属性上，vue为绑定数据到html属性上提给了v-bind指令。v-bind的缩写为“:”
```bash
<!--完整语法 -->
<p v-bind:title="message">
<!--缩写 -->
<p :title="message">
```bash
用法：v-bind:属性名=属性值
```bash
<div id="demo2">
	<p v-bind:title="message">鼠标悬停</p>
</div>

var demo2 = new Vue({
	el:"#demo2",
	data:{
		message:"页面加载于" + new Date().toLocaleString()
	}
}); 
```bash
属性中的特例，为的是方便更好的绑定式样，class和style的值不仅可以是字符串还可以是对象和数组。而且v-bind:class的值还可以与其他普通的class共存
```bash
<div id="classDemo">
	<p class="mini-font-size" v-bind:class="{active:isActive,'text-success'}">test</p>
</div>

data:{
	isActive:true,
	text-success:false
}
```bash
最终的渲染结果为
```bash
<div id="classDemo">
	<p class="mini-font-size isActive">test</p>
</div>
```bash

3.监听事件
为dom上绑定监听事件需要用到v-on指令。v-on的缩写为“@”
```bash
<!--完整语法 -->
<button v-on:click="reverseMessage">
<!--缩写 -->
<button @click="reverseMessage">
```bash
一般用法v-on:事件名=绑定的方法 （还可添加修饰符和修饰键）
```bash
<div id="demo5">
	<p v-text="message"></p>
	<button v-on:click="reverseMessage">逆转字符串</button>
</div>

var demo5 = new Vue({
	el:"#demo5",
	data:{
		message:"hello world"
	},
	methods:{
		reverseMessage:function(){
		this.message = this.message.split("").reverse().join("");
		}
	}
});
```bash
4.条件渲染
v-if和v-show可以用于页面元素的展示和隐藏。
```bash
<div id="demo3">
	<div v-if="isShow">
		这一段被显示
	</div>
	<div v-if="!isShow">
			这一段不被显示
	</div>
</div>

var demo3 = new Vue({
	el:"#demo3",
	data:{
		isShow:true
	}
});
```bash
修改isShow的值可以控制组件的显示，当v-if和v-show的值为true时，绑定的组件将在页面中展示，为false时将被隐藏。有人会有这样的疑问，为什么两个使用的方法一样，展示的效果也一样为什么要v-if和v-show呢
v-if VS v-show
v-if是“真正的”的条件渲染，当为true时组件会被渲染，而当false时组件则会被摧毁，v-if页面初始化时为false将不渲染。
v-show时无论true还是false组件都会被渲染，只是基于css的切换。
两者比较v-if有更高的切换开销，而v-show可能会有更高的初始化开销
所以当页面中需要频繁的切换则使用v-show较好，而如果在初始化之后条件不太可能发生变化，使用v-if比较好。
5.表单输入绑定
你可以使用v-model元素在表单元素上进行双向数据绑定
```bash
<div id="demo6">
	<p v-text="message"></p>
	<input v-model="message" type="text">
</div>

var demo6 = new Vue({
	el:"#demo6",
	data:{
		message:""
	}
});
```bash
6.列表渲染
是用v-for进行列表渲染，v-for需要使用“item in items”的语法
```bash
<div id="demo4">
	<ul>
		<li v-for="person in persons">
			<span>姓名:{{person.name}},</span>
			<span>年龄:{{person.age}}</span>
		</li>
	</ul>
/div>

var demo4 = new Vue({
	el:"#demo4",
	data:{
		persons:[
			{name:"张三",age:"20"},
			{name:"李四",age:"21"},
			{name:"王二",age:"22"}]
	}
});
```bash

以上就是我整理的vue中的常用指令，活用这些指向将会使开发事半功倍。
