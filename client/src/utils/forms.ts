/**
 * Gets a selection of attributes from a HTML input element. 
 * It handles values an converts it depending on their types, number, booleans etc.
 * @param targetElement the HTML input element the get value from
 */
export const attributesFromElement = (element: EventTarget) => {
    const { name, value, checked, type } = element as HTMLInputElement;
    const elementValue = (
        type === "checkbox" ? checked :
        type === "number" ? value !== "" ? parseInt(value) : 0 :
        value
    ) as string | number | boolean;

    return { name, type, elementValue }
}