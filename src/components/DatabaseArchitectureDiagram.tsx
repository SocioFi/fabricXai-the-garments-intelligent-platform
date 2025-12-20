/**
 * Database Architecture Diagram Component
 * Visual representation of FabricXAI's database integration
 */

import { Database, Shield, Search, Layers, Server, Cloud, Users } from 'lucide-react';

export function DatabaseArchitectureDiagram() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#101725] to-[#182336] p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl text-white mb-3">FabricXAI Database Architecture</h1>
          <p className="text-[#6F83A7] text-lg">
            Multi-tenant, RBAC-enabled, AI-powered data layer
          </p>
        </div>

        {/* Architecture Diagram */}
        <div className="space-y-6">
          
          {/* Layer 1: Frontend */}
          <div className="bg-gradient-to-br from-[#57ACAF]/20 to-[#57ACAF]/5 border-2 border-[#57ACAF]/30 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#57ACAF] to-[#57ACAF]/60 flex items-center justify-center">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl text-white">Frontend Layer</h2>
                <p className="text-sm text-[#6F83A7]">React Components & Hooks</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-[#57ACAF] mb-2">useDatabase()</div>
                <div className="text-xs text-[#6F83A7] space-y-1">
                  <div>• store()</div>
                  <div>• get()</div>
                  <div>• update()</div>
                  <div>• delete()</div>
                  <div>• searchVector()</div>
                </div>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-[#57ACAF] mb-2">RBAC Functions</div>
                <div className="text-xs text-[#6F83A7] space-y-1">
                  <div>• hasModuleAccess()</div>
                  <div>• hasPermission()</div>
                  <div>• canPerformAction()</div>
                  <div>• getCurrentSession()</div>
                </div>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-[#57ACAF] mb-2">Session Management</div>
                <div className="text-xs text-[#6F83A7] space-y-1">
                  <div>• User ID</div>
                  <div>• Company ID</div>
                  <div>• Role</div>
                  <div>• Permissions</div>
                </div>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center">
            <div className="w-1 h-8 bg-gradient-to-b from-[#57ACAF] to-[#EAB308]" />
          </div>

          {/* Layer 2: Database Integration */}
          <div className="bg-gradient-to-br from-[#EAB308]/20 to-[#EAB308]/5 border-2 border-[#EAB308]/30 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#EAB308] to-[#EAB308]/60 flex items-center justify-center">
                <Search className="w-6 h-6 text-black" />
              </div>
              <div>
                <h2 className="text-2xl text-white">Integration Layer</h2>
                <p className="text-sm text-[#6F83A7]">Database & Vector Store Utilities</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-[#EAB308] mb-2">database.tsx</div>
                <div className="text-xs text-[#6F83A7] space-y-1">
                  <div>• storeData()</div>
                  <div>• getData()</div>
                  <div>• getDataByModule()</div>
                  <div>• updateData()</div>
                  <div>• deleteData()</div>
                  <div>• batchStoreData()</div>
                </div>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-[#EAB308] mb-2">vector_store.tsx</div>
                <div className="text-xs text-[#6F83A7] space-y-1">
                  <div>• storeDocument()</div>
                  <div>• searchSimilar()</div>
                  <div>• generateEmbedding()</div>
                  <div>• getAIContext()</div>
                  <div>• batchStoreDocuments()</div>
                </div>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center">
            <div className="w-1 h-8 bg-gradient-to-b from-[#EAB308] to-[#6F83A7]" />
          </div>

          {/* Layer 3: Server */}
          <div className="bg-gradient-to-br from-[#6F83A7]/20 to-[#6F83A7]/5 border-2 border-[#6F83A7]/30 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6F83A7] to-[#6F83A7]/60 flex items-center justify-center">
                <Server className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl text-white">Server Layer</h2>
                <p className="text-sm text-[#6F83A7]">Hono API with RBAC Middleware</p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-[#6F83A7] text-xs mb-2">Data Endpoints</div>
                <div className="text-xs text-white/60 space-y-1">
                  <div>/data/store</div>
                  <div>/data/get</div>
                  <div>/data/update</div>
                  <div>/data/delete</div>
                </div>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-[#6F83A7] text-xs mb-2">Vector Endpoints</div>
                <div className="text-xs text-white/60 space-y-1">
                  <div>/vectors/store</div>
                  <div>/vectors/search</div>
                  <div>/embeddings/gen</div>
                </div>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-[#6F83A7] text-xs mb-2">Analytics</div>
                <div className="text-xs text-white/60 space-y-1">
                  <div>/analytics/company</div>
                  <div>/analytics/module</div>
                </div>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-[#6F83A7] text-xs mb-2">Middleware</div>
                <div className="text-xs text-white/60 space-y-1">
                  <div>validateAuth()</div>
                  <div>Company isolation</div>
                  <div>Permission check</div>
                </div>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center">
            <div className="w-1 h-8 bg-gradient-to-b from-[#6F83A7] to-white/20" />
          </div>

          {/* Layer 4: Storage */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/20 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl text-white">Storage Layer</h2>
                <p className="text-sm text-[#6F83A7]">Supabase KV Store (PostgreSQL)</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-white mb-2 flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  Regular Data
                </div>
                <div className="text-xs text-[#6F83A7] space-y-1">
                  <div>Key: {'{companyId}:{recordId}'}</div>
                  <div>• Metadata</div>
                  <div>• Timestamps</div>
                  <div>• Ownership info</div>
                  <div>• Module tagging</div>
                </div>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-white mb-2 flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Vector Data
                </div>
                <div className="text-xs text-[#6F83A7] space-y-1">
                  <div>Key: vector:{'{recordId}'}</div>
                  <div>• 384-dim embeddings</div>
                  <div>• Searchable content</div>
                  <div>• AI context data</div>
                  <div>• Module indexing</div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-4 gap-4 mt-12">
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-6 text-center">
              <Shield className="w-8 h-8 text-[#57ACAF] mx-auto mb-3" />
              <h3 className="text-white mb-2">RBAC</h3>
              <p className="text-xs text-[#6F83A7]">11 roles, 6 permissions, 14 modules</p>
            </div>
            
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-6 text-center">
              <Users className="w-8 h-8 text-[#EAB308] mx-auto mb-3" />
              <h3 className="text-white mb-2">Multi-Tenant</h3>
              <p className="text-xs text-[#6F83A7]">Company-level data isolation</p>
            </div>
            
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-6 text-center">
              <Search className="w-8 h-8 text-[#6F83A7] mx-auto mb-3" />
              <h3 className="text-white mb-2">AI Search</h3>
              <p className="text-xs text-[#6F83A7]">Semantic vector similarity</p>
            </div>
            
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-6 text-center">
              <Cloud className="w-8 h-8 text-white/60 mx-auto mb-3" />
              <h3 className="text-white mb-2">Edge Deployed</h3>
              <p className="text-xs text-[#6F83A7]">Supabase edge functions</p>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-gradient-to-r from-[#57ACAF]/10 via-[#EAB308]/10 to-[#6F83A7]/10 border border-white/10 rounded-2xl p-6 mt-8">
            <div className="grid grid-cols-5 gap-6 text-center">
              <div>
                <div className="text-3xl text-white mb-1">11</div>
                <div className="text-xs text-[#6F83A7]">User Roles</div>
              </div>
              <div>
                <div className="text-3xl text-white mb-1">14</div>
                <div className="text-xs text-[#6F83A7]">Modules</div>
              </div>
              <div>
                <div className="text-3xl text-white mb-1">6</div>
                <div className="text-xs text-[#6F83A7]">Permissions</div>
              </div>
              <div>
                <div className="text-3xl text-white mb-1">384</div>
                <div className="text-xs text-[#6F83A7]">Embedding Dims</div>
              </div>
              <div>
                <div className="text-3xl text-white mb-1">∞</div>
                <div className="text-xs text-[#6F83A7]">Scalability</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
