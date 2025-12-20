import { useState } from 'react';
import { motion } from 'motion/react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ScrollArea } from '../ui/scroll-area';
import { Progress } from '../ui/progress';
import { 
  User, Lock, Bell, Shield, Users, Globe, Database, 
  Upload, Search, BarChart3, CheckCircle, FileText, Building2,
  Mail, Phone, MapPin, Calendar, Clock, CreditCard, Key,
  Smartphone, Monitor, Download, Trash2, ExternalLink,
  Sparkles, TrendingUp, Zap, Eye, EyeOff, Save, RefreshCw,
  Puzzle, DollarSign, Settings as SettingsIcon, AlertTriangle,
  Code, Webhook, Link2, Package, FileCode, Activity, History,
  Layers, Box, ShoppingBag, Factory, Truck, Leaf, CheckSquare,
  Calculator, Ship, Clipboard, BookOpen, Ban, Edit, Plus,
  ChevronRight, Info, Crown, Star, Target, Wallet, Receipt,
  ArrowUpRight, ArrowDownRight, PieChart, BarChart, Percent
} from 'lucide-react';
import { toast } from 'sonner';
import { VectorDatabaseAdmin } from '../VectorDatabaseAdmin';

const users = [
  { name: 'Sarah Mitchell', email: 'sarah@fabricxai.com', role: 'Admin', status: 'Active', lastActive: '2 min ago' },
  { name: 'Mike Rodriguez', email: 'mike@fabricxai.com', role: 'Manager', status: 'Active', lastActive: '1 hour ago' },
  { name: 'Lisa Kim', email: 'lisa@fabricxai.com', role: 'User', status: 'Active', lastActive: '3 hours ago' },
  { name: 'John Davis', email: 'john@fabricxai.com', role: 'User', status: 'Inactive', lastActive: '5 days ago' },
  { name: 'Emma Wilson', email: 'emma@fabricxai.com', role: 'Sales', status: 'Active', lastActive: '15 min ago' },
  { name: 'David Chen', email: 'david@fabricxai.com', role: 'Production', status: 'Active', lastActive: '30 min ago' },
];

const roles = [
  { 
    name: 'Administrator', 
    users: 2, 
    permissions: ['Full Access', 'User Management', 'System Config', 'All Modules'],
    color: 'EAB308'
  },
  { 
    name: 'Manager', 
    users: 5, 
    permissions: ['CRM', 'Production', 'Finance', 'Reports'],
    color: '57ACAF'
  },
  { 
    name: 'Sales', 
    users: 8, 
    permissions: ['CRM', 'RFQ', 'Buyers', 'Reports'],
    color: '6F83A7'
  },
  { 
    name: 'Production', 
    users: 12, 
    permissions: ['Production', 'QC', 'Machines', 'Inventory'],
    color: '57ACAF'
  },
  { 
    name: 'Finance', 
    users: 4, 
    permissions: ['Finance', 'Costing', 'Invoices', 'Reports'],
    color: 'EAB308'
  },
  { 
    name: 'Viewer', 
    users: 8, 
    permissions: ['Read Only', 'Basic Reports'],
    color: '6F83A7'
  },
];

const modules = [
  { id: 'lead-management', name: 'Lead Management', icon: Users, enabled: true, license: 'unlimited', usage: 247 },
  { id: 'buyer-management', name: 'Buyer Management', icon: ShoppingBag, enabled: true, license: 'unlimited', usage: 156 },
  { id: 'rfq-quotation', name: 'RFQ & Quotation', icon: FileText, enabled: true, license: 'unlimited', usage: 892 },
  { id: 'costing', name: 'Costing', icon: Calculator, enabled: true, license: 'unlimited', usage: 423 },
  { id: 'production', name: 'Production Planning', icon: Factory, enabled: true, license: 'unlimited', usage: 1247 },
  { id: 'quality', name: 'Quality Control', icon: CheckSquare, enabled: true, license: 'unlimited', usage: 634 },
  { id: 'machines', name: 'Machine Maintenance', icon: Settings as any, enabled: true, license: 'unlimited', usage: 189 },
  { id: 'supplier', name: 'Supplier Evaluation', icon: Clipboard, enabled: true, license: 'unlimited', usage: 312 },
  { id: 'inventory', name: 'Inventory Management', icon: Box, enabled: true, license: 'unlimited', usage: 856 },
  { id: 'shipment', name: 'Shipment', icon: Ship, enabled: true, license: 'unlimited', usage: 445 },
  { id: 'finance', name: 'Finance', icon: DollarSign, enabled: true, license: 'unlimited', usage: 678 },
  { id: 'compliance', name: 'Compliance & Policy', icon: Shield, enabled: true, license: 'unlimited', usage: 234 },
  { id: 'sustainability', name: 'Sustainability', icon: Leaf, enabled: true, license: 'unlimited', usage: 167 },
  { id: 'workforce', name: 'Workforce Management', icon: Users, enabled: false, license: '50 users', usage: 0 },
];

const integrations = [
  { name: 'Slack', description: 'Team communication and notifications', icon: '💬', connected: true, lastSync: '5 min ago' },
  { name: 'QuickBooks', description: 'Accounting and finance sync', icon: '📊', connected: true, lastSync: '1 hour ago' },
  { name: 'Google Workspace', description: 'Email and calendar integration', icon: '📧', connected: true, lastSync: '10 min ago' },
  { name: 'Stripe', description: 'Payment processing', icon: '💳', connected: false, lastSync: null },
  { name: 'Salesforce', description: 'CRM data synchronization', icon: '☁️', connected: false, lastSync: null },
  { name: 'Zapier', description: 'Workflow automation', icon: '⚡', connected: false, lastSync: null },
];

const activityLog = [
  { action: 'Password Changed', user: 'You', timestamp: '2 hours ago', status: 'success', ip: '192.168.1.100' },
  { action: 'Login - Chrome Windows', user: 'You', timestamp: '5 hours ago', status: 'success', ip: '192.168.1.100' },
  { action: 'Profile Updated', user: 'You', timestamp: '1 day ago', status: 'success', ip: '192.168.1.100' },
  { action: 'Failed Login Attempt', user: 'Unknown', timestamp: '2 days ago', status: 'warning', ip: '203.45.67.89' },
  { action: 'API Key Generated', user: 'You', timestamp: '3 days ago', status: 'success', ip: '192.168.1.100' },
];

export function Settings() {
  const [activeTab, setActiveTab] = useState('account');
  const [isVectorAdminOpen, setIsVectorAdminOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'company', label: 'Company', icon: Building2 },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: Globe },
    { id: 'integrations', label: 'Integrations', icon: Puzzle },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'modules', label: 'Modules', icon: Layers },
    { id: 'advanced', label: 'Advanced', icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#101725] to-[#182336] pb-[72px]">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-[600px] h-[600px] bg-[#57ACAF]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 left-20 w-[600px] h-[600px] bg-[#EAB308]/5 rounded-full blur-[120px]" />
      </div>

      <ScrollArea className="h-[calc(100vh-72px)]">
        <div className="relative px-8 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">
                    Settings & Configuration
                  </h1>
                  <p className="text-lg text-[#6F83A7]">
                    Manage your account, system preferences, and organization settings
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                    <div className={`w-2 h-2 rounded-full ${autoSave ? 'bg-[#57ACAF]' : 'bg-[#6F83A7]'} animate-pulse`} />
                    <span className="text-sm text-[#6F83A7]">
                      {autoSave ? 'Auto-save enabled' : 'Auto-save disabled'}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    className="border-white/20 bg-white/5 text-white hover:bg-white/10"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Settings
                  </Button>
                </div>
              </div>

              {/* AI Recommendation Card - Hidden on Modules tab */}
              {activeTab !== 'modules' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-br from-[#EAB308]/10 to-[#57ACAF]/10 border border-[#EAB308]/20 rounded-xl p-5 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#EAB308]/20 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-[#EAB308]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-medium">Security Recommendation</span>
                      <Badge className="bg-[#EAB308]/20 text-[#EAB308] border-0">High Priority</Badge>
                    </div>
                    <p className="text-sm text-[#6F83A7] mb-3">
                      Your security score is 72%. Enable two-factor authentication, review active sessions, and rotate API keys to increase it to 95% and enhance protection.
                    </p>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        className="bg-[#EAB308]/20 hover:bg-[#EAB308]/30 text-[#EAB308] border border-[#EAB308]/20"
                        onClick={() => setActiveTab('security')}
                      >
                        Improve Security
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-[#6F83A7] hover:text-white"
                      >
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Tab Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative border-b border-white/10 bg-gradient-to-b from-white/5 to-transparent mb-8"
            >
              <div className="flex items-center gap-1 px-2 overflow-x-auto custom-scrollbar">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        relative px-5 py-4 text-sm transition-all duration-300 flex items-center gap-2 whitespace-nowrap
                        ${activeTab === tab.id ? 'text-[#57ACAF]' : 'text-[#6F83A7] hover:text-white'}
                      `}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="relative z-10 font-medium">{tab.label}</span>
                      
                      {/* Animated underline */}
                      {activeTab === tab.id && (
                        <motion.div
                          layoutId="activeSettingsTabIndicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#57ACAF] to-[#EAB308]"
                          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8"
            >
              {/* Account Tab */}
              {activeTab === 'account' && (
                <div className="space-y-6">
                  {/* Profile Card */}
                  <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-8">
                    <div className="flex items-start gap-6 mb-6">
                      <div className="relative group">
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#57ACAF] to-[#57ACAF]/60 flex items-center justify-center shadow-lg shadow-[#57ACAF]/20">
                          <User className="w-12 h-12 text-white" />
                        </div>
                        <button className="absolute inset-0 rounded-2xl bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-180 flex items-center justify-center">
                          <Upload className="w-6 h-6 text-white" />
                        </button>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl text-white mb-1">Admin User</h3>
                        <p className="text-[#6F83A7] mb-4">admin@fabricxai.com</p>
                        <div className="flex items-center gap-3 flex-wrap">
                          <Badge className="bg-[#EAB308]/10 text-[#EAB308] border border-[#EAB308]/20">
                            <Shield className="w-3 h-3 mr-1" />
                            Administrator
                          </Badge>
                          <Badge className="bg-[#57ACAF]/10 text-[#57ACAF] border border-[#57ACAF]/20">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                          <Badge className="bg-[#6F83A7]/10 text-[#6F83A7] border border-[#6F83A7]/20">
                            <Calendar className="w-3 h-3 mr-1" />
                            Joined Jan 2024
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-white/10 my-6" />

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <Label className="text-[#6F83A7] mb-2">First Name</Label>
                        <Input 
                          defaultValue="Admin"
                          className="bg-white/5 border-white/10 text-white focus:border-[#57ACAF]"
                        />
                      </div>
                      <div>
                        <Label className="text-[#6F83A7] mb-2">Last Name</Label>
                        <Input 
                          defaultValue="User"
                          className="bg-white/5 border-white/10 text-white focus:border-[#57ACAF]"
                        />
                      </div>
                      <div>
                        <Label className="text-[#6F83A7] mb-2">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6F83A7]" />
                          <Input 
                            type="email"
                            defaultValue="admin@fabricxai.com"
                            className="bg-white/5 border-white/10 text-white pl-10 focus:border-[#57ACAF]"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-[#6F83A7] mb-2">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6F83A7]" />
                          <Input 
                            defaultValue="+1 (234) 567-8900"
                            className="bg-white/5 border-white/10 text-white pl-10 focus:border-[#57ACAF]"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-[#6F83A7] mb-2">Job Title</Label>
                        <Input 
                          defaultValue="System Administrator"
                          className="bg-white/5 border-white/10 text-white focus:border-[#57ACAF]"
                        />
                      </div>
                      <div>
                        <Label className="text-[#6F83A7] mb-2">Department</Label>
                        <Select defaultValue="admin">
                          <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-[#57ACAF]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1a2332] border-white/10">
                            <SelectItem value="admin">Administration</SelectItem>
                            <SelectItem value="sales">Sales</SelectItem>
                            <SelectItem value="production">Production</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="hr">Human Resources</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-8">
                      <Button
                        variant="outline"
                        className="border-[#D0342C]/30 text-[#D0342C] hover:bg-[#D0342C]/10"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Account
                      </Button>
                      <Button 
                        className="bg-gradient-to-r from-[#57ACAF] to-[#57ACAF]/80 hover:from-[#57ACAF]/90 hover:to-[#57ACAF]/70 text-white shadow-lg shadow-[#57ACAF]/20"
                        onClick={() => toast.success('Profile updated successfully!')}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-gradient-to-br from-[#57ACAF]/10 to-[#57ACAF]/5 border border-[#57ACAF]/20 rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-[#57ACAF]/20 flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-[#57ACAF]" />
                        </div>
                        <div>
                          <div className="text-2xl text-white">245</div>
                          <div className="text-xs text-[#6F83A7]">Days Active</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-[#EAB308]/10 to-[#EAB308]/5 border border-[#EAB308]/20 rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-[#EAB308]/20 flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-[#EAB308]" />
                        </div>
                        <div>
                          <div className="text-2xl text-white">1,847</div>
                          <div className="text-xs text-[#6F83A7]">Actions</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-[#6F83A7]/10 to-[#6F83A7]/5 border border-[#6F83A7]/20 rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-[#6F83A7]/20 flex items-center justify-center">
                          <Clock className="w-5 h-5 text-[#6F83A7]" />
                        </div>
                        <div>
                          <div className="text-2xl text-white">348h</div>
                          <div className="text-xs text-[#6F83A7]">Total Time</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-[#57ACAF]/10 to-[#EAB308]/5 border border-[#57ACAF]/20 rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-[#EAB308]/20 flex items-center justify-center">
                          <Zap className="w-5 h-5 text-[#EAB308]" />
                        </div>
                        <div>
                          <div className="text-2xl text-white">94%</div>
                          <div className="text-xs text-[#6F83A7]">Efficiency</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Activity Log */}
                  <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#6F83A7]/20 flex items-center justify-center">
                          <History className="w-5 h-5 text-[#6F83A7]" />
                        </div>
                        <div>
                          <h3 className="text-white">Recent Activity</h3>
                          <p className="text-sm text-[#6F83A7]">Your account activity log</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-white/10 text-white hover:bg-white/5 bg-[rgba(255,255,255,0.02)]"
                      >
                        View All
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {activityLog.map((log, index) => (
                        <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                          <div className="flex items-center gap-4">
                            <div className={`w-2 h-2 rounded-full ${log.status === 'success' ? 'bg-[#57ACAF]' : 'bg-[#EAB308]'}`} />
                            <div>
                              <div className="text-white mb-1">{log.action}</div>
                              <div className="text-sm text-[#6F83A7]">{log.user} • {log.timestamp}</div>
                            </div>
                          </div>
                          <div className="text-xs text-[#6F83A7] font-mono">{log.ip}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Data Export */}
                  <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-8">
                    <h3 className="text-white mb-4">Data & Privacy</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        variant="outline"
                        className="h-auto py-4 flex-col gap-2 border-white/10 text-white hover:bg-white/5"
                      >
                        <Download className="w-5 h-5 text-[#57ACAF]" />
                        <div className="text-center">
                          <div className="font-medium">Export My Data</div>
                          <div className="text-xs text-[#6F83A7]">Download all your data</div>
                        </div>
                      </Button>
                      <Button
                        variant="outline"
                        className="h-auto py-4 flex-col gap-2 border-white/10 text-white hover:bg-white/5"
                      >
                        <FileText className="w-5 h-5 text-[#EAB308]" />
                        <div className="text-center">
                          <div className="font-medium">Activity Report</div>
                          <div className="text-xs text-[#6F83A7]">View detailed report</div>
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Company Tab */}
              {activeTab === 'company' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#EAB308] to-[#EAB308]/60 flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl text-white">Company Information</h3>
                        <p className="text-sm text-[#6F83A7]">Manage your organization details</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <Label className="text-[#6F83A7] mb-2">Company Name</Label>
                          <Input 
                            defaultValue="FabricXAI Manufacturing"
                            className="bg-white/5 border-white/10 text-white focus:border-[#57ACAF]"
                          />
                        </div>
                        <div>
                          <Label className="text-[#6F83A7] mb-2">Legal Name</Label>
                          <Input 
                            defaultValue="FabricXAI Manufacturing Inc."
                            className="bg-white/5 border-white/10 text-white focus:border-[#57ACAF]"
                          />
                        </div>
                        <div>
                          <Label className="text-[#6F83A7] mb-2">Industry</Label>
                          <Select defaultValue="textile">
                            <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-[#57ACAF]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1a2332] border-white/10">
                              <SelectItem value="textile">Textile & Apparel</SelectItem>
                              <SelectItem value="fashion">Fashion</SelectItem>
                              <SelectItem value="manufacturing">Manufacturing</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-[#6F83A7] mb-2">Company Size</Label>
                          <Select defaultValue="500-1000">
                            <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-[#57ACAF]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1a2332] border-white/10">
                              <SelectItem value="1-50">1-50 employees</SelectItem>
                              <SelectItem value="51-200">51-200 employees</SelectItem>
                              <SelectItem value="201-500">201-500 employees</SelectItem>
                              <SelectItem value="500-1000">500-1000 employees</SelectItem>
                              <SelectItem value="1000+">1000+ employees</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-[#6F83A7] mb-2">Company Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6F83A7]" />
                            <Input 
                              type="email"
                              defaultValue="info@fabricxai.com"
                              className="bg-white/5 border-white/10 text-white pl-10 focus:border-[#57ACAF]"
                            />
                          </div>
                        </div>
                        <div>
                          <Label className="text-[#6F83A7] mb-2">Phone Number</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6F83A7]" />
                            <Input 
                              defaultValue="+1 234 567 8900"
                              className="bg-white/5 border-white/10 text-white pl-10 focus:border-[#57ACAF]"
                            />
                          </div>
                        </div>
                        <div className="col-span-2">
                          <Label className="text-[#6F83A7] mb-2">Address</Label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-3 w-4 h-4 text-[#6F83A7]" />
                            <Input 
                              defaultValue="123 Business St, New York, NY 10001"
                              className="bg-white/5 border-white/10 text-white pl-10 focus:border-[#57ACAF]"
                            />
                          </div>
                        </div>
                      </div>

                      <Separator className="bg-white/10" />

                      <div>
                        <h4 className="text-white mb-4">Business Details</h4>
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <Label className="text-[#6F83A7] mb-2">Tax ID / EIN</Label>
                            <Input 
                              defaultValue="12-3456789"
                              className="bg-white/5 border-white/10 text-white focus:border-[#57ACAF]"
                            />
                          </div>
                          <div>
                            <Label className="text-[#6F83A7] mb-2">Founded Year</Label>
                            <Input 
                              defaultValue="1998"
                              className="bg-white/5 border-white/10 text-white focus:border-[#57ACAF]"
                            />
                          </div>
                          <div>
                            <Label className="text-[#6F83A7] mb-2">Fiscal Year Start</Label>
                            <Select defaultValue="january">
                              <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-[#57ACAF]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-[#1a2332] border-white/10">
                                <SelectItem value="january">January</SelectItem>
                                <SelectItem value="april">April</SelectItem>
                                <SelectItem value="july">July</SelectItem>
                                <SelectItem value="october">October</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-[#6F83A7] mb-2">Business License</Label>
                            <Input 
                              defaultValue="BL-987654321"
                              className="bg-white/5 border-white/10 text-white focus:border-[#57ACAF]"
                            />
                          </div>
                          <div className="col-span-2">
                            <Label className="text-[#6F83A7] mb-2">Website</Label>
                            <div className="relative">
                              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6F83A7]" />
                              <Input 
                                defaultValue="https://www.fabricxai.com"
                                className="bg-white/5 border-white/10 text-white pl-10 focus:border-[#57ACAF]"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end mt-8">
                      <Button 
                        className="bg-gradient-to-r from-[#57ACAF] to-[#57ACAF]/80 hover:from-[#57ACAF]/90 hover:to-[#57ACAF]/70 text-white shadow-lg shadow-[#57ACAF]/20"
                        onClick={() => toast.success('Company information updated!')}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  </div>

                  {/* Brand Assets */}
                  <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-8">
                    <h3 className="text-white mb-4">Brand Assets</h3>
                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <Label className="text-[#6F83A7] mb-3">Company Logo</Label>
                        <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-[#57ACAF]/50 transition-colors duration-180 cursor-pointer group">
                          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#57ACAF]/20 to-[#EAB308]/20 flex items-center justify-center mx-auto mb-3">
                            <Upload className="w-8 h-8 text-[#57ACAF] group-hover:scale-110 transition-transform" />
                          </div>
                          <p className="text-white mb-1">Upload Logo</p>
                          <p className="text-xs text-[#6F83A7]">PNG, SVG up to 5MB</p>
                        </div>
                      </div>
                      <div>
                        <Label className="text-[#6F83A7] mb-3">Favicon</Label>
                        <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-[#57ACAF]/50 transition-colors duration-180 cursor-pointer group">
                          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#EAB308]/20 to-[#57ACAF]/20 flex items-center justify-center mx-auto mb-3">
                            <Upload className="w-8 h-8 text-[#EAB308] group-hover:scale-110 transition-transform" />
                          </div>
                          <p className="text-white mb-1">Upload Favicon</p>
                          <p className="text-xs text-[#6F83A7]">ICO, PNG 32x32px</p>
                        </div>
                      </div>
                      <div>
                        <Label className="text-[#6F83A7] mb-3">Email Header</Label>
                        <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-[#57ACAF]/50 transition-colors duration-180 cursor-pointer group">
                          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#6F83A7]/20 to-[#57ACAF]/20 flex items-center justify-center mx-auto mb-3">
                            <Upload className="w-8 h-8 text-[#6F83A7] group-hover:scale-110 transition-transform" />
                          </div>
                          <p className="text-white mb-1">Upload Banner</p>
                          <p className="text-xs text-[#6F83A7]">JPG, PNG 600x200px</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Banking Details */}
                  <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-8">
                    <h3 className="text-white mb-6">Banking Information</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <Label className="text-[#6F83A7] mb-2">Bank Name</Label>
                        <Input 
                          defaultValue="Chase Bank"
                          className="bg-white/5 border-white/10 text-white focus:border-[#57ACAF]"
                        />
                      </div>
                      <div>
                        <Label className="text-[#6F83A7] mb-2">Account Holder Name</Label>
                        <Input 
                          defaultValue="FabricXAI Manufacturing Inc."
                          className="bg-white/5 border-white/10 text-white focus:border-[#57ACAF]"
                        />
                      </div>
                      <div>
                        <Label className="text-[#6F83A7] mb-2">Account Number</Label>
                        <Input 
                          type="password"
                          defaultValue="************1234"
                          className="bg-white/5 border-white/10 text-white focus:border-[#57ACAF]"
                        />
                      </div>
                      <div>
                        <Label className="text-[#6F83A7] mb-2">Routing Number</Label>
                        <Input 
                          defaultValue="021000021"
                          className="bg-white/5 border-white/10 text-white focus:border-[#57ACAF]"
                        />
                      </div>
                      <div>
                        <Label className="text-[#6F83A7] mb-2">SWIFT/BIC Code</Label>
                        <Input 
                          defaultValue="CHASUS33"
                          className="bg-white/5 border-white/10 text-white focus:border-[#57ACAF]"
                        />
                      </div>
                      <div>
                        <Label className="text-[#6F83A7] mb-2">Currency</Label>
                        <Select defaultValue="usd">
                          <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-[#57ACAF]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1a2332] border-white/10">
                            <SelectItem value="usd">USD ($)</SelectItem>
                            <SelectItem value="eur">EUR (€)</SelectItem>
                            <SelectItem value="gbp">GBP (£)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  {/* Security Score */}
                  <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-white mb-2">Security Score</h3>
                        <p className="text-sm text-[#6F83A7]">Your account security health</p>
                      </div>
                      <div className="text-right">
                        <div className="text-4xl text-[#EAB308] font-bold">72%</div>
                        <p className="text-sm text-[#6F83A7]">Good</p>
                      </div>
                    </div>
                    <Progress value={72} className="h-3 mb-6" />
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg bg-[#57ACAF]/10 border border-[#57ACAF]/20">
                        <CheckCircle className="w-5 h-5 text-[#57ACAF] mb-2" />
                        <div className="text-white mb-1 text-sm">Strong Password</div>
                        <div className="text-xs text-[#6F83A7]">Last changed 30 days ago</div>
                      </div>
                      <div className="p-4 rounded-lg bg-[#D0342C]/10 border border-[#D0342C]/20">
                        <AlertTriangle className="w-5 h-5 text-[#D0342C] mb-2" />
                        <div className="text-white mb-1 text-sm">2FA Disabled</div>
                        <div className="text-xs text-[#6F83A7]">Enable for better security</div>
                      </div>
                      <div className="p-4 rounded-lg bg-[#57ACAF]/10 border border-[#57ACAF]/20">
                        <CheckCircle className="w-5 h-5 text-[#57ACAF] mb-2" />
                        <div className="text-white mb-1 text-sm">Email Verified</div>
                        <div className="text-xs text-[#6F83A7]">Verified on Jan 15, 2024</div>
                      </div>
                    </div>
                  </div>

                  {/* Password Change */}
                  <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#57ACAF] to-[#57ACAF]/60 flex items-center justify-center">
                        <Lock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl text-white">Change Password</h3>
                        <p className="text-sm text-[#6F83A7]">Ensure your account stays secure</p>
                      </div>
                    </div>

                    <div className="space-y-4 max-w-xl">
                      <div>
                        <Label className="text-[#6F83A7] mb-2">Current Password</Label>
                        <div className="relative">
                          <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6F83A7]" />
                          <Input 
                            type={showPassword ? "text" : "password"}
                            className="bg-white/5 border-white/10 text-white pl-10 pr-10 focus:border-[#57ACAF]"
                          />
                          <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6F83A7] hover:text-white transition-colors"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <Label className="text-[#6F83A7] mb-2">New Password</Label>
                        <div className="relative">
                          <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6F83A7]" />
                          <Input 
                            type={showPassword ? "text" : "password"}
                            className="bg-white/5 border-white/10 text-white pl-10 focus:border-[#57ACAF]"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-[#6F83A7] mb-2">Confirm New Password</Label>
                        <div className="relative">
                          <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6F83A7]" />
                          <Input 
                            type={showPassword ? "text" : "password"}
                            className="bg-white/5 border-white/10 text-white pl-10 focus:border-[#57ACAF]"
                          />
                        </div>
                      </div>

                      {/* Password Strength */}
                      <div className="bg-[#57ACAF]/10 border border-[#57ACAF]/20 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="w-4 h-4 text-[#57ACAF]" />
                          <span className="text-sm text-white font-medium">Strong password</span>
                        </div>
                        <ul className="space-y-1 ml-6">
                          <li className="text-xs text-[#6F83A7] flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-[#57ACAF]" />
                            At least 8 characters
                          </li>
                          <li className="text-xs text-[#6F83A7] flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-[#57ACAF]" />
                            Contains uppercase and lowercase
                          </li>
                          <li className="text-xs text-[#6F83A7] flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-[#57ACAF]" />
                            Contains numbers and special characters
                          </li>
                        </ul>
                      </div>

                      <Button 
                        className="bg-gradient-to-r from-[#57ACAF] to-[#57ACAF]/80 hover:from-[#57ACAF]/90 hover:to-[#57ACAF]/70 text-white shadow-lg shadow-[#57ACAF]/20 w-full"
                        onClick={() => toast.success('Password updated successfully!')}
                      >
                        <Lock className="w-4 h-4 mr-2" />
                        Update Password
                      </Button>
                    </div>
                  </div>

                  {/* Two-Factor Authentication */}
                  <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-8">
                    <h3 className="text-white mb-6">Two-Factor Authentication</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-5 rounded-xl bg-gradient-to-br from-[#EAB308]/10 to-[#EAB308]/5 border border-[#EAB308]/20">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-[#EAB308]/20 flex items-center justify-center">
                            <Smartphone className="w-6 h-6 text-[#EAB308]" />
                          </div>
                          <div>
                            <div className="text-white mb-1 font-medium">Authenticator App</div>
                            <div className="text-sm text-[#6F83A7]">Use an app like Google Authenticator or Authy</div>
                          </div>
                        </div>
                        <Switch 
                          checked={twoFactorEnabled}
                          onCheckedChange={setTwoFactorEnabled}
                        />
                      </div>

                      {twoFactorEnabled && (
                        <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-white mb-1">Backup Codes</div>
                              <div className="text-sm text-[#6F83A7]">Save these codes in a secure location</div>
                            </div>
                            <Button size="sm" variant="outline" className="border-white/10">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            {['A5F3-9K2L', 'B8H4-3N7M', 'C2P9-6T1R', 'D7W5-4Q8S'].map((code, i) => (
                              <div key={i} className="p-3 rounded-lg bg-black/30 border border-white/10">
                                <code className="text-[#57ACAF] font-mono">{code}</code>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between p-5 rounded-xl bg-white/5 border border-white/10">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-[#6F83A7]/20 flex items-center justify-center">
                            <Mail className="w-6 h-6 text-[#6F83A7]" />
                          </div>
                          <div>
                            <div className="text-white mb-1 font-medium">Email Verification</div>
                            <div className="text-sm text-[#6F83A7]">Receive codes via email</div>
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  {/* Active Sessions */}
                  <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-white">Active Sessions</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#D0342C]/30 text-[#D0342C] hover:bg-[#D0342C]/10"
                      >
                        <Ban className="w-4 h-4 mr-2" />
                        Revoke All
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {[
                        { device: 'Chrome on Windows', location: 'New York, USA', lastActive: '2 minutes ago', current: true, icon: Monitor, ip: '192.168.1.100' },
                        { device: 'Safari on MacBook', location: 'New York, USA', lastActive: '2 hours ago', current: false, icon: Monitor, ip: '192.168.1.101' },
                        { device: 'Mobile App - iPhone', location: 'New York, USA', lastActive: '1 day ago', current: false, icon: Smartphone, ip: '192.168.1.102' },
                      ].map((session, index) => {
                        const Icon = session.icon;
                        return (
                          <div key={index} className="flex items-center justify-between p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-180 group">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-lg bg-[#57ACAF]/10 flex items-center justify-center">
                                <Icon className="w-5 h-5 text-[#57ACAF]" />
                              </div>
                              <div>
                                <div className="text-white mb-1 flex items-center gap-2">
                                  {session.device}
                                  {session.current && (
                                    <Badge className="bg-[#57ACAF]/20 text-[#57ACAF] border-0">Current</Badge>
                                  )}
                                </div>
                                <div className="text-sm text-[#6F83A7]">{session.location} • {session.lastActive}</div>
                                <div className="text-xs text-[#6F83A7] font-mono mt-1">{session.ip}</div>
                              </div>
                            </div>
                            {!session.current && (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="border-white/10 text-[#D0342C] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#D0342C]/10"
                              >
                                Revoke
                              </Button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* API Keys */}
                  <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-white mb-1">API Keys</h3>
                        <p className="text-sm text-[#6F83A7]">Manage your API access keys</p>
                      </div>
                      <Button
                        className="bg-gradient-to-r from-[#EAB308] to-[#EAB308]/80 hover:from-[#EAB308]/90 hover:to-[#EAB308]/70 text-black"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Generate New Key
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {[
                        { name: 'Production API Key', created: 'Jan 15, 2025', lastUsed: '2 hours ago', status: 'active', requests: '24.5K' },
                        { name: 'Development API Key', created: 'Dec 20, 2024', lastUsed: '1 day ago', status: 'active', requests: '8.2K' },
                        { name: 'Test API Key', created: 'Nov 10, 2024', lastUsed: 'Never', status: 'inactive', requests: '0' },
                      ].map((key, index) => (
                        <div key={index} className="flex items-center justify-between p-5 rounded-xl bg-white/5 border border-white/10">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="text-white font-medium">{key.name}</div>
                              <Badge className={key.status === 'active' ? 'bg-[#57ACAF]/20 text-[#57ACAF] border-0' : 'bg-[#6F83A7]/20 text-[#6F83A7] border-0'}>
                                {key.status}
                              </Badge>
                            </div>
                            <div className="text-sm text-[#6F83A7] mb-2">
                              Created: {key.created} • Last used: {key.lastUsed} • {key.requests} requests
                            </div>
                            <div className="text-xs text-[#6F83A7] font-mono bg-black/30 px-3 py-1.5 rounded inline-block">
                              sk_prod_********************************
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" className="border-white/10 text-white hover:bg-white/5">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="border-white/10 text-[#D0342C] hover:bg-[#D0342C]/10">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#EAB308] to-[#EAB308]/60 flex items-center justify-center">
                        <Bell className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl text-white">Email Notifications</h3>
                        <p className="text-sm text-[#6F83A7]">Choose what you want to be notified about</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {[
                        { label: 'New Lead Notifications', description: 'Get notified when new leads are added to CRM', icon: Users, enabled: true, module: 'CRM' },
                        { label: 'RFQ Updates', description: 'Updates on RFQ status changes and new quotes', icon: FileText, enabled: true, module: 'RFQ' },
                        { label: 'Production Alerts', description: 'Production status changes and delays', icon: Factory, enabled: true, module: 'Production' },
                        { label: 'Quality Alerts', description: 'Failed inspections and quality issues', icon: CheckSquare, enabled: true, module: 'Quality' },
                        { label: 'Shipment Updates', description: 'Shipment status and tracking updates', icon: Truck, enabled: false, module: 'Shipment' },
                        { label: 'Invoice Reminders', description: 'Payment reminders and overdue invoices', icon: DollarSign, enabled: false, module: 'Finance' },
                        { label: 'System Updates', description: 'Important system announcements and updates', icon: Sparkles, enabled: true, module: 'System' },
                        { label: 'Machine Maintenance', description: 'Maintenance schedules and alerts', icon: SettingsIcon, enabled: true, module: 'Maintenance' },
                      ].map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <div key={index} className="flex items-center justify-between p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-180 group">
                            <div className="flex items-center gap-4 flex-1">
                              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#57ACAF]/20 to-[#EAB308]/20 flex items-center justify-center">
                                <Icon className="w-5 h-5 text-[#57ACAF]" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-white font-medium">{item.label}</span>
                                  <Badge className="bg-[#6F83A7]/20 text-[#6F83A7] border-0 text-xs">
                                    {item.module}
                                  </Badge>
                                </div>
                                <div className="text-sm text-[#6F83A7]">{item.description}</div>
                              </div>
                            </div>
                            <Switch defaultChecked={item.enabled} />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-8">
                      <h3 className="text-white mb-6">Push Notifications</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                          <div>
                            <div className="text-white mb-1">Browser Notifications</div>
                            <div className="text-sm text-[#6F83A7]">Receive in-browser alerts</div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                          <div>
                            <div className="text-white mb-1">Desktop Notifications</div>
                            <div className="text-sm text-[#6F83A7]">Get desktop alerts</div>
                          </div>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                          <div>
                            <div className="text-white mb-1">Mobile Push</div>
                            <div className="text-sm text-[#6F83A7]">Mobile app notifications</div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-8">
                      <h3 className="text-white mb-6">Notification Schedule</h3>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-[#6F83A7] mb-2">Quiet Hours</Label>
                          <Select defaultValue="evening">
                            <SelectTrigger className="bg-white/5 border-white/10 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1a2332] border-white/10">
                              <SelectItem value="none">No quiet hours</SelectItem>
                              <SelectItem value="evening">Evening (6PM - 8AM)</SelectItem>
                              <SelectItem value="night">Night (10PM - 6AM)</SelectItem>
                              <SelectItem value="custom">Custom</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-[#6F83A7] mb-2">Digest Frequency</Label>
                          <Select defaultValue="daily">
                            <SelectTrigger className="bg-white/5 border-white/10 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1a2332] border-white/10">
                              <SelectItem value="realtime">Real-time</SelectItem>
                              <SelectItem value="hourly">Hourly</SelectItem>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-[#6F83A7] mb-2">Notification Sound</Label>
                          <Select defaultValue="default">
                            <SelectTrigger className="bg-white/5 border-white/10 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1a2332] border-white/10">
                              <SelectItem value="default">Default</SelectItem>
                              <SelectItem value="chime">Chime</SelectItem>
                              <SelectItem value="ping">Ping</SelectItem>
                              <SelectItem value="none">None</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#57ACAF] to-[#57ACAF]/60 flex items-center justify-center">
                        <Globe className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl text-white">Regional Settings</h3>
                        <p className="text-sm text-[#6F83A7]">Customize your regional preferences</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <Label className="text-[#6F83A7] mb-2">Language</Label>
                        <Select defaultValue="en">
                          <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-[#57ACAF]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1a2332] border-white/10">
                            <SelectItem value="en">English (US)</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                            <SelectItem value="zh">Chinese</SelectItem>
                            <SelectItem value="bn">Bengali</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-[#6F83A7] mb-2">Timezone</Label>
                        <Select defaultValue="est">
                          <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-[#57ACAF]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1a2332] border-white/10">
                            <SelectItem value="est">EST (GMT-5)</SelectItem>
                            <SelectItem value="pst">PST (GMT-8)</SelectItem>
                            <SelectItem value="gmt">GMT (GMT+0)</SelectItem>
                            <SelectItem value="cet">CET (GMT+1)</SelectItem>
                            <SelectItem value="ist">IST (GMT+5:30)</SelectItem>
                            <SelectItem value="bst">BST (GMT+6)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-[#6F83A7] mb-2">Currency</Label>
                        <Select defaultValue="usd">
                          <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-[#57ACAF]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1a2332] border-white/10">
                            <SelectItem value="usd">USD ($)</SelectItem>
                            <SelectItem value="eur">EUR (€)</SelectItem>
                            <SelectItem value="gbp">GBP (£)</SelectItem>
                            <SelectItem value="jpy">JPY (¥)</SelectItem>
                            <SelectItem value="bdt">BDT (৳)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-[#6F83A7] mb-2">Date Format</Label>
                        <Select defaultValue="mdy">
                          <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-[#57ACAF]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1a2332] border-white/10">
                            <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                            <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                            <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-[#6F83A7] mb-2">Time Format</Label>
                        <Select defaultValue="12h">
                          <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-[#57ACAF]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1a2332] border-white/10">
                            <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                            <SelectItem value="24h">24-hour</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-[#6F83A7] mb-2">Number Format</Label>
                        <Select defaultValue="comma">
                          <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-[#57ACAF]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1a2332] border-white/10">
                            <SelectItem value="comma">1,234.56</SelectItem>
                            <SelectItem value="period">1.234,56</SelectItem>
                            <SelectItem value="space">1 234.56</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-8">
                    <h3 className="text-white mb-6">Display Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-5 rounded-xl bg-white/5">
                        <div>
                          <div className="text-white mb-1 font-medium">Dark Mode</div>
                          <div className="text-sm text-[#6F83A7]">Use dark theme across the application</div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-5 rounded-xl bg-white/5">
                        <div>
                          <div className="text-white mb-1 font-medium">Compact View</div>
                          <div className="text-sm text-[#6F83A7]">Show more content on screen</div>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between p-5 rounded-xl bg-white/5">
                        <div>
                          <div className="text-white mb-1 font-medium">Smooth Animations</div>
                          <div className="text-sm text-[#6F83A7]">Enable transitions and effects</div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-5 rounded-xl bg-white/5">
                        <div>
                          <div className="text-white mb-1 font-medium">Auto-save Changes</div>
                          <div className="text-sm text-[#6F83A7]">Automatically save form data</div>
                        </div>
                        <Switch 
                          checked={autoSave}
                          onCheckedChange={setAutoSave}
                        />
                      </div>
                      <div className="flex items-center justify-between p-5 rounded-xl bg-white/5">
                        <div>
                          <div className="text-white mb-1 font-medium">Show Tooltips</div>
                          <div className="text-sm text-[#6F83A7]">Display helpful hints and tips</div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-8">
                    <h3 className="text-white mb-6">Dashboard Preferences</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <Label className="text-[#6F83A7] mb-2">Default Dashboard View</Label>
                        <Select defaultValue="overview">
                          <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-[#57ACAF]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1a2332] border-white/10">
                            <SelectItem value="overview">Overview</SelectItem>
                            <SelectItem value="sales">Sales Dashboard</SelectItem>
                            <SelectItem value="production">Production Dashboard</SelectItem>
                            <SelectItem value="finance">Finance Dashboard</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-[#6F83A7] mb-2">Items Per Page</Label>
                        <Select defaultValue="25">
                          <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-[#57ACAF]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1a2332] border-white/10">
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-[#6F83A7] mb-2">Export Format</Label>
                        <Select defaultValue="xlsx">
                          <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-[#57ACAF]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1a2332] border-white/10">
                            <SelectItem value="xlsx">Excel (.xlsx)</SelectItem>
                            <SelectItem value="csv">CSV (.csv)</SelectItem>
                            <SelectItem value="pdf">PDF (.pdf)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-[#6F83A7] mb-2">Chart Type</Label>
                        <Select defaultValue="line">
                          <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-[#57ACAF]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1a2332] border-white/10">
                            <SelectItem value="line">Line Chart</SelectItem>
                            <SelectItem value="bar">Bar Chart</SelectItem>
                            <SelectItem value="area">Area Chart</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Integrations Tab */}
              {activeTab === 'integrations' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-xl text-white">Connected Integrations</h3>
                        <p className="text-sm text-[#6F83A7]">Manage third-party app connections</p>
                      </div>
                      <Button
                        className="bg-gradient-to-r from-[#57ACAF] to-[#57ACAF]/80 hover:from-[#57ACAF]/90 hover:to-[#57ACAF]/70 text-white"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Integration
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {integrations.map((integration, index) => (
                        <div key={index} className="p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-[#57ACAF]/30 transition-all duration-180">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl">
                                {integration.icon}
                              </div>
                              <div>
                                <div className="text-white font-medium mb-1">{integration.name}</div>
                                <div className="text-sm text-[#6F83A7]">{integration.description}</div>
                              </div>
                            </div>
                            <Badge className={integration.connected ? 'bg-[#57ACAF]/20 text-[#57ACAF] border-0' : 'bg-[#6F83A7]/20 text-[#6F83A7] border-0'}>
                              {integration.connected ? 'Connected' : 'Not Connected'}
                            </Badge>
                          </div>
                          {integration.connected && integration.lastSync && (
                            <div className="text-xs text-[#6F83A7] mb-4">
                              Last synced: {integration.lastSync}
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            {integration.connected ? (
                              <>
                                <Button size="sm" variant="outline" className="flex-1 border-white/10 text-white hover:bg-white/5 bg-[rgba(255,255,255,0)]">
                                  <SettingsIcon className="w-4 h-4 mr-2" />
                                  Configure
                                </Button>
                                <Button size="sm" variant="outline" className="border-[#D0342C]/30 text-[#D0342C] hover:bg-[#D0342C]/10">
                                  Disconnect
                                </Button>
                              </>
                            ) : (
                              <Button size="sm" className="flex-1 bg-gradient-to-r from-[#57ACAF] to-[#57ACAF]/80 text-white">
                                Connect
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Webhooks */}
                  <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#EAB308]/20 flex items-center justify-center">
                          <Webhook className="w-5 h-5 text-[#EAB308]" />
                        </div>
                        <div>
                          <h3 className="text-white">Webhooks</h3>
                          <p className="text-sm text-[#6F83A7]">Configure webhook endpoints</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-[#EAB308] to-[#EAB308]/80 text-black"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Webhook
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {[
                        { url: 'https://api.myapp.com/webhooks/rfq', event: 'rfq.created', status: 'active' },
                        { url: 'https://api.myapp.com/webhooks/order', event: 'order.completed', status: 'active' },
                      ].map((webhook, index) => (
                        <div key={index} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <code className="text-[#57ACAF] text-sm font-mono">{webhook.event}</code>
                              <Badge className="bg-[#57ACAF]/20 text-[#57ACAF] border-0 text-xs">
                                {webhook.status}
                              </Badge>
                            </div>
                            <div className="text-sm text-[#6F83A7] font-mono">{webhook.url}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" className="border-white/10 text-white hover:bg-white/5 bg-[rgba(255,255,255,0)]">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="border-white/10 text-[#D0342C] hover:bg-[#D0342C]/10">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* API Documentation */}
                  <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-8">
                    <h3 className="text-white mb-4">Developer Resources</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <Button
                        variant="outline"
                        className="h-auto py-4 flex-col gap-2 border-white/10 text-white hover:bg-white/5 bg-[rgba(255,255,255,0)]"
                      >
                        <FileCode className="w-5 h-5 text-[#57ACAF]" />
                        <div className="text-center">
                          <div className="font-medium">API Docs</div>
                          <div className="text-xs text-[#6F83A7]">View documentation</div>
                        </div>
                      </Button>
                      <Button
                        variant="outline"
                        className="h-auto py-4 flex-col gap-2 border-white/10 text-white hover:bg-white/5 bg-[rgba(255,255,255,0)]"
                      >
                        <Code className="w-5 h-5 text-[#EAB308]" />
                        <div className="text-center">
                          <div className="font-medium">SDK</div>
                          <div className="text-xs text-[#6F83A7]">Download libraries</div>
                        </div>
                      </Button>
                      <Button
                        variant="outline"
                        className="h-auto py-4 flex-col gap-2 border-white/10 text-white hover:bg-white/5 bg-[rgba(255,255,255,0)]"
                      >
                        <BookOpen className="w-5 h-5 text-[#6F83A7]" />
                        <div className="text-center">
                          <div className="font-medium">Guides</div>
                          <div className="text-xs text-[#6F83A7]">Integration tutorials</div>
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Billing Tab */}
              {activeTab === 'billing' && (
                <div className="space-y-6">
                  {/* Current Plan */}
                  <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl text-white">Enterprise Plan</h3>
                          <Badge className="bg-gradient-to-r from-[#EAB308] to-[#EAB308]/80 text-black border-0">
                            <Crown className="w-3 h-3 mr-1" />
                            Current Plan
                          </Badge>
                        </div>
                        <p className="text-[#6F83A7]">All features unlocked • Unlimited users • Priority support</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl text-white font-bold">$1,299</div>
                        <p className="text-sm text-[#6F83A7]">per month</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-6">
                      <div className="p-4 rounded-xl bg-gradient-to-br from-[#57ACAF]/10 to-[#57ACAF]/5 border border-[#57ACAF]/20">
                        <div className="text-2xl text-white font-bold mb-1">Unlimited</div>
                        <div className="text-sm text-[#6F83A7]">Users</div>
                      </div>
                      <div className="p-4 rounded-xl bg-gradient-to-br from-[#EAB308]/10 to-[#EAB308]/5 border border-[#EAB308]/20">
                        <div className="text-2xl text-white font-bold mb-1">14/14</div>
                        <div className="text-sm text-[#6F83A7]">Modules Active</div>
                      </div>
                      <div className="p-4 rounded-xl bg-gradient-to-br from-[#6F83A7]/10 to-[#6F83A7]/5 border border-[#6F83A7]/20">
                        <div className="text-2xl text-white font-bold mb-1">100GB</div>
                        <div className="text-sm text-[#6F83A7]">Storage</div>
                      </div>
                      <div className="p-4 rounded-xl bg-gradient-to-br from-[#57ACAF]/10 to-[#EAB308]/5 border border-[#57ACAF]/20">
                        <div className="text-2xl text-white font-bold mb-1">24/7</div>
                        <div className="text-sm text-[#6F83A7]">Support</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/5 bg-[rgba(255,255,255,0.01)]"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Plans
                      </Button>
                      <Button
                        className="bg-gradient-to-r from-[#57ACAF] to-[#57ACAF]/80 text-white"
                      >
                        <ArrowUpRight className="w-4 h-4 mr-2" />
                        Upgrade Plan
                      </Button>
                    </div>
                  </div>

                  {/* Usage Stats */}
                  <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-8">
                    <h3 className="text-white mb-6">Usage This Month</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[#6F83A7]">Storage Used</span>
                          <span className="text-white">45.2 GB / 100 GB</span>
                        </div>
                        <Progress value={45} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[#6F83A7]">API Requests</span>
                          <span className="text-white">247K / Unlimited</span>
                        </div>
                        <Progress value={15} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[#6F83A7]">Active Users</span>
                          <span className="text-white">39 / Unlimited</span>
                        </div>
                        <Progress value={10} className="h-2" />
                      </div>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-white">Payment Methods</h3>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-[#EAB308] to-[#EAB308]/80 text-black"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Method
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {[
                        { type: 'Visa', last4: '4242', expiry: '12/25', default: true },
                        { type: 'Mastercard', last4: '8888', expiry: '08/26', default: false },
                      ].map((card, index) => (
                        <div key={index} className="flex items-center justify-between p-5 rounded-xl bg-white/5 border border-white/10">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#EAB308]/20 to-[#57ACAF]/20 flex items-center justify-center">
                              <CreditCard className="w-6 h-6 text-[#EAB308]" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-white">{card.type} •••• {card.last4}</span>
                                {card.default && (
                                  <Badge className="bg-[#57ACAF]/20 text-[#57ACAF] border-0">Default</Badge>
                                )}
                              </div>
                              <div className="text-sm text-[#6F83A7]">Expires {card.expiry}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" className="border-white/10 text-white hover:bg-white/5 bg-[rgba(255,255,255,0)]">
                              Edit
                            </Button>
                            <Button size="sm" variant="outline" className="border-white/10 text-[#D0342C] hover:bg-[#D0342C]/10">
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Billing History */}
                  <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-white">Billing History</h3>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/10 text-white hover:bg-white/5 bg-[rgba(255,255,255,0)]"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download All
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {[
                        { date: 'Jan 1, 2025', amount: '$1,299.00', status: 'Paid', invoice: 'INV-2025-001' },
                        { date: 'Dec 1, 2024', amount: '$1,299.00', status: 'Paid', invoice: 'INV-2024-012' },
                        { date: 'Nov 1, 2024', amount: '$1,299.00', status: 'Paid', invoice: 'INV-2024-011' },
                        { date: 'Oct 1, 2024', amount: '$1,299.00', status: 'Paid', invoice: 'INV-2024-010' },
                      ].map((invoice, index) => (
                        <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-180 group">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-[#57ACAF]/10 flex items-center justify-center">
                              <Receipt className="w-5 h-5 text-[#57ACAF]" />
                            </div>
                            <div>
                              <div className="text-white mb-1">{invoice.invoice}</div>
                              <div className="text-sm text-[#6F83A7]">{invoice.date}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="text-white font-medium">{invoice.amount}</div>
                              <Badge className="bg-[#57ACAF]/20 text-[#57ACAF] border-0">{invoice.status}</Badge>
                            </div>
                            <Button size="sm" variant="outline" className="border-white/10 text-white hover:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Modules Tab */}
              {activeTab === 'modules' && (
                <div className="space-y-6">
                  {/* AI Recommendation - Module Optimization */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-[#EAB308]/10 to-[#57ACAF]/10 border border-[#EAB308]/20 rounded-xl p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#EAB308]/20 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-6 h-6 text-[#EAB308]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-white font-medium">AI Module Optimization Insights</span>
                          <Badge className="bg-[#57ACAF]/20 text-[#57ACAF] border-0">3 Recommendations</Badge>
                        </div>
                        <p className="text-sm text-[#6F83A7] mb-4">
                          Enable Supplier Evaluation module to improve procurement efficiency by 35%. Your Quality Control data shows 42% of issues relate to material quality, suggesting supplier management could reduce defects.
                        </p>
                        <div className="flex items-center gap-3">
                          <Button
                            size="sm"
                            className="bg-[#EAB308]/20 hover:bg-[#EAB308]/30 text-[#EAB308] border border-[#EAB308]/20"
                          >
                            View All Insights
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-[#6F83A7] hover:text-white"
                          >
                            Dismiss
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Module Overview Stats */}
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-gradient-to-br from-[#57ACAF]/10 to-[#57ACAF]/5 border border-[#57ACAF]/20 rounded-xl p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg bg-[#57ACAF]/20 flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-[#57ACAF]" />
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-[#57ACAF]" />
                      </div>
                      <div className="text-2xl text-white font-bold mb-1">13/14</div>
                      <div className="text-sm text-[#6F83A7]">Active Modules</div>
                      <div className="mt-2">
                        <Progress value={93} className="h-1.5" />
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-[#EAB308]/10 to-[#EAB308]/5 border border-[#EAB308]/20 rounded-xl p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg bg-[#EAB308]/20 flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-[#EAB308]" />
                        </div>
                        <span className="text-[#EAB308] text-sm">+12.5%</span>
                      </div>
                      <div className="text-2xl text-white font-bold mb-1">7.2K</div>
                      <div className="text-sm text-[#6F83A7]">Total Records</div>
                      <div className="text-xs text-[#EAB308] mt-2">↑ 854 this month</div>
                    </div>

                    <div className="bg-gradient-to-br from-[#6F83A7]/10 to-[#6F83A7]/5 border border-[#6F83A7]/20 rounded-xl p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg bg-[#6F83A7]/20 flex items-center justify-center">
                          <Activity className="w-5 h-5 text-[#6F83A7]" />
                        </div>
                        <span className="text-[#6F83A7] text-sm">+8.3%</span>
                      </div>
                      <div className="text-2xl text-white font-bold mb-1">1,847</div>
                      <div className="text-sm text-[#6F83A7]">Daily Actions</div>
                      <div className="text-xs text-[#6F83A7] mt-2">Across all modules</div>
                    </div>

                    <div className="bg-gradient-to-br from-[#57ACAF]/10 to-[#EAB308]/5 border border-[#57ACAF]/20 rounded-xl p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg bg-[#EAB308]/20 flex items-center justify-center">
                          <Users className="w-5 h-5 text-[#EAB308]" />
                        </div>
                        <span className="text-[#57ACAF] text-sm">39 active</span>
                      </div>
                      <div className="text-2xl text-white font-bold mb-1">100%</div>
                      <div className="text-sm text-[#6F83A7]">User Adoption</div>
                      <div className="text-xs text-[#57ACAF] mt-2">All users engaged</div>
                    </div>
                  </div>

                  {/* Module Categories */}
                  <div className="space-y-6">
                    {/* CRM & Sales */}
                    <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#57ACAF]/20 to-[#EAB308]/20 flex items-center justify-center">
                          <Users className="w-5 h-5 text-[#57ACAF]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-medium">CRM & Sales</h3>
                          <p className="text-sm text-[#6F83A7]">Customer relationship and sales management</p>
                        </div>
                        <Badge className="bg-[#57ACAF]/20 text-[#57ACAF] border-0">4 Modules</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {modules.filter(m => ['lead-management', 'buyer-management', 'rfq-quotation', 'costing'].includes(m.id)).map((module) => {
                          const Icon = module.icon;
                          return (
                            <div key={module.id} className="group p-5 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-[#57ACAF]/30 transition-all duration-180">
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3 flex-1">
                                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#57ACAF]/20 to-[#EAB308]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Icon className="w-6 h-6 text-[#57ACAF]" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="text-white font-medium">{module.name}</span>
                                      {module.enabled && (
                                        <CheckCircle className="w-4 h-4 text-[#57ACAF]" />
                                      )}
                                    </div>
                                    <div className="text-xs text-[#6F83A7] mb-2">{module.license}</div>
                                  </div>
                                </div>
                                <Switch checked={module.enabled} />
                              </div>

                              <Separator className="bg-white/10 mb-4" />

                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-[#6F83A7]">Records</span>
                                  <span className="text-sm text-white font-medium">{module.usage.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-[#6F83A7]">Health Score</span>
                                  <div className="flex items-center gap-2">
                                    <Progress value={Math.random() * 30 + 70} className="h-1.5 w-16" />
                                    <span className="text-sm text-[#57ACAF] font-medium">{Math.floor(Math.random() * 30 + 70)}%</span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 mt-4">
                                <Button size="sm" variant="outline" className="flex-1 border-white/10 text-white hover:bg-white/5 text-xs bg-[rgba(255,255,255,0)]">
                                  <SettingsIcon className="w-3 h-3 mr-1" />
                                  Configure
                                </Button>
                                <Button size="sm" variant="outline" className="flex-1 border-white/10 text-white hover:bg-white/5 text-xs bg-[rgba(255,255,255,0)]">
                                  <BarChart3 className="w-3 h-3 mr-1" />
                                  Analytics
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Production & Operations */}
                    <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#EAB308]/20 to-[#57ACAF]/20 flex items-center justify-center">
                          <Factory className="w-5 h-5 text-[#EAB308]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-medium">Production & Operations</h3>
                          <p className="text-sm text-[#6F83A7]">Manufacturing and quality management</p>
                        </div>
                        <Badge className="bg-[#EAB308]/20 text-[#EAB308] border-0">4 Modules</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {modules.filter(m => ['production-planning', 'quality-control', 'machine-maintenance', 'workforce-management'].includes(m.id)).map((module) => {
                          const Icon = module.icon;
                          return (
                            <div key={module.id} className="group p-5 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-[#EAB308]/30 transition-all duration-180">
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3 flex-1">
                                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#EAB308]/20 to-[#57ACAF]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Icon className="w-6 h-6 text-[#EAB308]" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="text-white font-medium">{module.name}</span>
                                      {module.enabled && (
                                        <CheckCircle className="w-4 h-4 text-[#57ACAF]" />
                                      )}
                                    </div>
                                    <div className="text-xs text-[#6F83A7] mb-2">{module.license}</div>
                                  </div>
                                </div>
                                <Switch checked={module.enabled} />
                              </div>

                              <Separator className="bg-white/10 mb-4" />

                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-[#6F83A7]">Records</span>
                                  <span className="text-sm text-white font-medium">{module.usage.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-[#6F83A7]">Health Score</span>
                                  <div className="flex items-center gap-2">
                                    <Progress value={Math.random() * 30 + 70} className="h-1.5 w-16" />
                                    <span className="text-sm text-[#57ACAF] font-medium">{Math.floor(Math.random() * 30 + 70)}%</span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 mt-4">
                                <Button size="sm" variant="outline" className="flex-1 border-white/10 text-white hover:bg-white/5 text-xs">
                                  <SettingsIcon className="w-3 h-3 mr-1" />
                                  Configure
                                </Button>
                                <Button size="sm" variant="outline" className="flex-1 border-white/10 text-white hover:bg-white/5 text-xs">
                                  <BarChart3 className="w-3 h-3 mr-1" />
                                  Analytics
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Supply Chain & Logistics */}
                    <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#6F83A7]/20 to-[#57ACAF]/20 flex items-center justify-center">
                          <Truck className="w-5 h-5 text-[#6F83A7]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-medium">Supply Chain & Logistics</h3>
                          <p className="text-sm text-[#6F83A7]">Procurement, inventory, and shipment tracking</p>
                        </div>
                        <Badge className="bg-[#6F83A7]/20 text-[#6F83A7] border-0">3 Modules</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {modules.filter(m => ['supplier-evaluation', 'inventory-management', 'shipment'].includes(m.id)).map((module) => {
                          const Icon = module.icon;
                          return (
                            <div key={module.id} className="group p-5 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-[#6F83A7]/30 transition-all duration-180">
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3 flex-1">
                                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6F83A7]/20 to-[#57ACAF]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Icon className="w-6 h-6 text-[#6F83A7]" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="text-white font-medium">{module.name}</span>
                                      {module.enabled && (
                                        <CheckCircle className="w-4 h-4 text-[#57ACAF]" />
                                      )}
                                    </div>
                                    <div className="text-xs text-[#6F83A7] mb-2">{module.license}</div>
                                  </div>
                                </div>
                                <Switch checked={module.enabled} />
                              </div>

                              <Separator className="bg-white/10 mb-4" />

                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-[#6F83A7]">Records</span>
                                  <span className="text-sm text-white font-medium">{module.usage.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-[#6F83A7]">Health Score</span>
                                  <div className="flex items-center gap-2">
                                    <Progress value={Math.random() * 30 + 70} className="h-1.5 w-16" />
                                    <span className="text-sm text-[#57ACAF] font-medium">{Math.floor(Math.random() * 30 + 70)}%</span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 mt-4">
                                <Button size="sm" variant="outline" className="flex-1 border-white/10 text-white hover:bg-white/5 text-xs">
                                  <SettingsIcon className="w-3 h-3 mr-1" />
                                  Configure
                                </Button>
                                <Button size="sm" variant="outline" className="flex-1 border-white/10 text-white hover:bg-white/5 text-xs">
                                  <BarChart3 className="w-3 h-3 mr-1" />
                                  Analytics
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Finance & Compliance */}
                    <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#57ACAF]/20 to-[#EAB308]/20 flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-[#57ACAF]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-medium">Finance & Compliance</h3>
                          <p className="text-sm text-[#6F83A7]">Financial management and regulatory compliance</p>
                        </div>
                        <Badge className="bg-[#57ACAF]/20 text-[#57ACAF] border-0">3 Modules</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {modules.filter(m => ['finance', 'compliance-policy', 'sustainability'].includes(m.id)).map((module) => {
                          const Icon = module.icon;
                          return (
                            <div key={module.id} className="group p-5 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-[#57ACAF]/30 transition-all duration-180">
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3 flex-1">
                                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#57ACAF]/20 to-[#EAB308]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Icon className="w-6 h-6 text-[#57ACAF]" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="text-white font-medium">{module.name}</span>
                                      {module.enabled && (
                                        <CheckCircle className="w-4 h-4 text-[#57ACAF]" />
                                      )}
                                    </div>
                                    <div className="text-xs text-[#6F83A7] mb-2">{module.license}</div>
                                  </div>
                                </div>
                                <Switch checked={module.enabled} />
                              </div>

                              <Separator className="bg-white/10 mb-4" />

                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-[#6F83A7]">Records</span>
                                  <span className="text-sm text-white font-medium">{module.usage.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-[#6F83A7]">Health Score</span>
                                  <div className="flex items-center gap-2">
                                    <Progress value={Math.random() * 30 + 70} className="h-1.5 w-16" />
                                    <span className="text-sm text-[#57ACAF] font-medium">{Math.floor(Math.random() * 30 + 70)}%</span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 mt-4">
                                <Button size="sm" variant="outline" className="flex-1 border-white/10 text-white hover:bg-white/5 text-xs">
                                  <SettingsIcon className="w-3 h-3 mr-1" />
                                  Configure
                                </Button>
                                <Button size="sm" variant="outline" className="flex-1 border-white/10 text-white hover:bg-white/5 text-xs">
                                  <BarChart3 className="w-3 h-3 mr-1" />
                                  Analytics
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Module Dependencies */}
                  <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-[#6F83A7]/20 flex items-center justify-center">
                        <Layers className="w-5 h-5 text-[#6F83A7]" />
                      </div>
                      <div>
                        <h3 className="text-white">Module Dependencies & Integration</h3>
                        <p className="text-sm text-[#6F83A7]">Understanding how modules work together</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-[#57ACAF]/10 flex items-center justify-center">
                            <Users className="w-4 h-4 text-[#57ACAF]" />
                          </div>
                          <span className="text-white text-sm font-medium">CRM Flow</span>
                        </div>
                        <div className="text-xs text-[#6F83A7] space-y-1">
                          <div className="flex items-center gap-2">
                            <ChevronRight className="w-3 h-3" />
                            Lead Management
                          </div>
                          <div className="flex items-center gap-2">
                            <ChevronRight className="w-3 h-3" />
                            Buyer Management
                          </div>
                          <div className="flex items-center gap-2">
                            <ChevronRight className="w-3 h-3" />
                            RFQ & Quotation
                          </div>
                          <div className="flex items-center gap-2">
                            <ChevronRight className="w-3 h-3" />
                            Costing
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-[#EAB308]/10 flex items-center justify-center">
                            <Factory className="w-4 h-4 text-[#EAB308]" />
                          </div>
                          <span className="text-white text-sm font-medium">Production Flow</span>
                        </div>
                        <div className="text-xs text-[#6F83A7] space-y-1">
                          <div className="flex items-center gap-2">
                            <ChevronRight className="w-3 h-3" />
                            Production Planning
                          </div>
                          <div className="flex items-center gap-2">
                            <ChevronRight className="w-3 h-3" />
                            Quality Control
                          </div>
                          <div className="flex items-center gap-2">
                            <ChevronRight className="w-3 h-3" />
                            Machine Maintenance
                          </div>
                          <div className="flex items-center gap-2">
                            <ChevronRight className="w-3 h-3" />
                            Workforce Mgmt
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-[#6F83A7]/10 flex items-center justify-center">
                            <Truck className="w-4 h-4 text-[#6F83A7]" />
                          </div>
                          <span className="text-white text-sm font-medium">Supply Flow</span>
                        </div>
                        <div className="text-xs text-[#6F83A7] space-y-1">
                          <div className="flex items-center gap-2">
                            <ChevronRight className="w-3 h-3" />
                            Supplier Evaluation
                          </div>
                          <div className="flex items-center gap-2">
                            <ChevronRight className="w-3 h-3" />
                            Inventory Mgmt
                          </div>
                          <div className="flex items-center gap-2">
                            <ChevronRight className="w-3 h-3" />
                            Shipment Tracking
                          </div>
                          <div className="flex items-center gap-2">
                            <ChevronRight className="w-3 h-3" />
                            Finance
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-8">
                    <h3 className="text-white mb-6">Module Management Actions</h3>
                    <div className="grid grid-cols-4 gap-4">
                      <Button
                        variant="outline"
                        className="h-auto py-4 flex-col gap-2 border-white/10 text-white hover:bg-white/5"
                      >
                        <Plus className="w-5 h-5 text-[#57ACAF]" />
                        <div className="text-center">
                          <div className="font-medium text-sm">Enable Module</div>
                          <div className="text-xs text-[#6F83A7]">Activate new module</div>
                        </div>
                      </Button>
                      <Button
                        variant="outline"
                        className="h-auto py-4 flex-col gap-2 border-white/10 text-white hover:bg-white/5"
                      >
                        <Download className="w-5 h-5 text-[#EAB308]" />
                        <div className="text-center">
                          <div className="font-medium text-sm">Export Data</div>
                          <div className="text-xs text-[#6F83A7]">Download module data</div>
                        </div>
                      </Button>
                      <Button
                        variant="outline"
                        className="h-auto py-4 flex-col gap-2 border-white/10 text-white hover:bg-white/5"
                      >
                        <RefreshCw className="w-5 h-5 text-[#6F83A7]" />
                        <div className="text-center">
                          <div className="font-medium text-sm">Sync Modules</div>
                          <div className="text-xs text-[#6F83A7]">Force data refresh</div>
                        </div>
                      </Button>
                      <Button
                        variant="outline"
                        className="h-auto py-4 flex-col gap-2 border-white/10 text-white hover:bg-white/5"
                      >
                        <BarChart3 className="w-5 h-5 text-[#57ACAF]" />
                        <div className="text-center">
                          <div className="font-medium text-sm">View Analytics</div>
                          <div className="text-xs text-[#6F83A7]">Module performance</div>
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Advanced Tab */}
              {activeTab === 'advanced' && (
                <div className="space-y-6">
                  {/* Vector Database */}
                  <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#EAB308] to-[#EAB308]/60 flex items-center justify-center">
                          <Database className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl text-white">Vector Database Management</h3>
                          <p className="text-sm text-[#6F83A7]">AI-powered semantic search and embeddings</p>
                        </div>
                      </div>
                      <Button 
                        onClick={() => setIsVectorAdminOpen(true)}
                        className="bg-gradient-to-r from-[#EAB308] to-[#EAB308]/80 hover:from-[#EAB308]/90 hover:to-[#EAB308]/70 text-black shadow-lg shadow-[#EAB308]/20"
                      >
                        <Database className="w-4 h-4 mr-2" />
                        Open Admin Panel
                      </Button>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="p-5 rounded-xl bg-gradient-to-br from-[#EAB308]/10 to-[#EAB308]/5 border border-[#EAB308]/20">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-lg bg-[#EAB308]/20 flex items-center justify-center">
                            <Database className="w-5 h-5 text-[#EAB308]" />
                          </div>
                          <div>
                            <div className="text-2xl text-white font-bold">13</div>
                            <div className="text-xs text-[#6F83A7]">Modules</div>
                          </div>
                        </div>
                        <p className="text-sm text-white/60">Vector-enabled</p>
                      </div>

                      <div className="p-5 rounded-xl bg-gradient-to-br from-[#57ACAF]/10 to-[#57ACAF]/5 border border-[#57ACAF]/20">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-lg bg-[#57ACAF]/20 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-[#57ACAF]" />
                          </div>
                          <div>
                            <div className="text-2xl text-white font-bold">384</div>
                            <div className="text-xs text-[#6F83A7]">Dimensions</div>
                          </div>
                        </div>
                        <p className="text-sm text-white/60">Vector size</p>
                      </div>

                      <div className="p-5 rounded-xl bg-gradient-to-br from-[#6F83A7]/10 to-[#6F83A7]/5 border border-[#6F83A7]/20">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-lg bg-[#6F83A7]/20 flex items-center justify-center">
                            <Search className="w-5 h-5 text-[#6F83A7]" />
                          </div>
                          <div>
                            <div className="text-2xl text-white font-bold">Ready</div>
                            <div className="text-xs text-[#6F83A7]">Status</div>
                          </div>
                        </div>
                        <p className="text-sm text-white/60">Operational</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <Button 
                        variant="outline" 
                        className="h-auto py-4 flex-col gap-2 border-white/10 text-white hover:bg-white/5 hover:border-[#57ACAF]/30 transition-all duration-180 bg-[rgba(255,255,255,0)]"
                        onClick={() => {
                          setIsVectorAdminOpen(true);
                          toast.info('Opening Vector Database Admin...');
                        }}
                      >
                        <div className="w-10 h-10 rounded-lg bg-[#57ACAF]/10 flex items-center justify-center">
                          <Upload className="w-5 h-5 text-[#57ACAF]" />
                        </div>
                        <div className="text-center">
                          <div className="font-medium">Seed Database</div>
                          <div className="text-xs text-[#6F83A7]">Add sample data</div>
                        </div>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-auto py-4 flex-col gap-2 border-white/10 text-white hover:bg-white/5 hover:border-[#EAB308]/30 transition-all duration-180 bg-[rgba(255,255,255,0)]"
                        onClick={() => {
                          setIsVectorAdminOpen(true);
                          toast.info('Opening search interface...');
                        }}
                      >
                        <div className="w-10 h-10 rounded-lg bg-[#EAB308]/10 flex items-center justify-center">
                          <Search className="w-5 h-5 text-[#EAB308]" />
                        </div>
                        <div className="text-center">
                          <div className="font-medium">Test Search</div>
                          <div className="text-xs text-[#6F83A7]">Semantic search</div>
                        </div>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-auto py-4 flex-col gap-2 border-white/10 text-white hover:bg-white/5 hover:border-[#6F83A7]/30 transition-all duration-180 bg-[rgba(255,255,255,0)]"
                        onClick={() => toast.info('Vector database analytics coming soon')}
                      >
                        <div className="w-10 h-10 rounded-lg bg-[#6F83A7]/10 flex items-center justify-center">
                          <BarChart3 className="w-5 h-5 text-[#6F83A7]" />
                        </div>
                        <div className="text-center">
                          <div className="font-medium">Analytics</div>
                          <div className="text-xs text-[#6F83A7]">Usage stats</div>
                        </div>
                      </Button>
                    </div>
                  </div>

                  {/* RBAC */}
                  <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-xl text-white">Role-Based Access Control</h3>
                        <p className="text-sm text-[#6F83A7]">Manage user roles and permissions</p>
                      </div>
                      <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 bg-[rgba(255,255,255,0)]">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Role
                      </Button>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {roles.map((role, index) => (
                        <div key={index} className="p-5 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-[#57ACAF]/30 transition-all duration-180 group">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full bg-[#${role.color}]`} />
                              <h4 className="text-white font-medium">{role.name}</h4>
                            </div>
                            <Badge className="bg-[#EAB308]/20 text-[#EAB308] border-0">{role.users} users</Badge>
                          </div>
                          <Separator className="bg-white/10 mb-4" />
                          <div className="mb-4">
                            <div className="text-xs text-[#6F83A7] mb-2">Permissions:</div>
                            <div className="flex flex-wrap gap-1">
                              {role.permissions.slice(0, 3).map((perm, idx) => (
                                <Badge key={idx} className="bg-white/10 text-[#6F83A7] border-0 text-xs">
                                  {perm}
                                </Badge>
                              ))}
                              {role.permissions.length > 3 && (
                                <Badge className="bg-white/10 text-[#6F83A7] border-0 text-xs">
                                  +{role.permissions.length - 3}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full border-white/10 text-white hover:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity bg-[rgba(255,255,255,0)]"
                          >
                            Edit Permissions
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* System Logs */}
                  <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#6F83A7]/20 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-[#6F83A7]" />
                        </div>
                        <div>
                          <h3 className="text-white">System Logs</h3>
                          <p className="text-sm text-[#6F83A7]">View system activity and audit trails</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/10 text-white hover:bg-white/5 bg-[rgba(255,255,255,0)]"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export Logs
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {[
                        { time: '10:34 AM', event: 'User login', user: 'admin@fabricxai.com', level: 'info' },
                        { time: '10:28 AM', event: 'Settings updated', user: 'admin@fabricxai.com', level: 'info' },
                        { time: '10:15 AM', event: 'Failed login attempt', user: 'unknown', level: 'warning' },
                        { time: '09:52 AM', event: 'Module enabled', user: 'admin@fabricxai.com', level: 'info' },
                      ].map((log, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5 text-sm">
                          <div className="flex items-center gap-4">
                            <div className={`w-2 h-2 rounded-full ${log.level === 'warning' ? 'bg-[#EAB308]' : 'bg-[#57ACAF]'}`} />
                            <span className="text-[#6F83A7] font-mono">{log.time}</span>
                            <span className="text-white">{log.event}</span>
                          </div>
                          <span className="text-[#6F83A7]">{log.user}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="bg-gradient-to-br from-[#D0342C]/10 to-[#D0342C]/5 border border-[#D0342C]/20 rounded-xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-[#D0342C]/20 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-[#D0342C]" />
                      </div>
                      <div>
                        <h3 className="text-white">Danger Zone</h3>
                        <p className="text-sm text-[#6F83A7]">Irreversible and destructive actions</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-5 rounded-xl bg-[#D0342C]/10 border border-[#D0342C]/20">
                        <div>
                          <div className="text-white mb-1 font-medium">Reset All Settings</div>
                          <div className="text-sm text-[#6F83A7]">Restore default configuration</div>
                        </div>
                        <Button
                          variant="outline"
                          className="border-[#D0342C]/30 text-[#D0342C] hover:bg-[#D0342C]/10"
                        >
                          Reset
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-5 rounded-xl bg-[#D0342C]/10 border border-[#D0342C]/20">
                        <div>
                          <div className="text-white mb-1 font-medium">Clear All Data</div>
                          <div className="text-sm text-[#6F83A7]">Delete all records and files</div>
                        </div>
                        <Button
                          variant="outline"
                          className="border-[#D0342C]/30 text-[#D0342C] hover:bg-[#D0342C]/10"
                        >
                          Clear
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-5 rounded-xl bg-[#D0342C]/10 border border-[#D0342C]/20">
                        <div>
                          <div className="text-white mb-1 font-medium">Delete Organization</div>
                          <div className="text-sm text-[#6F83A7]">Permanently delete your account</div>
                        </div>
                        <Button
                          variant="outline"
                          className="border-[#D0342C]/30 text-[#D0342C] hover:bg-[#D0342C]/10"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </ScrollArea>

      <VectorDatabaseAdmin 
        isOpen={isVectorAdminOpen}
        onClose={() => setIsVectorAdminOpen(false)}
      />
    </div>
  );
}
