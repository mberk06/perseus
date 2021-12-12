const svgLabelsRegex = /^web\+graphie\:/;

export function isLabeledSVG(url) {
    return svgLabelsRegex.test(url);
}

// For each svg+labels, there are two urls we need to download from. This gets
// the base url without the suffix, and `getSvgUrl` and `getDataUrl` apply
// appropriate suffixes to get the image and other data
export function getBaseUrl(url) {
    // Force HTTPS connection unless we're on HTTP, so that IE works.
    const protocol = window.location.protocol === "http:" ? "http:" : "https:";

    return url.replace(svgLabelsRegex, protocol);
}

export function getSvgUrl(url) {
    return getBaseUrl(url) + ".svg";
}

export function getDataUrl(url) {
    return getBaseUrl(url) + "-data.json";
}

// A regex to split at the last / of a URL, separating the base part from the
// hash. This is used to create the localized label data URLs.
const splitHashRegex = /\/(?=[^/]+$)/;

export function getLocalizedDataUrl(url) {
    if (typeof KA !== "undefined") {
        // Parse out the hash and base so that we can insert the locale
        // directory in the middle.
        const [base, hash] = getBaseUrl(url).split(splitHashRegex);
        return `${base}/${KA.language}/${hash}-data.json`;
    } else {
        return getDataUrl(url);
    }
}

export function getRealImageUrl(url) {
    if (isLabeledSVG(url)) {
        return getSvgUrl(url);
    } else {
        return url;
    }
}
