import { useState } from "react";
import ToolBar from "./components/toolBar/ToolBar";
import UsersTable from "./components/usersTable/UsersTable";
import { Container } from "react-bootstrap";

function App() {
    const [region, setRegion] = useState('en_US');
    const [mistakes, setMistakes] = useState(0);
    const [seed, setSeed] = useState(0);
    const [csvData, setCsvData] = useState<Array<Array<string>>>([]);

    return (
        <Container>
            <ToolBar setRegion={setRegion} mistakes={mistakes} setMistakes={setMistakes} seed={seed} setSeed={setSeed} csvData={csvData} />
            <UsersTable region={region} mistakes={mistakes} seed={seed} setCsvData={setCsvData} />
        </Container>
    );
}

export default App;
