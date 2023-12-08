import { useTable } from "@refinedev/core";

const Users = () => {
  const { tableQueryResult } = useTable();
    if (tableQueryResult?.isLoading) {
    return <div>Loading...</div>;
  }
  const users = tableQueryResult?.data?.data ?? [];
  console.log(users);
  return (
    <div>
      <h1>Posts</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Nachname</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
