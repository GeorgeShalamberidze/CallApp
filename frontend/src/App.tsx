import { useEffect, useState } from "react";
import usePersonStore from "./store/zustand.store";
import Table from "./pages/Table";
import { Route, Routes } from "react-router-dom";
import Chart from "./pages/Chart";
import City from "./types/cityCount";
import createChartData from "./utils/createChartData";

const App = () => {
  const { getPersons, persons } = usePersonStore();
  const [chartData, setChartData] = useState<City[]>([]);

  useEffect(() => {
    getPersons();
  }, []);

  useEffect(() => {
    setChartData(createChartData(persons));
  }, [persons]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Table persons={persons} />} />
        <Route path="/chart" element={<Chart chartData={chartData} />} />
      </Routes>
    </>
  );
};

export default App;
