# 纯Jsx Form

## 原始Form

在使用 `@formily/react`库时,可以看见,所有都是最原始的状态,包括了校验样式以及表单样式.

## antdForm

在使用 `@formily/antd`时,包含了相应库的特殊UI样式

## 自定义提交

两者同样可以通过 `createFormActions` 或 `createAsyncFormActions`,进行actions的直接操作,当然,这里也可以通过 `FormProvider`进行表单之间的组件通信,这里需要配合FormSpy共同使用.稍后会给出例子.
