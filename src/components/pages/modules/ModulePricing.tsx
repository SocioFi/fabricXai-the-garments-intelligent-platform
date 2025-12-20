import { useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  Check, ChevronLeft, ArrowRight, Sparkles, Zap, Star, Crown, Rocket
} from 'lucide-react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';

interface PricingTier {
  name: string;
  description: string;
  features: string[];
  recommended?: boolean;
}

interface ModulePricingProps {
  moduleId: string;
  moduleName: string;
  moduleIcon: any;
  pricingTiers: PricingTier[];
  onNavigate: (page: string) => void;
  onAskMarbim: (prompt: string) => void;
}

export function ModulePricing({
  moduleId,
  moduleName,
  moduleIcon: Icon,
  pricingTiers,
  onNavigate,
  onAskMarbim,
}: ModulePricingProps) {
  const [selectedPlan, setSelectedPlan] = useState('growth');
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, 50]);

  const tierIcons = {
    'Basic': Rocket,
    'Growth': Star,
    'Enterprise': Crown
  };

  const tierColors = {
    'Basic': '#6F83A7',
    'Growth': '#EAB308',
    'Enterprise': '#57ACAF'
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

      {/* Back Button - Floating */}
      <div className="relative">
        <div className="absolute top-8 left-8 z-10">
          <Button
            onClick={() => onNavigate(`modules/${moduleId}/intro`)}
            variant="ghost"
            className="text-[#6F83A7] hover:text-white hover:bg-white/10 backdrop-blur-xl border border-white/10"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Overview
          </Button>
        </div>
      </div>

      <div className="relative px-8 py-20">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 max-w-4xl mx-auto"
        >
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#57ACAF] to-[#57ACAF]/60 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-[#57ACAF]/30">
            <Icon className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
            Choose Your <span className="bg-gradient-to-r from-[#57ACAF] to-[#EAB308] bg-clip-text text-transparent">{moduleName}</span> Plan
          </h1>
          
          <p className="text-2xl text-[#6F83A7] mb-8">
            Start with a 14-day free trial. Upgrade, downgrade, or cancel anytime.
          </p>

          <div className="flex items-center justify-center gap-6 text-sm text-[#6F83A7]">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-[#57ACAF]" />
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-[#57ACAF]" />
              Cancel anytime
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-[#57ACAF]" />
              24/7 Support
            </div>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="max-w-7xl mx-auto mb-20">
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => {
              const TierIcon = tierIcons[tier.name as keyof typeof tierIcons] || Star;
              const tierColor = tierColors[tier.name as keyof typeof tierColors] || '#57ACAF';
              const isRecommended = tier.recommended;
              const isSelected = selectedPlan === tier.name.toLowerCase();
              
              return (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Recommended Badge */}
                  {isRecommended && (
                    <div className="absolute -top-5 left-0 right-0 flex justify-center z-10">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                      >
                        <Badge className="bg-gradient-to-r from-[#EAB308] to-[#EAB308]/80 text-black border-0 shadow-lg shadow-[#EAB308]/40 px-6 py-2 text-sm">
                          <Sparkles className="w-4 h-4 mr-1" />
                          Most Popular
                        </Badge>
                      </motion.div>
                    </div>
                  )}

                  {/* Glow Effect for Recommended */}
                  {isRecommended && (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#EAB308]/20 to-transparent rounded-3xl blur-2xl" />
                  )}

                  {/* Card */}
                  <div
                    onClick={() => setSelectedPlan(tier.name.toLowerCase())}
                    className={`relative h-full cursor-pointer transition-all duration-500 ${
                      isRecommended ? 'scale-105' : 'hover:scale-105'
                    }`}
                  >
                    <div
                      className={`h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-2 rounded-3xl p-8 transition-all duration-300 ${
                        isSelected
                          ? 'border-[#EAB308] shadow-2xl shadow-[#EAB308]/20'
                          : isRecommended
                          ? 'border-[#EAB308]/40 shadow-xl'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      {/* Plan Header */}
                      <div className="text-center mb-8">
                        <div 
                          className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg"
                          style={{ 
                            background: `linear-gradient(135deg, ${tierColor}, ${tierColor}99)`,
                            boxShadow: `0 10px 30px ${tierColor}30`
                          }}
                        >
                          <TierIcon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-2">{tier.name}</h3>
                        <p className="text-[#6F83A7]">{tier.description}</p>
                      </div>

                      {/* Features List */}
                      <div className="space-y-4 mb-8">
                        {tier.features.map((feature, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 + idx * 0.05 }}
                            className="flex items-start gap-3"
                          >
                            <div 
                              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{ backgroundColor: `${tierColor}20` }}
                            >
                              <Check className="w-4 h-4" style={{ color: tierColor }} />
                            </div>
                            <span className="text-white/90 leading-relaxed">{feature}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Select Button */}
                      <Button
                        onClick={() => setSelectedPlan(tier.name.toLowerCase())}
                        className={`w-full py-6 text-lg rounded-2xl transition-all duration-300 ${
                          isSelected
                            ? 'bg-gradient-to-r from-[#EAB308] to-[#EAB308]/80 hover:from-[#EAB308]/90 hover:to-[#EAB308]/70 text-black shadow-lg shadow-[#EAB308]/40 scale-105'
                            : isRecommended
                            ? 'bg-gradient-to-r from-[#EAB308]/20 to-[#EAB308]/10 hover:from-[#EAB308]/30 hover:to-[#EAB308]/20 text-[#EAB308] border-2 border-[#EAB308]/40'
                            : 'bg-white/5 hover:bg-white/10 text-white border-2 border-white/10 hover:border-white/20'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-5 h-5 mr-2" />
                            Selected
                          </>
                        ) : (
                          <>
                            Select {tier.name}
                            <ArrowRight className="w-5 h-5 ml-2" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Enterprise Add-ons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto mb-20"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#57ACAF]/20 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-10">
              <div className="flex items-start gap-6 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#57ACAF] to-[#57ACAF]/60 flex items-center justify-center shadow-lg shadow-[#57ACAF]/20 flex-shrink-0">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">Enterprise Add-ons</h3>
                  <p className="text-lg text-[#6F83A7]">
                    Unlock advanced capabilities designed for large-scale manufacturing operations
                  </p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                {['Advanced API Access', 'Custom Integrations', 'Dedicated Support', 'Priority Updates', 'SLA Guarantee', 'Training Sessions'].map((addon, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-[#57ACAF]/30 transition-all duration-300 group/item"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#57ACAF]/10 flex items-center justify-center group-hover/item:bg-[#57ACAF]/20 transition-all duration-300">
                        <Zap className="w-4 h-4 text-[#57ACAF]" />
                      </div>
                      <span className="text-white/90">{addon}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Frequently Asked <span className="bg-gradient-to-r from-[#57ACAF] to-[#EAB308] bg-clip-text text-transparent">Questions</span>
          </h2>
          
          <div className="space-y-4">
            {[
              { q: 'Can I change plans later?', a: 'Yes! Upgrade or downgrade anytime. Changes take effect immediately.' },
              { q: 'What happens after the trial?', a: 'Your trial converts to the selected plan. Cancel before trial ends to avoid charges.' },
              { q: 'Do you offer discounts for annual plans?', a: 'Yes! Save 20% with annual billing. Contact us for volume discounts.' }
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300"
              >
                <h4 className="text-lg font-medium text-white mb-2">{faq.q}</h4>
                <p className="text-[#6F83A7]">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Get <span className="bg-gradient-to-r from-[#57ACAF] to-[#EAB308] bg-clip-text text-transparent">Started</span>?
          </h2>
          <p className="text-xl text-[#6F83A7] mb-10">
            Begin your setup with the <span className="text-white font-medium">{selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)}</span> plan
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <Button
              onClick={() => onAskMarbim(`Which ${moduleName} plan should I choose for my factory?`)}
              variant="outline"
              className="border-2 border-white/20 bg-white/5 backdrop-blur-xl text-white hover:bg-white/10 px-8 py-7 text-lg rounded-2xl"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Ask MARBIM for Advice
            </Button>
            <Button
              onClick={() => onNavigate(`modules/${moduleId}/onboarding`)}
              className="bg-gradient-to-r from-[#EAB308] to-[#EAB308]/80 hover:from-[#EAB308]/90 hover:to-[#EAB308]/70 text-black px-10 py-7 text-lg rounded-2xl shadow-2xl shadow-[#EAB308]/40 transition-all duration-300 hover:scale-105"
            >
              Start Setup Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
