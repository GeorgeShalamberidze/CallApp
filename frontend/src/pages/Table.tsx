import { useState } from "react";
import { Button, Form, Space, Spin } from "antd";
import AntTable from "../components/AntTable";
import ModalComp from "../components/Modal";
import { Person } from "../types/person";
import usePersonStore from "../store/zustand.store";
import { DeleteOutlined } from "@ant-design/icons";
import { Address } from "../types/address";

const Table = ({ persons }: { persons: Person[] }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a: Person, b: Person) => a.id - b.id,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (address: Address, id: number) => (
        <>
          <p key={id}>
            {address?.street}, {address?.city}
          </p>
        </>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Actions",
      dataIndex: "id",
      key: "actions",
      render: (id: number) => (
        <Button
          type="primary"
          danger
          onClick={() => deletePerson(id)}
          icon={<DeleteOutlined />}
        >
          Delete
        </Button>
      ),
    },
  ];

  const { loading, error, deletePerson, createPerson, updatePerson } =
    usePersonStore();

  const handleCancel = () => {
    setIsAddModalVisible(false);
    setIsModalEdit(false);
  };

  const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
  const [isModalEdit, setIsModalEdit] = useState<boolean>(false);
  const [form] = Form.useForm<Person>();

  const handleAddButton = () => {
    form.resetFields();
    setIsModalEdit(false);
    setIsAddModalVisible(true);
  };

  const handleSubmit = () => {
    if (isModalEdit) {
      form
        .validateFields()
        .then((values: Person) => {
          const id = form.getFieldValue("id");
          const person = { ...values, id };
          updatePerson(person);
          setIsAddModalVisible(false);
          form.resetFields();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      form
        .validateFields()
        .then((values: any) => {
          const { street, city, ...rest } = values;
          const lastID = persons[persons.length - 1].id;
          const newData = {
            id: lastID + 1,
            ...rest,
            address: {
              street: values.address.street,
              city: values.address.city,
            },
          };
          createPerson(newData);
          setIsAddModalVisible(false);
          form.resetFields();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  if (loading) {
    return (
      <Space size="large">
        <Spin size="large" />
      </Space>
    );
  }

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {!loading && !error && (
        <div className="container">
          <div className="button_container">
            <Button
              type="primary"
              onClick={handleAddButton}
              style={{ marginRight: "50px" }}
            >
              Add Person
            </Button>
            <Button type="primary" href="/chart">
              Chart
            </Button>
          </div>
          <div className="table">
            <AntTable
              data={persons}
              columns={columns}
              setIsModalEdit={setIsModalEdit}
              setIsAddModalVisible={setIsAddModalVisible}
              form={form}
            />
          </div>
          <ModalComp
            isModalEdit={isModalEdit}
            isAddModalVisible={isAddModalVisible}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            form={form}
          />
        </div>
      )}
    </>
  );
};

export default Table;
