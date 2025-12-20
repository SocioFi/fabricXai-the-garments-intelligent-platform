# Database Seeding Guide for FabricXAI

This guide explains how to populate your Supabase database with comprehensive mock data for testing and development.

## 🎯 Overview

The database seeding system provides rich, realistic mock data for all 6 integrated modules:

1. **Lead Management** - Leads, campaigns, and conversations
2. **Buyer Management** - Buyers, issues, and feedback
3. **RFQ & Quotation** - RFQs and quotes
4. **Costing** - Cost sheets with detailed breakdowns
5. **Production Planning** - Production orders and capacity data
6. **Quality Control** - Inspections and defects

## 🚀 Quick Start

### Option 1: Using the UI (Recommended)

1. **Log in** to FabricXAI
2. Look for the **floating database icon** button in the **bottom-right corner**
3. Click it to open the **Database Seeding Panel**
4. Choose to either:
   - **Seed All Modules** - Populate all 6 modules at once
   - **Seed Individual Modules** - Click on specific modules to seed them one by one

### Option 2: Using Code

```typescript
import { seedAllModules } from '../utils/seedDatabase';

// Seed all modules
await seedAllModules();
```

Or seed individual modules:

```typescript
import {
  seedLeadManagement,
  seedBuyerManagement,
  seedRFQQuotation,
  seedCosting,
  seedProductionPlanning,
  seedQualityControl,
} from '../utils/seedDatabase';

// Seed specific module
await seedLeadManagement();
```

## 📊 Mock Data Statistics

### Lead Management
- **6 leads** - Various industries, countries, and lead scores
- **3 campaigns** - Active and completed email campaigns
- **4 conversations** - Multi-channel conversations with different intents

### Buyer Management
- **6 buyers** - Tier A/B/C buyers with complete profiles
- **3 issues** - Quality, delivery, and communication issues
- **4 feedback** - Customer feedback with sentiment analysis

### RFQ & Quotation
- **5 RFQs** - Various products, quantities, and statuses
- **2 quotes** - Detailed quotations with cost breakdowns

### Costing
- **3 cost sheets** - Complete cost sheets for different products
- Includes material, labor, overhead breakdowns
- Margin analysis and competitive indexing

### Production Planning
- **5 production orders** - Various statuses and progress levels
- **4 capacity records** - Line utilization and efficiency data

### Quality Control
- **4 inspections** - In-line and final inspections with AQL standards
- **3 defects** - Categorized defects with resolutions

## 🔍 Data Details

### Lead Management Data
Each lead includes:
- Basic info (name, company, country, source)
- Contact details (email, phone)
- Company details (industry, size, revenue)
- Lead scoring and status
- Tags and notes
- Timestamps

### Buyer Management Data
Each buyer includes:
- Company profile (tier, country, contact)
- Financial data (revenue, AR days, credit limit)
- Performance metrics (on-time delivery, quality rating)
- Relationship status
- Product focus and certifications

### RFQ & Quotation Data
Each RFQ includes:
- Product specifications
- Quantities and pricing
- Delivery requirements
- Certifications needed
- Special requirements
- Assignment and status tracking

### Costing Data
Each cost sheet includes:
- Material costs (fabric, trims, packaging)
- Labor costs (cutting, sewing, finishing)
- Overhead costs
- Pricing analysis
- Margin health indicators
- Detailed BOM and operation breakdown

### Production Planning Data
Each order includes:
- Production schedule (planned vs actual)
- Quantities (planned, produced, passed, failed)
- Efficiency metrics
- Quality scores
- Resource allocation
- Shipment details

### Quality Control Data
Each inspection includes:
- Inspection details (type, date, inspector)
- Sample sizes and results
- AQL standards and pass rates
- Defect categorization (critical, major, minor)
- Comments and corrective actions

## 🔄 Re-seeding

You can seed the database multiple times. Each seeding operation will:
- Add NEW data with unique IDs
- NOT delete existing data
- Create new records with current timestamps

## 🛠️ Technical Details

### Storage Method
- Uses **localStorage** as fallback when Supabase Edge Functions aren't available
- Automatically stores in both **KV store** and **vector database** for AI search
- Includes proper **RBAC metadata** (company ID, user ID, module)
- Timestamps and audit trails included

### Data Structure
All records include:
```typescript
{
  id: unique_identifier,
  type: 'lead' | 'campaign' | 'buyer' | 'rfq' | etc.,
  ...specific_fields,
  createdAt: ISO_timestamp,
  updatedAt: ISO_timestamp,
  companyId: company_id,
  ownerId: user_id,
  module: module_name,
}
```

### Vector Database
Searchable records are also stored in the vector database for AI-powered search:
- Leads, buyers, RFQs, cost sheets, orders, and inspections
- Includes full-text content for semantic search
- Metadata preserved for filtering

## 💡 Tips

1. **First Time Setup**: Seed all modules to get a complete dataset
2. **Module Testing**: Use individual seeding when testing specific features
3. **Data Variety**: The mock data includes various scenarios (success cases, issues, delays, etc.)
4. **Realistic Relationships**: Data is interconnected (buyers appear in RFQs, orders reference cost sheets, etc.)
5. **AI Context**: All data is optimized for AI assistant queries

## 🐛 Troubleshooting

### Seeding Failed
- Check browser console for error messages
- Verify you're logged in
- Check network connectivity
- Try seeding individual modules first

### Data Not Appearing
- Refresh the module page
- Check if you're viewing the correct tab/filter
- Verify data was seeded for the correct module
- Check localStorage in browser dev tools

### Duplicate IDs
- Each seeding generates unique IDs with timestamps
- No duplicate key conflicts should occur
- If issues persist, clear localStorage and re-seed

## 📝 Notes

- Mock data is designed to be **realistic and comprehensive**
- All dates are relative to current date where applicable
- Financial figures are in USD
- Quantity units vary by product type
- Country codes follow ISO standards
- Email addresses are fictional

## 🔐 Security

- All data is isolated by **company ID**
- User role permissions are enforced
- No sensitive or real PII is included
- Suitable for testing and demo purposes only

---

For more information, see:
- `/utils/seedDatabase.tsx` - Seeding implementation
- `/components/DatabaseSeedingPanel.tsx` - UI component
- `/guidelines/DatabaseIntegration.md` - Database architecture
