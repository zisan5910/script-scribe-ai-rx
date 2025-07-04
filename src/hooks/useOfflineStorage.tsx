
import { useState, useEffect } from 'react';

interface OfflineStorageOptions {
  dbName: string;
  version: number;
  storeName: string;
}

export const useOfflineStorage = (options: OfflineStorageOptions) => {
  const [db, setDb] = useState<IDBDatabase | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initDB = async () => {
      try {
        const request = indexedDB.open(options.dbName, options.version);
        
        request.onerror = () => {
          console.error('Failed to open IndexedDB');
        };

        request.onsuccess = () => {
          setDb(request.result);
          setIsReady(true);
          console.log('IndexedDB initialized successfully');
        };

        request.onupgradeneeded = (event) => {
          const database = (event.target as IDBOpenDBRequest).result;
          
          if (!database.objectStoreNames.contains(options.storeName)) {
            const store = database.createObjectStore(options.storeName, { 
              keyPath: 'id', 
              autoIncrement: true 
            });
            store.createIndex('timestamp', 'timestamp', { unique: false });
          }
        };
      } catch (error) {
        console.error('Error initializing IndexedDB:', error);
      }
    };

    initDB();
  }, [options.dbName, options.version, options.storeName]);

  const saveData = async (data: any) => {
    if (!db || !isReady) return false;

    try {
      const transaction = db.transaction([options.storeName], 'readwrite');
      const store = transaction.objectStore(options.storeName);
      const dataWithTimestamp = {
        ...data,
        timestamp: new Date().toISOString()
      };
      
      await store.add(dataWithTimestamp);
      console.log('Data saved to IndexedDB:', dataWithTimestamp);
      return true;
    } catch (error) {
      console.error('Error saving to IndexedDB:', error);
      return false;
    }
  };

  const getData = async (): Promise<any[]> => {
    if (!db || !isReady) return [];

    try {
      const transaction = db.transaction([options.storeName], 'readonly');
      const store = transaction.objectStore(options.storeName);
      
      return new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Error reading from IndexedDB:', error);
      return [];
    }
  };

  const clearData = async () => {
    if (!db || !isReady) return false;

    try {
      const transaction = db.transaction([options.storeName], 'readwrite');
      const store = transaction.objectStore(options.storeName);
      await store.clear();
      console.log('IndexedDB cleared');
      return true;
    } catch (error) {
      console.error('Error clearing IndexedDB:', error);
      return false;
    }
  };

  return { saveData, getData, clearData, isReady };
};
