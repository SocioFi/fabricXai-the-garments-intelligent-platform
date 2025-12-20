import { useState } from 'react';
import { motion } from 'motion/react';
import { Database, Upload, Search, Trash2, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { toast } from 'sonner';
import { useVectorStore } from '../utils/supabase/useVectorStore';
import { seedVectorDatabase, seedModuleData } from '../utils/supabase/seedVectorData';
import { VectorSearchResult } from '../utils/supabase/vector_store';

interface VectorDatabaseAdminProps {
  isOpen: boolean;
  onClose: () => void;
}

const modules = [
  'lead-management',
  'buyer-management',
  'supplier-evaluation',
  'rfq-quotation',
  'costing',
  'production-planning',
  'quality-control',
  'shipment',
  'finance',
  'sustainability',
  'compliance-policy',
  'workforce-management',
  'analytics'
];

export function VectorDatabaseAdmin({ isOpen, onClose }: VectorDatabaseAdminProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<VectorSearchResult[]>([]);
  const [selectedModule, setSelectedModule] = useState<string>('');
  const [isSeeding, setIsSeeding] = useState(false);
  const { search, isLoading } = useVectorStore();

  const handleSeedAll = async () => {
    setIsSeeding(true);
    try {
      await seedVectorDatabase();
      toast.success('Successfully seeded vector database with all modules');
    } catch (error) {
      toast.error('Failed to seed database');
      console.error(error);
    } finally {
      setIsSeeding(false);
    }
  };

  const handleSeedModule = async (module: string) => {
    setIsSeeding(true);
    try {
      await seedModuleData(module);
      toast.success(`Successfully seeded ${module} data`);
    } catch (error) {
      toast.error(`Failed to seed ${module}`);
      console.error(error);
    } finally {
      setIsSeeding(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a search query');
      return;
    }

    try {
      const results = await search(searchQuery, {
        limit: 10,
        module: selectedModule || undefined,
        threshold: 0.5,
      });
      setSearchResults(results);
      if (results.length === 0) {
        toast.info('No results found');
      } else {
        toast.success(`Found ${results.length} results`);
      }
    } catch (error) {
      toast.error('Search failed');
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-[#101725] to-[#182336] rounded-2xl border border-white/10 p-6 max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#EAB308]/20 to-[#EAB308]/5 flex items-center justify-center border border-[#EAB308]/20">
              <Database className="w-6 h-6 text-[#EAB308]" />
            </div>
            <div>
              <h2 className="text-xl text-white">Vector Database Admin</h2>
              <p className="text-sm text-white/60">Manage embeddings and search</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white/60 hover:text-white hover:bg-white/10"
          >
            ×
          </Button>
        </div>

        {/* Seed Section */}
        <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
          <h3 className="text-white mb-3 flex items-center gap-2">
            <Upload className="w-4 h-4 text-[#EAB308]" />
            Seed Database
          </h3>
          <div className="flex items-center gap-2 mb-4">
            <Button
              onClick={handleSeedAll}
              disabled={isSeeding}
              className="bg-gradient-to-r from-[#EAB308] to-[#EAB308]/80 hover:from-[#EAB308]/90 hover:to-[#EAB308]/70 text-black"
            >
              {isSeeding ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Seeding...
                </>
              ) : (
                <>
                  <Database className="w-4 h-4 mr-2" />
                  Seed All Modules
                </>
              )}
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {modules.map((module) => (
              <Button
                key={module}
                onClick={() => handleSeedModule(module)}
                disabled={isSeeding}
                variant="outline"
                size="sm"
                className="text-white/80 hover:text-white border-white/10 hover:bg-white/5 justify-start"
              >
                <CheckCircle className="w-3 h-3 mr-2" />
                {module}
              </Button>
            ))}
          </div>
        </div>

        {/* Search Section */}
        <div className="mb-4 p-4 rounded-xl bg-white/5 border border-white/10">
          <h3 className="text-white mb-3 flex items-center gap-2">
            <Search className="w-4 h-4 text-[#57ACAF]" />
            Vector Search
          </h3>
          <div className="flex gap-2 mb-3">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter search query..."
              className="flex-1 bg-white/5 border-white/10 text-white"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className="px-3 rounded-lg bg-white/5 border border-white/10 text-white"
            >
              <option value="">All Modules</option>
              {modules.map((module) => (
                <option key={module} value={module}>
                  {module}
                </option>
              ))}
            </select>
            <Button
              onClick={handleSearch}
              disabled={isLoading}
              className="bg-gradient-to-r from-[#57ACAF] to-[#57ACAF]/80 hover:from-[#57ACAF]/90 hover:to-[#57ACAF]/70 text-white"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Results */}
        <ScrollArea className="flex-1">
          {searchResults.length > 0 ? (
            <div className="space-y-3">
              {searchResults.map((result, index) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-[#57ACAF]/10 text-[#57ACAF] border border-[#57ACAF]/20">
                        {(result.similarity * 100).toFixed(1)}% match
                      </Badge>
                      <Badge className="bg-white/5 text-white/70 border border-white/10">
                        {result.metadata.module || 'general'}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-white/80 text-sm mb-2">{result.content}</p>
                  <div className="text-xs text-white/50">
                    ID: {result.id} • Type: {result.metadata.type || 'unknown'}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-white/40">
              <AlertCircle className="w-12 h-12 mb-3" />
              <p>No search results yet</p>
              <p className="text-sm">Try searching for something or seed the database first</p>
            </div>
          )}
        </ScrollArea>
      </motion.div>
    </motion.div>
  );
}
