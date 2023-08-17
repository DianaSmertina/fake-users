import { useState } from "react";
import ToolBar from "./components/toolBar/ToolBar";
import UsersTable from "./components/usersTable/UsersTable";

function App() {
    const [region, setRegion] = useState('en_US');
    const [mistakes, setMistakes] = useState(0);
    const [seed, setSeed] = useState(0);

    return (
        <>
            <ToolBar setRegion={setRegion} mistakes={mistakes} setMistakes={setMistakes} seed={seed} setSeed={setSeed} />
            <UsersTable region={region} mistakes={mistakes} seed={seed}/>
        </>
    );
}

export default App;
