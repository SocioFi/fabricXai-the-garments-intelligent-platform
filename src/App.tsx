import { useState } from 'react';
import { AIAssistantPanel } from './components/AIAssistantPanel';
import { Toaster } from './components/ui/sonner';
import { DatabaseSeedingPanel } from './components/DatabaseSeedingPanel';
import { initializeDemoSession } from './utils/supabase/rbac';

// Layout Components
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';

// Auth Components
import { Login } from './components/pages/Login';
import { Signup } from './components/pages/Signup';

// Page Components
import { Dashboard } from './components/pages/Dashboard';
import { Approve } from './components/pages/Approve';
import { Contacts } from './components/pages/Contacts';
import { ModuleSetup } from './components/pages/ModuleSetup';
import { ModuleRouter } from './components/pages/modules/ModuleRouter';
import { DetailPage } from './components/pages/DetailPage';

// Module Intro/Setup Pages
import { LeadManagementIntro } from './components/pages/LeadManagementIntro';
import { LeadManagementPricing } from './components/pages/LeadManagementPricing';
import { LeadManagementOnboarding } from './components/pages/LeadManagementOnboarding';
import { ProductionPlanningSetup } from './components/pages/modules/ProductionPlanningSetup';

// Module Components
import { LeadManagement } from './components/pages/LeadManagement';
import { BuyerManagement } from './components/pages/BuyerManagement';
import { SupplierEvaluation } from './components/pages/SupplierEvaluation';
import { RFQQuotation } from './components/pages/RFQQuotation';
import { Costing } from './components/pages/Costing';
import { ProductionPlanning } from './components/pages/ProductionPlanning';
import { WorkforceManagement } from './components/pages/WorkforceManagement';
import { MachineMaintenance } from './components/pages/MachineMaintenance';
import { InventoryManagement } from './components/pages/InventoryManagement';
import { QualityControl } from './components/pages/QualityControl';
import { Shipment } from './components/pages/Shipment';
import { Finance } from './components/pages/Finance';
import { CompliancePolicy } from './components/pages/CompliancePolicy';
import { Sustainability } from './components/pages/Sustainability';
import { Analytics } from './components/pages/Analytics';
import { CompanyProfile } from './components/pages/CompanyProfile';
import { Settings } from './components/pages/Settings';
import { PrivacyPolicy } from './components/pages/PrivacyPolicy';
import { TermsOfService } from './components/pages/TermsOfService';

// User session interface
interface UserSession {
  email: string;
  name: string;
  company: string;
  role: string;
}

// Initialize database session on app load - but only if user is logged in
// This will be set after login
if (typeof window !== 'undefined') {
  const storedUser = localStorage.getItem('fabricxai_user');
  if (storedUser) {
    const user = JSON.parse(storedUser);
    initializeDemoSession(user.role); // Initialize with user's role
  }
}

export default function App() {
  // Authentication state
  const [user, setUser] = useState<UserSession | null>(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('fabricxai_user');
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });
  const [authPage, setAuthPage] = useState<'login' | 'signup'>('login');

  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [aiPanelPrompt, setAIPanelPrompt] = useState<string | undefined>(undefined);

  // Handle login
  const handleLogin = (email: string, role: string, name: string, company: string) => {
    const userSession: UserSession = { email, name, company, role };
    setUser(userSession);
    localStorage.setItem('fabricxai_user', JSON.stringify(userSession));
    initializeDemoSession(role); // Initialize database session
  };

  // Handle signup
  const handleSignup = (email: string, role: string, name: string, company: string) => {
    const userSession: UserSession = { email, name, company, role };
    setUser(userSession);
    localStorage.setItem('fabricxai_user', JSON.stringify(userSession));
    initializeDemoSession(role); // Initialize database session
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('fabricxai_user');
    setCurrentPage('dashboard');
  };

  // If not logged in, show login/signup page
  if (!user) {
    if (authPage === 'login') {
      return <Login onLogin={handleLogin} onNavigateToSignup={() => setAuthPage('signup')} />;
    } else {
      return <Signup onSignup={handleSignup} onNavigateToLogin={() => setAuthPage('login')} />;
    }
  }

  // Extract sub-page from route if it exists
  const getSubPage = (page: string) => {
    if (page.includes('/')) {
      return page.split('/')[1];
    }
    return 'dashboard';
  };

  // Function to open AI panel with a specific prompt
  const handleAskMarbim = (prompt: string) => {
    setAIPanelPrompt(prompt);
    setIsAIPanelOpen(true);
  };

  // Extract base module name from current page
  const getCurrentModule = () => {
    if (currentPage.includes('/')) {
      return currentPage.split('/')[0];
    }
    return currentPage;
  };

  const renderPage = () => {
    // Check for module setup routes (modules/[moduleId]/[page])
    if (currentPage.startsWith('modules/')) {
      const parts = currentPage.split('/');
      if (parts.length === 1) {
        // Just "modules" - show module setup center
        return <ModuleSetup onNavigate={setCurrentPage} onAskMarbim={handleAskMarbim} />;
      } else if (parts.length === 3) {
        // "modules/[moduleId]/[page]" format
        const moduleId = parts[1];
        const page = parts[2] as 'intro' | 'pricing' | 'onboarding';
        return (
          <ModuleRouter
            moduleId={moduleId}
            page={page}
            onNavigate={setCurrentPage}
            onAskMarbim={handleAskMarbim}
          />
        );
      }
    }

    // Check if it's a detail page route (e.g., 'lead-management/dashboard/detail/123')
    if (currentPage.includes('/detail/')) {
      const parts = currentPage.split('/');
      const module = parts[0];
      const subPage = parts[1];
      const entryId = parts[3];
      
      return (
        <DetailPage
          module={module}
          subPage={subPage}
          entryId={entryId}
          onBack={() => setCurrentPage(`${module}/${subPage}`)}
          onAskMarbim={handleAskMarbim}
        />
      );
    }

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'modules':
        return <ModuleSetup onNavigate={setCurrentPage} onAskMarbim={handleAskMarbim} />;
      case 'approve':
        return <Approve />;
      case 'contacts':
        return <Contacts />;
      case 'lead-management-intro':
        return <LeadManagementIntro onNavigate={setCurrentPage} onAskMarbim={handleAskMarbim} />;
      case 'lead-management-pricing':
        return <LeadManagementPricing onNavigate={setCurrentPage} onAskMarbim={handleAskMarbim} />;
      case 'lead-management-onboarding':
        return <LeadManagementOnboarding onNavigate={setCurrentPage} onAskMarbim={handleAskMarbim} />;
      case 'lead-management':
      case 'lead-management/dashboard':
      case 'lead-management/campaigns':
      case 'lead-management/lead-inbox':
      case 'lead-management/directory':
      case 'lead-management/analytics':
        return <LeadManagement initialSubPage={getSubPage(currentPage)} onAskMarbim={handleAskMarbim} onNavigateToPage={setCurrentPage} isAIPanelOpen={isAIPanelOpen} />;
      case 'buyer-management':
      case 'buyer-management/dashboard':
      case 'buyer-management/buyer-directory':
      case 'buyer-management/feedback-issues':
        return <BuyerManagement initialSubPage={getSubPage(currentPage)} onAskMarbim={handleAskMarbim} onNavigateToPage={setCurrentPage} isAIPanelOpen={isAIPanelOpen} />;
      case 'supplier-evaluation':
      case 'supplier-evaluation/dashboard':
      case 'supplier-evaluation/supplier-directory':
      case 'supplier-evaluation/rfq-board':
      case 'supplier-evaluation/samples':
        return <SupplierEvaluation initialSubPage={getSubPage(currentPage)} onAskMarbim={handleAskMarbim} onOpenAI={() => setIsAIPanelOpen(true)} onNavigateToPage={setCurrentPage} isAIPanelOpen={isAIPanelOpen} />;
      case 'rfq-quotation':
      case 'rfq-quotation/dashboard':
      case 'rfq-quotation/rfq-inbox':
      case 'rfq-quotation/quotation-builder':
      case 'rfq-quotation/clarification-tracker':
        return <RFQQuotation initialSubPage={getSubPage(currentPage)} onAskMarbim={handleAskMarbim} onOpenAI={() => setIsAIPanelOpen(true)} isAIPanelOpen={isAIPanelOpen} />;
      case 'costing':
      case 'costing/dashboard':
      case 'costing/cost-sheet-list':
      case 'costing/scenarios':
      case 'costing/benchmarks':
        return <Costing initialSubPage={getSubPage(currentPage)} onAskMarbim={handleAskMarbim} isAIPanelOpen={isAIPanelOpen} />;
      case 'production-planning/setup':
        return <ProductionPlanningSetup onNavigate={setCurrentPage} onAskMarbim={handleAskMarbim} />;
      case 'production-planning':
      case 'production-planning/dashboard':
      case 'production-planning/master-plan':
      case 'production-planning/line-allocation':
      case 'production-planning/ta-calendar':
      case 'production-planning/materials-shortages':
      case 'production-planning/risk-ai':
        return <ProductionPlanning initialSubPage={getSubPage(currentPage)} onAskMarbim={handleAskMarbim} isAIPanelOpen={isAIPanelOpen} />;
      case 'workforce-management':
      case 'workforce-management/dashboard':
      case 'workforce-management/roster-profiles':
      case 'workforce-management/attendance-leave':
      case 'workforce-management/skill-matrix':
      case 'workforce-management/training-assessments':
      case 'workforce-management/welfare-safety':
        return <WorkforceManagement initialSubPage={getSubPage(currentPage)} onAskMarbim={handleAskMarbim} isAIPanelOpen={isAIPanelOpen} />;
      case 'machine-maintenance':
      case 'machine-maintenance/dashboard':
      case 'machine-maintenance/machine-directory':
      case 'machine-maintenance/maintenance-planner':
      case 'machine-maintenance/breakdowns':
      case 'machine-maintenance/spare-parts':
      case 'machine-maintenance/ai-predictive':
        return <MachineMaintenance initialSubPage={getSubPage(currentPage)} onAskMarbim={handleAskMarbim} isAIPanelOpen={isAIPanelOpen} />;
      case 'inventory-management':
      case 'inventory-management/dashboard':
      case 'inventory-management/material-master':
      case 'inventory-management/stock-ledger':
      case 'inventory-management/warehouse':
      case 'inventory-management/material-requests':
      case 'inventory-management/finished-goods':
      case 'inventory-management/reorder-forecasting':
        return <InventoryManagement initialSubPage={getSubPage(currentPage)} onAskMarbim={handleAskMarbim} isAIPanelOpen={isAIPanelOpen} />;
      case 'quality-control':
      case 'quality-control/dashboard':
      case 'quality-control/inline-qc':
      case 'quality-control/final-qc':
      case 'quality-control/lab-tests':
      case 'quality-control/capa':
      case 'quality-control/standards':
        return <QualityControl initialSubPage={getSubPage(currentPage)} onAskMarbim={handleAskMarbim} isAIPanelOpen={isAIPanelOpen} />;
      case 'shipment':
      case 'shipment/dashboard':
      case 'shipment/booking-manager':
      case 'shipment/live-tracking':
      case 'shipment/document-vault':
      case 'shipment/buyer-updates':
      case 'shipment/exceptions':
        return <Shipment initialSubPage={getSubPage(currentPage)} onAskMarbim={handleAskMarbim} isAIPanelOpen={isAIPanelOpen} />;
      case 'finance':
      case 'finance/dashboard':
      case 'finance/accounts-receivable':
      case 'finance/accounts-payable':
      case 'finance/order-pl':
      case 'finance/cash-flow':
      case 'finance/banking-lc':
        return <Finance initialSubPage={getSubPage(currentPage)} onAskMarbim={handleAskMarbim} isAIPanelOpen={isAIPanelOpen} />;
      case 'compliance-policy':
      case 'compliance-policy/dashboard':
      case 'compliance-policy/policy-library':
      case 'compliance-policy/audits':
      case 'compliance-policy/regulatory-monitor':
        return <CompliancePolicy initialSubPage={getSubPage(currentPage)} onAskMarbim={handleAskMarbim} isAIPanelOpen={isAIPanelOpen} />;
      case 'sustainability':
      case 'sustainability/dashboard':
      case 'sustainability/environmental':
      case 'sustainability/social':
      case 'sustainability/governance':
      case 'sustainability/waste-materials':
      case 'sustainability/footprint-dpp':
        return <Sustainability initialSubPage={getSubPage(currentPage)} onAskMarbim={handleAskMarbim} isAIPanelOpen={isAIPanelOpen} />;
      case 'analytics':
      case 'analytics/role-dashboards':
      case 'analytics/explainers':
      case 'analytics/reports-library':
      case 'analytics/scheduled-reports':
        return <Analytics initialSubPage={getSubPage(currentPage)} onAskMarbim={handleAskMarbim} isAIPanelOpen={isAIPanelOpen} />;
      case 'company-profile':
      case 'company-profile/overview':
      case 'company-profile/catalog':
      case 'company-profile/website-builder':
      case 'company-profile/ai-insights':
        return <CompanyProfile initialSubPage={getSubPage(currentPage)} onAskMarbim={handleAskMarbim} isAIPanelOpen={isAIPanelOpen} />;
      case 'settings':
        return <Settings />;
      case 'privacy-policy':
        return <PrivacyPolicy onNavigate={setCurrentPage} />;
      case 'terms-of-service':
        return <TermsOfService />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#101725] to-[#182336] overflow-hidden">
      <Sidebar 
        currentPage={currentPage} 
        onNavigate={setCurrentPage}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      
      <div 
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
          isAIPanelOpen ? 'compact-layout' : ''
        }`}
        style={{
          marginRight: isAIPanelOpen ? '680px' : '0'
        }}
      >
        <TopBar 
          onOpenAIPanel={() => setIsAIPanelOpen(true)} 
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          user={user}
          onLogout={handleLogout}
        />
        
        <main className="flex-1 overflow-auto custom-scrollbar">
          {renderPage()}
        </main>

        <footer className="border-t border-white/5 bg-[#0D1117]/50 backdrop-blur-sm px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
            <div className="flex items-center gap-4">
              <span>© 2025 FabricXAI. All rights reserved.</span>
              <span className="hidden sm:inline text-gray-600">|</span>
              <span className="hidden sm:inline">Garments Intelligent Platform</span>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setCurrentPage('privacy-policy')}
                className="hover:text-[#57ACAF] transition-colors duration-180"
              >
                Privacy Policy
              </button>
              <span className="text-gray-600">|</span>
              <button 
                onClick={() => setCurrentPage('terms-of-service')}
                className="hover:text-[#57ACAF] transition-colors duration-180"
              >
                Terms of Service
              </button>
              <span className="text-gray-600">|</span>
              <button className="hover:text-[#57ACAF] transition-colors duration-180">
                Contact Support
              </button>
            </div>
          </div>
        </footer>
      </div>

      <AIAssistantPanel 
        isOpen={isAIPanelOpen} 
        onClose={() => {
          setIsAIPanelOpen(false);
          setAIPanelPrompt(undefined);
        }}
        initialPrompt={aiPanelPrompt}
        currentModule={getCurrentModule()}
      />

      {/* Database Seeding Panel - only show when logged in */}
      <DatabaseSeedingPanel />

      <Toaster position="bottom-right" />
    </div>
  );
}