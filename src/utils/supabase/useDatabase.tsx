/**
 * React Hook for Database Operations with RBAC
 * Provides unified interface for KV store and vector database
 */

import { useState, useCallback, useEffect } from 'react';
import {
  storeData,
  getData,
  getDataByModule,
  updateData,
  deleteData,
  batchStoreData,
  storeVectorDocument,
  searchVectorDatabase,
  getAIContextForModule,
  syncToVectorDatabase,
  deleteComplete,
} from './database';
import { getCurrentSession, initializeDemoSession } from './rbac';

export interface UseDatabaseReturn {
  // Data operations
  store: (key: string, data: any, module: string) => Promise<void>;
  get: (key: string) => Promise<any>;
  getByModule: (module: string) => Promise<any[]>;
  update: (key: string, data: any, module: string) => Promise<void>;
  remove: (key: string) => Promise<void>;
  batchStore: (records: Array<{ key: string; data: any }>, module: string) => Promise<void>;
  
  // Vector operations
  storeVector: (id: string, content: string, module: string, metadata?: Record<string, any>) => Promise<void>;
  searchVector: (query: string, options?: { module?: string; limit?: number; threshold?: number }) => Promise<any[]>;
  getAIContext: (query: string, module: string) => Promise<string>;
  syncVector: (key: string, content: string, module: string) => Promise<void>;
  removeComplete: (key: string) => Promise<void>;
  
  // State
  isLoading: boolean;
  error: Error | null;
  
  // Session info
  session: any;
  isAuthenticated: boolean;
}

/**
 * Hook for database operations with automatic RBAC
 */
export function useDatabase(): UseDatabaseReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [session, setSession] = useState<any>(null);

  // Initialize session on mount
  useEffect(() => {
    let currentSession = getCurrentSession();
    
    // Auto-initialize demo session if none exists
    if (!currentSession) {
      initializeDemoSession('admin');
      currentSession = getCurrentSession();
    }
    
    setSession(currentSession);
  }, []);

  const store = useCallback(async (key: string, data: any, module: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await storeData(key, data, module);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to store data');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const get = useCallback(async (key: string): Promise<any> => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getData(key);
      return data;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to get data');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getByModule = useCallback(async (module: string): Promise<any[]> => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getDataByModule(module);
      return data;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to get module data');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const update = useCallback(async (key: string, data: any, module: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await updateData(key, data, module);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update data');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const remove = useCallback(async (key: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteData(key);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to delete data');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const batchStore = useCallback(async (
    records: Array<{ key: string; data: any }>,
    module: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      await batchStoreData(records, module);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to batch store data');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const storeVector = useCallback(async (
    id: string,
    content: string,
    module: string,
    metadata: Record<string, any> = {}
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      await storeVectorDocument(id, content, module, metadata);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to store vector document');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const searchVector = useCallback(async (
    query: string,
    options?: { module?: string; limit?: number; threshold?: number }
  ): Promise<any[]> => {
    setIsLoading(true);
    setError(null);
    try {
      const results = await searchVectorDatabase(query, options);
      return results;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to search vector database');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getAIContext = useCallback(async (query: string, module: string): Promise<string> => {
    setIsLoading(true);
    setError(null);
    try {
      const context = await getAIContextForModule(query, module);
      return context;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to get AI context');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const syncVector = useCallback(async (key: string, content: string, module: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await syncToVectorDatabase(key, content, module);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to sync to vector database');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeComplete = useCallback(async (key: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteComplete(key);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to delete completely');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    store,
    get,
    getByModule,
    update,
    remove,
    batchStore,
    storeVector,
    searchVector,
    getAIContext,
    syncVector,
    removeComplete,
    isLoading,
    error,
    session,
    isAuthenticated: !!session,
  };
}
