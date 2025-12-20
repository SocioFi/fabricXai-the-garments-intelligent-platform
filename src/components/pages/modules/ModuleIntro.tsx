import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  ArrowRight, Sparkles, Users, TrendingUp, Check,
  ChevronLeft, Zap, Target, BarChart3, Play, CheckCircle,
  Brain, Activity, Clock, AlertCircle, Bell, Mail, DollarSign
} from 'lucide-react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';

interface ModuleIntroProps {
  moduleId: string;
  moduleName: string;
  moduleIcon: any;
  description: string;
  ownerImpact: string;
  employeeImpact: string;
  keyFeatures: string[];
  aiCapabilities: string[];
  onNavigate: (page: string) => void;
  onAskMarbim: (prompt: string) => void;
}

export function ModuleIntro({
  moduleId,
  moduleName,
  moduleIcon: Icon,
  description,
  ownerImpact,
  employeeImpact,
  keyFeatures,
  aiCapabilities,
  onNavigate,
  onAskMarbim,
}: ModuleIntroProps) {
  const [activeFeature, setActiveFeature] = useState(0);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, 50]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  const displayFeatures = keyFeatures.slice(0, 4).map((feature, idx) => ({
    label: feature,
    icon: [Target, Zap, Brain, Activity][idx] || Target,
    color: ['#57ACAF', '#EAB308', '#57ACAF', '#EAB308'][idx] || '#57ACAF'
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % displayFeatures.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [displayFeatures.length]);

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

      {/* Back Button - Floating */}
      <div className="relative">
        <div className="absolute top-8 left-8 z-10">
          <Button
            onClick={() => onNavigate('modules')}
            variant="ghost"
            className="text-[#6F83A7] hover:text-white hover:bg-white/10 backdrop-blur-xl border border-white/10"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Modules
          </Button>
        </div>
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
                  ✨ AI-Powered Module
                </Badge>

                <h1 className="text-7xl font-bold text-white mb-6 leading-[1.1]">
                  {moduleName.split(' ').slice(0, -1).join(' ')}
                  <span className="block bg-gradient-to-r from-[#57ACAF] via-[#EAB308] to-[#57ACAF] bg-clip-text text-transparent">
                    {moduleName.split(' ').slice(-1)[0]}
                  </span>
                </h1>

                <p className="text-2xl text-[#6F83A7] mb-10 leading-relaxed">
                  {description}
                </p>

                <div className="flex flex-wrap gap-4 mb-12">
                  <Button
                    onClick={() => onNavigate(`modules/${moduleId}/pricing`)}
                    className="bg-gradient-to-r from-[#EAB308] to-[#EAB308]/80 hover:from-[#EAB308]/90 hover:to-[#EAB308]/70 text-black px-8 py-7 text-lg rounded-2xl shadow-2xl shadow-[#EAB308]/40 transition-all duration-300 hover:scale-105 hover:shadow-[#EAB308]/60"
                  >
                    Get Started Free
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button
                    onClick={() => onAskMarbim(`Show me a demo of ${moduleName} with my factory data`)}
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

              {/* Right Visual - Floating Feature Cards */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative"
              >
                <div className="relative w-full h-[600px]">
                  {/* Main Card */}
                  <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#57ACAF] to-[#57ACAF]/60 shadow-lg flex items-center justify-center">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium text-lg">{moduleName}</h3>
                        <p className="text-[#6F83A7] text-sm">Real-time AI insights</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {displayFeatures.map((feature, idx) => {
                        const FeatureIcon = feature.icon;
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
                              <FeatureIcon className="w-5 h-5" style={{ color: feature.color }} />
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
                    <div className="text-[#6F83A7] text-sm">Faster Processing</div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-10 -right-10 bg-gradient-to-br from-[#57ACAF]/20 to-[#57ACAF]/10 backdrop-blur-xl border border-[#57ACAF]/30 rounded-2xl p-6 shadow-xl"
                  >
                    <div className="text-4xl font-bold text-white mb-1">94%</div>
                    <div className="text-[#6F83A7] text-sm">Accuracy Rate</div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Business Impact Metrics Section */}
        <section className="relative px-8 py-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold text-white mb-4">
                Measurable Impact on Your Bottom Line
              </h2>
              <p className="text-lg text-[#6F83A7]">
                Real results from garment manufacturers using AI-powered lead management
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6">
              {/* Card 1: Buyer Response Time */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-gradient-to-b from-[#1a1f2e] to-[#151922] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#57ACAF]/20 flex items-center justify-center mb-6">
                  <Clock className="w-6 h-6 text-[#57ACAF]" />
                </div>
                
                <h3 className="text-lg font-bold text-white mb-8">Buyer Response Time</h3>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <div className="text-xs text-[#6F83A7] mb-1">Before AI</div>
                    <div className="text-4xl font-bold text-[#ff6b6b]">36h</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#6F83A7] mb-1">With AI</div>
                    <div className="text-4xl font-bold text-white">4h</div>
                  </div>
                </div>

                <Badge className="bg-[#57ACAF]/20 text-[#57ACAF] border-0 text-sm px-3 py-1">
                  +89% improvement
                </Badge>
              </motion.div>

              {/* Card 2: Key Account Retention */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gradient-to-b from-[#1a1f2e] to-[#151922] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#EAB308]/20 flex items-center justify-center mb-6">
                  <TrendingUp className="w-6 h-6 text-[#EAB308]" />
                </div>
                
                <h3 className="text-lg font-bold text-white mb-8">Key Account Retention</h3>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <div className="text-xs text-[#6F83A7] mb-1">Before AI</div>
                    <div className="text-4xl font-bold text-[#ff6b6b]">82%</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#6F83A7] mb-1">With AI</div>
                    <div className="text-4xl font-bold text-white">94%</div>
                  </div>
                </div>

                <Badge className="bg-[#EAB308]/20 text-[#EAB308] border-0 text-sm px-3 py-1">
                  +133% improvement
                </Badge>
              </motion.div>

              {/* Card 3: Repeat Order Rate */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-gradient-to-b from-[#1a1f2e] to-[#151922] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#57ACAF]/20 flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-[#57ACAF]" />
                </div>
                
                <h3 className="text-lg font-bold text-white mb-8">RFQs Generated</h3>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <div className="text-xs text-[#6F83A7] mb-1">Before AI</div>
                    <div className="text-4xl font-bold text-[#ff6b6b]">45</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#6F83A7] mb-1">With AI</div>
                    <div className="text-4xl font-bold text-white">120</div>
                  </div>
                </div>

                <Badge className="bg-[#57ACAF]/20 text-[#57ACAF] border-0 text-sm px-3 py-1">
                  +167% improvement
                </Badge>
              </motion.div>

              {/* Card 4: Team Efficiency */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gradient-to-b from-[#1a1f2e] to-[#151922] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#EAB308]/20 flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-[#EAB308]" />
                </div>
                
                <h3 className="text-lg font-bold text-white mb-8">Team Efficiency</h3>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <div className="text-xs text-[#6F83A7] mb-1">Before AI</div>
                    <div className="text-4xl font-bold text-[#ff6b6b]">30</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#6F83A7] mb-1">With AI</div>
                    <div className="text-4xl font-bold text-white">85</div>
                  </div>
                </div>

                <Badge className="bg-[#EAB308]/20 text-[#EAB308] border-0 text-sm px-3 py-1">
                  +183% improvement
                </Badge>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Role-Based Benefits Carousel Section */}
        <section className="relative px-8 py-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold text-white mb-4">
                Every Team Sees the Buyer Differently. FabricXAI Aligns Them.
              </h2>
              <p className="text-xl text-[#6F83A7]">From factory owners to frontline teams—everyone gets tailored tools for their role</p>
            </motion.div>

            {(() => {
              const [currentRole, setCurrentRole] = useState(0);

              const roles = [
                {
                  title: 'Factory Owner / Managing Director',
                  subtitle: 'Growth View',
                  color: '#EAB308',
                  icon: TrendingUp,
                  benefits: [
                    { icon: Target, title: 'Track buyer-wise revenue, profit, and payment behaviour', description: 'Complete financial visibility per buyer account' },
                    { icon: BarChart3, title: 'See which 10 buyers drive 70% of margin', description: 'Identify your most profitable relationships' },
                    { icon: AlertCircle, title: 'Get alerts on at-risk high-value buyers', description: 'Proactive retention for key accounts' },
                    { icon: Activity, title: 'Simulate impact if a key buyer churns', description: 'Scenario planning for business continuity' }
                  ]
                },
                {
                  title: 'Head of Merchandising',
                  subtitle: 'Relationship View',
                  color: '#57ACAF',
                  icon: Users,
                  benefits: [
                    { icon: Target, title: 'Centralized buyer preferences (fits, styles, lead times)', description: 'All buyer requirements in one place' },
                    { icon: Clock, title: 'Instant access to past order history during negotiations', description: 'Make informed decisions with historical context' },
                    { icon: CheckCircle, title: 'Sampling & approval timelines per buyer', description: 'Track buyer-specific processes' },
                    { icon: Brain, title: 'MARBIM suggests optimal price bands by buyer profile', description: 'AI-powered pricing recommendations' }
                  ]
                },
                {
                  title: 'Key Account Manager',
                  subtitle: 'Day-to-Day Execution',
                  color: '#EAB308',
                  icon: Users,
                  benefits: [
                    { icon: Target, title: 'Buyer 360 with open RFQs, samples, and pending approvals', description: 'Complete visibility into buyer interactions' },
                    { icon: Activity, title: 'Health score based on responsiveness, approvals, and disputes', description: 'Monitor relationship strength in real-time' },
                    { icon: Bell, title: 'Automated "nudge" reminders before quiet periods', description: 'Stay proactive with buyer engagement' },
                    { icon: TrendingUp, title: 'Upsell prompts based on similar buyer behaviour', description: 'AI identifies expansion opportunities' }
                  ]
                },
                {
                  title: 'Business Development / Marketing',
                  subtitle: 'Pipeline & Branding',
                  color: '#57ACAF',
                  icon: Target,
                  benefits: [
                    { icon: Users, title: 'Segment buyers by region, category, and sustainability', description: 'Create targeted buyer groups' },
                    { icon: Mail, title: 'Run targeted email/WhatsApp campaigns by buyer segment', description: 'Multi-channel buyer engagement' },
                    { icon: Activity, title: 'Track engagement at account (not just lead) level', description: 'Measure buyer interaction effectiveness' },
                    { icon: Brain, title: 'Identify "lookalike buyers" for new outreach', description: 'AI finds similar high-value prospects' }
                  ]
                },
                {
                  title: 'Production & Planning',
                  subtitle: 'Commitment View',
                  color: '#EAB308',
                  icon: Activity,
                  benefits: [
                    { icon: Clock, title: 'Buyer-wise standard lead times and flexibility', description: 'Understand buyer-specific requirements' },
                    { icon: CheckCircle, title: 'Service-level expectations & penalty clauses at a glance', description: 'Avoid costly compliance issues' },
                    { icon: Target, title: 'Link buyer orders to capacity planning schedules', description: 'Optimize production allocation' },
                    { icon: AlertCircle, title: 'Alerts when a buyer\'s orders overload a single line', description: 'Balance production capacity proactively' }
                  ]
                },
                {
                  title: 'Finance / Commercial',
                  subtitle: 'Credit & Payment View',
                  color: '#57ACAF',
                  icon: DollarSign,
                  benefits: [
                    { icon: DollarSign, title: 'Credit terms and DSO for each buyer', description: 'Financial terms at your fingertips' },
                    { icon: Activity, title: 'Payment history and dispute frequency', description: 'Track buyer payment reliability' },
                    { icon: AlertCircle, title: 'Automated risk flags for overexposed accounts', description: 'Protect against concentration risk' },
                    { icon: Brain, title: 'Recommend revised terms (LC vs TT, shorter credit)', description: 'AI-optimized payment structures' }
                  ]
                }
              ];

              const currentRoleData = roles[currentRole];
              const RoleIcon = currentRoleData.icon;

              return (
                <div className="relative">
                  {/* Navigation Arrows */}
                  <button
                    onClick={() => setCurrentRole((prev) => (prev - 1 + roles.length) % roles.length)}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center text-white"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => setCurrentRole((prev) => (prev + 1) % roles.length)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center text-white"
                  >
                    <ArrowRight className="w-6 h-6" />
                  </button>

                  {/* Role Card */}
                  <motion.div
                    key={currentRole}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.4 }}
                    className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-10 max-w-3xl mx-auto"
                  >
                    {/* Role Header */}
                    <div className="flex items-center gap-4 mb-8">
                      <div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center"
                        style={{ 
                          background: `linear-gradient(135deg, ${currentRoleData.color}, ${currentRoleData.color}99)`,
                          boxShadow: `0 20px 40px ${currentRoleData.color}30`
                        }}
                      >
                        <RoleIcon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-white">For {currentRoleData.title}</h3>
                        <p className="text-[#6F83A7]">{currentRoleData.subtitle}</p>
                      </div>
                    </div>

                    {/* Benefits Grid */}
                    <div className="space-y-6 mb-8">
                      {currentRoleData.benefits.map((benefit, idx) => {
                        const BenefitIcon = benefit.icon;
                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: idx * 0.1 }}
                            className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
                          >
                            <div 
                              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                              style={{ background: `${currentRoleData.color}33` }}
                            >
                              <BenefitIcon className="w-6 h-6" style={{ color: currentRoleData.color }} />
                            </div>
                            <div>
                              <h4 className="text-white font-medium text-lg mb-1">{benefit.title}</h4>
                              <p className="text-[#6F83A7]">{benefit.description}</p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Ask MARBIM Button */}
                    <button
                      onClick={() => onAskMarbim(`Tell me more about how ${currentRoleData.title} can benefit from Buyer Management`)}
                      className="w-full p-5 rounded-2xl border text-white hover:bg-white/5 transition-all flex items-center justify-between group"
                      style={{ 
                        background: `linear-gradient(135deg, ${currentRoleData.color}10, ${currentRoleData.color}05)`,
                        borderColor: `${currentRoleData.color}33`
                      }}
                    >
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5" style={{ color: currentRoleData.color }} />
                        <span className="font-medium">Ask MARBIM About This Role</span>
                      </span>
                      <ArrowRight 
                        className="w-5 h-5 group-hover:translate-x-1 transition-all" 
                        style={{ color: currentRoleData.color }}
                      />
                    </button>
                  </motion.div>

                  {/* Carousel Dots */}
                  <div className="flex items-center justify-center gap-2 mt-8">
                    {roles.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentRole(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          idx === currentRole 
                            ? 'w-8 bg-[#EAB308]' 
                            : 'w-2 bg-white/20 hover:bg-white/40'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Role Label */}
                  <div className="text-center mt-4">
                    <p className="text-sm text-[#6F83A7]">{roles[currentRole].subtitle}</p>
                  </div>
                </div>
              );
            })()}
          </div>
        </section>

        {/* Key Features Deep Dive Section */}
        <section className="relative px-8 py-20 bg-gradient-to-b from-transparent via-[#0D1117]/50 to-transparent">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold text-white mb-4">
                Everything You Need to Truly Know Your Buyers
              </h2>
              <p className="text-xl text-[#6F83A7]">Deep insights and intelligent automation for buyer relationships</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Feature Card 1: Buyer 360 Profile */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-8 hover:border-[#57ACAF]/30 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-[#57ACAF]/20 flex items-center justify-center group-hover:bg-[#57ACAF]/30 transition-all duration-300">
                    <Users className="w-7 h-7 text-[#57ACAF]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Buyer 360 Profile</h3>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#57ACAF] flex-shrink-0 mt-0.5" />
                    <p className="text-[#6F83A7]">Consolidated view of company info, contacts, regions, brands.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#57ACAF] flex-shrink-0 mt-0.5" />
                    <p className="text-[#6F83A7]">Order history by style, season, and product category.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#57ACAF] flex-shrink-0 mt-0.5" />
                    <p className="text-[#6F83A7]">Sampling, approvals, and complaint history.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#57ACAF] flex-shrink-0 mt-0.5" />
                    <p className="text-[#6F83A7]">Linked communication across email, WhatsApp, and portal.</p>
                  </div>
                </div>

                <button
                  onClick={() => onAskMarbim('Show me how Buyer 360 Profile works')}
                  className="text-[#57ACAF] hover:text-[#57ACAF]/80 transition-colors text-sm font-medium flex items-center gap-2 group/btn"
                >
                  <span>Explore in Buyer 360</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </motion.div>

              {/* Feature Card 2: Buyer Health & Churn Risk Scoring */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-8 hover:border-[#EAB308]/30 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-[#EAB308]/20 flex items-center justify-center group-hover:bg-[#EAB308]/30 transition-all duration-300">
                    <Activity className="w-7 h-7 text-[#EAB308]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Buyer Health & Churn Risk Scoring</h3>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#EAB308] flex-shrink-0 mt-0.5" />
                    <p className="text-[#6F83A7]">AI score based on order frequency, margins, and disputes.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#EAB308] flex-shrink-0 mt-0.5" />
                    <p className="text-[#6F83A7]">Early warning signals when order volume drops.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#EAB308] flex-shrink-0 mt-0.5" />
                    <p className="text-[#6F83A7]">'Silent month' alerts for previously active buyers.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#EAB308] flex-shrink-0 mt-0.5" />
                    <p className="text-[#6F83A7]">Tier labels: Strategic, Growth, Watchlist, Dormant.</p>
                  </div>
                </div>

                <button
                  onClick={() => onAskMarbim('Tell me about Buyer Health & Churn Risk Scoring')}
                  className="text-[#EAB308] hover:text-[#EAB308]/80 transition-colors text-sm font-medium flex items-center gap-2 group/btn"
                >
                  <span>Explore in Buyer 360</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </motion.div>

              {/* Feature Card 3: Commercial & Credit Control */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-8 hover:border-[#57ACAF]/30 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-[#57ACAF]/20 flex items-center justify-center group-hover:bg-[#57ACAF]/30 transition-all duration-300">
                    <DollarSign className="w-7 h-7 text-[#57ACAF]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Commercial & Credit Control</h3>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#57ACAF] flex-shrink-0 mt-0.5" />
                    <p className="text-[#6F83A7]">Buyer-wise price bands and negotiation guardrails.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#57ACAF] flex-shrink-0 mt-0.5" />
                    <p className="text-[#6F83A7]">Credit limit, outstanding exposure, and DSO.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#57ACAF] flex-shrink-0 mt-0.5" />
                    <p className="text-[#6F83A7]">Automatic reminders for overdue payments.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#57ACAF] flex-shrink-0 mt-0.5" />
                    <p className="text-[#6F83A7]">Recommendations to tighten/relax credit based on risk.</p>
                  </div>
                </div>

                <button
                  onClick={() => onAskMarbim('How does Commercial & Credit Control work?')}
                  className="text-[#57ACAF] hover:text-[#57ACAF]/80 transition-colors text-sm font-medium flex items-center gap-2 group/btn"
                >
                  <span>Explore in Buyer 360</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </motion.div>

              {/* Feature Card 4: Preference & Compliance Intelligence */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-8 hover:border-[#EAB308]/30 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-[#EAB308]/20 flex items-center justify-center group-hover:bg-[#EAB308]/30 transition-all duration-300">
                    <Target className="w-7 h-7 text-[#EAB308]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Preference & Compliance Intelligence</h3>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#EAB308] flex-shrink-0 mt-0.5" />
                    <p className="text-[#6F83A7]">Buyer-specific compliance requirements (audits, certifications).</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#EAB308] flex-shrink-0 mt-0.5" />
                    <p className="text-[#6F83A7]">Preferred factories, product lines, and sustainability standards.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#EAB308] flex-shrink-0 mt-0.5" />
                    <p className="text-[#6F83A7]">Style, fit, and packaging preferences stored and searchable.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#EAB308] flex-shrink-0 mt-0.5" />
                    <p className="text-[#6F83A7]">MARBIM suggestions: "This buyer will like X based on Y."</p>
                  </div>
                </div>

                <button
                  onClick={() => onAskMarbim('Explain Preference & Compliance Intelligence')}
                  className="text-[#EAB308] hover:text-[#EAB308]/80 transition-colors text-sm font-medium flex items-center gap-2 group/btn"
                >
                  <span>Explore in Buyer 360</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* AI Capabilities Section */}
        <section className="relative px-8 py-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#EAB308]/20 to-[#EAB308]/10 border border-[#EAB308]/30 rounded-full px-6 py-3 mb-6">
                <Sparkles className="w-5 h-5 text-[#EAB308]" />
                <span className="text-[#EAB308] font-medium">AI-Powered</span>
              </div>
              <h2 className="text-5xl font-bold text-white mb-4">
                Smart <span className="bg-gradient-to-r from-[#EAB308] to-[#57ACAF] bg-clip-text text-transparent">Automation</span>
              </h2>
              <p className="text-xl text-[#6F83A7]">Let MARBIM AI do the heavy lifting</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {aiCapabilities.map((capability, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-[#EAB308]/10 to-[#EAB308]/5 border border-[#EAB308]/20 rounded-2xl p-6 hover:border-[#EAB308]/40 hover:bg-[#EAB308]/15 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#EAB308]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#EAB308]/30 transition-all duration-300">
                      <Zap className="w-6 h-6 text-[#EAB308]" />
                    </div>
                    <p className="text-white text-lg pt-2">{capability}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative px-8 py-32">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-6xl font-bold text-white mb-6">
                Ready to <span className="bg-gradient-to-r from-[#57ACAF] to-[#EAB308] bg-clip-text text-transparent">Transform</span>?
              </h2>
              <p className="text-2xl text-[#6F83A7] mb-12">
                Start your 14-day free trial. No credit card required.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-6">
                <Button
                  onClick={() => onNavigate(`modules/${moduleId}/pricing`)}
                  className="bg-gradient-to-r from-[#EAB308] to-[#EAB308]/80 hover:from-[#EAB308]/90 hover:to-[#EAB308]/70 text-black px-10 py-8 text-xl rounded-2xl shadow-2xl shadow-[#EAB308]/40 transition-all duration-300 hover:scale-105"
                >
                  View Pricing Plans
                  <ArrowRight className="w-6 h-6 ml-2" />
                </Button>
                <Button
                  onClick={() => onAskMarbim(`Tell me more about ${moduleName} and how it can help my factory`)}
                  variant="outline"
                  className="border-2 border-white/20 bg-white/5 backdrop-blur-xl text-white hover:bg-white/10 px-10 py-8 text-xl rounded-2xl"
                >
                  <Sparkles className="w-6 h-6 mr-2" />
                  Ask MARBIM AI
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}