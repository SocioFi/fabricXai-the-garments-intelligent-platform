import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Check, X, ArrowRight, Sparkles, DollarSign, TrendingUp, 
  Calculator, Building2, Users, Zap, Mail, MessageSquare,
  Database, Shield, Globe, ChevronRight, Package, BarChart3,
  Smartphone, Cloud, Star, Crown, Rocket
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Slider } from '../ui/slider';
import { Switch } from '../ui/switch';
import { toast } from 'sonner';

interface LeadManagementPricingProps {
  onNavigate: (page: string) => void;
  onAskMarbim: (prompt: string) => void;
}

export function LeadManagementPricing({ onNavigate, onAskMarbim }: LeadManagementPricingProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [factorySize, setFactorySize] = useState(500);
  const [leadsPerMonth, setLeadsPerMonth] = useState(150);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  const plans = [
    {
      id: 'basic',
      name: 'Starter',
      tagline: 'Essential lead tracking',
      priceMonthly: 99,
      priceAnnual: 990,
      color: '#6F83A7',
      icon: Package,
      features: [
        { text: 'Lead inbox & manual import', included: true },
        { text: 'Basic lead scoring', included: true },
        { text: 'Email integration (Gmail/Outlook)', included: true },
        { text: 'Manual follow-up reminders', included: true },
        { text: 'Up to 200 leads/month', included: true },
        { text: 'Basic reporting', included: true },
        { text: 'AI scoring & prioritization', included: false },
        { text: 'Automated follow-ups', included: false },
        { text: 'Campaign builder', included: false },
      ],
      cta: 'Start Free Trial',
    },
    {
      id: 'growth',
      name: 'Professional',
      tagline: 'AI-powered automation',
      priceMonthly: 299,
      priceAnnual: 2990,
      color: '#EAB308',
      icon: Rocket,
      popular: true,
      features: [
        { text: 'Everything in Starter', included: true },
        { text: 'AI lead scoring & prioritization', included: true },
        { text: 'Automated follow-up campaigns', included: true },
        { text: 'Email campaign builder', included: true },
        { text: 'Up to 1,000 leads/month', included: true },
        { text: 'Advanced analytics & forecasting', included: true },
        { text: 'MARBIM AI suggestions', included: true },
        { text: 'CRM integrations', included: true },
        { text: 'Multi-language support', included: false },
      ],
      cta: 'Start Free Trial',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      tagline: 'Unlimited + custom AI',
      priceMonthly: 699,
      priceAnnual: 6990,
      color: '#57ACAF',
      icon: Crown,
      features: [
        { text: 'Everything in Professional', included: true },
        { text: 'Unlimited leads', included: true },
        { text: 'Omni-channel (Email, WhatsApp, LinkedIn)', included: true },
        { text: 'Custom AI training on your data', included: true },
        { text: 'Advanced workflow automation', included: true },
        { text: 'Multi-language AI responses', included: true },
        { text: 'API access & webhooks', included: true },
        { text: 'Dedicated account manager', included: true },
        { text: 'Priority support (24/7)', included: true },
      ],
      cta: 'Contact Sales',
    },
  ];

  const addons = [
    { name: 'WhatsApp Business API', price: 79, icon: MessageSquare, color: '#57ACAF', desc: 'Automated WhatsApp messaging' },
    { name: 'IoT Data Sync', price: 149, icon: Database, color: '#EAB308', desc: 'Real-time capacity sync' },
    { name: 'Predictive AI Pack', price: 199, icon: Sparkles, color: '#57ACAF', desc: 'Advanced ML models' },
    { name: 'Buyer Portal Access', price: 99, icon: Globe, color: '#EAB308', desc: 'Dedicated buyer portal' },
  ];

  const calculateROI = () => {
    const currentConversion = 0.12;
    const aiConversion = 0.28;
    const avgOrderValue = 25000;
    
    const currentRFQs = Math.round(leadsPerMonth * currentConversion);
    const aiRFQs = Math.round(leadsPerMonth * aiConversion);
    const additionalRFQs = aiRFQs - currentRFQs;
    const additionalRevenue = additionalRFQs * avgOrderValue;
    const planCost = billingCycle === 'monthly' ? plans[1].priceMonthly : Math.round(plans[1].priceAnnual / 12);
    const monthlyROI = additionalRevenue - planCost;
    const roiMultiple = (additionalRevenue / planCost).toFixed(1);
    
    return { currentRFQs, aiRFQs, additionalRFQs, additionalRevenue, planCost, monthlyROI, roiMultiple };
  };

  const roi = calculateROI();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F1C] via-[#101725] to-[#0A0F1C] overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-[600px] h-[600px] bg-[#57ACAF]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-[#EAB308]/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
      </div>

      <div className="relative px-8 py-20">
        <div className="max-w-7xl mx-auto space-y-24">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Badge className="bg-gradient-to-r from-[#EAB308]/20 to-[#57ACAF]/20 text-white border border-[#EAB308]/30 px-4 py-2 mb-6">
              <DollarSign className="w-4 h-4 inline mr-2" />
              Flexible Pricing
            </Badge>
            <h1 className="text-6xl font-bold text-white mb-6">
              Choose Your Growth Plan
            </h1>
            <p className="text-2xl text-[#6F83A7] mb-10 max-w-3xl mx-auto">
              Start small, scale as you grow. All plans include 14-day free trial.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 p-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-8 py-3 rounded-xl transition-all ${
                  billingCycle === 'monthly' 
                    ? 'bg-white/10 text-white font-medium' 
                    : 'text-[#6F83A7] hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-8 py-3 rounded-xl transition-all ${
                  billingCycle === 'annual' 
                    ? 'bg-gradient-to-r from-[#EAB308] to-[#EAB308]/80 text-black font-medium shadow-lg shadow-[#EAB308]/30' 
                    : 'text-[#6F83A7] hover:text-white'
                }`}
              >
                Annual
                <Badge className="ml-2 bg-white/20 text-white border-0 text-xs">Save 17%</Badge>
              </button>
            </div>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan, idx) => {
              const Icon = plan.icon;
              const isHovered = hoveredPlan === plan.id;
              const price = billingCycle === 'monthly' ? plan.priceMonthly : Math.round(plan.priceAnnual / 12);

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  onMouseEnter={() => setHoveredPlan(plan.id)}
                  onMouseLeave={() => setHoveredPlan(null)}
                  className="relative group"
                >
                  {plan.popular && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                      <Badge className="bg-gradient-to-r from-[#EAB308] to-[#EAB308]/80 text-black font-medium px-6 py-2 shadow-2xl shadow-[#EAB308]/40 border-0">
                        <Star className="w-4 h-4 inline mr-2 fill-current" />
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  {/* Glow Effect */}
                  <div 
                    className={`absolute inset-0 rounded-[2rem] blur-2xl transition-opacity duration-500 ${
                      plan.popular ? 'opacity-60' : 'opacity-0 group-hover:opacity-40'
                    }`}
                    style={{ background: `radial-gradient(circle at 50% 0%, ${plan.color}40, transparent)` }}
                  />

                  <div className={`
                    relative h-full bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl 
                    border rounded-[2rem] p-8 transition-all duration-500
                    ${plan.popular 
                      ? 'border-[#EAB308]/40 shadow-2xl shadow-[#EAB308]/20' 
                      : 'border-white/10 hover:border-white/20'
                    }
                    ${isHovered ? 'scale-105 shadow-2xl' : ''}
                  `}>
                    {/* Icon */}
                    <div 
                      className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ 
                        background: `linear-gradient(135deg, ${plan.color}30, ${plan.color}10)`,
                        boxShadow: `0 8px 32px ${plan.color}20`
                      }}
                    >
                      <Icon className="w-8 h-8" style={{ color: plan.color }} />
                    </div>

                    {/* Header */}
                    <div className="mb-8">
                      <h3 className="text-3xl font-bold text-white mb-2">{plan.name}</h3>
                      <p className="text-[#6F83A7]">{plan.tagline}</p>
                    </div>

                    {/* Price */}
                    <div className="mb-8">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-5xl font-bold text-white">${price}</span>
                        <span className="text-[#6F83A7]">/month</span>
                      </div>
                      {billingCycle === 'annual' && (
                        <p className="text-sm text-[#6F83A7]">
                          Billed ${plan.priceAnnual} annually
                        </p>
                      )}
                    </div>

                    {/* CTA */}
                    <Button
                      onClick={() => {
                        if (plan.id === 'enterprise') {
                          toast.success('Connecting you with our sales team...');
                        } else {
                          onNavigate('lead-management-onboarding');
                        }
                      }}
                      className={`
                        w-full mb-8 py-6 rounded-xl font-medium transition-all duration-300 hover:scale-105
                        ${plan.popular 
                          ? 'bg-gradient-to-r from-[#EAB308] to-[#EAB308]/80 hover:from-[#EAB308]/90 hover:to-[#EAB308]/70 text-black shadow-lg shadow-[#EAB308]/30' 
                          : 'bg-white/5 border-2 border-white/10 text-white hover:bg-white/10 hover:border-white/20'
                        }
                      `}
                    >
                      {plan.cta}
                      <ArrowRight className="w-5 h-5 ml-2 inline" />
                    </Button>

                    {/* Features */}
                    <div className="space-y-4">
                      {plan.features.map((feature, fidx) => (
                        <div key={fidx} className="flex items-start gap-3">
                          <div className={`
                            w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
                            ${feature.included ? 'bg-[#57ACAF]/20' : 'bg-white/5'}
                          `}>
                            {feature.included ? (
                              <Check className="w-3 h-3 text-[#57ACAF]" />
                            ) : (
                              <X className="w-3 h-3 text-[#6F83A7]/50" />
                            )}
                          </div>
                          <span className={`text-sm ${feature.included ? 'text-white' : 'text-[#6F83A7]'}`}>
                            {feature.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ROI Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#EAB308]/10 via-[#57ACAF]/10 to-[#EAB308]/10 rounded-[3rem] blur-3xl" />
            
            <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[3rem] p-12">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#EAB308] to-[#57ACAF] shadow-2xl shadow-[#EAB308]/30 flex items-center justify-center">
                  <Calculator className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-white mb-2">ROI Calculator</h2>
                  <p className="text-[#6F83A7] text-lg">See your potential returns with AI-powered lead management</p>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                {/* Controls */}
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <label className="text-white font-medium text-lg">Factory Size</label>
                      <Badge className="bg-[#EAB308]/20 text-[#EAB308] border border-[#EAB308]/30 px-4 py-1 text-base">
                        {factorySize} workers
                      </Badge>
                    </div>
                    <Slider 
                      value={[factorySize]} 
                      onValueChange={(value) => setFactorySize(value[0])}
                      min={100}
                      max={2000}
                      step={50}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-[#6F83A7] mt-2">
                      <span>100</span>
                      <span>2000</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <label className="text-white font-medium text-lg">Monthly Leads</label>
                      <Badge className="bg-[#57ACAF]/20 text-[#57ACAF] border border-[#57ACAF]/30 px-4 py-1 text-base">
                        {leadsPerMonth} leads
                      </Badge>
                    </div>
                    <Slider 
                      value={[leadsPerMonth]} 
                      onValueChange={(value) => setLeadsPerMonth(value[0])}
                      min={50}
                      max={1000}
                      step={25}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-[#6F83A7] mt-2">
                      <span>50</span>
                      <span>1000</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onAskMarbim(`Calculate detailed ROI for my factory: ${factorySize} workers, ${leadsPerMonth} leads/month with 12-month projections`)}
                    className="w-full p-5 rounded-2xl bg-gradient-to-r from-[#EAB308]/10 to-[#57ACAF]/10 border border-[#EAB308]/20 text-white hover:from-[#EAB308]/20 hover:to-[#57ACAF]/20 transition-all flex items-center justify-between group"
                  >
                    <span className="flex items-center gap-2 font-medium">
                      <Sparkles className="w-5 h-5 text-[#EAB308]" />
                      Get Detailed Analysis from MARBIM
                    </span>
                    <ChevronRight className="w-5 h-5 text-[#6F83A7] group-hover:text-[#EAB308] group-hover:translate-x-1 transition-all" />
                  </button>
                </div>

                {/* Results */}
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                      <div className="text-sm text-[#6F83A7] mb-2">Current RFQs/month</div>
                      <div className="text-4xl font-bold text-white">{roi.currentRFQs}</div>
                    </div>
                    <div className="bg-gradient-to-br from-[#57ACAF]/20 to-[#57ACAF]/10 border border-[#57ACAF]/30 rounded-2xl p-6">
                      <div className="text-sm text-[#57ACAF] mb-2">With AI RFQs/month</div>
                      <div className="text-4xl font-bold text-white">{roi.aiRFQs}</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-[#EAB308]/20 to-[#EAB308]/10 border border-[#EAB308]/30 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-[#EAB308] font-medium">Additional RFQs</span>
                      <Badge className="bg-[#EAB308]/20 text-[#EAB308] border border-[#EAB308]/40">
                        +{roi.additionalRFQs}
                      </Badge>
                    </div>
                    <div className="text-5xl font-bold text-white mb-2">
                      ${roi.additionalRevenue.toLocaleString()}
                    </div>
                    <div className="text-sm text-[#6F83A7]">Additional revenue per month</div>
                  </div>

                  <div className="bg-gradient-to-br from-[#57ACAF]/20 to-[#57ACAF]/10 border border-[#57ACAF]/30 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-[#57ACAF] font-medium">Net Monthly ROI</span>
                      <Badge className="bg-[#57ACAF]/20 text-[#57ACAF] border border-[#57ACAF]/40 text-base px-3 py-1">
                        {roi.roiMultiple}x ROI
                      </Badge>
                    </div>
                    <div className="text-5xl font-bold text-white mb-2">
                      ${roi.monthlyROI.toLocaleString()}
                    </div>
                    <div className="text-sm text-[#6F83A7]">After ${roi.planCost}/month plan cost</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Add-ons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Power-Up Add-ons</h2>
              <p className="text-xl text-[#6F83A7]">Enhance your capabilities with optional modules</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {addons.map((addon, idx) => {
                const Icon = addon.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:from-white/10 hover:to-white/5 hover:scale-105 transition-all duration-300"
                  >
                    <div 
                      className="w-14 h-14 rounded-xl mb-4 flex items-center justify-center group-hover:scale-110 transition-transform"
                      style={{ 
                        background: `linear-gradient(135deg, ${addon.color}30, ${addon.color}10)`,
                        boxShadow: `0 8px 24px ${addon.color}20`
                      }}
                    >
                      <Icon className="w-7 h-7" style={{ color: addon.color }} />
                    </div>

                    <h4 className="text-white font-medium text-lg mb-2">{addon.name}</h4>
                    <p className="text-sm text-[#6F83A7] mb-4">{addon.desc}</p>

                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-white">${addon.price}</div>
                      <span className="text-xs text-[#6F83A7]">per month</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
          >
            <h2 className="text-5xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-2xl text-[#6F83A7] mb-10 max-w-2xl mx-auto">
              14-day free trial • No credit card required • Cancel anytime
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                onClick={() => onNavigate('lead-management-onboarding')}
                className="bg-gradient-to-r from-[#EAB308] to-[#EAB308]/80 hover:from-[#EAB308]/90 hover:to-[#EAB308]/70 text-black px-10 py-7 text-lg rounded-2xl shadow-2xl shadow-[#EAB308]/40 transition-all duration-300 hover:scale-105"
              >
                Start Your Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                onClick={() => onNavigate('lead-management-intro')}
                variant="outline"
                className="border-2 border-white/20 bg-white/5 backdrop-blur-xl text-white hover:bg-white/10 px-10 py-7 text-lg rounded-2xl transition-all duration-300"
              >
                Back to Overview
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
