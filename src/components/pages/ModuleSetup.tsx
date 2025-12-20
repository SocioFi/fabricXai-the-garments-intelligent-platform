import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Users, Building2, Truck, FileText, Calculator, Calendar,
  HardHat, Wrench, Package, Shield, Ship, DollarSign,
  BookOpen, Leaf, BarChart3, ChevronRight, Sparkles,
  Lock, Check
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface ModuleSetupProps {
  onNavigate: (page: string) => void;
  onAskMarbim: (prompt: string) => void;
}

interface Module {
  id: string;
  name: string;
  icon: any;
  description: string;
  status: 'locked' | 'available' | 'onboarding' | 'active';
  impact: string;
  color: string;
}

export function ModuleSetup({ onNavigate, onAskMarbim }: ModuleSetupProps) {
  const modules: Module[] = [
    {
      id: 'lead-management',
      name: 'Lead Management',
      icon: Users,
      description: 'Centralize and score all leads. AI finds high-fit buyers, drafts follow-ups, and logs interactions.',
      status: 'active',
      impact: 'More RFQs from same outreach',
      color: '#57ACAF',
    },
    {
      id: 'buyer-management',
      name: 'Buyer Management',
      icon: Building2,
      description: 'Manage all buyers, contracts, and sentiment health in one place.',
      status: 'available',
      impact: 'Predict churn early',
      color: '#57ACAF',
    },
    {
      id: 'supplier-evaluation',
      name: 'Supplier Evaluation',
      icon: Truck,
      description: 'Compare supplier quotes, certifications, and reliability.',
      status: 'available',
      impact: 'Better sourcing decisions',
      color: '#EAB308',
    },
    {
      id: 'rfq-quotation',
      name: 'RFQ & Quotation',
      icon: FileText,
      description: 'Parse RFQs, auto-fill BOM, generate quotes.',
      status: 'available',
      impact: 'Faster response → higher win rate',
      color: '#57ACAF',
    },
    {
      id: 'costing',
      name: 'Costing',
      icon: Calculator,
      description: 'AI-driven cost sheet builder with yield prediction.',
      status: 'available',
      impact: 'Accurate margins',
      color: '#EAB308',
    },
    {
      id: 'production-planning',
      name: 'Production Planning & WIP',
      icon: Calendar,
      description: 'Predict delays, optimize line allocations.',
      status: 'available',
      impact: 'Reduce late orders',
      color: '#57ACAF',
    },
    {
      id: 'workforce-management',
      name: 'Workforce Management',
      icon: HardHat,
      description: 'Track attendance, skills, and training.',
      status: 'available',
      impact: 'Higher efficiency per shift',
      color: '#6F83A7',
    },
    {
      id: 'machine-maintenance',
      name: 'Machine Maintenance',
      icon: Wrench,
      description: 'Predict breakdowns, automate service scheduling.',
      status: 'available',
      impact: 'Minimize downtime',
      color: '#EAB308',
    },
    {
      id: 'inventory-management',
      name: 'Inventory Management',
      icon: Package,
      description: 'Track fabric, trims, and FG stock in real time.',
      status: 'available',
      impact: 'Prevent shortages',
      color: '#57ACAF',
    },
    {
      id: 'quality-control',
      name: 'Quality Control',
      icon: Shield,
      description: 'Digitize inline and final inspections.',
      status: 'available',
      impact: 'Reduced rework',
      color: '#6F83A7',
    },
    {
      id: 'shipment',
      name: 'Shipment & Delivery',
      icon: Ship,
      description: 'Automate bookings, documents, and buyer updates.',
      status: 'available',
      impact: 'Higher OTIF',
      color: '#57ACAF',
    },
    {
      id: 'finance',
      name: 'Finance',
      icon: DollarSign,
      description: 'Control AR/AP, margins, and cash flow with predictive analytics.',
      status: 'available',
      impact: 'Margin control',
      color: '#EAB308',
    },
    {
      id: 'compliance-policy',
      name: 'Compliance & Policy',
      icon: BookOpen,
      description: 'Manage policies, audits, and NCs.',
      status: 'available',
      impact: 'Zero audit failure',
      color: '#6F83A7',
    },
    {
      id: 'sustainability',
      name: 'Sustainability',
      icon: Leaf,
      description: 'Track ESG metrics and DPP traceability.',
      status: 'available',
      impact: 'ESG compliance',
      color: '#57ACAF',
    },
    {
      id: 'analytics',
      name: 'Analytics & Reporting',
      icon: BarChart3,
      description: 'Unified KPI dashboard and AI explainers.',
      status: 'available',
      impact: 'Full visibility',
      color: '#EAB308',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="bg-[#57ACAF]/10 text-[#57ACAF] border border-[#57ACAF]/20">
            <Check className="w-3 h-3 mr-1" />
            Active
          </Badge>
        );
      case 'onboarding':
        return (
          <Badge className="bg-[#EAB308]/10 text-[#EAB308] border border-[#EAB308]/20">
            <Sparkles className="w-3 h-3 mr-1" />
            In Setup
          </Badge>
        );
      case 'locked':
        return (
          <Badge className="bg-white/5 text-[#6F83A7] border border-white/10">
            <Lock className="w-3 h-3 mr-1" />
            Locked
          </Badge>
        );
      default:
        return (
          <Badge className="bg-white/5 text-white/70 border border-white/10">
            Available
          </Badge>
        );
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-[#101725] to-[#182336] overflow-auto">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#0D1117]/50 backdrop-blur-sm">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl text-white mb-2">Module Setup Center</h1>
              <p className="text-[#6F83A7]">
                Activate and configure your fabricXai modules with AI-guided onboarding
              </p>
            </div>
            <Button
              onClick={() => onAskMarbim('Help me choose which modules to activate based on my factory needs')}
              className="bg-gradient-to-r from-[#EAB308] to-[#EAB308]/80 hover:from-[#EAB308]/90 hover:to-[#EAB308]/70 text-black shadow-lg shadow-[#EAB308]/20"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Ask MARBIM for Guidance
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="px-8 py-6 border-b border-white/10">
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-[#6F83A7] mb-1">Active Modules</p>
                <p className="text-2xl text-white">1</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-[#57ACAF]/10 flex items-center justify-center">
                <Check className="w-5 h-5 text-[#57ACAF]" />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-[#6F83A7] mb-1">In Setup</p>
                <p className="text-2xl text-white">0</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-[#EAB308]/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#EAB308]" />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-[#6F83A7] mb-1">Available</p>
                <p className="text-2xl text-white">14</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                <Package className="w-5 h-5 text-white/50" />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-[#6F83A7] mb-1">Completion</p>
                <p className="text-2xl text-white">7%</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-[#6F83A7]/10 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-[#6F83A7]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="px-8 py-6">
        <div className="grid grid-cols-3 gap-5">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group"
            >
              <div className="h-full bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300 cursor-pointer"
                onClick={() => {
                  if (module.status !== 'locked') {
                    onNavigate(`modules/${module.id}/intro`);
                  }
                }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${module.color}20 0%, ${module.color}10 100%)`,
                    }}
                  >
                    <module.icon className="w-6 h-6" style={{ color: module.color }} />
                  </div>
                  {getStatusBadge(module.status)}
                </div>

                {/* Content */}
                <h3 className="text-lg text-white mb-2 group-hover:text-[#57ACAF] transition-colors">
                  {module.name}
                </h3>
                <p className="text-sm text-[#6F83A7] mb-4 line-clamp-2">
                  {module.description}
                </p>

                {/* Impact */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#EAB308]" />
                    <span className="text-xs text-white/70">{module.impact}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#6F83A7] group-hover:text-[#57ACAF] group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
