import { Person } from "../types/person";
import { Table, FormInstance } from "antd";

const TableComp = ({
  columns,
  data,
  setIsModalEdit,
  setIsAddModalVisible,
  form,
}: {
  columns: any;
  data: Person[];
  setIsModalEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  form: FormInstance<Person>;
}) => {
  return (
    <>
      <Table
        dataSource={data.map((person: Person, i: number) => ({
          ...person,
          key: i,
        }))}
        columns={columns}
        onRow={(data: Person) => {
          return {
            onDoubleClick: () => {
              setIsAddModalVisible(true);
              setIsModalEdit(true);
              form.setFieldsValue({ ...data, id: data.id });
            },
          };
        }}
      />
    </>
  );
};

export default TableComp;
