import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {Modal, Form, Input} from 'antd';

/**
 *  Класс создания формы для добавления\редактирования данных
 */
const CreateForm = Form.create()(
    class extends Component {

        render() {
            const {visible, onCancel, onCreate, form, isEditForm} = this.props;
            const {getFieldDecorator} = form;
            const title = isEditForm === true ? "Edit form" : "Add form";

            return (
                <Modal
                    visible={visible}
                    title={title}
                    okText="Save"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="Name">
                            {getFieldDecorator('name', {
                                rules: [{required: true, message: 'Please input the name!'}],
                            })(<Input type="text"/>)}
                        </Form.Item>
                        <Form.Item label="Surname">
                            {getFieldDecorator('surname', {
                                rules: [{required: true, message: 'Please input the surname!'}],
                            })(<Input type="text"/>)}
                        </Form.Item>
                        <Form.Item label="Patronymic">
                            {getFieldDecorator('patronymic', {
                                rules: [{required: true, message: 'Please input the patronymic!'}],
                            })(<Input type="text"/>)}
                        </Form.Item>
                        <Form.Item label="Position">
                            {getFieldDecorator('position', {
                                rules: [{required: true, message: 'Please input the position!'}],
                            })(<Input type="text"/>)}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('id', {
                                rules: [{required: false, message: 'Please input the id!'}],
                            })(<Input type="hidden"/>)}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    },
);

export default CreateForm;