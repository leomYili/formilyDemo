# 表单布局

承接上文对 `schema` 的描述中说过,`formily` 目前使用的 `schema` 其实是修改过定义,增加了很多额外属性的结构.

也可以看到 例子中最外层的 `div` 不按照书写顺序进行渲染,这里可以使用 `FormSlot`进行封装即可:

```()
export const FormSlot: React.FC<{
  name?: string
  children?: React.ReactElement
}> = ({ name, children }) => {
  return (
    <SchemaMarkupField
      type="object"
      name={name}
      x-render={() => {
        return <Fragment>{children}</Fragment>
      }}
    />
  )
}
```

可以看到,使用了 `x-render` 这一特殊属性,从而保证渲染顺序从外到里,达到嵌套的层级结构.

## FormMegaLayout

这里更多的是阅读 `@formily/antd-components` 的 `FormMegaLayout`,这个也是官方提供的布局控件扩展实际案例.

通过阅读源码,可以看出

```()
      / 撑满即为组件宽度为100%, flex: 1
      if (full) {
        componentProps.style = {
          ...(componentProps.style || {}),
          width: '100%',
          flex: '1 1 0%',
        }
      }

      if (size) {
        componentProps.size = size
      }
```

这里也是处理了辅助文案的位置

```()
<div className="mega-layout-container-wrapper">
    { addonBefore ? <p className="mega-layout-container-before">{addonBefore}</p> : null }
    <div className={classnames('mega-layout-container-content', { grid })}>
        {children}
    </div>
    { addonAfter ? <p className="mega-layout-container-after">{addonAfter}</p> : null }
</div>
```

来完成对样式以及功能的定义,剩下的 行内布局或者栅格布局都是样式的一种表达.

最后在进行注册,这样就可以通用了.
