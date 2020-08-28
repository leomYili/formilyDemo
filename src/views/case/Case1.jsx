import React, { useState, useEffect } from "react";
import Printer from "@formily/printer";
import {
    SchemaForm,
    SchemaMarkupField,
    FormButtonGroup,
    Submit,
    createFormActions,
} from "@formily/antd";
import { Input, Table, Button } from "antd";

import list1 from "../../mock/list1.json";

const service = ({
    values,
    pagination = { page: 1, size: 10 },
    sorter = {},
    filters = {},
}) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(list1);
        }, 1000);
    }).then(({ results, info }) => {
        console.log(results);
        return {
            dataSource: results,
            pagination,
            total: 200,
        };
    });
};

const actions = createFormActions();

const Case = () => {
    const [dataSource, setDataSource] = useState([]);
    const [pagination, setPagination] = useState({});

    const handleSubmit = (data) => {
        console.log(data);

        service(data).then((result) => {
            setDataSource(result.dataSource);
            setPagination(result.pagination);
        });
    };

    const handleValidate = () => {
        const result = actions.validate();

        result
            .then((validateResp) => {
                const data = actions.getFormState((state) => state.values);
                handleSubmit(data);
            })
            .catch((error) => {
                console.warn(error);
            });
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            sorter: true,
            render: (name) => `${name.first} ${name.last}`,
            width: "20%",
        },
        {
            title: "Gender",
            dataIndex: "gender",
            filters: [
                { text: "Male", value: "male" },
                { text: "Female", value: "female" },
            ],
            width: "20%",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
    ];

    return (
        <>
            <Printer>
                <SchemaForm
                    actions={actions}
                    components={{ Input }}
                    inline
                    onSubmit={handleSubmit}
                >
                    <SchemaMarkupField
                        type="string"
                        name="name"
                        title="关键词"
                        x-component="Input"
                        x-rules={[
                            {
                                required: true,
                                message: "别名不可为空",
                            },
                            {
                                format: "number",
                                message: "id is not a number.",
                            },
                        ]}
                    />
                    <FormButtonGroup
                        style={{ marginTop: 4 }}
                        itemStyle={{ marginLeft: 20 }}
                    >
                        <Submit>查询</Submit>
                        <Button onClick={handleValidate}>自定义查询</Button>
                    </FormButtonGroup>
                </SchemaForm>
            </Printer>
            <Table
                columns={columns}
                pagination={pagination}
                dataSource={dataSource}
                rowKey={(record) => record.login.uuid}
            />
        </>
    );
};

export default { component: Case, markdown: `` };
