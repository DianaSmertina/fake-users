import { Dispatch, SetStateAction } from "react";
import Form from "react-bootstrap/Form";

interface IToolBarProps {
    setRegion: Dispatch<SetStateAction<string>>;
    mistakes: number;
    setMistakes: Dispatch<SetStateAction<number>>;
}

function ToolBar({ setRegion, mistakes, setMistakes }: IToolBarProps) {
    return (
        <>
            <Form.Select onChange={(e) => setRegion(e.currentTarget.value)}>
                <option>Select region</option>
                <option value="en_US">USA + English</option>
                <option value="de">Germany + German</option>
                <option value="ru">Russia + Russian</option>
            </Form.Select>
            <Form.Group>
                <Form.Label>Number of mistakes</Form.Label>
                <Form.Range
                    min={0}
                    max={10}
                    step={0.25}
                    value={mistakes}
                    onChange={(e) => {
                        setMistakes(Number(e.currentTarget.value));
                    }}
                />
                <Form.Text>{mistakes}</Form.Text>
            </Form.Group>
        </>
    );
}

export default ToolBar;
