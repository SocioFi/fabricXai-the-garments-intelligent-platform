import { motion } from 'motion/react';
import { ScrollArea } from '../ui/scroll-area';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { 
  FileText, Shield, Users, DollarSign, Globe, Lock, AlertTriangle,
  CheckCircle, Scale, Briefcase, Zap, Database, Code, Ship, Award,
  UserCheck, CreditCard, Ban, Info, Mail, Phone, MapPin, ExternalLink,
  Calendar, Clock, Sparkles, Building2, Gavel, BookOpen, Download
} from 'lucide-react';
import { Button } from '../ui/button';

export function TermsOfService() {
  const sections = [
    {
      id: '1',
      title: 'Acceptance of Terms',
      icon: FileText,
      color: '57ACAF',
      content: [
        {
          subtitle: '1.1 Agreement to Terms',
          text: 'By accessing or using FabricXAI ("Service," "Platform," or "Software"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access the Service. These Terms apply to all visitors, users, and others who access or use the Service.'
        },
        {
          subtitle: '1.2 Entity Representation',
          text: 'If you are using the Service on behalf of a company, organization, or other legal entity, you represent and warrant that you have the authority to bind such entity to these Terms. In such case, "you" and "your" will refer to such entity.'
        },
        {
          subtitle: '1.3 Age Requirement',
          text: 'You must be at least 18 years of age to use this Service. By using the Service, you represent and warrant that you meet this age requirement and have the legal capacity to enter into these Terms.'
        },
        {
          subtitle: '1.4 Modifications to Terms',
          text: 'FabricXAI reserves the right to modify these Terms at any time. We will provide notice of material changes by posting the updated Terms on our website and updating the "Last Updated" date. Your continued use of the Service after such modifications constitutes acceptance of the updated Terms.'
        }
      ]
    },
    {
      id: '2',
      title: 'Service Description & License',
      icon: Sparkles,
      color: 'EAB308',
      content: [
        {
          subtitle: '2.1 Service Overview',
          text: 'FabricXAI is an enterprise-grade ERP platform specifically designed for the Ready-Made Garments (RMG) and textile manufacturing industry. The Service provides 14 integrated modules including CRM, Production Planning, Quality Control, Finance, Compliance, Sustainability, and AI-powered features including MARBIM AI Assistant and vector-based semantic search.'
        },
        {
          subtitle: '2.2 License Grant',
          text: 'Subject to your compliance with these Terms and payment of applicable fees, FabricXAI grants you a limited, non-exclusive, non-transferable, revocable license to access and use the Service solely for your internal business operations in the textile and garment manufacturing industry.'
        },
        {
          subtitle: '2.3 Restrictions',
          text: 'You may not: (a) copy, modify, or create derivative works of the Service; (b) reverse engineer, decompile, or disassemble the Service; (c) rent, lease, lend, sell, sublicense, or transfer the Service; (d) use the Service for any illegal purpose or in violation of any laws; (e) interfere with or disrupt the Service or servers; (f) attempt to gain unauthorized access to any portion of the Service.'
        },
        {
          subtitle: '2.4 AI Features',
          text: 'The Service includes AI-powered features such as MARBIM AI Assistant, predictive analytics, semantic search, and automated recommendations. These features use machine learning algorithms and may be updated or improved over time. AI-generated content should be reviewed by qualified personnel before making business decisions.'
        }
      ]
    },
    {
      id: '3',
      title: 'User Accounts & Responsibilities',
      icon: UserCheck,
      color: '6F83A7',
      content: [
        {
          subtitle: '3.1 Account Creation',
          text: 'To access certain features of the Service, you must create an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete.'
        },
        {
          subtitle: '3.2 Account Security',
          text: 'You are responsible for safeguarding your account credentials and for any activities or actions under your account. You must immediately notify FabricXAI of any unauthorized use of your account or any other breach of security. FabricXAI will not be liable for any loss or damage arising from your failure to comply with this security obligation.'
        },
        {
          subtitle: '3.3 User Roles & Permissions',
          text: 'The Service implements Role-Based Access Control (RBAC) with multiple user roles including Administrator, Manager, Sales, Production, Finance, Procurement, Compliance, HR, Operations, Quality, and Viewer. Each role has specific permissions. Administrators are responsible for properly assigning roles and managing user access.'
        },
        {
          subtitle: '3.4 User Conduct',
          text: 'You agree to use the Service in compliance with all applicable laws and regulations. You will not upload, post, or transmit any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable. You will not use the Service to transmit any viruses, malware, or other harmful code.'
        }
      ]
    },
    {
      id: '4',
      title: 'Intellectual Property Rights',
      icon: Award,
      color: 'EAB308',
      content: [
        {
          subtitle: '4.1 FabricXAI Intellectual Property',
          text: 'The Service and its original content, features, and functionality are and will remain the exclusive property of FabricXAI and its licensors. The Service is protected by copyright, trademark, patent, trade secret, and other intellectual property laws of the United States and foreign countries.'
        },
        {
          subtitle: '4.2 Your Content',
          text: 'You retain all rights to the data, information, and content you upload, submit, or transmit through the Service ("Your Content"). By using the Service, you grant FabricXAI a worldwide, non-exclusive, royalty-free license to use, store, process, and display Your Content solely to provide and improve the Service.'
        },
        {
          subtitle: '4.3 Feedback',
          text: 'If you provide FabricXAI with any feedback, suggestions, or ideas regarding the Service, you grant FabricXAI a perpetual, irrevocable, worldwide, royalty-free license to use, modify, and incorporate such feedback into the Service without any obligation to you.'
        },
        {
          subtitle: '4.4 Trademarks',
          text: 'FabricXAI, the FabricXAI logo, MARBIM, and other FabricXAI trademarks, service marks, graphics, and logos used in connection with the Service are trademarks of FabricXAI. You may not use these marks without prior written permission from FabricXAI.'
        }
      ]
    },
    {
      id: '5',
      title: 'Payment Terms & Billing',
      icon: CreditCard,
      color: '57ACAF',
      content: [
        {
          subtitle: '5.1 Subscription Plans',
          text: 'FabricXAI offers various subscription plans including Starter, Professional, and Enterprise tiers. Pricing and features for each plan are detailed on our pricing page. All fees are quoted in U.S. Dollars (USD) unless otherwise specified.'
        },
        {
          subtitle: '5.2 Billing Cycles',
          text: 'Subscription fees are billed in advance on a monthly or annual basis, depending on your selected plan. Your subscription will automatically renew at the end of each billing cycle unless you cancel before the renewal date.'
        },
        {
          subtitle: '5.3 Payment Methods',
          text: 'You must provide valid payment information (credit card, bank account, or other approved payment method) to purchase a subscription. You authorize FabricXAI to charge the payment method on file for all fees incurred under your account.'
        },
        {
          subtitle: '5.4 Price Changes',
          text: 'FabricXAI reserves the right to modify subscription fees with 30 days\' prior notice. Price changes will take effect at the start of your next billing cycle. If you do not agree to the price change, you may cancel your subscription before the change takes effect.'
        },
        {
          subtitle: '5.5 Refund Policy',
          text: 'Subscription fees are non-refundable except as required by law or as expressly stated in these Terms. If you cancel your subscription, you will continue to have access to the Service until the end of your current billing period, but no refund will be provided for the remainder of that period.'
        },
        {
          subtitle: '5.6 Taxes',
          text: 'All fees are exclusive of applicable taxes (including VAT, GST, sales tax, etc.). You are responsible for paying all taxes associated with your purchase, except for taxes based on FabricXAI\'s net income.'
        }
      ]
    },
    {
      id: '6',
      title: 'Data Processing & Privacy',
      icon: Lock,
      color: '6F83A7',
      content: [
        {
          subtitle: '6.1 Data Protection Compliance',
          text: 'FabricXAI is committed to protecting your data in compliance with applicable data protection laws including the EU General Data Protection Regulation (GDPR), UK Data Protection Act 2018, California Consumer Privacy Act (CCPA), and other relevant privacy regulations.'
        },
        {
          subtitle: '6.2 Data Processing Agreement',
          text: 'To the extent FabricXAI processes personal data on your behalf, FabricXAI acts as a data processor and you act as the data controller. A separate Data Processing Agreement (DPA) governs this relationship and is incorporated by reference into these Terms.'
        },
        {
          subtitle: '6.3 Data Storage & Security',
          text: 'Your data is stored on secure servers with industry-standard encryption both in transit (TLS 1.3) and at rest (AES-256). We implement organizational and technical measures to protect against unauthorized access, alteration, disclosure, or destruction of your data.'
        },
        {
          subtitle: '6.4 Data Location',
          text: 'Data is primarily stored in data centers located in the United States. For customers in the European Union, we offer EU data residency options. Cross-border data transfers comply with Standard Contractual Clauses (SCCs) approved by the European Commission.'
        },
        {
          subtitle: '6.5 Data Retention',
          text: 'We retain your data for as long as your account is active or as needed to provide the Service. Upon account termination, data is retained for 90 days for recovery purposes, after which it is permanently deleted unless longer retention is required by law.'
        },
        {
          subtitle: '6.6 Your Privacy Rights',
          text: 'You have rights regarding your personal data including access, correction, deletion, portability, and objection to processing. To exercise these rights, please contact our Data Protection Officer. For detailed information, see our Privacy Policy.'
        },
        {
          subtitle: '6.7 AI & Machine Learning',
          text: 'The Service uses AI and machine learning to provide features such as predictive analytics, recommendations, and semantic search. Your data may be used to train and improve these models, but only in anonymized and aggregated form. You can opt out of AI feature participation by contacting support.'
        }
      ]
    },
    {
      id: '7',
      title: 'Service Availability & Modifications',
      icon: Zap,
      color: 'EAB308',
      content: [
        {
          subtitle: '7.1 Service Availability',
          text: 'FabricXAI strives to maintain 99.9% uptime for the Service, but we do not guarantee uninterrupted or error-free operation. The Service may be temporarily unavailable for maintenance, updates, or due to circumstances beyond our control.'
        },
        {
          subtitle: '7.2 Scheduled Maintenance',
          text: 'We will provide advance notice of scheduled maintenance when possible. Emergency maintenance may be performed without notice. During maintenance windows, some or all features of the Service may be unavailable.'
        },
        {
          subtitle: '7.3 Service Modifications',
          text: 'FabricXAI reserves the right to modify, suspend, or discontinue any aspect of the Service at any time, with or without notice. We will make reasonable efforts to notify you of material changes that negatively impact functionality you are actively using.'
        },
        {
          subtitle: '7.4 Updates & Upgrades',
          text: 'We regularly release updates to improve the Service, add features, and fix bugs. Some updates may be applied automatically to ensure security and compatibility. Major feature releases may require your consent or additional fees.'
        }
      ]
    },
    {
      id: '8',
      title: 'Prohibited Uses & Content',
      icon: Ban,
      color: 'D0342C',
      content: [
        {
          subtitle: '8.1 Prohibited Activities',
          text: 'You may not use the Service to: (a) violate any laws or regulations; (b) infringe intellectual property rights; (c) transmit harmful code or malware; (d) attempt unauthorized access to systems; (e) interfere with other users\' use of the Service; (f) engage in fraudulent activities; (g) collect user data without consent; (h) use automated systems to access the Service (except authorized API usage).'
        },
        {
          subtitle: '8.2 Prohibited Content',
          text: 'You may not upload, transmit, or store content that: (a) is illegal, harmful, or violates rights of others; (b) contains malware or harmful code; (c) infringes intellectual property rights; (d) violates privacy rights; (e) is defamatory, obscene, or offensive; (f) promotes illegal activities.'
        },
        {
          subtitle: '8.3 Industry-Specific Prohibitions',
          text: 'In the context of textile and garment manufacturing, you may not use the Service to facilitate: (a) child labor or forced labor; (b) unsafe working conditions; (c) environmental violations; (d) counterfeit goods production; (e) customs or export control violations; (f) sanctions violations.'
        },
        {
          subtitle: '8.4 Enforcement',
          text: 'FabricXAI reserves the right to investigate violations of these Terms and take appropriate action including warning, suspension, or termination of accounts, removal of content, and reporting to law enforcement authorities.'
        }
      ]
    },
    {
      id: '9',
      title: 'Termination & Suspension',
      icon: AlertTriangle,
      color: 'D0342C',
      content: [
        {
          subtitle: '9.1 Termination by You',
          text: 'You may terminate your account at any time by contacting support or through your account settings. Upon termination, your access to the Service will cease at the end of your current billing period. No refunds will be provided for unused time in your subscription period.'
        },
        {
          subtitle: '9.2 Termination by FabricXAI',
          text: 'FabricXAI may terminate or suspend your account immediately, without prior notice or liability, for any reason, including if you breach these Terms. Reasons for termination may include non-payment, violation of Terms, fraudulent activity, or legal requirements.'
        },
        {
          subtitle: '9.3 Effect of Termination',
          text: 'Upon termination: (a) your right to use the Service will immediately cease; (b) you must cease all use of the Service; (c) all licenses granted under these Terms will terminate; (d) you will remain liable for all fees incurred prior to termination; (e) data retention policies will apply as specified in Section 6.5.'
        },
        {
          subtitle: '9.4 Data Export',
          text: 'Prior to termination, you may export your data using the Service\'s export functionality. After account termination, data will be available for 90 days, after which it will be permanently deleted. FabricXAI is not obligated to maintain or provide data after the retention period expires.'
        },
        {
          subtitle: '9.5 Survival',
          text: 'Sections of these Terms that by their nature should survive termination will survive, including but not limited to: intellectual property provisions, limitation of liability, indemnification, dispute resolution, and governing law.'
        }
      ]
    },
    {
      id: '10',
      title: 'Warranties & Disclaimers',
      icon: Shield,
      color: '6F83A7',
      content: [
        {
          subtitle: '10.1 Service "As Is"',
          text: 'THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.'
        },
        {
          subtitle: '10.2 No Warranty of Accuracy',
          text: 'FabricXAI does not warrant that the Service will be uninterrupted, timely, secure, or error-free. We do not warrant the accuracy, completeness, or reliability of any content, including AI-generated content, recommendations, or analytics.'
        },
        {
          subtitle: '10.3 AI Features Disclaimer',
          text: 'AI features including MARBIM AI Assistant, predictive analytics, and automated recommendations are provided for informational purposes only. Results may vary and should not be solely relied upon for business decisions. You are responsible for verifying AI-generated content before use.'
        },
        {
          subtitle: '10.4 Third-Party Services',
          text: 'The Service may integrate with third-party services. FabricXAI is not responsible for the availability, accuracy, or content of third-party services. Your use of third-party services is subject to their terms and conditions.'
        },
        {
          subtitle: '10.5 Industry Compliance',
          text: 'While the Service includes compliance and sustainability modules, FabricXAI does not warrant that use of the Service will ensure compliance with all applicable laws, regulations, or industry standards. You are responsible for ensuring compliance with all applicable requirements.'
        }
      ]
    },
    {
      id: '11',
      title: 'Limitation of Liability',
      icon: Scale,
      color: 'EAB308',
      content: [
        {
          subtitle: '11.1 Limitation Amount',
          text: 'TO THE MAXIMUM EXTENT PERMITTED BY LAW, FABRICXAI\'S TOTAL LIABILITY FOR ANY CLAIMS UNDER THESE TERMS IS LIMITED TO THE AMOUNT YOU PAID TO FABRICXAI IN THE 12 MONTHS PRECEDING THE CLAIM, OR $100 USD, WHICHEVER IS GREATER.'
        },
        {
          subtitle: '11.2 Exclusion of Damages',
          text: 'FABRICXAI WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM: (A) YOUR USE OR INABILITY TO USE THE SERVICE; (B) UNAUTHORIZED ACCESS TO OR ALTERATION OF YOUR DATA; (C) STATEMENTS OR CONDUCT OF THIRD PARTIES; (D) ANY OTHER MATTER RELATING TO THE SERVICE.'
        },
        {
          subtitle: '11.3 Basis of Bargain',
          text: 'The limitations of liability set forth in this Section reflect the allocation of risk between the parties. The limitations will apply even if any limited remedy fails of its essential purpose. The limitations of liability provided in these Terms inure to the benefit of FabricXAI and its affiliates, licensors, and service providers.'
        },
        {
          subtitle: '11.4 Exceptions',
          text: 'Some jurisdictions do not allow the exclusion or limitation of incidental or consequential damages. In such jurisdictions, the above limitations may not apply to you. Nothing in these Terms excludes or limits liability for: (a) death or personal injury caused by negligence; (b) fraud or fraudulent misrepresentation; (c) any liability that cannot be excluded by law.'
        }
      ]
    },
    {
      id: '12',
      title: 'Indemnification',
      icon: Shield,
      color: '57ACAF',
      content: [
        {
          subtitle: '12.1 Your Indemnification',
          text: 'You agree to indemnify, defend, and hold harmless FabricXAI and its affiliates, officers, directors, employees, agents, licensors, and service providers from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys\' fees) arising out of or relating to: (a) your violation of these Terms; (b) your use of the Service; (c) Your Content; (d) your violation of any rights of another party.'
        },
        {
          subtitle: '12.2 Defense & Settlement',
          text: 'FabricXAI reserves the right to assume the exclusive defense and control of any matter subject to indemnification by you, and you agree to cooperate with our defense of such claims. You may not settle any claim without FabricXAI\'s prior written consent.'
        }
      ]
    },
    {
      id: '13',
      title: 'Dispute Resolution',
      icon: Gavel,
      color: '6F83A7',
      content: [
        {
          subtitle: '13.1 Informal Resolution',
          text: 'Before filing a claim, you agree to try to resolve the dispute informally by contacting legal@fabricxai.com. We will attempt to resolve the dispute informally for at least 30 days before either party may initiate formal proceedings.'
        },
        {
          subtitle: '13.2 Binding Arbitration',
          text: 'If informal resolution fails, any dispute arising out of or relating to these Terms or the Service will be resolved by binding arbitration in accordance with the Commercial Arbitration Rules of the American Arbitration Association (AAA). The arbitration will be conducted in English in New York, New York, USA.'
        },
        {
          subtitle: '13.3 Class Action Waiver',
          text: 'YOU AND FABRICXAI AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING. Unless both you and FabricXAI agree otherwise, the arbitrator may not consolidate more than one person\'s claims.'
        },
        {
          subtitle: '13.4 Exceptions to Arbitration',
          text: 'Either party may seek injunctive or other equitable relief in any court of competent jurisdiction to prevent the actual or threatened infringement, misappropriation, or violation of intellectual property rights.'
        },
        {
          subtitle: '13.5 Small Claims',
          text: 'Either party may bring an individual action in small claims court instead of arbitration if the claim qualifies for small claims court and is brought in an individual capacity.'
        }
      ]
    },
    {
      id: '14',
      title: 'International Compliance',
      icon: Globe,
      color: 'EAB308',
      content: [
        {
          subtitle: '14.1 Export Controls',
          text: 'The Service and underlying technology may be subject to U.S. export control laws, including the Export Administration Regulations (EAR) and sanctions programs administered by OFAC. You agree to comply with all applicable export control laws and not to export, re-export, or transfer the Service to prohibited countries, entities, or persons.'
        },
        {
          subtitle: '14.2 Bangladesh RMG Compliance',
          text: 'For users operating in Bangladesh\'s Ready-Made Garments sector, the Service is designed to support compliance with: (a) Bangladesh Labour Act 2006 and amendments; (b) Accord on Fire and Building Safety; (c) ILO conventions; (d) local labor and environmental regulations. However, compliance remains your responsibility.'
        },
        {
          subtitle: '14.3 EU & UK Compliance',
          text: 'For users in the European Union and United Kingdom, the Service complies with GDPR, UK Data Protection Act 2018, and relevant industry regulations. EU and UK customers benefit from additional data protection rights as outlined in our Privacy Policy.'
        },
        {
          subtitle: '14.4 U.S. Regulations',
          text: 'For users in the United States, the Service is designed to support compliance with relevant federal regulations including customs regulations, textile labeling requirements, and environmental regulations. The Service does not constitute legal or compliance advice.'
        },
        {
          subtitle: '14.5 Sanctions Compliance',
          text: 'You represent and warrant that you are not: (a) located in, organized under the laws of, or a resident of a country subject to U.S. or international sanctions; (b) identified on any U.S. or international restricted party list; (c) otherwise prohibited from using the Service under applicable law.'
        }
      ]
    },
    {
      id: '15',
      title: 'API Usage & Integrations',
      icon: Code,
      color: '57ACAF',
      content: [
        {
          subtitle: '15.1 API Access',
          text: 'Subject to these Terms and your subscription plan, FabricXAI may provide access to Application Programming Interfaces (APIs) to enable integration with third-party applications. API access is subject to rate limits and usage restrictions specified in your plan.'
        },
        {
          subtitle: '15.2 API Keys',
          text: 'You are responsible for maintaining the security of API keys and credentials. You must not share API keys publicly or with unauthorized parties. You are responsible for all activities conducted using your API keys.'
        },
        {
          subtitle: '15.3 Third-Party Integrations',
          text: 'The Service may integrate with third-party applications including Slack, QuickBooks, Google Workspace, Stripe, Salesforce, and Zapier. Your use of third-party integrations is subject to the respective third party\'s terms of service and privacy policy.'
        },
        {
          subtitle: '15.4 Webhooks',
          text: 'The Service supports webhooks for real-time event notifications. You are responsible for securing webhook endpoints and processing webhook data appropriately. FabricXAI is not liable for failed webhook deliveries or data transmission issues.'
        }
      ]
    },
    {
      id: '16',
      title: 'Governing Law & Jurisdiction',
      icon: BookOpen,
      color: '6F83A7',
      content: [
        {
          subtitle: '16.1 Governing Law',
          text: 'These Terms and any dispute arising out of or relating to these Terms or the Service will be governed by the laws of the State of New York, United States, without regard to its conflict of law provisions.'
        },
        {
          subtitle: '16.2 Jurisdiction',
          text: 'Subject to the arbitration provisions in Section 13, you agree to submit to the personal jurisdiction of the state and federal courts located in New York County, New York for any actions not subject to arbitration.'
        },
        {
          subtitle: '16.3 International Users',
          text: 'If you are accessing the Service from outside the United States, you are responsible for compliance with local laws. By using the Service, you consent to the transfer of data to the United States and other jurisdictions as necessary to provide the Service.'
        }
      ]
    },
    {
      id: '17',
      title: 'General Provisions',
      icon: Info,
      color: 'EAB308',
      content: [
        {
          subtitle: '17.1 Entire Agreement',
          text: 'These Terms, together with our Privacy Policy and any other agreements expressly incorporated by reference, constitute the entire agreement between you and FabricXAI regarding the Service and supersede all prior agreements and understandings.'
        },
        {
          subtitle: '17.2 Severability',
          text: 'If any provision of these Terms is found to be invalid or unenforceable, that provision will be enforced to the maximum extent permissible, and the remaining provisions will remain in full force and effect.'
        },
        {
          subtitle: '17.3 Waiver',
          text: 'No waiver of any term of these Terms will be deemed a further or continuing waiver of such term or any other term. FabricXAI\'s failure to assert any right or provision under these Terms will not constitute a waiver of such right or provision.'
        },
        {
          subtitle: '17.4 Assignment',
          text: 'You may not assign or transfer these Terms or your account without FabricXAI\'s prior written consent. FabricXAI may assign these Terms without restriction. Any attempted assignment in violation of this Section is void.'
        },
        {
          subtitle: '17.5 Force Majeure',
          text: 'FabricXAI will not be liable for any failure or delay in performance due to circumstances beyond its reasonable control, including acts of God, war, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, accidents, pandemics, strikes, or shortages of transportation, facilities, fuel, energy, labor, or materials.'
        },
        {
          subtitle: '17.6 Notices',
          text: 'Notices to FabricXAI must be sent to legal@fabricxai.com. Notices to you may be sent to the email address associated with your account. You consent to receive notices electronically, and electronic notices will satisfy any legal communication requirements.'
        },
        {
          subtitle: '17.7 Language',
          text: 'These Terms are written in English. Any translated versions are provided for convenience only. In the event of any conflict between the English version and a translated version, the English version will prevail.'
        }
      ]
    }
  ];

  const lastUpdated = 'January 15, 2025';

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
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#EAB308] to-[#EAB308]/60 flex items-center justify-center shadow-lg shadow-[#EAB308]/30">
                  <Scale className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-5xl font-bold text-white mb-4">
                Terms of Service
              </h1>
              <p className="text-xl text-[#6F83A7] mb-6">
                FabricXAI Enterprise ERP Platform for Textile & Garment Manufacturing
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-[#6F83A7]">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Last Updated: {lastUpdated}</span>
                </div>
                <Separator orientation="vertical" className="h-4 bg-white/20" />
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>Effective Worldwide</span>
                </div>
              </div>

              {/* Important Notice */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-8 bg-gradient-to-br from-[#EAB308]/10 to-[#EAB308]/5 border border-[#EAB308]/20 rounded-xl p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#EAB308]/20 flex items-center justify-center flex-shrink-0">
                    <Info className="w-5 h-5 text-[#EAB308]" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-white font-medium mb-2">Important Legal Agreement</h3>
                    <p className="text-sm text-[#6F83A7] mb-3">
                      These Terms of Service constitute a legally binding agreement between you and FabricXAI. Please read them carefully before using our platform. By accessing or using FabricXAI, you agree to be bound by these terms.
                    </p>
                    <div className="flex items-center gap-4 text-xs text-[#6F83A7]">
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-[#57ACAF]" />
                        <span>GDPR Compliant</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-[#57ACAF]" />
                        <span>CCPA Compliant</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-[#57ACAF]" />
                        <span>Industry Standards</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Table of Contents */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-8 mb-12"
            >
              <h2 className="text-2xl text-white mb-6 flex items-center gap-3">
                <FileText className="w-6 h-6 text-[#57ACAF]" />
                Table of Contents
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {sections.map((section, index) => {
                  const Icon = section.icon;
                  return (
                    <a
                      key={section.id}
                      href={`#section-${section.id}`}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-180 group"
                    >
                      <div className={`w-8 h-8 rounded-lg bg-[#${section.color}]/20 flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-4 h-4 text-[#${section.color}]`} />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-white group-hover:text-[#57ACAF] transition-colors">
                          {section.id}. {section.title}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </motion.div>

            {/* Sections */}
            <div className="space-y-8">
              {sections.map((section, sectionIndex) => {
                const Icon = section.icon;
                return (
                  <motion.div
                    key={section.id}
                    id={`section-${section.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + sectionIndex * 0.05 }}
                    className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-8 scroll-mt-24"
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-[#${section.color}] to-[#${section.color}]/60 flex items-center justify-center flex-shrink-0 shadow-lg`} style={{
                        backgroundColor: `#${section.color}20`,
                        boxShadow: `0 4px 20px rgba(${parseInt(section.color.slice(0, 2), 16)}, ${parseInt(section.color.slice(2, 4), 16)}, ${parseInt(section.color.slice(4, 6), 16)}, 0.2)`
                      }}>
                        <Icon className="w-6 h-6" style={{ color: `#${section.color}` }} />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl text-white mb-1">
                          {section.id}. {section.title}
                        </h2>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {section.content.map((item, index) => (
                        <div key={index}>
                          <h3 className="text-lg text-white mb-3 font-medium">
                            {item.subtitle}
                          </h3>
                          <p className="text-[#6F83A7] leading-relaxed">
                            {item.text}
                          </p>
                          {index < section.content.length - 1 && (
                            <Separator className="bg-white/10 mt-6" />
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-12 bg-gradient-to-br from-[#57ACAF]/10 to-[#57ACAF]/5 border border-[#57ACAF]/20 rounded-xl p-8"
            >
              <h2 className="text-2xl text-white mb-6 flex items-center gap-3">
                <Mail className="w-6 h-6 text-[#57ACAF]" />
                Contact Information
              </h2>
              <p className="text-[#6F83A7] mb-6">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5">
                  <Mail className="w-5 h-5 text-[#57ACAF] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm text-white mb-1">Email</div>
                    <a href="mailto:legal@fabricxai.com" className="text-sm text-[#57ACAF] hover:text-white transition-colors">
                      legal@fabricxai.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5">
                  <Phone className="w-5 h-5 text-[#EAB308] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm text-white mb-1">Phone</div>
                    <a href="tel:+12345678900" className="text-sm text-[#6F83A7] hover:text-white transition-colors">
                      +1 (234) 567-8900
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5">
                  <MapPin className="w-5 h-5 text-[#6F83A7] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm text-white mb-1">Address</div>
                    <div className="text-sm text-[#6F83A7]">
                      123 Business St<br />
                      New York, NY 10001
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="bg-white/10 my-6" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Badge className="bg-[#57ACAF]/20 text-[#57ACAF] border-0">
                    Version 2.0
                  </Badge>
                  <Badge className="bg-[#EAB308]/20 text-[#EAB308] border-0">
                    {lastUpdated}
                  </Badge>
                </div>
                <Button
                  variant="outline"
                  className="border-[#57ACAF]/30 text-[#57ACAF] hover:bg-[#57ACAF]/10"
                  onClick={() => window.print()}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </motion.div>

            {/* Footer */}
            <div className="mt-8 text-center text-sm text-[#6F83A7]">
              <p>© 2025 FabricXAI. All rights reserved. Built for the global textile and garment manufacturing industry.</p>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
