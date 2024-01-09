import { NextPage } from "next";
import { OrganizationType, TimePerWeek } from '@prisma/client';
import { ColDef } from 'ag-grid-community';
import DataGrid, { SortingOptions } from 'components/dataGrid/index';
import SubMenu from 'components/layout/submenu';
import { trpc } from 'lib/client/trpc';
import { FilterOption } from 'lib/services/playground/schemas';
import React, { useCallback, useState } from 'react';
import { ApplicantEntry, RequestorEntry } from 'server/routers/playground/admin';
import { jsonCellEditor, jsonCellRenderer } from "components/dataGrid/renderer";

const Applicants: NextPage = () => {
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(0);
  const [sorting, setSorting] = useState<SortingOptions | null>(null);
  const [filters, setFilters] = useState<FilterOption[]>([]);
  const [search, setSearch] = useState('');

  const { data, refetch } = trpc.playground.admin.getApplicants.useQuery(
    { sort: sorting, pageSize, page: currentPage, filters, search },
    { keepPreviousData: true }
  );
  const { mutateAsync } = trpc.playground.admin.updateApplicant.useMutation();
  const columns: ColDef<ApplicantEntry>[] = [
    { field: 'id', hide: true },
    { field: 'name', headerName: 'Name' },
    { field: 'email', headerName: 'Email' },
    { field: 'applicantInformation.contactEmail', headerName: 'Contact Email' },
    { field: 'applicantInformation.contactLink', headerName: 'Contact Link' },
    { field: 'applicantInformation.socialMedia', headerName: 'Social Media', cellRenderer: jsonCellRenderer, cellEditor: jsonCellEditor, cellEditorPopup: true},
    { field: 'applicantInformation.availableTimePerWeek', headerName: 'Available Time Per Week', cellEditor: 'agSelectCellEditor', cellEditorParams: { values: Object.keys(TimePerWeek) }, },
    { field: 'applicantInformation.website', headerName: 'Portfolio' },
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
    <SubMenu title="Applicants" entries={[{ title: 'Requests', link: '/playground/admin' }, { title: 'Applications', link: '/playground/admin/applications' }, { title: 'Requestors', link: '/playground/admin/requestors' }, { title: 'Applicants', link: '', active: true }]}/>
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

export default Applicants;
