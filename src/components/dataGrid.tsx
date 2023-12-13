import React, { useCallback, useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

import type { CellValueChangedEvent, ColDef, FilterChangedEvent, PaginationChangedEvent, SortChangedEvent } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { OptionType } from './forms/inputs/selectInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { FilterOption  } from 'lib/services/playground/schemas';



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
  onFilterChange?: (filter: FilterOption[]) => void;
  defaultColDef?: ColDef<T>;
}

const pageSizeOptions: OptionType<number>[] = [
  { label: '20', value: 20 },
  { label: '50', value: 50 },
  { label: '100', value: 100 },
];

const DataGrid = <T,>({ data, columns, defaultColDef: _defaultColDef, onUpdate, onSortChange, onPaginationChange, onFilterChange }: DataGridProps<T>) => {
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

  const [pageSize, setPageSize] = useState(20);
  const [page, setPage] = useState(0);


  const paginationData = useMemo(() => {
    const start = page * pageSize + 1;
    const lastPage = Math.ceil(data.total / pageSize);
    return {
      start,
      end: Math.min(start + pageSize - 1, data.total),
      maxPage: lastPage,
      isFirstPage: page === 0,
      isLastPage: page === lastPage - 1,
    }

  }, [pageSize, page, data]);
  const handlePageSizeChanged = useCallback((pageSize?: number) => {
    if (!pageSize || pageSize < 0) return;
    setPageSize(pageSize);
    onPaginationChange?.(page, pageSize);
  }, [onPaginationChange, page]);

  const handlePageChanged = useCallback((page: number) => {
    if (page < 0 || page >= paginationData.maxPage) return;
    setPage(page);
    onPaginationChange?.(page, pageSize);
  }, [onPaginationChange, pageSize]);

  const handleFilterChanged = useCallback((e: FilterChangedEvent) => {
    const settings = e.api.getFilterModel();
    const filters: FilterOption[] = Object.entries(settings).map(([column, filter]) => ({ column, filter }));
    onFilterChange?.(filters);
  }, [onFilterChange]);


  return (
    <>
      <AgGridReact
        columnDefs={columns}
        rowData={data.content}
        defaultColDef={defaultColDef}
        onCellValueChanged={handleCellValueChanged}
        onSortChanged={handleSortChanged}
        onFilterChanged={handleFilterChanged}
        gridOptions={{ domLayout: 'autoHeight' }}
        autoSizeStrategy={{ type: 'fitGridWidth' }}
        className="grid-wrapper ag-theme-quartz text-left"
      />
      <div className="flex justify-end my-2 mr-8 gap-8">
        <div className="flex gap-1 items-center">
          <span className="mr-2">Page size:</span>
          <select value={pageSize} onChange={(e) => handlePageSizeChanged(Number(e.target.value))} className="w-16 bg-white border border-[#dddddd] rounded-md px-2">
            {pageSizeOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center">
          <span>{paginationData.start} - {paginationData.end} of {data.total}</span>
        </div>
        <div className="flex items-center gap-3">
          <button className={classNames('p-1 cursor-pointer', { 'opacity-30': paginationData.isFirstPage})} disabled={paginationData.isFirstPage}><FontAwesomeIcon icon={faChevronLeft} onClick={() => handlePageChanged(page-1)} /></button>
          <span>Page {page + 1} of {paginationData.maxPage}</span>
          <button className={classNames('p-1 cursor-pointer', { 'opacity-30': paginationData.isLastPage})} disabled={paginationData.isLastPage}><FontAwesomeIcon icon={faChevronRight} onClick={() => handlePageChanged(page+1)} /></button>
        </div>
      </div>
    </>
  );
};

export default DataGrid;
