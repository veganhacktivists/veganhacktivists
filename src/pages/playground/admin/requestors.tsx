import { NextPage } from "next";
import { OrganizationType } from '@prisma/client';
import { ColDef } from 'ag-grid-community';
import DataGrid, { SortingOptions } from 'components/dataGrid/index';
import SubMenu from 'components/layout/submenu';
import { trpc } from 'lib/client/trpc';
import { FilterOption } from 'lib/services/playground/schemas';
import React, { useCallback, useState } from 'react';
import { RequestorEntry } from 'server/routers/playground/admin';

const Requestors: NextPage = () => {
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(0);
  const [sorting, setSorting] = useState<SortingOptions | null>(null);
  const [filters, setFilters] = useState<FilterOption[]>([]);
  const [search, setSearch] = useState('');

  const { data, refetch } = trpc.playground.admin.getRequestors.useQuery(
    { sort: sorting, pageSize, page: currentPage, filters, search },
    { keepPreviousData: true }
  );
  const { mutateAsync } = trpc.playground.admin.updateRequestor.useMutation();
  const columns: ColDef<RequestorEntry>[] = [
    { field: 'id', hide: true },
    { field: 'name', headerName: 'Name' },
    { field: 'email', headerName: 'Email' },
    { field: 'requestorInformation.contactEmail', headerName: 'Contact Email' },
    { field: 'requestorInformation.contactLink', headerName: 'Contact Link' },
    { field: 'organization.name', headerName: 'Organization' },
    { field: 'organization.website', headerName: 'Organization Website' },
    { field: 'organization.type', headerName: 'Organization Type', cellEditor: 'agSelectCellEditor', cellEditorParams: { values: Object.keys(OrganizationType) }, },
    { field: 'organization.description', headerName: 'Organization Description' },
  ];

  const handleValueChange = useCallback(
    async (data: RequestorEntry) => {
      await mutateAsync(data);
      await refetch();
    },
    [refetch]
  );

  const handlePaginationChange = useCallback(
    (page: number, pageSize: number) => {
      setCurrentPage(page);
      setPageSize(pageSize);
    },
    []
  );

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <SubMenu title="Requestors" entries={[{ title: 'Requests', link: '/playground/admin' }, { title: 'Applications', link: '/playground/admin/applications' }, { title: 'Requestors', link: '', active: true }, { title: 'Applicants', link: '/playground/admin/applicants' }]}/>
    <div className="w-full h-full">
      <DataGrid
        data={data}
        columns={columns}
        onUpdate={handleValueChange}
        onSortChange={setSorting}
        onPaginationChange={handlePaginationChange}
        onFilterChange={setFilters}
        onSearchChange={setSearch}
      />
    </div>
    </>
  );
};

export default Requestors;
