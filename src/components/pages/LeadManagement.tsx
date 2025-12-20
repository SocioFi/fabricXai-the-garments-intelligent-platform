import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PageLayout } from '../PageLayout';
import { KPICard } from '../KPICard';
import { AICard } from '../AICard';
import { SmartTable, Column } from '../SmartTable';
import { DetailDrawer, DetailDrawerData } from '../DetailDrawer';
import { LeadDetailDrawer } from '../LeadDetailDrawer';
import { CampaignDetailDrawer } from '../CampaignDetailDrawer';
import { ConversationDetailDrawer } from '../ConversationDetailDrawer';
import { WorkflowStepper } from '../WorkflowStepper';
import { MarbimAIButton } from '../MarbimAIButton';
import { TemplateDrawer } from '../TemplateDrawer';
import { EmailCompositionDrawer } from '../EmailCompositionDrawer';
import { SegmentCreationDrawer } from '../SegmentCreationDrawer';
import { AddLeadDrawer } from '../AddLeadDrawer';
import { useDatabase, MODULE_NAMES, canPerformAction } from '../../utils/supabase';
import { 
  Users, TrendingUp, Clock, Target, BarChart3, 
  Send, Mail, ChevronDown, Sparkles, Plus, Filter,
  Download, Upload, FileText, MessageSquare, Phone,
  Calendar, Eye, AlertTriangle, Zap, Activity, Globe,
  CheckCircle, RefreshCw, Settings, MapPin, Building2, User, X,
  Copy, Edit, Trash2, BarChart2
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart as RechartsLine,
  Line,
  PieChart as RechartsPie,
  Pie,
  Cell,
  FunnelChart,
  Funnel,
} from 'recharts';

// Dashboard Data
const dashboardSummary = [
  { label: 'New Leads', value: '48', icon: Users, color: '#57ACAF' },
  { label: 'Lead→RFQ Conversion', value: '32%', icon: TrendingUp, color: '#EAB308' },
  { label: 'Avg Response Time', value: '1.8d', icon: Clock, color: '#6F83A7' },
  { label: 'High-fit Leads', value: '15', icon: Target, color: '#57ACAF' },
];

const conversionFunnelData = [
  { stage: 'New Leads', count: 127, fill: '#57ACAF' },
  { stage: 'Contacted', count: 85, fill: '#6F83A7' },
  { stage: 'Qualified', count: 52, fill: '#EAB308' },
  { stage: 'RFQ Sent', count: 28, fill: '#D0342C' },
  { stage: 'Closed', count: 12, fill: '#9333EA' },
];

const touchpointTimelineData = [
  { week: 'W1', email: 45, linkedin: 28, phone: 12 },
  { week: 'W2', email: 52, linkedin: 35, phone: 18 },
  { week: 'W3', email: 48, linkedin: 32, phone: 15 },
  { week: 'W4', email: 55, linkedin: 38, phone: 20 },
];

// Leads List Data
const allLeadsData = [
  {
    id: 1,
    leadName: 'John Smith',
    company: 'TrendWear UK',
    country: 'United Kingdom',
    source: 'LinkedIn',
    owner: 'Sarah M.',
    score: 92,
    status: 'Qualified',
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
  },
];

const highFitLeadsData = allLeadsData.filter(l => l.score >= 80);
const coldLeadsData = allLeadsData.filter(l => l.score < 70);

// Campaigns Data
const campaignsData = [
  {
    id: 1,
    campaignId: 'CMP-2024-5847',
    name: 'EU Fashion Outreach',
    status: 'Active',
    audience: 'EU Buyers',
    sendWindow: '2024-10-20 - 2024-11-20',
    conversionRate: 12.5,
  },
  {
    id: 2,
    campaignId: 'CMP-2024-5848',
    name: 'Sustainable Fabrics',
    status: 'Active',
    audience: 'Eco-conscious Buyers',
    sendWindow: '2024-10-15 - 2024-11-15',
    conversionRate: 18.3,
  },
  {
    id: 3,
    campaignId: 'CMP-2024-5845',
    name: 'Trade Show Follow-up',
    status: 'Completed',
    audience: 'Trade Show Contacts',
    sendWindow: '2024-09-01 - 2024-09-30',
    conversionRate: 22.8,
  },
];

const campaignAnalyticsData = [
  { campaign: 'EU Fashion', openRate: 68, ctr: 24, responseRate: 15, conversion: 12.5 },
  { campaign: 'Sustainable', openRate: 72, ctr: 28, responseRate: 18, conversion: 18.3 },
  { campaign: 'Trade Show', openRate: 65, ctr: 22, responseRate: 20, conversion: 22.8 },
];

// Lead Inbox Data
const conversationsData = [
  {
    id: 1,
    contactName: 'John Smith',
    company: 'TrendWear UK',
    channel: 'Email',
    lastMessage: 'Looking forward to the fabric samples',
    timestamp: '2 hours ago',
    status: 'New Reply',
    intent: 'Interest',
  },
  {
    id: 2,
    contactName: 'Emma Wilson',
    company: 'Fashion Global',
    channel: 'WhatsApp',
    lastMessage: 'Can you send pricing for denim?',
    timestamp: '5 hours ago',
    status: 'New Reply',
    intent: 'RFQ',
  },
  {
    id: 3,
    contactName: 'Sophie Martin',
    company: 'EcoFashion EU',
    channel: 'LinkedIn',
    lastMessage: 'Thank you for the catalog',
    timestamp: '1 day ago',
    status: 'Follow-up',
    intent: 'Info Request',
  },
];

const newRepliesData = conversationsData.filter(c => c.status === 'New Reply');
const followUpsData = conversationsData.filter(c => c.status === 'Follow-up');

interface LeadManagementProps {
  initialSubPage?: string;
  onAskMarbim?: (prompt: string) => void;
  onNavigateToPage?: (page: string) => void;
  isAIPanelOpen?: boolean;
}

export function LeadManagement({ initialSubPage = 'dashboard', onAskMarbim, onNavigateToPage, isAIPanelOpen }: LeadManagementProps) {
  // Database hook
  const db = useDatabase();
  
  // UI State
  const [currentView, setCurrentView] = useState<string>(initialSubPage);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerData, setDrawerData] = useState<DetailDrawerData | null>(null);
  const [segmentDrawerOpen, setSegmentDrawerOpen] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<any>(null);
  const [activeSegmentTab, setActiveSegmentTab] = useState('overview');
  const [templateDrawerOpen, setTemplateDrawerOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [activeTemplateTab, setActiveTemplateTab] = useState('preview');
  const [templateDrawerAction, setTemplateDrawerAction] = useState<'preview' | 'edit' | 'use'>('preview');
  const [emailCompositionOpen, setEmailCompositionOpen] = useState(false);
  const [emailCompositionContext, setEmailCompositionContext] = useState<any>(null);
  const [campaignDrawerOpen, setCampaignDrawerOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [segmentCreationOpen, setSegmentCreationOpen] = useState(false);
  const [conversationDrawerOpen, setConversationDrawerOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [addLeadDrawerOpen, setAddLeadDrawerOpen] = useState(false);
  
  // Database State
  const [leads, setLeads] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [conversations, setConversations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Computed Data
  const highFitLeadsData = leads.filter(l => l.score >= 80);
  const coldLeadsData = leads.filter(l => l.score < 70);
  
  // Compute dashboard KPIs from actual data
  const newLeadsCount = leads.filter(l => l.status === 'New').length;
  const rfqLeadsCount = leads.filter(l => l.status === 'RFQ').length;
  const conversionRate = leads.length > 0 ? Math.round((rfqLeadsCount / leads.length) * 100) : 0;
  const highFitCount = highFitLeadsData.length;
  
  const computedDashboardSummary = [
    { label: 'New Leads', value: newLeadsCount.toString(), icon: Users, color: '#57ACAF' },
    { label: 'Lead→RFQ Conversion', value: `${conversionRate}%`, icon: TrendingUp, color: '#EAB308' },
    { label: 'Avg Response Time', value: '1.8d', icon: Clock, color: '#6F83A7' },
    { label: 'High-fit Leads', value: highFitCount.toString(), icon: Target, color: '#57ACAF' },
  ];

  // Update view when initialSubPage changes
  useEffect(() => {
    setCurrentView(initialSubPage);
  }, [initialSubPage]);

  // Close all drawers when AI panel opens
  useEffect(() => {
    if (isAIPanelOpen) {
      setDrawerOpen(false);
      setCampaignDrawerOpen(false);
      setTemplateDrawerOpen(false);
      setEmailCompositionOpen(false);
      setSegmentDrawerOpen(false);
      setSegmentCreationOpen(false);
      setConversationDrawerOpen(false);
    }
  }, [isAIPanelOpen]);

  // Load data from database on mount
  useEffect(() => {
    loadLeads();
    loadCampaigns();
    loadConversations();
  }, []);

  // Database Operations
  async function loadLeads() {
    try {
      setIsLoading(true);
      const data = await db.getByModule(MODULE_NAMES.LEAD_MANAGEMENT);
      const leadsData = data.filter((item: any) => item.type === 'lead');
      
      // If no data exists, seed with initial data
      if (leadsData.length === 0) {
        await seedInitialLeads();
      } else {
        setLeads(leadsData);
      }
    } catch (error) {
      console.error('Failed to load leads:', error);
      toast.error('Failed to load leads');
    } finally {
      setIsLoading(false);
    }
  }

  async function loadCampaigns() {
    try {
      const data = await db.getByModule(MODULE_NAMES.LEAD_MANAGEMENT);
      const campaignsData = data.filter((item: any) => item.type === 'campaign');
      
      if (campaignsData.length === 0) {
        await seedInitialCampaigns();
      } else {
        setCampaigns(campaignsData);
      }
    } catch (error) {
      console.error('Failed to load campaigns:', error);
    }
  }

  async function loadConversations() {
    try {
      const data = await db.getByModule(MODULE_NAMES.LEAD_MANAGEMENT);
      const conversationsData = data.filter((item: any) => item.type === 'conversation');
      
      if (conversationsData.length === 0) {
        await seedInitialConversations();
      } else {
        setConversations(conversationsData);
      }
    } catch (error) {
      console.error('Failed to load conversations:', error);
    }
  }

  async function handleAddLead(leadData: any) {
    try {
      // Store in database
      await db.store(leadData.id, { ...leadData, type: 'lead' }, MODULE_NAMES.LEAD_MANAGEMENT);
      
      // Store in vector DB for AI search
      const searchableContent = `
        Lead: ${leadData.leadName}
        Company: ${leadData.company}
        Email: ${leadData.email}
        Industry: ${leadData.industry}
        Source: ${leadData.source}
        Product Interest: ${leadData.productInterest.join(', ')}
        Description: ${leadData.description}
        Country: ${leadData.country}
      `.trim();
      
      await db.storeVector(leadData.id, searchableContent, MODULE_NAMES.LEAD_MANAGEMENT);
      
      // Reload leads to show the new one
      await loadLeads();
      
      toast.success('Lead added successfully');
    } catch (error) {
      console.error('Failed to add lead:', error);
      toast.error('Failed to add lead');
    }
  }

  async function seedInitialLeads() {
    const initialLeads = allLeadsData.map(lead => ({
      ...lead,
      type: 'lead',
    }));
    
    for (const lead of initialLeads) {
      const id = `lead-${lead.id}-${Date.now()}`;
      await db.store(id, lead, MODULE_NAMES.LEAD_MANAGEMENT);
      
      // Store in vector DB for AI search
      const searchableContent = `${lead.leadName} ${lead.company} ${lead.country} ${lead.source} ${lead.status}`;
      await db.storeVector(id, searchableContent, MODULE_NAMES.LEAD_MANAGEMENT, lead);
    }
    
    setLeads(initialLeads);
  }

  async function seedInitialCampaigns() {
    const initialCampaigns = campaignsData.map(campaign => ({
      ...campaign,
      type: 'campaign',
    }));
    
    for (const campaign of initialCampaigns) {
      const id = `campaign-${campaign.id}-${Date.now()}`;
      await db.store(id, campaign, MODULE_NAMES.LEAD_MANAGEMENT);
    }
    
    setCampaigns(initialCampaigns);
  }

  async function seedInitialConversations() {
    const initialConversations = conversationsData.map(convo => ({
      ...convo,
      type: 'conversation',
    }));
    
    for (const convo of initialConversations) {
      const id = `conversation-${convo.id}-${Date.now()}`;
      await db.store(id, convo, MODULE_NAMES.LEAD_MANAGEMENT);
    }
    
    setConversations(initialConversations);
  }

  async function handleUpdateLead(leadId: string, updates: any) {
    try {
      const id = `lead-${leadId}-${Date.now()}`;
      await db.update(id, updates, MODULE_NAMES.LEAD_MANAGEMENT);
      toast.success('Lead updated successfully');
      loadLeads();
    } catch (error) {
      console.error('Failed to update lead:', error);
      toast.error('Failed to update lead');
    }
  }

  async function handleDeleteLead(leadId: string) {
    try {
      const id = `lead-${leadId}`;
      await db.removeComplete(id);
      toast.success('Lead deleted successfully');
      loadLeads();
    } catch (error) {
      console.error('Failed to delete lead:', error);
      toast.error('Failed to delete lead');
    }
  }

  // Helper function to get country code from country name
  const getCountryCode = (country: string): string => {
    const countryCodeMap: Record<string, string> = {
      'United Kingdom': 'GB',
      'USA': 'US',
      'Canada': 'CA',
      'Germany': 'DE',
      'France': 'FR',
      'Italy': 'IT',
      'Spain': 'ES',
      'Netherlands': 'NL',
      'Belgium': 'BE',
      'China': 'CN',
      'India': 'IN',
      'Japan': 'JP',
      'South Korea': 'KR',
      'Australia': 'AU',
    };
    return countryCodeMap[country] || 'US';
  };

  // All Leads Columns
  const allLeadsColumns: Column[] = [
    { key: 'leadName', label: 'Lead Name', sortable: true },
    { key: 'company', label: 'Company' },
    { key: 'country', label: 'Country' },
    { key: 'source', label: 'Source' },
    { key: 'owner', label: 'Owner' },
    {
      key: 'score',
      label: 'Score',
      sortable: true,
      render: (value) => {
        const color = value >= 80 ? 'text-[#57ACAF]' : value >= 60 ? 'text-[#EAB308]' : 'text-[#D0342C]';
        return <span className={color}>{value}</span>;
      },
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => {
        const colors: any = {
          'New': 'bg-[#6F83A7]/10 text-[#6F83A7]',
          'Contacted': 'bg-[#EAB308]/10 text-[#EAB308]',
          'Qualified': 'bg-[#57ACAF]/10 text-[#57ACAF]',
          'RFQ': 'bg-[#9333EA]/10 text-[#9333EA]',
          'Closed': 'bg-[#D0342C]/10 text-[#D0342C]',
        };
        return <Badge className={colors[value]}>{value}</Badge>;
      },
    },
  ];

  // Campaigns Columns
  const campaignsColumns: Column[] = [
    { key: 'campaignId', label: 'Campaign ID', sortable: true },
    { key: 'name', label: 'Name' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => {
        const colors: any = {
          'Active': 'bg-[#57ACAF]/10 text-[#57ACAF]',
          'Completed': 'bg-[#6F83A7]/10 text-[#6F83A7]',
          'Paused': 'bg-[#EAB308]/10 text-[#EAB308]',
        };
        return <Badge className={colors[value]}>{value}</Badge>;
      },
    },
    { key: 'audience', label: 'Audience' },
    { key: 'sendWindow', label: 'Send Window' },
    {
      key: 'conversionRate',
      label: 'Conversion %',
      sortable: true,
      render: (value) => <span className="text-[#57ACAF]">{value}%</span>,
    },
  ];

  // Conversations Columns
  const conversationsColumns: Column[] = [
    { key: 'contactName', label: 'Contact Name', sortable: true },
    { key: 'company', label: 'Company' },
    {
      key: 'channel',
      label: 'Channel',
      render: (value) => {
        const icons: any = {
          'Email': <Mail className="w-4 h-4" />,
          'WhatsApp': <MessageSquare className="w-4 h-4" />,
          'LinkedIn': <Globe className="w-4 h-4" />,
        };
        const colors: any = {
          'Email': 'bg-[#EAB308]/10 text-[#EAB308]',
          'WhatsApp': 'bg-[#57ACAF]/10 text-[#57ACAF]',
          'LinkedIn': 'bg-[#6F83A7]/10 text-[#6F83A7]',
        };
        return (
          <Badge className={colors[value]}>
            <span className="flex items-center gap-2">
              {icons[value]}
              {value}
            </span>
          </Badge>
        );
      },
    },
    { key: 'lastMessage', label: 'Last Message' },
    { key: 'timestamp', label: 'Time' },
    {
      key: 'intent',
      label: 'Intent',
      render: (value) => {
        const colors: any = {
          'Interest': 'bg-[#57ACAF]/10 text-[#57ACAF]',
          'Info Request': 'bg-[#EAB308]/10 text-[#EAB308]',
          'RFQ': 'bg-[#9333EA]/10 text-[#9333EA]',
          'Complaint': 'bg-[#D0342C]/10 text-[#D0342C]',
        };
        return <Badge className={colors[value]}>{value}</Badge>;
      },
    },
  ];

  // Generate drawer data based on module, sub-page, and record
  const generateDrawerData = (record: any, subPage: string): DetailDrawerData => {
    const baseData: DetailDrawerData = {
      id: record.id || record.leadId || 'N/A',
      title: record.leadName || record.contactName || record.name || 'Lead Details',
      subtitle: record.company || 'Company Unknown',
      type: 'Lead',
      score: record.score || undefined,
      country: record.country || undefined,
      countryCode: record.country ? getCountryCode(record.country) : undefined,
      logo: undefined,
      status: {
        label: record.status || 'Active',
        variant: record.status === 'Hot' ? 'success' : record.status === 'Warm' ? 'warning' : 'default'
      },
      overview: {
        keyAttributes: [],
        metrics: [],
        description: '',
        relatedLinks: []
      },
      aiInsights: {
        summary: '',
        recommendations: [],
        references: []
      }
    };

    // Customize data based on sub-page
    switch (subPage) {
      case 'all-leads':
        baseData.overview.keyAttributes = [
          { label: 'Contact', value: record.contactName || 'N/A', icon: <User className="w-4 h-4" /> },
          { label: 'Company', value: record.company || 'N/A', icon: <Building2 className="w-4 h-4" /> },
          { label: 'Source', value: record.source || 'N/A', icon: <Globe className="w-4 h-4" /> },
          { label: 'Industry', value: record.industry || 'N/A', icon: <Activity className="w-4 h-4" /> },
          { label: 'Location', value: record.location || 'N/A', icon: <MapPin className="w-4 h-4" /> },
          { label: 'Lead Score', value: `${record.score || 0}%`, icon: <Target className="w-4 h-4" /> },
        ];
        baseData.overview.metrics = [
          { label: 'Engagement Level', value: record.engagement || 'Medium', change: '+12%', trend: 'up' as const },
          { label: 'RFQ Probability', value: `${record.rfqProbability || 75}%`, change: '+5%', trend: 'up' as const },
          { label: 'Estimated Value', value: record.estimatedValue || '$50K-100K' },
        ];
        baseData.overview.description = `${record.leadName || 'This lead'} has shown strong interest in ${record.products || 'textile products'}. High engagement with ${record.emailsOpened || 3} emails opened.`;
        baseData.aiInsights.summary = `High conversion potential (${record.score || 85}% score). Strong buying signals detected.`;
        baseData.aiInsights.recommendations = [
          {
            title: 'Send Personalized Follow-up',
            description: 'Send customized proposal with fabric samples.',
            action: 'Draft Email',
            onClick: () => toast.success('Opening email composer...')
          }
        ];
        break;

      case 'lead-scoring':
        baseData.title = `Lead Scoring: ${record.leadName || 'Lead'}`;
        baseData.overview.keyAttributes = [
          { label: 'Overall Score', value: `${record.score || 0}%`, icon: <Target className="w-4 h-4" /> },
          { label: 'Engagement Score', value: `${record.engagementScore || 90}/100`, icon: <Activity className="w-4 h-4" /> },
          { label: 'Fit Score', value: `${record.fitScore || 85}/100`, icon: <CheckCircle className="w-4 h-4" /> },
          { label: 'Recency Score', value: `${record.recencyScore || 80}/100`, icon: <Clock className="w-4 h-4" /> },
        ];
        baseData.overview.description = `Score breakdown based on engagement, fit, and recency factors.`;
        baseData.aiInsights.summary = `Score of ${record.score || 85}% driven by high engagement and strong fit. Recommend immediate follow-up.`;
        break;

      case 'nurture-sequences':
        baseData.title = `Nurture: ${record.leadName || 'Lead'}`;
        baseData.overview.keyAttributes = [
          { label: 'Sequence', value: record.sequence || 'Welcome Series', icon: <Send className="w-4 h-4" /> },
          { label: 'Step', value: record.step || '3 of 7', icon: <Activity className="w-4 h-4" /> },
          { label: 'Open Rate', value: record.openRate || '65%', icon: <Mail className="w-4 h-4" /> },
          { label: 'Click Rate', value: record.clickRate || '22%', icon: <Target className="w-4 h-4" /> },
        ];
        baseData.overview.description = `Currently in ${record.sequence || 'Welcome Series'} with above-average engagement.`;
        baseData.aiInsights.summary = `Excellent performance. ${record.openRate || '65%'} open rate is 23% above average.`;
        break;

      default:
        baseData.overview.keyAttributes = [
          { label: 'Contact', value: record.contactName || 'N/A', icon: <User className="w-4 h-4" /> },
          { label: 'Company', value: record.company || 'N/A', icon: <Building2 className="w-4 h-4" /> },
          { label: 'Status', value: record.status || 'N/A', icon: <Activity className="w-4 h-4" /> },
        ];
        baseData.overview.description = 'View detailed information about this lead.';
        baseData.aiInsights.summary = 'AI insights generated from lead activity patterns.';
    }

    // Common data
    baseData.interactions = [
      { date: 'Nov 15, 2024', type: 'email' as const, description: 'Sent product catalog', sentiment: 'positive' as const },
      { date: 'Nov 12, 2024', type: 'call' as const, description: 'Discovery call completed', sentiment: 'positive' as const },
    ];

    baseData.documents = [
      { 
        name: 'Product_Catalog.pdf', 
        type: 'PDF', 
        uploadDate: 'Nov 15, 2024', 
        uploader: 'Sarah M.',
        tag: 'Catalog',
        aiSummary: 'Contains 45 product SKUs with pricing tiers.'
      },
    ];

    baseData.overview.relatedLinks = [
      { label: 'View Company', module: 'Buyer Management', onClick: () => toast.info('Opening...') },
      { label: 'Create RFQ', module: 'RFQ', onClick: () => toast.info('Creating...') },
    ];

    baseData.aiInsights.references = [
      `Data from ${subPage} view`,
      'Email engagement analytics',
      'Historical patterns'
    ];

    return baseData;
  };

  const handleRowClick = (record: any) => {
    // Check if this is a conversation record (from Lead Inbox)
    if (record.channel && record.intent && currentView === 'lead-inbox') {
      setSelectedConversation(record);
      setConversationDrawerOpen(true);
    }
    // Check if this is a campaign record
    else if (record.campaignId) {
      setSelectedCampaign(record);
      setCampaignDrawerOpen(true);
    } 
    // Default to detail drawer
    else {
      setSelectedRecord(record);
      const detailData = generateDrawerData(record, currentView);
      setDrawerData(detailData);
      setDrawerOpen(true);
    }
  };

  const renderDashboard = () => (
    <>
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <KPICard
          title="New Leads"
          value="48"
          change={15.3}
          changeLabel="vs last month"
          icon={Users}
          trend="up"
        />
        <KPICard
          title="Lead→RFQ Conversion"
          value="32%"
          change={4.2}
          icon={TrendingUp}
          trend="up"
        />
        <KPICard
          title="Avg Response Time"
          value="1.8 days"
          change={-8.5}
          changeLabel="improvement"
          icon={Clock}
          trend="up"
        />
        <KPICard
          title="High-fit Leads"
          value="15"
          change={12.5}
          icon={Target}
          trend="up"
        />
        <KPICard
          title="Active Campaigns"
          value="2"
          change={0}
          icon={Send}
          trend="neutral"
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {computedDashboardSummary.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${item.color}20` }}
                >
                  <Icon className="w-6 h-6" style={{ color: item.color }} />
                </div>
                <div className="text-3xl" style={{ color: item.color }}>{item.value}</div>
              </div>
              <div className="text-[#6F83A7]">{item.label}</div>
            </div>
          );
        })}
      </div>

      {/* Charts and AI Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lead Conversion Funnel */}
        <div className="lg:col-span-2 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-white mb-1">Lead Conversion Funnel</h3>
              <p className="text-sm text-[#6F83A7]">Track pipeline progression & conversion rates</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="text-[#6F83A7] border-white/10 hover:bg-white/5 hover:border-[#57ACAF]/50 transition-all duration-180">
                <Calendar className="w-4 h-4 mr-2" />
                This Month
              </Button>
              <Button variant="outline" size="sm" className="text-[#6F83A7] border-white/10 hover:bg-white/5 hover:border-[#57ACAF]/50 transition-all duration-180">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Overall Conversion Stats */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-gradient-to-br from-[#57ACAF]/10 to-transparent border border-[#57ACAF]/20 rounded-xl">
              <div className="text-center">
                <div className="text-sm text-[#6F83A7] mb-1">Overall Conversion</div>
                <div className="text-2xl text-[#57ACAF]">9.4%</div>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                  <span className="text-xs text-green-400">+2.3%</span>
                </div>
              </div>
              <div className="text-center border-l border-r border-white/10">
                <div className="text-sm text-[#6F83A7] mb-1">Avg. Cycle Time</div>
                <div className="text-2xl text-[#EAB308]">14 days</div>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-400 rotate-180" />
                  <span className="text-xs text-green-400">-1.5d</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-[#6F83A7] mb-1">Active Pipeline</div>
                <div className="text-2xl text-white">$2.4M</div>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                  <span className="text-xs text-green-400">+18%</span>
                </div>
              </div>
            </div>

            {/* Funnel Visualization */}
            <div className="relative">
              <div className="grid grid-cols-5 gap-4">
                {conversionFunnelData.map((stage, index) => {
                  const conversionRate = index < conversionFunnelData.length - 1 
                    ? ((conversionFunnelData[index + 1].count / stage.count) * 100).toFixed(1)
                    : null;
                  
                  const avgTime = ['2.3d', '4.5d', '3.8d', '5.2d', '-'][index];
                  const velocity = ['+12%', '+8%', '-5%', '+15%', '+22%'][index];
                  
                  return (
                    <div key={index} className="relative group">
                      {/* Stage Card */}
                      <div className="relative overflow-hidden rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                        {/* Animated Gradient Background */}
                        <div 
                          className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                          style={{ background: `linear-gradient(135deg, ${stage.fill}, transparent)` }}
                        />
                        
                        {/* Glow Effect */}
                        <div 
                          className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-lg"
                          style={{ background: stage.fill }}
                        />
                        
                        {/* Content Container */}
                        <div 
                          className="relative bg-gradient-to-br from-white/5 to-transparent rounded-xl p-4 border transition-all duration-300"
                          style={{ borderColor: `${stage.fill}40` }}
                        >
                          {/* Count */}
                          <div className="text-center mb-3">
                            <div 
                              className="text-4xl mb-1 transition-transform duration-300 group-hover:scale-110"
                              style={{ color: stage.fill }}
                            >
                              {stage.count}
                            </div>
                            <div className="text-xs text-white/90 leading-tight">
                              {stage.stage}
                            </div>
                          </div>

                          {/* Metrics */}
                          <div className="space-y-2 pt-3 border-t border-white/10">
                            {/* Average Time */}
                            {avgTime !== '-' && (
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-[#6F83A7] flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  Avg. time
                                </span>
                                <span className="text-white">{avgTime}</span>
                              </div>
                            )}
                            
                            {/* Velocity */}
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-[#6F83A7] flex items-center gap-1">
                                <Activity className="w-3 h-3" />
                                Velocity
                              </span>
                              <span className={velocity.startsWith('+') ? 'text-green-400' : 'text-red-400'}>
                                {velocity}
                              </span>
                            </div>
                          </div>

                          {/* Conversion Indicator */}
                          {conversionRate && (
                            <div className="mt-3 pt-3 border-t border-white/10">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs text-[#6F83A7]">Conversion</span>
                                <span className="text-xs text-[#57ACAF]">{conversionRate}%</span>
                              </div>
                              <Progress 
                                value={parseFloat(conversionRate)} 
                                className="h-1.5"
                                style={{
                                  '--progress-background': stage.fill,
                                } as any}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Connection Arrow */}
                      {conversionRate && (
                        <div className="absolute -right-2 top-1/2 -translate-y-1/2 z-20">
                          <div 
                            className="w-4 h-4 rotate-45 border-r-2 border-t-2 opacity-50 group-hover:opacity-100 transition-opacity"
                            style={{ borderColor: stage.fill }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Insights */}
            <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#EAB308]/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#EAB308]" />
                </div>
                <div>
                  <p className="text-sm text-white">AI Insight</p>
                  <p className="text-xs text-[#6F83A7]">Qualified → RFQ conversion dropped 5%. Focus on qualification criteria.</p>
                </div>
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                className="border-[#EAB308]/30 text-[#EAB308] hover:bg-[#EAB308]/10"
              >
                View Details
              </Button>
            </div>
          </div>
        </div>

        {/* AI Card */}
        <div className="space-y-4">
          <AICard
            title="MARBIM Lead Insights"
            marbimPrompt="Provide detailed lead intelligence including top prospects for RFQ requests this week, response time optimization strategies, and high-fit lead opportunities from all channels."
            onAskMarbim={onAskMarbim}
          >
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-start gap-3">
                  <Target className="w-4 h-4 text-[#57ACAF] flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm text-white mb-1">Top 5 prospects likely to request an RFQ this week.</div>
                    <Button 
                      size="sm" 
                      onClick={() => {
                        setCurrentView('leads-list');
                        toast.success('Viewing high-fit prospects');
                      }} 
                      className="bg-[#EAB308] hover:bg-[#EAB308]/90 text-black mt-2"
                    >
                      View Prospects
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#EAB308] flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm text-white mb-1">Average response time increased to 1.8 days — suggest new outreach timing.</div>
                    <Button 
                      size="sm" 
                      onClick={() => {
                        setActiveSubPage('campaigns');
                        toast.success('Opening campaign optimization');
                      }} 
                      className="bg-[#EAB308] hover:bg-[#EAB308]/90 text-black mt-2"
                    >
                      Optimize Timing
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-start gap-3">
                  <Users className="w-4 h-4 text-[#6F83A7] flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm text-white mb-1">High-fit lead detected from LinkedIn: Buyer at TrendWear UK.</div>
                    <Button 
                      size="sm" 
                      onClick={() => {
                        const leadRecord = allLeadsData[0]; // John Smith from TrendWear UK
                        handleRowClick(leadRecord);
                        toast.success('Opening lead profile');
                      }} 
                      className="bg-[#EAB308] hover:bg-[#EAB308]/90 text-black mt-2"
                    >
                      View Lead Profile
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </AICard>
        </div>
      </div>

      {/* Touchpoint Timeline */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
        <h3 className="text-white mb-6">Recent Touchpoint Timeline</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={touchpointTimelineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis dataKey="week" stroke="#6F83A7" />
            <YAxis stroke="#6F83A7" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0D1117',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
              }}
            />
            <Bar dataKey="email" fill="#EAB308" radius={[8, 8, 0, 0]} name="Email" stackId="a" />
            <Bar dataKey="linkedin" fill="#57ACAF" radius={[8, 8, 0, 0]} name="LinkedIn" stackId="a" />
            <Bar dataKey="phone" fill="#6F83A7" radius={[8, 8, 0, 0]} name="Phone" stackId="a" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );

  const renderLeadsList = () => (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white mb-1">Leads List</h2>
          <p className="text-sm text-[#6F83A7]">Centralized, filterable table of all leads</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-white/10">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button 
            className="bg-[#EAB308] hover:bg-[#EAB308]/90 text-black"
            onClick={() => setAddLeadDrawerOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Lead
          </Button>
        </div>
      </div>

      <Tabs key={`leads-list-${currentView}`} defaultValue="all-leads" className="space-y-6">
        {/* Tab Navigation */}
        <div className="relative bg-gradient-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-1.5 mb-6 shadow-lg shadow-black/20">
          <TabsList className="w-full grid grid-cols-4 bg-transparent gap-1.5 p-0 h-auto">
            <TabsTrigger 
              value="all-leads" 
              className="relative flex items-center justify-center gap-2.5 py-3.5 px-4 bg-white/5 hover:bg-white/10 data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#EAB308] data-[state=active]:to-[#EAB308]/80 data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-[#EAB308]/30 text-[#6F83A7] data-[state=active]:font-medium rounded-xl transition-all duration-300 group"
            >
              <Users className="w-4 h-4 group-data-[state=active]:scale-110 transition-transform" />
              <span className="text-xs">All Leads</span>
            </TabsTrigger>
            <TabsTrigger 
              value="high-fit-leads" 
              className="relative flex items-center justify-center gap-2.5 py-3.5 px-4 bg-white/5 hover:bg-white/10 data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#EAB308] data-[state=active]:to-[#EAB308]/80 data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-[#EAB308]/30 text-[#6F83A7] data-[state=active]:font-medium rounded-xl transition-all duration-300 group"
            >
              <Target className="w-4 h-4 group-data-[state=active]:scale-110 transition-transform" />
              <span className="text-xs">High-Fit Leads</span>
            </TabsTrigger>
            <TabsTrigger 
              value="cold-leads" 
              className="relative flex items-center justify-center gap-2.5 py-3.5 px-4 bg-white/5 hover:bg-white/10 data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#EAB308] data-[state=active]:to-[#EAB308]/80 data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-[#EAB308]/30 text-[#6F83A7] data-[state=active]:font-medium rounded-xl transition-all duration-300 group"
            >
              <AlertTriangle className="w-4 h-4 group-data-[state=active]:scale-110 transition-transform" />
              <span className="text-xs">Cold Leads</span>
            </TabsTrigger>
            <TabsTrigger 
              value="ai-insights" 
              className="relative flex items-center justify-center gap-2.5 py-3.5 px-4 bg-white/5 hover:bg-white/10 data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#EAB308] data-[state=active]:to-[#EAB308]/80 data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-[#EAB308]/30 text-[#6F83A7] data-[state=active]:font-medium rounded-xl transition-all duration-300 group"
            >
              <Sparkles className="w-4 h-4 group-data-[state=active]:scale-110 transition-transform" />
              <span className="text-xs">AI Insights</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all-leads" className="space-y-6">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h3 className="text-white mb-4">All Leads</h3>
            <SmartTable
              columns={allLeadsColumns}
              data={leads}
              searchPlaceholder="Search leads..."
              onRowClick={handleRowClick}
            />
          </div>

          <AICard
            title="AI Auto-Scoring"
            marbimPrompt="Explain how the AI auto-scoring system evaluates leads based on fit, intent, and engagement level. What are the key factors that determine a high score?"
            onAskMarbim={onAskMarbim}
          >
            <div className="text-sm text-[#6F83A7]">
              MARBIM auto-scores new leads based on fit, intent, and engagement level.
            </div>
          </AICard>
        </TabsContent>

        <TabsContent value="high-fit-leads" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-[#57ACAF]/10 to-transparent border border-[#57ACAF]/20 rounded-xl p-6">
              <div className="text-[#6F83A7] mb-2">High-Fit Leads</div>
              <div className="text-3xl text-white">{highFitLeadsData.length}</div>
            </div>
            <div className="bg-gradient-to-br from-[#EAB308]/10 to-transparent border border-[#EAB308]/20 rounded-xl p-6">
              <div className="text-[#6F83A7] mb-2">Average Score</div>
              <div className="text-3xl text-[#EAB308]">86</div>
            </div>
            <div className="bg-gradient-to-br from-[#57ACAF]/10 to-transparent border border-[#57ACAF]/20 rounded-xl p-6">
              <div className="text-[#6F83A7] mb-2">RFQ Probability</div>
              <div className="text-3xl text-white">78%</div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h3 className="text-white mb-4">High-Fit Leads (Score &gt; 80%)</h3>
            <SmartTable
              columns={allLeadsColumns}
              data={highFitLeadsData}
              searchPlaceholder="Search high-fit leads..."
              onRowClick={handleRowClick}
            />
          </div>

          <div className="p-4 rounded-xl bg-[#EAB308]/10 border border-[#EAB308]/20">
            <div className="flex items-start gap-3 justify-between pt-[5px] pr-[0px] pb-[0px] pl-[0px]">
              <div className="flex items-start gap-3 flex-1">
                <Target className="w-5 h-5 text-[#EAB308] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-white mb-1">AI Next Best Action</div>
                  <div className="text-sm text-[#6F83A7]">
                    MARBIM suggests next best actions — schedule meeting, send sample, or share catalog.
                  </div>
                </div>
              </div>
              <MarbimAIButton
                marbimPrompt="Based on these high-fit leads, what are the next best actions for each lead? Should we schedule meetings, send samples, or share catalogs?"
                onAskMarbim={onAskMarbim}
                size="lg"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="cold-leads" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-[#D0342C]/10 to-transparent border border-[#D0342C]/20 rounded-xl p-6">
              <div className="text-[#6F83A7] mb-2">Cold Leads</div>
              <div className="text-3xl text-[#D0342C]">{coldLeadsData.length}</div>
            </div>
            <div className="bg-gradient-to-br from-[#EAB308]/10 to-transparent border border-[#EAB308]/20 rounded-xl p-6">
              <div className="text-[#6F83A7] mb-2">No Activity (14+ days)</div>
              <div className="text-3xl text-white">8</div>
            </div>
            <div className="bg-gradient-to-br from-[#57ACAF]/10 to-transparent border border-[#57ACAF]/20 rounded-xl p-6">
              <div className="text-[#6F83A7] mb-2">Reactivation Target</div>
              <div className="text-3xl text-white">5</div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h3 className="text-white mb-4">Cold Leads (No interaction &gt; 14 days)</h3>
            <SmartTable
              columns={allLeadsColumns}
              data={coldLeadsData}
              searchPlaceholder="Search cold leads..."
              onRowClick={handleRowClick}
            />
          </div>

          <AICard
            title="AI Reactivation Campaign"
            marbimPrompt="Suggest reactivation campaign strategies for cold leads. Which leads should be prioritized for reactivation and which should be archived?"
            onAskMarbim={onAskMarbim}
          >
            <div className="text-sm text-[#6F83A7]">
              MARBIM recommends reactivation campaign or archives low-potential leads automatically.
            </div>
          </AICard>
        </TabsContent>

        <TabsContent value="ai-insights" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-[#57ACAF]/10 border border-[#57ACAF]/20 rounded-2xl p-6">
                <div className="flex items-start gap-3 mb-3">
                  <Target className="w-5 h-5 text-[#57ACAF] flex-shrink-0" />
                  <div className="text-white">Most Responsive Segment</div>
                </div>
                <p className="text-sm text-[#6F83A7] mb-4">
                  Most responsive segment: EU sportswear buyers showing 45% higher engagement.
                </p>
                <Button variant="outline" className="w-full border-[#57ACAF]/30 text-[#57ACAF]">
                  <Eye className="w-4 h-4 mr-2" />
                  View Segment
                </Button>
              </div>

              <div className="bg-[#EAB308]/10 border border-[#EAB308]/20 rounded-2xl p-6">
                <div className="flex items-start gap-3 mb-3">
                  <TrendingUp className="w-5 h-5 text-[#EAB308] flex-shrink-0" />
                  <div className="text-white">Trade Fair Performance</div>
                </div>
                <p className="text-sm text-[#6F83A7]">
                  Leads from Trade Fair X showing 30% higher RFQ conversion than other sources.
                </p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-white mb-4">Lead Score Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={[
                  { range: '0-40', count: 12 },
                  { range: '41-60', count: 18 },
                  { range: '61-80', count: 25 },
                  { range: '81-100', count: 15 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="range" stroke="#6F83A7" />
                  <YAxis stroke="#6F83A7" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0D1117',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                    }}
                  />
                  <Bar dataKey="count" fill="#57ACAF" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );

  const renderCampaigns = () => (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white mb-1">Campaigns</h2>
          <p className="text-sm text-[#6F83A7]">Automate outreach and engagement with AI assistance</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-white/10">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button 
            className="bg-[#EAB308] hover:bg-[#EAB308]/90 text-black"
            onClick={() => {
              setSelectedCampaign(null); // null means create new campaign
              setCampaignDrawerOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Start Campaign
          </Button>
        </div>
      </div>

      <Tabs key={`campaigns-${currentView}`} defaultValue="overview" className="space-y-6">
        {/* Tab Navigation */}
        <div className="relative bg-gradient-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-1.5 mb-6 shadow-lg shadow-black/20">
          <TabsList className="w-full grid grid-cols-5 bg-transparent gap-1.5 p-0 h-auto">
            <TabsTrigger 
              value="overview" 
              className="relative flex items-center justify-center gap-2.5 py-3.5 px-4 bg-white/5 hover:bg-white/10 data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#EAB308] data-[state=active]:to-[#EAB308]/80 data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-[#EAB308]/30 text-[#6F83A7] data-[state=active]:font-medium rounded-xl transition-all duration-300 group"
            >
              <BarChart3 className="w-4 h-4 group-data-[state=active]:scale-110 transition-transform" />
              <span className="text-xs">Overview</span>
            </TabsTrigger>
            <TabsTrigger 
              value="audience-builder" 
              className="relative flex items-center justify-center gap-2.5 py-3.5 px-4 bg-white/5 hover:bg-white/10 data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#EAB308] data-[state=active]:to-[#EAB308]/80 data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-[#EAB308]/30 text-[#6F83A7] data-[state=active]:font-medium rounded-xl transition-all duration-300 group"
            >
              <Users className="w-4 h-4 group-data-[state=active]:scale-110 transition-transform" />
              <span className="text-xs">Audience Builder</span>
            </TabsTrigger>
            <TabsTrigger 
              value="message-composer" 
              className="relative flex items-center justify-center gap-2.5 py-3.5 px-4 bg-white/5 hover:bg-white/10 data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#EAB308] data-[state=active]:to-[#EAB308]/80 data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-[#EAB308]/30 text-[#6F83A7] data-[state=active]:font-medium rounded-xl transition-all duration-300 group"
            >
              <Mail className="w-4 h-4 group-data-[state=active]:scale-110 transition-transform" />
              <span className="text-xs">Message Composer</span>
            </TabsTrigger>
            <TabsTrigger 
              value="schedule-send" 
              className="relative flex items-center justify-center gap-2.5 py-3.5 px-4 bg-white/5 hover:bg-white/10 data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#EAB308] data-[state=active]:to-[#EAB308]/80 data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-[#EAB308]/30 text-[#6F83A7] data-[state=active]:font-medium rounded-xl transition-all duration-300 group"
            >
              <Calendar className="w-4 h-4 group-data-[state=active]:scale-110 transition-transform" />
              <span className="text-xs">Schedule & Send</span>
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="relative flex items-center justify-center gap-2.5 py-3.5 px-4 bg-white/5 hover:bg-white/10 data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#EAB308] data-[state=active]:to-[#EAB308]/80 data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-[#EAB308]/30 text-[#6F83A7] data-[state=active]:font-medium rounded-xl transition-all duration-300 group"
            >
              <Activity className="w-4 h-4 group-data-[state=active]:scale-110 transition-transform" />
              <span className="text-xs">Analytics</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-6">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h3 className="text-white mb-4">Campaign Overview</h3>
            <SmartTable
              columns={campaignsColumns}
              data={campaigns}
              searchPlaceholder="Search campaigns..."
              onRowClick={handleRowClick}
            />
          </div>

          <div className="p-4 rounded-xl bg-[#57ACAF]/10 border border-[#57ACAF]/20">
            <div className="flex items-start gap-3 justify-between pt-[5px] pr-[0px] pb-[0px] pl-[0px]">
              <div className="flex items-start gap-3 flex-1">
                <Sparkles className="w-5 h-5 text-[#57ACAF] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-white mb-1">AI Engagement Prediction</div>
                  <div className="text-sm text-[#6F83A7]">
                    MARBIM predicts engagement time windows and suggests message variations for higher response rates.
                  </div>
                </div>
              </div>
              <MarbimAIButton
                marbimPrompt="Analyze engagement time windows and suggest message variations for the current campaign to maximize response rates based on historical data and recipient behavior patterns."
                onAskMarbim={onAskMarbim}
                size="lg"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="audience-builder" className="space-y-6">
          <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-[#57ACAF]/30 transition-all duration-250 shadow-lg">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#57ACAF]/10 via-transparent to-transparent border-b border-white/10 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#57ACAF]/20 border border-[#57ACAF]/30">
                    <Users className="w-4 h-4 text-[#57ACAF]" />
                  </div>
                  <div>
                    <h3 className="text-white">Audience Segments</h3>
                    <p className="text-xs text-[#6F83A7]">Targeted lead groups</p>
                  </div>
                </div>
                <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="sm"
                    onClick={() => setSegmentCreationOpen(true)}
                    className="relative group h-9 px-4 bg-gradient-to-r from-[#57ACAF]/20 to-[#57ACAF]/10 hover:from-[#57ACAF]/30 hover:to-[#57ACAF]/20 text-[#57ACAF] hover:text-white border border-[#57ACAF]/30 hover:border-[#57ACAF]/60 transition-all duration-180 shadow-lg shadow-[#57ACAF]/0 hover:shadow-[#57ACAF]/20 overflow-hidden"
                  >
                    {/* Animated glow effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-180">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#57ACAF]/10 to-transparent animate-shimmer" />
                    </div>
                    
                    {/* Content */}
                    <div className="relative flex items-center">
                      <motion.div
                        className="mr-2"
                        animate={{ rotate: [0, 90, 0] }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        whileHover={{ rotate: 90 }}
                      >
                        <Plus className="w-4 h-4" />
                      </motion.div>
                      <span className="font-medium">New Segment</span>
                    </div>
                    
                    {/* Corner accent */}
                    <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-[#57ACAF]/20 to-transparent rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-180" />
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Segments List */}
            <div className="p-6 space-y-4">
              {[
                { name: 'High-fit Denim Buyers — EU Market', count: 28, engagement: 85, region: 'EU', trend: 'up' },
                { name: 'Sustainable Fashion — North America', count: 42, engagement: 72, region: 'NA', trend: 'up' },
                { name: 'Trade Show Contacts — Active', count: 18, engagement: 68, region: 'Global', trend: 'stable' },
              ].map((segment, index) => {
                const accentColors = [
                  { bg: 'bg-[#57ACAF]/20', border: 'border-[#57ACAF]/30', text: 'text-[#57ACAF]', hover: 'hover:bg-[#57ACAF]/10' },
                  { bg: 'bg-[#EAB308]/20', border: 'border-[#EAB308]/30', text: 'text-[#EAB308]', hover: 'hover:bg-[#EAB308]/10' },
                  { bg: 'bg-[#6F83A7]/20', border: 'border-[#6F83A7]/30', text: 'text-[#6F83A7]', hover: 'hover:bg-[#6F83A7]/10' },
                ];
                const color = accentColors[index % accentColors.length];
                
                return (
                  <div 
                    key={index} 
                    className="group/item relative p-5 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-white/20 transition-all duration-180 hover:shadow-lg"
                  >
                    {/* Left accent bar */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${color.bg} rounded-l-xl opacity-60 group-hover/item:opacity-100 transition-opacity duration-180`} />
                    
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`p-1.5 rounded-lg ${color.bg} border ${color.border}`}>
                            <Globe className={`w-3.5 h-3.5 ${color.text}`} />
                          </div>
                          <h4 className="text-white truncate">{segment.name}</h4>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge className={`${color.bg} ${color.text} border ${color.border} text-xs px-2.5 py-0.5 rounded-full`}>
                            {segment.count} leads
                          </Badge>
                          <Badge className="bg-white/5 text-[#6F83A7] border border-white/10 text-xs px-2.5 py-0.5 rounded-full">
                            <MapPin className="w-3 h-3 mr-1" />
                            {segment.region}
                          </Badge>
                          {segment.trend === 'up' && (
                            <Badge className="bg-green-500/10 text-green-400 border border-green-500/20 text-xs px-2.5 py-0.5 rounded-full">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Growing
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Engagement Score */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-[#6F83A7]">Engagement Score</span>
                        <span className={color.text}>{segment.engagement}%</span>
                      </div>
                      <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className={`absolute inset-y-0 left-0 ${color.bg} rounded-full transition-all duration-500`}
                          style={{ width: `${segment.engagement}%` }}
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <Button
                        size="sm"
                        onClick={() => toast.success(`Launching campaign for ${segment.name}`)}
                        className="bg-gradient-to-r from-[#EAB308] to-[#EAB308]/80 hover:from-[#EAB308]/90 hover:to-[#EAB308]/70 text-black h-8 text-xs shadow-lg shadow-[#EAB308]/20"
                      >
                        <Send className="w-3.5 h-3.5 mr-1.5" />
                        Send Campaign
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setSelectedSegment(segment);
                          setSegmentDrawerOpen(true);
                        }}
                        className="text-[#6F83A7] hover:text-white hover:bg-white/10 h-8 text-xs border border-white/10 hover:border-white/20"
                      >
                        <Eye className="w-3.5 h-3.5 mr-1.5" />
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toast.info(`Editing ${segment.name}`)}
                        className="text-[#6F83A7] hover:text-white hover:bg-white/10 h-8 text-xs border border-white/10 hover:border-white/20"
                      >
                        <Settings className="w-3.5 h-3.5 mr-1.5" />
                        Edit
                      </Button>
                      {onAskMarbim && (
                        <div className="ml-auto">
                          <MarbimAIButton
                            marbimPrompt={`Analyze the "${segment.name}" audience segment with ${segment.count} leads and ${segment.engagement}% engagement. Provide recommendations for improving engagement, optimal campaign timing, and personalized outreach strategies.`}
                            onAskMarbim={onAskMarbim}
                            size="sm"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer with summary */}
            <div className="bg-gradient-to-r from-transparent via-white/5 to-transparent border-t border-white/10 px-6 py-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <div className="text-[#6F83A7]">
                    Total Leads: <span className="text-white">88</span>
                  </div>
                  <div className="text-[#6F83A7]">
                    Avg. Engagement: <span className="text-[#57ACAF]">75%</span>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => toast.info('Exporting segment data...')}
                  className="text-[#6F83A7] hover:text-white hover:bg-white/5"
                >
                  <Download className="w-3.5 h-3.5 mr-1.5" />
                  Export All
                </Button>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#EAB308]/10 border border-[#EAB308]/20">
            <div className="flex items-start gap-3 justify-between pt-[5px] pr-[0px] pb-[0px] pl-[0px]">
              <div className="flex items-start gap-3 flex-1">
                <Users className="w-5 h-5 text-[#EAB308] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-white mb-1">AI Audience Generation</div>
                  <div className="text-sm text-[#6F83A7]">
                    MARBIM auto-generates segmented audiences (e.g., "High-fit Denim Buyers — EU Market") based on behavior and attributes.
                  </div>
                </div>
              </div>
              <MarbimAIButton
                marbimPrompt="How does the AI audience generation work? What segments should I create for my lead nurturing campaigns based on behavior and attributes?"
                onAskMarbim={onAskMarbim}
                size="lg"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="message-composer" className="space-y-6">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-white mb-1">Message Templates</h3>
                <p className="text-xs text-[#6F83A7]">Pre-designed templates optimized for conversion</p>
              </div>
              <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="sm"
                  onClick={() => {
                    setSelectedTemplate(null);
                    setTemplateDrawerAction('edit');
                    setActiveTemplateTab('design');
                    setTemplateDrawerOpen(true);
                  }}
                  className="relative group h-9 px-4 bg-gradient-to-r from-[#57ACAF]/20 to-[#57ACAF]/10 hover:from-[#57ACAF]/30 hover:to-[#57ACAF]/20 text-[#57ACAF] hover:text-white border border-[#57ACAF]/30 hover:border-[#57ACAF]/60 transition-all duration-180 shadow-lg shadow-[#57ACAF]/0 hover:shadow-[#57ACAF]/20 overflow-hidden"
                >
                  {/* Animated glow effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-180">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#57ACAF]/10 to-transparent animate-shimmer" />
                  </div>
                  
                  {/* Content */}
                  <div className="relative flex items-center">
                    <motion.div
                      className="mr-2"
                      animate={{ rotate: [0, 90, 0] }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      whileHover={{ rotate: 90 }}
                    >
                      <Plus className="w-4 h-4" />
                    </motion.div>
                    <span className="font-medium">New Template</span>
                  </div>
                  
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-[#57ACAF]/20 to-transparent rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-180" />
                </Button>
              </motion.div>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Product Introduction', subject: 'Discover Premium Fabrics', performance: 'High Open Rate', variant: 'success', uses: 142 },
                { name: 'Follow-up After Meeting', subject: 'Thank you for connecting', performance: 'High Reply Rate', variant: 'success', uses: 98 },
                { name: 'Sample Request', subject: 'Request Your Free Sample', performance: 'Medium', variant: 'warning', uses: 65 },
              ].map((template, index) => (
                <motion.div 
                  key={index} 
                  whileHover={{ scale: 1.01 }}
                  className="group relative overflow-hidden p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-[#57ACAF]/30 transition-all duration-300"
                >
                  {/* Hover Gradient Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#57ACAF]/0 to-[#57ACAF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative">
                    {/* Header Row */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <FileText className="w-4 h-4 text-[#57ACAF] flex-shrink-0" />
                          <h4 className="text-white truncate">{template.name}</h4>
                          <Badge 
                            className={`
                              text-xs
                              ${template.variant === 'success' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : ''}
                              ${template.variant === 'warning' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : ''}
                            `}
                          >
                            {template.performance}
                          </Badge>
                        </div>
                        <div className="text-sm text-[#6F83A7] mb-1">
                          <Mail className="w-3.5 h-3.5 inline mr-1.5 mb-0.5" />
                          {template.subject}
                        </div>
                        <div className="text-xs text-[#6F83A7]/60">
                          Used {template.uses} times
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedTemplate(template);
                          setEmailCompositionOpen(true);
                        }}
                        className="flex-1 h-9 bg-gradient-to-r from-[#EAB308] to-[#EAB308]/80 hover:from-[#EAB308]/90 hover:to-[#EAB308]/70 text-black shadow-md shadow-[#EAB308]/20"
                      >
                        <Zap className="w-3.5 h-3.5 mr-1.5" />
                        Use Template
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedTemplate(template);
                          setTemplateDrawerAction('preview');
                          setActiveTemplateTab('preview');
                          setTemplateDrawerOpen(true);
                        }}
                        className="h-9 border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 text-white"
                      >
                        <Eye className="w-3.5 h-3.5 mr-1.5" />
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toast.success(`Duplicated: ${template.name}`)}
                        className="h-9 text-[#6F83A7] hover:text-white hover:bg-white/5"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#57ACAF]/10 border border-[#57ACAF]/20">
            <div className="flex items-start gap-3 justify-between pt-[5px] pr-[0px] pb-[0px] pl-[0px]">
              <div className="flex items-start gap-3 flex-1">
                <Mail className="w-5 h-5 text-[#57ACAF] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-white mb-1">AI Message Drafting</div>
                  <div className="text-sm text-[#6F83A7]">
                    MARBIM drafts email copies optimized for open and reply rates using historical performance data.
                  </div>
                </div>
              </div>
              <MarbimAIButton
                marbimPrompt="How does MARBIM draft email copies optimized for open and reply rates? What historical performance data does it use to improve messaging?"
                onAskMarbim={onAskMarbim}
                size="lg"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="schedule-send" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Send Schedule Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="group relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#EAB308]/30 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#EAB308]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EAB308]/20 to-[#EAB308]/5 flex items-center justify-center border border-[#EAB308]/20">
                    <Calendar className="w-5 h-5 text-[#EAB308]" />
                  </div>
                  <h3 className="text-white">Send Schedule</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="group/item">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-[#6F83A7]" />
                      <label className="text-sm text-[#6F83A7]">Send Window</label>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 text-white hover:border-[#EAB308]/20 transition-all duration-200">
                      <div className="flex items-center justify-between">
                        <span>Oct 28 - Nov 28, 2024</span>
                        <Badge className="bg-[#EAB308]/10 text-[#EAB308] border border-[#EAB308]/20">31 days</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group/item">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-[#6F83A7]" />
                      <label className="text-sm text-[#6F83A7]">Optimal Time</label>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 text-white hover:border-[#57ACAF]/20 transition-all duration-200">
                      <div className="flex items-center justify-between">
                        <span>2:00 PM - 4:00 PM</span>
                        <Badge className="bg-[#57ACAF]/10 text-[#57ACAF] border border-[#57ACAF]/20">Local Time</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group/item">
                    <div className="flex items-center gap-2 mb-2">
                      <RefreshCw className="w-4 h-4 text-[#6F83A7]" />
                      <label className="text-sm text-[#6F83A7]">Follow-up Cadence</label>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 text-white hover:border-[#6F83A7]/20 transition-all duration-200">
                      <div className="flex items-center justify-between">
                        <span>3 days after no response</span>
                        <Badge className="bg-[#6F83A7]/10 text-[#6F83A7] border border-[#6F83A7]/20">Auto</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Time Zone Distribution Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="group relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#57ACAF]/30 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#57ACAF]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#57ACAF]/20 to-[#57ACAF]/5 flex items-center justify-center border border-[#57ACAF]/20">
                    <Globe className="w-5 h-5 text-[#57ACAF]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white">Time Zone Distribution</h3>
                    <p className="text-sm text-white/50 mt-0.5">88 leads across 3 regions</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {[
                    { zone: 'EST (North America)', leads: 28, percentage: 32, color: '#EAB308', icon: MapPin },
                    { zone: 'GMT (Europe)', leads: 42, percentage: 48, color: '#57ACAF', icon: MapPin },
                    { zone: 'IST (Asia)', leads: 18, percentage: 20, color: '#6F83A7', icon: MapPin },
                  ].map((tz, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                      className="group/item relative overflow-hidden rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-4 hover:border-white/20 transition-all duration-200"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r opacity-10" style={{ 
                        background: `linear-gradient(to right, ${tz.color}15 0%, transparent 100%)`,
                        width: `${tz.percentage}%`
                      }} />
                      
                      <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${tz.color}15` }}>
                            <tz.icon className="w-4 h-4" style={{ color: tz.color }} />
                          </div>
                          <div className="flex-1">
                            <div className="text-white flex items-center gap-2">
                              {tz.zone}
                            </div>
                            <div className="text-xs text-white/50 mt-0.5">{tz.percentage}% of total</div>
                          </div>
                        </div>
                        <Badge className="text-white border" style={{ 
                          backgroundColor: `${tz.color}15`,
                          borderColor: `${tz.color}30`,
                          color: tz.color
                        }}>
                          {tz.leads} leads
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="p-4 rounded-xl bg-[#EAB308]/10 border border-[#EAB308]/20">
            <div className="flex items-start gap-3 justify-between pt-[5px] pr-[0px] pb-[0px] pl-[0px]">
              <div className="flex items-start gap-3 flex-1">
                <Calendar className="w-5 h-5 text-[#EAB308] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-white mb-1">AI Timing Optimization</div>
                  <div className="text-sm text-[#6F83A7]">
                    MARBIM optimizes timing and frequency for higher response probability based on recipient behavior patterns.
                  </div>
                </div>
              </div>
              <MarbimAIButton
                marbimPrompt="How does MARBIM optimize email timing and frequency for higher response probability? What recipient behavior patterns does it analyze to determine the best send times?"
                onAskMarbim={onAskMarbim}
                size="lg"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="relative bg-gradient-to-br from-[#1a1f2e]/80 via-[#252b3b]/60 to-[#1a1f2e]/80 border border-white/10 rounded-2xl p-6 overflow-hidden">
            {/* Decorative gradient overlay */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#EAB308]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#57ACAF]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10">
              {/* Header with controls */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#EAB308]/20 to-[#EAB308]/5 border border-[#EAB308]/30">
                    <BarChart2 className="w-5 h-5 text-[#EAB308]" />
                  </div>
                  <div>
                    <h3 className="text-white">Campaign Performance Analytics</h3>
                    <p className="text-xs text-[#6F83A7] mt-0.5">Multi-metric comparison across campaigns</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {/* Time period selector */}
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
                    <Calendar className="w-4 h-4 text-[#6F83A7]" />
                    <select className="bg-transparent text-sm text-white outline-none cursor-pointer">
                      <option value="7d" className="bg-[#1a1f2e]">Last 7 Days</option>
                      <option value="30d" className="bg-[#1a1f2e]">Last 30 Days</option>
                      <option value="90d" className="bg-[#1a1f2e]">Last 90 Days</option>
                    </select>
                  </div>
                  
                  <MarbimAIButton
                    prompt={`Analyze the campaign performance data across all campaigns. The data shows: ${campaignAnalyticsData.map(c => `${c.campaign}: ${c.openRate}% open rate, ${c.ctr}% CTR, ${c.responseRate}% response rate`).join('; ')}. What patterns do you see? Which campaigns are performing best and why? What optimization strategies would you recommend for underperforming campaigns? Provide specific, actionable insights to improve overall campaign effectiveness.`}
                    onAskMarbim={onAskMarbim}
                    size="sm"
                    variant="full"
                  />
                </div>
              </div>

              {/* Quick metrics cards */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="relative group p-4 rounded-xl bg-gradient-to-br from-[#EAB308]/10 to-transparent border border-[#EAB308]/20 hover:border-[#EAB308]/40 transition-all duration-180"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#EAB308]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-180 rounded-xl" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[#6F83A7]">Avg Open Rate</span>
                      <div className="p-1.5 rounded-lg bg-[#EAB308]/10">
                        <Eye className="w-3.5 h-3.5 text-[#EAB308]" />
                      </div>
                    </div>
                    <div className="text-2xl text-white mb-1">
                      {(campaignAnalyticsData.reduce((sum, c) => sum + c.openRate, 0) / campaignAnalyticsData.length).toFixed(1)}%
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[#57ACAF]">
                      <TrendingUp className="w-3 h-3" />
                      <span>+2.4% vs last period</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="relative group p-4 rounded-xl bg-gradient-to-br from-[#57ACAF]/10 to-transparent border border-[#57ACAF]/20 hover:border-[#57ACAF]/40 transition-all duration-180"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#57ACAF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-180 rounded-xl" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[#6F83A7]">Avg Click Rate</span>
                      <div className="p-1.5 rounded-lg bg-[#57ACAF]/10">
                        <Zap className="w-3.5 h-3.5 text-[#57ACAF]" />
                      </div>
                    </div>
                    <div className="text-2xl text-white mb-1">
                      {(campaignAnalyticsData.reduce((sum, c) => sum + c.ctr, 0) / campaignAnalyticsData.length).toFixed(1)}%
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[#57ACAF]">
                      <TrendingUp className="w-3 h-3" />
                      <span>+1.8% vs last period</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="relative group p-4 rounded-xl bg-gradient-to-br from-[#6F83A7]/10 to-transparent border border-[#6F83A7]/20 hover:border-[#6F83A7]/40 transition-all duration-180"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#6F83A7]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-180 rounded-xl" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[#6F83A7]">Avg Response Rate</span>
                      <div className="p-1.5 rounded-lg bg-[#6F83A7]/10">
                        <MessageSquare className="w-3.5 h-3.5 text-[#6F83A7]" />
                      </div>
                    </div>
                    <div className="text-2xl text-white mb-1">
                      {(campaignAnalyticsData.reduce((sum, c) => sum + c.responseRate, 0) / campaignAnalyticsData.length).toFixed(1)}%
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[#EAB308]">
                      <TrendingUp className="w-3 h-3" />
                      <span>+3.2% vs last period</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Enhanced chart with legend */}
              <div className="relative p-5 rounded-xl bg-[#0D1117]/40 border border-white/5">
                {/* Chart legend */}
                <div className="flex items-center justify-end gap-6 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-[#EAB308]" />
                    <span className="text-xs text-[#6F83A7]">Open Rate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-[#57ACAF]" />
                    <span className="text-xs text-[#6F83A7]">Click Rate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-[#6F83A7]" />
                    <span className="text-xs text-[#6F83A7]">Response Rate</span>
                  </div>
                </div>

                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={campaignAnalyticsData} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                    <defs>
                      <linearGradient id="openRateGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#EAB308" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#EAB308" stopOpacity={0.3} />
                      </linearGradient>
                      <linearGradient id="ctrGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#57ACAF" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#57ACAF" stopOpacity={0.3} />
                      </linearGradient>
                      <linearGradient id="responseGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6F83A7" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#6F83A7" stopOpacity={0.3} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                    <XAxis 
                      dataKey="campaign" 
                      stroke="#6F83A7" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={{ stroke: '#ffffff10' }}
                    />
                    <YAxis 
                      stroke="#6F83A7" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={{ stroke: '#ffffff10' }}
                      domain={[0, 100]}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0D1117',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '12px',
                        padding: '12px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                      }}
                      labelStyle={{ color: '#fff', marginBottom: '8px' }}
                      itemStyle={{ color: '#6F83A7', fontSize: '12px' }}
                      cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                    />
                    <Bar 
                      dataKey="openRate" 
                      fill="url(#openRateGradient)" 
                      radius={[8, 8, 0, 0]} 
                      name="Open Rate %" 
                      maxBarSize={60}
                    />
                    <Bar 
                      dataKey="ctr" 
                      fill="url(#ctrGradient)" 
                      radius={[8, 8, 0, 0]} 
                      name="CTR %" 
                      maxBarSize={60}
                    />
                    <Bar 
                      dataKey="responseRate" 
                      fill="url(#responseGradient)" 
                      radius={[8, 8, 0, 0]} 
                      name="Response %" 
                      maxBarSize={60}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Performance insights footer */}
              <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#EAB308]/5 via-[#57ACAF]/5 to-[#6F83A7]/5 border border-white/5">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#EAB308]/10 border border-[#EAB308]/20">
                    <Sparkles className="w-4 h-4 text-[#EAB308]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-white mb-1">Performance Insight</div>
                    <p className="text-xs text-[#6F83A7] leading-relaxed">
                      {campaignAnalyticsData[0]?.campaign} shows the highest engagement with {campaignAnalyticsData[0]?.openRate}% open rate. 
                      Consider replicating its messaging strategy across other campaigns for improved results.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-3 text-xs text-[#57ACAF] hover:text-white hover:bg-[#57ACAF]/10 border border-[#57ACAF]/20 hover:border-[#57ACAF]/40 transition-all duration-180"
                    >
                      <Download className="w-3 h-3 mr-1.5" />
                      Export
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#57ACAF]/10 border border-[#57ACAF]/20">
            <div className="flex items-start gap-3 justify-between pt-[5px] pr-[0px] pb-[0px] pl-[0px]">
              <div className="flex items-start gap-3 flex-1">
                <Activity className="w-5 h-5 text-[#57ACAF] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-white mb-1">AI Performance Analysis</div>
                  <div className="text-sm text-[#6F83A7]">
                    MARBIM identifies best-performing messages and updates scoring model for future campaigns.
                  </div>
                </div>
              </div>
              <MarbimAIButton
                marbimPrompt="How does MARBIM analyze campaign performance and identify best-performing messages? How does it update the scoring model for future campaigns based on this analysis?"
                onAskMarbim={onAskMarbim}
                size="lg"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );

  const renderLeadInbox = () => (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white mb-1">Lead Inbox</h2>
          <p className="text-sm text-[#6F83A7]">Unified communication feed for all buyer interactions</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-white/10">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button 
            className="bg-[#EAB308] hover:bg-[#EAB308]/90 text-black"
            onClick={() => {
              setEmailCompositionContext({
                type: 'followup',
                context: 'lead-inbox-followup',
                subject: 'Following up on our previous conversation',
              });
              setEmailCompositionOpen(true);
            }}
          >
            <Send className="w-4 h-4 mr-2" />
            Send Follow-up
          </Button>
        </div>
      </div>

      <Tabs key={`lead-inbox-${currentView}`} defaultValue="all-conversations" className="space-y-6">
        {/* Tab Navigation */}
        <div className="relative bg-gradient-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-1.5 mb-6 shadow-lg shadow-black/20">
          <TabsList className="w-full grid grid-cols-4 bg-transparent gap-1.5 p-0 h-auto">
            <TabsTrigger 
              value="all-conversations" 
              className="relative flex items-center justify-center gap-2.5 py-3.5 px-4 bg-white/5 hover:bg-white/10 data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#EAB308] data-[state=active]:to-[#EAB308]/80 data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-[#EAB308]/30 text-[#6F83A7] data-[state=active]:font-medium rounded-xl transition-all duration-300 group"
            >
              <MessageSquare className="w-4 h-4 group-data-[state=active]:scale-110 transition-transform" />
              <span className="text-xs">All Conversations</span>
            </TabsTrigger>
            <TabsTrigger 
              value="new-replies" 
              className="relative flex items-center justify-center gap-2.5 py-3.5 px-4 bg-white/5 hover:bg-white/10 data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#EAB308] data-[state=active]:to-[#EAB308]/80 data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-[#EAB308]/30 text-[#6F83A7] data-[state=active]:font-medium rounded-xl transition-all duration-300 group"
            >
              <Mail className="w-4 h-4 group-data-[state=active]:scale-110 transition-transform" />
              <span className="text-xs">New Replies</span>
            </TabsTrigger>
            <TabsTrigger 
              value="follow-ups" 
              className="relative flex items-center justify-center gap-2.5 py-3.5 px-4 bg-white/5 hover:bg-white/10 data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#EAB308] data-[state=active]:to-[#EAB308]/80 data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-[#EAB308]/30 text-[#6F83A7] data-[state=active]:font-medium rounded-xl transition-all duration-300 group"
            >
              <Clock className="w-4 h-4 group-data-[state=active]:scale-110 transition-transform" />
              <span className="text-xs">Follow-Ups</span>
            </TabsTrigger>
            <TabsTrigger 
              value="ai-insights" 
              className="relative flex items-center justify-center gap-2.5 py-3.5 px-4 bg-white/5 hover:bg-white/10 data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#EAB308] data-[state=active]:to-[#EAB308]/80 data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-[#EAB308]/30 text-[#6F83A7] data-[state=active]:font-medium rounded-xl transition-all duration-300 group"
            >
              <Sparkles className="w-4 h-4 group-data-[state=active]:scale-110 transition-transform" />
              <span className="text-xs">AI Insights</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all-conversations" className="space-y-6">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h3 className="text-white mb-4">All Conversations</h3>
            <SmartTable
              columns={conversationsColumns}
              data={conversations}
              searchPlaceholder="Search conversations..."
              onRowClick={handleRowClick}
            />
          </div>

          <div className="p-4 rounded-xl bg-[#57ACAF]/10 border border-[#57ACAF]/20">
            <div className="flex items-start gap-3 justify-between pt-[5px] pr-[0px] pb-[0px] pl-[0px]">
              <div className="flex items-start gap-3 flex-1">
                <Sparkles className="w-5 h-5 text-[#57ACAF] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-white mb-1">AI Intent Tagging</div>
                  <div className="text-sm text-[#6F83A7]">
                    MARBIM tags message intent (Interest / Info Request / RFQ / Complaint) automatically for prioritization.
                  </div>
                </div>
              </div>
              <MarbimAIButton
                marbimPrompt="How does MARBIM automatically tag message intent? What categories does it use (Interest, Info Request, RFQ, Complaint) and how does this help prioritize lead responses?"
                onAskMarbim={onAskMarbim}
                size="lg"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="new-replies" className="space-y-6">
          {/* Header with Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#57ACAF] to-[#57ACAF]/60 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <Badge className="bg-[#57ACAF]/10 text-[#57ACAF] border border-[#57ACAF]/20">Active</Badge>
              </div>
              <div className="text-2xl text-white mb-1">{newRepliesData.length}</div>
              <div className="text-xs text-[#6F83A7]">New Replies</div>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#EAB308] to-[#EAB308]/60 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-black" />
                </div>
                <TrendingUp className="w-4 h-4 text-[#57ACAF]" />
              </div>
              <div className="text-2xl text-white mb-1">4.2h</div>
              <div className="text-xs text-[#6F83A7]">Avg Response Time</div>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D0342C] to-[#D0342C]/60 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <Badge className="bg-[#D0342C]/10 text-[#D0342C] border border-[#D0342C]/20">Urgent</Badge>
              </div>
              <div className="text-2xl text-white mb-1">1</div>
              <div className="text-xs text-[#6F83A7]">Unassigned</div>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#9333EA] to-[#9333EA]/60 flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <Badge className="bg-[#9333EA]/10 text-[#9333EA] border border-[#9333EA]/20">High</Badge>
              </div>
              <div className="text-2xl text-white mb-1">85%</div>
              <div className="text-xs text-[#6F83A7]">Conversion Rate</div>
            </div>
          </div>

          {/* Priority Section */}
          <div className="bg-gradient-to-br from-[#D0342C]/10 to-[#D0342C]/5 border border-[#D0342C]/20 rounded-xl p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#D0342C]/20 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-[#D0342C]" />
                </div>
                <div>
                  <h3 className="text-white mb-1 flex items-center gap-2">
                    Priority Action Required
                    <Badge className="bg-[#D0342C]/10 text-[#D0342C] border border-[#D0342C]/20 text-xs">1 Unassigned</Badge>
                  </h3>
                  <p className="text-sm text-[#6F83A7]">
                    High-intent RFQ reply from Emma Wilson needs immediate assignment and response within 2 hours.
                  </p>
                </div>
              </div>
              <MarbimAIButton
                marbimPrompt="Help me prioritize and assign this high-intent conversation to the right team member"
                onAskMarbim={onAskMarbim}
              />
            </div>
            <div className="flex items-center gap-3">
              <Button 
                className="bg-gradient-to-r from-[#D0342C] to-[#D0342C]/80 text-white hover:from-[#D0342C]/90 hover:to-[#D0342C]/70"
                onClick={() => {
                  const conversation = newRepliesData[1]; // Emma Wilson
                  setSelectedConversation(conversation);
                  setConversationDrawerOpen(true);
                }}
              >
                <User className="w-4 h-4 mr-2" />
                Assign & Reply
              </Button>
              <Button 
                variant="outline"
                className="border-white/10 text-white hover:bg-white/5 bg-[rgba(255,255,255,0)]"
                onClick={() => onAskMarbim?.('Generate an AI-drafted reply for this high-intent RFQ conversation')}
              >
                <Sparkles className="w-4 h-4 mr-2 text-[#EAB308]" />
                AI Draft Reply
              </Button>
            </div>
          </div>

          {/* Conversation Cards */}
          <div className="space-y-4">
            {newRepliesData.map((conversation) => (
              <div 
                key={conversation.id} 
                className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-5 hover:border-[#57ACAF]/30 transition-all duration-300 cursor-pointer group"
                onClick={() => {
                  setSelectedConversation(conversation);
                  setConversationDrawerOpen(true);
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-gradient-to-br from-[#57ACAF] to-[#57ACAF]/60 text-white">
                        {conversation.contactName.split(' ').map((n: string) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-white">{conversation.contactName}</h4>
                        <Badge className={
                          conversation.intent === 'RFQ' ? 'bg-[#9333EA]/10 text-[#9333EA] border border-[#9333EA]/20' :
                          conversation.intent === 'Interest' ? 'bg-[#57ACAF]/10 text-[#57ACAF] border border-[#57ACAF]/20' :
                          'bg-[#EAB308]/10 text-[#EAB308] border border-[#EAB308]/20'
                        }>
                          {conversation.intent}
                        </Badge>
                        <Badge className="bg-white/10 text-[#6F83A7] border border-white/10">
                          {conversation.channel}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-[#6F83A7] mb-3">
                        <Building2 className="w-4 h-4" />
                        {conversation.company}
                      </div>

                      <div className="bg-white/5 border border-white/10 rounded-lg p-3 mb-3">
                        <div className="flex items-start gap-2">
                          <MessageSquare className="w-4 h-4 text-[#57ACAF] flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-white leading-relaxed">"{conversation.lastMessage}"</p>
                        </div>
                      </div>

                      {/* AI Analysis Preview */}
                      <div className="bg-gradient-to-br from-[#EAB308]/10 to-[#EAB308]/5 border border-[#EAB308]/20 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <Sparkles className="w-4 h-4 text-[#EAB308] flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <div className="text-xs text-[#EAB308] mb-1">AI Analysis</div>
                            <div className="text-sm text-white">
                              {conversation.intent === 'RFQ' ? 'High purchase intent detected. Recommended response time: 2 hours. 85% conversion probability.' :
                               conversation.intent === 'Interest' ? 'Strong buying signal. Sample request likely. Engage with catalog and pricing.' :
                               'Information gathering phase. Nurture with educational content and follow-up in 3 days.'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-4 text-xs text-[#6F83A7]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {conversation.timestamp}
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-[#57ACAF]" />
                      High Priority
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      size="sm"
                      variant="outline"
                      className="border-white/10 text-white hover:bg-white/5 bg-[rgba(255,255,255,0)]"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAskMarbim?.(`Draft a personalized reply for ${conversation.contactName} from ${conversation.company}`);
                      }}
                    >
                      <Sparkles className="w-3 h-3 mr-2 text-[#EAB308]" />
                      AI Draft
                    </Button>
                    <Button 
                      size="sm"
                      className="bg-gradient-to-r from-[#57ACAF] to-[#57ACAF]/80 text-white hover:from-[#57ACAF]/90 hover:to-[#57ACAF]/70 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEmailCompositionContext({
                          type: 'reply',
                          conversation: conversation,
                          recipient: {
                            name: conversation.contactName,
                            email: `${conversation.contactName.toLowerCase().replace(' ', '.')}@${conversation.company.toLowerCase().replace(/\s+/g, '')}.com`,
                            company: conversation.company
                          },
                          subject: `Re: ${conversation.intent === 'RFQ' ? 'Your RFQ Inquiry' : conversation.intent === 'Interest' ? 'Product Information' : 'Your Question'}`,
                          context: `Replying to: "${conversation.lastMessage}"`,
                          suggestedTone: conversation.intent === 'RFQ' ? 'professional' : 'friendly'
                        });
                        setEmailCompositionOpen(true);
                      }}
                    >
                      <Send className="w-3 h-3 mr-2" />
                      Reply Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* AI Insight Card */}
          <div className="bg-gradient-to-br from-[#EAB308]/10 to-[#EAB308]/5 border border-[#EAB308]/20 rounded-xl p-6">
            <div className="flex items-start gap-4 justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 rounded-lg bg-[#EAB308]/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#EAB308]" />
                </div>
                <div>
                  <div className="text-white mb-2">AI Reply Assistance</div>
                  <div className="text-sm text-[#6F83A7] leading-relaxed">
                    MARBIM analyzes conversation context, buyer history, and product interests to suggest personalized reply templates. It automatically detects intent (RFQ, Interest, Info Request) and assigns conversations to the most suitable team member based on expertise and workload.
                  </div>
                </div>
              </div>
              <MarbimAIButton
                marbimPrompt="How does MARBIM suggest appropriate reply templates for incoming messages? How does it automatically assign conversations to the right owner?"
                onAskMarbim={onAskMarbim}
                size="lg"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="follow-ups" className="space-y-6">
          {/* Header with Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#EAB308] to-[#EAB308]/60 flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 text-black" />
                </div>
                <Badge className="bg-[#EAB308]/10 text-[#EAB308] border border-[#EAB308]/20">Pending</Badge>
              </div>
              <div className="text-2xl text-white mb-1">{followUpsData.length}</div>
              <div className="text-xs text-[#6F83A7]">Follow-ups Due</div>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#57ACAF] to-[#57ACAF]/60 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <Badge className="bg-[#57ACAF]/10 text-[#57ACAF] border border-[#57ACAF]/20">Ready</Badge>
              </div>
              <div className="text-2xl text-white mb-1">1</div>
              <div className="text-xs text-[#6F83A7]">AI Drafts Ready</div>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#9333EA] to-[#9333EA]/60 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <TrendingUp className="w-4 h-4 text-[#57ACAF]" />
              </div>
              <div className="text-2xl text-white mb-1">3.2</div>
              <div className="text-xs text-[#6F83A7]">Avg Days Waiting</div>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#57ACAF] to-[#57ACAF]/60 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <Badge className="bg-[#57ACAF]/10 text-[#57ACAF] border border-[#57ACAF]/20">High</Badge>
              </div>
              <div className="text-2xl text-white mb-1">72%</div>
              <div className="text-xs text-[#6F83A7]">Response Rate</div>
            </div>
          </div>

          {/* AI Auto-Nudge Section */}
          <div className="bg-gradient-to-br from-[#57ACAF]/10 to-[#57ACAF]/5 border border-[#57ACAF]/20 rounded-xl p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#57ACAF]/20 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-[#57ACAF]" />
                </div>
                <div>
                  <h3 className="text-white mb-1 flex items-center gap-2">
                    AI Auto-Nudge Ready
                    <Badge className="bg-[#57ACAF]/10 text-[#57ACAF] border border-[#57ACAF]/20 text-xs">1 Draft</Badge>
                  </h3>
                  <p className="text-sm text-[#6F83A7]">
                    MARBIM has drafted a follow-up for Sophie Martin (3 days no response). Review and approve to send.
                  </p>
                </div>
              </div>
              <MarbimAIButton
                marbimPrompt="How does MARBIM's auto-nudge feature work? Show me the AI-drafted follow-up message"
                onAskMarbim={onAskMarbim}
              />
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
              <div className="text-xs text-[#6F83A7] mb-2">AI-Generated Follow-up Preview:</div>
              <div className="text-sm text-white leading-relaxed mb-3">
                "Hi Sophie, I wanted to follow up on the catalog we shared last week. Have you had a chance to review it? I'd be happy to answer any questions about our sustainable fabric collection or arrange samples. Looking forward to hearing from you!"
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Badge className="bg-[#57ACAF]/10 text-[#57ACAF] border border-[#57ACAF]/20">Friendly Tone</Badge>
                <Badge className="bg-[#EAB308]/10 text-[#EAB308] border border-[#EAB308]/20">Value-focused</Badge>
                <Badge className="bg-white/10 text-[#6F83A7] border border-white/10">Low Pressure</Badge>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                className="bg-gradient-to-r from-[#57ACAF] to-[#57ACAF]/80 text-white hover:from-[#57ACAF]/90 hover:to-[#57ACAF]/70"
                onClick={() => toast.success('Follow-up approved and sent!')}
              >
                <Send className="w-4 h-4 mr-2" />
                Approve & Send
              </Button>
              <Button 
                variant="outline"
                className="border-white/10 text-white hover:bg-white/5 bg-[rgba(255,255,255,0)]"
                onClick={() => toast.info('Opening editor...')}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Draft
              </Button>
              <Button 
                variant="outline"
                className="border-white/10 text-white hover:bg-white/5 bg-[rgba(255,255,255,0)]"
                onClick={() => onAskMarbim?.('Generate an alternative follow-up message for Sophie')}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Regenerate
              </Button>
            </div>
          </div>

          {/* Follow-up Cards */}
          <div className="space-y-4">
            {followUpsData.map((conversation, idx) => (
              <div 
                key={conversation.id} 
                className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-5 hover:border-[#EAB308]/30 transition-all duration-300 cursor-pointer group"
                onClick={() => {
                  setSelectedConversation(conversation);
                  setConversationDrawerOpen(true);
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-gradient-to-br from-[#EAB308] to-[#EAB308]/60 text-black">
                        {conversation.contactName.split(' ').map((n: string) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-white">{conversation.contactName}</h4>
                        <Badge className="bg-[#EAB308]/10 text-[#EAB308] border border-[#EAB308]/20">
                          Follow-up Due
                        </Badge>
                        {idx === 0 && (
                          <Badge className="bg-[#57ACAF]/10 text-[#57ACAF] border border-[#57ACAF]/20">
                            AI Draft Ready
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-[#6F83A7] mb-3">
                        <Building2 className="w-4 h-4" />
                        {conversation.company}
                      </div>

                      {/* Timeline Info */}
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                          <div className="text-xs text-[#6F83A7] mb-1">Last Contact</div>
                          <div className="text-sm text-white">{conversation.timestamp}</div>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                          <div className="text-xs text-[#6F83A7] mb-1">Next Action</div>
                          <div className="text-sm text-[#EAB308] flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Send nudge now
                          </div>
                        </div>
                      </div>

                      {/* Last Message Preview */}
                      <div className="bg-white/5 border border-white/10 rounded-lg p-3 mb-3">
                        <div className="text-xs text-[#6F83A7] mb-2">Last message:</div>
                        <div className="flex items-start gap-2">
                          <MessageSquare className="w-4 h-4 text-[#6F83A7] flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-white leading-relaxed">"{conversation.lastMessage}"</p>
                        </div>
                      </div>

                      {/* AI Suggestion */}
                      <div className="bg-gradient-to-br from-[#EAB308]/10 to-[#EAB308]/5 border border-[#EAB308]/20 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <Sparkles className="w-4 h-4 text-[#EAB308] flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <div className="text-xs text-[#EAB308] mb-1">AI Recommendation</div>
                            <div className="text-sm text-white">
                              {idx === 0 
                                ? 'Follow-up draft ready. Send within 24 hours for optimal engagement (68% response rate for this timing).'
                                : 'Schedule gentle nudge in 2 days. Lead showed interest but needs time to review materials.'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-4 text-xs text-[#6F83A7]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      3 days waiting
                    </span>
                    <span className="flex items-center gap-1">
                      <Activity className="w-3 h-3 text-[#EAB308]" />
                      Medium Priority
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {idx === 0 ? (
                      <>
                        <Button 
                          size="sm"
                          variant="outline"
                          className="border-white/10 text-white hover:bg-white/5 bg-[rgba(255,255,255,0)]"
                          onClick={(e) => {
                            e.stopPropagation();
                            toast.info('Opening AI draft...');
                          }}
                        >
                          <Eye className="w-3 h-3 mr-2" />
                          Review Draft
                        </Button>
                        <Button 
                          size="sm"
                          className="bg-gradient-to-r from-[#57ACAF] to-[#57ACAF]/80 text-white hover:from-[#57ACAF]/90 hover:to-[#57ACAF]/70 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            toast.success('Follow-up sent!');
                          }}
                        >
                          <Send className="w-3 h-3 mr-2" />
                          Send Now
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button 
                          size="sm"
                          variant="outline"
                          className="border-white/10 text-white hover:bg-white/5 bg-[rgba(255,255,255,0)]"
                          onClick={(e) => {
                            e.stopPropagation();
                            onAskMarbim?.(`Generate a follow-up message for ${conversation.contactName}`);
                          }}
                        >
                          <Sparkles className="w-3 h-3 mr-2 text-[#EAB308]" />
                          Generate Draft
                        </Button>
                        <Button 
                          size="sm"
                          variant="outline"
                          className="border-white/10 text-white hover:bg-white/5 bg-[rgba(255,255,255,0)] opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            toast.info('Scheduled for 2 days');
                          }}
                        >
                          <Calendar className="w-3 h-3 mr-2" />
                          Schedule
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom AI Insight Card */}
          <div className="bg-gradient-to-br from-[#57ACAF]/10 to-[#57ACAF]/5 border border-[#57ACAF]/20 rounded-xl p-6">
            <div className="flex items-start gap-4 justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 rounded-lg bg-[#57ACAF]/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#57ACAF]" />
                </div>
                <div>
                  <div className="text-white mb-2">Smart Auto-Nudge System</div>
                  <div className="text-sm text-[#6F83A7] leading-relaxed mb-3">
                    MARBIM monitors all conversations and automatically drafts follow-up messages after 3 days of inactivity. Each draft is personalized based on:
                  </div>
                  <ul className="text-sm text-[#6F83A7] space-y-1 ml-4">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#57ACAF] flex-shrink-0 mt-0.5" />
                      <span>Previous conversation context and tone</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#57ACAF] flex-shrink-0 mt-0.5" />
                      <span>Buyer's product interests and engagement level</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#57ACAF] flex-shrink-0 mt-0.5" />
                      <span>Optimal timing based on historical response patterns</span>
                    </li>
                  </ul>
                  <div className="mt-3 text-sm text-[#6F83A7]">
                    All drafts require manual approval before sending, ensuring you maintain control while saving time.
                  </div>
                </div>
              </div>
              <MarbimAIButton
                marbimPrompt="How does MARBIM's auto-nudge feature work? Explain the personalization process and approval workflow"
                onAskMarbim={onAskMarbim}
                size="lg"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="ai-insights" className="space-y-6">
          {/* Header Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#57ACAF] to-[#57ACAF]/60 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <Badge className="bg-[#57ACAF]/10 text-[#57ACAF] border border-[#57ACAF]/20">High</Badge>
              </div>
              <div className="text-2xl text-white mb-1">85%</div>
              <div className="text-xs text-[#6F83A7]">Conversion Potential</div>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#EAB308] to-[#EAB308]/60 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-black" />
                </div>
                <Badge className="bg-[#EAB308]/10 text-[#EAB308] border border-[#EAB308]/20">Active</Badge>
              </div>
              <div className="text-2xl text-white mb-1">12</div>
              <div className="text-xs text-[#6F83A7]">AI Recommendations</div>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#9333EA] to-[#9333EA]/60 flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <TrendingUp className="w-4 h-4 text-[#57ACAF]" />
              </div>
              <div className="text-2xl text-white mb-1">92%</div>
              <div className="text-xs text-[#6F83A7]">Pattern Accuracy</div>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#57ACAF] to-[#57ACAF]/60 flex items-center justify-center">
                  <BarChart2 className="w-5 h-5 text-white" />
                </div>
                <Badge className="bg-[#57ACAF]/10 text-[#57ACAF] border border-[#57ACAF]/20">+20%</Badge>
              </div>
              <div className="text-2xl text-white mb-1">82%</div>
              <div className="text-xs text-[#6F83A7]">Engagement Score</div>
            </div>
          </div>

          {/* Priority Actions */}
          <div>
            <h3 className="text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#EAB308]" />
              Priority Actions
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* High Priority Insight */}
              <div className="bg-gradient-to-br from-[#57ACAF]/10 to-[#57ACAF]/5 border border-[#57ACAF]/20 rounded-xl p-5">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#57ACAF]/20 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-[#57ACAF]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-white">High Conversion Opportunity</h4>
                      <Badge className="bg-[#57ACAF]/10 text-[#57ACAF] border border-[#57ACAF]/20 text-xs">85% Confidence</Badge>
                    </div>
                    <p className="text-sm text-[#6F83A7] mb-3">
                      John Smith from TrendWear UK replied positively to catalog. Strong buying signals detected—convert to RFQ pipeline now.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge className="bg-white/10 text-[#6F83A7] border border-white/10 text-xs">
                        Catalog Viewed
                      </Badge>
                      <Badge className="bg-white/10 text-[#6F83A7] border border-white/10 text-xs">
                        Positive Sentiment
                      </Badge>
                      <Badge className="bg-white/10 text-[#6F83A7] border border-white/10 text-xs">
                        Sample Request
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    className="flex-1 bg-gradient-to-r from-[#57ACAF] to-[#57ACAF]/80 text-white hover:from-[#57ACAF]/90 hover:to-[#57ACAF]/70"
                    onClick={() => toast.success('Creating RFQ...')}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Convert to RFQ
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-white/10 text-white hover:bg-white/5 bg-[rgba(255,255,255,0)]"
                    onClick={() => {
                      const conversation = conversationsData[0];
                      setSelectedConversation(conversation);
                      setConversationDrawerOpen(true);
                    }}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Channel Optimization */}
              <div className="bg-gradient-to-br from-[#EAB308]/10 to-[#EAB308]/5 border border-[#EAB308]/20 rounded-xl p-5">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#EAB308]/20 flex items-center justify-center flex-shrink-0">
                    <Activity className="w-5 h-5 text-[#EAB308]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-white">WhatsApp Engagement Surge</h4>
                      <Badge className="bg-[#EAB308]/10 text-[#EAB308] border border-[#EAB308]/20 text-xs">+20% This Week</Badge>
                    </div>
                    <p className="text-sm text-[#6F83A7] mb-3">
                      WhatsApp response rate jumped to 82%, outperforming email (68%) and LinkedIn (55%). Prioritize this channel for high-value leads.
                    </p>
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#6F83A7]">WhatsApp</span>
                        <span className="text-[#57ACAF]">82%</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#57ACAF] to-[#57ACAF]/60" style={{width: '82%'}} />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#6F83A7]">Email</span>
                        <span className="text-white">68%</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#6F83A7] to-[#6F83A7]/60" style={{width: '68%'}} />
                      </div>
                    </div>
                  </div>
                </div>
                <Button 
                  variant="outline"
                  className="w-full border-white/10 text-white hover:bg-white/5 bg-[rgba(255,255,255,0)]"
                  onClick={() => onAskMarbim?.('Show me detailed WhatsApp engagement analytics and best practices')}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Channel Analytics
                </Button>
              </div>
            </div>
          </div>

          {/* Pattern Detection */}
          <div>
            <h3 className="text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-[#9333EA]" />
              Pattern Detection & Predictions
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#9333EA] to-[#9333EA]/60 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <Badge className="bg-[#9333EA]/10 text-[#9333EA] border border-[#9333EA]/20">Pattern</Badge>
                </div>
                <h4 className="text-white mb-2">Optimal Contact Time</h4>
                <div className="text-sm text-[#6F83A7] mb-3">
                  Tuesday-Thursday, 10-11 AM shows 45% higher response rate for UK buyers.
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Badge className="bg-white/10 text-[#6F83A7] border border-white/10">UK Buyers</Badge>
                  <Badge className="bg-[#57ACAF]/10 text-[#57ACAF] border border-[#57ACAF]/20">+45%</Badge>
                </div>
              </div>

              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#57ACAF] to-[#57ACAF]/60 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <Badge className="bg-[#57ACAF]/10 text-[#57ACAF] border border-[#57ACAF]/20">Pattern</Badge>
                </div>
                <h4 className="text-white mb-2">Response Timing</h4>
                <div className="text-sm text-[#6F83A7] mb-3">
                  Leads that reply within 24h have 3x higher RFQ conversion rate (72% vs 24%).
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Badge className="bg-white/10 text-[#6F83A7] border border-white/10">Quick Reply</Badge>
                  <Badge className="bg-[#57ACAF]/10 text-[#57ACAF] border border-[#57ACAF]/20">3x Impact</Badge>
                </div>
              </div>

              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#EAB308] to-[#EAB308]/60 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-black" />
                  </div>
                  <Badge className="bg-[#EAB308]/10 text-[#EAB308] border border-[#EAB308]/20">Pattern</Badge>
                </div>
                <h4 className="text-white mb-2">Content Preference</h4>
                <div className="text-sm text-[#6F83A7] mb-3">
                  Leads engaging with sustainability content convert 2.3x faster (avg 5 vs 11.5 days).
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Badge className="bg-white/10 text-[#6F83A7] border border-white/10">Sustainability</Badge>
                  <Badge className="bg-[#57ACAF]/10 text-[#57ACAF] border border-[#57ACAF]/20">2.3x Faster</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Insights */}
          <div>
            <h3 className="text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#EAB308]" />
              Advanced AI Insights
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {/* Sentiment Analysis */}
              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#57ACAF] to-[#57ACAF]/60 flex items-center justify-center flex-shrink-0">
                      <Activity className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white mb-2">Sentiment Analysis Trends</h4>
                      <p className="text-sm text-[#6F83A7] mb-4">
                        Overall sentiment improved 15% this week. 78% positive, 18% neutral, 4% negative responses.
                      </p>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 rounded-full bg-[#57ACAF]" />
                            <span className="text-xs text-[#6F83A7]">Positive</span>
                          </div>
                          <div className="text-xl text-white">78%</div>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 rounded-full bg-[#6F83A7]" />
                            <span className="text-xs text-[#6F83A7]">Neutral</span>
                          </div>
                          <div className="text-xl text-white">18%</div>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 rounded-full bg-[#D0342C]" />
                            <span className="text-xs text-[#6F83A7]">Negative</span>
                          </div>
                          <div className="text-xl text-white">4%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <MarbimAIButton
                    marbimPrompt="Show me detailed sentiment analysis trends and how to address the 4% negative responses"
                    onAskMarbim={onAskMarbim}
                  />
                </div>
              </div>

              {/* Intent Distribution */}
              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#EAB308] to-[#EAB308]/60 flex items-center justify-center flex-shrink-0">
                      <Target className="w-5 h-5 text-black" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white mb-2">Conversation Intent Distribution</h4>
                      <p className="text-sm text-[#6F83A7] mb-4">
                        MARBIM automatically categorizes all conversations by intent to help prioritize responses.
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-[#9333EA]/10 text-[#9333EA] border border-[#9333EA]/20">RFQ</Badge>
                            <span className="text-sm text-[#6F83A7]">Direct purchase inquiries</span>
                          </div>
                          <span className="text-white">35%</span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[#9333EA] to-[#9333EA]/60" style={{width: '35%'}} />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-[#57ACAF]/10 text-[#57ACAF] border border-[#57ACAF]/20">Interest</Badge>
                            <span className="text-sm text-[#6F83A7]">Product exploration</span>
                          </div>
                          <span className="text-white">45%</span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[#57ACAF] to-[#57ACAF]/60" style={{width: '45%'}} />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-[#EAB308]/10 text-[#EAB308] border border-[#EAB308]/20">Info Request</Badge>
                            <span className="text-sm text-[#6F83A7]">General questions</span>
                          </div>
                          <span className="text-white">18%</span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[#EAB308] to-[#EAB308]/60" style={{width: '18%'}} />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-[#D0342C]/10 text-[#D0342C] border border-[#D0342C]/20">Complaint</Badge>
                            <span className="text-sm text-[#6F83A7]">Issues & concerns</span>
                          </div>
                          <span className="text-white">2%</span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[#D0342C] to-[#D0342C]/60" style={{width: '2%'}} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <MarbimAIButton
                    marbimPrompt="Explain how MARBIM categorizes conversation intent and how this affects prioritization"
                    onAskMarbim={onAskMarbim}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-gradient-to-br from-[#57ACAF]/10 to-[#57ACAF]/5 border border-[#57ACAF]/20 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#57ACAF]/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-[#57ACAF]" />
              </div>
              <div className="flex-1">
                <h4 className="text-white mb-2">This Week's AI Recommendations</h4>
                <ul className="space-y-2 text-sm text-[#6F83A7]">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#57ACAF] flex-shrink-0 mt-0.5" />
                    <span>Prioritize WhatsApp for UK buyers (82% engagement vs 68% email)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#57ACAF] flex-shrink-0 mt-0.5" />
                    <span>Schedule follow-ups for Tuesday-Thursday 10-11 AM for optimal response</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#57ACAF] flex-shrink-0 mt-0.5" />
                    <span>Include sustainability content in campaigns (2.3x faster conversion)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#57ACAF] flex-shrink-0 mt-0.5" />
                    <span>Respond to RFQ-intent conversations within 2 hours (85% conversion rate)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );

  const renderAnalytics = () => (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white mb-1">Analytics</h2>
          <p className="text-sm text-[#6F83A7]">Campaign performance metrics and insights</p>
        </div>
      </div>

      {/* Campaign Analytics */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-6">
        <h3 className="text-white mb-6">Campaign Performance Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={campaignAnalyticsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis dataKey="campaign" stroke="#6F83A7" />
            <YAxis stroke="#6F83A7" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0D1117',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
              }}
            />
            <Bar dataKey="openRate" fill="#EAB308" radius={[8, 8, 0, 0]} name="Open Rate %" />
            <Bar dataKey="ctr" fill="#57ACAF" radius={[8, 8, 0, 0]} name="CTR %" />
            <Bar dataKey="responseRate" fill="#6F83A7" radius={[8, 8, 0, 0]} name="Response %" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-to-br from-[#EAB308]/10 to-transparent border border-[#EAB308]/20 rounded-xl p-6">
          <div className="text-[#6F83A7] mb-2">Average Open Rate</div>
          <div className="text-3xl text-white mb-2">68.3%</div>
          <div className="text-sm text-[#57ACAF]">+5.2% from last month</div>
        </div>
        <div className="bg-gradient-to-br from-[#57ACAF]/10 to-transparent border border-[#57ACAF]/20 rounded-xl p-6">
          <div className="text-[#6F83A7] mb-2">Average CTR</div>
          <div className="text-3xl text-white mb-2">24.7%</div>
          <div className="text-sm text-[#57ACAF]">+3.1% from last month</div>
        </div>
        <div className="bg-gradient-to-br from-[#6F83A7]/10 to-transparent border border-[#6F83A7]/20 rounded-xl p-6">
          <div className="text-[#6F83A7] mb-2">Conversion Rate</div>
          <div className="text-3xl text-white mb-2">17.9%</div>
          <div className="text-sm text-[#57ACAF]">+2.8% from last month</div>
        </div>
      </div>

      {/* AI Insights */}
      <AICard
        title="AI Performance Analysis"
        marbimPrompt="Analyze campaign performance trends and provide recommendations for improving engagement rates across different audience segments."
        onAskMarbim={onAskMarbim}
      >
        <div className="text-sm text-[#6F83A7]">
          MARBIM identifies best-performing messages and updates scoring model for future campaigns.
        </div>
      </AICard>
    </>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return renderDashboard();
      case 'campaigns':
        return renderCampaigns();
      case 'lead-inbox':
        return renderLeadInbox();
      case 'directory':
        return renderLeadsList();
      case 'analytics':
        return renderAnalytics();
      default:
        return renderDashboard();
    }
  };

  const getBreadcrumbs = () => {
    const baseBreadcrumbs = [
      { label: 'CRM & Sales' },
      { label: 'Lead Management' }
    ];

    const viewLabels: { [key: string]: string } = {
      'dashboard': 'Dashboard',
      'campaigns': 'Campaigns',
      'lead-inbox': 'Lead Inbox',
      'directory': 'Directory',
      'analytics': 'Analytics',
    };

    if (currentView !== 'dashboard') {
      baseBreadcrumbs.push({ label: viewLabels[currentView] });
    }

    return baseBreadcrumbs;
  };

  return (
    <>
      <PageLayout
        breadcrumbs={getBreadcrumbs()}
        aiInsightsCount={5}
      >
        {renderContent()}
      </PageLayout>

      {/* Lead Detail Drawer - for Directory views */}
      {currentView === 'directory' && (
        <LeadDetailDrawer
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          lead={selectedRecord}
          onAskMarbim={onAskMarbim}
          onSendEmail={() => {
            if (selectedRecord) {
              setEmailCompositionContext({
                prefilledRecipient: {
                  name: selectedRecord.leadName || selectedRecord.contactName,
                  email: selectedRecord.email || `${selectedRecord.leadName?.toLowerCase().replace(' ', '.')}@${selectedRecord.company?.toLowerCase().replace(' ', '')}.com`
                },
                prefilledSubject: `Following up on your inquiry`,
                context: `Lead from ${selectedRecord.company || 'company'} - Score: ${selectedRecord.score || 85}%`,
                compositionType: 'new'
              });
              setEmailCompositionOpen(true);
              setDrawerOpen(false);
            }
          }}
        />
      )}

      {/* Detail Drawer - for other views */}
      {currentView !== 'directory' && (
        <DetailDrawer
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          data={drawerData}
          module="Lead Management"
          subPage={currentView}
          onNavigateToFullPage={() => {
            if (drawerData && onNavigateToPage) {
              onNavigateToPage(`lead-management/${currentView}/detail/${drawerData.id}`);
              setDrawerOpen(false);
            }
          }}
        />
      )}

      {/* Campaign Detail Drawer */}
      <CampaignDetailDrawer
        isOpen={campaignDrawerOpen}
        onClose={() => setCampaignDrawerOpen(false)}
        campaign={selectedCampaign}
        onAskMarbim={onAskMarbim}
        onOpenAI={() => setCampaignDrawerOpen(false)}
      />

      {/* Conversation Detail Drawer */}
      <ConversationDetailDrawer
        open={conversationDrawerOpen}
        onClose={() => setConversationDrawerOpen(false)}
        conversation={selectedConversation}
        onAskMarbim={onAskMarbim}
      />

      {/* Segment Creation Drawer */}
      <SegmentCreationDrawer
        open={segmentCreationOpen}
        onClose={() => setSegmentCreationOpen(false)}
        onAskMarbim={onAskMarbim}
      />

      {/* Segment Details Drawer */}
      <Sheet open={segmentDrawerOpen} onOpenChange={setSegmentDrawerOpen}>
        <SheetContent className="w-full sm:max-w-3xl bg-gradient-to-br from-[#0a0f1a] via-[#101725] to-[#182336] border-l border-white/10 overflow-y-auto p-0 top-16 bottom-[72px]">
          {selectedSegment && (
            <>
              {/* Close Button - Consistent Pattern */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSegmentDrawerOpen(false)}
                className="absolute top-4 right-4 z-50 text-[#6F83A7] hover:text-white hover:bg-white/10 shrink-0 backdrop-blur-sm"
              >
                <X className="w-5 h-5" />
              </Button>

              {/* Premium Header with Glassmorphism */}
              <div className="relative px-8 pt-8 pb-6 border-b border-white/10 backdrop-blur-xl">
                {/* Background Gradient Orb */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#57ACAF]/5 rounded-full blur-3xl -z-10" />
                
                <div className="flex items-start gap-5 mb-6">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#57ACAF] to-[#57ACAF]/40 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                    <div className="relative p-4 rounded-2xl bg-gradient-to-br from-[#57ACAF]/30 to-[#57ACAF]/10 border border-[#57ACAF]/40 backdrop-blur-sm">
                      <Globe className="w-8 h-8 text-[#57ACAF]" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <SheetTitle className="text-white text-3xl mb-3 tracking-tight">
                      {selectedSegment.name}
                    </SheetTitle>
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#57ACAF]/20 to-[#57ACAF]/10 border border-[#57ACAF]/40 backdrop-blur-sm">
                        <span className="text-[#57ACAF] text-sm">
                          <Users className="w-3.5 h-3.5 inline mr-1.5 mb-0.5" />
                          {selectedSegment.count} leads
                        </span>
                      </div>
                      <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                        <span className="text-[#6F83A7] text-sm">
                          <MapPin className="w-3.5 h-3.5 inline mr-1.5 mb-0.5" />
                          {selectedSegment.region}
                        </span>
                      </div>
                      {selectedSegment.trend === 'up' && (
                        <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/20 to-green-500/10 border border-emerald-500/30 backdrop-blur-sm animate-pulse">
                          <span className="text-emerald-400 text-sm">
                            <TrendingUp className="w-3.5 h-3.5 inline mr-1.5 mb-0.5" />
                            Growing
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quick Stats Row */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="relative group overflow-hidden rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 p-4 backdrop-blur-sm hover:border-[#57ACAF]/30 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#57ACAF]/0 to-[#57ACAF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <div className="text-[#6F83A7] text-xs uppercase tracking-wider mb-1">Engagement</div>
                      <div className="text-white text-2xl">{selectedSegment.engagement}%</div>
                    </div>
                  </div>
                  <div className="relative group overflow-hidden rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 p-4 backdrop-blur-sm hover:border-[#EAB308]/30 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#EAB308]/0 to-[#EAB308]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <div className="text-[#6F83A7] text-xs uppercase tracking-wider mb-1">Conversion</div>
                      <div className="text-white text-2xl">24%</div>
                    </div>
                  </div>
                  <div className="relative group overflow-hidden rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 p-4 backdrop-blur-sm hover:border-[#6F83A7]/30 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#6F83A7]/0 to-[#6F83A7]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <div className="text-[#6F83A7] text-xs uppercase tracking-wider mb-1">Revenue</div>
                      <div className="text-white text-2xl">$48K</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accent Line with Gradient */}
              <div className="relative h-1 bg-gradient-to-r from-transparent via-[#57ACAF] to-transparent">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </div>

              {/* Sleek Tabs Navigation */}
              <div className="relative border-b border-white/10 bg-gradient-to-b from-white/5 to-transparent">
                <div className="flex items-center px-8 gap-1">
                  {[
                    { id: 'overview', label: 'Overview', icon: BarChart3 },
                    { id: 'leads', label: 'Leads', icon: Users },
                    { id: 'engagement', label: 'Engagement', icon: Activity },
                    { id: 'campaigns', label: 'Campaigns', icon: Send },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveSegmentTab(tab.id)}
                      className={`
                        relative px-4 py-3 text-xs transition-all duration-300 flex items-center gap-2
                        ${activeSegmentTab === tab.id 
                          ? 'text-[#57ACAF]' 
                          : 'text-[#6F83A7] hover:text-white'
                        }
                      `}
                    >
                      {/* Tab Icon & Label */}
                      <tab.icon className="w-4 h-4" />
                      <span className="relative z-10">{tab.label}</span>
                      
                      {/* Active Tab Indicator */}
                      {activeSegmentTab === tab.id && (
                        <>
                          {/* Glow Effect */}
                          <motion.div
                            layoutId="segmentTabGlow"
                            className="absolute inset-0 bg-gradient-to-b from-[#57ACAF]/20 to-transparent rounded-t-lg"
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                          />
                          {/* Bottom Border */}
                          <motion.div
                            layoutId="segmentTabIndicator"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#57ACAF] via-[#57ACAF]/80 to-[#57ACAF]"
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                          />
                          {/* Shimmer Effect */}
                          <motion.div
                            layoutId="segmentTabShimmer"
                            className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                          />
                        </>
                      )}
                      
                      {/* Hover Effect for Inactive Tabs */}
                      {activeSegmentTab !== tab.id && (
                        <div className="absolute inset-0 bg-white/0 hover:bg-white/5 rounded-t-lg transition-colors duration-200" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content Container */}
              <div className="flex-1 overflow-y-auto custom-scrollbar">"

                {/* Overview Tab - Premium Design */}
                {activeSegmentTab === 'overview' && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="p-8 space-y-6"
                  >
                  {/* Hero Metric Cards with Animations */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-[#57ACAF]/20 via-[#57ACAF]/10 to-transparent border border-[#57ACAF]/30 p-6 backdrop-blur-sm hover:border-[#57ACAF]/50 transition-all duration-300">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#57ACAF]/10 rounded-full blur-2xl group-hover:w-40 group-hover:h-40 transition-all duration-500" />
                      <div className="relative">
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-[#57ACAF] text-xs uppercase tracking-wider">Total Leads</div>
                          <Users className="w-5 h-5 text-[#57ACAF]/50" />
                        </div>
                        <div className="text-white text-4xl mb-2">{selectedSegment.count}</div>
                        <div className="flex items-center gap-2 text-sm">
                          <TrendingUp className="w-4 h-4 text-emerald-400" />
                          <span className="text-emerald-400">+12% this month</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-[#EAB308]/20 via-[#EAB308]/10 to-transparent border border-[#EAB308]/30 p-6 backdrop-blur-sm hover:border-[#EAB308]/50 transition-all duration-300">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#EAB308]/10 rounded-full blur-2xl group-hover:w-40 group-hover:h-40 transition-all duration-500" />
                      <div className="relative">
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-[#EAB308] text-xs uppercase tracking-wider">Engagement</div>
                          <Activity className="w-5 h-5 text-[#EAB308]/50" />
                        </div>
                        <div className="text-white text-4xl mb-2">{selectedSegment.engagement}%</div>
                        <div className="flex items-center gap-2 text-sm">
                          <Target className="w-4 h-4 text-[#EAB308]" />
                          <span className="text-[#6F83A7]">Above avg by 18%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Advanced Engagement Meter */}
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 p-6 backdrop-blur-sm">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#57ACAF]/5 to-transparent rounded-full blur-3xl" />
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-white text-lg mb-1">Engagement Health Score</h4>
                          <p className="text-sm text-[#6F83A7]">Composite metric across all touchpoints</p>
                        </div>
                        <div className="px-4 py-2 rounded-full bg-gradient-to-r from-[#57ACAF]/20 to-[#57ACAF]/10 border border-[#57ACAF]/30">
                          <span className="text-[#57ACAF] text-xl">{selectedSegment.engagement}%</span>
                        </div>
                      </div>
                      <Progress value={selectedSegment.engagement} className="h-4 mb-3" />
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#57ACAF]" />
                          <span className="text-xs text-[#6F83A7]">Email: 82%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#EAB308]" />
                          <span className="text-xs text-[#6F83A7]">Click: 68%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#6F83A7]" />
                          <span className="text-xs text-[#6F83A7]">Response: 45%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Segment Intelligence Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 p-5 backdrop-blur-sm space-y-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-[#57ACAF]/20 border border-[#57ACAF]/30">
                          <MapPin className="w-4 h-4 text-[#57ACAF]" />
                        </div>
                        <h4 className="text-white">Geographic</h4>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-[#6F83A7]">Region</span>
                          <span className="text-white">{selectedSegment.region}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-[#6F83A7]">Coverage</span>
                          <span className="text-white">3 markets</span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 p-5 backdrop-blur-sm space-y-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-[#EAB308]/20 border border-[#EAB308]/30">
                          <TrendingUp className="w-4 h-4 text-[#EAB308]" />
                        </div>
                        <h4 className="text-white">Performance</h4>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-[#6F83A7]">Trend</span>
                          <span className="text-emerald-400">{selectedSegment.trend === 'up' ? 'Growing' : 'Stable'}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-[#6F83A7]">Quality</span>
                          <span className="text-white">High</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Info */}
                  <div className="rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 p-5 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-[#6F83A7]/20 border border-[#6F83A7]/30">
                        <Clock className="w-4 h-4 text-[#6F83A7]" />
                      </div>
                      <h4 className="text-white">Timeline</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-[#6F83A7] mb-1">Created</div>
                        <div className="text-white">Jan 15, 2025</div>
                      </div>
                      <div>
                        <div className="text-xs text-[#6F83A7] mb-1">Last Activity</div>
                        <div className="text-white">2 hours ago</div>
                      </div>
                    </div>
                  </div>

                  {/* Premium AI Insights Card */}
                  {onAskMarbim && (
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#57ACAF]/20 via-[#57ACAF]/10 to-transparent border border-[#57ACAF]/30 p-6 backdrop-blur-sm">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-[#57ACAF]/10 rounded-full blur-3xl animate-pulse" />
                      <div className="relative">
                        <div className="flex items-start gap-4 justify-between mb-5">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="p-3 rounded-xl bg-[#57ACAF]/30 border border-[#57ACAF]/40">
                              <Sparkles className="w-6 h-6 text-[#57ACAF]" />
                            </div>
                            <div>
                              <div className="text-white text-lg mb-2">AI-Powered Insights</div>
                              <p className="text-sm text-[#6F83A7] leading-relaxed">
                                Get strategic recommendations to maximize engagement and conversion rates for this segment
                              </p>
                            </div>
                          </div>
                        </div>
                        <MarbimAIButton
                          marbimPrompt={`Provide comprehensive strategic analysis for the "${selectedSegment.name}" segment with ${selectedSegment.count} leads and ${selectedSegment.engagement}% engagement. Include: 1) Deep engagement improvement strategies 2) Optimal campaign timing and frequency 3) Personalized outreach tactics 4) A/B testing recommendations 5) Risk factors to monitor 6) Revenue optimization opportunities`}
                          onAskMarbim={onAskMarbim}
                          size="lg"
                        />
                      </div>
                    </div>
                  )}
                  </motion.div>
                )}

                {/* Leads Tab - Modern Card Grid */}
                {activeSegmentTab === 'leads' && (
                  <motion.div
                    key="leads"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="p-8 space-y-6"
                  >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white text-xl mb-1">Lead Directory</h4>
                      <p className="text-sm text-[#6F83A7]">28 qualified prospects in this segment</p>
                    </div>
                    <Button className="bg-gradient-to-r from-[#57ACAF] to-[#57ACAF]/80 hover:from-[#57ACAF]/90 hover:to-[#57ACAF]/70 text-white shadow-lg shadow-[#57ACAF]/20">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Lead
                    </Button>
                  </div>

                  {/* Premium Lead Cards Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: 'Emma Richardson', company: 'Denim Co.', score: 92, status: 'Qualified', role: 'Procurement Director', activity: '2h ago', avatar: 'ER' },
                      { name: 'Michael Chen', company: 'Fashion Hub', score: 85, status: 'Contacted', role: 'Supply Chain Manager', activity: '5h ago', avatar: 'MC' },
                      { name: 'Sarah Johnson', company: 'Style Plus', score: 78, status: 'New', role: 'Head of Sourcing', activity: '1d ago', avatar: 'SJ' },
                      { name: 'David Park', company: 'Trend Wear', score: 88, status: 'Qualified', role: 'VP Operations', activity: '3h ago', avatar: 'DP' },
                    ].map((lead, idx) => (
                      <div key={idx} className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 p-5 backdrop-blur-sm hover:border-[#57ACAF]/30 hover:from-white/8 transition-all duration-300">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#57ACAF]/0 to-[#57ACAF]/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="relative">
                          {/* Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start gap-3">
                              <div className="relative">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#57ACAF]/30 to-[#57ACAF]/10 border border-[#57ACAF]/30 flex items-center justify-center">
                                  <span className="text-[#57ACAF]">{lead.avatar}</span>
                                </div>
                                {/* Activity Indicator */}
                                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#101725] animate-pulse" />
                              </div>
                              <div className="flex-1">
                                <div className="text-white mb-1">{lead.name}</div>
                                <div className="text-xs text-[#6F83A7]">{lead.role}</div>
                              </div>
                            </div>
                            <Badge className={
                              lead.status === 'Qualified' ? 'bg-[#57ACAF]/20 text-[#57ACAF] border border-[#57ACAF]/30' :
                              lead.status === 'Contacted' ? 'bg-[#EAB308]/20 text-[#EAB308] border border-[#EAB308]/30' :
                              'bg-white/10 text-[#6F83A7] border border-white/10'
                            }>
                              {lead.status}
                            </Badge>
                          </div>

                          {/* Company */}
                          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/10">
                            <Building2 className="w-4 h-4 text-[#6F83A7]" />
                            <span className="text-sm text-[#6F83A7]">{lead.company}</span>
                          </div>

                          {/* Metrics */}
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <div className="text-xs text-[#6F83A7] mb-1">Lead Score</div>
                              <div className="flex items-center gap-2">
                                <Progress value={lead.score} className="h-1.5 flex-1" />
                                <span className="text-[#57ACAF] text-sm">{lead.score}</span>
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-[#6F83A7] mb-1">Last Activity</div>
                              <div className="text-white text-sm">{lead.activity}</div>
                            </div>
                          </div>

                          {/* Quick Actions */}
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="ghost" className="flex-1 h-8 text-xs text-[#6F83A7] hover:text-white hover:bg-white/5">
                              <Eye className="w-3 h-3 mr-1" />
                              View
                            </Button>
                            <Button size="sm" variant="ghost" className="flex-1 h-8 text-xs text-[#6F83A7] hover:text-white hover:bg-white/5">
                              <Mail className="w-3 h-3 mr-1" />
                              Email
                            </Button>
                            <Button size="sm" variant="ghost" className="flex-1 h-8 text-xs text-[#6F83A7] hover:text-white hover:bg-white/5">
                              <Phone className="w-3 h-3 mr-1" />
                              Call
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Lead Analytics Summary */}
                  <div className="rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 p-5 backdrop-blur-sm">
                    <h4 className="text-white mb-4">Lead Quality Distribution</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 rounded-xl bg-gradient-to-br from-[#57ACAF]/10 to-transparent border border-[#57ACAF]/20">
                        <div className="text-[#57ACAF] text-2xl mb-1">18</div>
                        <div className="text-xs text-[#6F83A7]">Qualified</div>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-gradient-to-br from-[#EAB308]/10 to-transparent border border-[#EAB308]/20">
                        <div className="text-[#EAB308] text-2xl mb-1">7</div>
                        <div className="text-xs text-[#6F83A7]">Contacted</div>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/10">
                        <div className="text-white text-2xl mb-1">3</div>
                        <div className="text-xs text-[#6F83A7]">New</div>
                      </div>
                    </div>
                  </div>

                  {/* AI Lead Insights */}
                  {onAskMarbim && (
                    <div className="rounded-2xl bg-gradient-to-br from-[#EAB308]/10 to-transparent border border-[#EAB308]/20 p-5 backdrop-blur-sm">
                      <div className="flex items-start gap-3 justify-between mb-4">
                        <div className="flex items-start gap-3 flex-1">
                          <Sparkles className="w-5 h-5 text-[#EAB308] flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="text-white mb-2">Lead Prioritization AI</div>
                            <p className="text-sm text-[#6F83A7]">
                              Discover which leads to contact first and get personalized outreach strategies
                            </p>
                          </div>
                        </div>
                      </div>
                      <MarbimAIButton
                        marbimPrompt={`Analyze the leads in the "${selectedSegment.name}" segment and provide: 1) Lead prioritization ranking 2) Personalized outreach strategies for top 3 leads 3) Best contact timing 4) Recommended messaging approach 5) Conversion probability analysis`}
                        onAskMarbim={onAskMarbim}
                        size="lg"
                      />
                    </div>
                  )}
                  </motion.div>
                )}

                {/* Engagement Tab - Advanced Analytics */}
                {activeSegmentTab === 'engagement' && (
                  <motion.div
                    key="engagement"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="p-8 space-y-6"
                  >
                  {/* Engagement Trend Chart - Premium */}
                  <div className="rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 p-6 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h4 className="text-white text-lg mb-1">Engagement Trends</h4>
                        <p className="text-sm text-[#6F83A7]">4-week performance trajectory</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="px-3 py-1.5 rounded-lg bg-[#57ACAF]/10 border border-[#57ACAF]/20">
                          <span className="text-xs text-[#57ACAF]">↑ 12% increase</span>
                        </div>
                      </div>
                    </div>
                    <ResponsiveContainer width="100%" height={240}>
                      <RechartsLine data={[
                        { week: 'Week 1', engagement: 65, opens: 58, clicks: 42 },
                        { week: 'Week 2', engagement: 72, opens: 68, clicks: 51 },
                        { week: 'Week 3', engagement: 78, opens: 75, clicks: 58 },
                        { week: 'Week 4', engagement: selectedSegment.engagement, opens: 82, clicks: 68 },
                      ]}>
                        <defs>
                          <linearGradient id="engagementGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#57ACAF" stopOpacity={0.3} />
                            <stop offset="100%" stopColor="#57ACAF" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                        <XAxis dataKey="week" stroke="#6F83A7" tick={{ fill: '#6F83A7', fontSize: 12 }} />
                        <YAxis stroke="#6F83A7" tick={{ fill: '#6F83A7', fontSize: 12 }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(16, 23, 37, 0.95)',
                            border: '1px solid rgba(87, 172, 175, 0.2)',
                            borderRadius: '12px',
                            backdropFilter: 'blur(12px)',
                          }}
                          labelStyle={{ color: '#57ACAF' }}
                        />
                        <Line type="monotone" dataKey="engagement" stroke="#57ACAF" strokeWidth={3} dot={{ fill: '#57ACAF', r: 5, strokeWidth: 2, stroke: '#101725' }} activeDot={{ r: 7 }} />
                        <Line type="monotone" dataKey="opens" stroke="#EAB308" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: '#EAB308', r: 4 }} />
                        <Line type="monotone" dataKey="clicks" stroke="#6F83A7" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: '#6F83A7', r: 4 }} />
                      </RechartsLine>
                    </ResponsiveContainer>
                    <div className="flex items-center justify-center gap-6 mt-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#57ACAF]" />
                        <span className="text-xs text-[#6F83A7]">Engagement</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#EAB308]" />
                        <span className="text-xs text-[#6F83A7]">Opens</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#6F83A7]" />
                        <span className="text-xs text-[#6F83A7]">Clicks</span>
                      </div>
                    </div>
                  </div>

                  {/* Engagement Metrics Grid */}
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: 'Email Opens', value: 82, icon: Mail, color: '#57ACAF', change: '+8%' },
                      { label: 'Link Clicks', value: 68, icon: Activity, color: '#EAB308', change: '+15%' },
                      { label: 'Responses', value: 45, icon: MessageSquare, color: '#6F83A7', change: '+5%' },
                    ].map((metric, idx) => (
                      <div key={idx} className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 p-5 backdrop-blur-sm group hover:border-white/20 transition-all duration-300">
                        <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" style={{ backgroundColor: metric.color }} />
                        <div className="relative">
                          <div className="flex items-center justify-between mb-3">
                            <metric.icon className="w-5 h-5" style={{ color: metric.color }} />
                            <span className="text-xs text-emerald-400">{metric.change}</span>
                          </div>
                          <div className="mb-2">
                            <div className="text-white text-2xl mb-1">{metric.value}%</div>
                            <div className="text-xs text-[#6F83A7]">{metric.label}</div>
                          </div>
                          <Progress value={metric.value} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Engagement Heatmap */}
                  <div className="rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 p-6 backdrop-blur-sm">
                    <h4 className="text-white text-lg mb-4">Activity Heatmap</h4>
                    <div className="grid grid-cols-7 gap-2">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-xs text-[#6F83A7] mb-2">{day}</div>
                          <div className={`h-16 rounded-lg border transition-all duration-300 hover:scale-105 ${
                            idx === 2 || idx === 3 ? 'bg-[#57ACAF]/30 border-[#57ACAF]/40' :
                            idx === 1 || idx === 4 ? 'bg-[#57ACAF]/20 border-[#57ACAF]/30' :
                            'bg-[#57ACAF]/10 border-[#57ACAF]/20'
                          }`} />
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-[#6F83A7] mt-4 text-center">Peak engagement on Wednesdays & Thursdays</p>
                  </div>

                  {/* Activity Timeline - Modern */}
                  <div className="rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 p-6 backdrop-blur-sm">
                    <h4 className="text-white text-lg mb-5">Recent Activity</h4>
                    <div className="space-y-4">
                      {[
                        { action: 'Email campaign sent', time: '2 hours ago', icon: Mail, count: '28 recipients', color: '#57ACAF' },
                        { action: 'Leads opened email', time: '4 hours ago', icon: Eye, count: '5 opens', color: '#EAB308' },
                        { action: 'Link clicks tracked', time: '6 hours ago', icon: Activity, count: '3 clicks', color: '#6F83A7' },
                        { action: 'Response received', time: '8 hours ago', icon: MessageSquare, count: '1 response', color: '#57ACAF' },
                      ].map((activity, idx) => (
                        <div key={idx} className="relative flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 group">
                          {/* Timeline Line */}
                          {idx < 3 && (
                            <div className="absolute left-7 top-16 w-0.5 h-6 bg-white/10" />
                          )}
                          
                          <div className="relative p-3 rounded-xl border backdrop-blur-sm group-hover:scale-110 transition-transform duration-300" style={{ 
                            backgroundColor: `${activity.color}20`,
                            borderColor: `${activity.color}40`
                          }}>
                            <activity.icon className="w-5 h-5" style={{ color: activity.color }} />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <div className="text-white">{activity.action}</div>
                              <span className="text-xs text-[#6F83A7]">{activity.time}</span>
                            </div>
                            <div className="text-sm text-[#6F83A7]">{activity.count}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Engagement Insights */}
                  {onAskMarbim && (
                    <div className="rounded-2xl bg-gradient-to-br from-[#6F83A7]/10 to-transparent border border-[#6F83A7]/20 p-5 backdrop-blur-sm">
                      <div className="flex items-start gap-3 justify-between mb-4">
                        <div className="flex items-start gap-3 flex-1">
                          <Sparkles className="w-5 h-5 text-[#6F83A7] flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="text-white mb-2">Engagement Optimization AI</div>
                            <p className="text-sm text-[#6F83A7]">
                              Get data-driven recommendations to boost engagement metrics and timing
                            </p>
                          </div>
                        </div>
                      </div>
                      <MarbimAIButton
                        marbimPrompt={`Analyze engagement patterns for "${selectedSegment.name}" with 82% email opens, 68% clicks, and 45% response rate. Provide: 1) Peak engagement time optimization 2) Content improvement strategies 3) A/B testing ideas for subject lines 4) Re-engagement tactics for inactive leads 5) Predicted engagement trends`}
                        onAskMarbim={onAskMarbim}
                        size="lg"
                      />
                    </div>
                  )}
                  </motion.div>
                )}

                {/* Campaigns Tab - Timeline with Performance */}
                {activeSegmentTab === 'campaigns' && (
                  <motion.div
                    key="campaigns"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="p-8 space-y-6"
                  >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white text-xl mb-1">Campaign Portfolio</h4>
                      <p className="text-sm text-[#6F83A7]">3 campaigns • 75% avg open rate</p>
                    </div>
                    <Button className="bg-gradient-to-r from-[#EAB308] to-[#EAB308]/80 hover:from-[#EAB308]/90 hover:to-[#EAB308]/70 text-black shadow-lg shadow-[#EAB308]/20">
                      <Send className="w-4 h-4 mr-2" />
                      New Campaign
                    </Button>
                  </div>

                  {/* Campaign Performance Overview */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#57ACAF]/10 to-transparent border border-[#57ACAF]/20 p-5 backdrop-blur-sm">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#57ACAF]/10 rounded-full blur-2xl" />
                      <div className="relative">
                        <div className="text-[#57ACAF] text-xs uppercase tracking-wider mb-2">Total Sent</div>
                        <div className="text-white text-3xl mb-1">84</div>
                        <div className="text-xs text-[#6F83A7]">emails delivered</div>
                      </div>
                    </div>
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#EAB308]/10 to-transparent border border-[#EAB308]/20 p-5 backdrop-blur-sm">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#EAB308]/10 rounded-full blur-2xl" />
                      <div className="relative">
                        <div className="text-[#EAB308] text-xs uppercase tracking-wider mb-2">Avg Open Rate</div>
                        <div className="text-white text-3xl mb-1">75%</div>
                        <div className="text-xs text-emerald-400">↑ 8% vs industry</div>
                      </div>
                    </div>
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#6F83A7]/10 to-transparent border border-[#6F83A7]/20 p-5 backdrop-blur-sm">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#6F83A7]/10 rounded-full blur-2xl" />
                      <div className="relative">
                        <div className="text-[#6F83A7] text-xs uppercase tracking-wider mb-2">Conversions</div>
                        <div className="text-white text-3xl mb-1">12</div>
                        <div className="text-xs text-[#6F83A7]">14% conversion rate</div>
                      </div>
                    </div>
                  </div>

                  {/* Campaign Timeline */}
                  <div className="rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 p-6 backdrop-blur-sm">
                    <h4 className="text-white text-lg mb-6">Campaign Timeline</h4>
                    <div className="space-y-5">
                      {[
                        { 
                          name: 'Spring Collection Launch', 
                          sent: '28 leads', 
                          openRate: 85, 
                          clickRate: 62,
                          conversions: 5,
                          status: 'Completed', 
                          date: 'Jan 20, 2025',
                          performance: [60, 70, 80, 85, 83, 85],
                          revenue: '$12.4K'
                        },
                        { 
                          name: 'New Denim Styles', 
                          sent: '28 leads', 
                          openRate: 72, 
                          clickRate: 55,
                          conversions: 4,
                          status: 'Completed', 
                          date: 'Jan 15, 2025',
                          performance: [65, 68, 72, 70, 72, 71],
                          revenue: '$9.8K'
                        },
                        { 
                          name: 'Sustainability Update', 
                          sent: '28 leads', 
                          openRate: 68, 
                          clickRate: 48,
                          conversions: 3,
                          status: 'Completed', 
                          date: 'Jan 10, 2025',
                          performance: [58, 62, 65, 68, 67, 68],
                          revenue: '$7.2K'
                        },
                      ].map((campaign, idx) => (
                        <div key={idx} className="relative group">
                          {/* Timeline Connector */}
                          {idx < 2 && (
                            <div className="absolute left-6 top-20 w-0.5 h-10 bg-gradient-to-b from-[#EAB308]/30 to-transparent" />
                          )}
                          
                          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 p-5 backdrop-blur-sm hover:border-[#EAB308]/30 hover:from-white/8 transition-all duration-300">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#EAB308]/0 to-[#EAB308]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            <div className="relative">
                              {/* Header */}
                              <div className="flex items-start justify-between mb-5">
                                <div className="flex items-start gap-4">
                                  <div className="relative">
                                    <div className="p-3 rounded-xl bg-gradient-to-br from-[#EAB308]/30 to-[#EAB308]/10 border border-[#EAB308]/30 backdrop-blur-sm">
                                      <Send className="w-5 h-5 text-[#EAB308]" />
                                    </div>
                                    {/* Success Badge */}
                                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#101725] flex items-center justify-center">
                                      <CheckCircle className="w-2.5 h-2.5 text-[#101725]" />
                                    </div>
                                  </div>
                                  <div>
                                    <div className="text-white text-lg mb-1">{campaign.name}</div>
                                    <div className="flex items-center gap-3 text-xs text-[#6F83A7]">
                                      <span className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {campaign.date}
                                      </span>
                                      <span>•</span>
                                      <span className="flex items-center gap-1">
                                        <Users className="w-3 h-3" />
                                        {campaign.sent}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                  {campaign.status}
                                </Badge>
                              </div>

                              {/* Performance Metrics Grid */}
                              <div className="grid grid-cols-4 gap-4 mb-5">
                                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                                  <div className="text-xs text-[#6F83A7] mb-1">Open Rate</div>
                                  <div className="text-white text-xl">{campaign.openRate}%</div>
                                </div>
                                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                                  <div className="text-xs text-[#6F83A7] mb-1">Click Rate</div>
                                  <div className="text-white text-xl">{campaign.clickRate}%</div>
                                </div>
                                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                                  <div className="text-xs text-[#6F83A7] mb-1">Conversions</div>
                                  <div className="text-white text-xl">{campaign.conversions}</div>
                                </div>
                                <div className="p-3 rounded-xl bg-gradient-to-br from-[#EAB308]/10 to-transparent border border-[#EAB308]/20">
                                  <div className="text-xs text-[#6F83A7] mb-1">Revenue</div>
                                  <div className="text-[#EAB308] text-xl">{campaign.revenue}</div>
                                </div>
                              </div>

                              {/* Mini Sparkline Chart */}
                              <div className="mb-4">
                                <div className="text-xs text-[#6F83A7] mb-2">Performance Trend</div>
                                <ResponsiveContainer width="100%" height={60}>
                                  <RechartsLine data={campaign.performance.map((value, i) => ({ value }))}>
                                    <Line type="monotone" dataKey="value" stroke="#EAB308" strokeWidth={2} dot={false} />
                                  </RechartsLine>
                                </ResponsiveContainer>
                              </div>

                              {/* Actions */}
                              <div className="flex items-center gap-2">
                                <Button size="sm" variant="ghost" className="flex-1 h-9 text-xs text-[#6F83A7] hover:text-white hover:bg-white/5">
                                  <Eye className="w-3.5 h-3.5 mr-1.5" />
                                  View Details
                                </Button>
                                <Button size="sm" variant="ghost" className="flex-1 h-9 text-xs text-[#6F83A7] hover:text-white hover:bg-white/5">
                                  <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                                  Duplicate
                                </Button>
                                <Button size="sm" variant="ghost" className="flex-1 h-9 text-xs text-[#6F83A7] hover:text-white hover:bg-white/5">
                                  <Download className="w-3.5 h-3.5 mr-1.5" />
                                  Export
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Campaign Insights */}
                  {onAskMarbim && (
                    <div className="rounded-2xl bg-gradient-to-br from-[#EAB308]/10 to-transparent border border-[#EAB308]/20 p-5 backdrop-blur-sm">
                      <div className="flex items-start gap-3 justify-between mb-4">
                        <div className="flex items-start gap-3 flex-1">
                          <Sparkles className="w-5 h-5 text-[#EAB308] flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="text-white mb-2">Campaign Optimization AI</div>
                            <p className="text-sm text-[#6F83A7]">
                              Discover winning campaign strategies and optimize for higher conversion rates
                            </p>
                          </div>
                        </div>
                      </div>
                      <MarbimAIButton
                        marbimPrompt={`Analyze campaign performance for "${selectedSegment.name}" segment. Top campaign achieved 85% open rate and $12.4K revenue. Provide: 1) Success factors analysis 2) Next campaign recommendations 3) Optimal send times 4) Subject line optimization 5) Personalization strategies 6) Budget allocation advice`}
                        onAskMarbim={onAskMarbim}
                        size="lg"
                      />
                    </div>
                  )}
                  </motion.div>
                )}
              </div>

              {/* Premium Footer Actions */}
              <div className="mt-8 pt-6 border-t border-white/10 px-8 pb-8 backdrop-blur-xl">
                <div className="flex items-center gap-4">
                  <Button
                    onClick={() => toast.success(`Launching campaign for ${selectedSegment.name}`)}
                    className="flex-1 h-12 bg-gradient-to-r from-[#EAB308] to-[#EAB308]/80 hover:from-[#EAB308]/90 hover:to-[#EAB308]/70 text-black shadow-xl shadow-[#EAB308]/30 hover:shadow-2xl hover:shadow-[#EAB308]/40 transition-all duration-300"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Launch Campaign
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => toast.info(`Editing ${selectedSegment.name}`)}
                    className="flex-1 h-12 border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 backdrop-blur-sm transition-all duration-300"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Segment
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Template Preview/Edit Drawer */}
      <TemplateDrawer
        open={templateDrawerOpen}
        onOpenChange={setTemplateDrawerOpen}
        selectedTemplate={selectedTemplate}
        drawerAction={templateDrawerAction}
        activeTab={activeTemplateTab}
        onTabChange={setActiveTemplateTab}
        onAskMarbim={onAskMarbim}
      />

      {/* Email Composition Drawer */}
      <EmailCompositionDrawer
        open={emailCompositionOpen}
        onClose={() => {
          setEmailCompositionOpen(false);
          setEmailCompositionContext(null);
        }}
        template={selectedTemplate ? {
          id: selectedTemplate.id,
          name: selectedTemplate.name,
          type: selectedTemplate.type,
          subject: selectedTemplate.subject,
          content: selectedTemplate.preview,
          variables: ['[Lead Name]', '[Company]', '[Email]', '[Country]', '[Phone]']
        } : null}
        prefilledRecipient={emailCompositionContext?.recipient}
        prefilledSubject={emailCompositionContext?.subject}
        context={emailCompositionContext?.context}
        compositionType={emailCompositionContext?.type || 'new'}
        availableLeads={leads.map(lead => ({
          id: lead.id.toString(),
          name: lead.leadName,
          company: lead.company,
          email: `${lead.leadName.toLowerCase().replace(/\s+/g, '.')}@${lead.company.toLowerCase().replace(/\s+/g, '')}.com`,
          status: lead.status,
          country: lead.country,
          phone: '+1-' + Math.floor(Math.random() * 9000000000 + 1000000000).toString().replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
        }))}
        onAskMarbim={onAskMarbim}
      />

      {/* Add Lead Drawer */}
      <AddLeadDrawer
        open={addLeadDrawerOpen}
        onClose={() => setAddLeadDrawerOpen(false)}
        onSubmit={handleAddLead}
        onAskMarbim={onAskMarbim}
      />
    </>
  );
}
