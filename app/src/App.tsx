import { useState } from "react";
import ToolBar from "./components/toolBar/ToolBar";
import UsersTable from "./components/usersTable/UsersTable";

function App() {
    const [region, setRegion] = useState('en_US');

    return (
        <>
            <ToolBar setRegion={setRegion} />
            <UsersTable region={region}/>
        </>
    );
}

export default App;
