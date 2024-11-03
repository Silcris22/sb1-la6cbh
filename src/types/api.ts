export interface ApiConnection {
  id: string;
  name: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  refreshInterval?: number;
  lastUpdate?: Date;
}

export interface DataField {
  name: string;
  type: 'string' | 'number' | 'date' | 'boolean';
  path: string;
  format?: string;
}

export interface Dataset {
  id: string;
  name: string;
  connection: ApiConnection;
  fields: DataField[];
  data: any[];
}