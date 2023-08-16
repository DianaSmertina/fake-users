import { Dispatch, SetStateAction } from "react";
import Form from "react-bootstrap/Form";

interface IToolBarProps {
    setRegion: Dispatch<SetStateAction<string>>;
}

function ToolBar({setRegion}: IToolBarProps) {
    return (
        <Form.Select onChange={(e) => setRegion(e.currentTarget.value)}>
            <option>Select region</option>
            <option value="en_US">USA + English</option>
            <option value="de">Germany + German</option>
            <option value="ru">Russia + Russian</option>
        </Form.Select>
    );
}

export default ToolBar;
