var module = {
    exports: {}
};

var exports = module.exports;
/**
 * This is a TreeMapper that only has mappers specified for its leaf nodes; its
 * array mapper is the identity function.
 *
 * This is the TreeMapper initially returned by `buildMapper`. It allows you to
 * change the types of your ContentMapper and HintMapper, which is safe because
 * none of the other mappers that depend on those types (aka ArrayMapper) have
 * been specified yet. (Or, more specifically, the ArrayMapper is currently
 * `identity`, which can trivially vary with the ContentMapper and HintMapper's
 * types.)
 *
 * Once you call `setArrayMapper`, however, we move to the other class:
 * TreeMapperForLeavesAndCollections.
 */
class TreeMapperJustForLeaves {
    constructor(content, hint, tags) {
        this.content = content;
        this.hint = hint;
        this.tags = tags;
        this.array = identity;
    }

    setContentMapper(newContentMapper) {
        return new TreeMapperJustForLeaves(
            newContentMapper, this.hint, this.tags);
    }

    setHintMapper(newHintMapper) {
        return new TreeMapperJustForLeaves(
            this.content, newHintMapper, this.tags);
    }

    setTagsMapper(newTagsMapper) {
        return new TreeMapperJustForLeaves(
            this.content, this.hint, newTagsMapper);
    }

    setArrayMapper(newArrayMapper) {
        return new TreeMapperForLeavesAndCollections(
            this.content, this.hint, this.tags, newArrayMapper);
    }

    mapTree(tree, shape) {
        return mapTree(tree, shape, [], this);
    }
}

/**
 * This is a TreeMapper that already has an ArrayMapper specified, so its
 * ContentMapper and HintMapper are now locked in.
 */
class TreeMapperForLeavesAndCollections {
    constructor(content, hint, tags, array) {
        this.content = content;
        this.hint = hint;
        this.tags = tags;
        this.array = array;
    }

    setArrayMapper(newArrayMapper) {
        return new TreeMapperForLeavesAndCollections(
            this.content, this.hint, this.tags, newArrayMapper);
    }

    mapTree(tree, shape) {
        return mapTree(tree, shape, [], this);
    }
}

function identity(x) {
    return x;
}

/**
 * Return a new TreeMapper that will perform a no-op transformation on an input
 * tree. To make it useful, chain any combination of `setContentMapper`,
 * `setHintMapper`, `setTagMapper`, and `setArrayMapper` to specify
 * transformations for the individual node types.
 */
export function buildMapper() {
    return new TreeMapperJustForLeaves(identity, identity, identity);
}

/**
 * Copy the given tree, apply the corresponding transformation specified in the
 * TreeMapper to each node, and return the resulting tree.
 */
function mapTree(tree, shape, path, mappers) {
    // We trust the shape of the multi-item to match the shape provided at
    // runtime. Therefore, in each shape branch, we cast the node to `any` and
    // reinterpret it as the expected node type.
    if (shape.type === "content") {
        const content = (tree);
        return mappers.content(content, shape, path);
    } else if (shape.type === "hint") {
        const hint = (tree);
        return mappers.hint(hint, shape, path);
    } else if (shape.type === "tags") {
        const tags = (tree);
        return mappers.tags(tags, shape, path);
    } else if (shape.type === "array") {
        const array = (tree);

        if (!Array.isArray(array)) {
            throw new Error(
                `Invalid object of type "${typeof array}" found at path ` +
                `${["<root>"].concat(path).join(".")}. Expected array.`);
        }

        const elementShape = shape.elementShape;
        const mappedElements =
            array.map((inner, i) => mapTree(inner, elementShape, path.concat(i), mappers));
        return mappers.array(mappedElements, array, shape, path);
    } else if (shape.type === "object") {
        const object = (tree);

        if (object && typeof object !== "object") {
            throw new Error(
                `Invalid object of type "${typeof object}" found at ` +
                `path ${["<root>"].concat(path).join(".")}. Expected ` +
                `"object" type.`);
        }

        const valueShapes = shape.shape;
        if (!valueShapes) {
            throw new Error(
                `Unexpected shape ${JSON.stringify(shape)} at path ` +
                `${["<root>"].concat(path).join(".")}.`);
        }
        const newObject = {};
        Object.keys(valueShapes).forEach(key => {
            if (!(key in object)) {
                throw new Error(
                    `Key "${key}" is missing from shape at path ` +
                    `${["<root>"].concat(path).join(".")}.`);
            }

            newObject[key] = mapTree(
                object[key], valueShapes[key], path.concat(key), mappers);
        });
        return newObject;
    } else {
        throw new Error(`unexpected shape type ${shape.type}`);
    }
}
