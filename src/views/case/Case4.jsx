import React from "react";
import {
    SchemaForm,
    SchemaMarkupField,
    SchemaField,
    FormPath,
    FormButtonGroup,
    Submit,
} from "@formily/antd";
import { Button, Input, Divider } from "antd";
import { ArrayList } from "@formily/react-shared-components";
import styles from "./Case4.scss";

const ArrayCustom1 = (props) => {
    console.log(props);
    const { value, schema, className, editable, path, mutators } = props;
    const componentProps = schema.getExtendsComponentProps() || {};

    const onAdd = () => mutators.push(schema.items.getEmptyValue());
    const onRemove = (index) => mutators.remove(index);

    // 这里如果想控制排序方式,加自定义判断逻辑就可以
    const onMoveUp = (index) => mutators.moveUp(index);
    const onMoveDown = (index) => mutators.moveDown(index);

    return (
        <div className="case4">
            {value.map((item, index) => (
                <div {...componentProps} key={index}>
                    <SchemaField path={FormPath.parse(path).concat(index)} />
                    <Button onClick={onRemove.bind(null, index)}>remove</Button>
                    <Button onClick={onMoveUp.bind(null, index)}>up</Button>
                    <Button onClick={onMoveDown.bind(null, index)}>down</Button>
                </div>
            ))}
            <Button onClick={onAdd}>add</Button>
        </div>
    );
};
ArrayCustom1.isFieldComponent = true;

const ArrayComponents = {
    CircleButton: (props) => <Button {...props} />,
    TextButton: (props) => <Button text {...props} />,
    AdditionIcon: () => <div>+自定义添加</div>,
    RemoveIcon: () => <div>删除</div>,
    MoveDownIcon: () => <div>下移</div>,
    MoveUpIcon: () => <div>上移</div>,
};

const ArrayCustom2 = (props) => {
    const { value, schema, className, editable, path, mutators } = props;
    const {
        renderAddition,
        renderRemove,
        renderMoveDown,
        renderMoveUp,
        renderEmpty,
        renderExtraOperations,
        ...componentProps
    } = schema.getExtendsComponentProps() || {};

    const onAdd = () => {
        const items = Array.isArray(schema.items)
            ? schema.items[schema.items.length - 1]
            : schema.items;
        mutators.push(items.getEmptyValue());
    };

    return (
        <ArrayList
            value={value}
            minItems={schema.minItems}
            maxItems={schema.maxItems}
            editable={editable}
            components={ArrayComponents}
            renders={{
                renderAddition,
                renderRemove,
                renderMoveDown,
                renderMoveUp,
                renderEmpty, // 允许开发者覆盖默认
            }}
        >
            {value.map((item, index) => {
                return (
                    <div className={"case4"} {...componentProps} key={index}>
                        <span>#{index + 1}. </span>
                        <SchemaField
                            path={FormPath.parse(path).concat(index)}
                        />
                        <ArrayList.Remove
                            index={index}
                            onClick={() => mutators.remove(index)}
                        />
                        <ArrayList.MoveDown
                            index={index}
                            onClick={() => mutators.moveDown(index)}
                        />
                        <ArrayList.MoveUp
                            index={index}
                            onClick={() => mutators.moveUp(index)}
                        />
                    </div>
                );
            })}
            <ArrayList.Empty>
                {({ children }) => {
                    return (
                        <div
                            {...componentProps}
                            size="small"
                            className={`card-list-item card-list-empty`}
                            onClick={onAdd}
                        >
                            <div>{children}</div>
                        </div>
                    );
                }}
            </ArrayList.Empty>
            <ArrayList.Addition>
                {({ children, isEmpty }) => {
                    if (!isEmpty) {
                        return (
                            <div
                                className="array-cards-addition"
                                onClick={onAdd}
                            >
                                {children}
                            </div>
                        );
                    }
                }}
            </ArrayList.Addition>
        </ArrayList>
    );
};
ArrayCustom2.isFieldComponent = true;

const Case4Form = () => {
    return (
        <>
            <h2>自定义版本</h2>
            <SchemaForm components={{ ArrayCustom1, Input }}>
                <SchemaMarkupField
                    title="用户列表"
                    name="userList"
                    type="array"
                    default={[
                        { username: "morally", age: 20 },
                        { username: "joe", age: 21 },
                    ]}
                    x-component="ArrayCustom1"
                >
                    <SchemaMarkupField type="object">
                        <SchemaMarkupField
                            name="username"
                            x-component="Input"
                            title="用户名"
                        />
                        <SchemaMarkupField
                            name="age"
                            x-component="Input"
                            title="年龄"
                        />
                    </SchemaMarkupField>
                </SchemaMarkupField>
                <FormButtonGroup>
                    <Submit>提交</Submit>
                </FormButtonGroup>
            </SchemaForm>
            <Divider />
            <h2>使用ArrayList版本</h2>
            <SchemaForm components={{ ArrayCustom2, Input }}>
                <SchemaMarkupField
                    title="用户列表"
                    name="userList"
                    type="array"
                    default={[
                        { username: "morally", age: 20 },
                        { username: "joe", age: 21 },
                    ]}
                    x-component="ArrayCustom2"
                >
                    <SchemaMarkupField type="object">
                        <SchemaMarkupField
                            name="username"
                            x-component="Input"
                            title="用户名"
                        />
                        <SchemaMarkupField
                            name="age"
                            x-component="Input"
                            title="年龄"
                        />
                    </SchemaMarkupField>
                </SchemaMarkupField>
                <FormButtonGroup>
                    <Submit>提交</Submit>
                </FormButtonGroup>
            </SchemaForm>
        </>
    );
};

export default { component: Case4Form, markdown: "" };
