import { useState } from 'react';
import { KPICard } from '../KPICard';
import { AICard } from '../AICard';
import { PageLayout } from '../PageLayout';
import { MarbimAIButton } from '../MarbimAIButton';
import { 
  TrendingUp, Users, Package, DollarSign, AlertTriangle,
  ArrowUpRight, Activity, ShoppingCart, Target, Clock,
  CheckCircle, XCircle, FileText, Zap, BarChart3,
  UserCheck, Calendar, Award, TrendingDown, Shield,
  Leaf, Factory, AlertCircle, Briefcase, LineChart,
  Settings, Download, Send, Eye, MessageSquare,
  RefreshCw, ChevronRight, Sparkles, Bell, ChevronDown,
  Truck, Boxes, HardHat
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { toast } from 'sonner';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart as RechartsLine,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// User Roles
type UserRole = 
  | 'md' 
  | 'merchandising' 
  | 'production' 
  | 'quality' 
  | 'hr' 
  | 'finance' 
  | 'compliance' 
  | 'supervisor';

interface DashboardProps {
  onAskMarbim?: (message: string) => void;
}

export function Dashboard({ onAskMarbim }: DashboardProps) {
  // Simulated user role - in production, this would come from auth context
  const [currentRole, setCurrentRole] = useState<UserRole>('md');
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');
  const [ordersExpanded, setOrdersExpanded] = useState(false);
  const [issuesExpanded, setIssuesExpanded] = useState(false);

  // MD/CEO Dashboard Data
  const mdKPIs = [
    { title: 'Total Orders', value: '127', change: 8.5, icon: ShoppingCart, color: '#57ACAF' },
    { title: 'Profit Margin', value: '18.2%', change: -3.2, icon: TrendingUp, color: '#EAB308' },
    { title: 'OTIF %', value: '92.5%', change: 4.1, icon: CheckCircle, color: '#57ACAF' },
    { title: 'Efficiency', value: '87.3%', change: 2.8, icon: Activity, color: '#EAB308' },
    { title: 'ESG Compliance', value: '94%', change: 6.2, icon: Leaf, color: '#57ACAF' },
  ];

  const marginVsCostData = [
    { month: 'Jan', margin: 19.2, cost: 80.8 },
    { month: 'Feb', margin: 18.8, cost: 81.2 },
    { month: 'Mar', margin: 20.1, cost: 79.9 },
    { month: 'Apr', margin: 17.5, cost: 82.5 },
    { month: 'May', margin: 18.2, cost: 81.8 },
    { month: 'Jun', margin: 18.9, cost: 81.1 },
  ];

  const orderStatusData = [
    { name: 'Completed', value: 45, fill: '#57ACAF' },
    { name: 'In Progress', value: 62, fill: '#EAB308' },
    { name: 'Pending', value: 15, fill: '#6F83A7' },
    { name: 'Delayed', value: 5, fill: '#D0342C' },
  ];

  const esgRadarData = [
    { category: 'Energy', value: 92 },
    { category: 'Water', value: 88 },
    { category: 'Waste', value: 95 },
    { category: 'Labor', value: 97 },
    { category: 'Ethics', value: 94 },
  ];

  // Merchandising Head Data
  const merchandisingKPIs = [
    { title: 'Active Buyers', value: '48', change: 12.5, icon: Users, color: '#57ACAF' },
    { title: 'Pending RFQs', value: '23', change: -8.3, icon: FileText, color: '#EAB308' },
    { title: 'Win Rate', value: '68%', change: 5.7, icon: Target, color: '#57ACAF' },
    { title: 'Orders in Negotiation', value: '14', change: 15.2, icon: MessageSquare, color: '#6F83A7' },
  ];

  const buyerEngagementData = [
    { week: 'W1', engagement: 72, conversions: 12 },
    { week: 'W2', engagement: 78, conversions: 15 },
    { week: 'W3', engagement: 65, conversions: 10 },
    { week: 'W4', engagement: 82, conversions: 18 },
  ];

  const rfqFunnelData = [
    { stage: 'RFQ Received', count: 85, fill: '#57ACAF' },
    { stage: 'Quoted', count: 68, fill: '#6F83A7' },
    { stage: 'Negotiation', count: 42, fill: '#EAB308' },
    { stage: 'Won', count: 28, fill: '#57ACAF' },
  ];

  // Production Manager Data
  const productionKPIs = [
    { title: 'On-Time %', value: '91.5%', change: 3.8, icon: Clock, color: '#57ACAF' },
    { title: 'Line Efficiency', value: '86.7%', change: 2.1, icon: Activity, color: '#EAB308' },
    { title: 'Material Readiness', value: '94%', change: -2.5, icon: Package, color: '#57ACAF' },
    { title: 'WIP %', value: '68%', change: 4.2, icon: BarChart3, color: '#6F83A7' },
  ];

  const capacityHeatmapData = [
    { line: 'Line 1', capacity: 92, efficiency: 88 },
    { line: 'Line 2', capacity: 88, efficiency: 85 },
    { line: 'Line 3', capacity: 95, efficiency: 91 },
    { line: 'Line 4', capacity: 68, efficiency: 65 },
    { line: 'Line 5', capacity: 90, efficiency: 87 },
  ];

  const efficiencyVsDowntimeData = [
    { week: 'W1', efficiency: 85, downtime: 8 },
    { week: 'W2', efficiency: 88, downtime: 6 },
    { week: 'W3', efficiency: 82, downtime: 10 },
    { week: 'W4', efficiency: 87, downtime: 7 },
  ];

  // Quality Manager Data
  const qualityKPIs = [
    { title: 'DHU %', value: '2.3%', change: -12.5, icon: AlertTriangle, color: '#57ACAF' },
    { title: 'First Pass Yield', value: '96.8%', change: 4.2, icon: CheckCircle, color: '#EAB308' },
    { title: 'Open CAPAs', value: '8', change: -25.0, icon: FileText, color: '#57ACAF' },
    { title: 'Lab Pass Rate', value: '98.2%', change: 2.1, icon: Award, color: '#6F83A7' },
  ];

  const defectsByTypeData = [
    { type: 'Broken Stitch', count: 45 },
    { type: 'Measurement', count: 32 },
    { type: 'Color Shade', count: 28 },
    { type: 'Fabric Defect', count: 22 },
    { type: 'Others', count: 18 },
  ];

  const dhuTrendData = [
    { month: 'Jan', dhu: 2.8 },
    { month: 'Feb', dhu: 2.5 },
    { month: 'Mar', dhu: 2.7 },
    { month: 'Apr', dhu: 2.4 },
    { month: 'May', dhu: 2.3 },
    { month: 'Jun', dhu: 2.3 },
  ];

  // HR & Workforce Manager Data
  const hrKPIs = [
    { title: 'Attendance %', value: '94.2%', change: -1.5, icon: UserCheck, color: '#57ACAF' },
    { title: 'OT Hours', value: '1,248', change: 8.3, icon: Clock, color: '#EAB308' },
    { title: 'Attrition %', value: '3.8%', change: -15.2, icon: TrendingDown, color: '#57ACAF' },
    { title: 'Skill Coverage', value: '88%', change: 6.7, icon: Award, color: '#6F83A7' },
  ];

  const absenteeismData = [
    { line: 'Line 1', rate: 5.2 },
    { line: 'Line 2', rate: 4.8 },
    { line: 'Line 3', rate: 6.5 },
    { line: 'Line 4', rate: 7.2 },
    { line: 'Line 5', rate: 5.8 },
  ];

  const trainingCompletionData = [
    { month: 'Jan', completed: 78 },
    { month: 'Feb', completed: 82 },
    { month: 'Mar', completed: 75 },
    { month: 'Apr', completed: 88 },
    { month: 'May', completed: 92 },
    { month: 'Jun', completed: 95 },
  ];

  // Finance Manager Data
  const financeKPIs = [
    { title: 'AR Aging', value: '$2.4M', change: -8.5, icon: DollarSign, color: '#57ACAF' },
    { title: 'AP Aging', value: '$1.8M', change: 5.2, icon: DollarSign, color: '#EAB308' },
    { title: 'Cashflow 30d', value: '$680K', change: 12.8, icon: TrendingUp, color: '#57ACAF' },
    { title: 'Margin per Order', value: '16.5%', change: -2.3, icon: BarChart3, color: '#6F83A7' },
  ];

  const marginVsCostTrendData = [
    { month: 'Jan', margin: 17.2, cost: 82.8 },
    { month: 'Feb', margin: 16.8, cost: 83.2 },
    { month: 'Mar', margin: 18.1, cost: 81.9 },
    { month: 'Apr', margin: 15.5, cost: 84.5 },
    { month: 'May', margin: 16.2, cost: 83.8 },
    { month: 'Jun', margin: 16.5, cost: 83.5 },
  ];

  const arCollectionData = [
    { week: 'W1', collected: 180, pending: 420 },
    { week: 'W2', collected: 220, pending: 380 },
    { week: 'W3', collected: 195, pending: 405 },
    { week: 'W4', collected: 240, pending: 360 },
  ];

  // Compliance & Sustainability Officer Data
  const complianceKPIs = [
    { title: 'Active Audits', value: '6', change: 20.0, icon: Shield, color: '#57ACAF' },
    { title: 'Open NCs', value: '12', change: -33.3, icon: AlertCircle, color: '#EAB308' },
    { title: 'CO₂e per Piece', value: '2.8kg', change: -8.5, icon: Leaf, color: '#57ACAF' },
    { title: 'Audit Readiness', value: '92%', change: 5.7, icon: CheckCircle, color: '#6F83A7' },
  ];

  const esgProgressData = [
    { category: 'Energy', actual: 88, target: 95 },
    { category: 'Water', actual: 92, target: 90 },
    { category: 'Waste', actual: 85, target: 92 },
    { category: 'CO₂', actual: 78, target: 85 },
    { category: 'Social', actual: 95, target: 93 },
  ];

  const certificateExpiryData = [
    { cert: 'WRAP', daysLeft: 28, status: 'urgent' },
    { cert: 'GOTS', daysLeft: 92, status: 'warning' },
    { cert: 'OEKO-TEX', daysLeft: 145, status: 'good' },
    { cert: 'ISO 9001', daysLeft: 67, status: 'warning' },
  ];

  // Line Supervisor/Operator Data
  const supervisorKPIs = [
    { title: 'Line Target', value: '1,248/1,300', change: 96.0, icon: Target, color: '#57ACAF' },
    { title: 'DHU %', value: '1.8%', change: -15.2, icon: CheckCircle, color: '#EAB308' },
    { title: 'Efficiency %', value: '89.5%', change: 3.2, icon: Activity, color: '#57ACAF' },
    { title: 'Attendance', value: '95.2%', change: 1.8, icon: UserCheck, color: '#6F83A7' },
  ];

  const orderProgressData = [
    { order: 'ORD-3214', progress: 78, target: 100 },
    { order: 'ORD-3215', progress: 45, target: 100 },
    { order: 'ORD-3216', progress: 92, target: 100 },
    { order: 'ORD-3217', progress: 34, target: 100 },
  ];

  const operatorEfficiencyData = [
    { operator: 'Op-01', efficiency: 92 },
    { operator: 'Op-02', efficiency: 88 },
    { operator: 'Op-03', efficiency: 85 },
    { operator: 'Op-04', efficiency: 78 },
    { operator: 'Op-05', efficiency: 91 },
  ];

  // Recent Activity Data
  const recentActivities = [
    { id: 1, type: 'order', title: 'New Order Received', description: 'Order #3218 from TrendWear UK', time: '5 mins ago', icon: ShoppingCart, color: '#57ACAF' },
    { id: 2, type: 'alert', title: 'Shipment Delayed', description: 'Order #3205 SLA breach warning', time: '12 mins ago', icon: AlertTriangle, color: '#D0342C' },
    { id: 3, type: 'success', title: 'Quality Approved', description: 'Final inspection passed for Order #3210', time: '28 mins ago', icon: CheckCircle, color: '#57ACAF' },
    { id: 4, type: 'info', title: 'Buyer Meeting', description: 'RFQ discussion with Fashion Global', time: '1 hour ago', icon: Users, color: '#6F83A7' },
    { id: 5, type: 'update', title: 'Production Update', description: 'Line 3 exceeded target by 8%', time: '2 hours ago', icon: TrendingUp, color: '#EAB308' },
  ];

  // Role-specific Running Orders & Critical Issues
  const getRoleOrdersAndIssues = () => {
    switch (currentRole) {
      case 'md':
        return {
          orders: [
            { id: 'GFH76OGHK', buyer: 'Startup Ventures', date: '03/09/2025', status: 'Running', priority: 'High' },
            { id: 'ORD-3215', buyer: 'Fashion Global', date: '03/12/2025', status: 'Cutting', priority: 'Medium' },
            { id: 'ORD-3216', buyer: 'EcoFashion EU', date: '03/15/2025', status: 'Finishing', priority: 'High' },
            { id: 'ORD-3217', buyer: 'SportStyle Inc', date: '03/18/2025', status: 'Planning', priority: 'Low' },
          ],
          issues: [
            { id: 1, title: 'Meeting Scheduled with John Doe', date: '06/17/2025', time: '3:00 pm', severity: 'high', icon: Users },
            { id: 2, title: 'Margin Drop Alert', description: 'Overall margin dropped 3%', severity: 'critical', icon: TrendingDown },
            { id: 3, title: 'ESG Audit Pending', description: '2 certificates expire in 30 days', severity: 'medium', icon: Shield },
          ],
        };
      case 'merchandising':
        return {
          orders: [
            { id: 'RFQ-4521', buyer: 'TrendWear UK', date: '03/10/2025', status: 'Quoted', priority: 'High' },
            { id: 'RFQ-4522', buyer: 'Fashion Global', date: '03/12/2025', status: 'Negotiation', priority: 'High' },
            { id: 'RFQ-4523', buyer: 'Urban Styles', date: '03/15/2025', status: 'Draft', priority: 'Medium' },
            { id: 'RFQ-4524', buyer: 'EcoFashion EU', date: '03/18/2025', status: 'Awaiting', priority: 'Low' },
          ],
          issues: [
            { id: 1, title: 'Low Buyer Engagement', description: '3 key buyers showing 40% drop', severity: 'critical', icon: Users },
            { id: 2, title: 'Quotation TAT Increased', description: 'Response time up to 1.8 days', severity: 'high', icon: Clock },
            { id: 3, title: 'High-Value RFQ Expiring', description: 'RFQ-4521 needs response by Dec 10', severity: 'critical', icon: AlertTriangle },
          ],
        };
      case 'production':
        return {
          orders: [
            { id: 'ORD-3214', buyer: 'TrendWear UK', date: '03/09/2025', status: 'Sewing', priority: 'High' },
            { id: 'ORD-3215', buyer: 'Fashion Global', date: '03/12/2025', status: 'Cutting', priority: 'Medium' },
            { id: 'ORD-3216', buyer: 'EcoFashion EU', date: '03/15/2025', status: 'Finishing', priority: 'High' },
            { id: 'ORD-3217', buyer: 'SportStyle Inc', date: '03/18/2025', status: 'Planning', priority: 'Low' },
          ],
          issues: [
            { id: 1, title: 'Line 4 Bottleneck', description: 'Efficiency dropped to 68%', severity: 'critical', icon: Factory },
            { id: 2, title: 'Fabric Delay', description: 'Order #3214 may delay by 2 days', severity: 'high', icon: Package },
            { id: 3, title: 'Material Shortage', description: 'Thread stock below safety level', severity: 'medium', icon: AlertCircle },
          ],
        };
      case 'quality':
        return {
          orders: [
            { id: 'ORD-3214', buyer: 'TrendWear UK', date: '03/09/2025', status: 'Inline QC', priority: 'High' },
            { id: 'ORD-3215', buyer: 'Fashion Global', date: '03/12/2025', status: 'Lab Test', priority: 'Medium' },
            { id: 'ORD-3216', buyer: 'EcoFashion EU', date: '03/15/2025', status: 'Final Insp.', priority: 'High' },
            { id: 'ORD-3217', buyer: 'SportStyle Inc', date: '03/18/2025', status: 'Fabric QC', priority: 'Low' },
          ],
          issues: [
            { id: 1, title: 'Defect Spike', description: 'Broken stitch defects up 10%', severity: 'critical', icon: AlertTriangle },
            { id: 2, title: 'Supplier Quality Issue', description: 'Supplier X causing 70% of reworks', severity: 'high', icon: XCircle },
            { id: 3, title: 'Lab Test Delay', description: '5 orders pending lab results', severity: 'medium', icon: Clock },
          ],
        };
      case 'hr':
        return {
          orders: [
            { id: 'LINE-1', buyer: 'Line 1 - Shift A', date: '03/09/2025', status: 'Normal', priority: 'Low' },
            { id: 'LINE-2', buyer: 'Line 2 - Shift A', date: '03/09/2025', status: 'Low Attendance', priority: 'High' },
            { id: 'LINE-3', buyer: 'Line 3 - Shift A', date: '03/09/2025', status: 'Normal', priority: 'Low' },
            { id: 'LINE-4', buyer: 'Line 4 - Shift A', date: '03/09/2025', status: 'Critical', priority: 'Critical' },
          ],
          issues: [
            { id: 1, title: 'Festival Absenteeism Spike', description: 'Predicted 15% spike next week', severity: 'critical', icon: UserCheck },
            { id: 2, title: 'Skill Gap Detected', description: '5 operators need re-skilling', severity: 'high', icon: Award },
            { id: 3, title: 'OT Hours Exceeded', description: '3 lines exceeding weekly limit', severity: 'medium', icon: Clock },
          ],
        };
      case 'finance':
        return {
          orders: [
            { id: 'ORD-3214', buyer: 'TrendWear UK', date: '03/09/2025', status: 'Production', priority: 'High' },
            { id: 'ORD-3215', buyer: 'Fashion Global', date: '03/12/2025', status: 'Cutting', priority: 'Medium' },
            { id: 'ORD-3216', buyer: 'EcoFashion EU', date: '03/15/2025', status: 'Finishing', priority: 'High' },
            { id: 'ORD-3217', buyer: 'SportStyle Inc', date: '03/18/2025', status: 'Planning', priority: 'Low' },
          ],
          issues: [
            { id: 1, title: 'Cash Shortage Alert', description: 'Predicted shortage in 14 days', severity: 'critical', icon: DollarSign },
            { id: 2, title: 'Low Margin Orders', description: '3 orders below 15% threshold', severity: 'high', icon: TrendingDown },
            { id: 3, title: 'Overdue Invoices', description: '$680K overdue by 30+ days', severity: 'high', icon: AlertCircle },
          ],
        };
      case 'compliance':
        return {
          orders: [
            { id: 'AUD-521', buyer: 'WRAP Annual Audit', date: '12/18/2025', status: 'Scheduled', priority: 'High' },
            { id: 'AUD-522', buyer: 'GOTS Surveillance', date: '01/12/2026', status: 'Preparing', priority: 'Medium' },
            { id: 'AUD-523', buyer: 'ISO 9001 Renewal', date: '12/22/2025', status: 'In Progress', priority: 'High' },
            { id: 'AUD-524', buyer: 'OEKO-TEX Review', date: '02/05/2026', status: 'Pending', priority: 'Low' },
          ],
          issues: [
            { id: 1, title: 'Certificate Expiry', description: '2 WRAP certificates expire in 30 days', severity: 'critical', icon: Shield },
            { id: 2, title: 'Energy Over Target', description: 'Intensity 8% above benchmark', severity: 'high', icon: Zap },
            { id: 3, title: 'Open Non-Conformances', description: '12 NCs from last audit still open', severity: 'medium', icon: AlertCircle },
          ],
        };
      case 'supervisor':
        return {
          orders: [
            { id: 'ORD-3214', buyer: 'T-Shirt Basic', date: '03/09/2025', status: 'Sewing', priority: 'High' },
            { id: 'ORD-3215', buyer: 'Polo Shirt', date: '03/12/2025', status: 'Cutting', priority: 'Medium' },
            { id: 'ORD-3216', buyer: 'Hoodie', date: '03/15/2025', status: 'Finishing', priority: 'High' },
            { id: 'ORD-3217', buyer: 'Jogger', date: '03/18/2025', status: 'QC Hold', priority: 'Low' },
          ],
          issues: [
            { id: 1, title: 'Machine Breakdown', description: 'Overlock machine #7 down', severity: 'critical', icon: AlertTriangle },
            { id: 2, title: 'Skill Gap Alert', description: '3 operators struggling with efficiency', severity: 'high', icon: Users },
            { id: 3, title: 'Material Shortage', description: 'Thread color #405 out of stock', severity: 'medium', icon: Boxes },
          ],
        };
      default:
        return { orders: [], issues: [] };
    }
  };

  // Role-based configuration
  const getRoleDashboard = () => {
    switch (currentRole) {
      case 'md':
        return {
          greeting: 'Managing Director Dashboard',
          subtitle: 'Strategic overview of operations, profitability, and risk',
          kpis: mdKPIs,
          charts: [
            {
              title: 'Margin vs Cost by Month',
              component: (
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={marginVsCostData}>
                    <defs>
                      <linearGradient id="colorMargin" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#57ACAF" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#57ACAF" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#EAB308" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#EAB308" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis dataKey="month" stroke="#6F83A7" />
                    <YAxis stroke="#6F83A7" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#0D1117', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px'
                      }}
                    />
                    <Area type="monotone" dataKey="margin" stroke="#57ACAF" strokeWidth={2} fillOpacity={1} fill="url(#colorMargin)" />
                    <Area type="monotone" dataKey="cost" stroke="#EAB308" strokeWidth={2} fillOpacity={1} fill="url(#colorCost)" />
                  </AreaChart>
                </ResponsiveContainer>
              ),
            },
            {
              title: 'Order Status Breakdown',
              component: (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={orderStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {orderStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#0D1117', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ),
            },
            {
              title: 'ESG Compliance Radar',
              component: (
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={esgRadarData}>
                    <PolarGrid stroke="#ffffff20" />
                    <PolarAngleAxis dataKey="category" stroke="#6F83A7" />
                    <PolarRadiusAxis stroke="#6F83A7" />
                    <Radar name="ESG Score" dataKey="value" stroke="#57ACAF" fill="#57ACAF" fillOpacity={0.5} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#0D1117', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px'
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              ),
            },
          ],
          aiInsights: [
            { icon: TrendingDown, color: '#D0342C', title: 'Margin Alert', description: 'Margin dropped 3% due to washing cost increase in May-June.', action: 'Review Costing' },
            { icon: AlertTriangle, color: '#EAB308', title: 'Delay Risk', description: 'Predicted delay risk in 4 orders — review Planning module.', action: 'View Orders' },
            { icon: Sparkles, color: '#57ACAF', title: 'ESG Progress', description: 'Waste reduction up 12% — on track for Q3 sustainability target.', action: 'View ESG Report' },
          ],
          quickActions: [
            { label: 'Generate Board Report', icon: FileText, onClick: () => toast.success('Generating board report...') },
            { label: 'Approve Expenditure', icon: CheckCircle, onClick: () => toast.info('Opening approval workflow...') },
            { label: 'View Company KPIs', icon: BarChart3, onClick: () => toast.info('Opening KPI dashboard...') },
          ],
        };

      case 'merchandising':
        return {
          greeting: 'Merchandising Head Dashboard',
          subtitle: 'Oversee buyer relationships, quotations, and order intake',
          kpis: merchandisingKPIs,
          charts: [
            {
              title: 'Buyer Engagement Trend',
              component: (
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLine data={buyerEngagementData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis dataKey="week" stroke="#6F83A7" />
                    <YAxis stroke="#6F83A7" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#0D1117', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px'
                      }}
                    />
                    <Line type="monotone" dataKey="engagement" stroke="#57ACAF" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="conversions" stroke="#EAB308" strokeWidth={2} dot={{ r: 4 }} />
                  </RechartsLine>
                </ResponsiveContainer>
              ),
            },
            {
              title: 'RFQ Conversion Funnel',
              component: (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={rfqFunnelData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis type="number" stroke="#6F83A7" />
                    <YAxis dataKey="stage" type="category" stroke="#6F83A7" width={100} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#0D1117', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px'
                      }}
                    />
                    <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                      {rfqFunnelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ),
            },
          ],
          aiInsights: [
            { icon: Users, color: '#D0342C', title: 'Low Engagement Alert', description: '3 buyers showing low engagement — schedule a follow-up call.', action: 'View Buyers' },
            { icon: Clock, color: '#EAB308', title: 'TAT Increase', description: 'Average quotation TAT increased by 1.2 days — optimize workflow.', action: 'Review Process' },
            { icon: Target, color: '#57ACAF', title: 'High Win Rate', description: 'Win rate improved to 68% — analyze successful patterns.', action: 'View Analysis' },
          ],
          quickActions: [
            { label: 'View Lead Pipeline', icon: Target, onClick: () => toast.info('Opening lead pipeline...') },
            { label: 'Draft Buyer Updates', icon: Send, onClick: () => toast.success('Opening email composer...') },
            { label: 'Parse New RFQs', icon: FileText, onClick: () => toast.success('Parsing RFQs...') },
          ],
        };

      case 'production':
        return {
          greeting: 'Production Manager Dashboard',
          subtitle: 'Monitor floor operations, WIP, and delivery performance',
          kpis: productionKPIs,
          charts: [
            {
              title: 'Capacity Utilization by Line',
              component: (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={capacityHeatmapData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis dataKey="line" stroke="#6F83A7" />
                    <YAxis stroke="#6F83A7" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#0D1117', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px'
                      }}
                    />
                    <Bar dataKey="capacity" fill="#57ACAF" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="efficiency" fill="#EAB308" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ),
            },
            {
              title: 'Efficiency vs Downtime',
              component: (
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLine data={efficiencyVsDowntimeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis dataKey="week" stroke="#6F83A7" />
                    <YAxis stroke="#6F83A7" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#0D1117', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px'
                      }}
                    />
                    <Line type="monotone" dataKey="efficiency" stroke="#57ACAF" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="downtime" stroke="#D0342C" strokeWidth={2} dot={{ r: 4 }} />
                  </RechartsLine>
                </ResponsiveContainer>
              ),
            },
          ],
          aiInsights: [
            { icon: AlertTriangle, color: '#D0342C', title: 'Bottleneck Detected', description: 'Bottleneck detected in Line 4 — suggest reallocation to Line 6.', action: 'Reallocate' },
            { icon: Package, color: '#EAB308', title: 'Material Delay', description: 'Fabric ETA slip may delay Order #3214 by 2 days — expedite.', action: 'View Details' },
            { icon: TrendingUp, color: '#57ACAF', title: 'Efficiency Gain', description: 'Line 3 efficiency improved 5% with new process — replicate.', action: 'View Analysis' },
          ],
          quickActions: [
            { label: 'Replan Schedule', icon: RefreshCw, onClick: () => toast.success('Opening replanning tool...') },
            { label: 'Approve Overtime', icon: CheckCircle, onClick: () => toast.info('Opening approval form...') },
            { label: 'Line Efficiency Report', icon: Download, onClick: () => toast.success('Generating report...') },
          ],
        };

      case 'quality':
        return {
          greeting: 'Quality Manager Dashboard',
          subtitle: 'Ensure quality consistency and buyer compliance',
          kpis: qualityKPIs,
          charts: [
            {
              title: 'Top 5 Defects by Type',
              component: (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={defectsByTypeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis dataKey="type" stroke="#6F83A7" />
                    <YAxis stroke="#6F83A7" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#0D1117', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px'
                      }}
                    />
                    <Bar dataKey="count" fill="#EAB308" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ),
            },
            {
              title: 'DHU Trend by Month',
              component: (
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLine data={dhuTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis dataKey="month" stroke="#6F83A7" />
                    <YAxis stroke="#6F83A7" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#0D1117', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px'
                      }}
                    />
                    <Line type="monotone" dataKey="dhu" stroke="#57ACAF" strokeWidth={2} dot={{ r: 4 }} />
                  </RechartsLine>
                </ResponsiveContainer>
              ),
            },
          ],
          aiInsights: [
            { icon: AlertTriangle, color: '#D0342C', title: 'Defect Spike', description: 'Broken stitch defects up 10% — operator retraining required.', action: 'Schedule Training' },
            { icon: TrendingDown, color: '#EAB308', title: 'Supplier Issue', description: 'Supplier X causing 70% of recent reworks — review contract.', action: 'View Details' },
            { icon: CheckCircle, color: '#57ACAF', title: 'FPY Improvement', description: 'First Pass Yield improved 4.2% — process optimization working.', action: 'View Report' },
          ],
          quickActions: [
            { label: 'Generate QC Pack', icon: FileText, onClick: () => toast.success('Generating QC pack...') },
            { label: 'Create CAPA', icon: AlertCircle, onClick: () => toast.info('Opening CAPA form...') },
            { label: 'View Inline Defects', icon: Eye, onClick: () => toast.info('Opening defects dashboard...') },
          ],
        };

      case 'hr':
        return {
          greeting: 'HR & Workforce Manager Dashboard',
          subtitle: 'Manage attendance, skills, and welfare programs',
          kpis: hrKPIs,
          charts: [
            {
              title: 'Absenteeism by Line',
              component: (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={absenteeismData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis dataKey="line" stroke="#6F83A7" />
                    <YAxis stroke="#6F83A7" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#0D1117', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px'
                      }}
                    />
                    <Bar dataKey="rate" fill="#EAB308" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ),
            },
            {
              title: 'Training Completion Trend',
              component: (
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLine data={trainingCompletionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis dataKey="month" stroke="#6F83A7" />
                    <YAxis stroke="#6F83A7" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#0D1117', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px'
                      }}
                    />
                    <Line type="monotone" dataKey="completed" stroke="#57ACAF" strokeWidth={2} dot={{ r: 4 }} />
                  </RechartsLine>
                </ResponsiveContainer>
              ),
            },
          ],
          aiInsights: [
            { icon: AlertTriangle, color: '#D0342C', title: 'Absentee Spike', description: 'Predicted absentee spike next week (festival pattern) — arrange backup.', action: 'Plan Backup' },
            { icon: Award, color: '#EAB308', title: 'Skill Gap', description: '5 operators need re-skilling in Overlock operation.', action: 'Schedule Training' },
            { icon: TrendingDown, color: '#57ACAF', title: 'Attrition Drop', description: 'Attrition reduced 15% due to welfare initiatives — continue.', action: 'View Analysis' },
          ],
          quickActions: [
            { label: 'Approve Leave', icon: CheckCircle, onClick: () => toast.info('Opening leave requests...') },
            { label: 'Assign Training', icon: Award, onClick: () => toast.success('Opening training scheduler...') },
            { label: 'Generate Shift Plan', icon: Calendar, onClick: () => toast.success('Generating shift plan...') },
          ],
        };

      case 'finance':
        return {
          greeting: 'Finance Manager Dashboard',
          subtitle: 'Manage financial health, AR/AP, and margins',
          kpis: financeKPIs,
          charts: [
            {
              title: 'Margin vs Cost Trend',
              component: (
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLine data={marginVsCostTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis dataKey="month" stroke="#6F83A7" />
                    <YAxis stroke="#6F83A7" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#0D1117', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px'
                      }}
                    />
                    <Line type="monotone" dataKey="margin" stroke="#57ACAF" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="cost" stroke="#EAB308" strokeWidth={2} dot={{ r: 4 }} />
                  </RechartsLine>
                </ResponsiveContainer>
              ),
            },
            {
              title: 'AR Collection Over Time',
              component: (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={arCollectionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis dataKey="week" stroke="#6F83A7" />
                    <YAxis stroke="#6F83A7" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#0D1117', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px'
                      }}
                    />
                    <Bar dataKey="collected" fill="#57ACAF" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="pending" fill="#EAB308" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ),
            },
          ],
          aiInsights: [
            { icon: AlertTriangle, color: '#D0342C', title: 'Cash Shortage', description: 'Predicted cash shortage in 14 days — expedite AR collections.', action: 'Send Reminders' },
            { icon: DollarSign, color: '#EAB308', title: 'Low Margin Orders', description: '3 low-margin orders flagged for cost review and negotiation.', action: 'Review Orders' },
            { icon: TrendingUp, color: '#57ACAF', title: 'Collection Improved', description: 'AR collection improved 12% vs last month — maintain momentum.', action: 'View Details' },
          ],
          quickActions: [
            { label: 'Send Reminders', icon: Bell, onClick: () => toast.success('Sending payment reminders...') },
            { label: 'Reconcile Invoice', icon: FileText, onClick: () => toast.info('Opening reconciliation...') },
            { label: 'Generate P&L Report', icon: Download, onClick: () => toast.success('Generating P&L...') },
          ],
        };

      case 'compliance':
        return {
          greeting: 'Compliance & Sustainability Officer Dashboard',
          subtitle: 'Track ESG, policy compliance, and certifications',
          kpis: complianceKPIs,
          charts: [
            {
              title: 'ESG Progress vs Target',
              component: (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={esgProgressData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis dataKey="category" stroke="#6F83A7" />
                    <YAxis stroke="#6F83A7" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#0D1117', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px'
                      }}
                    />
                    <Bar dataKey="actual" fill="#57ACAF" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="target" fill="#6F83A7" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ),
            },
            {
              title: 'Certificate Expiry Timeline',
              component: (
                <div className="space-y-4 p-4">
                  {certificateExpiryData.map((cert) => (
                    <div key={cert.cert} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-white text-sm">{cert.cert}</span>
                        <Badge 
                          variant={cert.status === 'urgent' ? 'destructive' : cert.status === 'warning' ? 'default' : 'secondary'}
                          className={
                            cert.status === 'urgent' ? 'bg-[#D0342C]' : 
                            cert.status === 'warning' ? 'bg-[#EAB308] text-black' : 
                            'bg-[#57ACAF]'
                          }
                        >
                          {cert.daysLeft} days
                        </Badge>
                      </div>
                      <Progress 
                        value={cert.status === 'urgent' ? 15 : cert.status === 'warning' ? 50 : 80} 
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              ),
            },
          ],
          aiInsights: [
            { icon: AlertCircle, color: '#D0342C', title: 'Certificate Expiry', description: '2 WRAP certificates expire in 30 days — initiate renewal process.', action: 'Renew Now' },
            { icon: Zap, color: '#EAB308', title: 'Energy Alert', description: 'Energy intensity 8% above benchmark — review consumption patterns.', action: 'View Details' },
            { icon: Leaf, color: '#57ACAF', title: 'Water Efficiency', description: 'Water usage reduced 12% — exceeded target for Q2.', action: 'View Report' },
          ],
          quickActions: [
            { label: 'Generate ESG Pack', icon: Download, onClick: () => toast.success('Generating ESG report...') },
            { label: 'Schedule Audit', icon: Calendar, onClick: () => toast.info('Opening audit scheduler...') },
            { label: 'Start CAPA Review', icon: FileText, onClick: () => toast.info('Opening CAPA review...') },
          ],
        };

      case 'supervisor':
        return {
          greeting: 'Line Supervisor Dashboard',
          subtitle: 'Display shift-specific operational data',
          kpis: supervisorKPIs,
          charts: [
            {
              title: 'Order Progress Tracker',
              component: (
                <div className="space-y-4 p-4">
                  {orderProgressData.map((order) => (
                    <div key={order.order} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-white text-sm">{order.order}</span>
                        <span className="text-[#6F83A7] text-sm">{order.progress}%</span>
                      </div>
                      <Progress 
                        value={order.progress} 
                        className="h-3"
                      />
                    </div>
                  ))}
                </div>
              ),
            },
            {
              title: 'Efficiency by Operator',
              component: (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={operatorEfficiencyData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis type="number" stroke="#6F83A7" />
                    <YAxis dataKey="operator" type="category" stroke="#6F83A7" width={60} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#0D1117', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px'
                      }}
                    />
                    <Bar dataKey="efficiency" fill="#57ACAF" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ),
            },
          ],
          aiInsights: [
            { icon: Zap, color: '#57ACAF', title: 'Early Completion', description: 'Finish batch early — suggest overtime 30 minutes for bonus target.', action: 'Extend Shift' },
            { icon: AlertTriangle, color: '#EAB308', title: 'Skill Gap', description: '3 operators\' skill gaps affecting efficiency — assign mentor.', action: 'Assign Mentor' },
            { icon: Activity, color: '#57ACAF', title: 'Efficiency High', description: 'Line efficiency 89.5% — on track for daily bonus.', action: 'View Details' },
          ],
          quickActions: [
            { label: 'View Line Plan', icon: Eye, onClick: () => toast.info('Opening line plan...') },
            { label: 'Report Machine Issue', icon: AlertTriangle, onClick: () => toast.error('Opening issue report...') },
            { label: 'Record Defect', icon: FileText, onClick: () => toast.info('Opening defect form...') },
          ],
        };

      default:
        return null;
    }
  };

  const dashboard = getRoleDashboard();

  if (!dashboard) return null;

  return (
    <PageLayout
      breadcrumbs={[{ label: 'Home' }, { label: dashboard.greeting }]}
      aiInsightsCount={dashboard.aiInsights.length}
    >
      {/* Role Selector (for demo purposes) */}
      <div className="mb-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-white mb-1">Select Role View</h2>
            <p className="text-sm text-[#6F83A7]">Switch between different role-based dashboards</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              size="sm"
              onClick={() => setCurrentRole('md')}
              className={currentRole === 'md' ? 'bg-[#EAB308] text-black' : 'bg-white/10 text-white hover:bg-white/20'}
            >
              MD/CEO
            </Button>
            <Button
              size="sm"
              onClick={() => setCurrentRole('merchandising')}
              className={currentRole === 'merchandising' ? 'bg-[#EAB308] text-black' : 'bg-white/10 text-white hover:bg-white/20'}
            >
              Merchandising
            </Button>
            <Button
              size="sm"
              onClick={() => setCurrentRole('production')}
              className={currentRole === 'production' ? 'bg-[#EAB308] text-black' : 'bg-white/10 text-white hover:bg-white/20'}
            >
              Production
            </Button>
            <Button
              size="sm"
              onClick={() => setCurrentRole('quality')}
              className={currentRole === 'quality' ? 'bg-[#EAB308] text-black' : 'bg-white/10 text-white hover:bg-white/20'}
            >
              Quality
            </Button>
            <Button
              size="sm"
              onClick={() => setCurrentRole('hr')}
              className={currentRole === 'hr' ? 'bg-[#EAB308] text-black' : 'bg-white/10 text-white hover:bg-white/20'}
            >
              HR
            </Button>
            <Button
              size="sm"
              onClick={() => setCurrentRole('finance')}
              className={currentRole === 'finance' ? 'bg-[#EAB308] text-black' : 'bg-white/10 text-white hover:bg-white/20'}
            >
              Finance
            </Button>
            <Button
              size="sm"
              onClick={() => setCurrentRole('compliance')}
              className={currentRole === 'compliance' ? 'bg-[#EAB308] text-black' : 'bg-white/10 text-white hover:bg-white/20'}
            >
              Compliance
            </Button>
            <Button
              size="sm"
              onClick={() => setCurrentRole('supervisor')}
              className={currentRole === 'supervisor' ? 'bg-[#EAB308] text-black' : 'bg-white/10 text-white hover:bg-white/20'}
            >
              Supervisor
            </Button>
          </div>
        </div>
      </div>

      {/* Role Header + Greeting */}
      <div className="mb-6 bg-gradient-to-br from-[#57ACAF]/10 to-transparent border border-[#57ACAF]/20 rounded-2xl p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-white text-2xl mb-2">{dashboard.greeting}</h1>
            <p className="text-[#6F83A7]">{dashboard.subtitle}</p>
          </div>
          <Badge className="bg-[#EAB308] text-black">
            Live
          </Badge>
        </div>
      </div>

      {/* Running Orders & Critical Issues Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Running Orders Box */}
        <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-[#57ACAF]/50 transition-all duration-250 shadow-lg hover:shadow-[#57ACAF]/20">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#57ACAF]/10 via-transparent to-transparent border-b border-white/10 px-5 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#57ACAF]/20 border border-[#57ACAF]/30">
                  <ShoppingCart className="w-4 h-4 text-[#57ACAF]" />
                </div>
                <div>
                  <h3 className="text-white">Running Orders</h3>
                  <p className="text-xs text-[#6F83A7]">{getRoleOrdersAndIssues().orders.length} active</p>
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setOrdersExpanded(!ordersExpanded)}
                className="text-[#6F83A7] hover:text-[#57ACAF] hover:bg-[#57ACAF]/10 transition-all duration-180 rounded-lg"
              >
                {ordersExpanded ? 'Collapse' : `View All (${getRoleOrdersAndIssues().orders.length})`}
                <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-250 ${ordersExpanded ? 'rotate-180' : ''}`} />
              </Button>
            </div>
          </div>

          {/* First Order - Always Visible */}
          {getRoleOrdersAndIssues().orders.length > 0 && (
            <div className="relative bg-gradient-to-br from-[#57ACAF]/5 to-transparent p-5 border-b border-white/10 hover:bg-[#57ACAF]/10 transition-all duration-180 cursor-pointer group/item">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#57ACAF] to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-180" />
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-white truncate">{getRoleOrdersAndIssues().orders[0].id}</span>
                    <Badge className="bg-gradient-to-r from-[#EAB308] to-[#EAB308]/80 text-black text-xs px-3 py-0.5 rounded-full shadow-lg shadow-[#EAB308]/20">
                      {getRoleOrdersAndIssues().orders[0].status}
                    </Badge>
                    <Badge className="bg-[#D0342C]/20 text-[#D0342C] border border-[#D0342C]/30 text-xs px-2 py-0.5 rounded-md">
                      Priority
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-[#6F83A7] mb-3">
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5" />
                      <span className="truncate">{getRoleOrdersAndIssues().orders[0].buyer}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{getRoleOrdersAndIssues().orders[0].date}</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      toast.info('Opening order details...');
                    }}
                    className="bg-white/10 hover:bg-[#57ACAF]/20 text-white border border-white/20 hover:border-[#57ACAF]/50 h-8 text-xs transition-all duration-180"
                  >
                    View Details
                    <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Expanded Orders List */}
          <div 
            className={`overflow-hidden transition-all duration-250 ${
              ordersExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="divide-y divide-white/10">
              {getRoleOrdersAndIssues().orders.slice(1).map((order, index) => (
                <div 
                  key={index} 
                  className="relative p-5 hover:bg-white/5 transition-all duration-180 cursor-pointer group/item"
                  onClick={() => toast.info(`Opening ${order.id}...`)}
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#6F83A7] to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-180" />
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-white text-sm truncate">{order.id}</span>
                        <Badge 
                          className={`text-xs px-2.5 py-0.5 rounded-full shadow-lg ${
                            order.priority === 'High' 
                              ? 'bg-gradient-to-r from-[#D0342C] to-[#D0342C]/80 text-white shadow-[#D0342C]/20' 
                              : order.priority === 'Medium'
                              ? 'bg-gradient-to-r from-[#6F83A7] to-[#6F83A7]/80 text-white shadow-[#6F83A7]/20'
                              : 'bg-white/10 text-[#6F83A7] shadow-none'
                          }`}
                        >
                          {order.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-[#6F83A7]">
                        <div className="flex items-center gap-1.5">
                          <Users className="w-3 h-3" />
                          <span className="truncate">{order.buyer}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />
                          <span>{order.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer when collapsed */}
          {!ordersExpanded && getRoleOrdersAndIssues().orders.length > 1 && (
            <div className="bg-gradient-to-r from-transparent via-white/5 to-transparent px-5 py-3 text-center">
              <p className="text-xs text-[#6F83A7]">
                +{getRoleOrdersAndIssues().orders.length - 1} more order{getRoleOrdersAndIssues().orders.length - 1 !== 1 ? 's' : ''}
              </p>
            </div>
          )}
        </div>

        {/* Critical Issues Box */}
        <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-[#D0342C]/50 transition-all duration-250 shadow-lg hover:shadow-[#D0342C]/20">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#D0342C]/10 via-transparent to-transparent border-b border-white/10 px-5 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#D0342C]/20 border border-[#D0342C]/30">
                  <AlertTriangle className="w-4 h-4 text-[#D0342C]" />
                </div>
                <div>
                  <h3 className="text-white">Critical Issues</h3>
                  <p className="text-xs text-[#6F83A7]">{getRoleOrdersAndIssues().issues.length} alert{getRoleOrdersAndIssues().issues.length !== 1 ? 's' : ''}</p>
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIssuesExpanded(!issuesExpanded)}
                className="text-[#6F83A7] hover:text-[#D0342C] hover:bg-[#D0342C]/10 transition-all duration-180 rounded-lg"
              >
                {issuesExpanded ? 'Collapse' : `View All (${getRoleOrdersAndIssues().issues.length})`}
                <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-250 ${issuesExpanded ? 'rotate-180' : ''}`} />
              </Button>
            </div>
          </div>

          {/* First Issue - Always Visible */}
          {getRoleOrdersAndIssues().issues.length > 0 && (() => {
            const firstIssue = getRoleOrdersAndIssues().issues[0];
            const IssueIcon = firstIssue.icon;
            return (
              <div className={`relative p-5 border-b border-white/10 transition-all duration-180 ${
                firstIssue.severity === 'critical'
                  ? 'bg-gradient-to-br from-[#D0342C]/10 to-transparent hover:bg-[#D0342C]/15'
                  : firstIssue.severity === 'high'
                  ? 'bg-gradient-to-br from-[#EAB308]/10 to-transparent hover:bg-[#EAB308]/15'
                  : 'bg-gradient-to-br from-white/5 to-transparent hover:bg-white/10'
              } group/item`}>
                <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${
                  firstIssue.severity === 'critical'
                    ? 'from-[#D0342C]'
                    : firstIssue.severity === 'high'
                    ? 'from-[#EAB308]'
                    : 'from-[#6F83A7]'
                } to-transparent transition-opacity duration-180`} />
                
                <div className="flex items-start gap-3 justify-between">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className={`p-2 rounded-lg ${
                      firstIssue.severity === 'critical'
                        ? 'bg-[#D0342C]/20 border border-[#D0342C]/30'
                        : firstIssue.severity === 'high'
                        ? 'bg-[#EAB308]/20 border border-[#EAB308]/30'
                        : 'bg-[#6F83A7]/20 border border-[#6F83A7]/30'
                    } flex-shrink-0`}>
                      <IssueIcon 
                        className={`w-4 h-4 ${
                          firstIssue.severity === 'critical'
                            ? 'text-[#D0342C]'
                            : firstIssue.severity === 'high'
                            ? 'text-[#EAB308]'
                            : 'text-[#6F83A7]'
                        }`} 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-white truncate">{firstIssue.title}</span>
                        <Badge 
                          className={`text-xs px-2.5 py-0.5 rounded-full shadow-lg flex-shrink-0 ${
                            firstIssue.severity === 'critical'
                              ? 'bg-gradient-to-r from-[#D0342C] to-[#D0342C]/80 text-white shadow-[#D0342C]/20'
                              : firstIssue.severity === 'high'
                              ? 'bg-gradient-to-r from-[#EAB308] to-[#EAB308]/80 text-black shadow-[#EAB308]/20'
                              : 'bg-gradient-to-r from-[#6F83A7] to-[#6F83A7]/80 text-white shadow-[#6F83A7]/20'
                          }`}
                        >
                          {firstIssue.severity.toUpperCase()}
                        </Badge>
                      </div>
                      {firstIssue.description && (
                        <p className="text-xs text-[#6F83A7] mb-3 line-clamp-2">{firstIssue.description}</p>
                      )}
                      {firstIssue.date && firstIssue.time && (
                        <div className="flex items-center gap-3 mb-3 text-xs text-[#6F83A7]">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3 h-3" />
                            <span>{firstIssue.date}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3" />
                            <span>{firstIssue.time}</span>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        {firstIssue.date && firstIssue.time ? (
                          <Button
                            size="sm"
                            onClick={() => toast.success('Joining meeting...')}
                            className="bg-gradient-to-r from-[#EAB308] to-[#EAB308]/80 hover:from-[#EAB308]/90 hover:to-[#EAB308]/70 text-black h-8 text-xs px-4 shadow-lg shadow-[#EAB308]/20"
                          >
                            JOIN MEETING
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => toast.success('Taking action...')}
                            className="bg-gradient-to-r from-[#EAB308] to-[#EAB308]/80 hover:from-[#EAB308]/90 hover:to-[#EAB308]/70 text-black h-8 text-xs shadow-lg shadow-[#EAB308]/20"
                          >
                            Take Action
                            <ChevronRight className="w-3.5 h-3.5 ml-1" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  {onAskMarbim && (
                    <div className="flex-shrink-0">
                      <MarbimAIButton
                        marbimPrompt={`Analyze this critical issue: "${firstIssue.title}${firstIssue.description ? ' - ' + firstIssue.description : ''}". Provide root cause analysis, impact assessment, and step-by-step resolution recommendations for ${dashboard.greeting.split(' ')[0]} role.`}
                        onAskMarbim={onAskMarbim}
                        size="lg"
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })()}

          {/* Expanded Issues List */}
          <div 
            className={`overflow-hidden transition-all duration-250 ${
              issuesExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="divide-y divide-white/10">
              {getRoleOrdersAndIssues().issues.slice(1).map((issue, index) => {
                const IssueIcon = issue.icon;
                return (
                  <div 
                    key={issue.id}
                    className={`relative p-5 transition-all duration-180 ${
                      issue.severity === 'critical'
                        ? 'bg-gradient-to-br from-[#D0342C]/5 to-transparent hover:bg-[#D0342C]/10'
                        : issue.severity === 'high'
                        ? 'bg-gradient-to-br from-[#EAB308]/5 to-transparent hover:bg-[#EAB308]/10'
                        : 'hover:bg-white/5'
                    } group/item`}
                  >
                    <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${
                      issue.severity === 'critical'
                        ? 'from-[#D0342C]'
                        : issue.severity === 'high'
                        ? 'from-[#EAB308]'
                        : 'from-[#6F83A7]'
                    } to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-180`} />
                    
                    <div className="flex items-start gap-3 justify-between">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className={`p-2 rounded-lg ${
                          issue.severity === 'critical'
                            ? 'bg-[#D0342C]/20 border border-[#D0342C]/30'
                            : issue.severity === 'high'
                            ? 'bg-[#EAB308]/20 border border-[#EAB308]/30'
                            : 'bg-[#6F83A7]/20 border border-[#6F83A7]/30'
                        } flex-shrink-0`}>
                          <IssueIcon 
                            className={`w-4 h-4 ${
                              issue.severity === 'critical'
                                ? 'text-[#D0342C]'
                                : issue.severity === 'high'
                                ? 'text-[#EAB308]'
                                : 'text-[#6F83A7]'
                            }`} 
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-white text-sm truncate">{issue.title}</span>
                            <Badge 
                              className={`text-xs px-2 py-0.5 rounded-full shadow-lg flex-shrink-0 ${
                                issue.severity === 'critical'
                                  ? 'bg-gradient-to-r from-[#D0342C] to-[#D0342C]/80 text-white shadow-[#D0342C]/20'
                                  : issue.severity === 'high'
                                  ? 'bg-gradient-to-r from-[#EAB308] to-[#EAB308]/80 text-black shadow-[#EAB308]/20'
                                  : 'bg-gradient-to-r from-[#6F83A7] to-[#6F83A7]/80 text-white shadow-[#6F83A7]/20'
                              }`}
                            >
                              {issue.severity.toUpperCase()}
                            </Badge>
                          </div>
                          {issue.description && (
                            <p className="text-xs text-[#6F83A7] mb-3 line-clamp-2">{issue.description}</p>
                          )}
                          {issue.date && issue.time && (
                            <div className="flex items-center gap-3 mb-3 text-xs text-[#6F83A7]">
                              <div className="flex items-center gap-1.5">
                                <Calendar className="w-3 h-3" />
                                <span>{issue.date}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Clock className="w-3 h-3" />
                                <span>{issue.time}</span>
                              </div>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            {issue.date && issue.time ? (
                              <Button
                                size="sm"
                                onClick={() => toast.success('Joining meeting...')}
                                className="bg-gradient-to-r from-[#EAB308] to-[#EAB308]/80 hover:from-[#EAB308]/90 hover:to-[#EAB308]/70 text-black h-7 text-xs px-3 shadow-lg shadow-[#EAB308]/20"
                              >
                                JOIN
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                onClick={() => toast.success('Taking action...')}
                                className="bg-gradient-to-r from-[#EAB308] to-[#EAB308]/80 hover:from-[#EAB308]/90 hover:to-[#EAB308]/70 text-black h-7 text-xs shadow-lg shadow-[#EAB308]/20"
                              >
                                Take Action
                                <ChevronRight className="w-3 h-3 ml-1" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                      {onAskMarbim && (
                        <div className="flex-shrink-0">
                          <MarbimAIButton
                            marbimPrompt={`Analyze this critical issue: "${issue.title}${issue.description ? ' - ' + issue.description : ''}". Provide root cause analysis, impact assessment, and step-by-step resolution recommendations for ${dashboard.greeting.split(' ')[0]} role.`}
                            onAskMarbim={onAskMarbim}
                            size="lg"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer when collapsed */}
          {!issuesExpanded && getRoleOrdersAndIssues().issues.length > 1 && (
            <div className="bg-gradient-to-r from-transparent via-white/5 to-transparent px-5 py-3 text-center">
              <p className="text-xs text-[#6F83A7]">
                +{getRoleOrdersAndIssues().issues.length - 1} more issue{getRoleOrdersAndIssues().issues.length - 1 !== 1 ? 's' : ''}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${dashboard.kpis.length > 4 ? '5' : '4'} gap-6`}>
        {dashboard.kpis.map((kpi, index) => (
          <KPICard
            key={index}
            title={kpi.title}
            value={kpi.value}
            change={kpi.change}
            changeLabel="vs last period"
            icon={kpi.icon}
            trend={kpi.change > 0 ? 'up' : 'down'}
          />
        ))}
      </div>

      {/* Charts / Visual Insights Row */}
      <div className={`grid grid-cols-1 ${dashboard.charts.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-6`}>
        {dashboard.charts.map((chart, index) => {
          // Cycle through accent colors for visual variety
          const accentColors = [
            { primary: '#57ACAF', gradient: 'from-[#57ACAF]/10', border: 'border-[#57ACAF]/30', hover: 'hover:border-[#57ACAF]/50', shadow: 'shadow-[#57ACAF]/10', bg: 'bg-[#57ACAF]/20' },
            { primary: '#EAB308', gradient: 'from-[#EAB308]/10', border: 'border-[#EAB308]/30', hover: 'hover:border-[#EAB308]/50', shadow: 'shadow-[#EAB308]/10', bg: 'bg-[#EAB308]/20' },
            { primary: '#6F83A7', gradient: 'from-[#6F83A7]/10', border: 'border-[#6F83A7]/30', hover: 'hover:border-[#6F83A7]/50', shadow: 'shadow-[#6F83A7]/10', bg: 'bg-[#6F83A7]/20' },
          ];
          const color = accentColors[index % accentColors.length];
          
          return (
            <div 
              key={index} 
              className={`group relative bg-white/5 backdrop-blur-sm border border-white/10 ${color.hover} rounded-2xl overflow-hidden transition-all duration-250 shadow-lg hover:shadow-xl hover:${color.shadow}`}
            >
              {/* Gradient accent bar at top */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${color.gradient} via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-250`} />
              
              {/* Header with icon */}
              <div className={`bg-gradient-to-br ${color.gradient} via-transparent to-transparent border-b border-white/10 px-6 py-4`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${color.bg} border ${color.border} backdrop-blur-sm`}>
                      <BarChart3 className="w-4 h-4" style={{ color: color.primary }} />
                    </div>
                    <div>
                      <h3 className="text-white">{chart.title}</h3>
                      <p className="text-xs text-[#6F83A7]">Analytics Overview</p>
                    </div>
                  </div>
                  {onAskMarbim && (
                    <MarbimAIButton
                      marbimPrompt={`Analyze the ${chart.title} for ${dashboard.greeting.split(' ')[0]} role and provide insights on trends, patterns, and recommendations.`}
                      onAskMarbim={onAskMarbim}
                      size="sm"
                    />
                  )}
                </div>
              </div>

              {/* Chart Content */}
              <div className="p-6 bg-gradient-to-br from-transparent via-white/[0.02] to-transparent">
                <div className="relative">
                  {/* Subtle glow effect behind chart */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${color.gradient} to-transparent opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-250 pointer-events-none`} />
                  <div className="relative">
                    {chart.component}
                  </div>
                </div>
              </div>

              {/* Bottom gradient accent */}
              <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-250`} />
            </div>
          );
        })}
      </div>

      {/* AI Recommendation & Task Feed + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Recommendations */}
        <div className="lg:col-span-2 space-y-4">
          <AICard
            title="MARBIM AI Insights"
            marbimPrompt={`Provide comprehensive AI insights for ${dashboard.greeting} including strategic recommendations, risk alerts, and optimization opportunities.`}
            onAskMarbim={onAskMarbim}
          >
            <div className="space-y-3">
              {dashboard.aiInsights.map((insight, index) => (
                <div key={index} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-180">
                  <div className="flex items-start gap-3 justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <insight.icon className={`w-5 h-5 flex-shrink-0 mt-0.5`} style={{ color: insight.color }} />
                      <div className="flex-1">
                        <div className="text-white mb-1">{insight.title}</div>
                        <div className="text-sm text-[#6F83A7] mb-3">{insight.description}</div>
                        <Button
                          size="sm"
                          onClick={() => toast.success(insight.action)}
                          className="bg-[#EAB308] hover:bg-[#EAB308]/90 text-black"
                        >
                          {insight.action}
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                    {onAskMarbim && (
                      <MarbimAIButton
                        marbimPrompt={`Explain the insight: "${insight.title} - ${insight.description}" and provide detailed recommendations for action.`}
                        onAskMarbim={onAskMarbim}
                        size="lg"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </AICard>

          {/* Quick Actions */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {dashboard.quickActions.map((action, index) => (
                <Button
                  key={index}
                  onClick={action.onClick}
                  className="bg-gradient-to-br from-[#57ACAF]/20 to-transparent border border-[#57ACAF]/30 hover:from-[#57ACAF]/30 hover:to-transparent text-white justify-start h-auto py-3"
                >
                  <action.icon className="w-5 h-5 mr-2 text-[#57ACAF]" />
                  {action.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity Stream */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white">Recent Activity</h3>
            <Button size="sm" variant="ghost" className="text-[#6F83A7] hover:text-white">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-180 cursor-pointer">
                <div className="p-2 rounded-lg bg-white/5" style={{ borderColor: activity.color, borderWidth: '1px' }}>
                  <activity.icon className="w-4 h-4" style={{ color: activity.color }} />
                </div>
                <div className="flex-1">
                  <div className="text-white text-sm mb-1">{activity.title}</div>
                  <div className="text-xs text-[#6F83A7] mb-2">{activity.description}</div>
                  <div className="text-xs text-[#6F83A7]">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
