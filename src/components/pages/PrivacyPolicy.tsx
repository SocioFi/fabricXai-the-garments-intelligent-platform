import { motion } from 'motion/react';
import { 
  Shield, Lock, Eye, Cookie, Database, Globe, Users, 
  Mail, FileText, CheckCircle, AlertCircle, ArrowLeft, ExternalLink, Target
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';

interface PrivacyPolicyProps {
  onNavigate: (page: string) => void;
}

export function PrivacyPolicy({ onNavigate }: PrivacyPolicyProps) {
  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
      icon: FileText,
      color: '#57ACAF',
      content: `Welcome to FabricXAI, an intelligent ERP platform designed specifically for the garment manufacturing industry. This Privacy Policy explains how we collect, use, protect, and share your personal information when you use our services. We are committed to protecting your privacy and ensuring transparency in our data practices.

By using FabricXAI, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.`
    },
    {
      id: 'data-collection',
      title: 'Information We Collect',
      icon: Database,
      color: '#EAB308',
      content: `We collect several types of information to provide and improve our services:`,
      subsections: [
        {
          title: 'Account Information',
          items: [
            'Name, email address, phone number',
            'Company name and business details',
            'Job title and role within organization',
            'Payment and billing information'
          ]
        },
        {
          title: 'Business Data',
          items: [
            'Manufacturing and production data',
            'Customer and supplier information',
            'Product specifications and designs',
            'Financial and costing records',
            'Quality control and compliance data'
          ]
        },
        {
          title: 'Usage Information',
          items: [
            'Log data (IP address, browser type, pages visited)',
            'Device information and operating system',
            'Session duration and feature usage patterns',
            'AI assistant interactions and queries'
          ]
        },
        {
          title: 'Automatically Collected Data',
          items: [
            'Cookies and similar tracking technologies',
            'Analytics data through third-party services',
            'Performance and error monitoring data'
          ]
        }
      ]
    },
    {
      id: 'data-usage',
      title: 'How We Use Your Information',
      icon: Target,
      color: '#57ACAF',
      content: `We use the collected information for the following purposes:`,
      subsections: [
        {
          title: 'Service Delivery',
          items: [
            'Provide and maintain FabricXAI platform functionality',
            'Process transactions and manage your account',
            'Enable AI-powered features and recommendations',
            'Generate reports and analytics'
          ]
        },
        {
          title: 'Improvement & Personalization',
          items: [
            'Analyze usage patterns to improve user experience',
            'Develop new features and capabilities',
            'Customize content and recommendations',
            'Train and improve AI models (with anonymized data)'
          ]
        },
        {
          title: 'Communication',
          items: [
            'Send service updates and important notifications',
            'Respond to customer support inquiries',
            'Provide technical support and assistance',
            'Share product updates and new features'
          ]
        },
        {
          title: 'Security & Compliance',
          items: [
            'Detect and prevent fraud or security threats',
            'Enforce our terms and conditions',
            'Comply with legal obligations',
            'Maintain data integrity and accuracy'
          ]
        }
      ]
    },
    {
      id: 'data-security',
      title: 'Data Security',
      icon: Lock,
      color: '#EAB308',
      content: `We implement industry-standard security measures to protect your information:`,
      subsections: [
        {
          title: 'Technical Safeguards',
          items: [
            'End-to-end encryption for data transmission (TLS/SSL)',
            'Encrypted data storage at rest',
            'Regular security audits and penetration testing',
            'Multi-factor authentication options'
          ]
        },
        {
          title: 'Administrative Controls',
          items: [
            'Role-based access control (RBAC) system',
            'Limited employee access to personal data',
            'Comprehensive data backup and disaster recovery',
            'Regular security training for team members'
          ]
        },
        {
          title: 'Monitoring & Response',
          items: [
            '24/7 security monitoring and threat detection',
            'Incident response procedures',
            'Regular security updates and patches',
            'Vulnerability management program'
          ]
        }
      ]
    },
    {
      id: 'data-sharing',
      title: 'Data Sharing & Disclosure',
      icon: Users,
      color: '#57ACAF',
      content: `We do not sell your personal information. We may share data in the following circumstances:`,
      subsections: [
        {
          title: 'Service Providers',
          items: [
            'Cloud infrastructure providers (e.g., Supabase, AWS)',
            'Payment processors for billing services',
            'Analytics and monitoring services',
            'Customer support and communication tools'
          ]
        },
        {
          title: 'Legal Requirements',
          items: [
            'Compliance with applicable laws and regulations',
            'Response to lawful requests from authorities',
            'Protection of our legal rights and interests',
            'Prevention of fraud or security threats'
          ]
        },
        {
          title: 'Business Transfers',
          items: [
            'In connection with mergers or acquisitions',
            'During sale of business assets',
            'In bankruptcy or similar proceedings'
          ]
        },
        {
          title: 'With Your Consent',
          items: [
            'When you explicitly authorize data sharing',
            'Integration with third-party services you choose'
          ]
        }
      ]
    },
    {
      id: 'cookies',
      title: 'Cookies & Tracking',
      icon: Cookie,
      color: '#EAB308',
      content: `We use cookies and similar technologies to enhance your experience:`,
      subsections: [
        {
          title: 'Types of Cookies',
          items: [
            'Essential cookies: Required for platform functionality',
            'Preference cookies: Remember your settings',
            'Analytics cookies: Understand how you use our service',
            'Marketing cookies: Deliver relevant content'
          ]
        },
        {
          title: 'Cookie Management',
          items: [
            'You can control cookies through browser settings',
            'Disabling cookies may affect functionality',
            'Third-party cookies subject to their policies',
            'Cookie consent banner for EU users'
          ]
        }
      ]
    },
    {
      id: 'user-rights',
      title: 'Your Rights & Choices',
      icon: Eye,
      color: '#57ACAF',
      content: `You have the following rights regarding your personal data:`,
      subsections: [
        {
          title: 'Access & Portability',
          items: [
            'Request a copy of your personal data',
            'Export data in machine-readable format',
            'Understand how we process your information'
          ]
        },
        {
          title: 'Correction & Deletion',
          items: [
            'Update or correct inaccurate information',
            'Request deletion of your personal data',
            'Object to certain data processing activities'
          ]
        },
        {
          title: 'Control & Consent',
          items: [
            'Withdraw consent for data processing',
            'Opt-out of marketing communications',
            'Restrict certain data processing activities',
            'Lodge complaints with supervisory authorities'
          ]
        }
      ]
    },
    {
      id: 'gdpr',
      title: 'GDPR Compliance',
      icon: Shield,
      color: '#EAB308',
      content: `For users in the European Union, we comply with GDPR requirements:`,
      subsections: [
        {
          title: 'Legal Basis for Processing',
          items: [
            'Contract performance: Service delivery to customers',
            'Legitimate interests: Platform improvement and security',
            'Consent: Marketing communications and optional features',
            'Legal obligations: Compliance with applicable laws'
          ]
        },
        {
          title: 'International Data Transfers',
          items: [
            'Standard contractual clauses for EU data transfers',
            'Adequate protection measures for cross-border transfers',
            'Data Processing Agreements with third parties'
          ]
        },
        {
          title: 'Data Protection Officer',
          items: [
            'Contact: privacy@fabricxai.com',
            'Available to address GDPR-related concerns',
            'Oversees data protection compliance'
          ]
        }
      ]
    },
    {
      id: 'retention',
      title: 'Data Retention',
      icon: Database,
      color: '#57ACAF',
      content: `We retain your information as follows:`,
      subsections: [
        {
          title: 'Retention Periods',
          items: [
            'Account data: Duration of active account plus 90 days',
            'Business records: 7 years for compliance purposes',
            'Usage logs: 2 years for security and analytics',
            'Marketing data: Until you opt-out or 3 years of inactivity'
          ]
        },
        {
          title: 'Deletion Process',
          items: [
            'Automated deletion after retention period',
            'Secure data destruction methods',
            'Backup data deleted within 90 days',
            'Exceptions for legal or regulatory requirements'
          ]
        }
      ]
    },
    {
      id: 'third-party',
      title: 'Third-Party Services',
      icon: Globe,
      color: '#EAB308',
      content: `Our platform integrates with third-party services:`,
      subsections: [
        {
          title: 'Key Service Providers',
          items: [
            'Supabase: Database and authentication',
            'OpenAI: AI-powered features and recommendations',
            'Stripe: Payment processing',
            'Google Analytics: Usage analytics'
          ]
        },
        {
          title: 'Third-Party Policies',
          items: [
            'Each provider has their own privacy policy',
            'We are not responsible for third-party practices',
            'Review third-party policies before use',
            'You may have direct relationships with some providers'
          ]
        }
      ]
    },
    {
      id: 'children',
      title: 'Children\'s Privacy',
      icon: Shield,
      color: '#57ACAF',
      content: `FabricXAI is not intended for children under 16 years of age. We do not knowingly collect personal information from children. If you believe we have collected data from a child, please contact us immediately at privacy@fabricxai.com.`
    },
    {
      id: 'updates',
      title: 'Policy Updates',
      icon: AlertCircle,
      color: '#EAB308',
      content: `We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. When we make material changes:`,
      subsections: [
        {
          title: 'Notification Process',
          items: [
            'Email notification to registered users',
            'Prominent notice on the platform',
            'Update of "Last Updated" date at top of policy',
            '30-day notice period for material changes'
          ]
        },
        {
          title: 'Your Continued Use',
          items: [
            'Continued use after changes constitutes acceptance',
            'You may close your account if you disagree',
            'Review policy regularly for updates'
          ]
        }
      ]
    },
    {
      id: 'contact',
      title: 'Contact Information',
      icon: Mail,
      color: '#57ACAF',
      content: `For privacy-related questions, concerns, or to exercise your rights:`,
      subsections: [
        {
          title: 'Contact Details',
          items: [
            'Email: privacy@fabricxai.com',
            'Data Protection Officer: dpo@fabricxai.com',
            'Mailing Address: [Company Address]',
            'Response time: Within 30 days of request'
          ]
        },
        {
          title: 'Support Channels',
          items: [
            'In-app support via MARBIM AI Assistant',
            'Customer support portal',
            'Phone support: [Support Number]',
            'Live chat during business hours'
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#101725] to-[#182336] pb-[72px]">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-[600px] h-[600px] bg-[#57ACAF]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 left-20 w-[600px] h-[600px] bg-[#EAB308]/5 rounded-full blur-[120px]" />
      </div>

      <ScrollArea className="h-[calc(100vh-72px)]">
        <div className="relative px-8 py-12">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <Button
                onClick={() => onNavigate('dashboard')}
                variant="outline"
                className="mb-8 border-white/20 bg-white/5 text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>

              <div className="flex items-start gap-6 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#57ACAF] to-[#57ACAF]/60 shadow-lg shadow-[#57ACAF]/20 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h1 className="text-5xl font-bold text-white mb-3">
                    Privacy Policy
                  </h1>
                  <p className="text-xl text-[#6F83A7] mb-4">
                    How we protect and handle your data
                  </p>
                  <div className="flex items-center gap-4">
                    <Badge className="bg-[#57ACAF]/10 text-[#57ACAF] border border-[#57ACAF]/20">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      GDPR Compliant
                    </Badge>
                    <Badge className="bg-[#EAB308]/10 text-[#EAB308] border border-[#EAB308]/20">
                      <Lock className="w-3 h-3 mr-1" />
                      Enterprise Security
                    </Badge>
                    <Badge className="bg-[#6F83A7]/10 text-[#6F83A7] border border-[#6F83A7]/20">
                      Last Updated: November 1, 2025
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Key Highlights */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-[#57ACAF]/10 to-[#57ACAF]/5 border border-[#57ACAF]/20 rounded-xl p-5">
                  <Lock className="w-6 h-6 text-[#57ACAF] mb-2" />
                  <div className="text-sm text-[#6F83A7] mb-1">Data Protection</div>
                  <div className="text-white font-medium">Bank-grade encryption</div>
                </div>
                <div className="bg-gradient-to-br from-[#EAB308]/10 to-[#EAB308]/5 border border-[#EAB308]/20 rounded-xl p-5">
                  <Eye className="w-6 h-6 text-[#EAB308] mb-2" />
                  <div className="text-sm text-[#6F83A7] mb-1">Your Rights</div>
                  <div className="text-white font-medium">Full data control</div>
                </div>
                <div className="bg-gradient-to-br from-[#6F83A7]/10 to-[#6F83A7]/5 border border-[#6F83A7]/20 rounded-xl p-5">
                  <Shield className="w-6 h-6 text-[#6F83A7] mb-2" />
                  <div className="text-sm text-[#6F83A7] mb-1">Compliance</div>
                  <div className="text-white font-medium">GDPR & SOC 2</div>
                </div>
              </div>
            </motion.div>

            {/* Quick Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-6"
            >
              <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#57ACAF]" />
                Quick Navigation
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
                      className="text-left px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-[#6F83A7] hover:text-white transition-all duration-180 flex items-center gap-2"
                    >
                      <Icon className="w-3 h-3" style={{ color: section.color }} />
                      {section.title}
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Policy Sections */}
            <div className="space-y-8">
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <motion.div
                    key={section.id}
                    id={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-8 scroll-mt-8"
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ 
                          backgroundColor: `${section.color}20`,
                          border: `1px solid ${section.color}40`
                        }}
                      >
                        <Icon className="w-6 h-6" style={{ color: section.color }} />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-white mb-3">
                          {section.title}
                        </h2>
                        <p className="text-[#6F83A7] leading-relaxed whitespace-pre-line">
                          {section.content}
                        </p>
                      </div>
                    </div>

                    {section.subsections && (
                      <div className="space-y-6 pl-16">
                        {section.subsections.map((subsection, subIdx) => (
                          <div key={subIdx}>
                            <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-[#57ACAF]" />
                              {subsection.title}
                            </h3>
                            <ul className="space-y-2">
                              {subsection.items.map((item, itemIdx) => (
                                <li
                                  key={itemIdx}
                                  className="text-[#6F83A7] pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-[#57ACAF]"
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Footer Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 bg-gradient-to-br from-[#EAB308]/10 to-[#57ACAF]/10 border border-[#EAB308]/20 rounded-xl p-8"
            >
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-xl bg-[#EAB308]/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-[#EAB308]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium mb-2">
                    Questions About This Policy?
                  </h3>
                  <p className="text-[#6F83A7] mb-4">
                    Our privacy team is here to help. Contact us for any questions, concerns, or to exercise your data rights.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button className="bg-gradient-to-r from-[#57ACAF] to-[#57ACAF]/80 hover:from-[#57ACAF]/90 hover:to-[#57ACAF]/70 text-white shadow-lg shadow-[#57ACAF]/20">
                      <Mail className="w-4 h-4 mr-2" />
                      Contact Privacy Team
                    </Button>
                    <Button
                      variant="outline"
                      className="border-white/20 bg-white/5 text-white hover:bg-white/10"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button
                      onClick={() => onNavigate('settings')}
                      variant="outline"
                      className="border-white/20 bg-white/5 text-white hover:bg-white/10"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Manage Privacy Settings
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Additional Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6 grid grid-cols-3 gap-4"
            >
              <button className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 text-left transition-all duration-180 group">
                <FileText className="w-5 h-5 text-[#57ACAF] mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-white font-medium mb-1">Terms of Service</div>
                <div className="text-xs text-[#6F83A7]">Legal terms and conditions</div>
              </button>
              <button className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 text-left transition-all duration-180 group">
                <Cookie className="w-5 h-5 text-[#EAB308] mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-white font-medium mb-1">Cookie Policy</div>
                <div className="text-xs text-[#6F83A7]">How we use cookies</div>
              </button>
              <button className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 text-left transition-all duration-180 group">
                <Shield className="w-5 h-5 text-[#6F83A7] mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-white font-medium mb-1">Security Center</div>
                <div className="text-xs text-[#6F83A7]">Our security practices</div>
              </button>
            </motion.div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
