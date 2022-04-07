import * as React from "react";
import PropTypes from "prop-types";
import { StyleSheet, css } from "aphrodite";
import Likert1 from "./likert-scale/likert-face-1.svg";
import Likert2 from "./likert-scale/likert-face-2.svg";
import Likert3 from "./likert-scale/likert-face-3.svg";
import Likert4 from "./likert-scale/likert-face-4.svg";
import Likert5 from "./likert-scale/likert-face-5.svg";


const styles = StyleSheet.create({
    container: {
        // create a new stacking context:
        position: 'relative',
        // TODO(aria): better approach to scratchpad z-indexing
        zIndex: 3, // to match #problemaria > button
    },
    choice: {
        zIndex: 0,
        borderWidth: 1,
        borderRadius: 0,
        marginRight: -1,
        borderColor: 'gray',
        backgroundColor: '#eee',
        padding: 15,
        ':hover': {
            zIndex: 1,
            outline: '2px solid lime',
        },
        ':focus-visible': {
            zIndex: 1,
            outline: '2px solid lime',
        },
        ':active': {
            backgroundColor: 'green',
        },
    },
    first: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    last: {
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        marginRight: 0,
    },
    selectedChoice: {
        backgroundColor: 'green',
    },
    emoji: {
        display: 'block',
        height: 50,
        width: 50,
    },
});

class LikertChoice extends React.PureComponent {
    static propTypes = {
        value: PropTypes.number.isRequired,
        onSelect: PropTypes.func.isRequired,
        styles: PropTypes.object,
        image: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
    };

    render = () => {
        const isSelected = this.props.selected === this.props.value;
        return <button
            type="button"
            role="radio"
            aria-checked={isSelected}
            className={css(styles.choice, this.props.value === 1 && styles.first, this.props.value === 5 && styles.last, isSelected && styles.selectedChoice)}
            onClick={this._handleSelect}
        >
            <img className={css(styles.emoji)} src={this.props.image} alt={this.props.alt} title={this.props.alt} />
        </button>;
    }

    _handleSelect = () => {
        this.props.onSelect(this.props.value);
    }
}

class LikertScale extends React.PureComponent {
    static propTypes = {
        selected: PropTypes.oneOf([null, 1, 2, 3, 4, 5]),
        onChange: PropTypes.func.isRequired,
    };

    static defaultProps = {
        selected: null,
    };

    constructor(props) {
        super(props)
    }

    render = () => {
        return <div role="radiogroup" className={css(styles.container)}>
            <LikertChoice value={1} selected={this.props.selected} onSelect={this._handleChoice} image={Likert1} alt="bad" />
            <LikertChoice value={2} selected={this.props.selected} onSelect={this._handleChoice} image={Likert2} alt="not good" />
            <LikertChoice value={3} selected={this.props.selected} onSelect={this._handleChoice} image={Likert3} alt="neutral or unsure" />
            <LikertChoice value={4} selected={this.props.selected} onSelect={this._handleChoice} image={Likert4} alt="good"/>
            <LikertChoice value={5} selected={this.props.selected} onSelect={this._handleChoice} image={Likert5} alt="great!" />
        </div>;
    };

    _handleChoice = (selected) => {
        this.props.onChange({selected: selected});
    };

    getUserInput = () => {
        return {
            selected: this.props.selected,
        };
    };

    simpleValidate = (rubric, onInputError) => {
        if (this.props.selected == null) {
            return {
                type: "invalid",
                message: null,
            };
        }
        return {
            type: "points",
            earned: 1,
            total: 1,
        };
    };
}

const editorPropsToWidgetProps = (editorProps) => {
  return {};
};


const LikertScaleInfo = {
    name: "likert-scale",
    displayName: "Likert Scale",

    // Tell the renderer what type of `display:` style we would like
    // for the component wrapping this one.
    defaultAlignment: "block",

    widget: LikertScale,

    transform: editorPropsToWidgetProps,
};

export default LikertScaleInfo;
