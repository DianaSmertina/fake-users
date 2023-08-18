import "./ToolBar.css";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { CSVLink } from "react-csv";

interface IToolBarProps {
    setRegion: Dispatch<SetStateAction<string>>;
    mistakes: number;
    setMistakes: Dispatch<SetStateAction<number>>;
    seed: number;
    setSeed: Dispatch<SetStateAction<number>>;
    csvData: Array<Array<string>> | [];
}

function ToolBar({
    setRegion,
    mistakes,
    setMistakes,
    seed,
    setSeed,
    csvData
}: IToolBarProps) {
    const onMistakeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMistakes(Number(e.currentTarget.value));
    };

    const randomBtnHandler = () => {
        setSeed(Math.ceil(Math.random() * 100000));
    };

    return (
        <Container className="flex align-items-center justify-content-center border bg-light sticky-top p-3">
            <Form.Group className="d-flex align-items-center justify-content-left mb-3">
                <Form.Select
                    onChange={(e) => setRegion(e.currentTarget.value)}
                    className="w-25"
                >
                    <option>Select region</option>
                    <option value="en_US">USA + English</option>
                    <option value="de">Germany + German</option>
                    <option value="ru">Russia + Russian</option>
                </Form.Select>
                <Form.Group className="d-flex align-items-center justify-content-center w-50 gap-3">
                    <Form.Control
                        className="w-50"
                        placeholder="Seed"
                        type="number"
                        value={seed === 0 ? "" : seed}
                        onChange={(e) => setSeed(Number(e.currentTarget.value))}
                    ></Form.Control>
                    <Button variant="primary" onClick={randomBtnHandler}>
                        Random seed
                    </Button>
                </Form.Group>
            </Form.Group>
            <Form.Group className="d-flex align-items-center gap-3 mb-3">
                <Form.Control
                    type="number"
                    placeholder="Number of mistakes"
                    className="w-25"
                    min={0}
                    max={1000}
                    step={0.01}
                    value={mistakes === 0 ? "" : mistakes}
                    onChange={(e) => {
                        if (Number(e.currentTarget.value) <= 1000) {
                            onMistakeChange(e as ChangeEvent<HTMLInputElement>);
                        }
                    }}
                />
                <Form.Range
                    className="custom-range"
                    min={0}
                    max={10}
                    step={0.25}
                    value={Math.min(mistakes, 10)}
                    onChange={(e) => onMistakeChange(e)}
                />
            </Form.Group>
            <CSVLink data={csvData}>Download CSV</CSVLink>
        </Container>
    );
}

export default ToolBar;
