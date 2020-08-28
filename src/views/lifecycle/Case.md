# 生命周期

## Form

* FormState
* FormLifeCycle

## Field

* FieldState
* VirtualFieldState
* FieldLifeCycle

## 案例

### 字段联动

* 在 effects 中使用\$订阅生命周期
* 通过订阅 ON_FORM_INIT 在表单初始化时设置字段状态
* 通过订阅 ON_FIELD_VALUE_CHANGE 在字段值变化时设置字段状态

### 外部监听

* 使用 FormSpy 可以监听 Form 的所有生命周期，同时它也提供了类似 redux 的 reducer API，我们可以借助 reducer 自己构建出各种符合业务述求的状态
* 使用 FormSpy 可以指定 selector 监听部分生命周期
* 使用 actions.dispatch 可以扩展表单生命周期，同时也可以借助 FormSpy 来消费，也可以在 effects 中消费，actions 调用必须先把 actions 传给 SchemaForm 进行握手，否则调用不会生效，只要握手成功，则可以在任意位置调用
* FormSpy 可以在 SchemaForm 外部监听 Form 生命周期，但是要求必须要使用 FormProvider

### 自定义组件

* 自定义组件内部使用 useFormEffects 可以订阅表单生命周期，需要注意一个地方，在 useFormEffects 内部无法监听 onFormInit 事件，因为组件渲染到自定义组件的时候，其实表单已经初始化，所以，如果我们需要做一些初始化操作，只需要在 useFormEffects 入参回调函数内直接写即可，这样代表当前自定义组件初始化时执行。
* 自定义组件内部可以使用纯源码开发模式，使用 FormItem 组件

### submit

```()
export const Submit = ({ showLoading, onSubmit, ...props }: ISubmitProps) => {
  return (
    <FormSpy
      selector={[
        LifeCycleTypes.ON_FORM_MOUNT,
        LifeCycleTypes.ON_FORM_SUBMIT_START,
        LifeCycleTypes.ON_FORM_SUBMIT_END
      ]}
      reducer={(state, action) => {
        switch (action.type) {
          case LifeCycleTypes.ON_FORM_SUBMIT_START:
            return {
              ...state,
              submitting: true
            }
          case LifeCycleTypes.ON_FORM_SUBMIT_END:
            return {
              ...state,
              submitting: false
            }
          default:
            return state
        }
      }}
    >
    ...
    </FormSpy>
  )
});
```

还可以用类似reducer的语法做状态更新
