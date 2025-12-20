import { Check } from 'lucide-react';
import { cn } from './ui/utils';
import { Progress } from './ui/progress';

interface Step {
  id?: string;
  label: string;
  description?: string;
  status?: 'completed' | 'active' | 'current' | 'pending';
}

interface WorkflowStepperProps {
  steps: Step[];
  currentStep?: number;
}

export function WorkflowStepper({ steps, currentStep }: WorkflowStepperProps) {
  // Auto-detect current step from status if not provided
  const autoDetectedStep = currentStep !== undefined 
    ? currentStep 
    : steps.findIndex(step => step.status === 'active' || step.status === 'current');
  
  const actualCurrentStep = autoDetectedStep !== -1 ? autoDetectedStep : 0;
  const progress = ((actualCurrentStep + 1) / steps.length) * 100;

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-[#6F83A7]">Progress</span>
          <span className="text-sm text-white">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Steps */}
      <div className="relative">
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-white/10" style={{ width: 'calc(100% - 40px)', left: '20px' }} />
        
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            // Use status if provided, otherwise use currentStep logic
            const isCompleted = step.status 
              ? step.status === 'completed' 
              : index < actualCurrentStep;
            const isCurrent = step.status 
              ? step.status === 'active' || step.status === 'current'
              : index === actualCurrentStep;
            const isUpcoming = step.status 
              ? step.status === 'pending'
              : index > actualCurrentStep;

            return (
              <div key={step.id || `step-${index}`} className="flex flex-col items-center" style={{ flex: 1 }}>
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 relative z-10",
                    isCompleted && "bg-[#57ACAF] border-[#57ACAF]",
                    isCurrent && "bg-[#EAB308] border-[#EAB308] ring-4 ring-[#EAB308]/20",
                    isUpcoming && "bg-white/5 border-white/20"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <span className={cn(
                      "text-sm",
                      isCurrent && "text-[#0D1117]",
                      isUpcoming && "text-[#6F83A7]"
                    )}>
                      {index + 1}
                    </span>
                  )}
                </div>
                <div className="mt-3 text-center">
                  <div className={cn(
                    "text-sm mb-1",
                    (isCompleted || isCurrent) && "text-white",
                    isUpcoming && "text-[#6F83A7]"
                  )}>
                    {step.label}
                  </div>
                  {step.description && (
                    <div className="text-xs text-[#6F83A7]">{step.description}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
