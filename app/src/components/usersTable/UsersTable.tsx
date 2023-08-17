import { Table } from "react-bootstrap";
import InfiniteRows from "./InfiniteRows";
import { useEffect, useMemo, useState } from "react";
import { RandomUsers } from "../../helpers/helpers";

interface IUsersTableProps {
    region: string;
    mistakes: number;
    seed: number;
}

function UsersTable({ region, mistakes, seed }: IUsersTableProps) {
    const [users, setUsers] = useState(new RandomUsers().updateUsers(20, region, seed));

    const getMoreUsers = () => {
        setUsers((prev) =>
            prev.concat(new RandomUsers().updateUsers(10, region, seed + prev.length))
        );
    };

    useEffect(() => {
        setUsers(new RandomUsers().updateUsers(20, region, seed));
    }, [region, mistakes, seed]);

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
                            <td>{i + 1}</td>
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
