import DataGrid from 'components/dataGrid';
import { trpc } from 'lib/client/trpc';

import type { NextPage } from 'next';
import type { ColDef } from 'ag-grid-community';

const Applications: NextPage = () => {
  const { data } = trpc.playground.admin.allApplications.useQuery();
  if (!data) {
    return <div>Loading...</div>;
  }
  type Data = typeof data[number];
  const columns: ColDef<Data>[] = [
    { field: 'id', hide: true },
    { field: 'name', headerName: 'Name' },
    { field: 'request.title', headerName: 'Request Title' },
  ];

  return <DataGrid data={data} columns={columns} />;
};

export default Applications;
