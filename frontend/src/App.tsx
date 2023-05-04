import { useEffect, useState } from "react";
import usePersonStore from "./store/zustand.store";
import { Person } from "./types/person";
import { Spin, Space, Button, Form } from "antd";
import { Address } from "./types/address";
import TableComp from "./components/Table";
import { DeleteOutlined } from "@ant-design/icons";
import ModalComp from "./components/Modal";

const App = () => {
  const {
    persons,
    loading,
    getPersons,
    deletePerson,
    createPerson,
    updatePerson,
  } = usePersonStore();
  const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
  const [isModalEdit, setIsModalEdit] = useState<boolean>(false);
  const [form] = Form.useForm<Person>();

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

  useEffect(() => {
    getPersons();
  }, [getPersons]);

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
            ...rest,
            address: {
              street: values.address.street,
              city: values.address.city,
            },
            id: lastID + 1,
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

  const handleAddButton = () => {
    form.resetFields();
    setIsModalEdit(false);
    setIsAddModalVisible(true);
  };

  const handleCancel = () => {
    setIsAddModalVisible(false);
    setIsModalEdit(false);
  };

  if (loading) {
    return (
      <Space size="large">
        <Spin size="large" />
      </Space>
    );
  }

  return (
    <div className="container">
      <div className="button_container">
        <Button type="primary" onClick={handleAddButton}>
          Add Person
        </Button>
      </div>
      <div className="table">
        <TableComp
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
  );
};

export default App;
