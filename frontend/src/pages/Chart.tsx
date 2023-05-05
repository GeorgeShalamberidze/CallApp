import { Pie } from "@ant-design/plots";
import { Button } from "antd";
import City from "../types/cityCount";
import { useEffect } from "react";
import usePersonStore from "../store/zustand.store";

const Chart = ({ chartData }: { chartData: City[] }) => {
  const { persons } = usePersonStore();

  useEffect(() => {
    console.log("Chart data changed:", chartData);
  }, [chartData, persons]);

  const config = {
    appendPadding: 10,
    angleField: "amount",
    colorField: "city",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: (data: any): string => {
        // { city: string, amount: number, percent: number } as type doesnt work
        const { percent } = data;
        return `${(percent * 100).toFixed(0)}%`;
      },
      style: {
        fontSize: 18,
        textAlign: "center",
      },
    },
  };

  return (
    <div style={{ width: "600px", height: "600px" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button type="primary" href="/">
          Back to Table
        </Button>
      </div>
      <Pie {...config} data={chartData} />
    </div>
  );
};

export default Chart;
