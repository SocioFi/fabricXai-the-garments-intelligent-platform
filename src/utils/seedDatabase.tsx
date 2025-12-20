/**
 * Database Seeding Utility for FabricXAI
 * Populates the Supabase database with comprehensive mock data for all modules
 */

import { batchStoreData, batchStoreVectorDocuments, MODULE_NAMES } from './supabase';

// ============================================
// Lead Management Mock Data
// ============================================

const leadManagementData = {
  leads: [
    {
      id: 1,
      leadName: 'John Smith',
      company: 'TrendWear UK',
      country: 'United Kingdom',
      source: 'LinkedIn',
      owner: 'Sarah M.',
      score: 92,
      status: 'Qualified',
      email: 'john.smith@trendwear.uk',
      phone: '+44 20 1234 5678',
      industry: 'Fashion Retail',
      employeeCount: '500-1000',
      annualRevenue: '$50M-$100M',
      lastContacted: '2024-10-25',
      createdAt: '2024-09-15',
      tags: ['high-priority', 'fast-fashion', 'sustainability-focus'],
      notes: 'Interested in sustainable cotton fabrics for Spring 2025 collection',
      type: 'lead',
    },
    {
      id: 2,
      leadName: 'Emma Wilson',
      company: 'Fashion Global',
      country: 'USA',
      source: 'Email',
      owner: 'John D.',
      score: 85,
      status: 'Contacted',
      email: 'emma.wilson@fashionglobal.com',
      phone: '+1 212 555 0123',
      industry: 'Fashion Retail',
      employeeCount: '1000-5000',
      annualRevenue: '$100M-$500M',
      lastContacted: '2024-10-26',
      createdAt: '2024-09-20',
      tags: ['enterprise', 'denim-specialist'],
      notes: 'Looking for denim suppliers for US market expansion',
      type: 'lead',
    },
    {
      id: 3,
      leadName: 'Michael Chen',
      company: 'SportStyle Inc',
      country: 'Canada',
      source: 'Trade Show',
      owner: 'Lisa K.',
      score: 78,
      status: 'New',
      email: 'michael.chen@sportstyle.ca',
      phone: '+1 416 555 0198',
      industry: 'Sportswear',
      employeeCount: '100-500',
      annualRevenue: '$10M-$50M',
      lastContacted: '2024-10-20',
      createdAt: '2024-10-18',
      tags: ['sportswear', 'technical-fabrics'],
      notes: 'Met at Toronto Fashion Week, interested in performance fabrics',
      type: 'lead',
    },
    {
      id: 4,
      leadName: 'Sophie Martin',
      company: 'EcoFashion EU',
      country: 'Germany',
      source: 'LinkedIn',
      owner: 'Sarah M.',
      score: 88,
      status: 'RFQ',
      email: 'sophie.martin@ecofashion.de',
      phone: '+49 30 12345678',
      industry: 'Sustainable Fashion',
      employeeCount: '50-100',
      annualRevenue: '$5M-$10M',
      lastContacted: '2024-10-24',
      createdAt: '2024-09-10',
      tags: ['organic', 'GOTS-certified', 'eco-conscious'],
      notes: 'Sent RFQ for organic cotton and recycled polyester',
      type: 'lead',
    },
    {
      id: 5,
      leadName: 'David Lee',
      company: 'Urban Threads',
      country: 'Australia',
      source: 'Website',
      owner: 'John D.',
      score: 65,
      status: 'New',
      email: 'david.lee@urbanthreads.au',
      phone: '+61 2 9876 5432',
      industry: 'Fashion Retail',
      employeeCount: '10-50',
      annualRevenue: '$1M-$5M',
      lastContacted: '2024-10-22',
      createdAt: '2024-10-20',
      tags: ['startup', 'streetwear'],
      notes: 'New brand focusing on streetwear and casual apparel',
      type: 'lead',
    },
    {
      id: 6,
      leadName: 'Marie Dubois',
      company: 'Parisian Couture',
      country: 'France',
      source: 'Referral',
      owner: 'Lisa K.',
      score: 94,
      status: 'Qualified',
      email: 'marie.dubois@parisiancouture.fr',
      phone: '+33 1 42 86 82 00',
      industry: 'Luxury Fashion',
      employeeCount: '200-500',
      annualRevenue: '$20M-$50M',
      lastContacted: '2024-10-27',
      createdAt: '2024-09-05',
      tags: ['luxury', 'high-end', 'premium-fabrics'],
      notes: 'Referred by existing client Zara, looking for premium silk and lace',
      type: 'lead',
    },
  ],
  campaigns: [
    {
      id: 1,
      campaignId: 'CMP-2024-5847',
      name: 'EU Fashion Outreach',
      status: 'Active',
      audience: 'EU Buyers',
      sendWindow: '2024-10-20 - 2024-11-20',
      conversionRate: 12.5,
      emailsSent: 450,
      openRate: 68,
      clickThroughRate: 24,
      responseRate: 15,
      leadsGenerated: 56,
      createdAt: '2024-10-15',
      template: 'Premium Fabric Showcase',
      segment: 'European Fashion Retailers',
      type: 'campaign',
    },
    {
      id: 2,
      campaignId: 'CMP-2024-5848',
      name: 'Sustainable Fabrics',
      status: 'Active',
      audience: 'Eco-conscious Buyers',
      sendWindow: '2024-10-15 - 2024-11-15',
      conversionRate: 18.3,
      emailsSent: 320,
      openRate: 72,
      clickThroughRate: 28,
      responseRate: 18,
      leadsGenerated: 59,
      createdAt: '2024-10-10',
      template: 'Green Textile Initiative',
      segment: 'Sustainability-focused Brands',
      type: 'campaign',
    },
    {
      id: 3,
      campaignId: 'CMP-2024-5845',
      name: 'Trade Show Follow-up',
      status: 'Completed',
      audience: 'Trade Show Contacts',
      sendWindow: '2024-09-01 - 2024-09-30',
      conversionRate: 22.8,
      emailsSent: 280,
      openRate: 65,
      clickThroughRate: 22,
      responseRate: 20,
      leadsGenerated: 64,
      createdAt: '2024-08-25',
      template: 'Thank You & Next Steps',
      segment: 'Trade Show Attendees 2024',
      type: 'campaign',
    },
  ],
  conversations: [
    {
      id: 1,
      contactName: 'John Smith',
      company: 'TrendWear UK',
      channel: 'Email',
      lastMessage: 'Looking forward to the fabric samples. When can I expect delivery?',
      timestamp: '2024-10-27T14:30:00Z',
      status: 'New Reply',
      intent: 'Interest',
      sentiment: 'Positive',
      priority: 'High',
      threadCount: 5,
      unread: true,
      assignedTo: 'Sarah M.',
      type: 'conversation',
    },
    {
      id: 2,
      contactName: 'Emma Wilson',
      company: 'Fashion Global',
      channel: 'WhatsApp',
      lastMessage: 'Can you send pricing for 50,000 yards of denim?',
      timestamp: '2024-10-27T09:15:00Z',
      status: 'New Reply',
      intent: 'RFQ',
      sentiment: 'Neutral',
      priority: 'High',
      threadCount: 3,
      unread: true,
      assignedTo: 'John D.',
      type: 'conversation',
    },
    {
      id: 3,
      contactName: 'Sophie Martin',
      company: 'EcoFashion EU',
      channel: 'LinkedIn',
      lastMessage: 'Thank you for the catalog. Very impressed with your organic cotton range.',
      timestamp: '2024-10-26T16:45:00Z',
      status: 'Follow-up',
      intent: 'Info Request',
      sentiment: 'Positive',
      priority: 'Medium',
      threadCount: 2,
      unread: false,
      assignedTo: 'Sarah M.',
      type: 'conversation',
    },
    {
      id: 4,
      contactName: 'Marie Dubois',
      company: 'Parisian Couture',
      channel: 'Email',
      lastMessage: 'We need premium silk for our Spring collection. Available for a call next week?',
      timestamp: '2024-10-27T11:20:00Z',
      status: 'New Reply',
      intent: 'RFQ',
      sentiment: 'Positive',
      priority: 'High',
      threadCount: 4,
      unread: true,
      assignedTo: 'Lisa K.',
      type: 'conversation',
    },
  ],
};

// ============================================
// Buyer Management Mock Data
// ============================================

const buyerManagementData = {
  buyers: [
    {
      id: 1,
      buyerName: 'H&M',
      tier: 'A',
      country: 'Sweden',
      healthScore: 94,
      revenueYTD: 850000,
      arDays: 28,
      lastContacted: '2024-10-25',
      status: 'Active',
      contact: 'Maria Garcia',
      email: 'maria.garcia@hm.com',
      phone: '+46 8 796 55 00',
      paymentTerms: 'Net 45',
      creditLimit: 2000000,
      outstandingBalance: 125000,
      ordersYTD: 42,
      avgOrderValue: 20238,
      onTimeDeliveryRate: 96,
      qualityRating: 4.8,
      relationship: 'Strategic Partner',
      primaryProducts: ['Cotton T-shirts', 'Denim', 'Knitwear'],
      certifications: ['GOTS', 'OEKO-TEX'],
      type: 'buyer',
    },
    {
      id: 2,
      buyerName: 'Zara',
      tier: 'A',
      country: 'Spain',
      healthScore: 92,
      revenueYTD: 720000,
      arDays: 25,
      lastContacted: '2024-10-26',
      status: 'Active',
      contact: 'Carlos Rodriguez',
      email: 'carlos.rodriguez@zara.com',
      phone: '+34 981 18 54 00',
      paymentTerms: 'Net 30',
      creditLimit: 1800000,
      outstandingBalance: 98000,
      ordersYTD: 38,
      avgOrderValue: 18947,
      onTimeDeliveryRate: 98,
      qualityRating: 4.9,
      relationship: 'Strategic Partner',
      primaryProducts: ['Fast Fashion', 'Seasonal Collections', 'Accessories'],
      certifications: ['GOTS', 'SA8000'],
      type: 'buyer',
    },
    {
      id: 3,
      buyerName: 'Gap',
      tier: 'B',
      country: 'USA',
      healthScore: 78,
      revenueYTD: 620000,
      arDays: 35,
      lastContacted: '2024-10-20',
      status: 'Active',
      contact: 'John Smith',
      email: 'john.smith@gap.com',
      phone: '+1 415 427 0100',
      paymentTerms: 'Net 60',
      creditLimit: 1500000,
      outstandingBalance: 215000,
      ordersYTD: 28,
      avgOrderValue: 22143,
      onTimeDeliveryRate: 89,
      qualityRating: 4.3,
      relationship: 'Regular Customer',
      primaryProducts: ['Casual Wear', 'Denim', 'Kids Apparel'],
      certifications: ['OEKO-TEX'],
      type: 'buyer',
    },
    {
      id: 4,
      buyerName: 'Nike',
      tier: 'A',
      country: 'USA',
      healthScore: 88,
      revenueYTD: 580000,
      arDays: 30,
      lastContacted: '2024-10-24',
      status: 'Active',
      contact: 'Sarah Johnson',
      email: 'sarah.johnson@nike.com',
      phone: '+1 503 671 6453',
      paymentTerms: 'Net 45',
      creditLimit: 1600000,
      outstandingBalance: 145000,
      ordersYTD: 32,
      avgOrderValue: 18125,
      onTimeDeliveryRate: 94,
      qualityRating: 4.7,
      relationship: 'Strategic Partner',
      primaryProducts: ['Performance Fabrics', 'Sportswear', 'Technical Textiles'],
      certifications: ['OEKO-TEX', 'bluesign'],
      type: 'buyer',
    },
    {
      id: 5,
      buyerName: 'Uniqlo',
      tier: 'B',
      country: 'Japan',
      healthScore: 82,
      revenueYTD: 540000,
      arDays: 32,
      lastContacted: '2024-10-23',
      status: 'Active',
      contact: 'Yuki Tanaka',
      email: 'yuki.tanaka@uniqlo.co.jp',
      phone: '+81 3 6786 1000',
      paymentTerms: 'Net 45',
      creditLimit: 1400000,
      outstandingBalance: 172000,
      ordersYTD: 30,
      avgOrderValue: 18000,
      onTimeDeliveryRate: 92,
      qualityRating: 4.6,
      relationship: 'Regular Customer',
      primaryProducts: ['Basic Apparel', 'AIRism', 'Heattech'],
      certifications: ['OEKO-TEX'],
      type: 'buyer',
    },
    {
      id: 6,
      buyerName: 'ACME Fashion',
      tier: 'C',
      country: 'United Kingdom',
      healthScore: 62,
      revenueYTD: 280000,
      arDays: 48,
      lastContacted: '2024-10-15',
      status: 'At Risk',
      contact: 'Oliver Brown',
      email: 'oliver.brown@acmefashion.co.uk',
      phone: '+44 20 7946 0958',
      paymentTerms: 'Net 60',
      creditLimit: 500000,
      outstandingBalance: 98000,
      ordersYTD: 18,
      avgOrderValue: 15556,
      onTimeDeliveryRate: 82,
      qualityRating: 4.1,
      relationship: 'Regular Customer',
      primaryProducts: ['Mid-range Fashion', 'Accessories'],
      certifications: [],
      type: 'buyer',
    },
  ],
  issues: [
    {
      id: 1,
      issueId: 'ISS-2024-421',
      buyer: 'Gap',
      buyerId: 3,
      category: 'Quality',
      severity: 'High',
      owner: 'Production',
      status: 'In Progress',
      targetDate: '2024-11-05',
      createdAt: '2024-10-20',
      description: 'Fabric color variation in latest shipment batch',
      impact: 'Customer complaints about inconsistent product quality',
      rootCause: 'Dye lot variation in supplier batch',
      actionPlan: 'Implement stricter QC checks, re-dye affected batch',
      estimatedCost: 15000,
      type: 'issue',
    },
    {
      id: 2,
      issueId: 'ISS-2024-422',
      buyer: 'ACME Fashion',
      buyerId: 6,
      category: 'Delivery',
      severity: 'Critical',
      owner: 'Logistics',
      status: 'Escalated',
      targetDate: '2024-11-02',
      createdAt: '2024-10-18',
      description: 'Late delivery causing stock-out for seasonal launch',
      impact: 'Customer unable to meet retail deadline, potential contract penalty',
      rootCause: 'Shipping delay due to port congestion',
      actionPlan: 'Expedite shipment via air freight, negotiate penalty waiver',
      estimatedCost: 25000,
      type: 'issue',
    },
    {
      id: 3,
      issueId: 'ISS-2024-423',
      buyer: 'Zara',
      buyerId: 2,
      category: 'Communication',
      severity: 'Medium',
      owner: 'Merchandising',
      status: 'Pending',
      targetDate: '2024-11-08',
      createdAt: '2024-10-22',
      description: 'Delayed response to design change request',
      impact: 'Minor delay in sample approval timeline',
      rootCause: 'Miscommunication between design and production teams',
      actionPlan: 'Implement new communication protocol, assign dedicated POC',
      estimatedCost: 0,
      type: 'issue',
    },
  ],
  feedback: [
    {
      id: 1,
      feedbackId: 'FB-2024-001',
      buyer: 'H&M',
      buyerId: 1,
      sentiment: 'Positive',
      category: 'Quality',
      rating: 5,
      date: '2024-10-25',
      comment: 'Excellent fabric quality and consistent standards. Very satisfied with the latest shipment.',
      source: 'Email Survey',
      respondent: 'Maria Garcia',
      followUpRequired: false,
      tags: ['quality-excellence', 'customer-satisfaction'],
      type: 'feedback',
    },
    {
      id: 2,
      feedbackId: 'FB-2024-002',
      buyer: 'Zara',
      buyerId: 2,
      sentiment: 'Neutral',
      category: 'Delivery',
      rating: 3,
      date: '2024-10-24',
      comment: 'Delivery was on time but packaging could be improved to prevent fabric damage.',
      source: 'Phone Call',
      respondent: 'Carlos Rodriguez',
      followUpRequired: true,
      tags: ['packaging-improvement'],
      type: 'feedback',
    },
    {
      id: 3,
      feedbackId: 'FB-2024-003',
      buyer: 'Nike',
      buyerId: 4,
      sentiment: 'Positive',
      category: 'Service',
      rating: 5,
      date: '2024-10-23',
      comment: 'Great customer service and quick response to our technical questions. The team is very knowledgeable.',
      source: 'Email Survey',
      respondent: 'Sarah Johnson',
      followUpRequired: false,
      tags: ['service-excellence', 'technical-support'],
      type: 'feedback',
    },
    {
      id: 4,
      feedbackId: 'FB-2024-004',
      buyer: 'Gap',
      buyerId: 3,
      sentiment: 'Negative',
      category: 'Quality',
      rating: 2,
      date: '2024-10-20',
      comment: 'Recent batch had color inconsistencies. This is affecting our production schedule.',
      source: 'Complaint',
      respondent: 'John Smith',
      followUpRequired: true,
      tags: ['quality-issue', 'urgent-action'],
      type: 'feedback',
    },
  ],
};

// ============================================
// RFQ & Quotation Mock Data
// ============================================

const rfqQuotationData = {
  rfqs: [
    {
      id: 1,
      rfqId: 'RFQ-2024-1847',
      buyer: 'H&M',
      buyerId: 1,
      product: 'Cotton Jersey T-shirts',
      quantity: 50000,
      units: 'pieces',
      targetPrice: 4.50,
      currentQuote: 4.75,
      dueDate: '2024-11-10',
      status: 'Open',
      priority: 'High',
      createdAt: '2024-10-15',
      fabric: 'Cotton Jersey 180 GSM',
      colors: ['White', 'Black', 'Navy', 'Grey'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      destination: 'Stockholm, Sweden',
      incoterms: 'FOB',
      paymentTerms: 'Net 45',
      requiredCertifications: ['GOTS', 'OEKO-TEX'],
      specialRequirements: 'Organic cotton preferred, pre-shrunk fabric',
      assignedTo: 'Sarah M.',
      type: 'rfq',
    },
    {
      id: 2,
      rfqId: 'RFQ-2024-1848',
      buyer: 'Zara',
      buyerId: 2,
      product: 'Denim Jeans',
      quantity: 30000,
      units: 'pieces',
      targetPrice: 12.00,
      currentQuote: 12.50,
      dueDate: '2024-11-15',
      status: 'Quoted',
      priority: 'High',
      createdAt: '2024-10-18',
      fabric: 'Denim 12oz',
      colors: ['Indigo', 'Black', 'Light Blue'],
      sizes: ['28', '30', '32', '34', '36'],
      destination: 'Barcelona, Spain',
      incoterms: 'FOB',
      paymentTerms: 'Net 30',
      requiredCertifications: ['OEKO-TEX'],
      specialRequirements: 'Stretch denim, stone washed finish',
      assignedTo: 'John D.',
      type: 'rfq',
    },
    {
      id: 3,
      rfqId: 'RFQ-2024-1849',
      buyer: 'Nike',
      buyerId: 4,
      product: 'Performance Activewear',
      quantity: 20000,
      units: 'pieces',
      targetPrice: 8.50,
      currentQuote: 8.95,
      dueDate: '2024-11-20',
      status: 'Negotiation',
      priority: 'Medium',
      createdAt: '2024-10-20',
      fabric: 'Polyester Blend with Moisture Wicking',
      colors: ['Black', 'Navy', 'Grey', 'Red'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      destination: 'Portland, USA',
      incoterms: 'CIF',
      paymentTerms: 'Net 45',
      requiredCertifications: ['bluesign', 'OEKO-TEX'],
      specialRequirements: 'Anti-bacterial treatment, 4-way stretch',
      assignedTo: 'Lisa K.',
      type: 'rfq',
    },
    {
      id: 4,
      rfqId: 'RFQ-2024-1850',
      buyer: 'Gap',
      buyerId: 3,
      product: 'Kids Casual Wear',
      quantity: 15000,
      units: 'pieces',
      targetPrice: 5.50,
      currentQuote: null,
      dueDate: '2024-11-08',
      status: 'Open',
      priority: 'Low',
      createdAt: '2024-10-22',
      fabric: 'Cotton Fleece 280 GSM',
      colors: ['Pink', 'Blue', 'Yellow', 'Green'],
      sizes: ['2T', '3T', '4T', '5T', '6T'],
      destination: 'San Francisco, USA',
      incoterms: 'FOB',
      paymentTerms: 'Net 60',
      requiredCertifications: ['OEKO-TEX'],
      specialRequirements: 'Soft hand feel, no harmful chemicals',
      assignedTo: 'Sarah M.',
      type: 'rfq',
    },
    {
      id: 5,
      rfqId: 'RFQ-2024-1851',
      buyer: 'Uniqlo',
      buyerId: 5,
      product: 'AIRism Underwear',
      quantity: 40000,
      units: 'pieces',
      targetPrice: 3.20,
      currentQuote: 3.45,
      dueDate: '2024-11-12',
      status: 'Awarded',
      priority: 'High',
      createdAt: '2024-10-12',
      fabric: 'AIRism Microfiber',
      colors: ['White', 'Beige', 'Grey', 'Black'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      destination: 'Tokyo, Japan',
      incoterms: 'FOB',
      paymentTerms: 'Net 45',
      requiredCertifications: ['OEKO-TEX'],
      specialRequirements: 'Seamless construction, moisture wicking',
      assignedTo: 'John D.',
      awardedDate: '2024-10-25',
      type: 'rfq',
    },
  ],
  quotes: [
    {
      id: 1,
      quoteId: 'QT-2024-2547',
      rfqId: 'RFQ-2024-1847',
      rfqNumber: 1,
      scenarioName: 'Standard Production',
      version: 1,
      status: 'Active',
      totalPrice: 237500,
      unitPrice: 4.75,
      validUntil: '2024-11-20',
      createdAt: '2024-10-16',
      createdBy: 'Sarah M.',
      materialCost: 150000,
      laborCost: 50000,
      overheadCost: 25000,
      profitMargin: 12500,
      profitPercent: 5.26,
      leadTime: 45,
      moq: 10000,
      notes: 'Standard production with GOTS certified organic cotton',
      type: 'quote',
    },
    {
      id: 2,
      quoteId: 'QT-2024-2548',
      rfqId: 'RFQ-2024-1848',
      rfqNumber: 2,
      scenarioName: 'Premium Denim',
      version: 1,
      status: 'Active',
      totalPrice: 375000,
      unitPrice: 12.50,
      validUntil: '2024-11-25',
      createdAt: '2024-10-19',
      createdBy: 'John D.',
      materialCost: 225000,
      laborCost: 90000,
      overheadCost: 45000,
      profitMargin: 15000,
      profitPercent: 4.17,
      leadTime: 60,
      moq: 5000,
      notes: 'Premium stretch denim with stone wash finish',
      type: 'quote',
    },
  ],
};

// ============================================
// Costing Module Mock Data
// ============================================

const costingData = {
  costSheets: [
    {
      id: 1,
      costSheetId: 'CS-2024-3847',
      styleNumber: 'TS-2024-H&M-001',
      product: 'Cotton Jersey T-shirt',
      buyer: 'H&M',
      buyerId: 1,
      season: 'Spring 2025',
      status: 'Approved',
      version: 2,
      createdAt: '2024-10-10',
      updatedAt: '2024-10-20',
      createdBy: 'Sarah M.',
      approvedBy: 'John Manager',
      approvedDate: '2024-10-20',
      quantity: 50000,
      currency: 'USD',
      // Material Costs
      fabricCost: 2.20,
      trimsCost: 0.45,
      packagingCost: 0.25,
      totalMaterialCost: 2.90,
      // Labor Costs
      cuttingCost: 0.30,
      sewingCost: 0.85,
      finishingCost: 0.25,
      totalLaborCost: 1.40,
      // Overhead & Other
      overheadCost: 0.35,
      commercialCost: 0.10,
      totalOverheadCost: 0.45,
      // Pricing
      totalCostPerUnit: 4.75,
      targetPrice: 4.50,
      quotedPrice: 4.75,
      profitMargin: 0.00,
      profitPercent: 0.00,
      fobPrice: 4.75,
      // Margin Health
      marginHealth: 'At Risk',
      competitiveIndex: 78,
      // Details
      fabricDetails: [
        { type: 'Cotton Jersey 180 GSM', consumption: '0.45 kg', rate: 4.89, amount: 2.20 },
      ],
      trimsDetails: [
        { type: 'Thread', consumption: '50 m', rate: 0.002, amount: 0.10 },
        { type: 'Label', consumption: '2 pcs', rate: 0.05, amount: 0.10 },
        { type: 'Hang Tag', consumption: '1 pc', rate: 0.15, amount: 0.15 },
        { type: 'Accessories', consumption: '1 set', rate: 0.10, amount: 0.10 },
      ],
      laborDetails: [
        { operation: 'Fabric Cutting', hours: 0.05, rate: 6.00, amount: 0.30 },
        { operation: 'Sewing', hours: 0.17, rate: 5.00, amount: 0.85 },
        { operation: 'Pressing & Finishing', hours: 0.05, rate: 5.00, amount: 0.25 },
      ],
      notes: 'GOTS certified organic cotton, revised pricing after supplier negotiation',
      type: 'costSheet',
    },
    {
      id: 2,
      costSheetId: 'CS-2024-3848',
      styleNumber: 'DJ-2024-ZARA-001',
      product: 'Denim Jeans',
      buyer: 'Zara',
      buyerId: 2,
      season: 'Fall 2024',
      status: 'In Progress',
      version: 1,
      createdAt: '2024-10-18',
      updatedAt: '2024-10-18',
      createdBy: 'John D.',
      approvedBy: null,
      approvedDate: null,
      quantity: 30000,
      currency: 'USD',
      // Material Costs
      fabricCost: 6.50,
      trimsCost: 1.20,
      packagingCost: 0.35,
      totalMaterialCost: 8.05,
      // Labor Costs
      cuttingCost: 0.50,
      sewingCost: 2.80,
      finishingCost: 0.65,
      totalLaborCost: 3.95,
      // Overhead & Other
      overheadCost: 0.45,
      commercialCost: 0.15,
      totalOverheadCost: 0.60,
      // Pricing
      totalCostPerUnit: 12.60,
      targetPrice: 12.00,
      quotedPrice: 12.50,
      profitMargin: -0.10,
      profitPercent: -0.79,
      fobPrice: 12.50,
      // Margin Health
      marginHealth: 'Critical',
      competitiveIndex: 72,
      // Details
      fabricDetails: [
        { type: 'Denim 12oz Stretch', consumption: '1.2 m', rate: 5.42, amount: 6.50 },
      ],
      trimsDetails: [
        { type: 'Thread', consumption: '80 m', rate: 0.002, amount: 0.16 },
        { type: 'Zipper', consumption: '1 pc', rate: 0.35, amount: 0.35 },
        { type: 'Rivets & Buttons', consumption: '1 set', rate: 0.25, amount: 0.25 },
        { type: 'Label & Hang Tag', consumption: '1 set', rate: 0.20, amount: 0.20 },
        { type: 'Pocket Fabric', consumption: '0.3 m', rate: 0.80, amount: 0.24 },
      ],
      laborDetails: [
        { operation: 'Pattern Making', hours: 0.08, rate: 6.25, amount: 0.50 },
        { operation: 'Cutting', hours: 0.10, rate: 5.00, amount: 0.50 },
        { operation: 'Sewing', hours: 0.56, rate: 5.00, amount: 2.80 },
        { operation: 'Washing & Finishing', hours: 0.13, rate: 5.00, amount: 0.65 },
      ],
      notes: 'Stone washed finish adds to labor cost, need to optimize material usage',
      type: 'costSheet',
    },
    {
      id: 3,
      costSheetId: 'CS-2024-3849',
      styleNumber: 'PA-2024-NIKE-001',
      product: 'Performance Activewear Top',
      buyer: 'Nike',
      buyerId: 4,
      season: 'Spring 2025',
      status: 'Approved',
      version: 1,
      createdAt: '2024-10-20',
      updatedAt: '2024-10-24',
      createdBy: 'Lisa K.',
      approvedBy: 'Jane Director',
      approvedDate: '2024-10-24',
      quantity: 20000,
      currency: 'USD',
      // Material Costs
      fabricCost: 4.80,
      trimsCost: 0.65,
      packagingCost: 0.30,
      totalMaterialCost: 5.75,
      // Labor Costs
      cuttingCost: 0.40,
      sewingCost: 1.90,
      finishingCost: 0.35,
      totalLaborCost: 2.65,
      // Overhead & Other
      overheadCost: 0.40,
      commercialCost: 0.12,
      totalOverheadCost: 0.52,
      // Pricing
      totalCostPerUnit: 8.92,
      targetPrice: 8.50,
      quotedPrice: 8.95,
      profitMargin: 0.03,
      profitPercent: 0.34,
      fobPrice: 8.95,
      // Margin Health
      marginHealth: 'At Risk',
      competitiveIndex: 85,
      // Details
      fabricDetails: [
        { type: 'Polyester Blend Performance Fabric', consumption: '0.6 kg', rate: 8.00, amount: 4.80 },
      ],
      trimsDetails: [
        { type: 'Performance Thread', consumption: '60 m', rate: 0.003, amount: 0.18 },
        { type: 'Elastic Binding', consumption: '1.2 m', rate: 0.15, amount: 0.18 },
        { type: 'Label Set', consumption: '1 set', rate: 0.12, amount: 0.12 },
        { type: 'Reflective Tape', consumption: '0.3 m', rate: 0.55, amount: 0.17 },
      ],
      laborDetails: [
        { operation: 'Cutting', hours: 0.08, rate: 5.00, amount: 0.40 },
        { operation: 'Sewing', hours: 0.38, rate: 5.00, amount: 1.90 },
        { operation: 'Quality Check & Finishing', hours: 0.07, rate: 5.00, amount: 0.35 },
      ],
      notes: 'Technical fabric with moisture wicking and anti-bacterial treatment',
      type: 'costSheet',
    },
  ],
};

// ============================================
// Production Planning Mock Data
// ============================================

const productionPlanningData = {
  orders: [
    {
      id: 1,
      orderId: 'PO-2024-8547',
      buyer: 'H&M',
      buyerId: 1,
      product: 'Cotton Jersey T-shirts',
      style: 'TS-2024-H&M-001',
      quantity: 50000,
      status: 'In Production',
      priority: 'High',
      startDate: '2024-10-20',
      endDate: '2024-12-05',
      progress: 45,
      line: 'Line A',
      productionFloor: 'Floor 1',
      // Planning
      plannedStart: '2024-10-20',
      plannedEnd: '2024-12-05',
      actualStart: '2024-10-20',
      actualEnd: null,
      // Quantities
      plannedQuantity: 50000,
      producedQuantity: 22500,
      passedQuantity: 21600,
      failedQuantity: 900,
      remainingQuantity: 27500,
      // Efficiency
      dailyTarget: 1200,
      dailyActual: 1080,
      efficiency: 90,
      onTimeStatus: 'On Track',
      // Quality
      qualityScore: 96,
      defectRate: 4.0,
      reworkRate: 2.5,
      // Resources
      workersAssigned: 45,
      machinesAllocated: 12,
      supervisor: 'Rajesh Kumar',
      // Shipment
      shipmentDate: '2024-12-10',
      destination: 'Stockholm, Sweden',
      type: 'productionOrder',
    },
    {
      id: 2,
      orderId: 'PO-2024-8548',
      buyer: 'Zara',
      buyerId: 2,
      product: 'Denim Jeans',
      style: 'DJ-2024-ZARA-001',
      quantity: 30000,
      status: 'Planning',
      priority: 'High',
      startDate: '2024-11-01',
      endDate: '2024-12-20',
      progress: 0,
      line: 'Line B',
      productionFloor: 'Floor 2',
      // Planning
      plannedStart: '2024-11-01',
      plannedEnd: '2024-12-20',
      actualStart: null,
      actualEnd: null,
      // Quantities
      plannedQuantity: 30000,
      producedQuantity: 0,
      passedQuantity: 0,
      failedQuantity: 0,
      remainingQuantity: 30000,
      // Efficiency
      dailyTarget: 800,
      dailyActual: 0,
      efficiency: 0,
      onTimeStatus: 'Not Started',
      // Quality
      qualityScore: null,
      defectRate: null,
      reworkRate: null,
      // Resources
      workersAssigned: 35,
      machinesAllocated: 10,
      supervisor: 'Maria Santos',
      // Shipment
      shipmentDate: '2024-12-25',
      destination: 'Barcelona, Spain',
      type: 'productionOrder',
    },
    {
      id: 3,
      orderId: 'PO-2024-8549',
      buyer: 'Nike',
      buyerId: 4,
      product: 'Performance Activewear',
      style: 'PA-2024-NIKE-001',
      quantity: 20000,
      status: 'Completed',
      priority: 'Medium',
      startDate: '2024-09-15',
      endDate: '2024-10-25',
      progress: 100,
      line: 'Line C',
      productionFloor: 'Floor 3',
      // Planning
      plannedStart: '2024-09-15',
      plannedEnd: '2024-10-25',
      actualStart: '2024-09-15',
      actualEnd: '2024-10-24',
      // Quantities
      plannedQuantity: 20000,
      producedQuantity: 20000,
      passedQuantity: 19400,
      failedQuantity: 600,
      remainingQuantity: 0,
      // Efficiency
      dailyTarget: 600,
      dailyActual: 620,
      efficiency: 103,
      onTimeStatus: 'Early Completion',
      // Quality
      qualityScore: 97,
      defectRate: 3.0,
      reworkRate: 1.8,
      // Resources
      workersAssigned: 28,
      machinesAllocated: 8,
      supervisor: 'Ahmed Hassan',
      // Shipment
      shipmentDate: '2024-10-28',
      destination: 'Portland, USA',
      type: 'productionOrder',
    },
    {
      id: 4,
      orderId: 'PO-2024-8550',
      buyer: 'Gap',
      buyerId: 3,
      product: 'Kids Casual Wear',
      style: 'KC-2024-GAP-001',
      quantity: 15000,
      status: 'Delayed',
      priority: 'Low',
      startDate: '2024-10-15',
      endDate: '2024-11-30',
      progress: 35,
      line: 'Line A',
      productionFloor: 'Floor 1',
      // Planning
      plannedStart: '2024-10-15',
      plannedEnd: '2024-11-30',
      actualStart: '2024-10-18',
      actualEnd: null,
      // Quantities
      plannedQuantity: 15000,
      producedQuantity: 5250,
      passedQuantity: 4935,
      failedQuantity: 315,
      remainingQuantity: 9750,
      // Efficiency
      dailyTarget: 500,
      dailyActual: 380,
      efficiency: 76,
      onTimeStatus: 'At Risk',
      // Quality
      qualityScore: 94,
      defectRate: 6.0,
      reworkRate: 3.2,
      // Resources
      workersAssigned: 22,
      machinesAllocated: 6,
      supervisor: 'Lin Wei',
      // Shipment
      shipmentDate: '2024-12-05',
      destination: 'San Francisco, USA',
      type: 'productionOrder',
    },
    {
      id: 5,
      orderId: 'PO-2024-8551',
      buyer: 'Uniqlo',
      buyerId: 5,
      product: 'AIRism Underwear',
      style: 'AI-2024-UNQ-001',
      quantity: 40000,
      status: 'In Production',
      priority: 'High',
      startDate: '2024-10-25',
      endDate: '2024-12-10',
      progress: 28,
      line: 'Line D',
      productionFloor: 'Floor 2',
      // Planning
      plannedStart: '2024-10-25',
      plannedEnd: '2024-12-10',
      actualStart: '2024-10-25',
      actualEnd: null,
      // Quantities
      plannedQuantity: 40000,
      producedQuantity: 11200,
      passedQuantity: 10920,
      failedQuantity: 280,
      remainingQuantity: 28800,
      // Efficiency
      dailyTarget: 1000,
      dailyActual: 935,
      efficiency: 93.5,
      onTimeStatus: 'On Track',
      // Quality
      qualityScore: 97.5,
      defectRate: 2.5,
      reworkRate: 1.2,
      // Resources
      workersAssigned: 38,
      machinesAllocated: 10,
      supervisor: 'Priya Sharma',
      // Shipment
      shipmentDate: '2024-12-15',
      destination: 'Tokyo, Japan',
      type: 'productionOrder',
    },
  ],
  capacityData: [
    {
      id: 1,
      line: 'Line A',
      floor: 'Floor 1',
      capacity: 1500,
      utilized: 1200,
      available: 300,
      efficiency: 80,
      utilization: 80,
      workers: 45,
      maxWorkers: 50,
      machines: 12,
      maxMachines: 15,
      currentOrder: 'PO-2024-8547',
      status: 'Active',
      type: 'capacityPlanning',
    },
    {
      id: 2,
      line: 'Line B',
      floor: 'Floor 2',
      capacity: 1200,
      utilized: 0,
      available: 1200,
      efficiency: 0,
      utilization: 0,
      workers: 0,
      maxWorkers: 40,
      machines: 0,
      maxMachines: 12,
      currentOrder: null,
      status: 'Idle',
      type: 'capacityPlanning',
    },
    {
      id: 3,
      line: 'Line C',
      floor: 'Floor 3',
      capacity: 800,
      utilized: 0,
      available: 800,
      efficiency: 0,
      utilization: 0,
      workers: 0,
      maxWorkers: 30,
      machines: 0,
      maxMachines: 10,
      currentOrder: null,
      status: 'Idle',
      type: 'capacityPlanning',
    },
    {
      id: 4,
      line: 'Line D',
      floor: 'Floor 2',
      capacity: 1300,
      utilized: 1000,
      available: 300,
      efficiency: 93.5,
      utilization: 76.9,
      workers: 38,
      maxWorkers: 45,
      machines: 10,
      maxMachines: 12,
      currentOrder: 'PO-2024-8551',
      status: 'Active',
      type: 'capacityPlanning',
    },
  ],
};

// ============================================
// Quality Control Mock Data
// ============================================

const qualityControlData = {
  inspections: [
    {
      id: 1,
      inspectionId: 'QC-2024-4521',
      orderId: 'PO-2024-8547',
      product: 'Cotton Jersey T-shirts',
      buyer: 'H&M',
      buyerId: 1,
      stage: 'In-line',
      status: 'Passed',
      inspectionDate: '2024-10-25',
      inspector: 'Anita Sharma',
      // Quantities
      lotSize: 5000,
      sampleSize: 200,
      inspectedQuantity: 200,
      passedQuantity: 196,
      failedQuantity: 4,
      // Results
      aqlLevel: 'II',
      aqlStandard: '2.5',
      defectRate: 2.0,
      passRate: 98.0,
      overallRating: 'Excellent',
      score: 98,
      // Defects
      criticalDefects: 0,
      majorDefects: 3,
      minorDefects: 1,
      // Categories
      fabricDefects: 1,
      constructionDefects: 2,
      measurementDefects: 1,
      colorDefects: 0,
      packagingDefects: 0,
      // Details
      comments: 'Minor stitching issues found, corrective action taken immediately',
      correctiveAction: 'Adjusted sewing machine tension, re-trained operator',
      followUpRequired: false,
      type: 'inspection',
    },
    {
      id: 2,
      inspectionId: 'QC-2024-4522',
      orderId: 'PO-2024-8549',
      product: 'Performance Activewear',
      buyer: 'Nike',
      buyerId: 4,
      stage: 'Final',
      status: 'Passed',
      inspectionDate: '2024-10-24',
      inspector: 'Rajesh Kumar',
      // Quantities
      lotSize: 20000,
      sampleSize: 315,
      inspectedQuantity: 315,
      passedQuantity: 308,
      failedQuantity: 7,
      // Results
      aqlLevel: 'II',
      aqlStandard: '1.5',
      defectRate: 2.2,
      passRate: 97.8,
      overallRating: 'Excellent',
      score: 97.8,
      // Defects
      criticalDefects: 0,
      majorDefects: 5,
      minorDefects: 2,
      // Categories
      fabricDefects: 2,
      constructionDefects: 3,
      measurementDefects: 1,
      colorDefects: 1,
      packagingDefects: 0,
      // Details
      comments: 'Overall excellent quality, meets Nike standards',
      correctiveAction: 'None required',
      followUpRequired: false,
      type: 'inspection',
    },
    {
      id: 3,
      inspectionId: 'QC-2024-4523',
      orderId: 'PO-2024-8550',
      product: 'Kids Casual Wear',
      buyer: 'Gap',
      buyerId: 3,
      stage: 'In-line',
      status: 'Failed',
      inspectionDate: '2024-10-26',
      inspector: 'Maria Santos',
      // Quantities
      lotSize: 3000,
      sampleSize: 125,
      inspectedQuantity: 125,
      passedQuantity: 110,
      failedQuantity: 15,
      // Results
      aqlLevel: 'II',
      aqlStandard: '2.5',
      defectRate: 12.0,
      passRate: 88.0,
      overallRating: 'Poor',
      score: 88,
      // Defects
      criticalDefects: 2,
      majorDefects: 10,
      minorDefects: 3,
      // Categories
      fabricDefects: 5,
      constructionDefects: 7,
      measurementDefects: 2,
      colorDefects: 1,
      packagingDefects: 0,
      // Details
      comments: 'High defect rate in fabric cutting and construction. Production halted for correction.',
      correctiveAction: 'Recalibrate cutting machines, retrain sewing operators, 100% inspection implemented',
      followUpRequired: true,
      type: 'inspection',
    },
    {
      id: 4,
      inspectionId: 'QC-2024-4524',
      orderId: 'PO-2024-8551',
      product: 'AIRism Underwear',
      buyer: 'Uniqlo',
      buyerId: 5,
      stage: 'In-line',
      status: 'Passed',
      inspectionDate: '2024-10-27',
      inspector: 'Ahmed Hassan',
      // Quantities
      lotSize: 4000,
      sampleSize: 150,
      inspectedQuantity: 150,
      passedQuantity: 147,
      failedQuantity: 3,
      // Results
      aqlLevel: 'II',
      aqlStandard: '1.5',
      defectRate: 2.0,
      passRate: 98.0,
      overallRating: 'Excellent',
      score: 98,
      // Defects
      criticalDefects: 0,
      majorDefects: 2,
      minorDefects: 1,
      // Categories
      fabricDefects: 1,
      constructionDefects: 1,
      measurementDefects: 1,
      colorDefects: 0,
      packagingDefects: 0,
      // Details
      comments: 'Seamless construction quality excellent, minor measurement variations within tolerance',
      correctiveAction: 'Monitor measurement consistency in next batch',
      followUpRequired: false,
      type: 'inspection',
    },
  ],
  defects: [
    {
      id: 1,
      defectId: 'DEF-2024-8741',
      inspectionId: 'QC-2024-4523',
      orderId: 'PO-2024-8550',
      category: 'Construction',
      type: 'Stitching',
      severity: 'Major',
      description: 'Irregular stitching on side seam',
      quantity: 7,
      location: 'Side seam',
      detectedBy: 'Maria Santos',
      detectedDate: '2024-10-26',
      status: 'Resolved',
      resolution: 'Re-stitched affected pieces',
      resolvedDate: '2024-10-26',
      type: 'defect',
    },
    {
      id: 2,
      defectId: 'DEF-2024-8742',
      inspectionId: 'QC-2024-4523',
      orderId: 'PO-2024-8550',
      category: 'Fabric',
      type: 'Fabric Fault',
      severity: 'Critical',
      description: 'Holes in fabric',
      quantity: 2,
      location: 'Front body',
      detectedBy: 'Maria Santos',
      detectedDate: '2024-10-26',
      status: 'Resolved',
      resolution: 'Replaced fabric, rejected pieces',
      resolvedDate: '2024-10-26',
      type: 'defect',
    },
    {
      id: 3,
      defectId: 'DEF-2024-8743',
      inspectionId: 'QC-2024-4521',
      orderId: 'PO-2024-8547',
      category: 'Construction',
      type: 'Loose Thread',
      severity: 'Minor',
      description: 'Loose threads at hem',
      quantity: 1,
      location: 'Bottom hem',
      detectedBy: 'Anita Sharma',
      detectedDate: '2024-10-25',
      status: 'Resolved',
      resolution: 'Trimmed loose threads',
      resolvedDate: '2024-10-25',
      type: 'defect',
    },
  ],
};

// ============================================
// Seeding Functions
// ============================================

/**
 * Seed all modules with mock data
 */
export async function seedAllModules(): Promise<void> {
  console.log('🌱 Starting database seeding...');
  
  try {
    await Promise.all([
      seedLeadManagement(),
      seedBuyerManagement(),
      seedRFQQuotation(),
      seedCosting(),
      seedProductionPlanning(),
      seedQualityControl(),
    ]);
    
    console.log('✅ Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    throw error;
  }
}

/**
 * Seed Lead Management module
 */
export async function seedLeadManagement(): Promise<void> {
  console.log('📊 Seeding Lead Management...');
  
  const records = [
    ...leadManagementData.leads.map(lead => ({
      key: `lead-${lead.id}-${Date.now()}`,
      data: lead,
    })),
    ...leadManagementData.campaigns.map(campaign => ({
      key: `campaign-${campaign.id}-${Date.now()}`,
      data: campaign,
    })),
    ...leadManagementData.conversations.map(conversation => ({
      key: `conversation-${conversation.id}-${Date.now()}`,
      data: conversation,
    })),
  ];
  
  await batchStoreData(records, MODULE_NAMES.LEAD_MANAGEMENT);
  
  // Store in vector DB for AI search
  const vectorDocs = leadManagementData.leads.map(lead => ({
    id: `lead-${lead.id}`,
    content: `${lead.leadName} ${lead.company} ${lead.country} ${lead.source} ${lead.status} ${lead.industry} ${lead.notes}`,
    metadata: lead,
  }));
  
  await batchStoreVectorDocuments(vectorDocs, MODULE_NAMES.LEAD_MANAGEMENT);
  
  console.log(`  ✓ Seeded ${leadManagementData.leads.length} leads`);
  console.log(`  ✓ Seeded ${leadManagementData.campaigns.length} campaigns`);
  console.log(`  ✓ Seeded ${leadManagementData.conversations.length} conversations`);
}

/**
 * Seed Buyer Management module
 */
export async function seedBuyerManagement(): Promise<void> {
  console.log('👥 Seeding Buyer Management...');
  
  const records = [
    ...buyerManagementData.buyers.map(buyer => ({
      key: `buyer-${buyer.id}-${Date.now()}`,
      data: buyer,
    })),
    ...buyerManagementData.issues.map(issue => ({
      key: `issue-${issue.id}-${Date.now()}`,
      data: issue,
    })),
    ...buyerManagementData.feedback.map(fb => ({
      key: `feedback-${fb.id}-${Date.now()}`,
      data: fb,
    })),
  ];
  
  await batchStoreData(records, MODULE_NAMES.BUYER_MANAGEMENT);
  
  // Store in vector DB for AI search
  const vectorDocs = buyerManagementData.buyers.map(buyer => ({
    id: `buyer-${buyer.id}`,
    content: `${buyer.buyerName} ${buyer.country} ${buyer.tier} ${buyer.contact} ${buyer.status} ${buyer.primaryProducts.join(' ')}`,
    metadata: buyer,
  }));
  
  await batchStoreVectorDocuments(vectorDocs, MODULE_NAMES.BUYER_MANAGEMENT);
  
  console.log(`  ✓ Seeded ${buyerManagementData.buyers.length} buyers`);
  console.log(`  ✓ Seeded ${buyerManagementData.issues.length} issues`);
  console.log(`  ✓ Seeded ${buyerManagementData.feedback.length} feedback`);
}

/**
 * Seed RFQ & Quotation module
 */
export async function seedRFQQuotation(): Promise<void> {
  console.log('📝 Seeding RFQ & Quotation...');
  
  const records = [
    ...rfqQuotationData.rfqs.map(rfq => ({
      key: `rfq-${rfq.id}-${Date.now()}`,
      data: rfq,
    })),
    ...rfqQuotationData.quotes.map(quote => ({
      key: `quote-${quote.id}-${Date.now()}`,
      data: quote,
    })),
  ];
  
  await batchStoreData(records, MODULE_NAMES.RFQ_QUOTATION);
  
  // Store in vector DB for AI search
  const vectorDocs = rfqQuotationData.rfqs.map(rfq => ({
    id: `rfq-${rfq.id}`,
    content: `${rfq.rfqId} ${rfq.buyer} ${rfq.product} ${rfq.fabric} ${rfq.colors.join(' ')} ${rfq.specialRequirements}`,
    metadata: rfq,
  }));
  
  await batchStoreVectorDocuments(vectorDocs, MODULE_NAMES.RFQ_QUOTATION);
  
  console.log(`  ✓ Seeded ${rfqQuotationData.rfqs.length} RFQs`);
  console.log(`  ✓ Seeded ${rfqQuotationData.quotes.length} quotes`);
}

/**
 * Seed Costing module
 */
export async function seedCosting(): Promise<void> {
  console.log('💰 Seeding Costing...');
  
  const records = costingData.costSheets.map(costSheet => ({
    key: `costsheet-${costSheet.id}-${Date.now()}`,
    data: costSheet,
  }));
  
  await batchStoreData(records, MODULE_NAMES.COSTING);
  
  // Store in vector DB for AI search
  const vectorDocs = costingData.costSheets.map(cs => ({
    id: `costsheet-${cs.id}`,
    content: `${cs.costSheetId} ${cs.styleNumber} ${cs.product} ${cs.buyer} ${cs.season} ${cs.notes}`,
    metadata: cs,
  }));
  
  await batchStoreVectorDocuments(vectorDocs, MODULE_NAMES.COSTING);
  
  console.log(`  ✓ Seeded ${costingData.costSheets.length} cost sheets`);
}

/**
 * Seed Production Planning module
 */
export async function seedProductionPlanning(): Promise<void> {
  console.log('🏭 Seeding Production Planning...');
  
  const records = [
    ...productionPlanningData.orders.map(order => ({
      key: `order-${order.id}-${Date.now()}`,
      data: order,
    })),
    ...productionPlanningData.capacityData.map(capacity => ({
      key: `capacity-${capacity.id}-${Date.now()}`,
      data: capacity,
    })),
  ];
  
  await batchStoreData(records, MODULE_NAMES.PRODUCTION_PLANNING);
  
  // Store in vector DB for AI search
  const vectorDocs = productionPlanningData.orders.map(order => ({
    id: `order-${order.id}`,
    content: `${order.orderId} ${order.buyer} ${order.product} ${order.style} ${order.status} ${order.line}`,
    metadata: order,
  }));
  
  await batchStoreVectorDocuments(vectorDocs, MODULE_NAMES.PRODUCTION_PLANNING);
  
  console.log(`  ✓ Seeded ${productionPlanningData.orders.length} production orders`);
  console.log(`  ✓ Seeded ${productionPlanningData.capacityData.length} capacity records`);
}

/**
 * Seed Quality Control module
 */
export async function seedQualityControl(): Promise<void> {
  console.log('✅ Seeding Quality Control...');
  
  const records = [
    ...qualityControlData.inspections.map(inspection => ({
      key: `inspection-${inspection.id}-${Date.now()}`,
      data: inspection,
    })),
    ...qualityControlData.defects.map(defect => ({
      key: `defect-${defect.id}-${Date.now()}`,
      data: defect,
    })),
  ];
  
  await batchStoreData(records, MODULE_NAMES.QUALITY_CONTROL);
  
  // Store in vector DB for AI search
  const vectorDocs = qualityControlData.inspections.map(inspection => ({
    id: `inspection-${inspection.id}`,
    content: `${inspection.inspectionId} ${inspection.product} ${inspection.buyer} ${inspection.stage} ${inspection.comments}`,
    metadata: inspection,
  }));
  
  await batchStoreVectorDocuments(vectorDocs, MODULE_NAMES.QUALITY_CONTROL);
  
  console.log(`  ✓ Seeded ${qualityControlData.inspections.length} inspections`);
  console.log(`  ✓ Seeded ${qualityControlData.defects.length} defects`);
}

/**
 * Clear all data from a module
 */
export async function clearModuleData(moduleName: string): Promise<void> {
  console.log(`🗑️  Clearing data for ${moduleName}...`);
  // Note: This would need implementation in the database layer
  // For now, this is a placeholder
  console.log(`  ⚠️  Clear function not yet implemented`);
}

/**
 * Get seeding statistics
 */
export function getSeedingStats() {
  return {
    leadManagement: {
      leads: leadManagementData.leads.length,
      campaigns: leadManagementData.campaigns.length,
      conversations: leadManagementData.conversations.length,
    },
    buyerManagement: {
      buyers: buyerManagementData.buyers.length,
      issues: buyerManagementData.issues.length,
      feedback: buyerManagementData.feedback.length,
    },
    rfqQuotation: {
      rfqs: rfqQuotationData.rfqs.length,
      quotes: rfqQuotationData.quotes.length,
    },
    costing: {
      costSheets: costingData.costSheets.length,
    },
    productionPlanning: {
      orders: productionPlanningData.orders.length,
      capacity: productionPlanningData.capacityData.length,
    },
    qualityControl: {
      inspections: qualityControlData.inspections.length,
      defects: qualityControlData.defects.length,
    },
  };
}
