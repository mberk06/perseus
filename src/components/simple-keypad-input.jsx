import _mathInput3 from "@khanacademy/math-input";
import _mathInput2 from "@khanacademy/math-input";
import _mathInput from "@khanacademy/math-input";
import _react from "react";

var module = {
    exports: {}
};

var exports = module.exports;
/**
 * A version of the `math-input` subrepo's KeypadInput component that adheres to
 * the same API as Perseus's  MathOuput and NumberInput, allowing it to be
 * dropped in as a replacement for those components without any modifications.
 *
 * TODO(charlie): Once the keypad API has stabilized, move this into the
 * `math-input` subrepo and use it everywhere as a simpler, keypad-coupled
 * interface to `math-input`'s MathInput component.
 */

const React = _react;

const {KeypadInput} = _mathInput.components;
const {KeypadTypes} = _mathInput2.consts;
const {keypadElementPropType} = _mathInput3.propTypes;

const SimpleKeypadInput = React.createClass({
    propTypes: {
        keypadElement: keypadElementPropType,
        onFocus: React.PropTypes.func,
        value: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
        ]),
    },

    focus() {
        this.refs.input.focus();
    },

    blur() {
        this.refs.input.blur();
    },

    getValue: function() {
        return this.props.value;
    },

    render() {
        // Intercept the `onFocus` prop, as we need to configure the keypad
        // before continuing with the default focus logic for Perseus inputs.
        // Intercept the `value` prop so as to map `null` to the empty string,
        // as the `KeypadInput` does not support `null` values.
        const {keypadElement, onFocus, value, ...rest} = this.props;

        return (
            <KeypadInput
                ref="input"
                keypadElement={keypadElement}
                onFocus={() => {
                    if (keypadElement) {
                        keypadElement.configure(
                            {
                                keypadType: KeypadTypes.FRACTION,
                            },
                            () => {
                                if (this.isMounted()) {
                                    onFocus && onFocus();
                                }
                            }
                        );
                    } else {
                        onFocus && onFocus();
                    }
                }}
                value={value == null ? "" : "" + value}
                {...rest}
            />
        );
    },
});

module.exports = SimpleKeypadInput;
export default module.exports;
