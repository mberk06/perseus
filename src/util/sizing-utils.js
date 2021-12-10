import _react from "react";
import { interactiveSizes } from "../styles/constants.js";

// Note: these size cutoffs represent content-width cutoffs as
// specified in http://zpl.io/1mVmvU
// TODO(benkomalo): these values aren't used in JS outside of this file, but
// are coupled to the values in
// stylesheets/exercise-content-package/articles.less - DRY it up at some point
const React = _react;

const smMax = 512;
const mdMax = 688;

export const containerSizeClass = {
    SMALL: "small",
    MEDIUM: "medium",
    LARGE: "large",
    XLARGE: "xlarge",
};

export const containerSizeClassPropType = React.PropTypes.oneOf(
    Object.values(containerSizeClass)
);

export const getClassFromWidth = width => {
    if (!width) {
        return containerSizeClass.MEDIUM;
    }

    if (width <= smMax) {
        return containerSizeClass.SMALL;
    } else if (width <= mdMax) {
        return containerSizeClass.MEDIUM;
    } else {
        return containerSizeClass.LARGE;
    }
};

export const getInteractiveBoxFromSizeClass = sizeClass => {
    if (sizeClass === containerSizeClass.SMALL) {
        return [
            interactiveSizes.defaultBoxSizeSmall,
            interactiveSizes.defaultBoxSizeSmall,
        ];
    } else {
        return [
            interactiveSizes.defaultBoxSize,
            interactiveSizes.defaultBoxSize,
        ];
    }
};
