# FabricXAI Database Integration

Complete database layer with RBAC, vector search, and multi-tenancy for all 14 modules.

## 🚀 Quick Start

```tsx
import { useDatabase, canPerformAction, MODULE_NAMES } from '../utils/supabase';

function MyComponent() {
  const db = useDatabase();
  
  // Check permission
  if (!canPerformAction(MODULE_NAMES.RFQ_QUOTATION, 'create')) {
    return <AccessDenied />;
  }
  
  // Store data
  await db.store('rfq-001', rfqData, MODULE_NAMES.RFQ_QUOTATION);
  
  // AI search
  const results = await db.searchVector('cotton fabric', {
    module: MODULE_NAMES.RFQ_QUOTATION,
    limit: 10
  });
}
```

## 📁 File Structure

```
/utils/supabase/
├── index.tsx                 # Main export (import from here)
├── rbac.tsx                  # Role-based access control
├── database.tsx              # Database operations layer
├── useDatabase.tsx           # React hook for DB operations
├── vector_store.tsx          # Vector database utilities
├── useVectorStore.tsx        # React hook for vector DB
├── info.tsx                  # Supabase project config
├── seedVectorData.tsx        # Data seeding utilities
└── README.md                 # This file
```

## 🔑 Core Features

### ✅ RBAC System
- **11 Roles**: admin, manager, sales, production, finance, procurement, compliance, hr, operations, quality, viewer
- **6 Permissions**: create, read, update, delete, approve, export
- **14 Modules**: Full permission mapping for all modules

### ✅ Database Operations
- **Store/Get/Update/Delete**: Full CRUD with RBAC
- **Batch Operations**: Multi-record operations
- **Company Isolation**: Automatic data isolation by company
- **Audit Trail**: Auto timestamps and user tracking

### ✅ Vector Database
- **Semantic Search**: AI-powered similarity search
- **Embeddings**: 384-dimension vectors
- **Module Filtering**: Search within specific modules
- **AI Context**: Retrieve context for chatbot

## 📚 Key Functions

### Session Management
```tsx
import { getCurrentSession, initializeDemoSession } from '../utils/supabase';

// Get current session
const session = getCurrentSession();

// Initialize demo (for testing)
initializeDemoSession('admin');
```

### Permission Checks
```tsx
import { hasModuleAccess, canPerformAction } from '../utils/supabase';

// Check module access
if (hasModuleAccess('finance')) { /* ... */ }

// Check action permission
if (canPerformAction('finance', 'approve')) { /* ... */ }
```

### Data Operations
```tsx
import { useDatabase } from '../utils/supabase';

const db = useDatabase();

// Store
await db.store('id', data, 'module-name');

// Get
const data = await db.get('id');
const allData = await db.getByModule('module-name');

// Update
await db.update('id', updates, 'module-name');

// Delete
await db.remove('id');
```

### Vector Search
```tsx
import { useDatabase } from '../utils/supabase';

const db = useDatabase();

// Store for AI search
await db.storeVector('id', 'searchable content', 'module-name', metadata);

// Search
const results = await db.searchVector('query', {
  module: 'module-name',
  limit: 10,
  threshold: 0.6
});

// Get AI context
const context = await db.getAIContext('query', 'module-name');
```

## 🎯 User Roles & Access

| Role | Permissions | Typical Modules |
|------|-------------|----------------|
| `admin` | All | All modules |
| `manager` | All except system config | All business modules |
| `sales` | create, read, update, export | CRM, RFQ, Buyers |
| `production` | create, read, update, export | Production, QC, Machines |
| `finance` | create, read, update, export | Finance, Costing |
| `procurement` | create, read, update, export | Suppliers, Inventory |
| `viewer` | read, export | All modules (read-only) |

## 📋 Module Names Reference

Always use these constants:

```tsx
import { MODULE_NAMES } from '../utils/supabase';

MODULE_NAMES.LEAD_MANAGEMENT      // 'lead-management'
MODULE_NAMES.BUYER_MANAGEMENT     // 'buyer-management'
MODULE_NAMES.RFQ_QUOTATION        // 'rfq-quotation'
MODULE_NAMES.COSTING              // 'costing'
MODULE_NAMES.PRODUCTION_PLANNING  // 'production-planning'
MODULE_NAMES.QUALITY_CONTROL      // 'quality-control'
MODULE_NAMES.MACHINE_MAINTENANCE  // 'machine-maintenance'
MODULE_NAMES.SUPPLIER_EVALUATION  // 'supplier-evaluation'
MODULE_NAMES.INVENTORY_MANAGEMENT // 'inventory-management'
MODULE_NAMES.SHIPMENT             // 'shipment'
MODULE_NAMES.FINANCE              // 'finance'
MODULE_NAMES.COMPLIANCE_POLICY    // 'compliance-policy'
MODULE_NAMES.SUSTAINABILITY       // 'sustainability'
MODULE_NAMES.WORKFORCE_MANAGEMENT // 'workforce-management'
```

## 🔒 Security Features

1. **Company Isolation**: All keys prefixed with `companyId:`
2. **RBAC Enforcement**: Permissions checked client and server-side
3. **Session Expiry**: 24-hour automatic expiration
4. **Audit Trail**: `updatedBy` and `updatedAt` on all records
5. **Server Validation**: All requests validated with auth headers

## 📊 Data Flow

```
Component
    ↓ useDatabase()
Database Layer
    ↓ + RBAC metadata
Server API
    ↓ validateAuth()
    ↓ company isolation
Supabase KV Store
```

## 🧪 Testing

### Test Different Roles
```tsx
import { initializeDemoSession } from '../utils/supabase';

// Test as admin
initializeDemoSession('admin');

// Test as viewer (read-only)
initializeDemoSession('viewer');

// Test as sales
initializeDemoSession('sales');
```

### Test in Browser Console
```javascript
// Check session
import { getCurrentSession } from './utils/supabase';
console.log(getCurrentSession());

// Test permissions
import { canPerformAction } from './utils/supabase';
console.log(canPerformAction('finance', 'create'));
```

## 📖 Full Documentation

- **Integration Guide**: `/guidelines/DatabaseIntegration.md`
- **Implementation Summary**: `/guidelines/DatabaseImplementationSummary.md`
- **Vector Database Guide**: `/guidelines/VectorDatabaseGuide.md`

## 🆘 Common Issues

### "Unauthorized - Missing auth headers"
**Solution**: Session not initialized
```tsx
import { initializeDemoSession } from '../utils/supabase';
initializeDemoSession('admin');
```

### "Access denied"
**Solution**: User role doesn't have module access
```tsx
import { hasModuleAccess } from '../utils/supabase';
if (!hasModuleAccess('finance')) {
  // Handle no access
}
```

### No search results
**Solution**: Lower threshold or ensure data is stored
```tsx
const results = await db.searchVector(query, {
  threshold: 0.5  // Lower = more permissive
});
```

## 💡 Best Practices

1. ✅ Always use `MODULE_NAMES` constants
2. ✅ Check permissions before showing UI
3. ✅ Handle errors with user-friendly messages
4. ✅ Store searchable content in vector DB
5. ✅ Use batch operations for multiple records
6. ✅ Keep vector embeddings in sync with data
7. ✅ Test with different roles

## 🔄 Migration from Mock Data

```tsx
async function migrate() {
  const db = useDatabase();
  
  for (const item of mockData) {
    await db.store(item.id, item, 'module-name');
    
    // Also add to vector DB
    await db.storeVector(
      item.id,
      createSearchableContent(item),
      'module-name'
    );
  }
}
```

## 📞 Support

For questions or issues:
1. Check `/guidelines/DatabaseIntegration.md`
2. Review examples in `/components/DatabaseDemo.tsx`
3. Test with different roles
4. Check browser console for errors
5. Verify network requests include auth headers

---

**Status**: ✅ Fully implemented and ready to use across all 14 modules
