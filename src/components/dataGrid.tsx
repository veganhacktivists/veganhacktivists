import React from 'react';
import { AgGridReact } from 'ag-grid-react';

import type { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

interface DataGridProps<T> {
  data: T[];
  columns: ColDef<T>[];
  onPaginationChange?: (page: number, pageSize: number) => void;
  onSortChange?: (sort: string, order: string) => void;
  onUpdate?: (data: T) => void;
  onDataChange?: (data: T[]) => void;
}

const DataGrid = <T,>({ data, columns }: DataGridProps<T>) => {
  return (
    <AgGridReact
      rowData={data}
      columnDefs={columns}
      gridOptions={{ domLayout: 'autoHeight' }}
      className="ag-theme-quartz h-full w-full"
    />
  );
};

export default DataGrid;
