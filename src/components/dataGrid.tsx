import React, { useCallback, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';

import type { CellValueChangedEvent, ColDef, SortChangedEvent } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

export interface SortingOptions {
  column: string;
  order: 'asc' | 'desc';
}

interface DataGridProps<T> {
  data: T[];
  columns: ColDef<T>[];
  onPaginationChange?: (page: number, pageSize: number) => void;
  onSortChange?: (sorting: SortingOptions | null) => void;
  onUpdate?: (column: string, data: T) => void;
  onDataChange?: (data: T[]) => void;
  defaultColDef?: ColDef<T>;
}

const DataGrid = <T,>({ data, columns, defaultColDef: _defaultColDef, onUpdate, onSortChange }: DataGridProps<T>) => {
  const defaultColDef: ColDef<T> = useMemo(() => {
    if (_defaultColDef) return _defaultColDef;
    return {
      flex: 1,
      editable: true,
      comparator: () => 0,
    };
  }, [_defaultColDef]);


  const handleCellValueChanged = useCallback((e: CellValueChangedEvent) => {
    onUpdate?.(e.column.getColId(), e.data);
  }, [onUpdate]);

  const handleSortChanged = useCallback((e: SortChangedEvent) => {
    //@ts-ignore
    const sorting = e.api.sortController.getSortModel();
    onSortChange?.(sorting[0] ? { column: sorting[0].colId, order: sorting[0].sort } : null);
  }, [onSortChange]);

  return (
    <AgGridReact
      rowData={data}
      columnDefs={columns}
      defaultColDef={defaultColDef}
      onCellValueChanged={handleCellValueChanged}
      onSortChanged={handleSortChanged}
      gridOptions={{ domLayout: 'autoHeight' }}
      autoSizeStrategy={{ type: 'fitGridWidth' }}
      className="grid-wrapper ag-theme-quartz text-left"
    />
  );
};

export default DataGrid;
