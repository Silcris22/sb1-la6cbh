import React from 'react';
import { Database, BarChart3, LineChart, Filter, Table2 } from 'lucide-react';
import { useDataStore } from '../store/dataStore';

export const Sidebar = () => {
  const connections = useDataStore((state) => state.connections);
  const datasets = useDataStore((state) => state.datasets);
  const setActiveDataset = useDataStore((state) => state.setActiveDataset);
  const activeDataset = useDataStore((state) => state.activeDataset);

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Panel de Datos</h2>
        <div className="space-y-4">
          <SidebarSection icon={<Database size={18} />} title="Conexiones API">
            <div className="pl-6 space-y-2">
              {connections.length === 0 ? (
                <p className="text-sm text-gray-600">Sin conexiones</p>
              ) : (
                connections.map((conn) => (
                  <div key={conn.id} className="text-sm text-gray-700">
                    {conn.name}
                  </div>
                ))
              )}
            </div>
          </SidebarSection>
          
          <SidebarSection icon={<Table2 size={18} />} title="Datasets">
            <div className="pl-6 space-y-2">
              {datasets.length === 0 ? (
                <p className="text-sm text-gray-600">Sin datasets</p>
              ) : (
                datasets.map((dataset) => (
                  <button
                    key={dataset.id}
                    className={`text-sm w-full text-left px-2 py-1 rounded ${
                      activeDataset === dataset.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveDataset(dataset.id)}
                  >
                    {dataset.name}
                  </button>
                ))
              )}
            </div>
          </SidebarSection>
          
          <SidebarSection icon={<BarChart3 size={18} />} title="Visualizaciones">
            <div className="pl-6 space-y-2">
              <p className="text-sm text-gray-600">Gráficos disponibles:</p>
              <ul className="text-sm text-gray-700">
                <li>• Líneas</li>
                <li>• Barras</li>
                <li>• Dispersión</li>
                <li>• Área</li>
                <li>• Pastel</li>
              </ul>
            </div>
          </SidebarSection>
          
          <SidebarSection icon={<Filter size={18} />} title="Filtros">
            <div className="pl-6 space-y-2">
              {activeDataset ? (
                <p className="text-sm text-gray-700">
                  Configure filtros para el dataset actual
                </p>
              ) : (
                <p className="text-sm text-gray-600">
                  Seleccione un dataset para configurar filtros
                </p>
              )}
            </div>
          </SidebarSection>
        </div>
      </div>
    </div>
  );
};

const SidebarSection = ({ 
  icon, 
  title, 
  children 
}: { 
  icon: React.ReactNode; 
  title: string; 
  children: React.ReactNode;
}) => (
  <div>
    <div className="flex items-center space-x-2 text-gray-700 mb-2">
      {icon}
      <span className="font-medium">{title}</span>
    </div>
    {children}
  </div>
);