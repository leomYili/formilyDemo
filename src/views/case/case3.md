# 自定义自增列表递归渲染

> 可以通过 `<schemaField />` 组件快速实现递归渲染.

## 解析

* 递归渲染，主要是使用 SchemaField 组件，需要注意的是，必须要传入 schema 对象和路径，如果只传路径，它会自动从顶层 json schema 去读
* 目前除了 schema.items/schema.properties 是可以用 SchemaMarkupField 来等价描述，但是对于用户用于递归渲染的递归属性(比如上面的 enum)，是没法通过 SchemaMarkupField 描述的，所以只能写纯 JSON
* 注意，用于递归渲染的 SchemaField 组件必须要传 schema 对象，否则会存在子字段读取 schema 失效的风险问题。

```()
// IMutators

interface IMutators<V = any> {
  change: (value: V) => void //改变当前字段值
  dispatch: (name: string, payload: any) => void //触发effect事件
  errors: (
    errors: string | Array<string>,
    ...formatValues: Array<string | number>
  ) => void //设置当前字段的错误消息
  push(value: V) //对当前字段的值做push操作
  pop() //对当前字段的值做pop操作
  insert(index: number, value: V) //对当前字段的值做insert操作
  remove(name: string) //对当前字段的值做remove操作
  unshift(value: V) //对当前字段值做unshift操作
  shift() //对当前字段值做shift操作
  move(fromIndex: number, toIndex: number) //对当前字段值做move操作
}
```
