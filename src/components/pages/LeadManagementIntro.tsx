import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  Users, TrendingUp, Target, Zap, ArrowRight, CheckCircle, 
  Mail, MessageSquare, LineChart, Award, Clock, DollarSign,
  Sparkles, Play, ChevronRight, BarChart3, Star, Globe,
  Rocket, Shield, Activity, Brain, FileText, AlertTriangle
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface LeadManagementIntroProps {
  onNavigate: (page: string) => void;
  onAskMarbim: (prompt: string) => void;
}

export function LeadManagementIntro({ onNavigate, onAskMarbim }: LeadManagementIntroProps) {
  const [activeFeature, setActiveFeature] = useState(0);
  const [selectedSubPage, setSelectedSubPage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [activeRoleCard, setActiveRoleCard] = useState(0);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, 50]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  const features = [
    { icon: Target, label: 'AI Lead Scoring', color: '#57ACAF' },
    { icon: Mail, label: 'Auto Follow-ups', color: '#EAB308' },
    { icon: Brain, label: 'Smart Insights', color: '#57ACAF' },
    { icon: Zap, label: 'Fast Response', color: '#EAB308' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Sub-pages data structure
  const subPages = {
    'lead-capture': {
      id: 'lead-capture',
      name: 'Lead Capture & Import',
      icon: Users,
      color: '#57ACAF',
      description: 'Multi-channel lead capture with AI enrichment',
      position: 'top-0 left-0',
      tabs: {
        overview: {
          title: 'Overview',
          icon: Target,
          features: [
            { name: 'Multi-Channel Import', desc: 'Import leads from LinkedIn, email signatures, trade shows, website forms, and CSV files—all unified in one system' },
            { name: 'Auto-Deduplication', desc: 'AI automatically detects and merges duplicate contacts across sources, maintaining clean database' },
            { name: 'Company Enrichment', desc: 'MARBIM fills missing data—company size, location, website, industry—using public databases' },
            { name: 'Contact Validation', desc: 'Verify email addresses and phone numbers in real-time to ensure deliverability' },
          ]
        },
        features: {
          title: 'Key Features',
          icon: Sparkles,
          features: [
            { name: 'LinkedIn Chrome Extension', desc: 'One-click capture from LinkedIn profiles and Sales Navigator—syncs instantly to FabricXAI' },
            { name: 'Email Integration', desc: 'Forward business cards or email signatures to capture@fabricxai.com—AI extracts all details' },
            { name: 'Bulk CSV Upload', desc: 'Upload thousands of leads from trade show scanners or existing CRMs with field mapping' },
            { name: 'Web Form Embedding', desc: 'Add capture forms to your website—leads flow directly into pipeline with tracking' },
          ]
        },
        automation: {
          title: 'Automation',
          icon: Zap,
          features: [
            { name: 'Smart Categorization', desc: 'AI tags leads by industry, product interest, buyer type, and readiness level automatically' },
            { name: 'Assignment Rules', desc: 'Auto-assign leads to sales reps based on territory, product specialty, or workload' },
            { name: 'Enrichment Workflows', desc: 'Trigger data enrichment when key fields are missing—MARBIM fills gaps overnight' },
            { name: 'Notification Triggers', desc: 'Alert team when high-value leads arrive or existing contacts re-engage' },
          ]
        },
        insights: {
          title: 'AI Insights',
          icon: Brain,
          features: [
            { name: 'Source Performance Analysis', desc: 'MARBIM shows which channels deliver highest-quality leads and best conversion rates' },
            { name: 'Data Quality Score', desc: 'Each lead gets a completeness score—AI prioritizes those with rich profiles' },
            { name: 'Duplicate Risk Detection', desc: 'Predictive alerts when new lead might be duplicate based on fuzzy matching' },
            { name: 'Import Recommendations', desc: 'AI suggests optimal import frequency and sources based on your conversion patterns' },
          ]
        }
      }
    },
    'ai-scoring': {
      id: 'ai-scoring',
      name: 'AI Lead Scoring',
      icon: Brain,
      color: '#EAB308',
      description: 'Predictive scoring with 92% accuracy',
      position: 'top-0 right-0',
      tabs: {
        overview: {
          title: 'Overview',
          icon: Target,
          features: [
            { name: 'Predictive Scoring Engine', desc: 'MARBIM analyzes 50+ signals to predict conversion probability with 92% accuracy' },
            { name: 'Real-Time Updates', desc: 'Scores refresh automatically as leads engage—email opens, website visits, LinkedIn activity' },
            { name: 'Fit vs. Intent Scoring', desc: 'Separate scores for "good fit" (firmographic) and "buying intent" (behavioral)' },
            { name: 'Custom Scoring Models', desc: 'Train AI on your historical data—what actually converts for your factory?' },
          ]
        },
        features: {
          title: 'Scoring Factors',
          icon: Sparkles,
          features: [
            { name: 'Company Attributes', desc: 'Size, revenue, location, industry vertical, years in business, employee count' },
            { name: 'Product Fit Analysis', desc: 'Does their order profile match your capabilities? Minimum order quantities, product types' },
            { name: 'Engagement Signals', desc: 'Email opens, link clicks, time on pricing page, repeat visits, document downloads' },
            { name: 'Historical Patterns', desc: 'Comparison to similar buyers who converted—job titles, communication style, timeline' },
          ]
        },
        automation: {
          title: 'Automation',
          icon: Zap,
          features: [
            { name: 'Auto-Prioritization', desc: 'Hot leads (90+ score) move to top of queue and trigger urgent alerts to sales team' },
            { name: 'Nurture Workflows', desc: 'Low-score leads enter drip campaigns until intent signals improve—no manual sorting' },
            { name: 'Score Change Alerts', desc: 'Notify reps when cold lead suddenly becomes hot—e.g., visited pricing page 5 times' },
            { name: 'Pipeline Forecasting', desc: 'AI predicts monthly conversions based on current pipeline scores and velocity' },
          ]
        },
        insights: {
          title: 'AI Insights',
          icon: Brain,
          features: [
            { name: 'Score Accuracy Reports', desc: 'MARBIM tracks prediction accuracy—how often 90+ leads actually convert? Retrains model' },
            { name: 'Feature Importance', desc: 'See which signals matter most for YOUR conversions—company size? Industry? Engagement?' },
            { name: 'Competitor Comparisons', desc: 'How do your scoring thresholds compare to 500+ other factories using MARBIM?' },
            { name: 'Lost Lead Analysis', desc: 'AI identifies why high-score leads didn\'t convert—pricing? response time? competition?' },
          ]
        }
      }
    },
    'pipeline': {
      id: 'pipeline',
      name: 'Pipeline Management',
      icon: Activity,
      color: '#57ACAF',
      description: 'Visual pipeline with drag-drop stages',
      position: 'bottom-0 left-0',
      tabs: {
        overview: {
          title: 'Overview',
          icon: Target,
          features: [
            { name: 'Visual Kanban Board', desc: 'Drag leads across stages—New → Qualified → Proposal → Negotiation → Won/Lost' },
            { name: 'Stage Automation', desc: 'When lead moves to "Proposal", auto-create RFQ and notify production planning team' },
            { name: 'Deal Value Tracking', desc: 'Estimate potential order value at each stage—forecast monthly revenue accurately' },
            { name: 'Timeline Visibility', desc: 'See how long leads stay in each stage—identify bottlenecks and slowdowns' },
          ]
        },
        features: {
          title: 'Key Features',
          icon: Sparkles,
          features: [
            { name: 'Custom Pipeline Stages', desc: 'Define stages that match your process—add "Sample Approved" or "Payment Terms" stages' },
            { name: 'Multi-Pipeline Support', desc: 'Separate pipelines for new vs. repeat buyers, or by product category (woven vs. knit)' },
            { name: 'Collaboration Tools', desc: 'Tag team members, add internal notes, upload contracts—all visible in lead timeline' },
            { name: 'Mobile Pipeline View', desc: 'Update pipeline from factory floor or trade show—real-time sync across devices' },
          ]
        },
        automation: {
          title: 'Automation',
          icon: Zap,
          features: [
            { name: 'Stage-Based Triggers', desc: 'Auto-send proposal when moved to "Quotation" stage, or NDA when marked "Qualified"' },
            { name: 'Stale Lead Detection', desc: 'Alert when lead sits in stage >14 days—MARBIM suggests re-engagement actions' },
            { name: 'Win/Loss Surveys', desc: 'Auto-send feedback form when marked Won or Lost—capture insights for improvement' },
            { name: 'Deal Rot Prevention', desc: 'AI identifies deals at risk of stalling—suggests urgency tactics or discount offers' },
          ]
        },
        insights: {
          title: 'AI Insights',
          icon: Brain,
          features: [
            { name: 'Conversion Rate by Stage', desc: 'See where leads drop off—40% lose at pricing stage? AI suggests pricing strategy' },
            { name: 'Sales Velocity Analysis', desc: 'MARBIM calculates average time to close—25 days? Use to forecast capacity needs' },
            { name: 'Rep Performance Comparison', desc: 'Which sales rep has highest close rate? Best average deal size? Learn from winners' },
            { name: 'Revenue Forecasting', desc: 'AI predicts next 90 days of closed deals based on pipeline health and historical patterns' },
          ]
        }
      }
    },
    'communication': {
      id: 'communication',
      name: 'Communication & Nurturing',
      icon: Mail,
      color: '#EAB308',
      description: 'AI-powered outreach automation',
      position: 'bottom-0 right-0',
      tabs: {
        overview: {
          title: 'Overview',
          icon: Target,
          features: [
            { name: 'AI Email Composer', desc: 'MARBIM drafts personalized emails in seconds—references lead\'s company, products, past conversations' },
            { name: 'Multi-Channel Outreach', desc: 'Email, WhatsApp, LinkedIn—unified inbox tracks all conversations in one place' },
            { name: 'Follow-Up Sequences', desc: 'Auto-send 3-5 touch campaign if no response—different message each time, not spammy' },
            { name: 'Response Tracking', desc: 'See open rates, click rates, reply sentiment—know who\'s interested before they say yes' },
          ]
        },
        features: {
          title: 'Key Features',
          icon: Sparkles,
          features: [
            { name: 'Template Library', desc: '50+ pre-written templates for intro, follow-up, proposal, pricing—customize with your branding' },
            { name: 'Smart Send Timing', desc: 'AI determines best time to send based on recipient\'s timezone and engagement patterns' },
            { name: 'Attachment Management', desc: 'One-click attach product catalog, certifications, price list—MARBIM suggests relevant docs' },
            { name: 'Bulk Personalization', desc: 'Send 100 emails at once—each one personalized with recipient name, company, recent activity' },
          ]
        },
        automation: {
          title: 'Automation',
          icon: Zap,
          features: [
            { name: 'Trigger-Based Campaigns', desc: 'New lead? Auto-send welcome email + catalog. No reply in 3 days? Send follow-up automatically' },
            { name: 'Behavior-Triggered Messages', desc: 'Lead visited pricing page? Send custom quote. Downloaded catalog? Offer free sample' },
            { name: 'Re-Engagement Sequences', desc: 'Cold leads (no activity 90 days) enter win-back campaign—special offers or new products' },
            { name: 'Meeting Scheduling', desc: 'Auto-include calendar link—lead books demo slot without email tennis' },
          ]
        },
        insights: {
          title: 'AI Insights',
          icon: Brain,
          features: [
            { name: 'Message Performance', desc: 'Which subject lines get highest open rates? Which CTAs drive responses? A/B test results' },
            { name: 'Sentiment Analysis', desc: 'MARBIM reads reply tone—is buyer frustrated? excited? confused?—suggests best response approach' },
            { name: 'Engagement Scoring', desc: 'Track which leads are most engaged—opened 3 emails, clicked 5 links? Prioritize them' },
            { name: 'Content Recommendations', desc: 'AI suggests what to send next—case study? pricing? sample offer?—based on buyer journey stage' },
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
                  ✨ AI-Powered CRM Module
                </Badge>

                <h1 className="text-7xl font-bold text-white mb-6 leading-[1.1]">
                  Turn Leads into
                  <span className="block bg-gradient-to-r from-[#57ACAF] via-[#EAB308] to-[#57ACAF] bg-clip-text text-transparent">
                    Revenue Faster
                  </span>
                </h1>

                <p className="text-2xl text-[#6F83A7] mb-10 leading-relaxed">
                  MARBIM AI finds high-fit buyers, scores every lead, and automates follow-ups—so your sales team focuses on closing deals.
                </p>

                <div className="flex flex-wrap gap-4 mb-12">
                  <Button
                    onClick={() => onNavigate('lead-management-pricing')}
                    className="bg-gradient-to-r from-[#EAB308] to-[#EAB308]/80 hover:from-[#EAB308]/90 hover:to-[#EAB308]/70 text-black px-8 py-7 text-lg rounded-2xl shadow-2xl shadow-[#EAB308]/40 transition-all duration-300 hover:scale-105 hover:shadow-[#EAB308]/60"
                  >
                    Get Started Free
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button
                    onClick={() => onAskMarbim('Show me a demo of Lead Management with my factory data')}
                    variant="outline"
                    className="border-2 border-white/20 bg-white/5 backdrop-blur-xl text-white hover:bg-white/10 px-8 py-7 text-lg rounded-2xl transition-all duration-300"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Watch Demo
                  </Button>
                </div>

                {/* Trust Badges */}
                <div className="flex items-center gap-8 text-sm text-[#6F83A7]">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#57ACAF]" />
                    14-day free trial
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#57ACAF]" />
                    No credit card required
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#57ACAF]" />
                    500+ factories
                  </div>
                </div>
              </motion.div>

              {/* Right Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative"
              >
                {/* Floating Cards */}
                <div className="relative w-full h-[600px]">
                  {/* Main Card */}
                  <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#57ACAF] to-[#57ACAF]/60 shadow-lg flex items-center justify-center">
                        <Users className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium text-lg">Lead Pipeline</h3>
                        <p className="text-[#6F83A7] text-sm">Real-time AI scoring</p>
                      </div>
                    </div>

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

                  {/* Floating Stats */}
                  <motion.div
                    animate={{ y: [0, 15, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute top-10 -left-10 bg-gradient-to-br from-[#EAB308]/20 to-[#EAB308]/10 backdrop-blur-xl border border-[#EAB308]/30 rounded-2xl p-6 shadow-xl"
                  >
                    <div className="text-4xl font-bold text-white mb-1">2.3x</div>
                    <div className="text-sm text-[#EAB308]">More Conversions</div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-20 -right-10 bg-gradient-to-br from-[#57ACAF]/20 to-[#57ACAF]/10 backdrop-blur-xl border border-[#57ACAF]/30 rounded-2xl p-6 shadow-xl"
                  >
                    <div className="text-4xl font-bold text-white mb-1">96%</div>
                    <div className="text-sm text-[#57ACAF]">Faster Response</div>
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
                Measurable Impact on Your Bottom Line
              </h2>
              <p className="text-xl text-[#6F83A7] max-w-2xl mx-auto">
                Real results from garment manufacturers using AI-powered lead management
              </p>
            </motion.div>

            <div className="grid grid-cols-4 gap-6">
              {[
                { label: 'Lead Response Time', before: '48h', after: '2h', improvement: '96%', color: '#57ACAF', icon: Clock },
                { label: 'Conversion Rate', before: '12%', after: '28%', improvement: '+133%', color: '#EAB308', icon: TrendingUp },
                { label: 'RFQs Generated', before: '45', after: '120', improvement: '+167%', color: '#57ACAF', icon: Target },
                { label: 'Team Efficiency', before: '30', after: '85', improvement: '+183%', color: '#EAB308', icon: Zap },
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

        {/* Benefits Split */}
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
                Who Benefits from Lead Management?
              </h2>
              <p className="text-lg text-[#6F83A7] max-w-2xl mx-auto">
                From factory owners to frontline teams—everyone gets tailored tools for their role
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
                      role: 'Factory Owners',
                      subtitle: 'Revenue & Growth',
                      icon: Award,
                      color: '#EAB308',
                      benefits: [
                        { icon: Target, title: 'More RFQs from Same Outreach', desc: 'AI prioritizes high-fit buyers—focus sales energy on leads that actually convert to orders' },
                        { icon: Clock, title: '96% Faster Sales Cycles', desc: 'Automated follow-ups and scoring eliminate manual chasing—close deals in days, not weeks' },
                        { icon: DollarSign, title: '2.3x Revenue Growth', desc: 'Convert 28% of leads vs industry average of 12%—MARBIM finds hidden opportunities' },
                        { icon: Users, title: '183% Team Productivity', desc: 'No additional headcount needed—existing team handles 3x more leads with AI assistance' },
                      ],
                      prompt: 'Calculate ROI for my factory with Lead Management AI—show me expected revenue increase and time savings'
                    },
                    {
                      role: 'Sales Manager',
                      subtitle: 'Pipeline Oversight & Team Performance',
                      icon: BarChart3,
                      color: '#57ACAF',
                      benefits: [
                        { icon: LineChart, title: 'Real-Time Pipeline Health', desc: 'See conversion rates, deal velocity, and bottlenecks—no manual reports needed' },
                        { icon: Users, title: 'Rep Performance Dashboard', desc: 'Track which reps close fastest and highest value deals—learn from top performers' },
                        { icon: Target, title: 'Revenue Forecasting', desc: 'AI predicts next 90 days of closures based on pipeline scores and historical velocity' },
                        { icon: Award, title: 'Team Coaching Insights', desc: 'MARBIM identifies which reps need help—suggests training on negotiation or follow-ups' },
                      ],
                      prompt: 'Show me how a Sales Manager uses MARBIM to monitor team performance and pipeline health daily'
                    },
                    {
                      role: 'Sales Representative',
                      subtitle: 'Lead Capture & Follow-up Automation',
                      icon: Users,
                      color: '#EAB308',
                      benefits: [
                        { icon: Sparkles, title: 'AI-Suggested Next Actions', desc: 'MARBIM tells you who to call, when to follow up, what to say—no guessing or forgetting' },
                        { icon: Mail, title: 'Auto-Personalized Emails', desc: 'Compose tailored emails in seconds—AI references past conversations and buyer needs' },
                        { icon: CheckCircle, title: 'Smart Lead Prioritization', desc: 'Hot leads (90+ score) always at top of queue—focus on buyers ready to order today' },
                        { icon: Clock, title: 'No Lead Falls Through Cracks', desc: 'Automated reminders and follow-up sequences ensure every lead gets attention at right time' },
                      ],
                      prompt: 'Walk me through a Sales Rep\'s daily workflow with MARBIM—from lead capture to closing deals'
                    },
                    {
                      role: 'Marketing Manager',
                      subtitle: 'Campaign Tracking & Lead Quality',
                      icon: Target,
                      color: '#57ACAF',
                      benefits: [
                        { icon: TrendingUp, title: 'Source Performance Analysis', desc: 'Which channels deliver best leads? LinkedIn vs trade shows vs website forms—data-driven decisions' },
                        { icon: Award, title: 'Lead Quality Scoring', desc: 'See conversion rates by source—optimize budget toward high-ROI channels that actually convert' },
                        { icon: Brain, title: 'Campaign Attribution', desc: 'AI tracks multi-touch journeys—know which campaigns actually drive orders, not just clicks' },
                        { icon: DollarSign, title: 'Marketing ROI Visibility', desc: 'See revenue generated per channel—prove marketing impact to ownership and justify budgets' },
                      ],
                      prompt: 'How does a Marketing Manager use MARBIM to optimize campaigns and track lead quality by source?'
                    },
                    {
                      role: 'Operations Coordinator',
                      subtitle: 'Capacity Planning & Forecasting',
                      icon: Activity,
                      color: '#EAB308',
                      benefits: [
                        { icon: Clock, title: 'Production Capacity Alerts', desc: 'Pipeline data forecasts order volume—plan materials and staffing 2-3 weeks in advance' },
                        { icon: DollarSign, title: 'Revenue Visibility', desc: 'See expected monthly closures—coordinate with finance and procurement teams proactively' },
                        { icon: Globe, title: 'Cross-Module Integration', desc: 'Hot leads auto-sync to RFQ module—seamless handoff from sales to production planning' },
                        { icon: BarChart3, title: 'Bottleneck Detection', desc: 'MARBIM alerts when pipeline exceeds capacity—negotiate timelines before accepting orders' },
                      ],
                      prompt: 'Explain how an Operations Coordinator uses Lead Management data for capacity planning and forecasting'
                    },
                    {
                      role: 'Finance Manager',
                      subtitle: 'Revenue Forecasting & Cash Flow',
                      icon: DollarSign,
                      color: '#57ACAF',
                      benefits: [
                        { icon: TrendingUp, title: 'Accurate Revenue Predictions', desc: 'AI forecasts monthly closures with 92% accuracy—plan cash flow and investments confidently' },
                        { icon: BarChart3, title: 'Deal Value Tracking', desc: 'See pipeline value at each stage—estimate incoming revenue for next 30/60/90 days' },
                        { icon: CheckCircle, title: 'Payment Terms Visibility', desc: 'Know expected payment schedules from leads—optimize working capital management' },
                        { icon: Award, title: 'Sales Velocity Metrics', desc: 'Track average time to close and deal sizes—forecast year-end revenue with precision' },
                      ],
                      prompt: 'How does a Finance Manager use Lead Management pipeline data for revenue forecasting and cash flow planning?'
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
                  {['Owners', 'Sales Manager', 'Sales Rep', 'Marketing', 'Operations', 'Finance'][activeRoleCard]}
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
                Everything You Need to Close More Deals
              </h2>
              <p className="text-xl text-[#6F83A7] max-w-3xl mx-auto">
                Complete lead management suite built specifically for garment manufacturers
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {[
                {
                  icon: Target,
                  title: 'Smart Lead Capture',
                  description: 'Automatically capture leads from LinkedIn, email, trade shows, and website—unified in one system',
                  features: ['Multi-channel import', 'Auto-deduplication', 'Rich company profiles', 'Contact enrichment'],
                  color: '#57ACAF',
                },
                {
                  icon: Brain,
                  title: 'AI-Powered Scoring',
                  description: 'MARBIM analyzes 50+ signals to predict which leads will convert—focus on what matters',
                  features: ['Predictive scoring', 'Fit analysis', 'Buying intent signals', 'Real-time updates'],
                  color: '#EAB308',
                },
                {
                  icon: Mail,
                  title: 'Automated Outreach',
                  description: 'Send personalized emails and WhatsApp messages at scale—MARBIM writes them for you',
                  features: ['AI email drafting', 'Multi-channel campaigns', 'Smart scheduling', 'Follow-up sequences'],
                  color: '#57ACAF',
                },
                {
                  icon: LineChart,
                  title: 'Pipeline Analytics',
                  description: 'Track every touchpoint and conversion metric—know exactly what\'s working',
                  features: ['Conversion tracking', 'Channel performance', 'Team productivity', 'Revenue forecasting'],
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
                          <p className="text-[#6F83A7] leading-relaxed">{feature.description}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {feature.features.map((item, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: feature.color }} />
                            <span className="text-white">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="relative px-8 py-32">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl font-bold text-white mb-6">
                Built for Real Garment Business Scenarios
              </h2>
              <p className="text-xl text-[#6F83A7] max-w-3xl mx-auto">
                See how factories like yours use AI to win more buyers
              </p>
            </motion.div>

            <div className="space-y-6">
              {[
                {
                  title: 'Post-Trade Show Follow-up',
                  scenario: 'You collected 200 business cards at a trade show. Manual follow-up takes weeks.',
                  solution: 'MARBIM scores all contacts, identifies top 25 high-fit buyers, and drafts personalized emails in minutes.',
                  result: '+85% faster outreach, 3x more RFQs',
                  color: '#57ACAF',
                },
                {
                  title: 'LinkedIn Prospecting',
                  scenario: 'You find potential buyers on LinkedIn but struggle to craft personalized messages at scale.',
                  solution: 'MARBIM analyzes their profile, recent activity, and your fit—then generates custom LinkedIn messages.',
                  result: '40% response rate vs 12% before',
                  color: '#EAB308',
                },
                {
                  title: 'Cold Lead Revival',
                  scenario: 'You have 500+ old leads who never converted. They\'re sitting in spreadsheets.',
                  solution: 'MARBIM re-scores them based on recent activity signals and suggests re-engagement sequences.',
                  result: 'Recovered 45 dormant leads → 12 RFQs',
                  color: '#57ACAF',
                },
              ].map((useCase, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative group"
                >
                  <div 
                    className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl blur-2xl"
                    style={{ background: `radial-gradient(circle at ${idx % 2 === 0 ? '20%' : '80%'} 50%, ${useCase.color}10, transparent)` }}
                  />
                  <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:from-white/10 hover:to-white/5 transition-all duration-500 overflow-hidden">
                    {/* Title Section with Icon */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                          style={{ 
                            background: `linear-gradient(135deg, ${useCase.color}40, ${useCase.color}20)`,
                            boxShadow: `0 8px 32px ${useCase.color}30`
                          }}
                        >
                          <Target className="w-7 h-7" style={{ color: useCase.color }} />
                        </div>
                        <h3 className="text-3xl font-bold text-white">{useCase.title}</h3>
                      </div>
                      
                      {/* Floating Result Badge */}
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="hidden lg:block"
                      >
                        <div 
                          className="px-6 py-3 rounded-2xl border-2 backdrop-blur-xl relative overflow-hidden group/badge"
                          style={{ 
                            background: `linear-gradient(135deg, ${useCase.color}20, ${useCase.color}10)`,
                            borderColor: `${useCase.color}50`,
                            boxShadow: `0 8px 24px ${useCase.color}20`
                          }}
                        >
                          {/* Shimmer effect */}
                          <div 
                            className="absolute inset-0 -translate-x-full group-hover/badge:translate-x-full transition-transform duration-1000"
                            style={{ 
                              background: `linear-gradient(90deg, transparent, ${useCase.color}30, transparent)`
                            }}
                          />
                          <div className="relative">
                            <div className="text-xs text-[#6F83A7] mb-1 flex items-center gap-1.5">
                              <Sparkles className="w-3 h-3" style={{ color: useCase.color }} />
                              <span>Impact</span>
                            </div>
                            <div className="text-2xl font-bold text-white">{useCase.result}</div>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Problem & Solution Cards Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Problem Card */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="relative group/card"
                      >
                        <div className="absolute -inset-1 bg-gradient-to-br from-red-500/20 to-red-500/5 rounded-2xl blur-xl opacity-0 group-hover/card:opacity-100 transition-opacity" />
                        <div className="relative bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20 rounded-2xl p-6 hover:border-red-500/40 transition-all">
                          {/* Header */}
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                              <AlertTriangle className="w-5 h-5 text-red-400" />
                            </div>
                            <div>
                              <div className="text-xs text-red-400 uppercase tracking-wider font-medium">Challenge</div>
                              <div className="text-sm text-[#6F83A7]">Current State</div>
                            </div>
                          </div>
                          
                          {/* Content */}
                          <p className="text-white leading-relaxed text-[15px]">
                            {useCase.scenario}
                          </p>

                          {/* Decorative element */}
                          <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-radial from-red-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />
                        </div>
                      </motion.div>

                      {/* Solution Card */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="relative group/card"
                      >
                        <div 
                          className="absolute -inset-1 rounded-2xl blur-xl opacity-0 group-hover/card:opacity-100 transition-opacity"
                          style={{ background: `linear-gradient(135deg, ${useCase.color}20, ${useCase.color}05)` }}
                        />
                        <div 
                          className="relative bg-gradient-to-br rounded-2xl p-6 border hover:border-opacity-60 transition-all"
                          style={{ 
                            backgroundImage: `linear-gradient(135deg, ${useCase.color}10, ${useCase.color}05)`,
                            borderColor: `${useCase.color}30`
                          }}
                        >
                          {/* Header */}
                          <div className="flex items-center gap-3 mb-4">
                            <div 
                              className="w-10 h-10 rounded-xl flex items-center justify-center"
                              style={{ background: `${useCase.color}30` }}
                            >
                              <Sparkles className="w-5 h-5" style={{ color: useCase.color }} />
                            </div>
                            <div>
                              <div className="text-xs uppercase tracking-wider font-medium" style={{ color: useCase.color }}>
                                AI Solution
                              </div>
                              <div className="text-sm text-[#6F83A7]">MARBIM Approach</div>
                            </div>
                          </div>
                          
                          {/* Content */}
                          <p className="text-white leading-relaxed text-[15px]">
                            {useCase.solution}
                          </p>

                          {/* Decorative element */}
                          <div 
                            className="absolute top-4 right-4 w-20 h-20 rounded-full blur-2xl pointer-events-none"
                            style={{ background: `radial-gradient(circle, ${useCase.color}10, transparent)` }}
                          />
                        </div>
                      </motion.div>
                    </div>

                    {/* Mobile Result Badge */}
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="lg:hidden mt-6"
                    >
                      <div 
                        className="px-6 py-4 rounded-2xl border-2 backdrop-blur-xl text-center"
                        style={{ 
                          background: `linear-gradient(135deg, ${useCase.color}20, ${useCase.color}10)`,
                          borderColor: `${useCase.color}50`,
                          boxShadow: `0 8px 24px ${useCase.color}20`
                        }}
                      >
                        <div className="text-sm text-[#6F83A7] mb-2 flex items-center justify-center gap-1.5">
                          <Sparkles className="w-4 h-4" style={{ color: useCase.color }} />
                          <span>Measurable Impact</span>
                        </div>
                        <div className="text-2xl font-bold text-white">{useCase.result}</div>
                      </div>
                    </motion.div>

                    {/* Bottom Arrow Indicator */}
                    <div className="flex items-center justify-center mt-6">
                      <div className="flex items-center gap-2 text-[#6F83A7]">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-red-500/50" />
                        <ArrowRight className="w-4 h-4" />
                        <div className="h-px w-12 bg-gradient-to-l from-transparent" style={{ backgroundImage: `linear-gradient(to left, transparent, ${useCase.color}50)` }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Integration & Ecosystem */}
        <section className="relative px-8 py-32 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-[#57ACAF]/5 to-transparent rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-radial from-[#EAB308]/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '3s' }} />
          </div>

          <div className="max-w-7xl mx-auto relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <Badge className="bg-gradient-to-r from-[#57ACAF]/20 to-[#EAB308]/20 text-white border border-[#57ACAF]/30 px-4 py-2 mb-6">
                <Zap className="w-4 h-4 inline mr-2" />
                Complete Ecosystem
              </Badge>
              <h2 className="text-5xl font-bold text-white mb-6">
                Powers Your Entire Revenue Engine
              </h2>
              <p className="text-xl text-[#6F83A7] max-w-3xl mx-auto">
                Lead Management seamlessly connects with all FabricXAI modules—data flows automatically across your entire operation
              </p>
            </motion.div>

            {/* Hub & Spoke Visualization */}
            <div className="relative min-h-[700px] flex items-center justify-center">
              
              {/* Animated Connection Lines - SVG Overlay */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                <defs>
                  <linearGradient id="connectionGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#57ACAF" stopOpacity="0" />
                    <stop offset="50%" stopColor="#57ACAF" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#57ACAF" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="connectionGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#EAB308" stopOpacity="0" />
                    <stop offset="50%" stopColor="#EAB308" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#EAB308" stopOpacity="0" />
                  </linearGradient>
                </defs>
                
                {/* Top-Left to Center */}
                <motion.line
                  x1="20%" y1="20%" x2="50%" y2="50%"
                  stroke="url(#connectionGradient1)"
                  strokeWidth="2"
                  strokeDasharray="8 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.2 }}
                />
                
                {/* Top-Right to Center */}
                <motion.line
                  x1="80%" y1="20%" x2="50%" y2="50%"
                  stroke="url(#connectionGradient2)"
                  strokeWidth="2"
                  strokeDasharray="8 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.4 }}
                />
                
                {/* Bottom-Left to Center */}
                <motion.line
                  x1="20%" y1="80%" x2="50%" y2="50%"
                  stroke="url(#connectionGradient1)"
                  strokeWidth="2"
                  strokeDasharray="8 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.6 }}
                />
                
                {/* Bottom-Right to Center */}
                <motion.line
                  x1="80%" y1="80%" x2="50%" y2="50%"
                  stroke="url(#connectionGradient2)"
                  strokeWidth="2"
                  strokeDasharray="8 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                />
              </svg>

              {/* Central Hub - Lead Management */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, type: 'spring', damping: 20 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              >
                <div className="relative group">
                  {/* Pulsing Rings */}
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                    className="absolute inset-0 rounded-3xl border-2 border-[#57ACAF]/40"
                    style={{ transform: 'scale(1.2)' }}
                  />
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1 }}
                    className="absolute inset-0 rounded-3xl border-2 border-[#EAB308]/40"
                    style={{ transform: 'scale(1.4)' }}
                  />
                  
                  {/* Main Card */}
                  <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border-2 border-white/20 rounded-3xl p-8 shadow-2xl w-[320px]">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#57ACAF]/10 via-[#EAB308]/10 to-transparent rounded-3xl" />
                    
                    <div className="relative">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#57ACAF] via-[#EAB308] to-[#57ACAF] shadow-2xl flex items-center justify-center animate-pulse" style={{ animationDuration: '2s' }}>
                        <Target className="w-10 h-10 text-white" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white text-center mb-2">
                        Lead Management
                      </h3>
                      <p className="text-center text-[#6F83A7] text-sm mb-4">
                        4 Core Sub-Modules
                      </p>
                      
                      <div className="flex items-center justify-center gap-2 text-xs">
                        <div className="px-3 py-1.5 rounded-lg bg-[#57ACAF]/20 text-[#57ACAF] border border-[#57ACAF]/30">
                          Click to Explore
                        </div>
                        <div className="px-3 py-1.5 rounded-lg bg-[#EAB308]/20 text-[#EAB308] border border-[#EAB308]/30">
                          16 Tabs
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Sub-Page Cards - Clickable & Positioned Around Hub */}
              {Object.values(subPages).map((subPage, idx) => {
                const Icon = subPage.icon;
                return (
                  <motion.div
                    key={subPage.id}
                    initial={{ opacity: 0, scale: 0.8, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 + idx * 0.15 }}
                    className={`absolute ${subPage.position} w-[280px] z-20`}
                  >
                    <button
                      onClick={() => handleSubPageClick(subPage.id)}
                      className="w-full group relative text-left"
                    >
                      {/* Hover Glow */}
                      <div 
                        className="absolute -inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"
                        style={{ background: `radial-gradient(circle at 50% 50%, ${subPage.color}30, transparent)` }}
                      />
                      
                      {/* Card */}
                      <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:from-white/10 hover:to-white/5 transition-all duration-500 hover:scale-105 cursor-pointer">
                        {/* Icon & Title */}
                        <div className="flex items-start gap-3 mb-4">
                          <div 
                            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                            style={{ 
                              background: `linear-gradient(135deg, ${subPage.color}40, ${subPage.color}20)`,
                              boxShadow: `0 8px 24px ${subPage.color}30`
                            }}
                          >
                            <Icon className="w-6 h-6" style={{ color: subPage.color }} />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-white font-medium mb-1 leading-tight">{subPage.name}</h3>
                            <div className="flex items-center gap-1.5 text-xs text-[#6F83A7]">
                              <ChevronRight className="w-3 h-3" style={{ color: subPage.color }} />
                              <span>4 Tabs</span>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-white mb-3 leading-relaxed">
                          {subPage.description}
                        </p>

                        {/* Tab Count Badge */}
                        <div 
                          className="px-3 py-2 rounded-lg border text-xs"
                          style={{ 
                            background: `linear-gradient(135deg, ${subPage.color}10, ${subPage.color}05)`,
                            borderColor: `${subPage.color}30`
                          }}
                        >
                          <div className="flex items-center gap-1.5 mb-1">
                            <Sparkles className="w-3.5 h-3.5" style={{ color: subPage.color }} />
                            <span className="text-[#6F83A7]">Includes:</span>
                          </div>
                          <span className="text-white text-xs">Overview, Features, Automation, AI Insights</span>
                        </div>

                        {/* Click Indicator */}
                        <div className="absolute bottom-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-xs" style={{ color: subPage.color }}>Click to view</span>
                          <ChevronRight className="w-3 h-3" style={{ color: subPage.color }} />
                        </div>
                      </div>
                    </button>
                  </motion.div>
                );
              })}

            </div>

            {/* Bottom Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2 }}
              className="mt-16 grid grid-cols-3 gap-6 max-w-3xl mx-auto"
            >
              {[
                { label: 'Modules Connected', value: '14', icon: Zap, color: '#57ACAF' },
                { label: 'Data Points Synced', value: '50+', icon: Activity, color: '#EAB308' },
                { label: 'Sync Speed', value: '<2s', icon: Clock, color: '#57ACAF' },
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div 
                    key={idx}
                    className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-5 text-center hover:from-white/10 hover:to-white/5 transition-all"
                  >
                    <Icon className="w-6 h-6 mx-auto mb-2" style={{ color: stat.color }} />
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-[#6F83A7]">{stat.label}</div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Security & Compliance */}
        <section className="relative px-8 py-32 bg-gradient-to-b from-white/[0.02] via-transparent to-white/[0.02]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                Enterprise-Grade Security & Privacy
              </h2>
              <p className="text-lg text-[#6F83A7]">
                Your buyer data is protected with bank-level encryption
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: Shield, label: 'SOC 2 Compliant', desc: 'Audited security' },
                { icon: Globe, label: 'GDPR Ready', desc: 'EU data protection' },
                { icon: CheckCircle, label: '99.9% Uptime', desc: 'Always available' },
                { icon: Activity, label: 'Data Encryption', desc: 'AES-256 standard' },
              ].map((trust, idx) => {
                const Icon = trust.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 text-center hover:from-white/10 hover:to-white/5 transition-all"
                  >
                    <Icon className="w-10 h-10 text-[#57ACAF] mx-auto mb-3" />
                    <h3 className="text-white font-medium mb-1">{trust.label}</h3>
                    <p className="text-sm text-[#6F83A7]">{trust.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="relative px-8 py-32">
          <div className="max-w-4xl mx-auto">
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
                Everything you need to know about Lead Management
              </p>
            </motion.div>

            <div className="space-y-4">
              {[
                {
                  q: "How does AI lead scoring work?",
                  a: "MARBIM analyzes 50+ data points including company size, location, product fit, order history, website activity, and engagement patterns. It compares against our database of 500+ factories to predict conversion probability with 92% accuracy.",
                },
                {
                  q: "Can I import my existing leads?",
                  a: "Yes! Upload CSV/Excel files, import from LinkedIn, or connect via API. MARBIM automatically deduplicates, enriches missing data, and scores all contacts instantly.",
                },
                {
                  q: "Does it replace my sales team?",
                  a: "No—it makes them 3x more productive. MARBIM handles repetitive tasks (scoring, follow-ups, data entry) so your team focuses on high-value conversations and closing deals.",
                },
                {
                  q: "How long until I see results?",
                  a: "Most factories see improvements within 2 weeks: faster response times immediately, better conversion rates in 30-60 days as AI learns your patterns.",
                },
                {
                  q: "Is my buyer data secure?",
                  a: "Absolutely. SOC 2 certified, GDPR compliant, AES-256 encryption. Your data never trains our public models—it stays private to your company.",
                },
              ].map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="group bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 hover:from-white/10 hover:to-white/5 transition-all duration-300"
                >
                  <h3 className="text-white text-lg font-medium mb-3 flex items-start gap-3">
                    <MessageSquare className="w-5 h-5 text-[#EAB308] mt-1 flex-shrink-0" />
                    {faq.q}
                  </h3>
                  <p className="text-[#6F83A7] leading-relaxed pl-8">{faq.a}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <p className="text-[#6F83A7] mb-4">Still have questions?</p>
              <Button
                onClick={() => onAskMarbim('I have questions about Lead Management module')}
                variant="outline"
                className="border-2 border-[#57ACAF]/30 bg-[#57ACAF]/10 text-[#57ACAF] hover:bg-[#57ACAF]/20 px-8 py-6 text-lg rounded-2xl transition-all"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Ask MARBIM Anything
              </Button>
            </motion.div>
          </div>
        </section>

        {/* How MARBIM Works */}
        <section className="relative px-8 py-32 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <Badge className="bg-gradient-to-r from-[#EAB308]/20 to-[#57ACAF]/20 text-white border border-[#EAB308]/30 px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 inline mr-2" />
                AI-Powered Intelligence
              </Badge>
              <h2 className="text-5xl font-bold text-white mb-6">
                How MARBIM Transforms Your Lead Management
              </h2>
              <p className="text-xl text-[#6F83A7] max-w-3xl mx-auto">
                Your AI assistant analyzes 50+ data points to predict conversion probability and automate outreach
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Brain,
                  title: 'Intelligent Scoring',
                  description: 'Analyzes company size, location, product fit, past orders, and response history to predict conversion probability with 92% accuracy',
                  color: '#EAB308',
                  stats: '50+ data points',
                },
                {
                  icon: MessageSquare,
                  title: 'Auto Communication',
                  description: 'Drafts personalized emails and WhatsApp messages based on lead profile, previous conversations, and your brand voice—in seconds',
                  color: '#57ACAF',
                  stats: '2-hour response time',
                },
                {
                  icon: Activity,
                  title: 'Predictive Insights',
                  description: 'Predicts best time to follow up, optimal channel, and likelihood of RFQ generation based on historical patterns across 500+ factories',
                  color: '#EAB308',
                  stats: '92% accuracy',
                },
              ].map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.2 }}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl blur-2xl"
                      style={{ background: `radial-gradient(circle at 50% 50%, ${feature.color}20, transparent)` }}
                    />
                    <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:from-white/10 hover:to-white/5 transition-all duration-500 h-full">
                      <div 
                        className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform"
                        style={{ 
                          background: `linear-gradient(135deg, ${feature.color}30, ${feature.color}10)`,
                          boxShadow: `0 8px 32px ${feature.color}20`
                        }}
                      >
                        <Icon className="w-8 h-8" style={{ color: feature.color }} />
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                      <p className="text-[#6F83A7] mb-6 leading-relaxed">{feature.description}</p>

                      <Badge 
                        className="px-3 py-1"
                        style={{
                          background: `${feature.color}10`,
                          color: feature.color,
                          border: `1px solid ${feature.color}30`
                        }}
                      >
                        {feature.stats}
                      </Badge>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative px-8 py-32">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#EAB308]/20 via-[#57ACAF]/20 to-[#EAB308]/20 border border-white/20 p-16 text-center"
            >
              {/* Animated Background */}
              <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#EAB308]/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#57ACAF]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
              </div>

              <div className="relative z-10">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-[#EAB308] to-[#57ACAF] flex items-center justify-center shadow-2xl"
                >
                  <Rocket className="w-10 h-10 text-white" />
                </motion.div>

                <h2 className="text-5xl font-bold text-white mb-6">
                  Ready to Transform Your Lead Management?
                </h2>
                <p className="text-2xl text-[#6F83A7] mb-10 max-w-2xl mx-auto">
                  Join 500+ garment manufacturers already converting more leads with MARBIM AI
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Button
                    onClick={() => onNavigate('lead-management-pricing')}
                    className="bg-gradient-to-r from-[#EAB308] to-[#EAB308]/80 hover:from-[#EAB308]/90 hover:to-[#EAB308]/70 text-black px-10 py-7 text-lg rounded-2xl shadow-2xl shadow-[#EAB308]/40 transition-all duration-300 hover:scale-105 hover:shadow-[#EAB308]/60"
                  >
                    Start Free Trial
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button
                    onClick={() => onAskMarbim('I want a personalized demo for my factory. What do you need to know?')}
                    variant="outline"
                    className="border-2 border-white/30 bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 px-10 py-7 text-lg rounded-2xl transition-all duration-300"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Talk to MARBIM
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-8 mt-10 text-sm text-[#6F83A7]">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-[#EAB308] fill-[#EAB308]" />
                    <Star className="w-5 h-5 text-[#EAB308] fill-[#EAB308]" />
                    <Star className="w-5 h-5 text-[#EAB308] fill-[#EAB308]" />
                    <Star className="w-5 h-5 text-[#EAB308] fill-[#EAB308]" />
                    <Star className="w-5 h-5 text-[#EAB308] fill-[#EAB308]" />
                  </div>
                  <span className="text-white">4.9/5 from 500+ factories</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Feature Detail Panel - Slides in from right */}
      {selectedSubPage && subPages[selectedSubPage] && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClosePanel}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Detail Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[1000px] bg-gradient-to-br from-[#101725] to-[#182336] border-l border-white/10 shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="relative border-b border-white/10 bg-gradient-to-r from-[#57ACAF]/5 via-transparent to-[#EAB308]/5 p-8">
              <div className="absolute inset-0 opacity-5" style={{ 
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '32px 32px'
              }} />
              
              <div className="relative flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ 
                      background: `linear-gradient(135deg, ${subPages[selectedSubPage].color}60, ${subPages[selectedSubPage].color}40)`,
                      boxShadow: `0 8px 24px ${subPages[selectedSubPage].color}30`
                    }}
                  >
                    {(() => {
                      const Icon = subPages[selectedSubPage].icon;
                      return <Icon className="w-6 h-6 text-white" />;
                    })()}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{subPages[selectedSubPage].name}</h2>
                    <p className="text-[#6F83A7]">{subPages[selectedSubPage].description}</p>
                  </div>
                </div>
                
                <button
                  onClick={handleClosePanel}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Quick Stats */}
              <div className="relative grid grid-cols-4 gap-3">
                <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-xs text-[#6F83A7]">Tabs</div>
                  <div className="text-lg text-white">4</div>
                </div>
                <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-xs text-[#6F83A7]">Features</div>
                  <div className="text-lg text-white">16</div>
                </div>
                <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-xs text-[#6F83A7]">AI-Powered</div>
                  <div className="text-lg text-white">Yes</div>
                </div>
                <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-xs text-[#6F83A7]">Automation</div>
                  <div className="text-lg text-white">Full</div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="relative border-b border-white/10 bg-gradient-to-b from-white/5 to-transparent">
              <div className="flex items-center px-8 gap-1">
                {Object.entries(subPages[selectedSubPage].tabs).map(([tabKey, tab]) => {
                  const TabIcon = tab.icon;
                  return (
                    <button
                      key={tabKey}
                      onClick={() => setActiveTab(tabKey)}
                      className={`
                        relative px-5 py-3.5 text-sm transition-all duration-300 flex items-center gap-2
                        ${activeTab === tabKey ? 'text-[#57ACAF]' : 'text-[#6F83A7] hover:text-white'}
                      `}
                    >
                      <TabIcon className="w-4 h-4" />
                      <span className="relative z-10">{tab.title}</span>
                      
                      {/* Animated underline */}
                      {activeTab === tabKey && (
                        <motion.div
                          layoutId="leadMgmtSubPageTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#57ACAF] to-[#EAB308]"
                          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab Content - Scrollable */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
              {Object.entries(subPages[selectedSubPage].tabs).map(([tabKey, tab]) => {
                if (activeTab !== tabKey) return null;
                
                return (
                  <motion.div
                    key={tabKey}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {/* Hub-and-Spoke Visualization - Only for Overview Tab */}
                    {tabKey === 'overview' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative mb-12 py-16"
                      >
                        {/* Background Glow */}
                        <div 
                          className="absolute inset-0 rounded-3xl blur-3xl opacity-20"
                          style={{ background: `radial-gradient(circle at 50% 50%, ${subPages[selectedSubPage].color}, transparent)` }}
                        />
                        
                        {/* Container for circles */}
                        <div className="relative w-full h-[500px]">
                          {/* Animated Connection Lines (SVG) */}
                          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
                            <defs>
                              <linearGradient id="connectionGradientDrawer1" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#57ACAF" stopOpacity="0.6" />
                                <stop offset="100%" stopColor="#EAB308" stopOpacity="0.6" />
                              </linearGradient>
                              <linearGradient id="connectionGradientDrawer2" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#EAB308" stopOpacity="0.6" />
                                <stop offset="100%" stopColor="#57ACAF" stopOpacity="0.6" />
                              </linearGradient>
                            </defs>
                            
                            {/* Top Connection */}
                            <motion.line
                              x1="50%" y1="50%" x2="50%" y2="10%"
                              stroke="url(#connectionGradientDrawer1)"
                              strokeWidth="2"
                              strokeDasharray="8 4"
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 1 }}
                              transition={{ duration: 1, delay: 0.4 }}
                            />
                            
                            {/* Right Connection */}
                            <motion.line
                              x1="50%" y1="50%" x2="85%" y2="50%"
                              stroke="url(#connectionGradientDrawer2)"
                              strokeWidth="2"
                              strokeDasharray="8 4"
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 1 }}
                              transition={{ duration: 1, delay: 0.6 }}
                            />
                            
                            {/* Bottom Connection */}
                            <motion.line
                              x1="50%" y1="50%" x2="50%" y2="90%"
                              stroke="url(#connectionGradientDrawer1)"
                              strokeWidth="2"
                              strokeDasharray="8 4"
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 1 }}
                              transition={{ duration: 1, delay: 0.8 }}
                            />
                            
                            {/* Left Connection */}
                            <motion.line
                              x1="50%" y1="50%" x2="15%" y2="50%"
                              stroke="url(#connectionGradientDrawer2)"
                              strokeWidth="2"
                              strokeDasharray="8 4"
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 1 }}
                              transition={{ duration: 1, delay: 1.0 }}
                            />
                          </svg>

                          {/* Center Hub - Sub-Page Name */}
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.3, type: 'spring', damping: 20 }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                          >
                            <div className="relative group">
                              {/* Pulsing Ring */}
                              <motion.div
                                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                                className="absolute inset-0 rounded-2xl border-2"
                                style={{ borderColor: `${subPages[selectedSubPage].color}60` }}
                              />
                              
                              {/* Main Card */}
                              <div 
                                className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border-2 border-white/20 rounded-2xl p-6 shadow-2xl w-[200px] h-[200px] flex flex-col items-center justify-center"
                              >
                                <div 
                                  className="absolute inset-0 rounded-2xl opacity-20"
                                  style={{ background: `linear-gradient(135deg, ${subPages[selectedSubPage].color}30, transparent)` }}
                                />
                                
                                <div className="relative">
                                  <div 
                                    className="w-16 h-16 mx-auto mb-3 rounded-xl flex items-center justify-center animate-pulse shadow-lg"
                                    style={{ 
                                      background: `linear-gradient(135deg, ${subPages[selectedSubPage].color}, ${subPages[selectedSubPage].color}80)`,
                                      animationDuration: '2s',
                                      boxShadow: `0 8px 24px ${subPages[selectedSubPage].color}40`
                                    }}
                                  >
                                    {(() => {
                                      const Icon = subPages[selectedSubPage].icon;
                                      return <Icon className="w-8 h-8 text-white" />;
                                    })()}
                                  </div>
                                  
                                  <h3 className="text-center text-white font-bold text-sm leading-tight">
                                    {subPages[selectedSubPage].name}
                                  </h3>
                                  
                                  <div 
                                    className="mt-2 px-2 py-1 rounded text-xs text-center border"
                                    style={{ 
                                      background: `${subPages[selectedSubPage].color}20`,
                                      borderColor: `${subPages[selectedSubPage].color}40`,
                                      color: subPages[selectedSubPage].color
                                    }}
                                  >
                                    4 Tabs
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>

                          {/* Tab Circles Around Hub - Clickable */}
                          {Object.entries(subPages[selectedSubPage].tabs).map(([circleTabKey, circleTab], idx) => {
                            const CircleIcon = circleTab.icon;
                            
                            // Position calculations (top, right, bottom, left)
                            const positions = [
                              { top: '10%', left: '50%', transform: 'translateX(-50%)' }, // Top
                              { top: '50%', right: '15%', transform: 'translateY(-50%)' }, // Right
                              { bottom: '10%', left: '50%', transform: 'translateX(-50%)' }, // Bottom
                              { top: '50%', left: '15%', transform: 'translateY(-50%)' }, // Left
                            ];
                            
                            const position = positions[idx];
                            const isActive = activeTab === circleTabKey;
                            
                            return (
                              <motion.button
                                key={circleTabKey}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.5 + idx * 0.15, type: 'spring', damping: 20 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveTab(circleTabKey)}
                                className="absolute z-20 group"
                                style={position}
                              >
                                {/* Hover Glow */}
                                <div 
                                  className="absolute -inset-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"
                                  style={{ background: `radial-gradient(circle, ${subPages[selectedSubPage].color}40, transparent)` }}
                                />
                                
                                {/* Circle Card */}
                                <div 
                                  className={`
                                    relative bg-gradient-to-br backdrop-blur-xl border rounded-2xl p-5 shadow-xl 
                                    w-[140px] h-[140px] flex flex-col items-center justify-center
                                    transition-all duration-300 cursor-pointer
                                    ${isActive 
                                      ? 'from-white/20 to-white/10 border-white/30 scale-105' 
                                      : 'from-white/5 to-white/[0.02] border-white/10 hover:from-white/10 hover:to-white/5'
                                    }
                                  `}
                                >
                                  {/* Active Indicator */}
                                  {isActive && (
                                    <motion.div
                                      layoutId="activeCircleTab"
                                      className="absolute inset-0 rounded-2xl border-2"
                                      style={{ borderColor: subPages[selectedSubPage].color }}
                                      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                                    />
                                  )}
                                  
                                  {/* Icon */}
                                  <div 
                                    className={`
                                      w-12 h-12 rounded-xl flex items-center justify-center mb-2
                                      transition-transform duration-300 group-hover:scale-110
                                      ${isActive ? 'scale-110' : ''}
                                    `}
                                    style={{ 
                                      background: `linear-gradient(135deg, ${subPages[selectedSubPage].color}40, ${subPages[selectedSubPage].color}20)`,
                                      boxShadow: isActive ? `0 8px 24px ${subPages[selectedSubPage].color}40` : 'none'
                                    }}
                                  >
                                    <CircleIcon 
                                      className="w-6 h-6" 
                                      style={{ color: isActive ? subPages[selectedSubPage].color : '#6F83A7' }} 
                                    />
                                  </div>
                                  
                                  {/* Label */}
                                  <h4 
                                    className={`
                                      text-center text-xs font-medium leading-tight
                                      ${isActive ? 'text-white' : 'text-[#6F83A7] group-hover:text-white'}
                                    `}
                                  >
                                    {circleTab.title}
                                  </h4>
                                  
                                  {/* Click Hint */}
                                  {!isActive && (
                                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <span 
                                        className="text-xs whitespace-nowrap"
                                        style={{ color: subPages[selectedSubPage].color }}
                                      >
                                        Click to view
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </motion.button>
                            );
                          })}
                        </div>
                        
                        {/* Instructions Text */}
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.5 }}
                          className="text-center text-[#6F83A7] text-sm mt-6"
                        >
                          Click any tab circle to explore its features
                        </motion.p>
                      </motion.div>
                    )}

                    {tab.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                        className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-5 hover:from-white/10 hover:to-white/5 transition-all group"
                      >
                        <div className="flex items-start gap-4">
                          {/* Icon */}
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                            style={{ 
                              background: `linear-gradient(135deg, ${subPages[selectedSubPage].color}30, ${subPages[selectedSubPage].color}10)`,
                              boxShadow: `0 4px 12px ${subPages[selectedSubPage].color}20`
                            }}
                          >
                            <CheckCircle className="w-5 h-5" style={{ color: subPages[selectedSubPage].color }} />
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1">
                            <h3 className="text-white font-medium mb-2">{feature.name}</h3>
                            <p className="text-[#6F83A7] text-sm leading-relaxed">{feature.desc}</p>
                          </div>

                          {/* Ask MARBIM Button */}
                          <button
                            onClick={() => onAskMarbim(`Tell me more about ${feature.name} in ${subPages[selectedSubPage].name}`)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#EAB308]/10 to-[#EAB308]/5 border border-[#EAB308]/20 text-[#EAB308] text-xs hover:from-[#EAB308]/20 hover:to-[#EAB308]/10 flex items-center gap-1.5"
                          >
                            <Sparkles className="w-3 h-3" />
                            Ask MARBIM
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                );
              })}
            </div>

            {/* Footer CTA */}
            <div className="border-t border-white/10 p-6 bg-gradient-to-t from-white/5 to-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium mb-1">Ready to get started?</h3>
                  <p className="text-sm text-[#6F83A7]">Set up {subPages[selectedSubPage].name} in minutes</p>
                </div>
                <Button
                  onClick={() => {
                    handleClosePanel();
                    onNavigate('lead-management-pricing');
                  }}
                  className="bg-gradient-to-r from-[#57ACAF] to-[#57ACAF]/80 hover:from-[#57ACAF]/90 hover:to-[#57ACAF]/70 text-white shadow-lg shadow-[#57ACAF]/20"
                >
                  Continue to Pricing
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
