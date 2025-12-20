import { Button } from './ui/button';
import { Sparkles, Rocket, TrendingUp } from 'lucide-react';

interface ModuleSetupBannerProps {
  moduleName: string;
  onSetupClick: () => void;
}

export function ModuleSetupBanner({ moduleName, onSetupClick }: ModuleSetupBannerProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#EAB308]/10 via-[#57ACAF]/10 to-[#EAB308]/5 border border-[#EAB308]/20 rounded-2xl p-6 mb-6">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-40 h-40 bg-[#EAB308]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#57ACAF]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative flex items-center justify-between gap-6">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#EAB308] to-[#EAB308]/80 shadow-lg shadow-[#EAB308]/30 flex items-center justify-center flex-shrink-0">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-medium text-lg mb-1 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#EAB308]" />
              Set Up {moduleName} Module
            </h3>
            <p className="text-[#6F83A7] text-sm leading-relaxed">
              Learn how {moduleName} can transform your operations with AI-powered automation. Discover features, pricing, and get started in minutes.
            </p>
          </div>
        </div>

        <Button
          onClick={onSetupClick}
          className="bg-gradient-to-r from-[#EAB308] to-[#EAB308]/80 text-black hover:from-[#EAB308]/90 hover:to-[#EAB308]/70 shadow-lg shadow-[#EAB308]/20 px-6 py-5 rounded-xl flex-shrink-0 transition-all hover:scale-105"
        >
          <TrendingUp className="w-5 h-5 mr-2" />
          Start Setup
        </Button>
      </div>
    </div>
  );
}
