/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  BookOpen, 
  MessageSquare, 
  CheckCircle, 
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Smartphone
} from 'lucide-react';
import { Lead } from '../types';

interface AdmissionFormProps {
  onSubmitLead: (leadData: Omit<Lead, 'id' | 'timestamp' | 'leadSource' | 'status'>) => Promise<boolean>;
}

export default function AdmissionForm({ onSubmitLead }: AdmissionFormProps) {
  // Local form inputs state
  const [studentName, setStudentName] = useState('');
  const [parentName, setParentName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [classApplying, setClassApplying] = useState('Pre-Nursery');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Clean and validate inputs
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!studentName.trim() || studentName.trim().length < 2) {
      errors.studentName = 'Please enter a valid student name (min 2 characters).';
    }

    if (!parentName.trim() || parentName.trim().length < 2) {
      errors.parentName = 'Please enter a valid parent/guardian name (min 2 characters).';
    }

    // 10 digits phone number validation
    const cleanPhone = mobile.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length !== 10) {
      errors.mobile = 'Please enter a valid 10-digit mobile number (e.g., 8507448779).';
    }

    if (email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.email = 'Please enter a valid email address style.';
      }
    }

    if (!address.trim() || address.trim().length < 5) {
      errors.address = 'Please specify a residency address (e.g. Neel Kuthi, Dhanbad).';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    // Strip non-digits and cap at 10 length
    const cleanDigits = rawVal.replace(/\D/g, '').slice(0, 10);
    setMobile(cleanDigits);
    
    if (validationErrors.mobile) {
      setValidationErrors(prev => {
        const copy = { ...prev };
        delete copy.mobile;
        return copy;
      });
    }
  };

  const handleInputChange = (field: string, val: string, validator?: (v: string) => boolean) => {
    if (field === 'studentName') setStudentName(val);
    else if (field === 'parentName') setParentName(val);
    else if (field === 'email') setEmail(val);
    else if (field === 'address') setAddress(val);
    else if (field === 'message') setMessage(val);

    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        studentName: studentName.trim(),
        parentName: parentName.trim(),
        mobile: mobile.trim(),
        email: email.trim() || 'not-provided@ethics.edu',
        classApplying,
        address: address.trim(),
        message: message.trim() || 'No additional statement written.'
      };

      const success = await onSubmitLead(payload);
      if (success) {
        setSubmitSuccess(true);
        // Clear forms completely on success
        setStudentName('');
        setParentName('');
        setMobile('');
        setEmail('');
        setAddress('');
        setMessage('');
        setClassApplying('Pre-Nursery');
      } else {
        alert('Admission Inquiry Submission Failed. Please check your internet connection or try again.');
      }
    } catch (err) {
      console.error(err);
      alert('An unexpected error occurred during admission inquiry submission. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative" id="admission-form-wrapper">
      
      {/* Absolute background accent decor */}
      <div className="absolute top-0 right-0 h-32 w-32 bg-amber-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-32 w-32 bg-emerald-500/5 blur-3xl pointer-events-none" />

      {/* Flagship decorative banner on top */}
      <div className="bg-gradient-to-r from-[#0B2545] via-[#1E4620] to-yellow-600/10 p-5 border-b border-slate-800 text-center relative">
        <span className="text-[10px] font-mono tracking-widest text-amber-400 font-bold uppercase block mb-1">
          CHAIRMAN'S CELL DIRECT LINK
        </span>
        <h3 className="text-xl sm:text-2xl font-serif font-black text-white uppercase tracking-tight">
          Admissions Inquiry Form
        </h3>
        <p className="text-[11px] text-slate-300 font-sans mt-1">
          Secure your scholar's seat for the academic year <strong>2026-27</strong>
        </p>
      </div>

      <div className="p-6 sm:p-8" id="form-body-frame">
        
        {/* SUCCESS STATE DESIGN */}
        {submitSuccess ? (
          <div className="py-8 text-center space-y-6 animate-scale-up" id="form-success-card">
            <div className="mx-auto h-16 w-16 bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <CheckCircle size={36} />
            </div>

            <div className="space-y-2">
              <span className="font-serif font-black text-amber-400 text-lg sm:text-xl uppercase tracking-wider block">
                Admission Inquiry Submitted Successfully
              </span>
              <p className="text-xs text-slate-300 max-w-sm mx-auto font-sans leading-relaxed">
                Thank you for your interest in <strong>Panchatantra Ethics School</strong>. Your inquiry has been logged inside our admissions CRM and broadcasted to the management cell.
              </p>
              <div className="text-[10px] text-emerald-400 font-mono tracking-wide bg-emerald-950/40 border border-emerald-900/40 p-2.5 rounded-lg max-w-sm mx-auto">
                ✓ Google Sheet Synced • ✓ SMS Alert Prepared
              </div>
            </div>

            <div className="h-px bg-slate-800/80 my-4" />

            <div className="space-y-3.5">
              <span className="text-xs text-slate-400 font-sans block">
                Want immediate callbacks or details about admission fees? Contact admissions directly on WhatsApp:
              </span>
              <a
                href={`https://wa.me/918507448779?text=${encodeURIComponent("Hello, I have just submitted the website admission inquiry form for my child. Please guide me on admissions fees.")}`}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-md flex items-center justify-center gap-2 max-w-xs mx-auto animate-pulse cursor-pointer"
                id="whatsapp-success-trigger"
              >
                <span>💬 WhatsApp Admission Coordinator</span>
              </a>

              <button
                onClick={() => setSubmitSuccess(false)}
                className="text-[11px] text-[#D4AF37] hover:underline font-mono tracking-wide cursor-pointer uppercase block mx-auto pt-2"
                id="reset-form-btn"
              >
                ← INQUIRE ANOTHER CHILD
              </button>
            </div>
          </div>
        ) : (
          
          /* INTERACTIVE ACTIVE INPUT FORM BLOCK */
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans text-slate-300" id="admissions-active-form">
            
            {/* Split row: Student Name + Parent Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="space-y-1">
                <label className="text-slate-400 font-semibold block flex items-center gap-1.5" htmlFor="studentName">
                  <User size={13} className="text-amber-400" />
                  Student Full Name: <strong className="text-rose-500">*</strong>
                </label>
                <input
                  id="studentName"
                  type="text"
                  required
                  placeholder="E.g. Aarav Modak"
                  value={studentName}
                  onChange={(e) => handleInputChange('studentName', e.target.value)}
                  className={`w-full bg-slate-950/80 border text-slate-200 p-2.5 rounded focus:outline-none focus:border-amber-500 transition-all ${
                    validationErrors.studentName ? 'border-rose-500/60 bg-rose-950/10' : 'border-slate-800'
                  }`}
                />
                {validationErrors.studentName && (
                  <span className="text-[10px] text-rose-400 block mt-0.5">{validationErrors.studentName}</span>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-semibold block flex items-center gap-1.5" htmlFor="parentName">
                  <User size={13} className="text-amber-400" />
                  Parent / Guardian Name: <strong className="text-rose-500">*</strong>
                </label>
                <input
                  id="parentName"
                  type="text"
                  required
                  placeholder="E.g. Chand Modak"
                  value={parentName}
                  onChange={(e) => handleInputChange('parentName', e.target.value)}
                  className={`w-full bg-slate-950/80 border text-slate-200 p-2.5 rounded focus:outline-none focus:border-amber-500 transition-all ${
                    validationErrors.parentName ? 'border-rose-500/60 bg-rose-950/10' : 'border-slate-800'
                  }`}
                />
                {validationErrors.parentName && (
                  <span className="text-[10px] text-rose-400 block mt-0.5">{validationErrors.parentName}</span>
                )}
              </div>

            </div>

            {/* Split row: 10-Digit Mobile + Email ID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="space-y-1">
                <label className="text-slate-400 font-semibold block flex items-center gap-1.5" htmlFor="mobile">
                  <Smartphone size={13} className="text-amber-400" />
                  10-Digit Mobile Number: <strong className="text-rose-500">*</strong>
                </label>
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-[11px] select-none">
                    +91
                  </span>
                  <input
                    id="mobile"
                    type="tel"
                    required
                    placeholder="8507448779"
                    value={mobile}
                    onChange={handlePhoneInputChange}
                    className={`w-full bg-slate-950/80 border text-slate-200 py-2.5 pl-10 pr-2.5 rounded font-mono text-[11px] focus:outline-none focus:border-amber-500 tracking-wider transition-all ${
                      validationErrors.mobile ? 'border-rose-500/60 bg-rose-950/10' : 'border-slate-800'
                    }`}
                  />
                </div>
                {validationErrors.mobile ? (
                  <span className="text-[10px] text-rose-400 block mt-0.5">{validationErrors.mobile}</span>
                ) : (
                  <span className="text-[9px] text-slate-500 block leading-tight">We send an instant WhatsApp callback notification alert back on this line.</span>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-semibold block flex items-center gap-1.5" htmlFor="email">
                  <Mail size={13} className="text-amber-400" />
                  Email Address:
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="modakchand6@gmail.com"
                  value={email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full bg-slate-950/80 border text-slate-200 p-2.5 rounded focus:outline-none focus:border-amber-500 transition-all ${
                    validationErrors.email ? 'border-rose-500/60 bg-rose-950/10' : 'border-slate-800'
                  }`}
                />
                {validationErrors.email ? (
                  <span className="text-[10px] text-rose-400 block mt-0.5">{validationErrors.email}</span>
                ) : (
                  <span className="text-[9px] text-slate-500 block">We send detailed e-Prospectus and fee lists here.</span>
                )}
              </div>

            </div>

            {/* Class Selecting Dropdown */}
            <div className="space-y-1">
              <label className="text-slate-400 font-semibold block flex items-center gap-1.5" htmlFor="classApplying">
                <BookOpen size={13} className="text-amber-400" />
                Select Grade applying for: <strong className="text-rose-500">*</strong>
              </label>
              <select
                id="classApplying"
                className="w-full bg-slate-950/80 border border-slate-800 text-slate-200 p-2.5 rounded focus:outline-none focus:border-amber-500 cursor-pointer text-xs"
                value={classApplying}
                onChange={(e) => setClassApplying(e.target.value)}
              >
                {['Pre-Nursery', 'Nursery', 'LKG', 'UKG', 'Class I', 'Class II', 'Class III', 'Class IV', 'Class V', 'Class VI', 'Class VII', 'Class VIII', 'Class IX', 'Class X'].map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>

            {/* Permanent/Current Address Input */}
            <div className="space-y-1">
              <label className="text-slate-400 font-semibold block flex items-center gap-1.5" htmlFor="address">
                <MapPin size={13} className="text-amber-400" />
                Residency Address / Location: <strong className="text-rose-500">*</strong>
              </label>
              <input
                id="address"
                type="text"
                required
                placeholder="E.g., Neel Kuthi, Amtal, Dhanbad, Jharkhand - 828111"
                value={address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className={`w-full bg-slate-950/80 border text-slate-200 p-2.5 rounded focus:outline-none focus:border-amber-500 transition-all ${
                  validationErrors.address ? 'border-rose-500/60 bg-rose-950/10' : 'border-slate-800'
                }`}
              />
              {validationErrors.address && (
                <span className="text-[10px] text-rose-400 mt-0.5 block">{validationErrors.address}</span>
              )}
            </div>

            {/* Message/Inquiry Statement Box */}
            <div className="space-y-1">
              <label className="text-slate-400 font-semibold block flex items-center gap-1.5" htmlFor="message">
                <MessageSquare size={13} className="text-amber-400" />
                Additional Message / Educational background:
              </label>
              <textarea
                id="message"
                placeholder="Write any special needs, athletic history, previous school background, or queries regarding school bus schedules here..."
                value={message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 text-slate-200 p-2.5 h-20 rounded focus:outline-none focus:border-amber-500 scrollbar-thin text-xs"
              />
            </div>

            {/* Security Notice Checklist */}
            <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg flex items-start gap-2.5">
              <ShieldCheck className="text-emerald-400 shrink-0 mt-0.5" size={16} />
              <div className="text-[10px] text-slate-400 leading-normal">
                <strong>Admissions Integrity Statement</strong>: This form encrypts lead routes and transmits information safely inside our Google sheets CRM. By submitting, you authorise Panchatantra Ethics School coordinators to coordinate callbacks on the mobile provided.
              </div>
            </div>

            {/* Submit CTA button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-bold py-3.5 px-4 rounded hover:from-amber-400 hover:to-yellow-500 shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-wider relative overflow-hidden ${
                isSubmitting ? 'opacity-80' : ''
              }`}
              id="submit-admission-form"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 rounded-full border-2 border-slate-950 border-t-transparent animate-spin mr-1" />
                  <span>TRANSMITTING LEAD PAYLOAD...</span>
                </>
              ) : (
                <>
                  <Send size={14} />
                  <span>Submit Admission Applications</span>
                </>
              )}
            </button>

          </form>
        )}

      </div>
    </div>
  );
}
