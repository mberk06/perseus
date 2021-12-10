// @flow
/**
 * Utility functions for manipulating highlights.
 */
const {findFirstAndLastWordIndexes, unionRanges, spanRanges, rangeIncludes} =
    require("./ranges.js");

/**
 * Given a list of DOMHighlights, return a new list that also includes the
 * given DOMRange as a new DOMHighlight. If the DOMHighlight intersects
 * existing DOMHighlights, the other Highlights are removed and their ranges
 * are merged into the new DOMHighlight.
 */
function addHighlight(existingHighlights, newHighlight) {
    const newHighlights = {};

    // Merge the new highlight with any existing highlights that intersect it.
    let mergedDomRange = newHighlight.domRange;
    let mergedFirstWordIndex = newHighlight.firstWordIndex;
    let mergedLastWordIndex = newHighlight.lastWordIndex;
    for (const key of Object.keys(existingHighlights)) {
        const h = existingHighlights[key];
        const newMergedDomRange = unionRanges(h.domRange, mergedDomRange);
        if (newMergedDomRange) {
            // This highlight's range was successfully merged into the new
            // highlight. Update `mergedDomRange`, and *don't* add it to the
            // new set of highlights.
            mergedDomRange = newMergedDomRange;
            mergedFirstWordIndex =
                Math.min(h.firstWordIndex, mergedFirstWordIndex);
            mergedLastWordIndex =
                Math.max(h.lastWordIndex, mergedLastWordIndex);
        } else {
            // This highlight's range can't be merged into the new highlight.
            // Add it to the new set of highlights.
            newHighlights[key] = h;
        }
    }

    const newMergedHighlight = {
        firstWordIndex: mergedFirstWordIndex,
        lastWordIndex: mergedLastWordIndex,
        domRange: mergedDomRange,
    };

    // Add the newly-merged highlight to the set of highlights, under a new,
    // unique key.
    const existingKeys = Object.keys(newHighlights);
    const newKey = createNewUniqueKey(existingKeys);
    newHighlights[newKey] = newMergedHighlight;

    return newHighlights;
}

/**
 * Given a DOMRange and a list of word ranges, build a corresponding
 * DOMHighlight.
 *
 * If the DOMRange is not a valid highlight given the word ranges, return null.
 */
function buildHighlight(existingHighlights, wordRanges, newHighlightRange) {
    // If any existing highlight fully contains the new highlight range, it's
    // redundant and therefore not valid to build this as a highlight.
    // Return null.
    //
    // NOTE(mdr): Really, our goal is to determine whether the new range's
    //     content is already fully highlighted, so you could imagine this
    //     logic not catching the case where a range's contents are fully
    //     highlighted, but by multiple ranges.
    //
    //     However, words aren't actually adjacent; they have spaces between
    //     them. So, even if each word in the range is currently highlighted,
    //     the space between a pair of words will only be highlighted if
    //     they're included in the same highlight range.
    //
    //     Therefore, if this new range isn't fully contained by an existing
    //     highlight, then there's at *least* an unhighlighted space within the
    //     range. In that case, it makes sense to offer this as a new highlight
    //     that, when added, will merge with the highlights that it intersects.
    for (const key of Object.keys(existingHighlights)) {
        const existingHighlightRange = existingHighlights[key].domRange;
        if (rangeIncludes(existingHighlightRange, newHighlightRange)) {
            return null;
        }
    }

    // If the new highlight range doesn't span two words from the content, it's
    // not valid to build this as a highlight. Return null.
    const indexes = findFirstAndLastWordIndexes(newHighlightRange, wordRanges);
    if (!indexes) {
        return null;
    }

    const [firstWordIndex, lastWordIndex] = indexes;
    const firstWord = wordRanges[firstWordIndex];
    const lastWord = wordRanges[lastWordIndex];
    return {
        firstWordIndex,
        lastWordIndex,
        domRange: spanRanges(firstWord, lastWord),
    };
}

/**
 * Given a list of keys, return a new unique key that is not in the list.
 */
function createNewUniqueKey(existingKeys) {
    // The base of the key is the current time, in milliseconds since epoch.
    const base = `${new Date().getTime()}`;
    if (!existingKeys.includes(base)) {
        return base;
    }

    // But, if the user is a fast-clicker or time-traveler or something, and
    // already has a highlight from this millisecond, then let's attach a
    // suffix and keep incrementing it until we find an unused suffix.
    let suffix = 0;
    let key;
    do {
        key = `${base}-${suffix}`;
        suffix++;
    } while (existingKeys.includes(key));

    return key;
}

/**
 * Given a SerializedHightlight and the current set of word ranges, return a
 * DOMHighlight representing the SerializedHighlight.
 *
 * If the SerializedHighlight is not valid given the list of word ranges, throw
 * an error.
 */
function deserializeHighlight(serializedHighlight, wordRanges) {
    const {firstWordIndex, lastWordIndex} = serializedHighlight.range;

    const firstWord = wordRanges[firstWordIndex];
    if (!firstWord) {
        throw new Error(
            `first word index ${firstWord} is out of bounds: ` +
            `must be 0–${wordRanges.length - 1} inclusive`);
    }

    const lastWord = wordRanges[lastWordIndex];
    if (!lastWord) {
        throw new Error(
            `last word index ${lastWord} is out of bounds: ` +
            `must be 0–${wordRanges.length - 1} inclusive`);
    }

    return {
        firstWordIndex,
        lastWordIndex,
        domRange: spanRanges(firstWord, lastWord),
    };
}

/**
 * Return a SerializedHighlight representing the given DOMHighlight.
 */
function serializeHighlight(highlight) {
    const {firstWordIndex, lastWordIndex} = highlight;

    return {
        range: {
            type: "word-indexes",
            firstWordIndex,
            lastWordIndex,
        },
    };
}

module.exports = {
    addHighlight,
    buildHighlight,
    deserializeHighlight,
    serializeHighlight,
};
