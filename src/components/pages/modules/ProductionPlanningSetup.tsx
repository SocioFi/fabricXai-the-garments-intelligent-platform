import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Calendar, Users, Layers, Package, AlertTriangle, Settings,
  CheckCircle, Circle, Clock, TrendingUp, BarChart3, Activity,
  Zap, Brain, ArrowRight, Sparkles, Target, Factory,
  Scissors, Wrench, Box, Truck, ChevronRight, PlayCircle,
  AlertCircle, CheckCircle2, Loader2, MessageSquare, X
} from 'lucide-react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { ScrollArea } from '../../ui/scroll-area';

interface ProductionPlanningSetupProps {
  onNavigate: (page: string) => void;
  onAskMarbim: (prompt: string) => void;
}

export function ProductionPlanningSetup({ onNavigate, onAskMarbim }: ProductionPlanningSetupProps) {
  const [setupProgress] = useState(60);
  const [showAIChat, setShowAIChat] = useState(false);

  // KPI data
  const kpis = [
    { label: 'Orders On-Time', value: '92%', trend: '+5%', positive: true, sparkline: [78, 82, 85, 88, 90, 92] },
    { label: 'Line Efficiency', value: '87%', trend: '-2%', positive: false, sparkline: [89, 90, 88, 87, 88, 87] },
    { label: 'WIP - Sewing', value: '1,240', trend: '+120', positive: false, sparkline: [1100, 1120, 1150, 1180, 1200, 1240] },
    { label: 'Material Readiness', value: '94%', trend: '+3%', positive: true, sparkline: [88, 90, 91, 92, 93, 94] },
    { label: 'Downtime Hours', value: '12h', trend: '-4h', positive: true, sparkline: [20, 18, 16, 15, 14, 12] },
    { label: 'Capacity Utilization', value: '89%', trend: '+6%', positive: true, sparkline: [80, 82, 85, 86, 88, 89] },
  ];

  // Module components
  const moduleComponents = [
    {
      id: 'master-plan',
      title: 'Master Plan (Gantt)',
      icon: Calendar,
      description: 'Central Gantt view from fabric arrival to dispatch.',
      tags: ['Overview', 'What-If', 'Approvals', 'AI Insights'],
      aiPowered: true,
      color: '#57ACAF',
    },
    {
      id: 'line-allocation',
      title: 'Line Allocation',
      icon: Users,
      description: 'Assign orders to lines using SMV, skills, and real-time capacity.',
      tags: ['By Line', 'By Style', 'Skill Matrix', 'AI Allocation'],
      aiPowered: true,
      color: '#EAB308',
    },
    {
      id: 'tna-calendar',
      title: 'T&A Calendar',
      icon: Clock,
      description: 'Milestone tracking from cutting to shipment with auto-updates.',
      tags: ['Milestones', 'Dependencies', 'Approvals', 'AI Replanning'],
      aiPowered: true,
      color: '#57ACAF',
    },
    {
      id: 'materials-shortages',
      title: 'Materials & Shortages',
      icon: Package,
      description: 'Monitor material readiness, shortages, and expedite actions.',
      tags: ['Material Status', 'Shortages', 'Expedite', 'AI Remedies'],
      aiPowered: true,
      color: '#EAB308',
    },
    {
      id: 'risk-ai',
      title: 'Risk & AI',
      icon: AlertTriangle,
      description: 'Predictive risks, root causes, and alternative options.',
      tags: ['Delay Predictions', 'Root Causes', 'Alternatives', 'AI Scenarios'],
      aiPowered: true,
      color: '#57ACAF',
    },
    {
      id: 'setup-config',
      title: 'Setup & Configuration',
      icon: Settings,
      description: 'Connect lines, SMVs, calendars, and inventory to activate this module.',
      tags: ['Line Master', 'SMV Upload', 'Calendar Mapping', 'Inventory'],
      aiPowered: false,
      color: '#6F83A7',
    },
  ];

  // Setup checklist
  const setupSteps = [
    { id: 1, title: 'Connect line master & capacity', status: 'completed' },
    { id: 2, title: 'Upload SMV and styles data', status: 'completed' },
    { id: 3, title: 'Sync inventory & materials (fabrics, trims)', status: 'in-progress' },
    { id: 4, title: 'Configure T&A calendar template', status: 'not-started' },
    { id: 5, title: 'Enable MARBIM for planning & risk alerts', status: 'not-started' },
  ];

  // AI insights
  const aiInsights = [
    {
      id: 1,
      text: 'Bottleneck detected in Sewing — 2-day delay expected on Order #1124',
      severity: 'critical',
      actions: ['View Details', 'Reallocate'],
    },
    {
      id: 2,
      text: 'Reallocate Order #1203 to Line 6 to improve throughput by 8%',
      severity: 'opportunity',
      actions: ['Apply Scenario', 'View Master Plan'],
    },
    {
      id: 3,
      text: 'Trim shortage for Buyer X — suggest parallel scheduling with Order #1198',
      severity: 'warning',
      actions: ['View Shortage', 'Notify Planner'],
    },
  ];

  // Workflow steps
  const workflowSteps = [
    { label: 'Orders', sublabel: 'Buyer POs' },
    { label: 'Master Plan', sublabel: 'AI recalculates' },
    { label: 'Line Allocation', sublabel: 'Real-time capacity' },
    { label: 'T&A Calendar', sublabel: 'Milestones' },
    { label: 'WIP & Materials', sublabel: 'Live tracking' },
    { label: 'Risk & AI', sublabel: 'Predictions' },
    { label: 'On-Time Delivery', sublabel: 'Target achieved' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-[#57ACAF]" />;
      case 'in-progress':
        return <Loader2 className="w-5 h-5 text-[#EAB308] animate-spin" />;
      default:
        return <Circle className="w-5 h-5 text-[#6F83A7]" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return { bg: 'from-red-500/10 to-red-500/5', border: 'border-red-500/20', badge: 'bg-red-500/20 text-red-400' };
      case 'warning':
        return { bg: 'from-[#EAB308]/10 to-[#EAB308]/5', border: 'border-[#EAB308]/20', badge: 'bg-[#EAB308]/20 text-[#EAB308]' };
      case 'opportunity':
        return { bg: 'from-[#57ACAF]/10 to-[#57ACAF]/5', border: 'border-[#57ACAF]/20', badge: 'bg-[#57ACAF]/20 text-[#57ACAF]' };
      default:
        return { bg: 'from-white/5 to-white/[0.02]', border: 'border-white/10', badge: 'bg-white/10 text-white' };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F1C] via-[#101725] to-[#0A0F1C]">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-[600px] h-[600px] bg-[#57ACAF]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-[#EAB308]/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
      </div>

      <ScrollArea className="h-screen">
        <div className="relative px-8 py-12">
          <div className="max-w-7xl mx-auto space-y-12">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              {/* Left Side - Content */}
              <div>
                <Badge className="bg-gradient-to-r from-[#57ACAF]/20 to-[#EAB308]/20 text-white border border-[#57ACAF]/30 px-4 py-2 mb-6">
                  <Factory className="w-4 h-4 inline mr-2" />
                  Production Planning & WIP
                </Badge>

                <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
                  Turn Chaos into a{' '}
                  <span className="bg-gradient-to-r from-[#57ACAF] to-[#EAB308] bg-clip-text text-transparent">
                    Living Plan
                  </span>
                </h1>

                <p className="text-2xl text-[#6F83A7] mb-8 leading-relaxed">
                  Connect orders, lines, materials, and time into one AI-coordinated schedule that recalculates every time reality changes.
                </p>

                {/* Value Props */}
                <div className="space-y-4 mb-10">
                  {[
                    { icon: Calendar, text: 'AI-coordinated Master Plan (Gantt)', color: '#57ACAF' },
                    { icon: Activity, text: 'Real-time Line Allocation & WIP', color: '#EAB308' },
                    { icon: AlertTriangle, text: 'Predictive delay & bottleneck alerts', color: '#57ACAF' },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: `${item.color}20` }}
                      >
                        <item.icon className="w-6 h-6" style={{ color: item.color }} />
                      </div>
                      <span className="text-white text-lg">{item.text}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex items-center gap-4">
                  <Button
                    onClick={() => onNavigate('production-planning/setup')}
                    className="bg-gradient-to-r from-[#57ACAF] to-[#57ACAF]/80 hover:from-[#57ACAF]/90 hover:to-[#57ACAF]/70 text-white px-8 py-6 text-lg rounded-2xl shadow-2xl shadow-[#57ACAF]/30"
                  >
                    <Settings className="w-5 h-5 mr-2" />
                    Configure Planning Engine
                  </Button>
                  <Button
                    onClick={() => onNavigate('production-planning/dashboard')}
                    variant="outline"
                    className="border-2 border-white/20 bg-white/5 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-2xl"
                  >
                    <PlayCircle className="w-5 h-5 mr-2" />
                    View Live Dashboard
                  </Button>
                </div>
              </div>

              {/* Right Side - Gantt + Heatmap Preview */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                  {/* Mini Gantt Preview */}
                  <div className="mb-6">
                    <p className="text-white text-sm font-medium mb-4">Production Stages</p>
                    <div className="space-y-3">
                      {[
                        { stage: 'Cutting', progress: 85, color: '#57ACAF', duration: '2 days' },
                        { stage: 'Sewing', progress: 62, color: '#EAB308', duration: '5 days' },
                        { stage: 'Finishing', progress: 40, color: '#57ACAF', duration: '1 day' },
                        { stage: 'Packing', progress: 15, color: '#6F83A7', duration: '1 day' },
                      ].map((item, idx) => (
                        <div key={idx} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-white text-sm">{item.stage}</span>
                            <span className="text-[#6F83A7] text-xs">{item.duration}</span>
                          </div>
                          <div className="h-8 bg-white/5 rounded-lg overflow-hidden border border-white/10">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${item.progress}%` }}
                              transition={{ delay: 0.5 + idx * 0.1, duration: 0.8 }}
                              className="h-full rounded-lg"
                              style={{ background: `linear-gradient(90deg, ${item.color}, ${item.color}CC)` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Line Heatmap */}
                  <div>
                    <p className="text-white text-sm font-medium mb-4">Line Efficiency Heatmap</p>
                    <div className="grid grid-cols-8 gap-2">
                      {Array.from({ length: 40 }).map((_, idx) => {
                        const efficiency = Math.random();
                        const color = efficiency > 0.7 ? '#57ACAF' : efficiency > 0.4 ? '#EAB308' : '#EF4444';
                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 0.3 + efficiency * 0.7, scale: 1 }}
                            transition={{ delay: 0.8 + idx * 0.01 }}
                            className="aspect-square rounded-lg"
                            style={{ background: color }}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* MARBIM AI Overlay */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="absolute -bottom-6 -right-6 bg-gradient-to-br from-[#EAB308] to-[#EAB308]/80 text-black rounded-2xl p-6 shadow-2xl shadow-[#EAB308]/40 max-w-xs"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-black/10 flex items-center justify-center flex-shrink-0">
                        <Brain className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-sm mb-1">MARBIM Suggests</p>
                        <p className="text-sm opacity-90">
                          Reallocate Order #1203 to Line 6 to improve throughput by 8%
                        </p>
                      </div>
                    </div>
                    <Button size="sm" className="bg-black/20 hover:bg-black/30 text-black border-0 w-full">
                      Apply Suggestion
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* KPI Summary Strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Real-Time Performance</h2>
                <Badge className="bg-[#EAB308]/10 text-[#EAB308] border border-[#EAB308]/20 px-3 py-1">
                  <Sparkles className="w-3 h-3 inline mr-1" />
                  Powered by live data
                </Badge>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                {kpis.map((kpi, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + idx * 0.05 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="relative group"
                  >
                    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg group-hover:shadow-2xl group-hover:border-[#57ACAF]/30 transition-all">
                      {/* Sparkline */}
                      <div className="flex items-end justify-between h-8 mb-4 opacity-40">
                        {kpi.sparkline.map((value, i) => (
                          <div
                            key={i}
                            className="w-1.5 rounded-full bg-gradient-to-t from-[#57ACAF] to-[#EAB308]"
                            style={{ height: `${(value / Math.max(...kpi.sparkline)) * 100}%` }}
                          />
                        ))}
                      </div>

                      {/* Value */}
                      <p className="text-4xl font-bold text-white mb-2">{kpi.value}</p>

                      {/* Label & Trend */}
                      <div className="flex items-center justify-between">
                        <p className="text-[#6F83A7] text-sm">{kpi.label}</p>
                        <Badge
                          className={`text-xs px-2 py-0.5 ${
                            kpi.positive
                              ? 'bg-[#57ACAF]/20 text-[#57ACAF] border-[#57ACAF]/30'
                              : 'bg-[#EAB308]/20 text-[#EAB308] border-[#EAB308]/30'
                          }`}
                        >
                          {kpi.trend}
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <p className="text-[#6F83A7] text-sm">
                  💡 These KPIs will be powered once you complete module setup
                </p>
              </div>
            </motion.div>

            {/* Module Components Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-white mb-8">Module Components</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {moduleComponents.map((module, idx) => {
                  const Icon = module.icon;
                  return (
                    <motion.button
                      key={module.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + idx * 0.05 }}
                      whileHover={{ scale: 1.02, y: -4 }}
                      onClick={() => onNavigate(`production-planning/${module.id}`)}
                      className="relative group text-left"
                    >
                      {/* Glow Effect */}
                      <div
                        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity"
                        style={{ background: `radial-gradient(circle at center, ${module.color}40, transparent 70%)` }}
                      />

                      {/* Card */}
                      <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-lg group-hover:shadow-2xl group-hover:border-white/30 transition-all">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-6">
                          <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center"
                            style={{ background: `${module.color}20` }}
                          >
                            <Icon className="w-8 h-8" style={{ color: module.color }} />
                          </div>
                          {module.aiPowered && (
                            <Badge className="bg-gradient-to-r from-[#EAB308] to-[#57ACAF] text-black border-0 px-3 py-1">
                              <Brain className="w-3 h-3 inline mr-1" />
                              AI
                            </Badge>
                          )}
                        </div>

                        {/* Title & Description */}
                        <h3 className="text-xl font-bold text-white mb-3">{module.title}</h3>
                        <p className="text-[#6F83A7] text-sm leading-relaxed mb-6">{module.description}</p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {module.tags.map((tag, tagIdx) => (
                            <span
                              key={tagIdx}
                              className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Hover Arrow */}
                        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#57ACAF] to-[#57ACAF]/80 flex items-center justify-center">
                            <ArrowRight className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* Setup Checklist + Dashboard Preview */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Setup Checklist */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-lg h-full">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white">Module Setup</h3>
                    <Badge className="bg-[#57ACAF]/20 text-[#57ACAF] border border-[#57ACAF]/30 px-3 py-1">
                      {setupProgress}% Complete
                    </Badge>
                  </div>

                  <Progress value={setupProgress} className="mb-8 h-3" />

                  <div className="space-y-4 mb-8">
                    {setupSteps.map((step) => (
                      <div
                        key={step.id}
                        className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                      >
                        {getStatusIcon(step.status)}
                        <div className="flex-1">
                          <p className={`text-sm ${step.status === 'completed' ? 'text-white' : 'text-[#6F83A7]'}`}>
                            {step.title}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={() => onNavigate('production-planning/setup-wizard')}
                    className="w-full bg-gradient-to-r from-[#57ACAF] to-[#57ACAF]/80 hover:from-[#57ACAF]/90 hover:to-[#57ACAF]/70 text-white py-6 text-base rounded-2xl shadow-lg shadow-[#57ACAF]/30"
                  >
                    Continue Setup Wizard
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </motion.div>

              {/* Dashboard Preview */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-lg h-full">
                  <h3 className="text-2xl font-bold text-white mb-2">Live Planning Control Tower</h3>
                  <p className="text-[#6F83A7] text-sm mb-6">
                    This is what your dashboard will look like once setup is complete
                  </p>

                  {/* Line Heatmap Preview */}
                  <div className="mb-6">
                    <p className="text-white text-sm font-medium mb-3">Capacity Utilization by Line</p>
                    <div className="grid grid-cols-12 gap-1.5">
                      {Array.from({ length: 60 }).map((_, idx) => {
                        const utilization = Math.random();
                        const color = utilization > 0.75 ? '#EF4444' : utilization > 0.5 ? '#EAB308' : '#57ACAF';
                        return (
                          <div
                            key={idx}
                            className="aspect-square rounded-md"
                            style={{ background: color, opacity: 0.3 + utilization * 0.7 }}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Trend Chart Preview */}
                  <div>
                    <p className="text-white text-sm font-medium mb-3">Line Efficiency vs Target</p>
                    <div className="h-32 flex items-end justify-between gap-2">
                      {Array.from({ length: 12 }).map((_, idx) => {
                        const value = 60 + Math.random() * 30;
                        return (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                            <div
                              className="w-full rounded-t-lg bg-gradient-to-t from-[#57ACAF] to-[#57ACAF]/60"
                              style={{ height: `${value}%` }}
                            />
                          </div>
                        );
                      })}
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-[#EAB308] to-transparent mt-2" />
                    <p className="text-[#EAB308] text-xs text-center mt-1">85% Target</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* MARBIM AI Insight Strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">What MARBIM Does Here</h2>
                  <p className="text-[#6F83A7]">AI-powered insights for production optimization</p>
                </div>
                <Button
                  onClick={() => setShowAIChat(!showAIChat)}
                  variant="outline"
                  className="border-2 border-[#EAB308]/30 bg-[#EAB308]/10 text-[#EAB308] hover:bg-[#EAB308]/20"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Chat with MARBIM
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {aiInsights.map((insight, idx) => {
                  const colors = getSeverityColor(insight.severity);
                  return (
                    <motion.div
                      key={insight.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + idx * 0.1 }}
                      className="relative group"
                    >
                      <div className={`bg-gradient-to-br ${colors.bg} backdrop-blur-xl border ${colors.border} rounded-2xl p-6 shadow-lg group-hover:shadow-xl transition-all`}>
                        <div className="flex items-start justify-between mb-4">
                          <Brain className="w-6 h-6 text-[#EAB308]" />
                          <Badge className={`${colors.badge} border-0 text-xs px-2 py-1`}>
                            {insight.severity}
                          </Badge>
                        </div>

                        <p className="text-white text-sm leading-relaxed mb-6">{insight.text}</p>

                        <div className="flex flex-wrap gap-2">
                          {insight.actions.map((action, actionIdx) => (
                            <Button
                              key={actionIdx}
                              size="sm"
                              variant="outline"
                              className="border-white/20 bg-white/5 text-white hover:bg-white/10 text-xs"
                            >
                              {action}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* End-to-End Workflow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <h2 className="text-3xl font-bold text-white mb-8 text-center">End-to-End Workflow</h2>

              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-12 shadow-lg">
                <div className="flex items-center justify-between relative">
                  {/* Connection Line */}
                  <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-[#57ACAF] via-[#EAB308] to-[#57ACAF] opacity-20" />

                  {workflowSteps.map((step, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 + idx * 0.1 }}
                      className="flex flex-col items-center gap-3 relative z-10 flex-1"
                    >
                      {/* Node */}
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#57ACAF] to-[#57ACAF]/70 flex items-center justify-center shadow-lg shadow-[#57ACAF]/30">
                        <span className="text-white font-bold">{idx + 1}</span>
                      </div>

                      {/* Label */}
                      <div className="text-center">
                        <p className="text-white text-sm font-medium mb-1">{step.label}</p>
                        <p className="text-[#6F83A7] text-xs">{step.sublabel}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </ScrollArea>

      {/* Floating AI Chat Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onAskMarbim("Show me today's production risks and recommendations")}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#EAB308] to-[#EAB308]/80 shadow-2xl shadow-[#EAB308]/40 flex items-center justify-center z-50 hover:shadow-[#EAB308]/60 transition-all"
      >
        <Brain className="w-7 h-7 text-white" />
        <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 border-2 border-[#0A0F1C] flex items-center justify-center text-white text-xs font-bold">
          3
        </span>
      </motion.button>
    </div>
  );
}
