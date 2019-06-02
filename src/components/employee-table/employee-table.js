import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {Table, Divider, Button} from 'antd';

/**
 * Класс таблица для наших данных
 */
export default class EmployeeTable extends Component {

    render() {

        const { employeeData, onEdited, onDeleted } = this.props;

        const columns = [
            {
                title: 'Id',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Surname',
                dataIndex: 'surname',
                key: 'surname',
            },
            {
                title: 'Patronymic',
                dataIndex: 'patronymic',
                key: 'patronymic',
            },
            {
                title: 'Position',
                dataIndex: 'position',
                key: 'position',
            },
            {
                title: 'Action',
                key: 'action',
                render: (record) => (
                    <span>
                        <Button onClick={ () => onEdited(record.id) }>Edit</Button>
                        <Divider type="vertical"/>
                        <Button type="danger" onClick={ () => onDeleted(record.id) }>Delete</Button>
                    </span>
                ),
            },
        ];

        return (
            <Table rowKey="id" columns={columns} dataSource={employeeData}/>
        );
    }
}
