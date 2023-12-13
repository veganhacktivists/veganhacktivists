import React, { useCallback, useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

import type { CellValueChangedEvent, ColDef, PaginationChangedEvent, SortChangedEvent } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import SelectInput, { OptionType } from './forms/inputs/selectInput';

export interface SortingOptions {
  column: string;
  order: 'asc' | 'desc';
}

interface DataGridProps<T> {
  data: { total: number, content: T[] };
  columns: ColDef<T>[];
  onPaginationChange?: (page: number, pageSize: number) => void;
  onSortChange?: (sorting: SortingOptions | null) => void;
  onUpdate?: (column: string, data: T) => void;
  onDataChange?: (data: T[]) => void;
  defaultColDef?: ColDef<T>;
}

const pageSizeOptions: OptionType<number>[] = [
  { label: '20', value: 20 },
  { label: '50', value: 50 },
  { label: '100', value: 100 },
];

const DataGrid = <T,>({ data, columns, defaultColDef: _defaultColDef, onUpdate, onSortChange, onPaginationChange }: DataGridProps<T>) => {
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

  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);

  const handlePageSizeChanged = useCallback((pageSize?: number) => {
    if (!pageSize) return;
    setPageSize(pageSize);
    onPaginationChange?.(page, pageSize);
  }, [onPaginationChange, page]);



  return (
    <>
      <AgGridReact
        columnDefs={columns}
        rowData={data.content}
        defaultColDef={defaultColDef}
        onCellValueChanged={handleCellValueChanged}
        onSortChanged={handleSortChanged}
        gridOptions={{ domLayout: 'autoHeight' }}
        autoSizeStrategy={{ type: 'fitGridWidth' }}
        className="grid-wrapper ag-theme-quartz text-left"
      />
      <div className="flex justify-end my-2 mr-4">
        <div className="flex gap-1 items-center">
          <span className="mr-2">Page size:</span>
          <select value={pageSize} onChange={(e) => handlePageSizeChanged(Number(e.target.value))} className="w-16 bg-white border border-[#dddddd] rounded-md px-2">
            {pageSizeOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default DataGrid;
