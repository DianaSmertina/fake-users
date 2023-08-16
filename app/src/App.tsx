import { useState } from "react";
import ToolBar from "./components/toolBar/ToolBar";
import UsersTable from "./components/usersTable/UsersTable";

function App() {
    const [region, setRegion] = useState('en_US');
    const [mistakes, setMistakes] = useState(0);

    return (
        <>
            <ToolBar setRegion={setRegion} mistakes={mistakes} setMistakes={setMistakes} />
            <UsersTable region={region}/>
        </>
    );
}

export default App;
