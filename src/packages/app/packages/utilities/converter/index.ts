export function convertObjectIntoArray<T>(obj: { [key: string]: T }): T[] {
    return Object.values<T>(obj);
}
