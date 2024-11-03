import { create } from 'zustand';
import { ApiConnection, Dataset, DataField } from '../types/api';
import axios from 'axios';

interface DataState {
  connections: ApiConnection[];
  datasets: Dataset[];
  activeDataset: string | null;
  isLoading: boolean;
  error: string | null;
  addConnection: (connection: ApiConnection) => Promise<void>;
  removeConnection: (id: string) => void;
  fetchData: (connectionId: string) => Promise<void>;
  createDataset: (name: string, connectionId: string, fields: DataField[]) => void;
  setActiveDataset: (id: string | null) => void;
}

export const useDataStore = create<DataState>((set, get) => ({
  connections: [],
  datasets: [],
  activeDataset: null,
  isLoading: false,
  error: null,

  addConnection: async (connection) => {
    try {
      set({ isLoading: true, error: null });
      // Validate connection by making a test request
      await axios({
        method: connection.method,
        url: connection.url,
        headers: connection.headers,
        data: connection.body,
      });

      set((state) => ({
        connections: [...state.connections, connection],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Error al conectar con la API', isLoading: false });
    }
  },

  removeConnection: (id) => {
    set((state) => ({
      connections: state.connections.filter((conn) => conn.id !== id),
      datasets: state.datasets.filter((ds) => ds.connection.id !== id),
    }));
  },

  fetchData: async (connectionId) => {
    const connection = get().connections.find((c) => c.id === connectionId);
    if (!connection) return;

    try {
      set({ isLoading: true, error: null });
      const response = await axios({
        method: connection.method,
        url: connection.url,
        headers: connection.headers,
        data: connection.body,
      });

      set((state) => ({
        datasets: state.datasets.map((ds) =>
          ds.connection.id === connectionId
            ? { ...ds, data: response.data, lastUpdate: new Date() }
            : ds
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Error al obtener datos de la API', isLoading: false });
    }
  },

  createDataset: (name, connectionId, fields) => {
    const connection = get().connections.find((c) => c.id === connectionId);
    if (!connection) return;

    const newDataset: Dataset = {
      id: crypto.randomUUID(),
      name,
      connection,
      fields,
      data: [],
    };

    set((state) => ({
      datasets: [...state.datasets, newDataset],
    }));

    get().fetchData(connectionId);
  },

  setActiveDataset: (id) => {
    set({ activeDataset: id });
  },
}));