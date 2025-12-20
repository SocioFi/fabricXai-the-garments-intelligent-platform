import { useState, useCallback } from 'react';
import {
  generateEmbedding,
  storeDocument,
  searchSimilar,
  deleteDocument,
  batchStoreDocuments,
  getAIContext,
  VectorDocument,
  VectorSearchResult,
} from './vector_store';

export interface UseVectorStoreReturn {
  storeDoc: (doc: VectorDocument) => Promise<void>;
  search: (query: string, options?: { limit?: number; module?: string; threshold?: number }) => Promise<VectorSearchResult[]>;
  deleteDoc: (id: string) => Promise<void>;
  batchStore: (docs: VectorDocument[]) => Promise<void>;
  getContext: (query: string, module?: string) => Promise<string>;
  isLoading: boolean;
  error: Error | null;
}

/**
 * React hook for vector database operations
 */
export function useVectorStore(): UseVectorStoreReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const storeDoc = useCallback(async (doc: VectorDocument) => {
    setIsLoading(true);
    setError(null);
    try {
      await storeDocument(doc);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to store document');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const search = useCallback(async (
    query: string,
    options?: { limit?: number; module?: string; threshold?: number }
  ): Promise<VectorSearchResult[]> => {
    setIsLoading(true);
    setError(null);
    try {
      const results = await searchSimilar(query, options);
      return results;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to search documents');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteDoc = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteDocument(id);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to delete document');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const batchStore = useCallback(async (docs: VectorDocument[]) => {
    setIsLoading(true);
    setError(null);
    try {
      await batchStoreDocuments(docs);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to batch store documents');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getContext = useCallback(async (query: string, module?: string): Promise<string> => {
    setIsLoading(true);
    setError(null);
    try {
      const context = await getAIContext(query, module);
      return context;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to get AI context');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    storeDoc,
    search,
    deleteDoc,
    batchStore,
    getContext,
    isLoading,
    error,
  };
}
