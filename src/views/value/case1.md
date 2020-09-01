# value属性使用场景

> 这里的value都是用于schemaForm或者Form组件的

## 用法

主要用于外部直接控制表单内值的场景,但是它不会控制默认值.

`formily`的默认值比较麻烦,在内部进行了存储,当进行重置时,会把值变为默认值.

使用value的坏处就是会整树渲染,这里需要注意.也是因为这个特性,仍然是走的原始的react更新的路子,所以才会有defaultValue与initialValues存在.
