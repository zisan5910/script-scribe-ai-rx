
import { useState, useEffect } from 'react';
import { useOfflineStorage } from './useOfflineStorage';

interface OfflineAction {
  type: 'cart' | 'wishlist' | 'order';
  action: 'add' | 'remove' | 'update';
  data: any;
  timestamp: string;
}

// Extend ServiceWorkerRegistration interface for Background Sync
interface ServiceWorkerRegistrationWithSync extends ServiceWorkerRegistration {
  sync?: {
    register(tag: string): Promise<void>;
  };
}

export const useEnhancedOffline = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingActions, setPendingActions] = useState<OfflineAction[]>([]);
  
  const { saveData, getData, clearData, isReady } = useOfflineStorage({
    dbName: 'PrintPokaOffline',
    version: 1,
    storeName: 'actions'
  });

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      syncPendingActions();
    };
    
    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load pending actions on init
    if (isReady) {
      loadPendingActions();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isReady]);

  const loadPendingActions = async () => {
    const actions = await getData();
    setPendingActions(actions);
  };

  const addOfflineAction = async (action: Omit<OfflineAction, 'timestamp'>) => {
    const actionWithTimestamp: OfflineAction = {
      ...action,
      timestamp: new Date().toISOString()
    };

    if (isOnline) {
      // If online, execute immediately
      await executeAction(actionWithTimestamp);
    } else {
      // If offline, save for later
      await saveData(actionWithTimestamp);
      setPendingActions(prev => [...prev, actionWithTimestamp]);
    }
  };

  const executeAction = async (action: OfflineAction) => {
    try {
      console.log('Executing action:', action);
      // Here you would implement the actual API calls
      // For now, we'll just log the action
      return true;
    } catch (error) {
      console.error('Failed to execute action:', error);
      return false;
    }
  };

  const syncPendingActions = async () => {
    if (pendingActions.length === 0) return;

    console.log('Syncing pending actions:', pendingActions.length);
    
    try {
      for (const action of pendingActions) {
        const success = await executeAction(action);
        if (!success) {
          console.error('Failed to sync action:', action);
        }
      }
      
      // Clear synced actions
      await clearData();
      setPendingActions([]);
      
      // Register background sync if available
      try {
        if ('serviceWorker' in navigator) {
          const registration = await navigator.serviceWorker.ready;
          const syncRegistration = registration as ServiceWorkerRegistrationWithSync;
          
          if (syncRegistration.sync) {
            await syncRegistration.sync.register('offline-sync');
            console.log('Background sync registered');
          } else {
            console.log('Background sync not supported');
          }
        }
      } catch (syncError) {
        console.log('Background sync registration failed:', syncError);
      }
      
    } catch (error) {
      console.error('Error during sync:', error);
    }
  };

  const getOfflineStatus = () => ({
    isOnline,
    pendingActionsCount: pendingActions.length,
    hasPendingActions: pendingActions.length > 0
  });

  return {
    isOnline,
    addOfflineAction,
    syncPendingActions,
    getOfflineStatus,
    pendingActions
  };
};
