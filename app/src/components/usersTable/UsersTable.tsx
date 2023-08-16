import { Table } from "react-bootstrap";
import InfiniteRows from "./InfiniteRows";
import { useEffect, useMemo, useState } from "react";
import { getUsers } from "../../helpers/helpers";

interface IUsersTableProps {
    region: string;
}

function UsersTable({region}: IUsersTableProps) {
    const [users, setUsers] = useState(getUsers(20, region));

    const getMoreUsers = () => {
        setUsers((prev) => prev.concat(getUsers(10, region)));
    };

    useEffect(() => {
        setUsers(getUsers(20, region));
    }, [region]);

    const data = useMemo(() => users, [users]);

    return (
        <InfiniteRows getMoreUsers={getMoreUsers} users={data}>
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
        </InfiniteRows>
    );
}

export default UsersTable;
