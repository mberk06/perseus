import * as React from "react";
import LikertScale from './likert-scale.jsx';

class LikertScaleEditor extends React.Component {
    static propTypes = { };

    constructor(props) {
        super(props)
    }

    render() {
        return <div>
            <div>
            The likert scale submits a score of 1 (☹️) to 5 (😀).
            </div>
            <div>
            (There are no configuration options currently.)
            </div>
        </div>
    }

    serialize() {
        return { };
    }
}

export default LikertScaleEditor;
