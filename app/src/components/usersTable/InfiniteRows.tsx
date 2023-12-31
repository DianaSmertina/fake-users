import InfiniteScroll from "react-infinite-scroll-component";
import { IUser } from "../../RandomUsers/RandomUsers";

interface IInfiniteTableProps {
    getMoreUsers: () => void;
    users: Array<IUser> | undefined;
    children: React.ReactNode;
}

function InfiniteTable({ getMoreUsers, users, children }: IInfiniteTableProps) {
    return (
        <InfiniteScroll
            dataLength={users?.length || 0}
            next={getMoreUsers}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            endMessage={
                <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
        >
            {children}
        </InfiniteScroll>
    );
}

export default InfiniteTable;
