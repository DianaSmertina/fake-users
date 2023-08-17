import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

interface IToolBarProps {
    setRegion: Dispatch<SetStateAction<string>>;
    mistakes: number;
    setMistakes: Dispatch<SetStateAction<number>>;
    seed: number;
    setSeed: Dispatch<SetStateAction<number>>;
}

function ToolBar({
    setRegion,
    mistakes,
    setMistakes,
    seed,
    setSeed,
}: IToolBarProps) {
    const onMistakeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMistakes(Number(e.currentTarget.value));
    };

    const randomBtnHandler = () => {
        setSeed(Math.ceil(Math.random() * 100000));
    }

    return (
        <>
            <Form.Select onChange={(e) => setRegion(e.currentTarget.value)}>
                <option>Select region</option>
                <option value="en_US">USA + English</option>
                <option value="de">Germany + German</option>
                <option value="ru">Russia + Russian</option>
            </Form.Select>
            <Form.Label>Number of mistakes</Form.Label>
            <Form.Group className="d-flex align-items-center justify-content-center">
                <Form.Range
                    min={0}
                    max={10}
                    step={0.25}
                    value={Math.min(mistakes, 10)}
                    onChange={(e) => onMistakeChange(e)}
                />
                <Form.Control
                    type="number"
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
            </Form.Group>
            <Form.Group>
                <Form.Control
                    placeholder="Seed"
                    type="number"
                    value={seed === 0 ? "" : seed}
                    onChange={(e) => setSeed(Number(e.currentTarget.value))}
                ></Form.Control>
                <Button variant="primary" onClick={randomBtnHandler}>Random seed</Button>
            </Form.Group>
        </>
    );
}

export default ToolBar;
