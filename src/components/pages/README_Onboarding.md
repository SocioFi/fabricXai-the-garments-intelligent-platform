# Module Onboarding Flow - Lead Management

## Overview
A comprehensive 3-page onboarding flow has been implemented for the Lead Management module. This serves as a **template pattern** for all other FabricXAI modules.

## File Locations

All onboarding pages are located in `/components/pages/`:

1. **`LeadManagementIntro.tsx`** - Introductory Page (Page 1)
2. **`LeadManagementPricing.tsx`** - Pricing & Add-ons (Page 2)
3. **`LeadManagementOnboarding.tsx`** - Guided Setup Workflow (Page 3)

## Navigation Routes

The pages are accessible via these routes in `App.tsx`:

- **Intro Page:** `lead-management-intro`
- **Pricing Page:** `lead-management-pricing`
- **Onboarding Page:** `lead-management-onboarding`
- **Module Dashboard:** `lead-management` (redirects here after onboarding complete)

## How to Access

### Option 1: Sidebar Navigation (Recommended)
1. Click **Lead Management** in the sidebar
2. Click **🚀 Module Setup** (first option in submenu)
3. This opens the intro page

### Option 2: Direct Navigation
In the browser console or via code:
```javascript
// Navigate to intro
setCurrentPage('lead-management-intro');

// Navigate to pricing
setCurrentPage('lead-management-pricing');

// Navigate to onboarding
setCurrentPage('lead-management-onboarding');
```

### Option 3: URL Parameter (Future Enhancement)
Add URL routing to support:
```
/#/lead-management-intro
/#/lead-management-pricing
/#/lead-management-onboarding
```

## User Flow

```
1️⃣ Intro Page
   ↓ (View Pricing & Activate button)
2️⃣ Pricing Page
   ↓ (Start Onboarding button)
3️⃣ Onboarding Page
   ↓ (Complete Setup button)
4️⃣ Module Dashboard
```

## Page Details

### 1. LeadManagementIntro.tsx
**Purpose:** Educate users about the module's value proposition

**Sections:**
- Hero section with module description and CTAs
- KPI impact stats (Before vs After AI) - 4 metrics
- Owner benefits (ROI, revenue, productivity)
- Employee benefits (workflow simplification)
- MARBIM AI role explanation
- 4-step workflow animation
- Final CTA section

**AI Touchpoints:** 6+ MARBIM buttons for contextual help

### 2. LeadManagementPricing.tsx
**Purpose:** Present pricing options and calculate ROI

**Sections:**
- 3-tier pricing cards (Basic, Growth, Enterprise)
- Monthly/Annual billing toggle with savings
- Feature comparison checklist
- 4 power-up add-ons (WhatsApp, IoT, Predictive AI, Portal)
- **Interactive ROI Calculator** with sliders:
  - Factory size (100-2000 workers)
  - Leads per month (50-1000 leads)
  - Real-time ROI calculation showing:
    - Current vs AI RFQs
    - Additional revenue per month
    - Net monthly ROI
    - ROI multiple

**AI Touchpoints:** 3+ MARBIM buttons for pricing guidance

### 3. LeadManagementOnboarding.tsx
**Purpose:** Guided 4-step setup process

**Steps:**
1. **Upload Lead List** - CSV/Excel/CRM/Manual import
2. **Connect Email** - Gmail/Outlook/SMTP integration
3. **Define Scoring Rules** - AI lead prioritization configuration
4. **Activate AI Follow-up** - Automation level and cadence

**Features:**
- Progress tracking (visual progress bar)
- Step-by-step forms with validation
- Right sidebar with MARBIM tips for each step
- Setup checklist
- Navigation between steps
- Loading states
- Success animation → redirects to `lead-management` dashboard

**AI Touchpoints:** 8+ MARBIM buttons for setup assistance

## Design System Compliance

All pages follow the **FabricXAI Design System**:

✅ Navy gradient background (#101725 → #182336)
✅ Yellow (#EAB308) and Aqua (#57ACAF) accent colors
✅ 12-16px corner radius
✅ 180ms hover transitions
✅ Motion/framer-motion animations
✅ Responsive layouts
✅ Premium gradient orbs and patterns
✅ Consistent card styling
✅ MARBIM AI integration throughout

## Replication for Other Modules

To create onboarding flows for other modules:

### 1. Copy the three files:
```bash
cp LeadManagementIntro.tsx BuyerManagementIntro.tsx
cp LeadManagementPricing.tsx BuyerManagementPricing.tsx
cp LeadManagementOnboarding.tsx BuyerManagementOnboarding.tsx
```

### 2. Update content:
- Module name and icon
- KPI metrics (change from lead-focused to module-specific)
- Owner/Employee benefits
- Pricing tiers and features
- Onboarding steps (customize per module needs)
- AI prompts (module-specific)

### 3. Add routes in App.tsx:
```tsx
// Import
import { BuyerManagementIntro } from './components/pages/BuyerManagementIntro';
import { BuyerManagementPricing } from './components/pages/BuyerManagementPricing';
import { BuyerManagementOnboarding } from './components/pages/BuyerManagementOnboarding';

// Add cases in renderPage()
case 'buyer-management-intro':
  return <BuyerManagementIntro onNavigate={setCurrentPage} onAskMarbim={handleAskMarbim} />;
case 'buyer-management-pricing':
  return <BuyerManagementPricing onNavigate={setCurrentPage} onAskMarbim={handleAskMarbim} />;
case 'buyer-management-onboarding':
  return <BuyerManagementOnboarding onNavigate={setCurrentPage} onAskMarbim={handleAskMarbim} />;
```

### 4. Add sidebar entry:
```tsx
{ 
  id: 'buyer-management', 
  label: 'Buyer Management', 
  icon: TrendingUp,
  subPages: [
    { id: 'buyer-management-intro', label: '🚀 Module Setup', icon: Sparkles },
    // ... other subpages
  ]
},
```

## Module-Specific Customization Examples

### Supplier Evaluation Module:
- **Intro KPIs:** Material cost savings, supplier quality scores, on-time delivery rates
- **Onboarding Steps:** Upload supplier list → Connect ERP → Define quality criteria → Activate RFQ workflow

### Production Planning Module:
- **Intro KPIs:** Production efficiency, on-time delivery, capacity utilization
- **Onboarding Steps:** Import production lines → Connect IoT sensors → Define capacity rules → Activate AI scheduling

### Finance Module:
- **Intro KPIs:** Cash flow improvement, payment collection speed, P&L visibility
- **Onboarding Steps:** Connect accounting software → Import chart of accounts → Define approval rules → Activate AI forecasting

## Testing the Flow

1. Open the app
2. Navigate: Sidebar → Lead Management → 🚀 Module Setup
3. Click through all pages:
   - Intro → "View Pricing & Activate"
   - Pricing → "Start Onboarding"
   - Onboarding → Complete all 4 steps → "Complete Setup"
4. Verify navigation works smoothly
5. Test AI buttons (should open AI assistant panel)

## Future Enhancements

- [ ] Add URL routing support
- [ ] Persist onboarding progress in database
- [ ] Add "Skip for now" option
- [ ] Track which modules are activated
- [ ] Show completion badges in sidebar
- [ ] Add module activation analytics
- [ ] Create admin panel to view module adoption rates

## Notes

- The onboarding flow is currently **demo-only** and doesn't persist state
- All MARBIM buttons open the AI assistant panel with contextual prompts
- ROI calculations use hardcoded industry averages (customize per factory)
- The flow automatically redirects to the module dashboard after completion
