import React from "react";

/**
 * Utility functions to build PropTypes for multi-items and shapes.
 *
 * If you're writing new components, though, consider using the Item and Shape
 * Flow types instead.
 */

/**
 * A recursive PropType that accepts Shape objects, and rejects other objects.
 *
 * Usage: `propTypes: {shape: shapePropType}`.
 */
export function shapePropType(...args) {
    const itemShape = PropTypes.oneOfType([
        PropTypes.shape({
            type: PropTypes.oneOf(["content"]).isRequired,
        }).isRequired,
        PropTypes.shape({
            type: PropTypes.oneOf(["hint"]).isRequired,
        }).isRequired,
        PropTypes.shape({
            type: PropTypes.oneOf(["tags"]).isRequired,
        }).isRequired,
        PropTypes.shape({
            type: PropTypes.oneOf(["object"]).isRequired,
            shape: PropTypes.objectOf(shapePropType),
        }).isRequired,
        PropTypes.shape({
            type: PropTypes.oneOf(["array"]).isRequired,
            elementShape: shapePropType,
        }).isRequired,
    ]);

    return itemShape(...args);
}

/**
 * Return a PropType that accepts Items of the given shape, and rejects other
 * objects.
 *
 * Usage: `propTypes: {item: buildPropTypeForShape(myShape)}`
 */
export function buildPropTypeForShape(shape) {
    return PropTypes.oneOfType([
        PropTypes.shape({
            _multi: buildTreePropTypeForShape(shape),
        }),
        PropTypes.oneOf([null, undefined]),
    ]);
}

/**
 * Return a PropType that accepts ItemTrees of the given shape, and rejects
 * other objects.
 */
function buildTreePropTypeForShape(shape) {
    if (shape.type === "content") {
        return PropTypes.shape({
            // TODO(mdr): Remove #LegacyContentNode support.
            __type: PropTypes.oneOf(["content", "item"]).isRequired,
            content: PropTypes.string,
            images: PropTypes.objectOf(PropTypes.any),
            widgets: PropTypes.objectOf(PropTypes.any),
        });
    } else if (shape.type === "hint") {
        return PropTypes.shape({
            __type: PropTypes.oneOf(["hint"]).isRequired,
            content: PropTypes.string,
            images: PropTypes.objectOf(PropTypes.any),
            widgets: PropTypes.objectOf(PropTypes.any),
            replace: PropTypes.bool,
        });
    } else if (shape.type === "tags") {
        return PropTypes.arrayOf(PropTypes.string.isRequired);
    } else if (shape.type === "array") {
        const elementPropType = buildTreePropTypeForShape(shape.elementShape);
        return PropTypes.arrayOf(elementPropType.isRequired);
    } else if (shape.type === "object") {
        const valueShapes = shape.shape;
        const propTypeShape = {};
        Object.keys(valueShapes).forEach(key => {
            propTypeShape[key] =
                buildTreePropTypeForShape(valueShapes[key]).isRequired;
        });
        return PropTypes.shape(propTypeShape);
    } else {
        throw new Error(`unexpected shape type ${shape.type}`);
    }
}
