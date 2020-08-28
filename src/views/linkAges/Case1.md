# Form Schema 联动协议

官方提供了一个叫做 `x-linkages` 的协议,帮助用户在协议层描述简单联动.但这个简单联动无法描述异步或者复杂的业务逻辑以及数据处理.

在实际使用过程中,用于控制表单项的各种状态是比较好用的,比如是否可编辑,是否可读,以及是否可见这些UI状态使用联动协议可以很快的达到目的.

这里的联动协议只能用于 `schema`,但并不意味着只能用于 `JSON schema` 中控制表单项,实际上,也可以通过混合模式,控制 `<SchemaMarkupField>` 的状态.

> 当然schema中的内容可以动态替换,只是要在每次替换之后进行整个表单的reset,来触发更新,否则就只能通过修改表单项的值来驱动校验了

## 联动范式

```()
setFieldState(
  Subscribe(
    FormLifeCycle,
    Selector(Path)
  ),
  TargetState
)
```

这句表达式描述了

任何联动，都需要一个路径来描述具体字段
通过一个选择器来选择字段，同时任何联动都是从表单生命周期而发起
联动的最终操作是操作具体字段的状态，可以是值，可以是它的显示隐藏，也可以是具体组件属性等等。

掌握了以上核心概念，可以看看一个实际例子

```()
onFieldValueChange$('aa').subscribe(fieldState => {
  setFieldState('bb', state => {
    state.visible = fieldState.value === 123
  })
})
```

以上代码首先是监听了表单的生命周期，指定监听 aa 字段的变化，监听函数会返回一个 Rxjs 的 Observable 对象
然后根据变化的值去控制 bb 字段的状态，例子中是控制了 bb 的显示隐藏状态，
当 aa 的值为 123 时会控制 bb 字段的显示，否则隐藏
