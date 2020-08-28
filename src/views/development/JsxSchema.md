# 混合模式

> JSX Schema 是一种对前端更友好的前端维护 Schema 的开发模式。 主要是使用了 SchemaForm 组件和 SchemaMarkupField 组件，SchemaMarkupField 是一个描述型标签，它不是实际的 UI 组件，只能再 SchemaForm 内部使用，这个标签属性与 JSON Schema 中的 Field 对象是等价的

> 注意：SchemaForm 的子节点不能随意插入任何 div 之类的实际 UI 节点，否则它会被推到 Form 底部去渲染。

## schema组件定义

自定义schema组件时需要注意,对复杂结构件需要适配dataSource,详情可以参考 `customSelect` 组件.

## getFormSchema

通过这个方法,从 `<schemaForm />` 取出数据.