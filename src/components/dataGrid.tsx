import React, { useCallback, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';

import type { CellValueChangedEvent, ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

interface DataGridProps<T> {
  data: T[];
  columns: ColDef<T>[];
  onPaginationChange?: (page: number, pageSize: number) => void;
  onSortChange?: (sort: string, order: string) => void;
  onUpdate?: (column: string, data: T) => void;
  onDataChange?: (data: T[]) => void;
  defaultColDef?: ColDef<T>;
}

const DataGrid = <T,>({ data, columns, defaultColDef: _defaultColDef, onUpdate }: DataGridProps<T>) => {
  const defaultColDef: ColDef<T> = useMemo(() => {
    if (_defaultColDef) return _defaultColDef;
    return {
      flex: 1,
      editable: true,
    };
  }, [_defaultColDef]);


  const handleCellValueChanged = useCallback((e: CellValueChangedEvent) => {
    onUpdate?.(e.column.getColId(), e.data);
  }, [onUpdate]);

  return (
    <AgGridReact
      rowData={data}
      columnDefs={columns}
      defaultColDef={defaultColDef}
      onCellValueChanged={handleCellValueChanged}
      gridOptions={{ domLayout: 'autoHeight' }}
      autoSizeStrategy={{ type: 'fitGridWidth' }}
      className="grid-wrapper ag-theme-quartz text-left"
    />
  );
};

export default DataGrid;
