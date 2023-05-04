import { useEffect, useState } from "react";
import usePersonStore from "./zustand.store";
import { Person } from "./types/person";
import { Spin, Space, Button, Modal, Form, Input, Select } from "antd";
import { Address } from "./types/address";
import TableComp from "./components/Table";
import { DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;

const App = () => {
  const {
    persons,
    loading,
    getPersons,
    deletePerson,
    createPerson,
    updatePerson,
  } = usePersonStore();
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
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
  }, []);

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values: any) => {
        const { street, city, ...rest } = values;
        const lastID = persons[persons.length - 1].id;
        const newData = {
          ...rest,
          address: { street, city },
          id: lastID + 1,
        };
        createPerson(newData);
        setIsAddModalVisible(false);
        form.resetFields();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCancel = () => {
    setIsAddModalVisible(false);
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
        <Button type="primary" onClick={() => setIsAddModalVisible(true)}>
          Add Person
        </Button>
      </div>
      <div className="table">
        <TableComp data={persons} columns={columns} form={form} />
      </div>

      {/* Test Modal */}
      <Modal
        title="Add Person"
        open={isAddModalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <Form labelCol={{ span: 6 }} style={{ maxWidth: 500 }} form={form}>
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: "Name is required" }]}
            hasFeedback
          >
            <Input placeholder="Name..." />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Please enter valid email" },
            ]}
            hasFeedback
          >
            <Input placeholder="Email..." />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[
              { required: true, message: "Gender is required" },
              { min: 3 },
            ]}
            hasFeedback
          >
            <Select placeholder="Select Gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Address" style={{ marginBottom: 0 }}>
            <Form.Item
              name="street"
              rules={[{ required: true, message: "Street is required" }]}
              style={{ display: "inline-block", width: "calc(50% - 8px)" }}
              hasFeedback
            >
              <Input placeholder="Street..." />
            </Form.Item>
            <Form.Item
              name="city"
              rules={[{ required: true, message: "City is required" }]}
              hasFeedback
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
                margin: "0 0 0 15px",
              }}
            >
              <Input placeholder="City..." />
            </Form.Item>
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
            hasFeedback
          >
            <Input style={{ width: "100%" }} placeholder="Phone number..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default App;
