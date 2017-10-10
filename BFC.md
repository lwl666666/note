浅析BFC
### BFC是什么？
BFC(Block formatting context)翻译为"块级格式化上下文"。光看这个翻译可能大多数都是一头雾水，在了解BFC，我们先了解“BFC”中的“FC”(formatting context)格式上下文。Formatting Context指页面中的一个渲染区域，并且拥有一套渲染规则，他决定了其子元素如何定位，以及与其他元素的相互关系和作用。而BFC就是在FC前面加了个B(Block),它规定渲染的区域只有Block-level box参与，它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。常见的FC还有IFC(Inline formatting context)。
### BFC的布局规则
1.内部的Box会在垂直方向，一个接一个地放置。

2.Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠

3.每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。

4.BFC的区域不会与float box重叠。

5.BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。

6.计算BFC的高度时，浮动元素也参与计算
### BFC的触发条件
①根元素

②float属性不为none

③position为absolute或fixed

④display为inline-block, table-cell, table-caption, flex, inline-flex

⑤overflow不为visible
### BFC的运用
(1).清除浮动

(2).防止margin重叠

(3).自适应布局
### 总结
我觉的掌握BFC最重要的就是牢记第5条布局规则“BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素”，上面的这些运用都是基于这项准则。在日常开发中可以利用BFC的渲染规则，实现想要的布局效果。



