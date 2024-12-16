interface useIndexedDBParams {
  dbName: string;
  storeName?: string;
}
export const useIndexedDB = ({ dbName }: useIndexedDBParams) => {
  const openDB = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, 2);
    });
  };
};
