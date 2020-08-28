# 扩展 Effect Hook

我们在扩展联动协议的时候，其实已经涉及到了扩展 Effect Hook，Effect Hook 其实就像 React Hook 一样，它是一个逻辑复用方案 想要实现一个 Effect Hook，我们可能会使用到以下 API：

FormEffectHooks 使用现成生命周期 Hook
createEffectHook 创建扩展生命周期 Hook
createFormActions，获取上下文中的 actions

createFormActions 在 effects 内部调用，会继承全局 actions，如果在外部调用，则会创建唯一实例
createEffectHook 可以创建一个自定义事件的订阅器，只能在 effects 内部使用