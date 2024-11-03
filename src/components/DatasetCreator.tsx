import React, { useState } from 'react';
import { useDataStore } from '../store/dataStore';
import { DataField } from '../types/api';

export const DatasetCreator = () => {
  const connections = useDataStore((state) => state.connections);
  const createDataset = useDataStore((state) => state.createDataset);

  const [name, setName] = useState('');
  const [connectionId, setConnectionId] = useState('');
  const [fields, setFields] = useState<DataField[]>([]);

  const handleAddField = () => {
    setFields([...fields, { name: '', type: 'string', path: '' }]);
  };

  const handleFieldChange = (index: number, field: Partial<DataField>) => {
    const newFields = [...fields];
    newFields[index] = { ...newFields[index], ...field };
    setFields(newFields);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !connectionId || fields.length === 0) return;
    createDataset(name, connectionId, fields);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nombre del Dataset
        </label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Conexión API
        </label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={connectionId}
          onChange={(e) => setConnectionId(e.target.value)}
          required
        >
          <option value="">Seleccionar conexión</option>
          {connections.map((conn) => (
            <option key={conn.id} value={conn.id}>
              {conn.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Campos</h3>
          <button
            type="button"
            onClick={handleAddField}
            className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700"
          >
            + Agregar Campo
          </button>
        </div>

        {fields.map((field, index) => (
          <div key={index} className="space-y-2 p-4 border rounded-md">
            <input
              type="text"
              placeholder="Nombre del campo"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={field.name}
              onChange={(e) => handleFieldChange(index, { name: e.target.value })}
            />
            <select
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={field.type}
              onChange={(e) => handleFieldChange(index, { type: e.target.value as DataField['type'] })}
            >
              <option value="string">Texto</option>
              <option value="number">Número</option>
              <option value="date">Fecha</option>
              <option value="boolean">Booleano</option>
            </select>
            <input
              type="text"
              placeholder="Ruta del campo (ej: data.values[0].price)"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={field.path}
              onChange={(e) => handleFieldChange(index, { path: e.target.value })}
            />
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Crear Dataset
      </button>
    </form>
  );
};