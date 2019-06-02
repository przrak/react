import React, {Component} from 'react';
import ItemTable from '../employee-table';
import NetworkService from "../../services/network-service";
import CreateForm from "../form/form";
import {Button} from "antd"
import './app.css';

/**
 * Главный класс приложения
 * В нем хранитс наши данные из json, а так же в нем создается сервис для загрузки json
 */
export default class App extends Component {

    networkService = new NetworkService();

    state = {
        employeeData: [],
        visible: false
    };

    componentDidMount() {
        this.loadUsers();
    }

    loadUsers = () => {
        this.networkService
            .getAllEmployee()
            .then(this.onUsersLoaded)
            .catch(this.onLoadError)
    };

    onUsersLoaded = (users) => {
        this.setState({
            employeeData: users
        });
    };

    onLoadError = (err) => {
        console.log("error", err);
    };

    showModal = () => {
        this.setState({visible: true});
    };

    handleCancel = () => {
        const form = this.formRef.props.form;
        form.resetFields();
        this.setState({visible: false});
    };

    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            if (values['id'])
                this.editRecord(values);
            else
                this.addRecord(values);
            form.resetFields();
            this.setState({visible: false});
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    deleteRecord = (id) => {
        this.setState(({employeeData}) => {

            const idx = employeeData.findIndex((el) => el.id === id);
            const before = employeeData.slice(0, idx);
            const after = employeeData.slice(idx + 1);

            const newArray = [ ...before, ...after ];

            return {
                employeeData: newArray
            };
        });
    };

    addRecord = (values) => {
        const newRecord = this.createEmployee(values);

        this.setState(({employeeData}) => {
            const newArray = [ ...employeeData, newRecord ];

            return {
                employeeData: newArray
            }
        });
    };

    editRecord = (values) => {
        const newRecord = this.createEmployee(values, true);

        this.setState(({employeeData}) => {
            const idx = employeeData.findIndex((el) => el.id === values['id']);
            const before = employeeData.slice(0, idx);
            const after = employeeData.slice(idx + 1);

            const newArray = [...before, newRecord, ...after];

            return {
                employeeData: newArray
            }
        });
    };

    openEditRecordForm = (id) => {
        const {employeeData} = this.state;

        const idx = employeeData.findIndex((el) => el.id === id);
        const data = employeeData[idx];

        if (data) {
            const form = this.formRef.props.form;
            form.setFieldsValue({
                name: data['name'],
                surname: data['surname'],
                patronymic: data['patronymic'],
                position: data['position'],
                id: data['id']
            });
        }

        this.setState(() => {
            return {
                dataToEdit: data,
                isEditForm: true
            }
        });

        this.showModal();
    };
    openAddRecordForm = () => {
        this.setState(() => {
            return {
                isEditForm: false
            }
        });

        this.showModal();
    };

    createEmployee(values, exist = false) {
        const {employeeData} = this.state;
        const id = +employeeData[employeeData.length - 1]['id'];

        return {
            name: values['name'],
            surname: values['surname'],
            patronymic: values['patronymic'],
            position: values['position'],
            id: exist ? values['id'] : id + 1
        }
    }

    render() {

        const {employeeData, isEditForm} = this.state;

        return (
            <div className="my-app">
                <ItemTable onEdited={this.openEditRecordForm}
                           onDeleted={this.deleteRecord}
                           employeeData={employeeData}/>
                <Button type="primary"
                        onClick={this.openAddRecordForm}>
                    Add Item
                </Button>
                <CreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    isEditForm={isEditForm}
                />
            </div>
        );
    }
}
