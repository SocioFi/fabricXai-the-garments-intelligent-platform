import { useState, createElement } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import {
  Check, ChevronLeft, ArrowRight, Sparkles, Upload,
  CheckCircle2, Circle, Loader2, Zap, Target, Database,
  Settings, Rocket, CheckCircle, PartyPopper
} from 'lucide-react';
import { Button } from '../../ui/button';
import { Progress } from '../../ui/progress';
import { toast } from 'sonner';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  instruction: string;
  aiHelp: string;
  expectedOutcome?: string;
  estimatedTime?: string;
}

interface ModuleOnboardingProps {
  moduleId: string;
  moduleName: string;
  moduleIcon: any;
  steps: OnboardingStep[];
  onNavigate: (page: string) => void;
  onAskMarbim: (prompt: string) => void;
}

export function ModuleOnboarding({
  moduleId,
  moduleName,
  moduleIcon: Icon,
  steps,
  onNavigate,
  onAskMarbim,
}: ModuleOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -30]);
  const y2 = useTransform(scrollY, [0, 300], [0, 30]);

  const progress = (completedSteps.length / steps.length) * 100;

  const stepIcons = [Database, Settings, Target, Rocket];

  const handleStepComplete = async () => {
    setIsProcessing(true);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setCompletedSteps([...completedSteps, currentStep]);
    setIsProcessing(false);
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      toast.success(`Step ${currentStep + 1} completed!`);
    } else {
      toast.success(`🎉 ${moduleName} is now live!`, {
        description: 'Your module is ready to use. Let\'s explore!',
      });
    }
  };

  const handleFinish = () => {
    onNavigate(moduleId);
  };

  const isStepCompleted = (stepIndex: number) => completedSteps.includes(stepIndex);
  const allStepsCompleted = completedSteps.length === steps.length;
  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F1C] via-[#101725] to-[#0A0F1C] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-20 right-20 w-[500px] h-[500px] bg-[#57ACAF]/10 rounded-full blur-[100px]" 
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-20 left-20 w-[400px] h-[400px] bg-[#EAB308]/10 rounded-full blur-[100px]" 
        />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
      </div>

      {/* Header with Progress */}
      <div className="relative border-b border-white/10 bg-[#0D1117]/80 backdrop-blur-xl">
        <div className="px-8 py-6 max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <Button
              onClick={() => onNavigate(`modules/${moduleId}/pricing`)}
              variant="ghost"
              className="text-[#6F83A7] hover:text-white hover:bg-white/10"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Pricing
            </Button>
            
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-sm text-[#6F83A7] mb-1">Setup Progress</p>
                <p className="text-xl font-medium text-white">{Math.round(progress)}% Complete</p>
              </div>
              <div className="w-48">
                <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-[#57ACAF] to-[#EAB308] rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative px-8 py-16 overflow-auto">
        <div className="max-w-6xl mx-auto">
          {/* Module Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#57ACAF] to-[#57ACAF]/60 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-[#57ACAF]/30">
              <Icon className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Setting Up <span className="bg-gradient-to-r from-[#57ACAF] to-[#EAB308] bg-clip-text text-transparent">{moduleName}</span>
            </h1>
            <p className="text-xl text-[#6F83A7]">
              MARBIM AI will guide you through each step. This will only take a few minutes.
            </p>
          </motion.div>

          {/* Enhanced Steps Timeline */}
          <div className="mb-16">
            <div className="flex items-start justify-between relative">
              {/* Connection Line */}
              <div className="absolute top-12 left-0 right-0 h-1 bg-white/5" style={{ width: '100%', marginLeft: '6%', marginRight: '6%' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-[#57ACAF] to-[#EAB308]"
                />
              </div>

              {steps.map((step, index) => {
                const StepIcon = stepIcons[index] || Database;
                const isCompleted = isStepCompleted(index);
                const isCurrent = currentStep === index;
                
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col items-center flex-1 relative z-10"
                  >
                    {/* Step Circle */}
                    <motion.div
                      animate={{
                        scale: isCurrent ? 1.1 : 1,
                        boxShadow: isCurrent 
                          ? '0 0 40px rgba(234, 179, 8, 0.4)' 
                          : isCompleted
                          ? '0 0 20px rgba(87, 172, 175, 0.3)'
                          : '0 0 0px transparent'
                      }}
                      transition={{ duration: 0.3 }}
                      className={`w-24 h-24 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        isCompleted
                          ? 'bg-gradient-to-br from-[#57ACAF] to-[#57ACAF]/70'
                          : isCurrent
                          ? 'bg-gradient-to-br from-[#EAB308] to-[#EAB308]/70'
                          : 'bg-white/5 border-2 border-white/10'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-10 h-10 text-white" />
                      ) : (
                        <StepIcon className={`w-10 h-10 ${isCurrent ? 'text-black' : 'text-white/40'}`} />
                      )}
                    </motion.div>

                    {/* Step Label */}
                    <div className="mt-4 text-center">
                      <p className={`text-sm font-medium mb-1 ${
                        isCurrent ? 'text-[#EAB308]' : isCompleted ? 'text-[#57ACAF]' : 'text-[#6F83A7]'
                      }`}>
                        Step {index + 1}
                      </p>
                      <p className={`text-xs ${isCurrent || isCompleted ? 'text-white' : 'text-[#6F83A7]'}`}>
                        {step.title}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Current Step Content */}
          {!allStepsCompleted ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                <div className="relative group mb-12">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#EAB308]/20 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-12">
                    {/* Step Header */}
                    <div className="flex items-start gap-6 mb-8">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#EAB308] to-[#EAB308]/70 flex items-center justify-center shadow-lg shadow-[#EAB308]/20 flex-shrink-0">
                        {stepIcons[currentStep] && createElement(stepIcons[currentStep], { className: "w-8 h-8 text-black" })}
                      </div>
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold text-white mb-3">{currentStepData.title}</h2>
                        <p className="text-lg text-[#6F83A7] leading-relaxed">{currentStepData.description}</p>
                      </div>
                    </div>

                    {/* Instructions */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-6">
                      <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5 text-[#57ACAF]" />
                        What to do
                      </h3>
                      <p className="text-white/80 leading-relaxed text-lg">{currentStepData.instruction}</p>
                      
                      {/* Enhanced Info: Expected Outcome & Time */}
                      {(currentStepData.expectedOutcome || currentStepData.estimatedTime) && (
                        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/10">
                          {currentStepData.expectedOutcome && (
                            <div>
                              <p className="text-xs text-[#57ACAF] font-medium mb-1 flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" />
                                Expected Outcome
                              </p>
                              <p className="text-sm text-white/70">{currentStepData.expectedOutcome}</p>
                            </div>
                          )}
                          {currentStepData.estimatedTime && (
                            <div>
                              <p className="text-xs text-[#EAB308] font-medium mb-1 flex items-center gap-1">
                                <Target className="w-3 h-3" />
                                Estimated Time
                              </p>
                              <p className="text-sm text-white/70">{currentStepData.estimatedTime}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* AI Help Card */}
                    <div className="bg-gradient-to-br from-[#EAB308]/10 to-[#EAB308]/5 border border-[#EAB308]/20 rounded-2xl p-6 mb-8">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#EAB308]/20 flex items-center justify-center flex-shrink-0">
                          <Sparkles className="w-6 h-6 text-[#EAB308]" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-medium mb-2">MARBIM AI Tip</h4>
                          <p className="text-white/80">{currentStepData.aiHelp}</p>
                        </div>
                        <Button
                          onClick={() => onAskMarbim(`Help me with: ${currentStepData.title}. ${currentStepData.aiHelp}`)}
                          variant="outline"
                          className="border-[#EAB308]/30 text-[#EAB308] hover:bg-[#EAB308]/10"
                        >
                          Ask MARBIM
                        </Button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between">
                      <Button
                        onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
                        disabled={currentStep === 0}
                        variant="ghost"
                        className="text-[#6F83A7] hover:text-white hover:bg-white/5 disabled:opacity-50"
                      >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Previous Step
                      </Button>

                      <Button
                        onClick={handleStepComplete}
                        disabled={isProcessing}
                        className="bg-gradient-to-r from-[#EAB308] to-[#EAB308]/80 hover:from-[#EAB308]/90 hover:to-[#EAB308]/70 text-black px-8 py-6 text-lg rounded-2xl shadow-lg shadow-[#EAB308]/30 transition-all duration-300 hover:scale-105"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : currentStep === steps.length - 1 ? (
                          <>
                            Complete Setup
                            <CheckCircle className="w-5 h-5 ml-2" />
                          </>
                        ) : (
                          <>
                            Continue
                            <ArrowRight className="w-5 h-5 ml-2" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            /* Completion Screen */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-32 h-32 rounded-full bg-gradient-to-br from-[#57ACAF] to-[#57ACAF]/70 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-[#57ACAF]/40"
              >
                <PartyPopper className="w-16 h-16 text-white" />
              </motion.div>

              <h2 className="text-6xl font-bold text-white mb-4">
                All Set! 🎉
              </h2>
              <p className="text-2xl text-[#6F83A7] mb-12 max-w-2xl mx-auto">
                {moduleName} is now live and ready to use. Let's start transforming your operations!
              </p>

              <div className="flex items-center justify-center gap-6">
                <Button
                  onClick={() => onAskMarbim(`Show me how to get the most out of ${moduleName}`)}
                  variant="outline"
                  className="border-2 border-white/20 bg-white/5 backdrop-blur-xl text-white hover:bg-white/10 px-8 py-7 text-lg rounded-2xl"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Get Tips from MARBIM
                </Button>
                <Button
                  onClick={handleFinish}
                  className="bg-gradient-to-r from-[#57ACAF] to-[#57ACAF]/80 hover:from-[#57ACAF]/90 hover:to-[#57ACAF]/70 text-white px-10 py-7 text-lg rounded-2xl shadow-2xl shadow-[#57ACAF]/40 transition-all duration-300 hover:scale-105"
                >
                  Go to {moduleName}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}