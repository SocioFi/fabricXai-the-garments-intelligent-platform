import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  Users, TrendingUp, Target, Zap, ArrowRight, CheckCircle, 
  Mail, MessageSquare, LineChart, Award, Clock, DollarSign,
  Sparkles, Play, ChevronRight, BarChart3, Star, Globe,
  Rocket, Shield, Activity, Brain, FileText, AlertTriangle,
  Heart, TrendingDown, UserCheck, CreditCard, Package,
  Building2, MapPin, Phone, Calendar, XCircle, AlertCircle, Bell
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface BuyerManagementIntroProps {
  onNavigate: (page: string) => void;
  onAskMarbim: (prompt: string) => void;
}

export function BuyerManagementIntro({ onNavigate, onAskMarbim }: BuyerManagementIntroProps) {
  const [activeFeature, setActiveFeature] = useState(0);
  const [selectedSubPage, setSelectedSubPage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [activeRoleCard, setActiveRoleCard] = useState(0);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, 50]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  const features = [
    { icon: Target, label: 'Buyer 360 View', color: '#57ACAF' },
    { icon: Heart, label: 'Health Scoring', color: '#EAB308' },
    { icon: Brain, label: 'Churn Prediction', color: '#57ACAF' },
    { icon: TrendingUp, label: 'Upsell Signals', color: '#EAB308' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Sub-pages data structure
  const subPages = {
    'buyer-directory': {
      id: 'buyer-directory',
      name: 'Buyer Directory & Segmentation',
      icon: Users,
      color: '#57ACAF',
      description: 'Unified buyer database with AI segmentation',
      position: 'top-0 left-0',
      tabs: {
        overview: {
          title: 'Overview',
          icon: Target,
          features: [
            { name: 'Global Buyer Search', desc: 'Search by name, region, product category, or annual revenue—instant access to any buyer profile' },
            { name: 'Advanced Filters', desc: 'Filter by order volume, payment terms, on-time delivery rate, or risk score for targeted analysis' },
            { name: 'Bulk Actions', desc: 'Update tags, assign account managers, or export data for multiple buyers at once' },
            { name: 'Quick Stats Dashboard', desc: 'See total buyers, active accounts, revenue by region, and key account distribution' },
          ]
        },
        features: {
          title: 'Segmentation',
          icon: Sparkles,
          features: [
            { name: 'Strategic Tier Classification', desc: 'Tag buyers as Strategic, Growth, Watchlist, or Dormant based on revenue and engagement' },
            { name: 'Geographic Segmentation', desc: 'Organize by region (EU, US, Asia) with currency, payment terms, and compliance per zone' },
            { name: 'Product Category Groups', desc: 'Segment by specialty: woven, knit, denim, activewear—track performance by buyer vertical' },
            { name: 'Custom Tag System', desc: 'Create unlimited custom tags: sustainability-focused, fast-fashion, luxury, private label' },
          ]
        },
        automation: {
          title: 'Lists & Campaigns',
          icon: Zap,
          features: [
            { name: 'Saved Buyer Lists', desc: 'Create reusable lists for campaigns—"EU Strategic Buyers", "Dormant High-Margin Accounts"' },
            { name: 'Campaign Integration', desc: 'Link buyer lists to email/WhatsApp campaigns with tracking of opens, clicks, responses' },
            { name: 'Dynamic Smart Lists', desc: 'Auto-updating lists based on criteria: "Buyers with orders >$500K this year"' },
            { name: 'Export & Sync', desc: 'Export segments to CSV or sync with external CRM/marketing tools via API' },
          ]
        },
        insights: {
          title: 'AI Insights',
          icon: Brain,
          features: [
            { name: 'AI-Suggested Segments', desc: 'MARBIM recommends new buyer groups: "High-margin EU knit buyers", "Fast-growth US brands"' },
            { name: 'Segment Performance', desc: 'Compare revenue, margins, and OTIF% across segments—identify which groups to prioritize' },
            { name: 'Lookalike Analysis', desc: 'Find buyers similar to your top performers based on order patterns and preferences' },
            { name: 'Growth Opportunity Scoring', desc: 'AI predicts which segments have highest potential for volume increase or margin expansion' },
          ]
        }
      }
    },
    'buyer-360': {
      id: 'buyer-360',
      name: 'Buyer 360 Profile',
      icon: Target,
      color: '#EAB308',
      description: 'Complete buyer intelligence in one view',
      position: 'top-0 right-0',
      tabs: {
        overview: {
          title: 'Overview',
          icon: Target,
          features: [
            { name: 'Consolidated Profile Header', desc: 'Company name, logo, region, brands, and key contacts—all buyer metadata in one place' },
            { name: 'Health Score Dashboard', desc: 'Real-time score (0-100) based on order frequency, margins, disputes, and payment behaviour' },
            { name: 'Recent Activity Feed', desc: 'Last 30 days: RFQs, samples, approvals, shipments, emails—chronological timeline' },
            { name: 'Quick Action Panel', desc: 'One-click to create RFQ, send email, log meeting, or flag buyer for review' },
          ]
        },
        features: {
          title: 'Orders & Margins',
          icon: Sparkles,
          features: [
            { name: 'Order History', desc: 'Every past order with style, quantity, delivery date, and fulfillment status—searchable and filterable' },
            { name: 'Margin Analysis', desc: 'Buyer-wise gross margin trends over time—see if profitability is improving or declining' },
            { name: 'Product Mix Breakdown', desc: 'Which product categories drive volume? Track knits vs wovens, casualwear vs formal' },
            { name: 'Claims & Disputes Log', desc: 'History of quality issues, chargebacks, penalties—context for future negotiations' },
          ]
        },
        automation: {
          title: 'Preferences',
          icon: Zap,
          features: [
            { name: 'Product Preferences', desc: 'Buyer-specific fit, style, fabric, and packaging preferences stored and searchable' },
            { name: 'Quality Standards', desc: 'AQL levels, inspection requirements, and compliance certifications buyer demands' },
            { name: 'Sustainability Requirements', desc: 'Organic cotton, recycled materials, GOTS/OEKO-TEX certifications tracked per buyer' },
            { name: 'Preferred Factories', desc: 'Which of your production units does this buyer prefer or blacklist?' },
          ]
        },
        insights: {
          title: 'AI Insights',
          icon: Brain,
          features: [
            { name: 'Top 3 Buyer Priorities', desc: 'MARBIM analyzes past orders and communication: "This buyer values OTIF > price > sustainability"' },
            { name: 'Upsell Suggestions', desc: 'AI recommends complementary products: "Buyer orders denim—suggest denim jackets next season"' },
            { name: 'Price Sensitivity Analysis', desc: 'How elastic is this buyer? Will 5% price increase risk losing the account?' },
            { name: 'Competitive Benchmarking', desc: 'How does your relationship with this buyer compare to similar accounts?' },
          ]
        }
      }
    },
    'engagement-timeline': {
      id: 'engagement-timeline',
      name: 'Engagement Timeline & Touchpoints',
      icon: Activity,
      color: '#57ACAF',
      description: 'Every interaction with buyers tracked',
      position: 'bottom-0 left-0',
      tabs: {
        overview: {
          title: 'Timeline',
          icon: Target,
          features: [
            { name: 'Unified Communication Log', desc: 'All emails, calls, WhatsApp messages, and meetings in one chronological feed per buyer' },
            { name: 'Sampling & Approval Milestones', desc: 'When samples sent, received, approved, or rejected—complete audit trail' },
            { name: 'Order & Shipment Events', desc: 'RFQ submitted, costing shared, PO confirmed, shipment dispatched—full lifecycle' },
            { name: 'Team Member Attribution', desc: 'See who last contacted buyer, who handles account, who logged each touchpoint' },
          ]
        },
        features: {
          title: 'Tasks & Follow-ups',
          icon: Sparkles,
          features: [
            { name: 'Pending Actions Dashboard', desc: 'What does buyer need from you? What do you need from buyer? Clear next-step visibility' },
            { name: 'Automated Reminders', desc: 'System nudges: "Follow up with Buyer X—no response in 7 days since sample sent"' },
            { name: 'Task Assignment', desc: 'Assign follow-ups to specific team members with due dates and priority flags' },
            { name: 'Escalation Workflow', desc: 'Auto-escalate overdue tasks to manager or Key Account Manager after threshold' },
          ]
        },
        automation: {
          title: 'Campaign History',
          icon: Zap,
          features: [
            { name: 'Email Campaign Tracking', desc: 'Which marketing emails did this buyer receive? What was open rate and click-through?' },
            { name: 'Response Analysis', desc: 'Did buyer engage with new collection launch? Download lookbook? Request meeting?' },
            { name: 'Segment Campaign Performance', desc: 'Compare this buyer\'s engagement to others in same segment or region' },
            { name: 'A/B Test Results', desc: 'See which message variant performed better for this buyer profile' },
          ]
        },
        insights: {
          title: 'AI Insights',
          icon: Brain,
          features: [
            { name: 'Engagement Trend Analysis', desc: 'MARBIM flags: "Buyer engagement down 40% vs last 3 months—at-risk signal"' },
            { name: 'Optimal Contact Frequency', desc: 'How often should you reach out? AI suggests cadence based on buyer response patterns' },
            { name: 'Best Channel Recommendation', desc: 'Email vs WhatsApp vs phone call—which channel gets fastest buyer response?' },
            { name: 'Proactive Nudge Suggestions', desc: 'AI prompts: "Buyer X usually orders in March—reach out now with new samples"' },
          ]
        }
      }
    },
    'commercial-credit': {
      id: 'commercial-credit',
      name: 'Commercial, Credit & Risk Settings',
      icon: CreditCard,
      color: '#EAB308',
      description: 'Pricing, credit terms, and risk management',
      position: 'bottom-0 right-0',
      tabs: {
        overview: {
          title: 'Commercial Overview',
          icon: Target,
          features: [
            { name: 'Price Band Guardrails', desc: 'Buyer-specific min/max price ranges by product category—prevent margin erosion' },
            { name: 'Discount History', desc: 'Track every discount given over time—are concessions increasing? Negotiate better' },
            { name: 'Contract Terms Snapshot', desc: 'Payment terms, lead times, quality clauses, and penalties stored per buyer' },
            { name: 'Negotiation Context', desc: 'During pricing discussion, see last 5 orders\' prices—never underbid yourself' },
          ]
        },
        features: {
          title: 'Credit & Exposure',
          icon: Sparkles,
          features: [
            { name: 'Credit Limit Management', desc: 'Set per-buyer credit limits—system alerts when open orders approach threshold' },
            { name: 'Outstanding Balance Tracking', desc: 'Real-time view of invoices due, overdue, and total exposure per buyer' },
            { name: 'DSO (Days Sales Outstanding)', desc: 'How long does this buyer take to pay? Compare to payment terms—flag slow payers' },
            { name: 'Risk Flags & Alerts', desc: 'Automated warnings: "Buyer exceeds credit limit", "3 invoices overdue >30 days"' },
          ]
        },
        automation: {
          title: 'Disputes & Claims',
          icon: Zap,
          features: [
            { name: 'Quality Claim Log', desc: 'Every rejection, chargeback, or penalty with root cause analysis and resolution status' },
            { name: 'Dispute Frequency Scoring', desc: 'How often does buyer raise issues? High dispute rate = higher risk, lower margin viability' },
            { name: 'Resolution Time Tracking', desc: 'Average time to close disputes—improve buyer satisfaction by faster issue handling' },
            { name: 'Claim Cost Impact', desc: 'Calculate total cost of claims per buyer—factor into profitability and pricing decisions' },
          ]
        },
        insights: {
          title: 'AI Insights',
          icon: Brain,
          features: [
            { name: 'Credit Risk Scoring', desc: 'MARBIM rates buyer creditworthiness: Low, Medium, High risk based on payment behaviour' },
            { name: 'Term Optimization Suggestions', desc: 'AI recommends: "Tighten credit to 30 days net" or "Safe to extend to 60 days LC"' },
            { name: 'Profitability After Risk', desc: 'Adjust gross margin by payment delays, claims, and chargebacks—true net profitability' },
            { name: 'Concentration Risk Alerts', desc: 'If one buyer is >40% of revenue, system flags portfolio concentration risk' },
          ]
        }
      }
    }
  };

  const handleSubPageClick = (subPageId: string) => {
    setSelectedSubPage(subPageId);
    setActiveTab('overview'); // Reset to first tab
  };

  const handleClosePanel = () => {
    setSelectedSubPage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F1C] via-[#101725] to-[#0A0F1C] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-20 right-20 w-[600px] h-[600px] bg-[#57ACAF]/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-[#EAB308]/10 rounded-full blur-[120px]" 
        />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
      </div>

      <div className="relative">
        {/* Hero Section */}
        <motion.section 
          style={{ opacity }}
          className="relative min-h-screen flex items-center justify-center px-8 py-20"
        >
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Badge className="bg-gradient-to-r from-[#57ACAF]/20 to-[#EAB308]/20 text-[#EAB308] border border-[#EAB308]/30 text-sm px-4 py-2 mb-6">
                  ✨ AI-Powered Buyer OS
                </Badge>

                <h1 className="text-7xl font-bold text-white mb-6 leading-[1.1]">
                  Turn Buyer Data into
                  <span className="block bg-gradient-to-r from-[#57ACAF] via-[#EAB308] to-[#57ACAF] bg-clip-text text-transparent">
                    Long-Term Partnerships
                  </span>
                </h1>

                <p className="text-2xl text-[#6F83A7] mb-10 leading-relaxed">
                  Consolidate profiles, orders, margins, and risk signals into a single Buyer 360. Let MARBIM monitor health scores, churn risk, and upsell potential.
                </p>

                <div className="flex flex-wrap gap-4 mb-12">
                  <Button
                    onClick={() => onNavigate('buyer-management')}
                    className="bg-gradient-to-r from-[#EAB308] to-[#EAB308]/80 hover:from-[#EAB308]/90 hover:to-[#EAB308]/70 text-black px-8 py-7 text-lg rounded-2xl shadow-2xl shadow-[#EAB308]/40 transition-all duration-300 hover:scale-105 hover:shadow-[#EAB308]/60"
                  >
                    Set Up Buyer Management
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button
                    onClick={() => onAskMarbim('Show me a Buyer 360 demo with real buyer data')}
                    variant="outline"
                    className="border-2 border-white/20 bg-white/5 backdrop-blur-xl text-white hover:bg-white/10 px-8 py-7 text-lg rounded-2xl transition-all duration-300"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    See Buyer 360 Demo
                  </Button>
                </div>

                {/* Trust Badges */}
                <div className="flex items-center gap-8 text-sm text-[#6F83A7]">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#57ACAF]" />
                    Top 500 brands
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#57ACAF]" />
                    $2B+ annual orders
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#57ACAF]" />
                    94% retention
                  </div>
                </div>
              </motion.div>

              {/* Right Visual - Buyer 360 Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative"
              >
                {/* Floating Cards */}
                <div className="relative w-full h-[600px]">
                  {/* Main Buyer 360 Card */}
                  <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl"
                  >
                    {/* Buyer Header */}
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#57ACAF] to-[#57ACAF]/60 shadow-lg flex items-center justify-center">
                        <Building2 className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-medium text-xl mb-1">StyleCraft International</h3>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3 text-[#6F83A7]" />
                          <p className="text-[#6F83A7] text-sm">London, UK</p>
                        </div>
                      </div>
                      <Badge className="bg-[#57ACAF]/10 text-[#57ACAF] border border-[#57ACAF]/20 text-xs">
                        Strategic
                      </Badge>
                    </div>

                    {/* KPI Grid */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                        <p className="text-xs text-[#6F83A7] mb-1">Annual Revenue</p>
                        <p className="text-xl text-white font-medium">$2.4M</p>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                        <p className="text-xs text-[#6F83A7] mb-1">OTIF%</p>
                        <p className="text-xl text-[#57ACAF] font-medium">97%</p>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                        <p className="text-xs text-[#6F83A7] mb-1">Risk Score</p>
                        <p className="text-xl text-[#57ACAF] font-medium">Low</p>
                      </div>
                    </div>

                    {/* Feature Tabs */}
                    <div className="space-y-3">
                      {features.map((feature, idx) => {
                        const Icon = feature.icon;
                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0.5, scale: 0.95 }}
                            animate={{ 
                              opacity: activeFeature === idx ? 1 : 0.5,
                              scale: activeFeature === idx ? 1 : 0.95,
                              x: activeFeature === idx ? 8 : 0
                            }}
                            className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 transition-all"
                          >
                            <div 
                              className="w-10 h-10 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: `${feature.color}20` }}
                            >
                              <Icon className="w-5 h-5" style={{ color: feature.color }} />
                            </div>
                            <span className="text-white font-medium">{feature.label}</span>
                            {activeFeature === idx && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="ml-auto"
                              >
                                <Sparkles className="w-5 h-5 text-[#EAB308]" />
                              </motion.div>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>

                  {/* Floating Stat - Repeat Orders */}
                  <motion.div
                    animate={{ y: [0, 15, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute top-10 -left-10 bg-gradient-to-br from-[#57ACAF]/20 to-[#57ACAF]/10 backdrop-blur-xl border border-[#57ACAF]/30 rounded-2xl p-6 shadow-xl"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-[#57ACAF]" />
                      <span className="text-xs text-[#57ACAF]">Repeat Orders</span>
                    </div>
                    <div className="text-4xl font-bold text-white mb-1">+61%</div>
                  </motion.div>

                  {/* Floating Stat - Churn Rate */}
                  <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-20 -right-10 bg-gradient-to-br from-[#EAB308]/20 to-[#EAB308]/10 backdrop-blur-xl border border-[#EAB308]/30 rounded-2xl p-6 shadow-xl"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingDown className="w-5 h-5 text-[#EAB308]" />
                      <span className="text-xs text-[#EAB308]">Churn Rate</span>
                    </div>
                    <div className="text-4xl font-bold text-white mb-1">-68%</div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Impact Stats - Bento Grid */}
        <section className="relative px-8 py-32">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold text-white mb-6">
                Protect Revenue by Measuring Buyer Health in Real Time
              </h2>
              <p className="text-xl text-[#6F83A7] max-w-2xl mx-auto">
                See how centralizing buyer data and letting AI watch trends impacts retention, upsell, and margin leakage
              </p>
            </motion.div>

            <div className="grid grid-cols-4 gap-6">
              {[
                { label: 'Buyer Response Time', before: '36h', after: '4h', improvement: '−89%', color: '#57ACAF', icon: Clock },
                { label: 'Key Account Retention', before: '82%', after: '94%', improvement: '+12 pts', color: '#EAB308', icon: Heart },
                { label: 'Repeat Order Rate', before: '1.3×', after: '2.1×', improvement: '+61%', color: '#57ACAF', icon: TrendingUp },
                { label: 'Margin Stability', before: '4-8%', after: '1-3%', improvement: '−50%', color: '#EAB308', icon: BarChart3 },
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:from-white/10 hover:to-white/5 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                  >
                    <div 
                      className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ 
                        background: `linear-gradient(135deg, ${stat.color}30, ${stat.color}10)`,
                        boxShadow: `0 8px 32px ${stat.color}20`
                      }}
                    >
                      <Icon className="w-7 h-7" style={{ color: stat.color }} />
                    </div>

                    <h3 className="text-white font-medium mb-6 text-lg">{stat.label}</h3>

                    <div className="space-y-4 mb-6">
                      <div>
                        <div className="text-xs text-[#6F83A7] mb-1">Before AI</div>
                        <div className="text-2xl font-bold text-red-400">{stat.before}</div>
                      </div>
                      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      <div>
                        <div className="text-xs text-[#6F83A7] mb-1">With AI</div>
                        <div className="text-3xl font-bold text-white">{stat.after}</div>
                      </div>
                    </div>

                    <Badge 
                      className="text-sm font-medium px-3 py-1"
                      style={{
                        background: `${stat.color}20`,
                        color: stat.color,
                        border: `1px solid ${stat.color}40`
                      }}
                    >
                      {stat.improvement} improvement
                    </Badge>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Role-Based Benefits Carousel */}
        <section className="relative px-8 py-32 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent overflow-hidden">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                Every Team Sees the Buyer Differently. FabricXAI Aligns Them.
              </h2>
              <p className="text-lg text-[#6F83A7] max-w-2xl mx-auto">
                From ownership to operations—everyone gets buyer intelligence tailored to their role
              </p>
            </motion.div>

            {/* Carousel Container */}
            <div className="relative">
              {/* Role Cards - Horizontal Carousel */}
              <div className="relative overflow-hidden">
                <motion.div
                  animate={{ x: `${-activeRoleCard * 100}%` }}
                  transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                  className="flex"
                >
                  {[
                    {
                      role: 'Factory Owner / Managing Director',
                      subtitle: 'Growth View',
                      icon: Award,
                      color: '#EAB308',
                      benefits: [
                        { icon: Target, title: 'Buyer-Wise Revenue & Profit', desc: 'Track annual revenue, gross margin, and net profit by buyer—know which 10 buyers drive 70% of margin' },
                        { icon: AlertTriangle, title: 'At-Risk Key Account Alerts', desc: 'Get notifications when high-value buyers show churn signals—protect relationships before they sour' },
                        { icon: TrendingDown, title: 'Churn Impact Simulation', desc: 'MARBIM models: "If Buyer X leaves, you lose $800K annual revenue and 15% capacity utilization"' },
                        { icon: BarChart3, title: 'Portfolio Diversification', desc: 'See buyer concentration risk—if top 3 buyers are 60% of revenue, system flags vulnerability' },
                      ],
                      prompt: 'Show me how a Factory Owner uses Buyer Management to protect top 10 key accounts and forecast revenue impact'
                    },
                    {
                      role: 'Head of Merchandising',
                      subtitle: 'Relationship View',
                      icon: Users,
                      color: '#57ACAF',
                      benefits: [
                        { icon: FileText, title: 'Centralized Buyer Preferences', desc: 'All buyer-specific requirements in one place: fits, styles, lead times, packaging—instant reference' },
                        { icon: Clock, title: 'Order History During Negotiation', desc: 'While discussing new order, see last 5 orders\' prices, quantities, and margins—never underbid yourself' },
                        { icon: Package, title: 'Sampling & Approval Timeline', desc: 'Track sample status per buyer: sent, received, approved, comments—complete audit trail' },
                        { icon: Brain, title: 'AI Price Band Suggestions', desc: 'MARBIM recommends optimal pricing: "Buyer X accepts 5–8% markup on similar styles based on history"' },
                      ],
                      prompt: 'Walk me through how a Merchandising Head uses Buyer 360 during live price negotiations to maximize margins'
                    },
                    {
                      role: 'Key Account Manager',
                      subtitle: 'Day-to-Day Execution',
                      icon: UserCheck,
                      color: '#EAB308',
                      benefits: [
                        { icon: Target, title: 'Unified Buyer Dashboard', desc: 'See all open RFQs, pending samples, approvals, and follow-ups for your assigned buyers in one view' },
                        { icon: Heart, title: 'Real-Time Health Score', desc: 'Track buyer engagement: are they responding? Approving samples? Placing repeat orders? Know relationship status' },
                        { icon: Bell, title: 'Automated Nudge Reminders', desc: 'System alerts: "Buyer X usually orders in March—reach out now with new collection samples"' },
                        { icon: TrendingUp, title: 'Upsell Opportunity Prompts', desc: 'AI suggests: "Buyer orders denim jeans—recommend denim jackets next season based on similar buyers"' },
                      ],
                      prompt: 'Show me a Key Account Manager\'s daily workflow with Buyer 360—from morning alerts to closing upsell deals'
                    },
                    {
                      role: 'Business Development / Marketing',
                      subtitle: 'Pipeline & Branding',
                      icon: Rocket,
                      color: '#57ACAF',
                      benefits: [
                        { icon: Globe, title: 'Buyer Segmentation Engine', desc: 'Create buyer lists by region, category, sustainability focus—target campaigns to right audience' },
                        { icon: Mail, title: 'Campaign Tracking', desc: 'Send emails or WhatsApp broadcasts to buyer segments—track opens, clicks, and responses at account level' },
                        { icon: Activity, title: 'Engagement Scoring', desc: 'See which buyers engage with marketing: download lookbooks, click new collection links, request meetings' },
                        { icon: Users, title: 'Lookalike Buyer Discovery', desc: 'MARBIM finds prospects similar to your top buyers: "Target brands like Buyer X in EU market"' },
                      ],
                      prompt: 'How does a BD Manager use Buyer Management to run targeted campaigns and find lookalike prospects in new markets?'
                    },
                    {
                      role: 'Production & Planning',
                      subtitle: 'Commitment View',
                      icon: Activity,
                      color: '#EAB308',
                      benefits: [
                        { icon: Clock, title: 'Buyer-Specific Lead Times', desc: 'Know standard delivery windows per buyer—"Buyer X needs 60 days, Buyer Y flexible up to 90 days"' },
                        { icon: Shield, title: 'Service Level Expectations', desc: 'See penalty clauses and quality requirements at a glance—plan production to meet buyer standards' },
                        { icon: BarChart3, title: 'Capacity Planning Link', desc: 'Connect buyer orders to production lines—avoid overloading one line with single buyer\'s volume' },
                        { icon: AlertCircle, title: 'Overload Alerts', desc: 'System warns: \"Buyer X\'s orders are 45% of Line 3 capacity—diversify to reduce dependency risk\"' },
                      ],
                      prompt: 'Explain how Production Planning uses Buyer Management data to balance line loads and meet buyer-specific SLAs'
                    },
                    {
                      role: 'Finance / Commercial',
                      subtitle: 'Credit & Payment View',
                      icon: DollarSign,
                      color: '#57ACAF',
                      benefits: [
                        { icon: CreditCard, title: 'Credit Terms & DSO', desc: 'Track payment terms, days sales outstanding, and credit exposure for every buyer—know who pays on time' },
                        { icon: AlertTriangle, title: 'Payment History & Disputes', desc: 'See overdue invoices, chargeback frequency, and claim history—assess buyer financial reliability' },
                        { icon: Shield, title: 'Automated Risk Flags', desc: 'System alerts: \"Buyer Y exceeds credit limit by $120K\" or \"3 invoices overdue >30 days\"' },
                        { icon: FileText, title: 'Term Revision Recommendations', desc: 'MARBIM suggests: \"Tighten credit to 30 days LC\" or \"Safe to extend 60 days net based on track record\"' },
                      ],
                      prompt: 'How does a Finance Manager use Buyer Management to monitor credit risk and optimize payment terms per buyer?'
                    },
                   ].map((roleData, idx) => {
                     const RoleIcon = roleData.icon;
                     return (
                       <div key={idx} className="w-full flex-shrink-0 px-4">
                         <motion.div
                           initial={{ opacity: 0, y: 30 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           transition={{ duration: 0.6 }}
                           className="relative max-w-3xl mx-auto"
                        >
                          <div 
                            className="absolute inset-0 rounded-3xl blur-3xl"
                            style={{ background: `radial-gradient(circle at 50% 50%, ${roleData.color}10, transparent)` }}
                          />
                          <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-10">
                            <div className="flex items-center gap-4 mb-8">
                              <div 
                                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                                style={{ 
                                  background: `linear-gradient(135deg, ${roleData.color}, ${roleData.color}99)`,
                                  boxShadow: `0 20px 40px ${roleData.color}30`
                                }}
                              >
                                <RoleIcon className="w-8 h-8 text-white" />
                              </div>
                              <div>
                                <h3 className="text-3xl font-bold text-white">For {roleData.role}</h3>
                                <p className="text-[#6F83A7]">{roleData.subtitle}</p>
                              </div>
                            </div>

                            <div className="space-y-6">
                              {roleData.benefits.map((benefit, bIdx) => {
                                const BenefitIcon = benefit.icon;
                                return (
                                  <motion.div
                                    key={bIdx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: bIdx * 0.1 }}
                                    className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
                                  >
                                    <div 
                                      className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                                      style={{ background: `${roleData.color}33` }}
                                    >
                                      <BenefitIcon className="w-6 h-6" style={{ color: roleData.color }} />
                                    </div>
                                    <div>
                                      <h4 className="text-white font-medium text-lg mb-1">{benefit.title}</h4>
                                      <p className="text-[#6F83A7]">{benefit.desc}</p>
                                    </div>
                                  </motion.div>
                                );
                              })}
                            </div>

                            <button
                              onClick={() => onAskMarbim(roleData.prompt)}
                              className="w-full mt-8 p-5 rounded-2xl border text-white hover:bg-white/5 transition-all flex items-center justify-between group"
                              style={{ 
                                background: `linear-gradient(135deg, ${roleData.color}10, ${roleData.color}05)`,
                                borderColor: `${roleData.color}33`
                              }}
                            >
                              <span className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5" style={{ color: roleData.color }} />
                                <span className="font-medium">Ask MARBIM About This Role</span>
                              </span>
                              <ChevronRight 
                                className="w-5 h-5 group-hover:translate-x-1 transition-all" 
                                style={{ color: roleData.color }}
                              />
                            </button>
                          </div>
                        </motion.div>
                      </div>
                    );
                  })}
                </motion.div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={() => setActiveRoleCard(Math.max(0, activeRoleCard - 1))}
                disabled={activeRoleCard === 0}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center group z-10"
              >
                <ChevronRight className="w-6 h-6 text-white rotate-180 group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={() => setActiveRoleCard(Math.min(5, activeRoleCard + 1))}
                disabled={activeRoleCard === 5}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center group z-10"
              >
                <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              </button>

              {/* Dot Indicators */}
              <div className="flex items-center justify-center gap-2 mt-12">
                {[0, 1, 2, 3, 4, 5].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveRoleCard(idx)}
                    className="group relative"
                  >
                    <div 
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        activeRoleCard === idx ? 'w-8' : 'hover:w-4'
                      }`}
                      style={{ 
                        background: activeRoleCard === idx 
                          ? 'linear-gradient(90deg, #57ACAF, #EAB308)' 
                          : 'rgba(111, 131, 167, 0.4)'
                      }}
                    />
                  </button>
                ))}
              </div>

              {/* Role Labels Below Dots */}
              <div className="flex items-center justify-center gap-6 mt-4">
                <p className="text-sm text-[#6F83A7]">
                  {['Owner', 'Merchandising', 'Account Manager', 'BD/Marketing', 'Production', 'Finance'][activeRoleCard]}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Deep Dive */}
        <section className="relative px-8 py-32 bg-gradient-to-b from-white/[0.02] via-transparent to-white/[0.02]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl font-bold text-white mb-6">
                Everything You Need to Truly Know Your Buyers
              </h2>
              <p className="text-xl text-[#6F83A7] max-w-3xl mx-auto">
                Complete buyer intelligence suite built specifically for garment manufacturers
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {[
                {
                  icon: Target,
                  title: 'Buyer 360 Profile',
                  description: 'Consolidated view of company info, contacts, regions, order history, and communication—all in one place',
                  features: ['Multi-channel order history', 'Sampling & approvals', 'Complaint tracking', 'Communication timeline'],
                  color: '#57ACAF',
                },
                {
                  icon: Heart,
                  title: 'Health & Churn Risk Scoring',
                  description: 'AI score based on order frequency, margins, disputes, and engagement—catch at-risk buyers early',
                  features: ['Predictive churn signals', 'Silent month alerts', 'Tier classification', 'Early warning system'],
                  color: '#EAB308',
                },
                {
                  icon: CreditCard,
                  title: 'Commercial & Credit Control',
                  description: 'Buyer-wise price bands, credit limits, payment history, and automated risk management',
                  features: ['Price band guardrails', 'Credit exposure tracking', 'Payment reminders', 'Risk-based terms'],
                  color: '#57ACAF',
                },
                {
                  icon: Brain,
                  title: 'Preference & Compliance Intelligence',
                  description: 'Store and surface buyer-specific requirements, preferences, and compliance standards automatically',
                  features: ['Product preferences', 'Quality standards', 'Sustainability requirements', 'Factory preferences'],
                  color: '#EAB308',
                },
              ].map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="group relative"
                  >
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl blur-2xl"
                      style={{ background: `radial-gradient(circle at 50% 50%, ${feature.color}15, transparent)` }}
                    />
                    <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:from-white/10 hover:to-white/5 transition-all duration-500">
                      <div className="flex items-start gap-4 mb-6">
                        <div 
                          className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                          style={{ 
                            background: `linear-gradient(135deg, ${feature.color}30, ${feature.color}10)`,
                            boxShadow: `0 8px 32px ${feature.color}20`
                          }}
                        >
                          <Icon className="w-7 h-7" style={{ color: feature.color }} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                          <p className="text-xl text-[#6F83A7]">{feature.description}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {feature.features.map((item, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5" style={{ color: feature.color }} />
                            <span className="text-white/80">{item}</span>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => onAskMarbim(`Tell me more about ${feature.title} in Buyer Management`)}
                        className="mt-6 text-sm font-medium flex items-center gap-2 transition-all group/btn"
                        style={{ color: feature.color }}
                      >
                        Explore {feature.title}
                        <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Use Cases / Success Stories */}
        <section className="relative px-8 py-32">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold text-white mb-6">
                How Buyer Management Changes Real Situations
              </h2>
              <p className="text-xl text-[#6F83A7] max-w-2xl mx-auto">
                Real-world scenarios where buyer intelligence protected revenue and strengthened relationships
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Saving a Silent Key Account',
                  scenario: 'A top EU buyer\'s orders quietly drop over 2 seasons',
                  problem: 'No one notices until volumes are down 40%',
                  solution: 'Buyer health score dips; system flags "at-risk" and prompts Key Account Manager with context',
                  result: '2 strategic meetings arranged; buyer signs 3-season frame agreement',
                  color: '#57ACAF',
                  icon: AlertTriangle,
                },
                {
                  title: 'Cleaning Up Margin Leakage',
                  scenario: 'Different merchandisers agree to slightly different prices for the same buyer',
                  problem: 'Hidden margin leakage and internal confusion',
                  solution: 'Standard buyer price bands visible to all teams; MARBIM alerts when quotes go below guideline',
                  result: '+2.1% average margin on that buyer\'s orders across the year',
                  color: '#EAB308',
                  icon: DollarSign,
                },
                {
                  title: 'Reviving Dormant Buyers',
                  scenario: 'Old buyers who haven\'t placed orders in 12–18 months',
                  problem: 'No structured reactivation strategy',
                  solution: 'MARBIM identifies dormant accounts with high margins; suggests personalized campaigns',
                  result: '18% of dormant buyers place at least one new order within 6 months',
                  color: '#57ACAF',
                  icon: TrendingUp,
                },
              ].map((useCase, idx) => {
                const Icon = useCase.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border rounded-3xl p-8 hover:from-white/10 hover:to-white/5 transition-all duration-500"
                    style={{ borderColor: `${useCase.color}40`, borderTopWidth: '4px' }}
                  >
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                      style={{ background: `${useCase.color}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: useCase.color }} />
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4">{useCase.title}</h3>

                    <div className="space-y-4">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-[#6F83A7] mb-2">Scenario</p>
                        <p className="text-white font-medium">{useCase.scenario}</p>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wide text-[#6F83A7] mb-2">Problem</p>
                        <p className="text-white/80">{useCase.problem}</p>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wide text-[#6F83A7] mb-2">Solution</p>
                        <p className="text-white/80">{useCase.solution}</p>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wide text-[#6F83A7] mb-2">Result</p>
                        <p className="text-3xl font-bold" style={{ color: useCase.color }}>
                          {useCase.result}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Integration Ecosystem */}
        <section className="relative px-8 py-32 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold text-white mb-6">
                Buyer Data Flows Across the Entire FabricXAI OS
              </h2>
              <p className="text-xl text-[#6F83A7] max-w-2xl mx-auto">
                One Buyer ID connects every touchpoint—from first inquiry to long-term partnership
              </p>
            </motion.div>

            {/* Integration Hub Visual */}
            <div className="relative max-w-4xl mx-auto mb-20">
              <div className="relative aspect-square max-w-2xl mx-auto">
                {/* Central Hub */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      '0 0 60px rgba(87, 172, 175, 0.3)',
                      '0 0 80px rgba(234, 179, 8, 0.4)',
                      '0 0 60px rgba(87, 172, 175, 0.3)',
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-gradient-to-br from-[#57ACAF] to-[#EAB308] flex items-center justify-center"
                >
                  <div className="text-center">
                    <Users className="w-12 h-12 text-white mx-auto mb-2" />
                    <p className="text-white font-bold text-lg">Buyer</p>
                    <p className="text-white/80 text-sm">Management</p>
                  </div>
                </motion.div>

                {/* Connected Modules */}
                {[
                  { label: 'Lead Management', icon: Target, angle: 0, color: '#57ACAF' },
                  { label: 'RFQ & Costing', icon: FileText, angle: 60, color: '#EAB308' },
                  { label: 'Production Planning', icon: Activity, angle: 120, color: '#57ACAF' },
                  { label: 'Compliance', icon: Shield, angle: 180, color: '#EAB308' },
                  { label: 'Finance', icon: DollarSign, angle: 240, color: '#57ACAF' },
                  { label: 'Analytics', icon: BarChart3, angle: 300, color: '#EAB308' },
                ].map((module, idx) => {
                  const Icon = module.icon;
                  const radius = 280;
                  const x = Math.cos((module.angle * Math.PI) / 180) * radius;
                  const y = Math.sin((module.angle * Math.PI) / 180) * radius;

                  return (
                    <div key={idx}>
                      {/* Connection Line */}
                      <div
                        className="absolute top-1/2 left-1/2"
                        style={{
                          width: `${radius}px`,
                          height: '1px',
                          background: `linear-gradient(90deg, transparent, ${module.color}40, transparent)`,
                          transform: `rotate(${module.angle}deg)`,
                          transformOrigin: 'left center',
                        }}
                      />

                      {/* Module Circle */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full bg-white/5 backdrop-blur-xl border border-white/20 flex flex-col items-center justify-center"
                        style={{
                          transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                        }}
                      >
                        <Icon className="w-6 h-6 mb-1" style={{ color: module.color }} />
                        <p className="text-xs text-white text-center px-2">{module.label}</p>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Integration Benefits */}
            <div className="grid lg:grid-cols-3 gap-6">
              {[
                {
                  icon: CheckCircle,
                  title: 'One Buyer ID Across All Modules',
                  description: 'No more duplicate buyer master data—single source of truth from lead to payment',
                },
                {
                  icon: Sparkles,
                  title: 'Consistent Insights Everywhere',
                  description: 'Buyer health score, risk flags, and preferences visible in RFQ, production, and finance',
                },
                {
                  icon: Zap,
                  title: 'Seamless Data Flow',
                  description: 'Update buyer details once, reflected instantly across all modules—no manual sync',
                },
              ].map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                  >
                    <Icon className="w-8 h-8 text-[#57ACAF] mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                    <p className="text-[#6F83A7]">{benefit.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Interactive Sub-Pages */}
        <section className="relative px-8 py-32 bg-gradient-to-b from-white/[0.02] via-transparent to-white/[0.02]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold text-white mb-6">
                Drill Down into Every Dimension of Your Buyers
              </h2>
              <p className="text-xl text-[#6F83A7] max-w-2xl mx-auto">
                Click any card to explore 4 tabs of buyer intelligence features
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {Object.values(subPages).map((subPage, idx) => {
                const Icon = subPage.icon;
                return (
                  <motion.div
                    key={subPage.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    onClick={() => handleSubPageClick(subPage.id)}
                    className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:from-white/10 hover:to-white/5 hover:scale-105 transition-all duration-500 cursor-pointer"
                  >
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl blur-2xl"
                      style={{ background: `radial-gradient(circle at 50% 50%, ${subPage.color}15, transparent)` }}
                    />
                    
                    <div className="relative">
                      <div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                        style={{ 
                          background: `linear-gradient(135deg, ${subPage.color}30, ${subPage.color}10)`,
                          boxShadow: `0 8px 32px ${subPage.color}20`
                        }}
                      >
                        <Icon className="w-8 h-8" style={{ color: subPage.color }} />
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-3">{subPage.name}</h3>
                      <p className="text-[#6F83A7] mb-6">{subPage.description}</p>

                      <div className="flex items-center gap-2 font-medium" style={{ color: subPage.color }}>
                        <span>Explore Features</span>
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Expandable Sub-Page Panel */}
        {selectedSubPage && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-50 bg-gradient-to-br from-[#101725] to-[#182336] overflow-y-auto"
          >
            <div className="max-w-7xl mx-auto px-8 py-12">
              {/* Header */}
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                  {(() => {
                    const subPage = subPages[selectedSubPage];
                    const Icon = subPage.icon;
                    return (
                      <>
                        <div 
                          className="w-16 h-16 rounded-2xl flex items-center justify-center"
                          style={{ 
                            background: `linear-gradient(135deg, ${subPage.color}30, ${subPage.color}10)`,
                            boxShadow: `0 8px 32px ${subPage.color}20`
                          }}
                        >
                          <Icon className="w-8 h-8" style={{ color: subPage.color }} />
                        </div>
                        <div>
                          <h2 className="text-4xl font-bold text-white">{subPage.name}</h2>
                          <p className="text-[#6F83A7] text-lg">{subPage.description}</p>
                        </div>
                      </>
                    );
                  })()}
                </div>
                <Button
                  onClick={handleClosePanel}
                  variant="outline"
                  className="border-white/10 text-white hover:bg-white/5 bg-[rgba(255,255,255,0)]"
                >
                  Close
                </Button>
              </div>

              {/* Tab Navigation */}
              <div className="flex items-center gap-2 mb-12 border-b border-white/10">
                {Object.entries(subPages[selectedSubPage].tabs).map(([tabKey, tabData]) => {
                  const TabIcon = tabData.icon;
                  return (
                    <button
                      key={tabKey}
                      onClick={() => setActiveTab(tabKey)}
                      className={`relative px-6 py-4 text-sm transition-all duration-300 flex items-center gap-2 ${
                        activeTab === tabKey ? 'text-[#57ACAF]' : 'text-[#6F83A7] hover:text-white'
                      }`}
                    >
                      <TabIcon className="w-4 h-4" />
                      <span className="relative z-10">{tabData.title}</span>
                      
                      {activeTab === tabKey && (
                        <motion.div
                          layoutId="activeBuyerManagementTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#57ACAF] to-[#EAB308]"
                          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <div className="grid lg:grid-cols-2 gap-6">
                {subPages[selectedSubPage].tabs[activeTab].features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:from-white/10 hover:to-white/5 transition-all"
                  >
                    <h4 className="text-xl font-bold text-white mb-3">{feature.name}</h4>
                    <p className="text-[#6F83A7]">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* Ask MARBIM about this section */}
              <div className="mt-12 flex justify-center">
                <Button
                  onClick={() => {
                    const subPage = subPages[selectedSubPage];
                    onAskMarbim(`Tell me more about ${subPage.name} in Buyer Management`);
                  }}
                  className="bg-gradient-to-r from-[#EAB308] to-[#EAB308]/80 hover:from-[#EAB308]/90 hover:to-[#EAB308]/70 text-black px-8 py-6 text-lg rounded-2xl shadow-2xl shadow-[#EAB308]/40 transition-all duration-300"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Ask MARBIM About This
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Security & Compliance */}
        <section className="relative px-8 py-32">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold text-white mb-6">
                Enterprise-Grade Security for Buyer Data
              </h2>
              <p className="text-xl text-[#6F83A7] max-w-2xl mx-auto">
                Your buyer information, pricing, and contracts protected with military-grade security
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-4 gap-6">
              {[
                { icon: Shield, label: 'SOC 2 Compliant', desc: 'Certified secure handling of buyer data' },
                { icon: Globe, label: 'GDPR Ready', desc: 'EU buyer contact data protection' },
                { icon: Activity, label: '99.9% Uptime', desc: 'Always-on buyer engagement' },
                { icon: CheckCircle, label: 'AES-256 Encryption', desc: 'Contract & pricing security' },
              ].map((badge, idx) => {
                const Icon = badge.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:from-white/10 hover:to-white/5 transition-all"
                  >
                    <Icon className="w-12 h-12 text-[#57ACAF] mx-auto mb-4" />
                    <h3 className="text-white font-bold mb-2">{badge.label}</h3>
                    <p className="text-sm text-[#6F83A7]">{badge.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="relative px-8 py-32 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold text-white mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-[#6F83A7]">
                Everything you need to know about Buyer Management
              </p>
            </motion.div>

            <div className="space-y-4">
              {[
                {
                  q: 'Can I import existing buyers from Excel or my current ERP/CRM?',
                  a: 'Yes! Upload CSV/Excel with buyer details, or sync via API from Salesforce, SAP, or other systems. MARBIM auto-deduplicates and enriches data.'
                },
                {
                  q: 'How does Buyer Health Scoring actually work?',
                  a: 'MARBIM analyzes 12+ signals: order frequency, order value trends, payment behaviour, dispute frequency, email engagement, and time since last order. Score updates daily.'
                },
                {
                  q: 'Can I group multiple brands under one parent buyer account?',
                  a: 'Absolutely. Create parent-child buyer hierarchies: e.g., "H&M Group" with sub-brands "H&M", "COS", "Monki". Track each separately or in aggregate.'
                },
                {
                  q: 'How does Buyer Management help reduce churn?',
                  a: 'AI flags early warning signs: declining order frequency, longer gaps between orders, or engagement drop. You get proactive alerts to reach out before buyer ghosts.'
                },
                {
                  q: 'How is buyer data secured and who can access what?',
                  a: 'Role-based permissions: Sales sees full profiles, Finance sees payment data, Production sees lead times. All data encrypted at rest and in transit (AES-256).'
                },
              ].map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:from-white/10 hover:to-white/5 transition-all"
                >
                  <h3 className="text-white font-medium text-lg mb-3">{faq.q}</h3>
                  <p className="text-[#6F83A7]">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How MARBIM Works - 3 Steps */}
        <section className="relative px-8 py-32">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold text-white mb-6">
                How MARBIM Thinks About Your Buyers
              </h2>
              <p className="text-xl text-[#6F83A7] max-w-2xl mx-auto">
                Three AI-powered steps to protect and grow every buyer relationship
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {[
                {
                  step: '1',
                  title: 'Ingest & Unify Buyer Data',
                  description: 'Connects leads, RFQs, orders, emails, and payments into one canonical Buyer ID across all modules',
                  stat: '90%+',
                  statLabel: 'duplicates auto-merged',
                  color: '#57ACAF',
                  icon: Users,
                },
                {
                  step: '2',
                  title: 'Score, Segment & Predict Risk',
                  description: 'Scores health, revenue potential, and churn risk for every buyer. Detects downward trends early',
                  stat: '85%',
                  statLabel: 'churn signals 1+ season early',
                  color: '#EAB308',
                  icon: Brain,
                },
                {
                  step: '3',
                  title: 'Recommend Actions & Automate',
                  description: 'Suggests next meetings, campaigns, or offers by segment. Automates nudges and reactivation campaigns',
                  stat: '1.7–2.0×',
                  statLabel: 'better reactivation vs manual',
                  color: '#57ACAF',
                  icon: Zap,
                },
              ].map((step, idx) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:from-white/10 hover:to-white/5 transition-all duration-500"
                  >
                    {/* Step Number Badge */}
                    <div 
                      className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{ 
                        background: `${step.color}20`,
                        color: step.color 
                      }}
                    >
                      {step.step}
                    </div>

                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                      style={{ 
                        background: `linear-gradient(135deg, ${step.color}30, ${step.color}10)`,
                        boxShadow: `0 8px 32px ${step.color}20`
                      }}
                    >
                      <Icon className="w-8 h-8" style={{ color: step.color }} />
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                    <p className="text-[#6F83A7] mb-8">{step.description}</p>

                    <div className="pt-6 border-t border-white/10">
                      <div className="text-4xl font-bold mb-1" style={{ color: step.color }}>
                        {step.stat}
                      </div>
                      <p className="text-sm text-[#6F83A7]">{step.statLabel}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative px-8 py-32">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-[#57ACAF]/10 via-[#EAB308]/5 to-transparent border border-[#EAB308]/20 rounded-3xl p-16 text-center overflow-hidden"
            >
              {/* Background decoration */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(87,172,175,0.1),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(234,179,8,0.1),transparent_50%)]" />

              <div className="relative z-10">
                <h2 className="text-6xl font-bold mb-6">
                  <span className="text-white">Never Lose a </span>
                  <span className="bg-gradient-to-r from-[#57ACAF] via-[#EAB308] to-[#57ACAF] bg-clip-text text-transparent">
                    Key Buyer Again
                  </span>
                </h2>

                <p className="text-2xl text-[#6F83A7] mb-12 max-w-3xl mx-auto">
                  Start with your top 20 buyers. Let FabricXAI centralize everything about them—orders, margins, risk, and engagement—and watch MARBIM protect and grow those relationships.
                </p>

                <div className="flex flex-wrap gap-4 justify-center mb-8">
                  <Button
                    onClick={() => onNavigate('buyer-management')}
                    className="bg-gradient-to-r from-[#EAB308] to-[#EAB308]/80 hover:from-[#EAB308]/90 hover:to-[#EAB308]/70 text-black px-12 py-7 text-xl rounded-2xl shadow-2xl shadow-[#EAB308]/40 transition-all duration-300 hover:scale-105"
                  >
                    Set Up Buyer Management in FabricXAI
                    <ArrowRight className="w-6 h-6 ml-2" />
                  </Button>
                  <Button
                    onClick={() => onAskMarbim('I want to talk to your Buyer Strategy Team about implementing Buyer Management')}
                    variant="outline"
                    className="border-2 border-white/20 bg-white/5 backdrop-blur-xl text-white hover:bg-white/10 px-12 py-7 text-xl rounded-2xl transition-all duration-300"
                  >
                    Talk to Our Buyer Strategy Team
                  </Button>
                </div>

                {/* Trust elements */}
                <div className="flex items-center justify-center gap-8 text-sm text-[#6F83A7]">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#57ACAF]" />
                    No data lock-in
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#57ACAF]" />
                    Works with existing ERP
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#57ACAF]" />
                    14-day pilot with 5 buyers
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
