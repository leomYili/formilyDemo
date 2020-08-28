# 静态校验

## 必填校验

require

## 格式校验

format

## 提示型校验

message

## 其他规则性校验

pattern,

## interface ValidateDescription

```()
{
  // built-in rules，ref: string rules
  format?: InternalFormats
  // custom validation
  validator?: CustomValidator
  // required
  required?: boolean
  // pattern
  pattern?: RegExp | string
  // max length
  max?: number
  // maximum
  maximum?: number
  // exclusiveMaximum
  exclusiveMaximum?: number
  // exclusiveMinimum
  exclusiveMinimum?: number
  // minimum
  minimum?: number
  // min
  min?: number
  // length
  len?: number
  // whitespace
  whitespace?: boolean
  // enum
  enum?: any[]
  // error message
  message?: string
  [key: string]: any
}
```

## validateStatus(antd)校验状态

如不设置，则会根据校验规则自动生成，可选：'success' 'warning' 'error' 'validating'.
