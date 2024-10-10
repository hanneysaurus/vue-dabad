export function getImageID(title) {
    let title_cleaned = title.toString().replaceAll('&', 'and');
    title_cleaned = title_cleaned.replaceAll('ö', 'o');
    title_cleaned = title_cleaned.replaceAll('ä', 'a');
    title_cleaned = title_cleaned.replaceAll('ü', 'u');
    title_cleaned = title_cleaned.replace(/[^a-zA-Z0-9 ]/g, '');
    title_cleaned = title_cleaned.replaceAll('__', '_');
    const image_id = title_cleaned.toLowerCase().replace(/\s+/g, '_');
    return image_id + ".jpg";
}
