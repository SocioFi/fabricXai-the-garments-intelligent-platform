# FabricXAI Design System Guidelines

## Detail Drawer Design Standards

All detail drawers in the FabricXAI application must follow the RFQDetailDrawer design pattern for consistency and premium user experience.

### Core Drawer Specifications

**Animation & Positioning:**
- Use `motion.div` from 'motion/react' or `Sheet` from shadcn/ui
- Animation: `type: 'spring', damping: 30, stiffness: 300`
- Positioning: `top-16 bottom-[72px]` (below top bar, above footer)
- Slide direction: `initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}`

**Background & Border:**
- Background gradient: `bg-gradient-to-br from-[#101725] to-[#182336]`
- Border: `border-l border-white/10`
- Shadow: `shadow-2xl`

**Backdrop Behavior (UPDATED):**
- **NO backdrop blur** - Drawers do not blur the main application area
- **Remove backdrop completely** - No `backdrop-blur-sm` or dark overlay
- Drawers automatically collapse the sidebar when opened
- Only one drawer can be open at a time - opening a new drawer closes any existing drawer
- Top navigation bar remains visible and functional
- When drawer closes, sidebar expands back to normal state

**Width Guidelines:**
- Simple drawers (basic info): `max-w-[480px]`
- Standard drawers (forms, details): `max-w-[900px]`
- Complex drawers (extensive data, tabs): `max-w-[1000px]` or `max-w-3xl`
- Extra-wide drawers (comparison tables, analytics): `max-w-[1200px]`

### Header Design Pattern

**Structure:**
```
- Relative container with border-b border-white/10
- Background: bg-gradient-to-r from-[#57ACAF]/5 via-transparent to-[#EAB308]/5
- Background pattern: radial-gradient dots at opacity-5
```

**Icon Container:**
- Size: `w-12 h-12` rounded-xl
- Background: `bg-gradient-to-br from-[#57ACAF] to-[#57ACAF]/60`
- Shadow: `shadow-lg shadow-[#57ACAF]/20`
- Icon: `w-6 h-6 text-white`

**Quick Stats Row:**
- Grid layout: `grid grid-cols-4 gap-3`
- Cards: `px-3 py-2 rounded-lg bg-white/5 border border-white/10`
- Labels: `text-xs text-[#6F83A7]`
- Values: `text-lg text-white`

### Content Area

**Tab Navigation (Detail Drawers):**
- 4-tab system preferred for complex drawers
- **IMPORTANT:** Use manual state management with `useState` hook (not Shadcn Tabs component)
- **Design Pattern:** Sleek horizontal layout with animated gradient underline indicator

**Implementation Pattern:**
```tsx
const [activeTab, setActiveTab] = useState('overview'); // Default to first tab

// Tab navigation container
<div className="relative border-b border-white/10 bg-gradient-to-b from-white/5 to-transparent">
  <div className="flex items-center px-8 gap-1">
    {tabs.map((tab) => (
      <button
        onClick={() => setActiveTab(tab.id)}
        className={`
          relative px-5 py-3.5 text-sm transition-all duration-300 flex items-center gap-2
          ${activeTab === tab.id ? 'text-[#57ACAF]' : 'text-[#6F83A7] hover:text-white'}
        `}
      >
        <Icon className="w-4 h-4" />
        <span className="relative z-10">{tab.label}</span>
        
        {/* Animated underline with Motion */}
        {activeTab === tab.id && (
          <motion.div
            layoutId="activeTabIndicator"
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#57ACAF] to-[#EAB308]"
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          />
        )}
      </button>
    ))}
  </div>
</div>

// Content with conditional rendering
{activeTab === 'overview' && (
  <div className="space-y-6">
    {/* Tab content */}
  </div>
)}
```

**Styling Specifications:**
- Container: `relative border-b border-white/10 bg-gradient-to-b from-white/5 to-transparent`
- Inner wrapper: `flex items-center px-8 gap-1`
- Tab button: `relative px-5 py-3.5 text-sm transition-all duration-300 flex items-center gap-2`
- Active text: `text-[#57ACAF]` | Inactive: `text-[#6F83A7] hover:text-white`
- Underline: `absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#57ACAF] to-[#EAB308]`
- Motion animation: `layoutId` must be unique per drawer (e.g., `"activeBuyerRFQTab"`, `"activeSupplierRFQTab"`)
- Icons: `w-4 h-4` standard size
- Gap between tabs: `gap-1` on container

**Scrolling:**
- Use `ScrollArea` from shadcn/ui for proper overflow handling
- Wrap structure: `<div className="flex-1 overflow-hidden"><ScrollArea className="h-full px-8 py-6">...</ScrollArea></div>`
- This ensures ScrollArea has a defined height and properly handles overflow
- For Sheet-based drawers: `overflow-y-auto`

**Card Styling:**
- Background: `bg-gradient-to-br from-white/5 to-white/[0.02]`
- Border: `border border-white/10`
- Rounded: `rounded-xl`
- Padding: `p-5` or `p-6`

**AI Insight Cards:**
- Background: `bg-gradient-to-br from-[#EAB308]/10 to-[#EAB308]/5`
- Border: `border border-[#EAB308]/20`
- Icon container: `w-10 h-10 rounded-lg bg-[#EAB308]/20`
- Icon color: `text-[#EAB308]`

### Interactive Elements

**Buttons:**
- Primary action: `bg-gradient-to-r from-[#57ACAF] to-[#57ACAF]/80 text-white`
- Hover: `hover:from-[#57ACAF]/90 hover:to-[#57ACAF]/70`
- Shadow: `shadow-lg shadow-[#57ACAF]/20`
- Outline: `border-white/10 text-white hover:bg-white/5 bg-[rgba(255,255,255,0)]`

**Badges:**
- Open/Active: `bg-[#EAB308]/10 text-[#EAB308] border border-[#EAB308]/20`
- Success/Completed: `bg-[#57ACAF]/10 text-[#57ACAF] border border-[#57ACAF]/20`
- Default/Pending: `bg-[#6F83A7]/10 text-[#6F83A7] border border-[#6F83A7]/20`

**Transitions:**
- Hover effects: `transition-all duration-180`
- Drawer slides: `duration-250`

### File Attachments (if applicable)

When implementing file upload functionality:
- Hidden input: `type="file" multiple accept="*/*"`
- Trigger via ref.click()
- Display files in `bg-white/5 border border-white/10` cards
- Show file name, size, and remove button
- Hover animation: `group hover:bg-white/10 transition-all duration-180`
- Remove button appears on hover: `opacity-0 group-hover:opacity-100`

### Current Drawer Components

✅ Following standards:
- `RFQDetailDrawer.tsx` (legacy - will be replaced by BuyerRFQDetailDrawer)
- `BuyerRFQDetailDrawer.tsx` (RFQ & Quotation Module - RFQs FROM buyers TO factory, 4-tab layout with sleek animated underline tabs, 8+ AI touchpoints)
- `SupplierRFQDetailDrawer.tsx` (Supplier Evaluation Module - RFQs FROM factory TO suppliers for materials, 4-tab layout with sleek animated underline tabs, 8+ AI touchpoints, comprehensive supplier quote comparison)
- `QuoteScenarioDetailDrawer.tsx` (RFQ & Quotation Module - Quote scenario builder and editor, 4-tab layout with sleek animated underline tabs, comprehensive pricing/cost/analysis forms, 8+ AI touchpoints)
- `CampaignDetailDrawer.tsx`
- `EmailCompositionDrawer.tsx`
- `SegmentCreationDrawer.tsx`
- `DetailDrawer.tsx`
- `TemplateDrawer.tsx`
- `BroadcastRFQDrawer.tsx`
- `QuoteComparisonDrawer.tsx` (wide drawer: max-w-[1200px])
- `AwardedRFQDetailDrawer.tsx`
- `SupplierDetailDrawer.tsx`
- `SampleDetailDrawer.tsx`
- `RequestSampleDrawer.tsx` (form-based drawer with file attachments)
- `AddSupplierDrawer.tsx` (comprehensive supplier onboarding form)
- `AddBuyerDrawer.tsx` (comprehensive buyer onboarding form with tier classification, business terms, and AI recommendations)
- `BuyerDetailDrawer.tsx` (premium buyer details with 4-tab layout)
- `IssueDetailDrawer.tsx` (issue management with 8 AI touchpoints, severity-based colors)
- `FeedbackDetailDrawer.tsx` (buyer feedback analysis with 4-tab layout, 8 AI touchpoints, sentiment visualization)
- `MachineDetailDrawer.tsx` (Machine Maintenance Module - comprehensive machine details with 4-tab layout, IoT sensor data, health scoring, 10+ AI touchpoints for predictive maintenance)
- `ApprovalDetailDrawer.tsx` (Approve Module - approval request details with 4-tab layout, 8+ AI touchpoints for decision support)
- `CostSheetDetailDrawer.tsx` (Costing Module - cost sheet details with 4-tab layout (Overview, Cost Breakdown, Profit Analysis, History), 12+ AI touchpoints, comprehensive cost analysis with material/labor breakdowns, profit scenarios, margin health indicators, and revision history)
- `CreateCostSheetDrawer.tsx` (Costing Module - form-based drawer for creating new cost sheets with dynamic material/labor item management, real-time cost calculations, AI-powered suggestions for BOM, labor operations, and margin recommendations, comprehensive cost summary with FOB pricing)

---

## Tab System Standards

All tabbed interfaces in FabricXAI follow a consistent design pattern for navigation and content organization.

### Tab Navigation Design (Page-Level Tabs - Module Views)

**Container:**
- Background: `bg-gradient-to-r from-white/5 via-white/10 to-white/5`
- Backdrop blur: `backdrop-blur-xl`
- Border: `border border-white/20`
- Rounded: `rounded-2xl`
- Padding: `p-1.5`
- Shadow: `shadow-lg shadow-black/20`

**Tab Triggers:**
- Layout: `grid grid-cols-{n}` where n = number of tabs
- Gap: `gap-1.5`
- Individual tab padding: `py-3.5 px-4`
- Base state: `bg-white/5 hover:bg-white/10`
- Active state:
  - Background: `data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#EAB308] data-[state=active]:to-[#EAB308]/80`
  - Text: `data-[state=active]:text-black data-[state=active]:font-medium`
  - Shadow: `data-[state=active]:shadow-lg data-[state=active]:shadow-[#EAB308]/30`
- Inactive state: `text-[#6F83A7]`
- Transitions: `transition-all duration-300`
- Icons: Scale animation `group-data-[state=active]:scale-110 transition-transform`

**Default Tab Selection:**
- **Always set `defaultValue` to the first tab's value**
- This ensures consistent user experience across all modules
- Exception: Dashboard views typically don't have tabs

### Tab Navigation Design (Detail Drawer Tabs)

**Container:**
- Parent wrapper: `border-b border-white/10` for bottom border across full width
- TabsList: `h-auto w-full bg-transparent border-0 p-0 flex justify-start gap-8 mb-0`

**Tab Triggers:**
- Base classes: `relative h-auto bg-transparent border-0 rounded-none px-0 pb-4`
- Layout: `flex items-center gap-2` (icon + label)
- Text colors: `text-[#6F83A7] data-[state=active]:text-white`
- Remove active backgrounds: `data-[state=active]:bg-transparent data-[state=active]:shadow-none`
- Underline indicator (using ::after pseudo-element):
  - `after:absolute after:bottom-0 after:left-0 after:right-0`
  - `after:h-0.5 after:bg-transparent`
  - `data-[state=active]:after:bg-[#EAB308]`
  - `after:transition-all after:duration-300`
- Main transition: `transition-all duration-300`
- Icons: `w-4 h-4` standard size

**Spacing:**
- Gap between tabs: `gap-8`
- Bottom padding on each tab: `pb-4`
- Parent has `pt-6` and `px-8` for proper drawer spacing

### Current Tab Implementations

✅ Following standards:
- **Supplier Evaluation Module:**
  - Supplier Directory: `defaultValue="all-suppliers"` (5 tabs)
  - RFQ Board: `defaultValue="open-rfqs"` (5 tabs)
  - Sample Tracking: `defaultValue="requests"` (5 tabs)

---

## Database Integration Standards

FabricXAI uses a comprehensive database architecture with RBAC, vector search, and multi-tenancy.

### Quick Reference

**Import from single source:**
```tsx
import { useDatabase, canPerformAction, MODULE_NAMES } from '../utils/supabase';
```

**Basic Usage:**
```tsx
function MyModule() {
  const db = useDatabase();
  
  // Store data
  await db.store('record-id', data, MODULE_NAMES.RFQ_QUOTATION);
  
  // Get data
  const data = await db.getByModule(MODULE_NAMES.RFQ_QUOTATION);
  
  // AI search
  const results = await db.searchVector(query, {
    module: MODULE_NAMES.RFQ_QUOTATION,
    limit: 10
  });
  
  // Check permissions
  if (canPerformAction(MODULE_NAMES.RFQ_QUOTATION, 'create')) {
    // User can create
  }
}
```

### Module Name Constants

**Always use MODULE_NAMES constants:**
- `MODULE_NAMES.LEAD_MANAGEMENT` → 'lead-management'
- `MODULE_NAMES.BUYER_MANAGEMENT` → 'buyer-management'
- `MODULE_NAMES.RFQ_QUOTATION` → 'rfq-quotation'
- `MODULE_NAMES.COSTING` → 'costing'
- `MODULE_NAMES.PRODUCTION_PLANNING` → 'production-planning'
- `MODULE_NAMES.QUALITY_CONTROL` → 'quality-control'
- `MODULE_NAMES.MACHINE_MAINTENANCE` → 'machine-maintenance'
- `MODULE_NAMES.SUPPLIER_EVALUATION` → 'supplier-evaluation'
- `MODULE_NAMES.INVENTORY_MANAGEMENT` → 'inventory-management'
- `MODULE_NAMES.SHIPMENT` → 'shipment'
- `MODULE_NAMES.FINANCE` → 'finance'
- `MODULE_NAMES.COMPLIANCE_POLICY` → 'compliance-policy'
- `MODULE_NAMES.SUSTAINABILITY` → 'sustainability'
- `MODULE_NAMES.WORKFORCE_MANAGEMENT` → 'workforce-management'

### Permission Checks

**Always check permissions before showing UI:**
```tsx
import { canPerformAction, hasPermission } from '../utils/supabase';

// Check specific action
{canPerformAction('module-name', 'create') && (
  <Button onClick={handleCreate}>Create</Button>
)}

// Check general permission
{hasPermission('approve') && (
  <Button onClick={handleApprove}>Approve</Button>
)}
```

### Data Operations Pattern

**Standard CRUD Pattern:**
```tsx
import { useDatabase, MODULE_NAMES } from '../utils/supabase';

function MyComponent() {
  const db = useDatabase();
  const [data, setData] = useState([]);
  
  // Load data
  useEffect(() => {
    loadData();
  }, []);
  
  async function loadData() {
    try {
      const moduleData = await db.getByModule(MODULE_NAMES.MY_MODULE);
      setData(moduleData);
    } catch (error) {
      console.error('Failed to load:', error);
      toast.error('Failed to load data');
    }
  }
  
  // Create
  async function handleCreate(newData) {
    try {
      const id = `record-${Date.now()}`;
      await db.store(id, newData, MODULE_NAMES.MY_MODULE);
      
      // Also store in vector DB for AI search
      await db.storeVector(id, searchableContent, MODULE_NAMES.MY_MODULE);
      
      toast.success('Created successfully');
      loadData();
    } catch (error) {
      console.error('Create failed:', error);
      toast.error('Failed to create');
    }
  }
  
  // Update
  async function handleUpdate(id, updates) {
    try {
      await db.update(id, updates, MODULE_NAMES.MY_MODULE);
      toast.success('Updated successfully');
      loadData();
    } catch (error) {
      console.error('Update failed:', error);
      toast.error('Failed to update');
    }
  }
  
  // Delete
  async function handleDelete(id) {
    try {
      await db.removeComplete(id); // Deletes from both KV and vector DB
      toast.success('Deleted successfully');
      loadData();
    } catch (error) {
      console.error('Delete failed:', error);
      toast.error('Failed to delete');
    }
  }
}
```

### Vector Search Integration

**AI-Powered Search:**
```tsx
async function handleAISearch(query: string) {
  try {
    const results = await db.searchVector(query, {
      module: MODULE_NAMES.MY_MODULE,
      limit: 10,
      threshold: 0.6, // 0.5-0.8 recommended
    });
    
    setSearchResults(results);
  } catch (error) {
    console.error('Search failed:', error);
    toast.error('Search failed');
  }
}

// Get AI context for chatbot
async function getContextForAI(userQuery: string) {
  const context = await db.getAIContext(userQuery, MODULE_NAMES.MY_MODULE);
  // Use context in AI assistant
}
```

### User Roles

- **admin** - Full access to all modules
- **manager** - Module management access
- **sales** - CRM, RFQ, Buyer modules
- **production** - Production, QC, Machine modules
- **finance** - Finance, Costing modules
- **procurement** - Supplier, Inventory modules
- **compliance** - Compliance, Sustainability modules
- **hr** - Workforce Management
- **operations** - Shipment, Inventory, Production
- **quality** - Quality Control, Compliance
- **viewer** - Read-only access to all modules

### Session Management

**Current session is auto-initialized:**
```tsx
import { getCurrentSession } from '../utils/supabase';

const session = getCurrentSession();
console.log(session.userId, session.companyId, session.role);
```

**For testing different roles:**
```tsx
import { initializeDemoSession } from '../utils/supabase';

// Test as viewer
initializeDemoSession('viewer');

// Test as sales
initializeDemoSession('sales');
```

### Security Notes

1. All data is automatically isolated by company ID
2. Permissions are enforced on both client and server
3. Sessions expire after 24 hours
4. All updates include audit trail (updatedBy, updatedAt)
5. No cross-company data access possible

### Complete Documentation

For detailed documentation, see:
- `/guidelines/DatabaseIntegration.md` - Full API reference and usage guide
- `/guidelines/DatabaseImplementationSummary.md` - Implementation overview
- `/utils/supabase/README.md` - Quick reference guide

---

**Add your own guidelines here**