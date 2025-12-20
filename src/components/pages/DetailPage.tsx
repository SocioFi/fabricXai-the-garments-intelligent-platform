import { useState } from 'react';
import { PageLayout } from '../PageLayout';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { MarbimAIButton } from '../MarbimAIButton';
import { CommunicationLogger } from '../CommunicationLogger';
import {
  ArrowLeft, Edit2, Share2, Trash2, Download, Upload, Plus,
  Star, Building2, Mail, Phone, Calendar, MapPin, Globe, User,
  TrendingUp, TrendingDown, Clock, CheckCircle, AlertCircle,
  Package, Factory, Truck, Shield, Leaf, DollarSign, FileText,
  MessageSquare, Zap, ExternalLink, BarChart3, Activity, Target,
  Users, Award, Briefcase, Settings, Link as LinkIcon
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Separator } from '../ui/separator';
import { Progress } from '../ui/progress';
import { motion } from 'motion/react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

interface DetailPageProps {
  module: string;
  subPage: string;
  entryId: string;
  onBack: () => void;
  onAskMarbim?: (prompt: string) => void;
}

export function DetailPage({ 
  module, 
  subPage, 
  entryId, 
  onBack,
  onAskMarbim 
}: DetailPageProps) {
  const [activeTab, setActiveTab] = useState('overview');

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

  // Mock data - in real app, this would be fetched based on module, subPage, and entryId
  // This demonstrates module-specific customization
  const getDetailData = () => {
    const baseData = {
      id: entryId,
      title: 'John Smith',
      subtitle: 'TrendWear UK',
      type: 'Lead',
      score: 92,
      country: 'United Kingdom',
      countryCode: 'GB' as string,
      logo: null as string | null,
      status: {
        label: 'Qualified',
        variant: 'success' as const,
      },
    };

    // Customize based on module
    if (module === 'buyer-management') {
      return {
        ...baseData,
        title: 'Zara International',
        subtitle: 'Premium Fashion Retailer',
        type: 'Buyer',
        score: 95,
        country: 'Spain',
        countryCode: 'ES',
        status: { label: 'Active', variant: 'success' as const },
      };
    } else if (module === 'supplier-evaluation') {
      return {
        ...baseData,
        title: 'Fabric Co Ltd',
        subtitle: 'Premium Fabric Supplier',
        type: 'Supplier',
        score: 88,
        country: 'India',
        countryCode: 'IN',
        status: { label: 'Approved', variant: 'success' as const },
      };
    } else if (module === 'production-planning') {
      return {
        ...baseData,
        title: 'Order #PO-2024-1234',
        subtitle: 'H&M - Cotton T-Shirts',
        type: 'Production Order',
        score: undefined,
        country: 'Germany',
        countryCode: 'DE',
        status: { label: 'In Progress', variant: 'warning' as const },
      };
    }

    return baseData;
  };

  const detailData = getDetailData();

  const performanceData = [
    { month: 'Jan', value: 45, target: 50 },
    { month: 'Feb', value: 52, target: 55 },
    { month: 'Mar', value: 61, target: 60 },
    { month: 'Apr', value: 68, target: 65 },
    { month: 'May', value: 75, target: 70 },
    { month: 'Jun', value: 82, target: 75 },
  ];

  const activityData = [
    { name: 'Email', value: 45 },
    { name: 'Calls', value: 25 },
    { name: 'Meetings', value: 20 },
    { name: 'WhatsApp', value: 10 },
  ];

  const COLORS = ['#EAB308', '#57ACAF', '#6F83A7', '#9333EA'];

  const radarData = [
    { metric: 'Quality', value: 85, fullMark: 100 },
    { metric: 'Price', value: 75, fullMark: 100 },
    { metric: 'Delivery', value: 90, fullMark: 100 },
    { metric: 'Communication', value: 95, fullMark: 100 },
    { metric: 'Compliance', value: 80, fullMark: 100 },
  ];

  const interactions = [
    {
      date: '2024-10-25',
      type: 'email' as const,
      description: 'Sent product catalog and pricing sheet',
      sentiment: 'positive' as const,
    },
    {
      date: '2024-10-20',
      type: 'call' as const,
      description: 'Initial discovery call - discussed requirements',
      sentiment: 'positive' as const,
    },
    {
      date: '2024-10-15',
      type: 'meeting' as const,
      description: 'Virtual meeting to review samples',
      sentiment: 'neutral' as const,
    },
    {
      date: '2024-10-10',
      type: 'whatsapp' as const,
      description: 'Quick follow-up on delivery timelines',
      sentiment: 'positive' as const,
    },
  ];

  const documents = [
    {
      name: 'Product_Catalog_2024.pdf',
      type: 'PDF',
      uploadDate: '2024-10-25',
      uploader: 'Sarah M.',
      tag: 'Catalog',
      size: '2.4 MB',
    },
    {
      name: 'Price_Quote_Q4.xlsx',
      type: 'Excel',
      uploadDate: '2024-10-20',
      uploader: 'John D.',
      tag: 'Pricing',
      size: '156 KB',
    },
    {
      name: 'Sample_Images.zip',
      type: 'ZIP',
      uploadDate: '2024-10-15',
      uploader: 'Lisa K.',
      tag: 'Samples',
      size: '12.8 MB',
    },
  ];

  const getInteractionIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'call': return <Phone className="w-4 h-4" />;
      case 'meeting': return <Calendar className="w-4 h-4" />;
      case 'whatsapp': return <MessageSquare className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-400 border-green-500/30 bg-green-500/10';
      case 'negative': return 'text-red-400 border-red-500/30 bg-red-500/10';
      default: return 'text-[#6F83A7] border-[#6F83A7]/30 bg-white/5';
    }
  };

  const getStatusIcon = () => {
    switch (detailData.status?.variant) {
      case 'success': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertCircle className="w-4 h-4" />;
      case 'error': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  // Format module name for display
  const formatModuleName = (name: string) => {
    return name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  // Generate breadcrumbs
  const breadcrumbs = [
    { label: 'Home', href: '#' },
    { label: formatModuleName(module), href: '#' },
    { label: formatModuleName(subPage), href: '#' },
    { label: detailData.title },
  ];

  return (
    <PageLayout
      breadcrumbs={breadcrumbs}
      aiInsightsCount={3}
    >
      {/* Hero Header Section */}
      <div className="mb-8">
        <div className="bg-gradient-to-br from-[#0D1117] via-[#151B28] to-[#0D1117] border border-white/10 rounded-2xl p-8 relative overflow-hidden">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_#EAB308_0%,_transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,_#57ACAF_0%,_transparent_50%)]" />
          </div>

          <div className="relative">
            {/* Back Button */}
            <Button
              variant="ghost"
              onClick={onBack}
              className="mb-6 text-[#6F83A7] hover:text-white hover:bg-white/5"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to {subPage}
            </Button>

            {/* Main Header */}
            <div className="flex items-start gap-6 mb-6">
              {/* Logo/Avatar */}
              <div className="relative shrink-0">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/20 flex items-center justify-center overflow-hidden backdrop-blur-sm shadow-2xl">
                  {detailData.logo ? (
                    <img 
                      src={detailData.logo} 
                      alt={detailData.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Building2 className="w-12 h-12 text-[#57ACAF]" />
                  )}
                </div>
                {/* Score Badge Overlay */}
                {detailData.score !== undefined && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
                    className="absolute -bottom-2 -right-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#EAB308] to-[#F59E0B] shadow-2xl shadow-[#EAB308]/50"
                  >
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-black fill-black" />
                      <span className="text-sm text-black">{detailData.score}</span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Title & Metadata */}
              <div className="flex-1 min-w-0">
                {/* Title Row */}
                <div className="flex items-start gap-4 mb-3">
                  <h1 className="text-3xl text-white truncate flex-1">{detailData.title}</h1>
                  
                  {/* Country Flag with Tooltip */}
                  {detailData.countryCode && (
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="shrink-0 w-12 h-12 rounded-xl overflow-hidden border-2 border-white/30 shadow-xl cursor-pointer"
                          >
                            <img
                              src={`https://flagcdn.com/w40/${detailData.countryCode.toLowerCase()}.png`}
                              srcSet={`https://flagcdn.com/w80/${detailData.countryCode.toLowerCase()}.png 2x`}
                              alt={detailData.country || detailData.countryCode}
                              className="w-full h-full object-cover"
                            />
                          </motion.div>
                        </TooltipTrigger>
                        <TooltipContent 
                          side="left" 
                          className="bg-[#0D1117] border-white/20 text-white shadow-xl"
                        >
                          <p className="text-sm">{detailData.country || detailData.countryCode}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>

                {/* Subtitle */}
                {detailData.subtitle && (
                  <p className="text-lg text-[#6F83A7] mb-3">
                    {detailData.subtitle}
                  </p>
                )}

                {/* Badges Row */}
                <div className="flex items-center gap-2 flex-wrap mb-4">
                  {detailData.type && (
                    <Badge className="bg-[#57ACAF]/20 text-[#57ACAF] border-[#57ACAF]/30">
                      {detailData.type}
                    </Badge>
                  )}
                  {detailData.status && (
                    <Badge 
                      className={`
                        gap-1.5
                        ${detailData.status.variant === 'success' ? 'bg-green-500/20 text-green-400 border-green-500/30' : ''}
                        ${detailData.status.variant === 'warning' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : ''}
                        ${detailData.status.variant === 'error' ? 'bg-red-500/20 text-red-400 border-red-500/30' : ''}
                        ${detailData.status.variant === 'default' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : ''}
                      `}
                    >
                      {getStatusIcon()}
                      {detailData.status.label}
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-[#6F83A7] border-white/10">
                    ID: {detailData.id}
                  </Badge>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 flex-wrap mb-4">
                  <Button
                    className="bg-white/5 hover:bg-white/10 text-white border border-white/10 backdrop-blur-sm"
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Details
                  </Button>
                  <Button
                    className="bg-white/5 hover:bg-white/10 text-white border border-white/10 backdrop-blur-sm"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-[#EAB308] to-[#F59E0B] hover:from-[#F59E0B] hover:to-[#EAB308] text-black shadow-lg shadow-[#EAB308]/30"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Quick Action
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>

                {/* Communication Logger */}
                <div className="pt-4 border-t border-white/10">
                  <CommunicationLogger
                    entityName={detailData.title}
                    entityType={detailData.type || 'Entity'}
                    onAskMarbim={onAskMarbim}
                  />
                </div>
              </div>
            </div>

            {/* Accent Line with Gradient */}
            <div className="relative h-1 bg-gradient-to-r from-transparent via-[#EAB308] to-transparent rounded-full">
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
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Main Content */}
        <div className="col-span-12 lg:col-span-8">
          <Tabs key={`detail-page-${activeTab}`} value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            {/* Tab Navigation */}
            <div className="relative bg-gradient-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-1.5 shadow-lg shadow-black/20">
              <TabsList className="w-full grid grid-cols-4 bg-transparent gap-1.5 p-0 h-auto">
                <TabsTrigger 
                  value="overview" 
                  className="relative flex items-center justify-center gap-2.5 py-3.5 px-4 bg-white/5 hover:bg-white/10 data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#EAB308] data-[state=active]:to-[#EAB308]/80 data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-[#EAB308]/30 text-[#6F83A7] data-[state=active]:font-medium rounded-xl transition-all duration-300 group"
                >
                  <BarChart3 className="w-4 h-4 group-data-[state=active]:scale-110 transition-transform" />
                  <span className="text-xs">Overview</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="interactions" 
                  className="relative flex items-center justify-center gap-2.5 py-3.5 px-4 bg-white/5 hover:bg-white/10 data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#EAB308] data-[state=active]:to-[#EAB308]/80 data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-[#EAB308]/30 text-[#6F83A7] data-[state=active]:font-medium rounded-xl transition-all duration-300 group"
                >
                  <Activity className="w-4 h-4 group-data-[state=active]:scale-110 transition-transform" />
                  <span className="text-xs">Interactions</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="documents" 
                  className="relative flex items-center justify-center gap-2.5 py-3.5 px-4 bg-white/5 hover:bg-white/10 data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#EAB308] data-[state=active]:to-[#EAB308]/80 data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-[#EAB308]/30 text-[#6F83A7] data-[state=active]:font-medium rounded-xl transition-all duration-300 group"
                >
                  <FileText className="w-4 h-4 group-data-[state=active]:scale-110 transition-transform" />
                  <span className="text-xs">Documents</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="analytics" 
                  className="relative flex items-center justify-center gap-2.5 py-3.5 px-4 bg-white/5 hover:bg-white/10 data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#EAB308] data-[state=active]:to-[#EAB308]/80 data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-[#EAB308]/30 text-[#6F83A7] data-[state=active]:font-medium rounded-xl transition-all duration-300 group"
                >
                  <Target className="w-4 h-4 group-data-[state=active]:scale-110 transition-transform" />
                  <span className="text-xs">Analytics</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Key Information Grid */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-white mb-4">Key Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#57ACAF]/30 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="w-4 h-4 text-[#57ACAF]" />
                      <span className="text-sm text-[#6F83A7]">Email</span>
                    </div>
                    <div className="text-white">john.smith@trendwear.uk</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#57ACAF]/30 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="w-4 h-4 text-[#57ACAF]" />
                      <span className="text-sm text-[#6F83A7]">Phone</span>
                    </div>
                    <div className="text-white">+44 20 7946 0958</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#57ACAF]/30 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-[#57ACAF]" />
                      <span className="text-sm text-[#6F83A7]">Owner</span>
                    </div>
                    <div className="text-white">Sarah M.</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#57ACAF]/30 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-[#57ACAF]" />
                      <span className="text-sm text-[#6F83A7]">Created</span>
                    </div>
                    <div className="text-white">Oct 10, 2024</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#57ACAF]/30 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="w-4 h-4 text-[#57ACAF]" />
                      <span className="text-sm text-[#6F83A7]">Industry</span>
                    </div>
                    <div className="text-white">Fashion Retail</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#57ACAF]/30 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="w-4 h-4 text-[#57ACAF]" />
                      <span className="text-sm text-[#6F83A7]">Website</span>
                    </div>
                    <div className="text-white">trendwear.uk</div>
                  </div>
                </div>
              </div>

              {/* Performance Chart */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-white mb-4">Engagement Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#EAB308" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#EAB308" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis dataKey="month" stroke="#6F83A7" />
                    <YAxis stroke="#6F83A7" />
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: '#0D1117',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                      }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#EAB308" fillOpacity={1} fill="url(#colorValue)" />
                    <Line type="monotone" dataKey="target" stroke="#57ACAF" strokeDasharray="5 5" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Notes Section */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white">Notes & Comments</h3>
                  <Button size="sm" className="bg-white/5 hover:bg-white/10 border border-white/10">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Note
                  </Button>
                </div>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#57ACAF]/20 flex items-center justify-center">
                          <User className="w-4 h-4 text-[#57ACAF]" />
                        </div>
                        <div>
                          <div className="text-sm text-white">Sarah M.</div>
                          <div className="text-xs text-[#6F83A7]">2 days ago</div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-white/80">
                      Very interested in sustainable fabric options. Follow up next week with eco-friendly catalog.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Interactions Tab */}
            <TabsContent value="interactions" className="space-y-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white">Interaction Timeline</h3>
                  <MarbimAIButton
                    prompt={`Summarize all interactions for ${detailData.title}`}
                    label="AI Summary"
                    size="sm"
                    onAskMarbim={onAskMarbim}
                  />
                </div>

                <div className="space-y-4">
                  {interactions.map((interaction, index) => (
                    <div 
                      key={index}
                      className="relative pl-8 pb-4 border-l-2 border-white/10 last:border-l-0 last:pb-0"
                    >
                      {/* Timeline Dot */}
                      <div className="absolute left-0 top-0 -translate-x-[9px] w-4 h-4 rounded-full bg-[#57ACAF] border-2 border-[#0D1117] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>

                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#57ACAF]/30 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="text-[#57ACAF]">
                              {getInteractionIcon(interaction.type)}
                            </div>
                            <span className="text-sm text-[#6F83A7] capitalize">
                              {interaction.type}
                            </span>
                          </div>
                          <span className="text-xs text-[#6F83A7]">
                            {interaction.date}
                          </span>
                        </div>
                        <p className="text-sm text-white/80 mb-2">
                          {interaction.description}
                        </p>
                        {interaction.sentiment && (
                          <Badge 
                            variant="outline"
                            className={`text-xs ${getSentimentColor(interaction.sentiment)}`}
                          >
                            {interaction.sentiment} tone
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents" className="space-y-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white">Attached Documents</h3>
                  <Button size="sm" className="bg-white/5 hover:bg-white/10 border border-white/10">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                </div>

                <div className="space-y-3">
                  {documents.map((doc, index) => (
                    <div 
                      key={index}
                      className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#57ACAF]/50 transition-all group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <FileText className="w-6 h-6 text-[#57ACAF] shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm text-white truncate">{doc.name}</div>
                            <div className="text-xs text-[#6F83A7] flex items-center gap-2">
                              <span>{doc.type}</span>
                              <span>•</span>
                              <span>{doc.size}</span>
                              <span>•</span>
                              <span>{doc.uploadDate}</span>
                              <span>•</span>
                              <span>{doc.uploader}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-[#6F83A7] hover:text-white"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-[#6F83A7] hover:text-white"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {doc.tag && (
                        <Badge className="mt-2 bg-[#EAB308]/20 text-[#EAB308] border-[#EAB308]/30">
                          {doc.tag}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              {/* Activity Breakdown */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-white mb-4">Activity Breakdown</h3>
                <div className="grid grid-cols-2 gap-6">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={activityData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {activityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip
                        contentStyle={{
                          backgroundColor: '#0D1117',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '12px',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="flex flex-col justify-center space-y-3">
                    {activityData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span className="text-sm text-[#6F83A7]">{item.name}</span>
                        </div>
                        <span className="text-sm text-white">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Performance Radar */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-white mb-4">Performance Metrics</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#ffffff20" />
                    <PolarAngleAxis dataKey="metric" stroke="#6F83A7" />
                    <PolarRadiusAxis stroke="#6F83A7" />
                    <Radar name="Performance" dataKey="value" stroke="#EAB308" fill="#EAB308" fillOpacity={0.3} />
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: '#0D1117',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - AI Insights & Quick Actions */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* AI Insights Card */}
          <div className="bg-gradient-to-br from-[#EAB308]/20 to-[#57ACAF]/20 border border-[#EAB308]/30 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#EAB308]/30 flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#EAB308]" />
              </div>
              <h3 className="text-white">AI Insights</h3>
            </div>
            <p className="text-sm text-white/90 leading-relaxed mb-4">
              High-value lead with strong engagement pattern. Recommended action: Schedule product demo within 48 hours. 85% probability of conversion based on similar profiles.
            </p>
            <MarbimAIButton
              prompt={`Provide detailed AI analysis for ${detailData.title} in ${module}`}
              label="Get Full AI Analysis"
              onAskMarbim={onAskMarbim}
            />
          </div>

          {/* Quick Stats */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="text-white mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#6F83A7]">Engagement Rate</span>
                  <span className="text-sm text-white">82%</span>
                </div>
                <Progress value={82} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#6F83A7]">Response Time</span>
                  <span className="text-sm text-white">1.2h avg</span>
                </div>
                <Progress value={90} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#6F83A7]">Conversion Probability</span>
                  <span className="text-sm text-white">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
            </div>
          </div>

          {/* Recommended Actions */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="text-white mb-4">Recommended Actions</h3>
            <div className="space-y-3">
              <button className="w-full p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#EAB308]/50 transition-all text-left group">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#EAB308]/20 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4 text-[#EAB308]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-white mb-1">Schedule Demo</div>
                    <div className="text-xs text-[#6F83A7]">High priority - within 48h</div>
                  </div>
                </div>
              </button>
              <button className="w-full p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#EAB308]/50 transition-all text-left group">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#57ACAF]/20 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-[#57ACAF]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-white mb-1">Send Follow-up</div>
                    <div className="text-xs text-[#6F83A7]">Personalized email template</div>
                  </div>
                </div>
              </button>
              <button className="w-full p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#EAB308]/50 transition-all text-left group">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#6F83A7]/20 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-[#6F83A7]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-white mb-1">Create Proposal</div>
                    <div className="text-xs text-[#6F83A7]">Generate custom quote</div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Related Links */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="text-white mb-4">Quick Links</h3>
            <div className="space-y-2">
              <button className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white hover:bg-white/10 hover:border-[#57ACAF]/50 transition-all flex items-center gap-2">
                <LinkIcon className="w-3 h-3" />
                View Company Profile
              </button>
              <button className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white hover:bg-white/10 hover:border-[#57ACAF]/50 transition-all flex items-center gap-2">
                <LinkIcon className="w-3 h-3" />
                Related Orders
              </button>
              <button className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white hover:bg-white/10 hover:border-[#57ACAF]/50 transition-all flex items-center gap-2">
                <LinkIcon className="w-3 h-3" />
                Communication History
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
