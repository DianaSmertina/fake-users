import { Table } from "react-bootstrap";
import InfiniteTable from "./InfiniteRows";
import { useMemo, useState } from "react";
import { getUsers } from "../../helpers/helpers";

function UsersTable() {
    const [users, setUsers] = useState(getUsers(20));

    const getMoreUsers = () => {
        setUsers((prev) => prev.concat(getUsers(10)));
    };

    const data = useMemo(() => users, [users]);

    return (
        <InfiniteTable getMoreUsers={getMoreUsers} users={data}>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>ID</th>
                        <th>Full name</th>
                        <th>Address</th>
                        <th>Phone number</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, i) => (
                        <tr key={user.userId}>
                            <td>{i}</td>
                            <td>{user.userId}</td>
                            <td>{user.name}</td>
                            <td>{user.address}</td>
                            <td>{user.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </InfiniteTable>
    );
}

export default UsersTable;
