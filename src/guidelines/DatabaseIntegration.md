# FabricXAI Database Integration Guide

## Overview

FabricXAI uses a comprehensive database architecture that combines:
- **Supabase KV Store** - Primary data storage with company isolation
- **Vector Database** - AI-powered semantic search capabilities  
- **RBAC System** - Role-based access control across all 14 modules
- **Multi-tenant Architecture** - Company-level data isolation

## Architecture

### Three-Tier Architecture

```
Frontend (React) 
    ↓
Database Layer (RBAC + Vector)
    ↓  
Server (Hono API)
    ↓
Supabase KV Store
```

### Data Isolation

All data is automatically isolated by company ID:
- Keys are prefixed with `companyId:` 
- Server validates company access on every request
- RBAC filters data based on user role and module access

### Vector Database Integration

Vector embeddings enable:
- Semantic search across all modules
- AI context retrieval for chatbot
- Similar document/record discovery
- Multi-modal search capabilities

## User Roles & Permissions

### Roles

| Role | Description | Modules Access |
|------|-------------|---------------|
| `admin` | Full system access | All modules, all permissions |
| `manager` | Module management | All modules, approval rights |
| `sales` | CRM & sales operations | Lead Mgmt, Buyer Mgmt, RFQ & Quotation |
| `production` | Production operations | Production Planning, QC, Machine Maintenance |
| `finance` | Financial operations | Finance, Costing |
| `procurement` | Supply chain | Supplier Eval, Inventory |
| `compliance` | Compliance & sustainability | Compliance, Sustainability, QC |
| `hr` | Human resources | Workforce Management |
| `operations` | Operations management | Shipment, Inventory, Production |
| `quality` | Quality assurance | Quality Control, Compliance |
| `viewer` | Read-only access | All modules (read-only) |

### Permissions

- `create` - Create new records
- `read` - View records
- `update` - Modify existing records
- `delete` - Remove records
- `approve` - Approve requests/submissions
- `export` - Export data

## Implementation Guide

### 1. Using the Database Hook

```tsx
import { useDatabase } from '../utils/supabase/useDatabase';

function MyComponent() {
  const db = useDatabase();
  
  // Store data
  await db.store('rfq-001', rfqData, 'rfq-quotation');
  
  // Get data
  const data = await db.get('rfq-001');
  
  // Get all data for module
  const allRFQs = await db.getByModule('rfq-quotation');
  
  // Update data
  await db.update('rfq-001', updatedData, 'rfq-quotation');
  
  // Delete data
  await db.remove('rfq-001');
}
```

### 2. Vector Database Operations

```tsx
import { useDatabase } from '../utils/supabase/useDatabase';

function AISearch() {
  const db = useDatabase();
  
  // Store document for vector search
  await db.storeVector(
    'rfq-001',
    'RFQ for cotton fabric 1000 yards...',
    'rfq-quotation',
    { buyerId: 'buyer-123', status: 'open' }
  );
  
  // Search similar documents
  const results = await db.searchVector(
    'cotton fabric requirements',
    {
      module: 'rfq-quotation',
      limit: 5,
      threshold: 0.7
    }
  );
  
  // Get AI context for chatbot
  const context = await db.getAIContext(
    'Show me open RFQs for cotton',
    'rfq-quotation'
  );
}
```

### 3. RBAC Functions

```tsx
import { 
  hasModuleAccess, 
  hasPermission, 
  canPerformAction,
  getCurrentSession 
} from '../utils/supabase/rbac';

function ProtectedFeature() {
  const session = getCurrentSession();
  
  // Check module access
  if (!hasModuleAccess('finance')) {
    return <AccessDenied />;
  }
  
  // Check permission
  if (!hasPermission('create')) {
    return <ReadOnlyView />;
  }
  
  // Check combined access
  if (canPerformAction('finance', 'approve')) {
    return <ApprovalButton />;
  }
}
```

### 4. Session Management

```tsx
import { 
  getCurrentSession,
  setSession,
  clearSession,
  initializeDemoSession 
} from '../utils/supabase/rbac';

// Initialize demo session (for testing)
initializeDemoSession('admin');

// Get current session
const session = getCurrentSession();
console.log(session.userId, session.companyId, session.role);

// Set custom session
setSession({
  userId: 'user-123',
  companyId: 'company-abc',
  role: 'sales',
  email: 'sales@company.com',
  name: 'Sales User',
  modules: ['lead-management', 'rfq-quotation'],
  permissions: ['create', 'read', 'update'],
  expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
});

// Clear session (logout)
clearSession();
```

## Module-Specific Implementation

### Example: RFQ & Quotation Module

```tsx
import { useDatabase } from '../utils/supabase/useDatabase';
import { useState, useEffect } from 'react';

export function RFQQuotation() {
  const db = useDatabase();
  const [rfqs, setRfqs] = useState([]);
  
  useEffect(() => {
    loadRFQs();
  }, []);
  
  async function loadRFQs() {
    try {
      const data = await db.getByModule('rfq-quotation');
      setRfqs(data);
    } catch (error) {
      console.error('Failed to load RFQs:', error);
    }
  }
  
  async function createRFQ(rfqData: any) {
    try {
      const rfqId = `rfq-${Date.now()}`;
      
      // Store in KV database
      await db.store(rfqId, rfqData, 'rfq-quotation');
      
      // Store in vector database for AI search
      const searchContent = `
        RFQ ${rfqData.rfqNumber}
        Buyer: ${rfqData.buyerName}
        Product: ${rfqData.productType}
        Quantity: ${rfqData.quantity}
        Requirements: ${rfqData.requirements}
      `;
      
      await db.storeVector(
        rfqId,
        searchContent,
        'rfq-quotation',
        {
          rfqNumber: rfqData.rfqNumber,
          buyerId: rfqData.buyerId,
          status: rfqData.status,
        }
      );
      
      toast.success('RFQ created successfully');
      loadRFQs();
    } catch (error) {
      console.error('Failed to create RFQ:', error);
      toast.error('Failed to create RFQ');
    }
  }
  
  async function searchRFQs(query: string) {
    try {
      const results = await db.searchVector(query, {
        module: 'rfq-quotation',
        limit: 10,
        threshold: 0.6,
      });
      
      setRfqs(results);
    } catch (error) {
      console.error('Search failed:', error);
    }
  }
  
  return (
    <PageLayout>
      {/* Your RFQ UI */}
    </PageLayout>
  );
}
```

## API Endpoints

### Data Operations

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/data/store` | POST | Store data with RBAC |
| `/data/get` | GET | Get data by key |
| `/data/by-module` | GET | Get all module data |
| `/data/update` | PUT | Update existing data |
| `/data/delete` | DELETE | Delete data |
| `/data/batch-store` | POST | Batch store multiple records |

### Vector Operations

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/embeddings/generate` | POST | Generate vector embeddings |
| `/vectors/store` | POST | Store document with embedding |
| `/vectors/search` | POST | Search similar documents |
| `/vectors/delete` | DELETE | Delete vector document |
| `/vectors/batch-store` | POST | Batch store vectors |

### Analytics

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/analytics/company` | GET | Company-wide analytics |
| `/analytics/module` | GET | Module-specific analytics |

## Best Practices

### 1. Always Use Module Names

```tsx
// ✅ Good
await db.store('rfq-001', data, 'rfq-quotation');

// ❌ Bad
await db.store('rfq-001', data, '');
```

### 2. Sync Important Data to Vector DB

```tsx
// Store in both KV and Vector DB for searchability
await db.store(id, data, module);
await db.storeVector(id, searchableContent, module, metadata);

// Or use sync helper
await db.store(id, data, module);
await db.syncVector(id, searchableContent, module);
```

### 3. Check Permissions Before Actions

```tsx
// Check before showing UI elements
{canPerformAction('finance', 'approve') && (
  <Button onClick={handleApprove}>Approve</Button>
)}

// Check before API calls
if (!hasPermission('create')) {
  toast.error('You do not have permission to create records');
  return;
}
await db.store(id, data, module);
```

### 4. Handle Errors Gracefully

```tsx
try {
  await db.store(id, data, module);
  toast.success('Data saved successfully');
} catch (error) {
  console.error('Database error:', error);
  toast.error('Failed to save data. Please try again.');
}
```

### 5. Use Loading States

```tsx
const db = useDatabase();

{db.isLoading && <LoadingSpinner />}
{db.error && <ErrorMessage error={db.error} />}
```

## Troubleshooting

### Issue: "Unauthorized - Missing auth headers"

**Solution:** Ensure session is initialized
```tsx
import { initializeDemoSession } from '../utils/supabase/rbac';
initializeDemoSession('admin');
```

### Issue: "Access denied" when fetching data

**Solution:** Check user role has module access
```tsx
import { hasModuleAccess } from '../utils/supabase/rbac';
if (!hasModuleAccess('finance')) {
  // User doesn't have access to finance module
}
```

### Issue: Vector search returns no results

**Solution:** Check threshold and ensure data is stored
```tsx
// Lower threshold for more results
const results = await db.searchVector(query, {
  threshold: 0.5  // Lower = more permissive
});
```

## Migration from Mock Data

If you have existing mock data, migrate it:

```tsx
async function migrateMockData() {
  const db = useDatabase();
  
  // Example: Migrate RFQs
  const mockRFQs = [/* your mock data */];
  
  for (const rfq of mockRFQs) {
    await db.store(
      `rfq-${rfq.id}`,
      rfq,
      'rfq-quotation'
    );
    
    // Also add to vector DB
    await db.storeVector(
      `rfq-${rfq.id}`,
      JSON.stringify(rfq),
      'rfq-quotation',
      { status: rfq.status }
    );
  }
}
```

## Security Notes

1. **Company Isolation**: All data is automatically isolated by company ID
2. **RBAC Enforcement**: Permissions are checked on both client and server
3. **Session Expiry**: Sessions expire after 24 hours by default
4. **Audit Trail**: All updates include `updatedBy` and `updatedAt` fields
5. **No Cross-Company Access**: Users can never access another company's data

## Performance Tips

1. **Batch Operations**: Use `batchStore` for multiple records
2. **Module Filtering**: Always specify module for faster queries
3. **Vector Threshold**: Use appropriate threshold (0.6-0.8) for accuracy vs recall
4. **Caching**: Consider caching frequently accessed data in component state
