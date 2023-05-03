import { create } from "zustand";
import axios from "axios";
import { Person } from "./types/person";

type PersonStore = {
  persons: Person[];
  loading: boolean;
  error: string | null;
  getPersons: () => Promise<void>;
  deletePerson: (id: number) => Promise<void>;
};

const URL = "http://localhost:3001/api/data";

const usePersonStore = create<PersonStore>((set) => ({
  persons: [],
  loading: false,
  error: null,
  getPersons: async () => {
    try {
      set({ loading: true });
      const resp = await axios.get(URL);
      const data = resp.data;
      set({ persons: data, error: null });
    } catch (err) {
      set({ error: err as string });
    } finally {
      set({ loading: false });
    }
  },
  deletePerson: async (id: number) => {
    try {
      await axios.delete(`${URL}/${id}`);
      set((state) => ({
        persons: state.persons.filter((person) => person.id !== id),
        error: null,
      }));
    } catch (err) {
      set({ error: err as string });
    }
  },
}));

export default usePersonStore;
