# JsonSchema

## 大致结构

```()
<SchemaForm
  components={components}
  actions={actions}
  initialValues={initialValues}
  value={value}
  defaultValue={defaultValue}
  onSubmit={console.log}
  effects={effects}
  schema={schema}
  editable={false}
  expressionScope={expressionScope}
>
  <FormButtonGroup>
    <Submit>提交</Submit>
  </FormButtonGroup>
</SchemaForm>
```

1. editable 属性可以全局控制所有表单项变为阅读态，目前只针对简单数据类型的组件支持阅读，其他组件会以 disabled 状态显示
2. 所有联动操作统一在 effects 中实现。
3. actions 调用必须先把 actions 传给 SchemaForm 进行握手，否则调用不会生效，只要握手成功，则可以在任意位置调用。调用 actions.getFormGraph()可以直接查看实时表单状态树
4. Schema 任何一个属性都支持{{}}表达式，该表达式要求任何一个字段值必须是字符串，同时字符串必须以{{开始，}}结束。
5. expressionScope 属性，在 Schema 属性表达式中可以读取。

## schema

Json Schema 主要用于描述数据结构。举例:

```()
{
  "type": "object",
  "properties": {
    "key": {
      "type": "string"
    },
    "key1": {
      "type": "object",
      "properties": {
        "key2": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "key3": {
                "type": "string"
              }
            }
          }
        }
      }
    }
  }
}
```

在 formily 中，schema 需要描述值结构外，还需要描述 UI 对象。所以新增了一些"x-"开头的属性专门用于 UI 描述，如下所示：

-   x-props：字段属性描述，通俗可以理解为 FormItem 属性定义；
-   x-rules: 字段校验描述，Array 类型，支持通用的必填、正则校验、函数校验以及错误信息提示；
-   x-component：字段编辑组件类型，比如 Input、Select 等，另外仍然可以是 CustomComponent，通过渲染层注入组件即可；
-   x-component-props：用于 x-component 中指定的组件的属性。

formily 中把拥有 type 属性的对象叫做一个节点。节点有 2 种，一种是虚拟节点（VirtualField），另一种可以认为是值节点（Field）。虚拟节点和值节点的主要区别是：虚拟节点不参与 Values 对象的构建，通过 schema 构建还原 values 时会自动跳过该节点。 每个节点除了上述描述的“x-”属性外，还添加了一些自定义属性，例如 loading, invalid，enum，required，title 等等，这些可认为是节点状态，在后续会介绍。

更加详细的属性请参考官方文档: <https://formilyjs.org/#/0yTeT0/jAU8UVSYI8>

### 分类

`Formily` 对标准 `schema` 进行了扩展,扩展之后的节点分为:

1. 表单控件节点

    通过`x-component`进行使用或者对应type的内置基础表单控件.

2. 数据容器节点

    通过声明type类型为 `object` 与 `array` 时.可以指定它的 `properties` 或者 `items`,继续往下递归

3. UI容器节点(virtualField组件)

    通过声明组件拥有 `isVirtualFieldComponent` 静态属性,那么就会被当做虚拟组件,同时组件属性可以拿到 `VirtualFieldProps`,或者通过相关api进行全局扩展.特点是只会在schema中显示结构,不影响value

## 提前准备好的 schema

> 组件因为需要注册,所以从简

```()
{
	"type": "object",
	"properties": {
		"radio": {
			"key": "radio",
			"enum": ["1", "2", "3", "4"],
			"title": "Radio",
			"name": "radio",
			"x-component": "radio"
		},
		"select": {
			"key": "select",
			"type": "number",
			"enum": ["1", "2", "3", "4"],
			"title": "Select",
			"name": "select",
			"x-component": "select"
		},
		"username": {
			"key": "input",
			"title": "用户名",
			"name": "username",
			"x-component": "input",
			"x-linkages": [{
				"type": "value:visible",
				"target": "select",
				"condition": "{{ $self.value === '12' }}"
			}]
		}
	}
}
```

这里可以看出,如果不对 `schemaForm` 进行卸载,则覆盖时不会直接执行 `x-linkages`的规则联动.

目前页面上没有自动执行重置操作,需要点击按钮触发.
