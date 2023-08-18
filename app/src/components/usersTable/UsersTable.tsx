import { Table } from "react-bootstrap";
import InfiniteRows from "./InfiniteRows";
import { useEffect, useMemo, useState } from "react";
import { IUser, RandomUsers } from "../../RandomUsers/RandomUsers";
import { CSVLink } from "react-csv";

interface IUsersTableProps {
    region: string;
    mistakes: number;
    seed: number;
}

function UsersTable({ region, mistakes, seed }: IUsersTableProps) {
    const [users, setUsers] = useState<Array<IUser>>();

    const getMoreUsers = () => {
        setUsers((prev) => {
            if (prev) {
                return prev.concat(
                    new RandomUsers().updateUsers(
                        10,
                        region,
                        seed + prev.length,
                        mistakes,
                        prev.length
                    )
                );
            }
        });
    };

    useEffect(() => {
        setUsers(new RandomUsers().updateUsers(20, region, seed, mistakes, 0));
    }, [region, mistakes, seed]);

    const data = useMemo(() => users, [users]);
    const tableData = data?.map((user, i) => [i + 1, ...Object.values(user)]) || [];
    const csvData = [
        ["№", "ID", "Full name", "Address", "Phone number"],
        ...tableData
    ];

    return (
        <>
            <CSVLink data={csvData}>Download CSV</CSVLink>
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
                        {users?.map((user, i) => (
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
        </>
    );
}

export default UsersTable;
