import { Modal, Form, Input, Select, FormInstance } from "antd";
import { Person } from "../types/person";

const { Option } = Select;

const ModalComp = ({
  isModalEdit,
  isAddModalVisible,
  handleSubmit,
  handleCancel,
  form,
}: {
  isModalEdit: boolean;
  isAddModalVisible: boolean;
  handleSubmit: () => void;
  handleCancel: () => void;
  form: FormInstance<Person>;
}) => {
  return (
    <Modal
      title={isModalEdit ? "Edit Person" : "Add Person"}
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
            name={["address", "street"]}
            rules={[{ required: true, message: "Street is required" }]}
            style={{ display: "inline-block", width: "calc(50% - 8px)" }}
            hasFeedback
          >
            <Input placeholder="Street..." />
          </Form.Item>
          <Form.Item
            name={["address", "city"]}
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
  );
};

export default ModalComp;
