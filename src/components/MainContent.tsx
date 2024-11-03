import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { useDataStore } from '../store/dataStore';
import { ApiConnectionForm } from './ApiConnectionForm';
import { DatasetCreator } from './DatasetCreator';

export const MainContent = () => {
  const [activeTab, setActiveTab] = useState('connections');
  const datasets = useDataStore((state) => state.datasets);
  const activeDataset = useDataStore((state) => state.activeDataset);
  const fetchData = useDataStore((state) => state.fetchData);

  const currentDataset = datasets.find((ds) => ds.id === activeDataset);

  useEffect(() => {
    if (currentDataset?.connection.refreshInterval) {
      const interval = setInterval(() => {
        fetchData(currentDataset.connection.id);
      }, currentDataset.connection.refreshInterval);

      return () => clearInterval(interval);
    }
  }, [currentDataset, fetchData]);

  const renderContent = () => {
    switch (activeTab) {
      case 'connections':
        return (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Nueva Conexión API</h2>
            <ApiConnectionForm />
          </div>
        );
      case 'datasets':
        return (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Crear Dataset</h2>
            <DatasetCreator />
          </div>
        );
      case 'visualization':
        if (!currentDataset) {
          return (
            <div className="text-center text-gray-500 mt-8">
              Seleccione un dataset para visualizar
            </div>
          );
        }

        return (
          <Plot
            data={[
              {
                type: 'scatter',
                mode: 'lines+markers',
                x: currentDataset.data.map((d: any) => 
                  new Date(d[currentDataset.fields[0].path]).getTime()
                ),
                y: currentDataset.data.map((d: any) => 
                  d[currentDataset.fields[1].path]
                ),
                name: currentDataset.name,
              },
            ]}
            layout={{
              title: currentDataset.name,
              autosize: true,
              height: 500,
              xaxis: {
                title: currentDataset.fields[0].name,
                type: 'date',
              },
              yaxis: {
                title: currentDataset.fields[1].name,
              },
            }}
            useResizeHandler={true}
            style={{ width: '100%', height: '100%' }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 p-4">
      <div className="bg-white rounded-lg shadow-sm h-full">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-4 px-4">
            <TabButton 
              active={activeTab === 'connections'} 
              onClick={() => setActiveTab('connections')}
              text="Conexiones API"
            />
            <TabButton 
              active={activeTab === 'datasets'} 
              onClick={() => setActiveTab('datasets')}
              text="Datasets"
            />
            <TabButton 
              active={activeTab === 'visualization'} 
              onClick={() => setActiveTab('visualization')}
              text="Visualización"
            />
          </nav>
        </div>
        
        <div className="p-4">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

const TabButton = ({ 
  active, 
  onClick, 
  text 
}: { 
  active: boolean; 
  onClick: () => void; 
  text: string;
}) => (
  <button
    className={`px-4 py-2 font-medium text-sm ${
      active 
        ? 'border-b-2 border-blue-500 text-blue-600' 
        : 'text-gray-500 hover:text-gray-700'
    }`}
    onClick={onClick}
  >
    {text}
  </button>
);