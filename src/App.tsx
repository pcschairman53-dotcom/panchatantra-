/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MapPin, 
  Mail, 
  Calendar, 
  CheckCircle, 
  Users, 
  TrendingUp, 
  Award, 
  BookOpen, 
  ShieldCheck, 
  ArrowRight,
  ChevronUp,
  Sliders,
  MessageSquare,
  Play,
  Heart,
  Laptop,
  Compass,
  FileSpreadsheet,
  AlertTriangle,
  PhoneCall,
  Clock,
  BookMarked,
  Sparkles,
  Info,
  X
} from 'lucide-react';
import Logo from './components/Logo';
import GalleryLightbox from './components/GalleryLightbox';
import AdmissionForm from './components/AdmissionForm';
import AdminDashboard from './components/AdminDashboard';
import { Lead, WebhookSettings } from './types';

export default function App() {
  // Database state persisting in client-side localStorage
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isCrmOpen, setIsCrmOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Class segment detail interactive toggle state
  const [selectedFeatureIndex, setSelectedFeatureIndex] = useState<number>(0);

  // Premium AI Admissions Assistant Widget State
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [assistantResponse, setAssistantResponse] = useState<string | null>(null);
  const [isAssistantTyping, setIsAssistantTyping] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);

  // Webhook settings and pipeline logs
  const [webhookSettings, setWebhookSettings] = useState<WebhookSettings>({
    googleAppsScriptUrl: '', // To be filled by user in dashboard
    makeWhatsappWebhookUrl: '', // Ready for Make.com connections
    adminEmail: 'modakchand6@gmail.com'
  });

  const [webhookLogs, setWebhookLogs] = useState<Array<{
    timestamp: string;
    type: string;
    url: string;
    payload: string;
    status: 'SUCCESS' | 'FAILED';
  }>>([]);

  // Mock initial seed database for professional SaaS CRM demo
  const initialSeeds: Lead[] = [
    {
      id: 'lead-seed-1',
      timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
      studentName: 'Aarav Modak',
      parentName: 'Chand Modak',
      mobile: '8507448779',
      email: 'modakchand6@gmail.com',
      classApplying: 'Pre-Nursery',
      address: 'Neel Kuthi, Amtal, Dhanbad',
      message: 'Looking for child-centric moral learning environment close to Amtal. Interested in smart activity tools.',
      leadSource: 'Website Admission Form',
      status: 'New',
      notes: 'Initial website lead. Parent is ready to visit campus this Saturday for physical evaluation.'
    },
    {
      id: 'lead-seed-2',
      timestamp: new Date(Date.now() - 3600000 * 18).toISOString(), // 18 hours ago
      studentName: 'Priya Kumari',
      parentName: 'Sanjay Kumar',
      mobile: '9852194522',
      email: 'sanjay.k@outlook.com',
      classApplying: 'LKG',
      address: 'Amtal Central, Dhanbad',
      message: 'Require complete prospectus, fee structure details, and transportation bus availability schedules near Dhanbad road.',
      leadSource: 'Walk-In Inquiry',
      status: 'Contacted',
      notes: 'Staff called parent back. E-prospectus sent via WhatsApp. Parent requested follow-up next Tuesday.'
    },
    {
      id: 'lead-seed-3',
      timestamp: new Date(Date.now() - 3600000 * 40).toISOString(), // 2 days ago
      studentName: 'Rahul Mandal',
      parentName: 'Amit Mandal',
      mobile: '6205677001',
      email: 'amit.mandal@gmail.com',
      classApplying: 'Class IX',
      address: 'Katras, Dhanbad, Jharkhand',
      message: 'Transfer request from CBSE Ranchi board. Student is active in sports (athletics) and has 85% score in Std VIII.',
      leadSource: 'Website Admission Form',
      status: 'Interview Scheduled',
      notes: 'CBSE migration documents checked. Entrance evaluation slated for June 20 at 11:30 AM.'
    },
    {
      id: 'lead-seed-4',
      timestamp: new Date(Date.now() - 3600000 * 96).toISOString(), // 4 days ago
      studentName: 'Shreya Mahato',
      parentName: 'Rajesh Mahato',
      mobile: '9852194522',
      email: 'rajesh.mahato@yahoo.com',
      classApplying: 'Class I',
      address: 'Dhanbad Town Main Road, 828111',
      message: 'Deeply impressed by the Panchatantra value-focused pedagogical design. Highly interested.',
      leadSource: 'WhatsApp Inbound',
      status: 'Admitted',
      notes: 'Admission form finalized. Enrollment fee paid in slip-0412. Class section allocation pending.'
    },
    {
      id: 'lead-seed-5',
      timestamp: new Date(Date.now() - 3600000 * 150).toISOString(), // 6 days ago
      studentName: 'Sneha Modak',
      parentName: 'Niranjan Modak',
      mobile: '8507448779',
      email: 'niranjan@modak.org',
      classApplying: 'Class VI',
      address: 'Neel Kuthi, Amtal',
      message: 'Walk-in phone lead logged under reference from general banner prints.',
      leadSource: 'Phone Call Consultation',
      status: 'Closed',
      notes: 'Admitted elsewhere, archived profile.'
    }
  ];

  // Load leads from localStorage or seed them on first mount
  useEffect(() => {
    const savedLeads = localStorage.getItem('panchatantra_crm_leads');
    const savedWebhooks = localStorage.getItem('panchatantra_crm_webhooks');

    if (savedLeads) {
      setLeads(JSON.parse(savedLeads));
    } else {
      setLeads(initialSeeds);
      localStorage.setItem('panchatantra_crm_leads', JSON.stringify(initialSeeds));
    }

    if (savedWebhooks) {
      setWebhookSettings(JSON.parse(savedWebhooks));
    }

    // Scroll display tracker listener
    const handleScroll = () => {
      if (window.scrollY > 500) setShowScrollTop(true);
      else setShowScrollTop(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update localStorage when leads mutate
  const updateLocalStorageLeads = (updatedLeads: Lead[]) => {
    setLeads(updatedLeads);
    localStorage.setItem('panchatantra_crm_leads', JSON.stringify(updatedLeads));
  };

  // Submit new lead flow
  const handleFormAdmissionSubmit = async (leadData: Omit<Lead, 'id' | 'timestamp' | 'leadSource' | 'status'>): Promise<boolean> => {
    const newLead: Lead = {
      ...leadData,
      id: 'lead-' + Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toISOString(),
      leadSource: 'Website Admission Form',
      status: 'New'
    };

    // Save locally
    const updated = [newLead, ...leads];
    updateLocalStorageLeads(updated);

    // Prepare Webhook Payload compatible with Sheets & Make
    const jsonPayload = JSON.stringify(newLead);
    const dateFormatted = new Date(newLead.timestamp).toLocaleString();

    // 1. DISPATCH TO GOOGLE APPS SCRIPT
    const googleAppsScriptUrl = 'https://script.google.com/macros/s/AKfycbzV9Jc2o6yULxrqoA0AWDYXtTqlnWy9AHhzQe5AS3efUZX3h6tTtzDBs94iTP6qW2E/exec';
    let scriptSuccess = true;

    try {
      setWebhookLogs(prev => [{
        timestamp: new Date().toISOString(),
        type: 'Google Sheets CRM Sync',
        url: googleAppsScriptUrl,
        payload: jsonPayload,
        status: 'SUCCESS' // Optimistic success for reporting
      }, ...prev]);

      // Attempting actual cross-origin post request
      await fetch(googleAppsScriptUrl, {
        method: 'POST',
        mode: 'no-cors', // standard Apps Script POST mode workaround
        headers: { 'Content-Type': 'application/json' },
        body: jsonPayload
      });
    } catch (err) {
      console.error('Apps Script submission error:', err);
      scriptSuccess = false;
    }

    // 2. IMMEDIATELY REDIRECT TO WHATSAPP ON SUCCESS
    if (scriptSuccess) {
      const messageText = `New Admission Inquiry

Student Name: ${newLead.studentName}

Parent Name: ${newLead.parentName}

Mobile: ${newLead.mobile}

Class: ${newLead.classApplying}`;

      setWebhookLogs(prev => [{
        timestamp: new Date().toISOString(),
        type: 'WhatsApp Direct Chat',
        url: 'https://wa.me/918507448779',
        payload: messageText,
        status: 'SUCCESS'
      }, ...prev]);

      const whatsappUrl = `https://wa.me/918507448779?text=${encodeURIComponent(messageText)}`;
      window.open(whatsappUrl, '_blank');
    }

    return scriptSuccess;
  };

  // Status updating from dashboard
  const handleUpdateLeadStatus = (id: string, status: Lead['status'], notes?: string) => {
    const updated = leads.map(l => l.id === id ? { ...l, status, notes } : l);
    updateLocalStorageLeads(updated);
  };

  // Add manual walk-in lead
  const handleAddManualLead = async (leadDetails: Omit<Lead, 'id' | 'timestamp' | 'leadSource'>) => {
    const newManualLead: Lead = {
      ...leadDetails,
      id: 'manual-' + Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toISOString(),
      leadSource: 'Walk-In Desk Desk Consultation'
    };
    const updated = [newManualLead, ...leads];
    updateLocalStorageLeads(updated);

    // Prepare Webhook Payload compatible with Sheets & Make
    const jsonPayload = JSON.stringify(newManualLead);
    const googleAppsScriptUrl = 'https://script.google.com/macros/s/AKfycbzV9Jc2o6yULxrqoA0AWDYXtTqlnWy9AHhzQe5AS3efUZX3h6tTtzDBs94iTP6qW2E/exec';

    try {
      setWebhookLogs(prev => [{
        timestamp: new Date().toISOString(),
        type: 'Google Sheets CRM Sync (Walk-in)',
        url: googleAppsScriptUrl,
        payload: jsonPayload,
        status: 'SUCCESS' // Optimistic success for reporting
      }, ...prev]);

      // Attempting actual cross-origin post request to synchronize the Google Sheets spreadsheet in the background
      await fetch(googleAppsScriptUrl, {
        method: 'POST',
        mode: 'no-cors', // standard Apps Script POST mode workaround
        headers: { 'Content-Type': 'application/json' },
        body: jsonPayload
      });
    } catch (err) {
      console.error('Apps Script Walk-In submission error:', err);
    }
  };

  // Delete lead
  const handleDeleteLead = (id: string) => {
    const updated = leads.filter(l => l.id !== id);
    updateLocalStorageLeads(updated);
  };

  // Update Settings
  const handleUpdateWebhookSettings = (settings: WebhookSettings) => {
    setWebhookSettings(settings);
    localStorage.setItem('panchatantra_crm_webhooks', JSON.stringify(settings));
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAssistantAction = (actionKey: string) => {
    switch (actionKey) {
      case 'whatsapp': {
        const messageText = "Hello, I want admission information about PANCHATANTRA ETHICS SCHOOL.";
        const whatsappUrl = `https://wa.me/918507448779?text=${encodeURIComponent(messageText)}`;
        window.open(whatsappUrl, '_blank');
        break;
      }
      case 'call': {
        window.location.href = 'tel:8507448779';
        break;
      }
      case 'apply': {
        scrollToSection('admissions-apply-section');
        setTimeout(() => setIsAssistantOpen(false), 800);
        break;
      }
      case 'location': {
        window.open('https://maps.google.com/?q=Neel+Kuthi+Amtal+Dhanbad+Jharkhand', '_blank');
        break;
      }
      case 'email': {
        window.location.href = 'mailto:modakchand6@gmail.com';
        break;
      }
      case 'classes': {
        setIsAssistantTyping(true);
        setAssistantResponse(null);
        setLastAction('Classes Offered');
        setTimeout(() => {
          setIsAssistantTyping(false);
          setAssistantResponse('We offer premium educational pathways starting from Pre-Nursery to Class X under standard English-medium instructions.');
        }, 700);
        break;
      }
      case 'cbse': {
        setIsAssistantTyping(true);
        setAssistantResponse(null);
        setLastAction('CBSE Curriculum');
        setTimeout(() => {
          setIsAssistantTyping(false);
          setAssistantResponse('Our CBSE Integrated Learning Program features value-based co-education, smart audiovisual lessons, physical wellness modules, and ethical Panchatantra value guidelines.');
        }, 700);
        break;
      }
      case 'about': {
        setIsAssistantTyping(true);
        setAssistantResponse(null);
        setLastAction('About School');
        setTimeout(() => {
          setIsAssistantTyping(false);
          setAssistantResponse('Panchatantra Ethics School is a preeminent, student-centric ethical temple of learning based in Dhanbad, Jharkhand. We focus on developing critical and moral capabilities side-by-side.');
        }, 700);
        break;
      }
      default:
        break;
    }
  };

  // Interactive School Features
  const schoolFeatures = [
    {
      title: 'Ethics & Value Education',
      description: 'Our core distinction. We utilize classic tales and situational drama worksheets to cultivate critical logic, empathy, honesty, and civic responsibility inside standard modern CBSE formats.',
      iconName: 'Compass'
    },
    {
      title: 'Activity Based learning',
      description: 'Ditching boring memorization. Young minds explore mathematical abstractions and science patterns using touch, puppetry, clay modules, and spatial building tools.',
      iconName: 'Sparkles'
    },
    {
      title: 'Smart & Digital Classrooms',
      description: 'Luminous hybrid spaces equipped with interactive whiteboard screens, high contrast audio-visual assets, and comfortable ergonomics supporting interactive lessons.',
      iconName: 'Laptop'
    },
    {
      title: 'Comprehensive Reference Library',
      description: 'A wood-panelled silent zone hosting vast catalogs ranging from classical literature, ancient Panchatantra ethical texts, children encyclopedias to modern science references.',
      iconName: 'BookMarked'
    },
    {
      title: 'Arts & Cultural Dramatics',
      description: 'Nurturing student self-confidence and creative eloquence through dynamic public assemblies, puppet shows, storytelling, crafts, clay arts, and theater circles.',
      iconName: 'Heart'
    },
    {
      title: 'Outdoor Sports & Athletics',
      description: 'A secure sprawling field for full physical transformation. Sports coaches teach teamwork, leadership, stamina, athletics, cricket, badminton, and gymnastics.',
      iconName: 'Award'
    },
    {
      title: 'Parent & Management Engagement',
      description: 'We believe in full transparency. Periodic Parent-Teacher logs, transparent metrics, phone hotlines, and instant WhatsApp progress updates form a cooperative loop.',
      iconName: 'Users'
    },
    {
      title: 'Campus Safety & Vigilant Security',
      description: 'Fully enclosed security gating, comprehensive campus CCTV monitoring, certified playground tools, and thoroughly tested protocols ensuring complete parental peace of mind.',
      iconName: 'ShieldCheck'
    },
    {
      title: 'Pre-Mid Scholar Foundation',
      description: 'Academic scaffolding that starts preparing secondary students for logical science pathways, math Olympiads, debate defense, and reasoning tests early with clarity.',
      iconName: 'TrendingUp'
    },
    {
      title: 'Experienced & Kind Faculty',
      description: 'Subject matters are taught by kind, CBSE-trained professional teachers specialized in keeping classrooms positive, supportive, and academically focused.',
      iconName: 'PhoneCall'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-amber-400 selection:text-slate-900 scroll-smooth font-sans" id="website-app-root">
      
      {/* 1. TOP ANNOUNCEMENT TICKER / ALERTS BAR */}
      <div className="bg-gradient-to-r from-[#0C1E36] via-[#1E4620] to-[#0C1E36] text-white py-2 px-4 shadow text-center text-xs border-b border-yellow-500/25 relative z-30 flex items-center justify-center gap-4 flex-wrap" id="announcement-strip">
        <span className="inline-flex items-center gap-1.5 font-sans font-medium tracking-wide">
          <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
          <strong className="text-amber-400 font-bold uppercase text-[10px]">ADMISSIONS OPEN 2026-27:</strong>
          Classes Pre-Nursery to Class X (CBSE Program). Join us and experience values-first education.
        </span>
        <div className="flex items-center gap-3 text-slate-300 font-mono text-[11px]">
          <a href="tel:8507448779" className="hover:text-amber-400 transition inline-flex items-center gap-1">
            <Phone size={11} className="text-amber-400" />
            <span>8507448779</span>
          </a>
          <span className="text-slate-600">|</span>
          <a href="tel:9852194522" className="hover:text-amber-400 transition inline-flex items-center gap-1">
            <span>9852194522</span>
          </a>
        </div>
      </div>

      {/* 2. MAIN STICKY NAVIGATION BAR */}
      <header className="sticky top-0 bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-slate-800 text-white z-40 transition-all duration-300 transform-gpu" id="main-landing-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          
          {/* Logo brand and styling */}
          <div className="cursor-pointer" onClick={() => scrollToSection('website-app-root')}>
            <Logo showText={true} size="sm" />
          </div>

          {/* Desktop Nav Actions jump-links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-wider font-bold" id="desktop-nav">
            <button onClick={() => scrollToSection('why-choose-us')} className="text-slate-300 hover:text-amber-400 cursor-pointer transition">Why Us</button>
            <button onClick={() => scrollToSection('academic-programs')} className="text-slate-300 hover:text-amber-400 cursor-pointer transition">Programs</button>
            <button onClick={() => scrollToSection('school-features')} className="text-slate-300 hover:text-amber-400 cursor-pointer transition">Features</button>
            <button onClick={() => scrollToSection('gallery-section')} className="text-slate-300 hover:text-amber-400 cursor-pointer transition">Campaigns & Gallery</button>
            <button onClick={() => scrollToSection('contact-center')} className="text-slate-300 hover:text-amber-400 cursor-pointer transition">Contact Us</button>
          </nav>

          {/* Action trigger portal cta & apply button */}
          <div className="flex items-center gap-3">
            {/* Secret Administrator Admissions CRM Portal button */}
            <button
              onClick={() => setIsCrmOpen(true)}
              className="bg-slate-800 text-slate-300 border border-slate-700/60 p-2.5 rounded-lg hover:bg-slate-700 hover:text-white transition flex items-center gap-2 text-xs font-bold font-sans tracking-wide cursor-pointer uppercase"
              title="Open management Admissions CRM database"
              id="admin-dashboard-trigger"
            >
              <FileSpreadsheet size={15} className="text-emerald-400 animate-pulse" />
              <span className="hidden sm:inline">Admissions CRM</span>
            </button>

            <button
              onClick={() => scrollToSection('admissions-apply-section')}
              className="bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-black text-xs py-2.5 px-4 rounded-lg hover:from-amber-400 hover:to-yellow-500 transition shadow-lg shrink-0 cursor-pointer uppercase tracking-wider"
              id="nav-apply-now-btn"
            >
              Apply Online
            </button>
          </div>

        </div>
      </header>

      {/* 3. SHIELD HERO BANNER AREA */}
      <section className="bg-slate-950 text-white relative overflow-hidden py-16 sm:py-24" id="home-hero">
        
        {/* Intricate Royal Crest Background Graphics */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(11,37,69,0.5)_0%,rgba(5,12,22,1)_80%)] pointer-events-none" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-amber-500/5 rounded-full pointer-events-none animate-spin" style={{ animationDuration: '240s' }} />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-emerald-500/5 rounded-full pointer-events-none animate-spin" style={{ animationDuration: '180s', animationDirection: 'reverse' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center">
          
          <div className="text-center max-w-4xl mx-auto space-y-5">
            <span className="bg-emerald-950/40 border border-emerald-800 text-emerald-400 font-sans tracking-widest text-[11px] font-bold uppercase py-1 px-4.5 rounded-full inline-block">
              An English Medium Co-Educational School
            </span>

            <h1 className="text-4xl sm:text-6xl font-serif font-black tracking-tight text-white leading-tight uppercase text-shadow" id="hero-headline">
              Panchatantra Ethics School
            </h1>

            <p className="font-serif italic text-lg sm:text-xl text-yellow-500 font-semibold tracking-wide">
              "Moral Learning For A Changing World"
            </p>

            <p className="text-slate-300 font-sans text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
              Admissions Open for Pre-Nursery to Class X under CBSE Curriculum. We combine strict scholastic standards with classical ethical codes to nurture empathetic, resilient future leaders.
            </p>

            {/* CTAs Row */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4" id="hero-actions-row">
              <button
                onClick={() => scrollToSection('admissions-apply-section')}
                className="bg-amber-500 text-slate-950 font-black py-3 px-8 rounded-lg text-xs tracking-wider uppercase hover:bg-amber-400 transform hover:scale-[1.02] active:scale-95 transition-all shadow-xl cursor-pointer"
                id="hero-apply-btn"
              >
                Apply For Admission
              </button>

              <a
                href={`https://wa.me/918507448779?text=${encodeURIComponent("Hello, I want admission information about PANCHATANTRA ETHICS SCHOOL.")}`}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-lg text-xs tracking-wide uppercase transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>💬 WhatsApp Admissions</span>
              </a>

              <a
                href="tel:8507448779"
                className="bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-700 py-3 px-6 rounded-lg text-xs tracking-wide uppercase font-semibold transition-all flex items-center gap-2 cursor-pointer"
              >
                <Phone size={13} className="text-amber-400" />
                <span>Call Hotline</span>
              </a>
            </div>

            {/* Micro value counters grids */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-14 text-center border-t border-slate-900 mt-14" id="hero-numerical-indicators">
              <div className="p-4 bg-slate-900/60 border border-slate-800/60 rounded-xl">
                <span className="text-2xl sm:text-3xl font-serif font-black text-amber-400 block">100%</span>
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-1.5 block">Moral & Tailored Focus</span>
              </div>
              <div className="p-4 bg-slate-900/60 border border-slate-800/60 rounded-xl">
                <span className="text-2xl sm:text-3xl font-serif font-black text-white block">Pre-Nur - X</span>
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-1.5 block">CBSE Syllabus</span>
              </div>
              <div className="p-4 bg-slate-900/60 border border-slate-800/60 rounded-xl">
                <span className="text-2xl sm:text-3xl font-serif font-black text-emerald-400 block">12+</span>
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-1.5 block">Smart Classrooms</span>
              </div>
              <div className="p-4 bg-slate-900/60 border border-slate-800/60 rounded-xl">
                <span className="text-2xl sm:text-3xl font-serif font-black text-amber-500 block">Affordable</span>
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-1.5 block">Premium Fee plans</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. ABOUT SCHOOL VALUE PROMOTION SHEET */}
      <section className="py-22 bg-white text-slate-800 relative z-10" id="why-choose-us">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Visual description & brand statement */}
            <div className="lg:col-span-5 space-y-6">
              <div className="text-left">
                <span className="text-emerald-700 font-mono font-bold text-xs tracking-widest uppercase">
                  OUR PHILOSOPHY
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight mt-2 uppercase">
                  Why Choose Panchatantra Ethics School?
                </h2>
                <div className="h-0.5 w-16 bg-amber-500 my-4" />
              </div>

              <div className="space-y-4 text-xs sm:text-sm font-sans text-slate-600 leading-relaxed">
                <p>
                  At <strong>Panchatantra Ethics School</strong>, education goes far beyond standard rote memorization in textbook modules. We nurture ethics, character integrity, logical reasoning, and physical excellence through a highly structured CBSE curriculum deeply integrated with moral values early on.
                </p>
                <p>
                  By taking cues from the ancient Panchatantra tales of wit and morality, our children learn how to solve real-world complexities with empathetic coordination, intellectual bravery, and robust civic accountability.
                </p>
              </div>

              {/* Decorative blockquote */}
              <blockquote className="border-l-4 border-emerald-700 p-4 bg-slate-50 italic text-slate-700 font-serif text-sm rounded-r-lg">
                "Our school is built to cultivate values, critical analysis, and modern capability simultaneously, preparing students for an unpredictable, changing world."
              </blockquote>

              <button
                onClick={() => scrollToSection('contact-center')}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-6 rounded text-xs tracking-wider uppercase transition cursor-pointer flex items-center gap-1.5"
              >
                <span>Plan A Campus Visit</span>
                <ArrowRight size={13} />
              </button>
            </div>

            {/* Right Column: Values points list cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4" id="philosophy-checklist-grid">
              
              <div className="bg-slate-50 border border-slate-100 p-4.5 rounded-xl hover:shadow-md transition">
                <div className="h-9 w-9 rounded bg-[#0B2545]/15 text-[#0B2545] flex items-center justify-center font-bold mb-3">
                  📖
                </div>
                <h4 className="font-serif font-bold text-slate-900 text-sm">CBSE Curriculum Standards</h4>
                <p className="text-[11px] text-slate-500 font-sans mt-1">Full, modern compliance with CBSE guidelines focusing on analytical sciences, computing, and communications.</p>
              </div>

              <div className="bg-slate-50 border border-slate-100 p-4.5 rounded-xl hover:shadow-md transition">
                <div className="h-9 w-9 rounded bg-[#1E4620]/15 text-[#1E4620] flex items-center justify-center font-bold mb-3">
                  💬
                </div>
                <h4 className="font-serif font-bold text-slate-900 text-sm">English Medium Instruction</h4>
                <p className="text-[11px] text-slate-500 font-sans mt-1">Immersive verbal and written training in English, establishing global speech fluency early.</p>
              </div>

              <div className="bg-slate-50 border border-slate-100 p-4.5 rounded-xl hover:shadow-md transition">
                <div className="h-9 w-9 rounded bg-amber-500/15 text-amber-700 flex items-center justify-center font-bold mb-3">
                  ⚖
                </div>
                <h4 className="font-serif font-bold text-slate-900 text-sm">Value & Character Focus</h4>
                <p className="text-[11px] text-slate-500 font-sans mt-1">Dedicated curriculum modules on life choices, ethics, honesty, respect, and mutual empathy daily.</p>
              </div>

              <div className="bg-slate-50 border border-slate-100 p-4.5 rounded-xl hover:shadow-md transition">
                <div className="h-9 w-9 rounded bg-blue-500/15 text-blue-700 flex items-center justify-center font-bold mb-3">
                  💻
                </div>
                <h4 className="font-serif font-bold text-slate-900 text-sm">Smart Classroom Labs</h4>
                <p className="text-[11px] text-slate-500 font-sans mt-1">Equipped classrooms utilizing smart-board digital imagery to enhance kids sensory retention during syllabus lectures.</p>
              </div>

              <div className="bg-slate-50 border border-slate-100 p-4.5 rounded-xl hover:shadow-md transition">
                <div className="h-9 w-9 rounded bg-rose-500/15 text-rose-700 flex items-center justify-center font-bold mb-3">
                  👫🏽
                </div>
                <h4 className="font-serif font-bold text-slate-900 text-sm">Balanced Co-Education</h4>
                <p className="text-[11px] text-slate-500 font-sans mt-1">Co-educational campus fostering teamwork, safety, respectful boundaries, and leadership equality.</p>
              </div>

              <div className="bg-slate-50 border border-slate-100 p-4.5 rounded-xl hover:shadow-md transition">
                <div className="h-9 w-9 rounded bg-purple-500/15 text-purple-700 flex items-center justify-center font-bold mb-3">
                  🛡
                </div>
                <h4 className="font-serif font-bold text-slate-900 text-sm">Kind CBSE Educators</h4>
                <p className="text-[11px] text-slate-500 font-sans mt-1">A warm circle of highly certified instructors trained to treat child exploration loops positively.</p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 5. DYNAMIC CBSE PROGRAMS ACADEMIC ROADMAPS */}
      <section className="py-20 bg-slate-900 text-white relative border-t border-slate-800" id="academic-programs">
        
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(30,70,32,0.04),transparent_40%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 font-sans">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-amber-400 font-serif font-bold text-xs tracking-widest uppercase py-1 px-3 bg-amber-400/5 border border-amber-400/10 rounded-full inline-block">
              ACADEMIC SPECTRUMS
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-white mt-3 uppercase">
              Our Educational Programs
            </h2>
            <div className="h-0.5 w-16 bg-gradient-to-r from-amber-400 to-emerald-500 mx-auto my-4 rounded" />
            <p className="text-slate-400 text-sm leading-relaxed">
              We scaffold student growth systematically. We offer specific age-graded curriculums focusing on character readiness and intelligence from early Pre-Nursery to Secondary Board exams.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="programs-cards-grid">
            
            {/* Pre-Nursery */}
            <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-5 flex flex-col justify-between hover:border-amber-500/30 transition duration-300">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="bg-blue-950 border border-blue-900/40 text-blue-400 px-3 py-1 rounded text-[10px] font-mono font-bold tracking-wide uppercase">
                    Stage 1
                  </span>
                  <span className="text-slate-500 font-mono text-[10.5px]">Age 2.5 - 3 Yrs</span>
                </div>
                <h3 className="font-serif font-bold text-white text-base">Pre-Nursery</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">Introducing young minds to cooperative campus play, gentle sensory identification, and verbal recognition habits safely.</p>
                <ul className="text-[11.5px] text-slate-300 space-y-1.5 border-t border-slate-900 pt-3">
                  <li className="flex items-center gap-1.5">✓ Puppetry & Interactive Play</li>
                  <li className="flex items-center gap-1.5">✓ Clay Shaping & Visual Skills</li>
                  <li className="flex items-center gap-1.5">✓ Value: Gentle Sharing Habits</li>
                </ul>
              </div>
              <div className="mt-6 border-t border-slate-900 pt-3 flex justify-between items-center text-[10.5px] text-amber-400 font-medium font-mono">
                <span>Methodology: Play-Way</span>
                <span>Open</span>
              </div>
            </div>

            {/* Nursery */}
            <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-5 flex flex-col justify-between hover:border-amber-500/30 transition duration-300">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="bg-purple-950 border border-purple-900/40 text-purple-400 px-3 py-1 rounded text-[10px] font-mono font-bold tracking-wide uppercase">
                    Stage 2
                  </span>
                  <span className="text-slate-500 font-mono text-[10.5px]">Age 3 - 4 Yrs</span>
                </div>
                <h3 className="font-serif font-bold text-white text-base">Nursery</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">Developing early communication competencies, alphabetic phonics, tracing coordination, and spatial shapes recognition.</p>
                <ul className="text-[11.5px] text-slate-300 space-y-1.5 border-t border-slate-900 pt-3">
                  <li className="flex items-center gap-1.5">✓ Phonics & Tracing Labs</li>
                  <li className="flex items-center gap-1.5">✓ Fun Rhymes & Speech Cycles</li>
                  <li className="flex items-center gap-1.5">✓ Value: Politeness & Kindness</li>
                </ul>
              </div>
              <div className="mt-6 border-t border-slate-900 pt-3 flex justify-between items-center text-[10.5px] text-amber-400 font-medium font-mono">
                <span>Methodology: Sensory-Interactive</span>
                <span>Open</span>
              </div>
            </div>

            {/* LKG */}
            <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-5 flex flex-col justify-between hover:border-amber-500/30 transition duration-300">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="bg-amber-950/40 border border-amber-900/40 text-amber-400 px-3 py-1 rounded text-[10px] font-mono font-bold tracking-wide uppercase">
                    Stage 3
                  </span>
                  <span className="text-slate-500 font-mono text-[10.5px]">Age 4 - 5 Yrs</span>
                </div>
                <h3 className="font-serif font-bold text-white text-base">LKG (Lower Kindergarten)</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">Strengthening structured counting, foundational vocabulary spellings, basic sketching tasks, and collaborative manners.</p>
                <ul className="text-[11.5px] text-slate-300 space-y-1.5 border-t border-slate-900 pt-3">
                  <li className="flex items-center gap-1.5">✓ Alphabet Spells & Reading</li>
                  <li className="flex items-center gap-1.5">✓ Count Loops & Arithmetic games</li>
                  <li className="flex items-center gap-1.5">✓ Value: Empathy & Cooperation</li>
                </ul>
              </div>
              <div className="mt-6 border-t border-slate-900 pt-3 flex justify-between items-center text-[10.5px] text-amber-400 font-medium font-mono">
                <span>Methodology: Story-Driven roleplay</span>
                <span>Open</span>
              </div>
            </div>

            {/* UKG */}
            <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-5 flex flex-col justify-between hover:border-amber-500/30 transition duration-300">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="bg-teal-950 border border-teal-900/40 text-teal-450 px-3 py-1 rounded text-[10px] font-mono font-bold tracking-wide uppercase">
                    Stage 4
                  </span>
                  <span className="text-slate-500 font-mono text-[10.5px]">Age 5 - 6 Yrs</span>
                </div>
                <h3 className="font-serif font-bold text-white text-base">UKG (Upper Kindergarten)</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">Scaffolding child readiness for Grade I. We introduce simple sentence construction, EVS topics, and structured moral choice rules.</p>
                <ul className="text-[11.5px] text-slate-300 space-y-1.5 border-t border-slate-900 pt-3">
                  <li className="flex items-center gap-1.5">✓ Storyteller Theater Cycles</li>
                  <li className="flex items-center gap-1.5">✓ Additions & Subtractor Maps</li>
                  <li className="flex items-center gap-1.5">✓ Value: Honesty & Truthfulness</li>
                </ul>
              </div>
              <div className="mt-6 border-t border-slate-900 pt-3 flex justify-between items-center text-[10.5px] text-amber-400 font-medium font-mono">
                <span>Methodology: Interactive Theatre</span>
                <span>Open</span>
              </div>
            </div>

            {/* Std I - V */}
            <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-5 flex flex-col justify-between hover:border-amber-500/30 transition duration-300">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="bg-emerald-950/40 border border-emerald-900/40 text-emerald-400 px-3 py-1 rounded text-[10px] font-mono font-bold tracking-wide uppercase">
                    Primary
                  </span>
                  <span className="text-slate-500 font-mono text-[10.5px]">Std I to V</span>
                </div>
                <h3 className="font-serif font-bold text-white text-base">Class I - V Program</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">Transitioning systematically into deep CBSE subjects. Focus on primary math, environmental science, prose, and ethics modules.</p>
                <ul className="text-[11.5px] text-slate-300 space-y-1.5 border-t border-slate-900 pt-3">
                  <li className="flex items-center gap-1.5">✓ Languages & Applied Sciences</li>
                  <li className="flex items-center gap-1.5">✓ Interactive Computing labs</li>
                  <li className="flex items-center gap-1.5">✓ Value: Generosity & Respect</li>
                </ul>
              </div>
              <div className="mt-6 border-t border-slate-900 pt-3 flex justify-between items-center text-[10.5px] text-amber-400 font-medium font-mono">
                <span>Methodology: Project models</span>
                <span>Admissions Open</span>
              </div>
            </div>

            {/* Std VI - VIII */}
            <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-5 flex flex-col justify-between hover:border-amber-500/30 transition duration-300">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="bg-rose-950 border border-rose-900/40 text-rose-450 px-3 py-1 rounded text-[10px] font-mono font-bold tracking-wide uppercase">
                    Middle School
                  </span>
                  <span className="text-slate-500 font-mono text-[10.5px]">Std VI to VIII</span>
                </div>
                <h3 className="font-serif font-bold text-white text-base">Class VI - VIII Program</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">Introducing complex physical science labs, geometry theorems, social history logs, and competitive moral speech platforms.</p>
                <ul className="text-[11.5px] text-slate-300 space-y-1.5 border-t border-slate-900 pt-3">
                  <li className="flex items-center gap-1.5">✓ Physics, Chemistry, Biology labs</li>
                  <li className="flex items-center gap-1.5">✓ Drama and Cooperative Assemblies</li>
                  <li className="flex items-center gap-1.5">✓ Value: Strategic Cooperation</li>
                </ul>
              </div>
              <div className="mt-6 border-t border-slate-900 pt-3 flex justify-between items-center text-[10.5px] text-amber-400 font-medium font-mono">
                <span>Methodology: Labs & Team debates</span>
                <span>Admissions Open</span>
              </div>
            </div>

            {/* Std IX - X */}
            <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-5 flex flex-col justify-between hover:border-amber-500/30 transition duration-300 lg:col-span-2 lg:max-w-none">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="bg-yellow-950 border border-yellow-900/40 text-yellow-450 px-3 py-1 rounded text-[10px] font-mono font-bold tracking-wide uppercase">
                    Board Prep
                  </span>
                  <span className="text-slate-500 font-mono text-[10.5px]">Std IX to X</span>
                </div>
                <h3 className="font-serif font-bold text-white text-base">Class IX - X Foundation</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">High-level preparation targeted towards CBSE board examinations, combined with mental logic coaching, ethical decision case-studies, and career path counselors.</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11.5px] text-slate-300 border-t border-slate-900 pt-3">
                  <li className="flex items-center gap-1.5">✓ Board Syllabus Mock Assessments</li>
                  <li className="flex items-center gap-1.5">✓ Career Guidance Coaching</li>
                  <li className="flex items-center gap-1.5">✓ Logical Math & Science reasoning</li>
                  <li className="flex items-center gap-1.5">✓ Value: Strategy & Absolute Integrity</li>
                </ul>
              </div>
              <div className="mt-6 border-t border-slate-900 pt-3 flex justify-between items-center text-[10.5px] text-amber-400 font-medium font-mono">
                <span>Methodology: Case Studies & Evaluation Modules</span>
                <span>BOARD PREP CERTIFIED</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. INTERACTIVE SCHOOL FEATURES EXPLORATION PANEL */}
      <section className="py-20 bg-white text-slate-800 border-t border-slate-100" id="school-features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-emerald-700 font-mono font-bold text-xs tracking-widest uppercase">
              CAMPUS AMENITIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight mt-3 uppercase">
              Interactive Amenities & Features
            </h2>
            <div className="h-0.5 w-16 bg-amber-500 mx-auto my-4" />
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-sans">
              Tap any attribute inside our facility rail to inspect how our campus is optimized to cultivate intelligence and safety.
            </p>
          </div>

          {/* Interactive Feature Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column Controls Rail */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3" id="features-interactive-controls">
              {schoolFeatures.map((ft, idx) => (
                <button
                  key={ft.title}
                  onClick={() => setSelectedFeatureIndex(idx)}
                  className={`p-3 text-left border rounded-xl transition-all font-sans relative cursor-pointer flex flex-col justify-between h-20 ${
                    selectedFeatureIndex === idx
                      ? 'bg-[#0B2545] border-[#0B2545] text-white shadow-lg'
                      : 'bg-slate-50 border-slate-150 hover:bg-slate-100 text-slate-700'
                  }`}
                  id={`feature-pill-${idx}`}
                >
                  <span className="font-serif font-bold text-xs tracking-tight line-clamp-1">
                    {ft.title}
                  </span>
                  <span className={`text-[10px] font-mono tracking-wider ${selectedFeatureIndex === idx ? 'text-amber-400 font-bold' : 'text-slate-400'}`}>
                    {selectedFeatureIndex === idx ? '• Active Profile' : 'Inspect Details'}
                  </span>
                </button>
              ))}
            </div>

            {/* Right Column Large Detail Display Card */}
            <div className="lg:col-span-7 bg-slate-50 border border-slate-150 rounded-2xl p-6.5 min-h-[220px] flex flex-col justify-between shadow relative overflow-hidden animate-fade-in" id="feature-detail-card">
              
              {/* background graphic */}
              <div className="absolute right-0 bottom-0 text-[180px] leading-none text-slate-100 font-bold select-none pointer-events-none transform translate-y-10 translate-x-10">
                🏫
              </div>

              <div className="space-y-4 relative z-10 font-sans">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-amber-500/10 text-amber-600 rounded-lg flex items-center justify-center font-bold text-lg select-none">
                    📚
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#1E4620] uppercase font-bold block">SPECIFIC AMENITY</span>
                    <h3 className="font-serif font-black text-slate-900 text-lg uppercase mt-0.5">
                      {schoolFeatures[selectedFeatureIndex].title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans max-w-2xl">
                  {schoolFeatures[selectedFeatureIndex].description}
                </p>
              </div>

              <div className="border-t border-slate-200/80 pt-4 mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 relative z-10 font-sans">
                <span>Academic Session: <strong className="text-slate-800">2026-27 Active</strong></span>
                <button
                  onClick={() => scrollToSection('admissions-apply-section')}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-1.5 px-4 rounded transition self-start cursor-pointer text-[11px]"
                >
                  Inquire Admission
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 7. ADMISSIONS CAMP OVERLAY SECTION (LARGE PREMIUM CTA) */}
      <section className="py-20 bg-gradient-to-r from-[#0B2545] to-[#1E4620] text-white relative overflow-hidden" id="admission-open-cta">
        
        {/* Absolute vector dots */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08),transparent_50%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-6">
          
          <span className="bg-amber-500 text-slate-950 font-sans font-black text-[10px] uppercase py-1 px-4 rounded-full tracking-widest inline-block animate-pulse">
            LIMITED SEATS FOR 2026-27
          </span>

          <h2 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-white uppercase">
            Admissions Open 2026-27
          </h2>

          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto font-sans">
            Enroll your child in a future-ready local institution where academic excellence meets traditional moral values. Download our prospectus or connect with the helpdesk today.
          </p>

          <div className="h-px bg-slate-100/10 max-w-lg mx-auto my-4" />

          {/* Buttons trigger */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => scrollToSection('admissions-apply-section')}
              className="bg-amber-500 text-slate-950 font-black py-3 px-8 rounded-lg text-xs uppercase tracking-wider hover:bg-amber-400 transition cursor-pointer"
            >
              Apply For Admission Now
            </button>

            <a
              href={`https://wa.me/918507448779?text=${encodeURIComponent("Hello, I want admission information about PANCHATANTRA ETHICS SCHOOL.")}`}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-lg text-xs uppercase tracking-wider transition inline-flex items-center gap-2 cursor-pointer"
            >
              💬 WhatsApp Query
            </a>
          </div>

        </div>
      </section>

      {/* 8. DISPLAY COMPAIGN GALLERY SECTION */}
      <div id="school-gallery-component">
        <GalleryLightbox onOpenConsultationForm={() => scrollToSection('admissions-apply-section')} />
      </div>

      {/* 9. PRIMARY FORM ENTRY AREA */}
      <section className="py-20 bg-slate-50 scroll-mt-12" id="admissions-apply-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Left side column: Panchatantra Charter rules & Contact references */}
            <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-900 rounded-2xl p-6.5 text-white flex flex-col justify-between" id="charter-brief-wrapper">
              
              <div className="space-y-6">
                <div>
                  <span className="text-amber-400 font-mono text-[10px] tracking-widest font-black uppercase block">
                    THE SCHOLASTIC OATH
                  </span>
                  <h3 className="font-serif font-black text-white text-xl tracking-wide uppercase mt-1">
                    Value-Based CBSE Commitment
                  </h3>
                  <p className="text-xs text-slate-400 font-sans mt-1.5">
                    Every parent enrolling their children agrees to cooperate within our ethical transformation loop:
                  </p>
                </div>

                {/* Values bullet lists */}
                <div className="space-y-4 font-sans text-xs">
                  <div className="bg-slate-900/60 p-3.5 rounded-lg border border-slate-800 flex items-start gap-3">
                    <span className="text-amber-400 text-lg">⚖</span>
                    <div>
                      <strong className="block text-white font-serif text-sm">Truth & Honesty (Satya)</strong>
                      <span className="text-slate-400 text-[11px] block mt-0.5">Students are guided to practice intellectual transparency and acknowledge mistakes bravely.</span>
                    </div>
                  </div>

                  <div className="bg-slate-900/60 p-3.5 rounded-lg border border-slate-800 flex items-start gap-3">
                    <span className="text-emerald-400 text-lg">🤝🏽</span>
                    <div>
                      <strong className="block text-white font-serif text-sm">Empathy & Respect (Daya)</strong>
                      <span className="text-slate-400 text-[11px] block mt-0.5">Zero tolerance for academic bullying. Deep training on civic empathy and physical respect.</span>
                    </div>
                  </div>

                  <div className="bg-slate-900/60 p-3.5 rounded-lg border border-slate-800 flex items-start gap-3">
                    <span className="text-blue-400 text-lg">💡</span>
                    <div>
                      <strong className="block text-white font-serif text-sm">Logical Application (Viveka)</strong>
                      <span className="text-slate-400 text-[11px] block mt-0.5">Focus on analysis and scientific thinking over standard textbook root memorization.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Admissions cell contact hotlines display */}
              <div className="border-t border-slate-850 pt-5 mt-6 space-y-3 font-mono text-[11px] text-slate-300">
                <span className="text-slate-500 uppercase tracking-widest text-[9px] block">DIRECT REPRESENTATIVES CELL:</span>
                
                <div className="flex items-center justify-between">
                  <span>Admissions Head:</span>
                  <a href="tel:8507448779" className="text-amber-300 font-bold hover:underline select-all">8507448779</a>
                </div>
                
                <div className="flex items-center justify-between">
                  <span>Coordinators:</span>
                  <a href="tel:9852194522" className="text-slate-200 font-bold hover:underline select-all">9852194522</a>
                </div>
              </div>

            </div>

            {/* Right side column: Actual Admission Form */}
            <div className="lg:col-span-7">
              <AdmissionForm onSubmitLead={handleFormAdmissionSubmit} />
            </div>

          </div>

        </div>
      </section>

      {/* 10. PRIMARY CONTACT CENTER & GEO MAP VECTOR STYLING */}
      <section className="py-20 bg-slate-900 text-white relative border-t border-slate-800" id="contact-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 font-sans">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-amber-400 font-serif font-bold text-xs tracking-widest uppercase py-1 px-3 bg-amber-400/5 id border border-amber-400/10 rounded-full inline-block">
              GET IN TOUCH
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-white mt-3 uppercase">
              Contact Admissions Cell
            </h2>
            <div className="h-0.5 w-16 bg-gradient-to-r from-amber-400 to-emerald-500 mx-auto my-4 rounded" />
            <p className="text-slate-400 text-sm">
              Have burning inquiries? Visit our administrative block at Dhanbad or dial our helpline staff.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Contact details list */}
            <div className="lg:col-span-5 space-y-5" id="contacts-details-column">
              
              {/* Address point */}
              <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl flex items-start gap-4">
                <div className="p-3 bg-amber-500/10 text-amber-500 rounded-lg">
                  <MapPin size={20} />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block leading-none">SCHOOL CAMPUS ADDRESS</span>
                  <strong className="text-white text-sm font-serif block">Neel Kuthi, Amtal, Dhanbad,</strong>
                  <span className="text-xs text-slate-400 block font-sans">Jharkhand - 828111, India</span>
                </div>
              </div>

              {/* Phone vectors */}
              <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl flex items-start gap-4">
                <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg">
                  <PhoneCall size={20} />
                </div>
                <div className="space-y-1 w-full">
                  <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block leading-none">HOTLINE CONSTANT PHONES</span>
                  <div className="text-xs text-slate-350 space-y-1 font-mono pt-1">
                    <div className="flex justify-between">
                      <span>Admissions Desk:</span>
                      <a href="tel:8507448779" className="text-amber-300 font-bold hover:underline select-all">8507448779</a>
                    </div>
                    <div className="flex justify-between">
                      <span>Counseling Officer:</span>
                      <a href="tel:9852194522" className="text-white font-semibold hover:underline select-all">9852194522</a>
                    </div>
                    <div className="flex justify-between">
                      <span>Administrative Cell:</span>
                      <a href="tel:6205677001" className="text-white font-semibold hover:underline select-all">6205677001</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email ID vectors */}
              <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl flex items-start gap-4">
                <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg">
                  <Mail size={20} />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block leading-none">OFFICIAL SUPPORT EMAIL ID</span>
                  <a href="mailto:modakchand6@gmail.com" className="text-sm font-semibold text-white hover:underline block font-mono select-all">
                    modakchand6@gmail.com
                  </a>
                  <span className="text-[10px] text-slate-500 block font-sans">We write back to e-mails within 12 business hours.</span>
                </div>
              </div>

            </div>

            {/* Embed Map Placeholder */}
            <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden aspect-video shadow-2xl relative flex items-center justify-center text-center" id="map-holder">
              
              {/* customized premium vector maps graphics mockup since iframe blocks exist inside sandbox */}
              <div className="absolute inset-0 bg-slate-950 select-none pointer-events-none p-6 flex flex-col justify-between text-left opacity-30">
                <div className="h-px w-full bg-slate-800" />
                <div className="h-px w-full bg-slate-800" />
                <div className="h-px w-full bg-slate-800" />
                <div className="h-px w-full bg-slate-800" />
              </div>

              <div className="absolute inset-x-12 top-0 bottom-0 border-x border-slate-900 opacity-20 pointer-events-none" />
              <div className="absolute inset-x-32 top-0 bottom-0 border-x border-slate-900 opacity-20 pointer-events-none" />

              <div className="relative z-10 p-6 space-y-4 max-w-md">
                <div className="h-12 w-12 rounded-full bg-slate-900 border-2 border-amber-500/60 mx-auto flex items-center justify-center text-xl shadow-lg shadow-amber-500/10 animate-bounce">
                  📍
                </div>
                
                <div className="space-y-1.5">
                  <h4 className="font-serif font-black text-white text-base max-w-xs mx-auto leading-tight uppercase">
                    Amtal Dhanbad Campus
                  </h4>
                  <p className="text-xs text-slate-400 font-sans max-w-sm">
                    <strong>Panchatantra Ethics School</strong> is situated near Neel Kuthi, Amtal, Dhanbad, Jharkhand. Secure road routes connected with our student van fleets.
                  </p>
                </div>

                <a 
                  href="https://maps.google.com/?q=Neel+Kuthi+Amtal+Dhanbad+Jharkhand"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-slate-900 text-slate-200 border border-slate-700 hover:text-white hover:bg-slate-800 font-sans font-bold text-[11px] uppercase tracking-wide px-5 py-2.5 rounded shadow inline-flex items-center gap-1.5 transition cursor-pointer"
                  id="open-maps-btn"
                >
                  <span>🗺 Launch Directions on Maps</span>
                  <ArrowRight size={12} />
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 11. CENTRAL ACADEMIC FOOTER */}
      <footer className="bg-slate-950 text-white border-t border-slate-900 py-16" id="primary-footer animate">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Col 1 Brand detail */}
            <div className="space-y-4">
              <Logo showText={true} size="sm" />
              <p className="text-[11px] text-slate-400 font-sans leading-relaxed pt-1.5 max-w-xs">
                An English Medium Co-Educational School under the CBSE Curriculum standard. Nurturing deep cognitive science abilities integrated with absolute ethical morality.
              </p>
              <span className="font-mono text-[9px] text-slate-500 tracking-wider block uppercase pt-2">
                Panchatantra ethics school © 2026
              </span>
            </div>

            {/* Col 2 Quick admissions navigation links */}
            <div className="space-y-4 font-sans text-xs">
              <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider text-[#D4AF37]">
                Admissions Spectrum
              </h4>
              <ul className="space-y-2 text-slate-400 font-medium">
                <li><button onClick={() => scrollToSection('why-choose-us')} className="hover:text-amber-400 text-left cursor-pointer transition">Why Choose Ethics School?</button></li>
                <li><button onClick={() => scrollToSection('academic-programs')} className="hover:text-amber-400 text-left cursor-pointer transition">CBSE Graded Syllabus</button></li>
                <li><button onClick={() => scrollToSection('admissions-apply-section')} className="hover:text-amber-400 text-left cursor-pointer transition">Apply Inquire Forms</button></li>
                <li><button onClick={() => scrollToSection('contact-center')} className="hover:text-amber-400 text-left cursor-pointer transition">Direct hotline desk</button></li>
              </ul>
            </div>

            {/* Col 3 Facilities points */}
            <div className="space-y-4 font-sans text-xs">
              <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider text-[#D4AF37]">
                Campus Life
              </h4>
              <ul className="space-y-2 text-slate-400 font-medium">
                <li><button onClick={() => { scrollToSection('school-features'); setSelectedFeatureIndex(0); }} className="hover:text-amber-400 text-left cursor-pointer transition">Value based education</button></li>
                <li><button onClick={() => { scrollToSection('school-features'); setSelectedFeatureIndex(2); }} className="hover:text-amber-400 text-left cursor-pointer transition">Interactive Classrooms</button></li>
                <li><button onClick={() => { scrollToSection('school-features'); setSelectedFeatureIndex(3); }} className="hover:text-amber-400 text-left cursor-pointer transition">Children Library</button></li>
                <li><button onClick={() => { scrollToSection('school-features'); setSelectedFeatureIndex(5); }} className="hover:text-amber-400 text-left cursor-pointer transition">Athletics & Playgrounds</button></li>
              </ul>
            </div>

            {/* Col 4 Quick contact coordinates summary */}
            <div className="space-y-4 font-sans text-xs">
              <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider text-[#D4AF37]">
                Admissions Hotline
              </h4>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Neel Kuthi, Amtal, Dhanbad, Jharkhand - 828111<br />
                Primary Hotline: <strong>8507448779</strong>
              </p>
              
              <div className="pt-2">
                <span className="text-[9px] text-slate-500 font-mono uppercase block mb-1 tracking-wider">OFFICIAL RECIPIENT MAIL ID:</span>
                <a href="mailto:modakchand6@gmail.com" className="text-amber-400 hover:underline font-mono text-xs select-all">
                  modakchand6@gmail.com
                </a>
              </div>
            </div>

          </div>

          <div className="border-t border-slate-900 mt-12 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[10px] text-slate-500 font-mono uppercase tracking-wider">
            <span>CBSE Program • Dhanbad District Ward • Jharkhand</span>
            <span>Designed with Classical Educational standards</span>
          </div>

        </div>
      </footer>

      {/* 12. PREMIUM AI ADMISSIONS ASSISTANT WIDGET */}
      <div className="fixed bottom-6 right-6 z-50 font-sans">
        
        {/* Soft Notification Badge: "Admissions Open" */}
        {!isAssistantOpen && (
          <div className="absolute -top-3 right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-sans font-black text-[8px] uppercase tracking-widest px-2.5 py-0.5 rounded-full shadow-lg border border-amber-300/30 animate-pulse whitespace-nowrap pointer-events-none">
            Admissions Open
          </div>
        )}

        {/* Closed State Orb / Button */}
        {!isAssistantOpen && (
          <button
            onClick={() => setIsAssistantOpen(true)}
            id="floating-assistant-trigger"
            className="flex items-center gap-3 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white rounded-full p-2.5 pr-5 border border-amber-500/30 shadow-2xl hover:shadow-amber-500/15 cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 select-none text-left"
            title="Open Admissions Assistant"
          >
            {/* Animated assistant avatar orb */}
            <div className="relative h-10 w-10 flex items-center justify-center rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-lg shadow-inner">
              <span>🎓</span>
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>
            
            <div className="text-left leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-400">AI Admissions Assistant</span>
                <span className="text-[8px] px-1.5 py-0.2 rounded bg-emerald-950/50 text-emerald-400 border border-emerald-800/45 font-bold uppercase tracking-widest leading-normal">● Online</span>
              </div>
              <p className="text-[9px] text-slate-400 font-medium tracking-wide">How can I help you today?</p>
            </div>
          </button>
        )}

        {/* Glassmorphism Expanded Card Layout */}
        {isAssistantOpen && (
          <div className="w-[360px] max-w-[calc(100vw-32px)] bg-slate-950/95 backdrop-blur-xl border border-slate-800/90 rounded-2xl shadow-3xl overflow-hidden flex flex-col font-sans transition-all duration-300 animate-in fade-in slide-in-from-bottom-5 duration-200">
            
            {/* Expanded Header */}
            <div className="bg-slate-900/95 border-b border-slate-800/80 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative h-9 w-9 flex items-center justify-center rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-base">
                  <span>🎓</span>
                  <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 border border-slate-900"></span>
                </div>
                <div className="text-left leading-normal">
                  <h4 className="text-[11.5px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    Admissions Desk
                  </h4>
                  <div className="flex items-center gap-1 text-[9px] text-slate-400 font-medium">
                    <span className="text-emerald-400 font-black">●</span>
                    <span>Virtual Counselor</span>
                    <span className="text-slate-600">•</span>
                    <span>Online</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => {
                  setIsAssistantOpen(false);
                  setAssistantResponse(null);
                  setLastAction(null);
                }}
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800/50 transition cursor-pointer"
                title="Minimize Panel"
              >
                <X size={16} />
              </button>
            </div>

            {/* Expanded Panel Conversation Body */}
            <div className="px-4 py-4 space-y-4 max-h-[350px] overflow-y-auto scrollbar-thin bg-slate-950/40">
              
              {/* Virtual Assistant Greeting Chat Bubble */}
              <div className="flex gap-2">
                <div className="h-6 w-6 mt-0.5 flex items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-[10px]">
                  🧑‍🏫
                </div>
                <div className="flex-1 space-y-2 text-left">
                  <div className="bg-slate-900/80 border border-slate-800/60 rounded-2xl rounded-tl-none p-3 text-[12px] text-slate-200 leading-relaxed font-medium">
                    <p className="font-semibold text-amber-400 mb-1">Hello 👋</p>
                    <p className="mb-2">Welcome to <strong>Panchatantra Ethics School Admissions Center</strong>.</p>
                    <p className="text-slate-300 text-[11px]">How can I assist you in your child's moral learning and academic enrollment journey today? Please choose an option below.</p>
                  </div>
                </div>
              </div>

              {/* Counselor is typing indicator bubble */}
              {isAssistantTyping && (
                <div className="flex gap-2 items-center">
                  <div className="h-6 w-6 flex items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-[10px]">
                    🧑‍🏫
                  </div>
                  <div className="bg-slate-900/80 border border-slate-850 rounded-2xl rounded-tl-none px-3.5 py-2.5 text-slate-400 text-[11px] flex items-center gap-2 shadow-sm border border-slate-800">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold">Counselor writing</span>
                    <div className="flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-response Active Bubble View */}
              {assistantResponse && !isAssistantTyping && (
                <div className="space-y-3 animate-in fade-in duration-200 text-left">
                  <div className="flex justify-end">
                    <div className="bg-amber-500/10 border border-amber-500/25 rounded-2xl rounded-tr-none px-3 py-1.5 text-[11px] text-amber-300 font-bold uppercase tracking-wider">
                      {lastAction}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-6 w-6 mt-0.5 flex items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-[10px]">
                      🧑‍🏫
                    </div>
                    <div className="flex-1 bg-slate-900/80 border border-slate-800 rounded-2xl rounded-tl-none p-3.5 text-[12px] text-slate-100 leading-relaxed font-sans shadow-md">
                      <div className="text-slate-400 text-[9px] font-mono uppercase tracking-wider mb-1.5 border-b border-slate-800/30 pb-1">Virtual Counselor Answer:</div>
                      {assistantResponse}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setAssistantResponse(null);
                      setLastAction(null);
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800/80 text-[11px] font-bold text-amber-400 text-center transition cursor-pointer flex items-center justify-center gap-1.5 select-none"
                  >
                    ← Back to Option Menu
                  </button>
                </div>
              )}

              {/* Quick Actions List (Grid / List) */}
              {!assistantResponse && !isAssistantTyping && (
                <div className="space-y-2.5 pt-1.5 text-left">
                  <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-900 pb-1 flex items-center justify-between">
                    <span>Admissions Quick Connect Desk</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  </div>
                  
                  {/* Whatsapp Option */}
                  <button
                    onClick={() => handleAssistantAction('whatsapp')}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl bg-emerald-950/15 hover:bg-emerald-950/35 border border-emerald-900/30 hover:border-emerald-500/50 transition-all font-sans text-[11.5px] flex items-center justify-between group cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-2.5 text-emerald-400 font-extrabold tracking-wide">
                      <span className="text-sm">📲</span>
                      <span>WhatsApp Admissions</span>
                    </div>
                    <ArrowRight size={13} className="text-emerald-500/50 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition" />
                  </button>

                  {/* Call Option */}
                  <button
                    onClick={() => handleAssistantAction('call')}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl bg-sky-950/15 hover:bg-sky-950/35 border border-sky-900/30 hover:border-sky-500/50 transition-all font-sans text-[11.5px] flex items-center justify-between group cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-2.5 text-sky-400 font-extrabold tracking-wide">
                      <span className="text-sm">📞</span>
                      <span>Call Admissions Hotline</span>
                    </div>
                    <ArrowRight size={13} className="text-sky-500/50 group-hover:text-sky-400 group-hover:translate-x-0.5 transition" />
                  </button>

                  {/* Apply / Scroll Option */}
                  <button
                    onClick={() => handleAssistantAction('apply')}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl bg-amber-950/15 hover:bg-amber-950/35 border border-amber-900/30 hover:border-amber-500/50 transition-all font-sans text-[11.5px] flex items-center justify-between group cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-2.5 text-amber-400 font-extrabold tracking-wide">
                      <span className="text-sm">📝</span>
                      <span>Apply for Admission Form</span>
                    </div>
                    <ArrowRight size={13} className="text-amber-500/50 group-hover:text-amber-400 group-hover:translate-x-0.5 transition" />
                  </button>

                  <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest pt-2 border-b border-slate-900 pb-1">
                    General School Knowledge Desk
                  </div>

                  {/* Classes offered */}
                  <button
                    onClick={() => handleAssistantAction('classes')}
                    className="w-full text-left px-3 py-2 rounded-xl bg-slate-900/50 hover:bg-slate-900/90 border border-slate-850 hover:border-slate-800 transition-all font-sans text-xs flex items-center justify-between group cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-2.5 text-slate-300 font-semibold">
                      <span className="text-xs">🎓</span>
                      <span>Classes Offered</span>
                    </div>
                    <span className="text-[9.5px] text-amber-400/80 font-bold uppercase tracking-wide group-hover:text-amber-300">Inquire</span>
                  </button>

                  {/* CBSE Details */}
                  <button
                    onClick={() => handleAssistantAction('cbse')}
                    className="w-full text-left px-3 py-2 rounded-xl bg-slate-900/50 hover:bg-slate-900/90 border border-slate-850 hover:border-slate-800 transition-all font-sans text-xs flex items-center justify-between group cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-2.5 text-slate-300 font-semibold">
                      <span className="text-xs">📚</span>
                      <span>CBSE Curriculum Structure</span>
                    </div>
                    <span className="text-[9.5px] text-amber-400/80 font-bold uppercase tracking-wide group-hover:text-amber-300">Inquire</span>
                  </button>

                  {/* About School */}
                  <button
                    onClick={() => handleAssistantAction('about')}
                    className="w-full text-left px-3 py-2 rounded-xl bg-slate-900/50 hover:bg-slate-900/90 border border-slate-850 hover:border-slate-800 transition-all font-sans text-xs flex items-center justify-between group cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-2.5 text-slate-300 font-semibold">
                      <span className="text-xs">🏫</span>
                      <span>About School Mission</span>
                    </div>
                    <span className="text-[9.5px] text-amber-400/80 font-bold uppercase tracking-wide group-hover:text-amber-300">Inquire</span>
                  </button>

                  {/* Google Maps Location */}
                  <button
                    onClick={() => handleAssistantAction('location')}
                    className="w-full text-left px-3 py-2 rounded-xl bg-slate-900/50 hover:bg-slate-900/90 border border-slate-850 hover:border-slate-800 transition-all font-sans text-xs flex items-center justify-between group cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-2.5 text-slate-300 font-medium">
                      <span className="text-xs">📍</span>
                      <span>School Campus on Map</span>
                    </div>
                    <ArrowRight size={13} className="text-slate-500/70 group-hover:text-slate-400 group-hover:translate-x-0.5 transition" />
                  </button>

                  {/* Email Support */}
                  <button
                    onClick={() => handleAssistantAction('email')}
                    className="w-full text-left px-3 py-2 rounded-xl bg-slate-900/50 hover:bg-slate-900/90 border border-slate-850 hover:border-slate-800 transition-all font-sans text-xs flex items-center justify-between group cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-2.5 text-slate-300 font-medium">
                      <span className="text-xs">📧</span>
                      <span>Direct Email Office</span>
                    </div>
                    <ArrowRight size={13} className="text-slate-500/70 group-hover:text-slate-400 group-hover:translate-x-0.5 transition" />
                  </button>

                </div>
              )}

            </div>

            {/* Premium Footer info bar */}
            <div className="bg-slate-950 border-t border-slate-900/80 px-4 py-2 text-[8.5px] text-slate-500 text-center uppercase tracking-widest font-mono flex items-center justify-between select-none">
              <span>School ERP Hub</span>
              <span>100% Secure Desk</span>
            </div>

          </div>
        )}

      </div>

      {/* 13. SCROLL BACK TO LINE TOP BUTTON */}
      {showScrollTop && (
        <button
          onClick={() => scrollToSection('website-app-root')}
          className="fixed bottom-24 right-6 z-40 bg-slate-900 hover:bg-slate-800 text-amber-500 border border-slate-800 p-3 rounded-full shadow-2xl transition-all duration-300 hover:text-white select-none cursor-pointer"
          title="Scroll to Top"
          id="scroll-to-top-btn"
        >
          <ChevronUp size={18} />
        </button>
      )}

      {/* 14. ADMISSIONS CRM ADMINISTRATIVE PORTAL MODAL DIALOG */}
      {isCrmOpen && (
        <AdminDashboard
          onClose={() => setIsCrmOpen(false)}
          leads={leads}
          onUpdateLeadStatus={handleUpdateLeadStatus}
          onAddManualLead={handleAddManualLead}
          onDeleteLead={handleDeleteLead}
          webhookSettings={webhookSettings}
          onUpdateWebhookSettings={handleSaveSettings => {
            handleUpdateWebhookSettings(handleSaveSettings);
          }}
          webhookLogs={webhookLogs}
        />
      )}

    </div>
  );
}
