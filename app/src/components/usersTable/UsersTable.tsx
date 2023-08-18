import { Container, Table } from "react-bootstrap";
import InfiniteRows from "./InfiniteRows";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { IUser, RandomUsers } from "../../RandomUsers/RandomUsers";

interface IUsersTableProps {
    region: string;
    mistakes: number;
    seed: number;
    setCsvData: Dispatch<SetStateAction<Array<Array<string>> | []>>;
}

function UsersTable({
    region,
    mistakes,
    seed,
    setCsvData,
}: IUsersTableProps) {
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

    useEffect(() => {
        const tableData = data?.map((user, i) => [i + 1, ...Object.values(user)]) || [];
        setCsvData([
            ["№", "ID", "Full name", "Address", "Phone number"],
            ...tableData,
        ]);
    }, [data, setCsvData]);

    return (
        <Container className="flex align-items-center justify-content-center mt-3">
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
        </Container>
    );
}

export default UsersTable;
