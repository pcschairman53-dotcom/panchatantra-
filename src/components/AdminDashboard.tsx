/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  TrendingUp, 
  CircleDot, 
  MapPin, 
  CheckCircle, 
  Download, 
  Search, 
  Settings, 
  Code, 
  Database, 
  RefreshCw, 
  Plus, 
  Trash2, 
  ExternalLink,
  MessageSquare,
  Mail,
  Smartphone,
  BookOpen,
  Calendar,
  X,
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';
import { Lead, WebhookSettings } from '../types';

interface AdminDashboardProps {
  onClose: () => void;
  leads: Lead[];
  onUpdateLeadStatus: (id: string, status: Lead['status'], notes?: string) => void;
  onAddManualLead: (lead: Omit<Lead, 'id' | 'timestamp' | 'leadSource'>) => void;
  onDeleteLead: (id: string) => void;
  webhookSettings: WebhookSettings;
  onUpdateWebhookSettings: (settings: WebhookSettings) => void;
  webhookLogs: Array<{ timestamp: string; type: string; url: string; payload: string; status: 'SUCCESS' | 'FAILED' }>;
}

export default function AdminDashboard({
  onClose,
  leads,
  onUpdateLeadStatus,
  onAddManualLead,
  onDeleteLead,
  webhookSettings,
  onUpdateWebhookSettings,
  webhookLogs
}: AdminDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [classFilter, setClassFilter] = useState<string>('All');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [notesText, setNotesText] = useState('');
  const [activeTab, setActiveTab] = useState<'leads' | 'analytics' | 'settings'>('leads');
  
  // Webhook URLs
  const [gasUrl, setGasUrl] = useState(webhookSettings.googleAppsScriptUrl);
  const [whatsappUrl, setWhatsappUrl] = useState(webhookSettings.makeWhatsappWebhookUrl);
  const [adminEmail, setAdminEmail] = useState(webhookSettings.adminEmail);

  // New manual inquiry state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLeadName, setNewLeadName] = useState('');
  const [newParentName, setNewParentName] = useState('');
  const [newMobile, setNewMobile] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newClass, setNewClass] = useState('Pre-Nursery');
  const [newAddress, setNewAddress] = useState('');
  const [newMessage, setNewMessage] = useState('');

  // Toast message
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (selectedLead) {
      setNotesText(selectedLead.notes || '');
    }
  }, [selectedLead]);

  const showToastMsg = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Filter leads
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.mobile.includes(searchTerm) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    const matchesClass = classFilter === 'All' || lead.classApplying === classFilter;

    return matchesSearch && matchesStatus && matchesClass;
  });

  // Analytics helper variables
  const totalInquiries = leads.length;
  const newLeadsCount = leads.filter(l => l.status === 'New').length;
  const contactedCount = leads.filter(l => l.status === 'Contacted').length;
  const scheduledCount = leads.filter(l => l.status === 'Interview Scheduled').length;
  const admittedCount = leads.filter(l => l.status === 'Admitted').length;
  const closedCount = leads.filter(l => l.status === 'Closed').length;

  const conversionRate = totalInquiries > 0 
    ? Math.round((admittedCount / totalInquiries) * 100) 
    : 0;

  // Class counts for charts
  const classBreakdown = leads.reduce((acc, lead) => {
    acc[lead.classApplying] = (acc[lead.classApplying] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['ID', 'Timestamp', 'Student Name', 'Parent Name', 'Mobile', 'Email', 'Class Applying For', 'Address', 'Inquiry Message', 'Lead Source', 'Status', 'Staff Notes'];
    const rows = leads.map(l => [
      l.id,
      l.timestamp,
      l.studentName,
      l.parentName,
      l.mobile,
      l.email,
      l.classApplying,
      l.address.replace(/"/g, '""'),
      l.message.replace(/"/g, '""'),
      l.leadSource,
      l.status,
      (l.notes || '').replace(/"/g, '""')
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.map(val => `"${val}"`).join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Panchatantra_Ethics_School_Leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToastMsg('Database exported to CSV successfully!');
  };

  // Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateWebhookSettings({
      googleAppsScriptUrl: gasUrl,
      makeWhatsappWebhookUrl: whatsappUrl,
      adminEmail: adminEmail
    });
    showToastMsg('Settings saved successfully!');
  };

  // Submit manual walk-in lead
  const handleAddManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName || !newParentName || !newMobile) {
      alert('Please fill out Name, Parent Name, and Mobile Number.');
      return;
    }
    onAddManualLead({
      studentName: newLeadName,
      parentName: newParentName,
      mobile: newMobile,
      email: newEmail || 'walkin@school.edu',
      classApplying: newClass,
      address: newAddress || 'Dhanbad, Jharkhand',
      message: newMessage || 'Walk-in or phone inquiry entered manually by administration.',
      status: 'New'
    });
    
    // Reset form
    setNewLeadName('');
    setNewParentName('');
    setNewMobile('');
    setNewEmail('');
    setNewAddress('');
    setNewMessage('');
    setShowAddModal(false);
    showToastMsg('Manual admission inquiry logged successfully!');
  };

  // Google Apps Script source code template for Easy Setup
  const gasTemplateCode = `/**
 * Google Apps Script Webhook System
 * Target Spreadsheet: Panchatantra Ethics School Admissions CRM
 * Double-Click "Extensions" -> "Apps Script" in your target Sheets file and paste this:
 */

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  try {
    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);
    
    // Log for diagnostic purposes
    Logger.log("Incoming Data: " + RawData);
    
    // Add Row format
    // Row Columns: Timestamp, Student Name, Parent Name, Mobile, Email, Class, Address, Message, Lead Source, Status
    sheet.appendRow([
      Data.timestamp || new Date().toISOString(),
      Data.studentName,
      Data.parentName,
      Data.mobile,
      Data.email,
      Data.classApplying,
      Data.address,
      Data.message,
      Data.leadSource || "Website",
      Data.status || "New"
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ 
      "status": "success", 
      "message": "Inquiry recorded in Google Sheets CRM" 
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      "status": "error", 
      "message": error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
`;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 animate-fade-in" id="portal-modal-wrapper">
      <div className="bg-slate-900 border border-slate-700/60 rounded-xl overflow-hidden w-full max-w-7xl h-[92vh] sm:h-[88vh] flex flex-col shadow-2xl relative" id="crm-portal-container">
        
        {/* Toast Notification bubble inside dashboard */}
        {toast && (
          <div className="absolute top-20 right-6 z-50 bg-emerald-500 text-slate-950 text-sm font-semibold py-2.5 px-4 rounded-lg shadow-xl flex items-center gap-2 animate-bounce">
            <CheckCircle size={18} />
            <span>{toast}</span>
          </div>
        )}

        {/* Dashboard Top Header area */}
        <div className="bg-gradient-to-r from-slate-900 via-[#0B2545] to-[#1E4620]/20 border-b border-slate-700/60 px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-amber-500/10 border border-amber-500/30 p-2 rounded-lg text-amber-400">
              <Database size={24} />
            </div>
            <div>
              <h1 className="font-serif font-bold text-white text-lg tracking-wide uppercase">
                Admissions CRM Portal
              </h1>
              <p className="text-xs text-slate-300 font-sans">
                Panchatantra Ethics School - Lead & Action Center (Simulated SaaS Dashboard)
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
            <button 
              onClick={exportToCSV}
              className="bg-slate-800 text-slate-200 border border-slate-700/60 text-xs font-semibold py-2 px-3 rounded hover:bg-slate-700 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
              title="Download backup in CSV format"
              id="export-csv-btn"
            >
              <Download size={14} />
              <span>Export CSV</span>
            </button>
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-amber-500 text-slate-950 text-xs font-bold py-2 px-3 rounded hover:bg-amber-400 transition-all flex items-center gap-1 cursor-pointer"
              id="add-manual-btn"
            >
              <Plus size={14} />
              <span>Log Walk-in Lead</span>
            </button>
            <button 
              onClick={onClose}
              className="bg-slate-800 text-slate-400 p-2 rounded border border-slate-700/60 hover:text-white hover:bg-slate-700 transition"
              title="Close Portal"
              id="close-portal-header-btn"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Dynamic Sidebar + Work area Layout */}
        <div className="flex-1 flex overflow-hidden min-h-0 bg-slate-950/20">
          
          {/* Sub Navigation Left Rail */}
          <div className="w-16 sm:w-48 bg-slate-900 border-r border-slate-800 p-2 flex flex-col justify-between" id="dashboard-sidebar">
            <div className="space-y-1.5">
              <button
                onClick={() => { setActiveTab('leads'); setSelectedLead(null); }}
                className={`w-full text-left p-2.5 rounded-lg text-xs font-medium transition flex items-center justify-center sm:justify-start gap-2.5 cursor-pointer ${
                  activeTab === 'leads' 
                    ? 'bg-amber-500/10 border-l-4 border-amber-500 text-amber-300 font-bold' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
                id="tab-leads-trigger"
              >
                <Users size={16} className="shrink-0" />
                <span className="hidden sm:inline">Active Inquiries</span>
              </button>

              <button
                onClick={() => { setActiveTab('analytics'); setSelectedLead(null); }}
                className={`w-full text-left p-2.5 rounded-lg text-xs font-medium transition flex items-center justify-center sm:justify-start gap-2.5 cursor-pointer ${
                  activeTab === 'analytics' 
                    ? 'bg-amber-500/10 border-l-4 border-amber-500 text-amber-300 font-bold' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
                id="tab-analytics-trigger"
              >
                <TrendingUp size={16} className="shrink-0" />
                <span className="hidden sm:inline">Stats & Funnels</span>
              </button>

              <button
                onClick={() => { setActiveTab('settings'); setSelectedLead(null); }}
                className={`w-full text-left p-2.5 rounded-lg text-xs font-medium transition flex items-center justify-center sm:justify-start gap-2.5 cursor-pointer ${
                  activeTab === 'settings' 
                    ? 'bg-amber-500/10 border-l-4 border-amber-500 text-amber-300 font-bold' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
                id="tab-settings-trigger"
              >
                <Settings size={16} className="shrink-0" />
                <span className="hidden sm:inline">Integration Hub</span>
              </button>
            </div>

            <div className="border-t border-slate-800 pt-3 text-[10px] text-slate-500 hidden sm:block p-2 font-mono">
              <span className="text-emerald-400 block font-semibold mb-1">CRM Status</span>
              Synced Local DB: Active ({leads.length} Records)
            </div>
          </div>

          {/* Central Main Panel Area (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6" id="dashboard-content-frame">
            
            {/* VIEW 1: ACTIVE LEADS MANAGING TABLE */}
            {activeTab === 'leads' && (
              <div className="space-y-4" id="leads-tab-content">
                
                {/* Statistics Highlights Strip */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4" id="stats-mini-summary">
                  <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 text-blue-400 rounded-md">
                      <Users size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Total Inquiries</span>
                      <span className="text-lg font-bold text-white leading-tight">{totalInquiries}</span>
                    </div>
                  </div>
                  
                  <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg flex items-center gap-3">
                    <div className="p-2 bg-amber-500/10 text-amber-400 rounded-md">
                      <CircleDot size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Uncontacted</span>
                      <span className="text-lg font-bold text-amber-400 leading-tight">{newLeadsCount}</span>
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-md">
                      <CheckCircle size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Admitted</span>
                      <span className="text-lg font-bold text-emerald-400 leading-tight">{admittedCount}</span>
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg flex items-center gap-3">
                    <div className="p-2 bg-purple-500/10 text-purple-400 rounded-md">
                      <TrendingUp size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Conversion Rate</span>
                      <span className="text-lg font-bold text-purple-300 leading-tight">{conversionRate}%</span>
                    </div>
                  </div>
                </div>

                {/* Search, Filter, Status Row */}
                <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-lg flex flex-col md:flex-row items-center gap-3" id="filters-container">
                  
                  {/* Search query input */}
                  <div className="w-full md:flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                    <input 
                      type="text"
                      className="w-full bg-slate-950 border border-slate-800 rounded py-2 pl-9 pr-4 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-all font-sans"
                      placeholder="Search leads by student, parent, phone, mail, or town..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      id="lead-search-input"
                    />
                  </div>

                  {/* Status Dropdown */}
                  <div className="w-full md:w-44 flex items-center gap-2">
                    <span className="text-slate-400 text-xs shrink-0 font-medium">Status:</span>
                    <select
                      className="w-full bg-slate-950 border border-slate-800 rounded py-1.5 px-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      id="status-filter-select"
                    >
                      <option value="All">All Statuses</option>
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Interview Scheduled">Interview Scheduled</option>
                      <option value="Admitted">Admitted</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>

                  {/* Class Applying Dropdown */}
                  <div className="w-full md:w-44 flex items-center gap-2">
                    <span className="text-slate-400 text-xs shrink-0 font-medium">Class:</span>
                    <select
                      className="w-full bg-slate-950 border border-slate-800 rounded py-1.5 px-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer"
                      value={classFilter}
                      onChange={(e) => setClassFilter(e.target.value)}
                      id="class-filter-select"
                    >
                      <option value="All">All Grades</option>
                      {['Pre-Nursery', 'Nursery', 'LKG', 'UKG', 'Class I', 'Class II', 'Class III', 'Class IV', 'Class V', 'Class VI', 'Class VII', 'Class VIII', 'Class IX', 'Class X'].map(cls => (
                        <option key={cls} value={cls}>{cls}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Split list and drawer details */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5" id="leads-layout-grid">
                  
                  {/* Leads Table Container */}
                  <div className={`bg-slate-900 border border-slate-800/80 rounded-lg overflow-hidden ${selectedLead ? 'lg:col-span-7' : 'lg:col-span-12'}`} id="leads-table-wrapper">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse" id="leads-table">
                        <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] tracking-wider uppercase border-b border-slate-800">
                          <tr>
                            <th className="py-3 px-4">Student Name</th>
                            <th className="py-3 px-4">Parent Name</th>
                            <th className="py-3 px-4">Class Requested</th>
                            <th className="py-3 px-4">Contact</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 font-sans text-xs text-slate-300">
                          {filteredLeads.length === 0 ? (
                            <tr>
                              <td colSpan={6} className="py-12 text-center text-slate-500 font-sans">
                                <AlertCircle className="mx-auto text-slate-600 mb-2.5" size={24} />
                                No active inquiries match the chosen criteria.
                              </td>
                            </tr>
                          ) : (
                            filteredLeads.map((lead) => (
                              <tr 
                                key={lead.id}
                                onClick={() => setSelectedLead(lead)}
                                className={`group hover:bg-slate-800/50 transition duration-150 cursor-pointer ${
                                  selectedLead?.id === lead.id ? 'bg-amber-500/5 border-l-2 border-l-amber-500' : ''
                                }`}
                              >
                                <td className="py-3.5 px-4 font-semibold text-white">
                                  {lead.studentName}
                                  <span className="block font-mono text-[9px] text-slate-500 font-normal mt-0.5" title="Submission Timestamp">
                                    {new Date(lead.timestamp).toLocaleDateString()} {new Date(lead.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                  </span>
                                </td>
                                <td className="py-3.5 px-4">{lead.parentName}</td>
                                <td className="py-3.5 px-4">
                                  <span className="bg-emerald-950/40 border border-emerald-800/30 text-emerald-400 px-2 py-0.5 rounded text-[11px] font-medium font-sans">
                                    {lead.classApplying}
                                  </span>
                                </td>
                                <td className="py-3.5 px-4 font-mono text-[11px]">
                                  <div className="flex flex-col gap-0.5">
                                    <span className="text-slate-300">{lead.mobile}</span>
                                    <span className="text-slate-500 text-[10px] font-sans lowercase truncate max-w-[130px]" title={lead.email}>
                                      {lead.email}
                                    </span>
                                  </div>
                                </td>
                                <td className="py-3.5 px-4">
                                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                    lead.status === 'New' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                                    lead.status === 'Contacted' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                    lead.status === 'Interview Scheduled' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                                    lead.status === 'Admitted' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                    'bg-slate-800 text-slate-400'
                                  }`}>
                                    {lead.status}
                                  </span>
                                </td>
                                <td className="py-3.5 px-4 text-right">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (confirm(`Are you sure you want to permanently delete lead for ${lead.studentName}?`)) {
                                        onDeleteLead(lead.id);
                                        if (selectedLead?.id === lead.id) setSelectedLead(null);
                                        showToastMsg('Inquiry deleted from database.');
                                      }
                                    }}
                                    className="text-slate-500 hover:text-red-400 p-1 rounded hover:bg-slate-800 transition cursor-pointer"
                                    title="Delete inquiries permanently"
                                    id={`delete-lead-${lead.id}`}
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Sidebar Detail Inspector Panel */}
                  {selectedLead && (
                    <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-lg p-5 flex flex-col justify-between space-y-4 animate-fade-in" id="lead-inspector-drawer">
                      
                      {/* Top profile header */}
                      <div className="space-y-3.5">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block">INQUIRY PROFILE</span>
                            <h3 className="font-serif font-bold text-white text-lg mt-0.5">{selectedLead.studentName}</h3>
                            <span className="text-xs text-slate-400 font-sans mt-1 inline-flex items-center gap-1">
                              Applying for <strong className="text-amber-400 font-medium">{selectedLead.classApplying}</strong>
                            </span>
                          </div>
                          
                          <button
                            onClick={() => setSelectedLead(null)}
                            className="bg-slate-950 p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                            id="close-lead-inspector"
                          >
                            <X size={14} />
                          </button>
                        </div>

                        {/* Leads detail points */}
                        <div className="bg-slate-950/60 rounded-lg p-3.5 border border-slate-800/40 text-xs space-y-2.5 font-sans text-slate-300">
                          <div className="flex justify-between border-b border-slate-800/50 pb-1.5">
                            <span className="text-slate-500 flex items-center gap-1.5"><Users size={12} className="text-amber-400" /> Parent Name:</span>
                            <span className="font-semibold text-white">{selectedLead.parentName}</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-800/50 pb-1.5">
                            <span className="text-slate-500 flex items-center gap-1.5"><Smartphone size={12} className="text-amber-400" /> Contact Number:</span>
                            <a href={`tel:${selectedLead.mobile}`} className="font-mono text-amber-300 hover:underline inline-flex items-center gap-1">
                              {selectedLead.mobile}
                              <ExternalLink size={10} />
                            </a>
                          </div>
                          <div className="flex justify-between border-b border-slate-800/50 pb-1.5">
                            <span className="text-slate-500 flex items-center gap-1.5"><Mail size={12} className="text-amber-400" /> Email ID:</span>
                            <a href={`mailto:${selectedLead.email}`} className="text-slate-300 font-mono hover:underline truncate max-w-[170px]" title={selectedLead.email}>
                              {selectedLead.email}
                            </a>
                          </div>
                          <div className="flex justify-between border-b border-slate-800/50 pb-1.5">
                            <span className="text-slate-500 flex items-center gap-1.5"><MapPin size={12} className="text-amber-400" /> Town / Address:</span>
                            <span className="text-right truncate max-w-[190px]" title={selectedLead.address}>{selectedLead.address}</span>
                          </div>
                          <div className="flex justify-between pb-1">
                            <span className="text-slate-500 flex items-center gap-1.5"><BookOpen size={12} className="text-amber-400" /> Lead Source:</span>
                            <span className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px] text-slate-300 font-medium tracking-wide">
                              {selectedLead.leadSource}
                            </span>
                          </div>
                        </div>

                        {/* Message inquiry text block */}
                        <div>
                          <label className="text-[10px] font-mono text-slate-500 tracking-wider block mb-1">USER MESSAGE / TEXT:</label>
                          <blockquote className="bg-slate-950 font-sans text-xs italic text-slate-400 p-3 rounded-lg border-l-4 border-l-amber-500 leading-relaxed max-h-24 overflow-y-auto">
                            "{selectedLead.message || 'No additional text shared.'}"
                          </blockquote>
                        </div>

                        {/* Status updating controller */}
                        <div className="border-t border-slate-850 pt-3">
                          <label className="text-[10px] font-mono text-slate-500 tracking-wider block mb-1.5">MUTATE ADMISSION STATUS:</label>
                          <div className="grid grid-cols-5 gap-1" id="lead-status-selectors">
                            {['New', 'Contacted', 'Interview Scheduled', 'Admitted', 'Closed'].map((st) => (
                              <button
                                key={st}
                                onClick={() => {
                                  onUpdateLeadStatus(selectedLead.id, st as Lead['status'], notesText);
                                  setSelectedLead({...selectedLead, status: st as Lead['status']});
                                  showToastMsg(`Status changed to ${st}`);
                                }}
                                className={`p-1 px-1.5 rounded text-[9px] uppercase tracking-wide font-extrabold text-center transition cursor-pointer ${
                                  selectedLead.status === st 
                                    ? st === 'Admitted' ? 'bg-emerald-500 text-slate-950' : 
                                      st === 'Closed' ? 'bg-slate-300 text-slate-950' :
                                      'bg-amber-500 text-slate-950'
                                    : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
                                }`}
                              >
                                {st === 'Interview Scheduled' ? 'Interview' : st}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Administrative notes edit textarea */}
                        <div>
                          <label className="text-[10px] font-mono text-slate-500 tracking-wider block mb-1">INTERNAL REMARKS & NOTES (STAFF ONLY):</label>
                          <textarea
                            className="bg-slate-950 border border-slate-800 text-xs rounded-lg p-2.5 w-full h-20 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500 font-sans"
                            placeholder="Add communication logs, interview scores, document verification progress, or comments here..."
                            value={notesText}
                            onChange={(e) => setNotesText(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <button
                        onClick={() => {
                          onUpdateLeadStatus(selectedLead.id, selectedLead.status, notesText);
                          showToastMsg('Internal notes saved!');
                        }}
                        className="w-full bg-slate-800 text-white font-semibold text-xs py-2 rounded border border-slate-700/60 hover:bg-slate-700 transition cursor-pointer hover:text-amber-300 flex items-center justify-center gap-1.5"
                        id="save-notes-btn"
                      >
                        <CheckCircle size={14} />
                        <span>Save Administrative Profile</span>
                      </button>
                    </div>
                  )}

                </div>
              </div>
            )}

            {/* VIEW 2: STATISTICAL SEGMENTATION ANALYSIS */}
            {activeTab === 'analytics' && (
              <div className="space-y-6 animate-fade-in" id="analytics-tab-content">
                
                {/* General Funnel Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4" id="stats-funnel-cards">
                  
                  <div className="bg-slate-900 border border-slate-800/80 p-4 rounded-xl flex flex-col justify-between h-28 relative overflow-hidden group">
                    <span className="text-xs text-slate-400 font-mono tracking-widest uppercase block relative z-10">Captured Leads</span>
                    <span className="text-3xl font-serif font-bold text-white relative z-10 leading-tight">{leads.length}</span>
                    <span className="text-[10px] font-mono text-slate-500 relative z-10">100% of pipeline</span>
                    <div className="absolute right-3 bottom-3 text-slate-800/60 group-hover:text-amber-500/10 transition-colors duration-300">
                      <Users size={64} />
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800/80 p-4 rounded-xl flex flex-col justify-between h-28 relative overflow-hidden group">
                    <span className="text-xs text-slate-400 font-mono tracking-widest uppercase block relative z-10">Staff Managed</span>
                    <span className="text-3xl font-serif font-bold text-blue-400 relative z-10 leading-tight">{contactedCount + scheduledCount}</span>
                    <span className="text-[10px] font-mono text-slate-500 relative z-10">
                      {leads.length > 0 ? Math.round(((contactedCount + scheduledCount) / leads.length) * 100) : 0}% contacted/interviewing
                    </span>
                    <div className="absolute right-3 bottom-3 text-slate-800/60 group-hover:text-blue-500/10 transition-colors duration-300">
                      <Calendar size={64} />
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800/80 p-4 rounded-xl flex flex-col justify-between h-28 relative overflow-hidden group">
                    <span className="text-xs text-slate-400 font-mono tracking-widest uppercase block relative z-10">Total Admitted</span>
                    <span className="text-3xl font-serif font-bold text-emerald-400 relative z-10 leading-tight">{admittedCount}</span>
                    <span className="text-[10px] font-mono text-slate-500 relative z-10">
                      {leads.length > 0 ? Math.round((admittedCount / leads.length) * 100) : 0}% conversion rate
                    </span>
                    <div className="absolute right-3 bottom-3 text-slate-800/60 group-hover:text-emerald-500/10 transition-colors duration-300">
                      <CheckCircle size={64} />
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800/80 p-4 rounded-xl flex flex-col justify-between h-28 relative overflow-hidden group">
                    <span className="text-xs text-slate-400 font-mono tracking-widest uppercase block relative z-10">Rejected / Closed</span>
                    <span className="text-3xl font-serif font-bold text-slate-400 relative z-10 leading-tight">{closedCount}</span>
                    <span className="text-[10px] font-mono text-slate-500 relative z-10">
                      {leads.length > 0 ? Math.round((closedCount / leads.length) * 100) : 0}% invalid or archived
                    </span>
                    <div className="absolute right-3 bottom-3 text-slate-800/60 group-hover:text-slate-500/10 transition-colors duration-300">
                      <X size={64} />
                    </div>
                  </div>

                </div>

                {/* Graphical layouts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5" id="charts-grid">
                  
                  {/* Lead volume by Grade Applying chart panel */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5" id="grade-applying-analytics">
                    <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                      <BookOpen size={16} className="text-amber-400" />
                      Admissions Distribution by Grade Segment
                    </h4>
                    
                    <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
                      {['Pre-Nursery', 'Nursery', 'LKG', 'UKG', 'Class I', 'Class II', 'Class III', 'Class IV', 'Class V', 'Class VI', 'Class VII', 'Class VIII', 'Class IX', 'Class X'].map((cls) => {
                        const count = classBreakdown[cls] || 0;
                        const percentage = leads.length > 0 ? (count / leads.length) * 100 : 0;
                        return (
                          <div key={cls} className="space-y-1">
                            <div className="flex justify-between items-center text-xs">
                              <span className="font-semibold text-slate-200">{cls}</span>
                              <span className="text-slate-400 font-mono font-bold inline-flex items-center gap-1.5">
                                {count} {count === 1 ? 'applicant' : 'applicants'}
                                <span className="text-[10px] text-slate-500">({Math.round(percentage)}%)</span>
                              </span>
                            </div>
                            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800/40">
                              <div 
                                className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full rounded-full transition-all duration-1000"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* CRM pipeline segment breakdown funnel */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5" id="funnel-analytics">
                    <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                      <TrendingUp size={16} className="text-amber-400" />
                      Dynamic Pipelines Lead Funnel
                    </h4>
                    
                    <div className="space-y-6 py-2">
                      {/* Step 1: Captured */}
                      <div className="relative">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-amber-300 font-bold uppercase tracking-wider">1. Initial Capture</span>
                          <span className="text-white font-mono font-bold leading-none">{totalInquiries} inquiries logged</span>
                        </div>
                        <div className="w-full bg-slate-950 h-5 border border-slate-800 rounded flex overflow-hidden">
                          <div className="bg-amber-500 h-full text-slate-950 text-[10px] font-extrabold flex items-center justify-center transition-all duration-1000 w-full">
                            100% Pipeline Entries
                          </div>
                        </div>
                      </div>

                      {/* Step 2: In communication */}
                      <div className="relative">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-blue-300 font-bold uppercase tracking-wider">2. Active Engagement</span>
                          <span className="text-white font-mono font-bold leading-none">{contactedCount + scheduledCount + admittedCount} qualified</span>
                        </div>
                        <div className="w-full bg-slate-950 h-5 border border-slate-800 rounded flex overflow-hidden">
                          <div 
                            className="bg-blue-500 h-full text-slate-950 text-[10px] font-extrabold flex items-center justify-center transition-all duration-1000 whitespace-nowrap"
                            style={{ width: `${totalInquiries > 0 ? ((contactedCount + scheduledCount + admittedCount) / totalInquiries) * 100 : 0}%` }}
                          >
                            {totalInquiries > 0 ? Math.round(((contactedCount + scheduledCount + admittedCount) / totalInquiries) * 100) : 0}% Interlocution
                          </div>
                        </div>
                      </div>

                      {/* Step 3: Interview scheduled */}
                      <div className="relative">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-purple-300 font-bold uppercase tracking-wider">3. Evaluation Stage</span>
                          <span className="text-white font-mono font-bold leading-none">{scheduledCount + admittedCount} evaluated</span>
                        </div>
                        <div className="w-full bg-slate-950 h-5 border border-slate-800 rounded flex overflow-hidden">
                          <div 
                            className="bg-purple-500 h-full text-slate-950 text-[10px] font-extrabold flex items-center justify-center transition-all duration-1000 whitespace-nowrap"
                            style={{ width: `${totalInquiries > 0 ? ((scheduledCount + admittedCount) / totalInquiries) * 100 : 0}%` }}
                          >
                            {totalInquiries > 0 ? Math.round(((scheduledCount + admittedCount) / totalInquiries) * 100) : 0}% Interviewed
                          </div>
                        </div>
                      </div>

                      {/* Step 4: Admitted */}
                      <div className="relative">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-emerald-300 font-bold uppercase tracking-wider">4. Admission Finalized</span>
                          <span className="text-white font-mono font-bold leading-none">{admittedCount} successful enrollments</span>
                        </div>
                        <div className="w-full bg-slate-950 h-5 border border-slate-800 rounded flex overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-full text-slate-950 text-[10px] font-extrabold flex items-center justify-center transition-all duration-1000 whitespace-nowrap"
                            style={{ width: `${totalInquiries > 0 ? (admittedCount / totalInquiries) * 100 : 0}%` }}
                          >
                            {conversionRate}% Enrolled Scholars
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            )}

            {/* VIEW 3: INTEGRATIONS & CODE GENERATORS HUB */}
            {activeTab === 'settings' && (
              <div className="space-y-6 animate-fade-in" id="settings-tab-content">
                
                {/* Integration Credentials Input Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="settings-configuration-grid">
                  
                  {/* Webhook Settings Form panel */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5" id="webhook-settings-inputs bg shadow">
                    <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Settings size={16} className="text-amber-400" />
                      CRM Webhook Endpoints
                    </h4>
                    
                    <form onSubmit={handleSaveSettings} className="space-y-4">
                      
                      {/* Apps script url input */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono tracking-wide text-slate-400 block uppercase">
                          Google Apps Script Webhook URL (Sheets CRM)
                        </label>
                        <input
                          type="url"
                          className="w-full bg-slate-950 border border-slate-800 rounded py-2 px-3 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500 font-sans"
                          placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                          value={gasUrl}
                          onChange={(e) => setGasUrl(e.target.value)}
                          id="gas-url-setting-input"
                        />
                        <span className="text-[10px] text-slate-500 font-sans block leading-relaxed">
                          Your website sends form inquiries instantly via POST request to this script to record rows in Google Sheets.
                        </span>
                      </div>

                      {/* Make.com WhatsApp Webhook url input */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono tracking-wide text-slate-400 block uppercase">
                          WhatsApp Automation Webhook (Make.com/Apps Script)
                        </label>
                        <input
                          type="url"
                          className="w-full bg-slate-950 border border-slate-800 rounded py-2 px-3 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500 font-sans"
                          placeholder="https://eu1.make.com/webhooks/... or webhook trigger"
                          value={whatsappUrl}
                          onChange={(e) => setWhatsappUrl(e.target.value)}
                        />
                        <span className="text-[10px] text-slate-500 font-sans block leading-relaxed">
                          Enables routing JSON payloads directly to webhook flow triggers to notify phone 8507448779 in real time.
                        </span>
                      </div>

                      {/* Admin Email profile to receive alert notifications */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono tracking-wide text-slate-400 block uppercase">
                          Administrative Notification Email
                        </label>
                        <input
                          type="email"
                          className="w-full bg-slate-950 border border-slate-800 rounded py-2 px-3 text-xs text-slate-100 focus:outline-none focus:border-amber-500 font-sans"
                          placeholder="modakchand6@gmail.com"
                          value={adminEmail}
                          onChange={(e) => setAdminEmail(e.target.value)}
                        />
                        <span className="text-[10px] text-slate-500 font-sans block leading-relaxed">
                          Email address that receives instant notifications upon new inquiries.
                        </span>
                      </div>

                      <button
                        type="submit"
                        className="bg-amber-500 text-slate-950 text-xs font-bold py-2.5 px-4 rounded hover:bg-amber-400 transition duration-150 cursor-pointer w-full uppercase tracking-wider"
                        id="save-settings-submit"
                      >
                        Save Configuration Endpoints
                      </button>

                    </form>
                  </div>

                  {/* Real-Time Webhook diagnostic developer execution log console */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between" id="webhook-transmission-logs">
                    <div>
                      <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider mb-2 flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Code size={16} className="text-amber-400" />
                          Diagnostic Request Logs
                        </span>
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                      </h4>
                      <p className="text-[10px] text-slate-500 font-sans mb-3.5">
                        Witness lead dispatch calls and payload structures in real time:
                      </p>

                      <div className="bg-slate-950 border border-slate-850 p-3 rounded-lg h-52 overflow-y-auto font-mono text-[10px] text-slate-300 space-y-3 scrollbar-thin">
                        {webhookLogs.length === 0 ? (
                          <div className="text-slate-600 italic py-16 text-center select-none font-sans">
                            Console idle. Submit an Admissions form to trigger live webhook transmission logs.
                          </div>
                        ) : (
                          webhookLogs.map((log, index) => (
                            <div key={index} className="border-b border-slate-850 pb-2 bg-slate-900/40 p-2 rounded border border-slate-800/40">
                              <div className="flex justify-between items-center text-slate-500 mb-1">
                                <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                                <span className={`font-bold uppercase ${log.status === 'SUCCESS' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                  {log.status}
                                </span>
                              </div>
                              <div className="text-amber-400 font-bold mb-0.5">{log.type} POST request</div>
                              <div className="text-slate-400 truncate max-w-full">Target: {log.url}</div>
                              <pre className="text-slate-400 text-[9px] bg-slate-950/80 p-1.5 rounded mt-1.5 overflow-x-auto max-h-24">
                                {JSON.stringify(JSON.parse(log.payload), null, 2)}
                              </pre>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    <div className="text-[10px] text-slate-400 font-sans bg-slate-950/40 border border-slate-800/40 p-2.5 rounded-lg mt-3 flex items-center gap-2">
                      <FileSpreadsheet className="text-[#1E4620]" size={20} />
                      <span><strong>Testing Note</strong>: Webhooks trigger real HTTP requests. If you don't have secondary platforms set up, we auto-save inside local CRM and print payloads here mock-style!</span>
                    </div>
                  </div>

                </div>

                {/* Google Apps script creation deployment wizard */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5" id="gas-setup-code-wizard">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                    <div>
                      <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2 mb-1">
                        <FileSpreadsheet size={18} className="text-amber-400" />
                        Google Sheets CRM Setup Wizard (Backend Code)
                      </h4>
                      <p className="text-xs text-slate-400 font-sans">
                        Setup your own persistent database instantly inside standard Google Sheets in 3 easy steps!
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(gasTemplateCode);
                        showToastMsg('Backend Apps Script copied to clipboard!');
                      }}
                      className="bg-slate-850 border border-slate-700/60 text-slate-200 text-xs font-semibold py-1.5 px-3 rounded hover:bg-slate-750 transition flex items-center gap-1.5 cursor-pointer"
                      id="copy-script-btn"
                    >
                      <Code size={14} />
                      <span>Copy Apps Script</span>
                    </button>
                  </div>

                  {/* Directions steps */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-xs font-sans text-slate-300">
                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-850">
                      <div className="text-amber-400 font-bold font-mono uppercase mb-1">Step 1: Create Sheet</div>
                      <p className="text-slate-400 leading-relaxed">
                        Open a blank Google Sheets file. Rename your active sheet tab to exactly <strong>Admissions</strong> (or use sheets active default).
                      </p>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-850">
                      <div className="text-amber-400 font-bold font-mono uppercase mb-1">Step 2: Extensions</div>
                      <p className="text-slate-400 leading-relaxed">
                        Go to <strong>Extensions &gt; Apps Script</strong>. Delete default code, paste this copied script, and tap <strong>Save</strong>.
                      </p>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-850">
                      <div className="text-amber-400 font-bold font-mono uppercase mb-1">Step 3: Deploy Web App</div>
                      <p className="text-slate-400 leading-relaxed">
                        Click <strong>Deploy &gt; New Deployment</strong>. Choose <strong>Web App</strong> type. Access: <strong>Anyone</strong>. Copy URL and paste in credentials above!
                      </p>
                    </div>
                  </div>

                  {/* Script Code highlight display */}
                  <div className="relative">
                    <pre className="bg-slate-950 text-slate-400 p-4 rounded-lg text-[10.5px] font-mono leading-relaxed h-52 overflow-y-auto border border-slate-850 pr-12 scrollbar-thin">
                      {gasTemplateCode}
                    </pre>
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>

      {/* MODAL: ADD MANUAL INQUIRY FLOW */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 animate-fade-in" id="add-manual-modal">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-xl overflow-hidden shadow-2xl animate-scale-up" id="manual-lead-form-body">
            
            <div className="bg-[#0B2545] border-b border-slate-700/60 p-4 flex justify-between items-center">
              <h3 className="font-serif font-bold text-white text-base flex items-center gap-2">
                <Plus size={18} className="text-amber-400" />
                LOG MANUAL ADMISSION INQUIRY
              </h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddManualSubmit} className="p-5 space-y-4 text-xs text-slate-200">
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-medium text-slate-400 block">Student Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 focus:outline-none focus:border-amber-500"
                    placeholder="E.g. Shaurya Modak"
                    value={newLeadName}
                    onChange={(e) => setNewLeadName(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-slate-400 block">Parent / Guardian Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 focus:outline-none focus:border-amber-500"
                    placeholder="E.g. Chand Modak"
                    value={newParentName}
                    onChange={(e) => setNewParentName(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-medium text-slate-400 block">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    maxLength={10}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 focus:outline-none focus:border-amber-500"
                    placeholder="E.g. 8507448779"
                    value={newMobile}
                    onChange={(e) => setNewMobile(e.target.value.replace(/\D/g, ''))}
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-slate-400 block">Email ID (Optional)</label>
                  <input
                    type="email"
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 focus:outline-none focus:border-amber-500"
                    placeholder="E.g. guest@ethics.edu"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-medium text-slate-400 block">Class Applying For *</label>
                <select
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 focus:outline-none focus:border-amber-500 cursor-pointer"
                  value={newClass}
                  onChange={(e) => setNewClass(e.target.value)}
                >
                  {['Pre-Nursery', 'Nursery', 'LKG', 'UKG', 'Class I', 'Class II', 'Class III', 'Class IV', 'Class V', 'Class VI', 'Class VII', 'Class VIII', 'Class IX', 'Class X'].map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-medium text-slate-400 block">Residency Address</label>
                <input
                  type="text"
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 focus:outline-none focus:border-amber-500"
                  placeholder="E.g. Neel Kuthi, Amtal, Dhanbad"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="font-medium text-slate-400 block">Staff / Consultation Message Notes</label>
                <textarea
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 h-16 focus:outline-none focus:border-amber-500"
                  placeholder="E.g. Student walked into campus, paid inquiry fee, interest in sports amenities..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-700 rounded text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded hover:bg-amber-400 cursor-pointer text-xs"
                >
                  Confirm Lead Logger
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
