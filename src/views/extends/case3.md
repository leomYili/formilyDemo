# 扩展 Schema VirtualField 组件

其实就是扩展布局组件，我们的扩展方式主要有：

* SchemaForm 中传入 components 只要组件拥有 isVirtualFieldComponent 静态属性，那么会被当做虚拟组件，同时组件属性可以拿到 VirtualFieldProps
* 通过 isVirtualFieldComponent (推荐)
* registerVirtualBox 全局扩展
* createVirtualBox 全局扩展
* createControllerBox 全局扩展

## 全局扩展

```()
const InstanceLayoutComponent = ({ children }) => {
  return <div>实例级布局组件{children}</div>
}

registerVirtualBox('CustomLayout', ({ children, schema }) => {
  return (
    <div style={{ border: '1px solid red', padding: 10 }}>
      {children}
      {schema['x-component-props']['say']}
    </div>
  )
})

//...

<SchemaForm
    onChange={values => {
        setValue(values)
    }}
    components={{
    InstanceLayoutComponent
    }}
/>
```
