/**
 * Seed Vector Database with Initial Data
 * This utility populates the vector database with sample data for each module
 */

import { batchStoreDocuments, VectorDocument } from './vector_store';

export const seedData: VectorDocument[] = [
  // Lead Management
  {
    id: 'lead-001',
    content: 'High-value lead from textile manufacturing sector. Company: Apex Garments Ltd. Contact: John Smith, Procurement Manager. Interest: 50,000 units of cotton t-shirts. Fit score: 92%. Last interaction: Viewed pricing page 5 times.',
    metadata: {
      type: 'lead',
      company: 'Apex Garments Ltd',
      fitScore: 92,
      intentLevel: 'high',
      source: 'website'
    },
    module: 'lead-management'
  },
  {
    id: 'lead-002',
    content: 'Mid-range lead from retail sector. Company: Fashion Forward Inc. Contact: Sarah Johnson, Buyer. Interest: Custom polo shirts with embroidery. Fit score: 76%. Budget: $150K annually. Timeline: Q2 2025.',
    metadata: {
      type: 'lead',
      company: 'Fashion Forward Inc',
      fitScore: 76,
      intentLevel: 'medium',
      budget: 150000
    },
    module: 'lead-management'
  },
  
  // Buyer Management
  {
    id: 'buyer-001',
    content: 'Premium buyer ACME Corp. Tier A customer with 8 orders in last 30 days totaling $247K. Average order value: $30,875. Payment terms: NET 30. On-time delivery satisfaction: 92%. Outstanding balance: $84K. Next renewal: June 2025.',
    metadata: {
      type: 'buyer',
      company: 'ACME Corp',
      tier: 'A',
      revenue: 247000,
      satisfaction: 92
    },
    module: 'buyer-management'
  },
  {
    id: 'buyer-002',
    content: 'Growing buyer TrendWear LLC. Tier B customer. 15% YoY growth. Recent orders: 12 in last quarter. Average order: $18K. Prefers organic cotton fabrics. Quick turnaround requirements (2-3 weeks). Quality conscious with strict AQL standards.',
    metadata: {
      type: 'buyer',
      company: 'TrendWear LLC',
      tier: 'B',
      growthRate: 15,
      preferredFabric: 'organic cotton'
    },
    module: 'buyer-management'
  },
  
  // Supplier Evaluation
  {
    id: 'supplier-001',
    content: 'Top-rated fabric supplier: Premium Textiles Ltd. Specializes in 180-200 GSM cotton knit. Reliability score: 96%. Average lead time: 12 days. Price competitiveness: High. Certifications: OEKO-TEX, GOTS, BCI. Production capacity: 50,000 yards/month.',
    metadata: {
      type: 'supplier',
      company: 'Premium Textiles Ltd',
      reliability: 96,
      specialization: 'cotton knit',
      leadTime: 12
    },
    module: 'supplier-evaluation'
  },
  {
    id: 'supplier-002',
    content: 'Button and trim supplier: Fasteners Global Inc. Product range: plastic buttons, metal snaps, zippers. Quality rating: 88%. Price point: Medium. MOQ: 10,000 units. Certifications expiring: OEKO-TEX (March 2025). Response time: 24 hours.',
    metadata: {
      type: 'supplier',
      company: 'Fasteners Global Inc',
      productType: 'trims',
      quality: 88,
      certExpiry: '2025-03'
    },
    module: 'supplier-evaluation'
  },
  
  // RFQ & Quotation
  {
    id: 'rfq-001',
    content: 'RFQ-2024-456 from Global Retail Co. Style: Men\'s crew neck t-shirt. Fabric: 180 GSM cotton jersey. Colors: 5 (White, Black, Navy, Gray, Red). Quantity: 25,000 units. Target price: $4.50 FOB. Delivery: June 2025. Missing specs: wash care, packing method.',
    metadata: {
      type: 'rfq',
      rfqId: 'RFQ-2024-456',
      buyer: 'Global Retail Co',
      quantity: 25000,
      targetPrice: 4.50,
      status: 'pending-clarification'
    },
    module: 'rfq-quotation'
  },
  
  // Costing
  {
    id: 'costing-001',
    content: 'Cost breakdown for Style D-220: Total FOB $5.82. Material cost: 62% ($3.61). Labor: 18% ($1.05). Overhead: 20% ($1.16). Current margin: 15%. Fabric price increased 7% due to cotton market volatility. Alternative supplier offers 4% savings.',
    metadata: {
      type: 'costing',
      style: 'D-220',
      fob: 5.82,
      margin: 15,
      materialCost: 3.61
    },
    module: 'costing'
  },
  
  // Production Planning
  {
    id: 'production-001',
    content: 'Order 182 production status: Cutting complete. Sewing progress: 65%. Planned finish: March 10. Delay risk: HIGH - fabric delivery delayed 2 days. Line 5 capacity: 100%. Line 3 utilization: 78%. Recommendation: reallocate 500 units to Line 3 or schedule overtime.',
    metadata: {
      type: 'production',
      orderId: 'Order-182',
      progress: 65,
      delayRisk: 'high',
      line: 5
    },
    module: 'production-planning'
  },
  
  // Quality Control
  {
    id: 'quality-001',
    content: 'Quality alert Line 2: DHU increased to 4.2% (target: 3.0%). Primary defect: broken stitch (+12%). Root cause: needle alignment issue on 3 machines. Impact: 180 garments reworked. Action: operator retraining scheduled, preventive maintenance on all machines.',
    metadata: {
      type: 'quality',
      line: 2,
      dhu: 4.2,
      defectType: 'broken stitch',
      action: 'retraining'
    },
    module: 'quality-control'
  },
  
  // Shipment
  {
    id: 'shipment-001',
    content: 'Container 8X-12 shipping update for Buyer X: Port of loading: Chittagong. Destination: Los Angeles. Status: Delayed 24 hours due to port congestion. Original ETA: March 14. Revised ETA: March 15. Tracking: MAEU4567890. Action: buyer notification sent.',
    metadata: {
      type: 'shipment',
      container: '8X-12',
      status: 'delayed',
      delay: 24,
      destination: 'Los Angeles'
    },
    module: 'shipment'
  },
  
  // Finance
  {
    id: 'finance-001',
    content: 'Cashflow analysis: Projected shortfall March 12 ($125K). Cause: delayed shipment invoicing. Outstanding receivables: $284K. Top debtor: ACME Corp ($84K, 15 days overdue). Recommendation: prioritize collection, consider LC terms for new orders.',
    metadata: {
      type: 'finance',
      shortfall: 125000,
      outstandingTotal: 284000,
      topDebtor: 'ACME Corp'
    },
    module: 'finance'
  },
  
  // Sustainability
  {
    id: 'sustainability-001',
    content: 'Weekly waste report: Total waste: 8.5% (up 5% from last week). Cutting department: 6.2% fabric waste. Root cause: inefficient marker plan for Style X-45. Water consumption: 12L per garment. Energy: 0.8 kWh per unit. Recommendation: optimize marker layout for 3.2% waste reduction.',
    metadata: {
      type: 'sustainability',
      wastePercentage: 8.5,
      department: 'cutting',
      potentialSaving: 3.2
    },
    module: 'sustainability'
  },
  
  // Compliance Policy
  {
    id: 'compliance-001',
    content: 'WRAP compliance policy draft based on SMETA 6.1 and local labor law. Covers: child labor prevention, maximum working hours (48hrs/week + 12hrs OT), health & safety protocols, emergency procedures, grievance mechanism. Last audit: December 2024. Next audit: June 2025.',
    metadata: {
      type: 'compliance',
      standard: 'WRAP',
      lastAudit: '2024-12',
      nextAudit: '2025-06'
    },
    module: 'compliance-policy'
  },
  
  // Workforce Management
  {
    id: 'workforce-001',
    content: 'Workforce analytics: Total employees: 450. Line supervisors: 15. Operators: 385. Support staff: 50. Attendance rate: 94%. Turnover: 8% annually. Training completion: 78%. Productivity (SAM): 92%. Skills gap identified: advanced sewing techniques for premium styles.',
    metadata: {
      type: 'workforce',
      totalEmployees: 450,
      attendance: 94,
      productivity: 92,
      skillsGap: 'advanced sewing'
    },
    module: 'workforce-management'
  },
];

/**
 * Seed the vector database with initial data
 */
export async function seedVectorDatabase(): Promise<void> {
  try {
    console.log('Starting vector database seeding...');
    await batchStoreDocuments(seedData);
    console.log(`Successfully seeded ${seedData.length} documents to vector database`);
  } catch (error) {
    console.error('Error seeding vector database:', error);
    throw error;
  }
}

/**
 * Seed data for a specific module
 */
export async function seedModuleData(module: string): Promise<void> {
  const moduleData = seedData.filter(doc => doc.module === module);
  if (moduleData.length === 0) {
    console.warn(`No seed data found for module: ${module}`);
    return;
  }
  
  try {
    await batchStoreDocuments(moduleData);
    console.log(`Seeded ${moduleData.length} documents for module: ${module}`);
  } catch (error) {
    console.error(`Error seeding module ${module}:`, error);
    throw error;
  }
}
