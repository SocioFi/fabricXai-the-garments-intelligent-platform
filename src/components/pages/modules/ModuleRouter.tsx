import { ModuleIntro } from './ModuleIntro';
import { ModulePricing } from './ModulePricing';
import { ModuleOnboarding } from './ModuleOnboarding';
import { moduleConfigs } from './moduleConfigs';

interface ModuleRouterProps {
  moduleId: string;
  page: 'intro' | 'pricing' | 'onboarding';
  onNavigate: (page: string) => void;
  onAskMarbim: (prompt: string) => void;
}

export function ModuleRouter({
  moduleId,
  page,
  onNavigate,
  onAskMarbim,
}: ModuleRouterProps) {
  const config = moduleConfigs[moduleId as keyof typeof moduleConfigs];

  if (!config) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-[#101725] to-[#182336]">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-2">Module Not Found</h1>
          <p className="text-[#6F83A7]">The requested module doesn't exist.</p>
          <button
            onClick={() => onNavigate('modules')}
            className="mt-4 text-[#57ACAF] hover:underline"
          >
            Return to Modules
          </button>
        </div>
      </div>
    );
  }

  switch (page) {
    case 'intro':
      return (
        <ModuleIntro
          moduleId={moduleId}
          moduleName={config.name}
          moduleIcon={config.icon}
          description={config.description}
          ownerImpact={config.ownerImpact}
          employeeImpact={config.employeeImpact}
          keyFeatures={config.keyFeatures}
          aiCapabilities={config.aiCapabilities}
          onNavigate={onNavigate}
          onAskMarbim={onAskMarbim}
        />
      );
    case 'pricing':
      return (
        <ModulePricing
          moduleId={moduleId}
          moduleName={config.name}
          moduleIcon={config.icon}
          pricingTiers={config.pricingTiers}
          onNavigate={onNavigate}
          onAskMarbim={onAskMarbim}
        />
      );
    case 'onboarding':
      return (
        <ModuleOnboarding
          moduleId={moduleId}
          moduleName={config.name}
          moduleIcon={config.icon}
          steps={config.onboardingSteps}
          onNavigate={onNavigate}
          onAskMarbim={onAskMarbim}
        />
      );
    default:
      return null;
  }
}
