import { Person } from "../types/person";
import { Table } from "antd";

const TableComp = ({ columns, data }: { columns: any; data: Person[] }) => {
  return (
    <Table
      dataSource={data.map((person: Person) => ({
        ...person,
        key: person.id,
      }))}
      columns={columns}
      onRow={(rec) => {
        return {
          onDoubleClick: () => {},
        };
      }}
    />
  );
};

export default TableComp;
