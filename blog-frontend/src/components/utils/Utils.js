export const Truncate = (text, maxLength = 10) => {
    if (text.length <= maxLength)
        return text;

    return text.slice(0, maxLength) + '...'; 
}