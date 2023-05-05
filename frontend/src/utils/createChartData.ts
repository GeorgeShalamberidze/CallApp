import { Person } from "../types/person";
import City from "../types/cityCount";

const createChartData = (persons: Person[]) => {
  const citiesCount: City[] = Object.entries(
    persons.reduce((acc: { [key: string]: number }, cur: Person) => {
      const { city } = cur.address;
      if (city in acc) {
        acc[city] += 1;
      } else {
        acc[city] = 1;
      }
      return acc;
    }, {})
  ).map(([city, amount]) => ({ city, amount }));

  return citiesCount;
};
export default createChartData;
