export const Truncate = (text: string, maxLength = 10): string => {
    if (text.length <= maxLength)
        return text;

    return text.slice(0, maxLength) + '...'; 
}

export const Slugify = (text: string): string => {
    return text
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
}
