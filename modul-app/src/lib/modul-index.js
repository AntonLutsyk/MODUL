// Same API as the prototype's modul-index.js, backed by the pre-built index
// (src/data/modul-index.json) instead of fetching every page at runtime.
import { modulData, readSet, writeSet, search, READ_STORAGE_KEY } from './search.js';

export const loadModul = () => Promise.resolve(modulData);
export const cachedModul = () => modulData;
export { readSet, writeSet, search, READ_STORAGE_KEY };
