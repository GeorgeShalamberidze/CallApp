import { useState, useEffect } from "react";
import { Person } from "../types/person";
import { Table, Modal, Form, FormInstance, Input } from "antd";
import usePersonStore from "../zustand.store";

const TableComp = ({
  columns,
  data,
  form,
}: {
  columns: any;
  data: Person[];
  form: FormInstance<Person>;
}) => {
  const [activePerson, setActivePerson] = useState<any>(null);
  const [isUpdateModalVisible, setIsUpdateModalVisible] =
    useState<boolean>(false);
  const { updatePerson } = usePersonStore();

  useEffect(() => {
    form.setFieldsValue(activePerson);
  }, [activePerson, form]);

  const handleUpdate = () => {
    form
      .validateFields()
      .then((values: any) => {
        console.log(values);
        // updatePerson(newData)
        // setIsUpdateModalVisible(false);
        form.resetFields();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Table
        dataSource={data.map((person: Person, i: number) => ({
          ...person,
          key: i,
        }))}
        columns={columns}
        onRow={(rec: Person) => {
          return {
            onDoubleClick: () => {
              setActivePerson(rec);
              setIsUpdateModalVisible(true);
            },
          };
        }}
      />
      <Modal
        title="Update Person"
        open={isUpdateModalVisible}
        onCancel={() => setIsUpdateModalVisible(false)}
        onOk={handleUpdate}
      >
        <Form labelCol={{ span: 6 }} style={{ maxWidth: 500 }} form={form}>
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TableComp;
