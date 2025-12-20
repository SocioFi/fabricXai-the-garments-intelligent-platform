/**
 * Database Seeding Panel Component
 * Provides UI to seed the Supabase database with mock data
 */

import { useState } from 'react';
import { Button } from './ui/button';
import { 
  Database, 
  Loader2, 
  CheckCircle2, 
  XCircle,
  Users,
  ShoppingBag,
  FileText,
  DollarSign,
  Factory,
  ClipboardCheck,
  RefreshCw,
} from 'lucide-react';
import {
  seedAllModules,
  seedLeadManagement,
  seedBuyerManagement,
  seedRFQQuotation,
  seedCosting,
  seedProductionPlanning,
  seedQualityControl,
  getSeedingStats,
} from '../utils/seedDatabase';
import { toast } from 'sonner';

export function DatabaseSeedingPanel() {
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedingModule, setSeedingModule] = useState<string | null>(null);
  const [lastSeeded, setLastSeeded] = useState<string | null>(null);
  const [showStats, setShowStats] = useState(false);

  const stats = getSeedingStats();

  const modules = [
    {
      name: 'Lead Management',
      icon: Users,
      color: '#57ACAF',
      seedFunction: seedLeadManagement,
      stats: `${stats.leadManagement.leads} leads, ${stats.leadManagement.campaigns} campaigns, ${stats.leadManagement.conversations} conversations`,
    },
    {
      name: 'Buyer Management',
      icon: ShoppingBag,
      color: '#EAB308',
      seedFunction: seedBuyerManagement,
      stats: `${stats.buyerManagement.buyers} buyers, ${stats.buyerManagement.issues} issues, ${stats.buyerManagement.feedback} feedback`,
    },
    {
      name: 'RFQ & Quotation',
      icon: FileText,
      color: '#6F83A7',
      seedFunction: seedRFQQuotation,
      stats: `${stats.rfqQuotation.rfqs} RFQs, ${stats.rfqQuotation.quotes} quotes`,
    },
    {
      name: 'Costing',
      icon: DollarSign,
      color: '#9333EA',
      seedFunction: seedCosting,
      stats: `${stats.costing.costSheets} cost sheets`,
    },
    {
      name: 'Production Planning',
      icon: Factory,
      color: '#57ACAF',
      seedFunction: seedProductionPlanning,
      stats: `${stats.productionPlanning.orders} orders, ${stats.productionPlanning.capacity} capacity records`,
    },
    {
      name: 'Quality Control',
      icon: ClipboardCheck,
      color: '#EAB308',
      seedFunction: seedQualityControl,
      stats: `${stats.qualityControl.inspections} inspections, ${stats.qualityControl.defects} defects`,
    },
  ];

  async function handleSeedAll() {
    setIsSeeding(true);
    setSeedingModule('all');
    
    try {
      await seedAllModules();
      toast.success('All modules seeded successfully!', {
        description: 'Database populated with comprehensive mock data',
      });
      setLastSeeded(new Date().toLocaleString());
    } catch (error) {
      console.error('Seeding failed:', error);
      toast.error('Failed to seed database', {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setIsSeeding(false);
      setSeedingModule(null);
    }
  }

  async function handleSeedModule(moduleName: string, seedFunction: () => Promise<void>) {
    setIsSeeding(true);
    setSeedingModule(moduleName);
    
    try {
      await seedFunction();
      toast.success(`${moduleName} seeded successfully!`);
      setLastSeeded(new Date().toLocaleString());
    } catch (error) {
      console.error(`Seeding ${moduleName} failed:`, error);
      toast.error(`Failed to seed ${moduleName}`, {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setIsSeeding(false);
      setSeedingModule(null);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Toggle Button */}
      <Button
        onClick={() => setShowStats(!showStats)}
        className="rounded-full w-14 h-14 bg-gradient-to-br from-[#57ACAF] to-[#57ACAF]/80 hover:from-[#57ACAF]/90 hover:to-[#57ACAF]/70 shadow-lg shadow-[#57ACAF]/30 border border-white/10"
      >
        <Database className="w-6 h-6" />
      </Button>

      {/* Seeding Panel */}
      {showStats && (
        <div className="absolute bottom-20 right-0 w-96 bg-gradient-to-br from-[#101725] to-[#182336] border border-white/10 rounded-2xl shadow-2xl p-6 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b border-white/10">
            <div>
              <h3 className="text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-[#57ACAF]" />
                Database Seeding
              </h3>
              <p className="text-xs text-[#6F83A7] mt-1">
                Populate modules with mock data
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowStats(false)}
              className="text-[#6F83A7] hover:text-white h-8 w-8 p-0"
            >
              <XCircle className="w-4 h-4" />
            </Button>
          </div>

          {/* Last Seeded Info */}
          {lastSeeded && (
            <div className="px-3 py-2 rounded-lg bg-[#57ACAF]/10 border border-[#57ACAF]/20">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#57ACAF]" />
                <p className="text-xs text-[#57ACAF]">
                  Last seeded: {lastSeeded}
                </p>
              </div>
            </div>
          )}

          {/* Seed All Button */}
          <Button
            onClick={handleSeedAll}
            disabled={isSeeding}
            className="w-full bg-gradient-to-r from-[#EAB308] to-[#EAB308]/80 text-black hover:from-[#EAB308]/90 hover:to-[#EAB308]/70 shadow-lg shadow-[#EAB308]/20"
          >
            {isSeeding && seedingModule === 'all' ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Seeding All Modules...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Seed All Modules
              </>
            )}
          </Button>

          {/* Individual Module Buttons */}
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            <p className="text-xs text-[#6F83A7] px-1">Or seed individually:</p>
            {modules.map((module) => {
              const Icon = module.icon;
              const isCurrentlySeeding = isSeeding && seedingModule === module.name;
              
              return (
                <button
                  key={module.name}
                  onClick={() => handleSeedModule(module.name, module.seedFunction)}
                  disabled={isSeeding}
                  className="w-full group"
                >
                  <div className="p-3 rounded-lg bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:bg-white/10 transition-all duration-200">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ 
                            background: `linear-gradient(135deg, ${module.color}33, ${module.color}1a)`,
                            border: `1px solid ${module.color}33`,
                          }}
                        >
                          {isCurrentlySeeding ? (
                            <Loader2 
                              className="w-5 h-5 animate-spin" 
                              style={{ color: module.color }}
                            />
                          ) : (
                            <Icon 
                              className="w-5 h-5" 
                              style={{ color: module.color }}
                            />
                          )}
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-sm text-white">
                            {module.name}
                          </p>
                          <p className="text-xs text-[#6F83A7] mt-0.5">
                            {module.stats}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Info */}
          <div className="pt-4 border-t border-white/10">
            <p className="text-xs text-[#6F83A7]">
              💡 This will add mock data to your database for testing. Existing data will not be affected.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
