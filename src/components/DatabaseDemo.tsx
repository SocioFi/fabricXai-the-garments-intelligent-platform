/**
 * Database Integration Demo Component
 * Demonstrates RBAC, KV Store, and Vector Database usage
 */

import { useState, useEffect } from 'react';
import { useDatabase } from '../utils/supabase/useDatabase';
import { 
  getCurrentSession, 
  hasModuleAccess, 
  hasPermission,
  canPerformAction,
  UserRole 
} from '../utils/supabase/rbac';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  Database, 
  Search, 
  Plus, 
  Trash2, 
  Edit, 
  Shield,
  Sparkles,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface DemoRecord {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export function DatabaseDemo() {
  const db = useDatabase();
  const [records, setRecords] = useState<DemoRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [newRecord, setNewRecord] = useState({ title: '', description: '' });

  // Load records on mount
  useEffect(() => {
    loadRecords();
  }, []);

  async function loadRecords() {
    try {
      const data = await db.getByModule('demo-module');
      setRecords(data || []);
    } catch (error) {
      console.error('Failed to load records:', error);
      toast.error('Failed to load records');
    }
  }

  async function handleCreate() {
    if (!canPerformAction('demo-module', 'create')) {
      toast.error('You do not have permission to create records');
      return;
    }

    try {
      const recordId = `demo-${Date.now()}`;
      const recordData = {
        ...newRecord,
        id: recordId,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Store in KV database
      await db.store(recordId, recordData, 'demo-module');

      // Store in vector database for AI search
      const searchContent = `${newRecord.title} ${newRecord.description}`;
      await db.storeVector(
        recordId,
        searchContent,
        'demo-module',
        {
          title: newRecord.title,
          status: 'active',
        }
      );

      toast.success('Record created successfully');
      setNewRecord({ title: '', description: '' });
      loadRecords();
    } catch (error) {
      console.error('Failed to create record:', error);
      toast.error('Failed to create record');
    }
  }

  async function handleUpdate(recordId: string) {
    if (!canPerformAction('demo-module', 'update')) {
      toast.error('You do not have permission to update records');
      return;
    }

    try {
      await db.update(
        recordId,
        { status: 'updated' },
        'demo-module'
      );
      toast.success('Record updated successfully');
      loadRecords();
    } catch (error) {
      console.error('Failed to update record:', error);
      toast.error('Failed to update record');
    }
  }

  async function handleDelete(recordId: string) {
    if (!canPerformAction('demo-module', 'delete')) {
      toast.error('You do not have permission to delete records');
      return;
    }

    try {
      // Delete from both KV and vector DB
      await db.removeComplete(recordId);
      toast.success('Record deleted successfully');
      loadRecords();
    } catch (error) {
      console.error('Failed to delete record:', error);
      toast.error('Failed to delete record');
    }
  }

  async function handleVectorSearch() {
    if (!searchQuery.trim()) {
      toast.error('Please enter a search query');
      return;
    }

    try {
      const results = await db.searchVector(searchQuery, {
        module: 'demo-module',
        limit: 10,
        threshold: 0.5,
      });
      setSearchResults(results);
      toast.success(`Found ${results.length} similar records`);
    } catch (error) {
      console.error('Search failed:', error);
      toast.error('Search failed');
    }
  }

  async function handleGetAIContext() {
    if (!searchQuery.trim()) {
      toast.error('Please enter a query');
      return;
    }

    try {
      const context = await db.getAIContext(searchQuery, 'demo-module');
      console.log('AI Context:', context);
      toast.success('AI context retrieved - check console');
    } catch (error) {
      console.error('Failed to get AI context:', error);
      toast.error('Failed to get AI context');
    }
  }

  const session = getCurrentSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#101725] to-[#182336] p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl text-white mb-2">Database Integration Demo</h1>
            <p className="text-[#6F83A7]">
              Testing RBAC, KV Store, and Vector Database
            </p>
          </div>
          
          {/* Session Info */}
          {session && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-[#57ACAF]" />
                <span className="text-sm text-white">Session Info</span>
              </div>
              <div className="space-y-1 text-xs text-[#6F83A7]">
                <div>User: {session.name}</div>
                <div>Company: {session.companyId}</div>
                <div>Role: <Badge className="text-xs">{session.role}</Badge></div>
              </div>
            </div>
          )}
        </div>

        {/* Permission Check Demo */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              {hasModuleAccess('demo-module') ? (
                <CheckCircle2 className="w-4 h-4 text-[#57ACAF]" />
              ) : (
                <XCircle className="w-4 h-4 text-red-400" />
              )}
              <span className="text-sm text-white">Module Access</span>
            </div>
            <p className="text-xs text-[#6F83A7]">
              {hasModuleAccess('demo-module') ? 'Granted' : 'Denied'}
            </p>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              {hasPermission('create') ? (
                <CheckCircle2 className="w-4 h-4 text-[#57ACAF]" />
              ) : (
                <XCircle className="w-4 h-4 text-red-400" />
              )}
              <span className="text-sm text-white">Create Permission</span>
            </div>
            <p className="text-xs text-[#6F83A7]">
              {hasPermission('create') ? 'Granted' : 'Denied'}
            </p>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              {hasPermission('delete') ? (
                <CheckCircle2 className="w-4 h-4 text-[#57ACAF]" />
              ) : (
                <XCircle className="w-4 h-4 text-red-400" />
              )}
              <span className="text-sm text-white">Delete Permission</span>
            </div>
            <p className="text-xs text-[#6F83A7]">
              {hasPermission('delete') ? 'Granted' : 'Denied'}
            </p>
          </div>
        </div>

        {/* Create Record Form */}
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Plus className="w-5 h-5 text-[#57ACAF]" />
            <h2 className="text-xl text-white">Create New Record</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Input
              placeholder="Title"
              value={newRecord.title}
              onChange={(e) => setNewRecord({ ...newRecord, title: e.target.value })}
              className="bg-white/5 border-white/10 text-white"
            />
            <Input
              placeholder="Description"
              value={newRecord.description}
              onChange={(e) => setNewRecord({ ...newRecord, description: e.target.value })}
              className="bg-white/5 border-white/10 text-white"
            />
          </div>
          
          <Button
            onClick={handleCreate}
            disabled={!newRecord.title || !newRecord.description || db.isLoading}
            className="bg-gradient-to-r from-[#57ACAF] to-[#57ACAF]/80 text-white"
          >
            <Database className="w-4 h-4 mr-2" />
            Create Record
          </Button>
        </div>

        {/* Vector Search */}
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[#EAB308]" />
            <h2 className="text-xl text-white">Vector Search (AI-Powered)</h2>
          </div>
          
          <div className="flex gap-4 mb-4">
            <Input
              placeholder="Enter search query..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-white/5 border-white/10 text-white"
            />
            <Button
              onClick={handleVectorSearch}
              disabled={db.isLoading}
              className="bg-gradient-to-r from-[#EAB308] to-[#EAB308]/80 text-black"
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
            <Button
              onClick={handleGetAIContext}
              disabled={db.isLoading}
              variant="outline"
              className="border-white/10 text-white hover:bg-white/5"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Get AI Context
            </Button>
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm text-[#6F83A7] mb-2">
                Search Results ({searchResults.length})
              </h3>
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-lg p-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-white mb-1">{result.content}</p>
                      <p className="text-xs text-[#6F83A7]">
                        Similarity: {(result.similarity * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Records List */}
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-[#57ACAF]" />
              <h2 className="text-xl text-white">Stored Records ({records.length})</h2>
            </div>
            <Button
              onClick={loadRecords}
              variant="outline"
              size="sm"
              className="border-white/10 text-white hover:bg-white/5"
            >
              Refresh
            </Button>
          </div>

          {db.isLoading && (
            <div className="text-center py-8 text-[#6F83A7]">
              Loading...
            </div>
          )}

          {!db.isLoading && records.length === 0 && (
            <div className="text-center py-8 text-[#6F83A7]">
              No records found. Create one to get started.
            </div>
          )}

          <div className="space-y-2">
            {records.map((record) => (
              <div
                key={record.id}
                className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all duration-180"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-white mb-1">{record.title}</h3>
                    <p className="text-sm text-[#6F83A7] mb-2">{record.description}</p>
                    <div className="flex items-center gap-2">
                      <Badge className="text-xs">{record.status}</Badge>
                      <span className="text-xs text-[#6F83A7]">
                        Updated: {new Date(record.updatedAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {canPerformAction('demo-module', 'update') && (
                      <Button
                        onClick={() => handleUpdate(record.id)}
                        size="sm"
                        variant="outline"
                        className="border-white/10 text-white hover:bg-white/5"
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                    )}
                    {canPerformAction('demo-module', 'delete') && (
                      <Button
                        onClick={() => handleDelete(record.id)}
                        size="sm"
                        variant="outline"
                        className="border-red-500/20 text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Error Display */}
        {db.error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
            <p className="text-red-400 text-sm">{db.error.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
