import { useEffect, useState } from "react";
import usePersonStore from "./zustand.store";
import { Person } from "./types/person";
import { Spin, Space, Button, Modal } from "antd";
import { Address } from "./types/address";
import TableComp from "./components/Table";
import { DeleteOutlined } from "@ant-design/icons";

const App = () => {
  const { persons, loading, error, getPersons, deletePerson } =
    usePersonStore();
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

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

  const handleAddOk = () => {
    setIsAddModalVisible(false);
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
        <TableComp data={persons} columns={columns} />
      </div>

      {/* Test Modal */}
      <Modal
        title="Add Person"
        open={isAddModalVisible}
        onOk={handleAddOk}
        onCancel={handleCancel}
      >
        <h1>WTF</h1>
      </Modal>
    </div>
  );
};

export default App;
