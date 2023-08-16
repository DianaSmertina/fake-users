import { faker } from "@faker-js/faker";
import UsersTable from "./components/usersTable/UsersTable";

function App() {
    const randomName = faker.person.fullName();
    return (
        <>
            {`Hi, ${randomName}!`}
            <UsersTable />
        </>
    );
}

export default App;
