const DB_NAME = "bella_media_files";
const STORE_NAME = "files";
const DB_VERSION = 1;

const openDb = (): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) {
      reject(new Error("IndexedDB is not available"));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
  });

const withStore = async <T>(
  mode: IDBTransactionMode,
  action: (store: IDBObjectStore) => IDBRequest<T>,
): Promise<T> => {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, mode);
    const store = tx.objectStore(STORE_NAME);
    const request = action(store);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
};

export const saveMediaFile = async (id: string, blob: Blob) => {
  await withStore("readwrite", (store) => store.put(blob, id));
};

export const getMediaFile = async (id: string): Promise<Blob | undefined> => {
  return withStore("readonly", (store) => store.get(id));
};

export const deleteMediaFile = async (id: string) => {
  await withStore("readwrite", (store) => store.delete(id));
};

export const isIdbMedia = (src: string) => src.startsWith("idb://");

export const getIdbMediaId = (src: string) => src.replace("idb://", "");
