/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Maximize2, X, Image as ImageIcon, Sparkles, Sliders } from 'lucide-react';
import { GalleryItem } from '../types';

interface GalleryLightboxProps {
  onOpenConsultationForm?: () => void;
}

export default function GalleryLightbox({ onOpenConsultationForm }: GalleryLightboxProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Curated premium images mapping to the uploaded real banners and academic settings
  const galleryItems: GalleryItem[] = [
    {
      id: 'banner-comparative',
      title: 'Comparative Curriculum Banner (85"x48" Print)',
      category: 'banner',
      imageUrl: '/banner-comparative', // Will render customized CSS Mockup
      description: 'The definitive curriculum breakdown comparison Chart highlighting focused methodologies from Pre-Nursery playing up to Std X logic tests.'
    },
    {
      id: 'banner-main',
      title: 'Ethics and Free Enrollment Banner (6x4 Print)',
      category: 'banner',
      imageUrl: '/banner-6x4', // Will render customized CSS Mockup
      description: 'The official 2026-27 admission campaign banner stating free admissions and the flagship co-educational values of the school.'
    },
    {
      id: 'banner-pricing',
      title: 'Affordable Premium Quality Banner (6x3 Print)',
      category: 'banner',
      imageUrl: '/banner-6x3', // Will render customized CSS Mockup
      description: 'Promotional display showing our complete phone hotline vectors, academic objectives and affordable premium fee structures.'
    },
    {
      id: 'campus-1',
      title: 'Smart Classrooms & Audio-Visual Labs',
      category: 'classroom',
      imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80',
      description: 'Digitally adaptive and safety-secured learning chambers designed to support visual, auditory, and hands-on teaching frameworks.'
    },
    {
      id: 'activities-1',
      title: 'Storytelling & Character Building Circle',
      category: 'activities',
      imageUrl: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=80',
      description: 'Under the guidance of experienced educators, youngsters engage in moral story analysis using ancient Panchatantra ethical frameworks.'
    },
    {
      id: 'sports-1',
      title: 'Physical Development & Sports Field',
      category: 'sports',
      imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80',
      description: 'Enthusiastic students training on our secure outdoor assembly field, practicing athletics and collaborative team sports.'
    },
    {
      id: 'campus-2',
      title: 'Comprehensive Reference Library',
      category: 'classroom',
      imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80',
      description: 'A quiet, gold-lit classical zone filled with children encyclopedias, ethical histories, and modern CBSE reference materials.'
    },
    {
      id: 'activities-2',
      title: 'Youth Cultural Arts & Drama Showcase',
      category: 'activities',
      imageUrl: 'https://images.unsplash.com/photo-1460518451285-cd3ab4204666?auto=format&fit=crop&w=1200&q=80',
      description: 'Annual cultural functions nurturing student public confidence, speech-craft, puppetry, and musical theatrical expressions.'
    }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const categories = [
    { value: 'all', label: 'All Media' },
    { value: 'banner', label: 'Uploaded Banners' },
    { value: 'classroom', label: 'Campus & Classes' },
    { value: 'activities', label: 'Moral Activities' },
    { value: 'sports', label: 'Sports & Athletics' }
  ];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const activeLightboxItem = activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  return (
    <section className="py-20 bg-slate-950 text-white relative border-t border-slate-900" id="gallery-section">
      
      {/* Decorative vector background dots */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(212,175,55,0.03),transparent_40%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Heading with Royal style */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-amber-400 font-serif font-bold text-xs tracking-widest uppercase py-1 px-3 bg-amber-400/5 border border-amber-400/10 rounded-full inline-block">
            VISUAL DISCOVERIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-white mt-3 uppercase">
            School Gallery & Campaigns
          </h2>
          <div className="h-0.5 w-16 bg-gradient-to-r from-amber-400 to-emerald-500 mx-auto my-4 rounded" />
          <p className="text-slate-400 text-sm font-sans leading-relaxed">
            Take a look inside Panchatantra Ethics School. View our official marketing board banners (with comparative syllabus metrics) and real glimpses of campus lifestyle.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 mb-10" id="gallery-filter-bar">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setSelectedCategory(cat.value);
                setActiveLightboxIndex(null);
              }}
              className={`text-xs font-sans font-bold py-2 px-4 rounded-full transition-all tracking-wide cursor-pointer ${
                selectedCategory === cat.value
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 shadow-lg font-extrabold'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Dynamic Photo/Mockup Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="gallery-photo-grid">
          {filteredItems.map((item, index) => {
            const isCustomBannerMockup = item.imageUrl.startsWith('/');
            return (
              <div 
                key={item.id}
                onClick={() => setActiveLightboxIndex(index)}
                className="group relative cursor-pointer bg-slate-900 border border-slate-800/80 rounded-xl overflow-hidden aspect-[4/3] flex flex-col justify-between shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-amber-500/40 active:scale-[0.99]"
                id={`gallery-item-${item.id}`}
              >
                {/* 1. MOCKUP RENDERS FOR THE EXPLICITLY UPLOADED REAL BANNERS (No assets on disk, so we render authentic CSS mockups) */}
                {isCustomBannerMockup ? (
                  <div className="w-full h-full relative overflow-hidden bg-slate-950 flex flex-col justify-between p-3 select-none">
                    
                    {/* Tiny watermark branding tag of printer banner size */}
                    <div className="absolute right-2 top-2 bg-slate-900/90 text-[8px] font-mono border border-slate-700/60 font-medium tracking-wide py-0.5 px-1.5 rounded text-amber-400 uppercase">
                      {item.id === 'banner-comparative' ? '85"x48"' : item.id === 'banner-main' ? '6x4 Print' : '6x3 Print'}
                    </div>

                    <div className="space-y-1">
                      {/* Logo icon inside mock */}
                      <div className="flex items-center gap-1">
                        <div className="h-4 w-4 rounded-full bg-slate-900 border border-amber-400 flex items-center justify-center text-[7px] text-amber-400 font-serif font-black">
                          P
                        </div>
                        <span className="text-[7.5px] font-serif font-bold text-white tracking-widest leading-none">PANCHATANTRA</span>
                      </div>

                      {/* Headline inside banner */}
                      <div className="border-t border-dashed border-slate-800 pt-1.5">
                        <span className="text-[11px] font-serif font-bold tracking-tight text-white block uppercase leading-none text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200">
                          Panchatantra Ethics School
                        </span>
                        <span className="text-[6.5px] font-sans font-bold text-emerald-400 block tracking-wide uppercase mt-0.5">
                          Moral Learning For A Changing World
                        </span>
                      </div>
                    </div>

                    {/* Specific inner banner details based on actual uploaded graphics */}
                    {item.id === 'banner-comparative' && (
                      <div className="bg-slate-900/90 border border-slate-800 p-1.5 rounded text-[6px] space-y-1 font-sans">
                        <div className="text-[7px] text-amber-400 font-bold uppercase text-center border-b border-slate-800 pb-0.5">
                          Comparative Features Matrix
                        </div>
                        <div className="grid grid-cols-3 gap-0.5 text-slate-400">
                          <div className="font-semibold text-white">Pre-Nursery to UKG</div>
                          <div>Puppetry & Play Method</div>
                          <div>Value: Empathy</div>
                          
                          <div className="font-semibold text-white">Class I to VII</div>
                          <div>Storybooks & Drama</div>
                          <div>Value: Cooperation</div>
                          
                          <div className="font-semibold text-white">Class VIII to X</div>
                          <div>Debate & Case Studies</div>
                          <div>Value: Strategy & Logic</div>
                        </div>
                      </div>
                    )}

                    {item.id === 'banner-main' && (
                      <div className="space-y-1 bg-slate-900/40 p-1.5 rounded border border-emerald-950/20 text-center">
                        <span className="bg-red-600 text-white font-black text-[9px] px-2 py-0.5 uppercase tracking-widest inline-block rounded-sm transform -rotate-1 shadow">
                          FREE ADMISSIONS
                        </span>
                        <p className="text-[6px] text-slate-300 font-sans leading-none">
                          Pre-Nursery to Class 10 (CBSE Curriculum)
                        </p>
                      </div>
                    )}

                    {item.id === 'banner-pricing' && (
                      <div className="p-1 text-center bg-slate-900/90 border border-amber-950/25 rounded">
                        <div className="text-[8px] font-extrabold text-amber-400 uppercase">Premium CBSE School</div>
                        <span className="text-[6.5px] text-slate-400 font-mono block mt-0.5">
                          Hotlines: 8507448779, 9852194522
                        </span>
                      </div>
                    )}

                    {/* Bottom strip of mockup */}
                    <div className="flex justify-between items-center text-[5.5px] font-sans text-slate-500 border-t border-slate-900 pt-1">
                      <span>Dhanbad, Jharkhand</span>
                      <span>Admissions Open 2026-27</span>
                    </div>

                  </div>
                ) : (
                  /* 2. REAL HIGH-QUALITY PHOTOGRAPHIC ASSETS */
                  <div className="w-full h-full relative overflow-hidden bg-slate-900">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent opacity-90" />
                  </div>
                )}

                {/* Cover/Action Hover Panel */}
                <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-4.5 z-20">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-amber-400 uppercase px-2 py-0.5 bg-amber-500/10 rounded border border-amber-500/20">
                      {item.category === 'banner' ? 'Campaign Print' : item.category}
                    </span>
                    <button className="text-white hover:text-amber-400 transition" title="Expand media">
                      <Maximize2 size={15} />
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="font-serif font-bold text-white text-sm tracking-wide leading-tight group-hover:translate-y-0 translate-y-2 transition-transform duration-300">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-300 font-sans leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Static Footer (Visible info on bottom of card by default) */}
                <div className="bg-slate-900 border-t border-slate-800 p-3 flex justify-between items-center z-10">
                  <span className="text-xs font-serif font-semibold text-slate-200 truncate pr-2">
                    {item.title}
                  </span>
                  <span className="text-[9px] font-mono tracking-widest text-[#D4AF37] uppercase shrink-0">
                    {item.category}
                  </span>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* FULL-SCREEN GLASSY LIGHTBOX MODAL */}
      {activeLightboxItem && (
        <div 
          className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-50 flex flex-col justify-between p-4 animate-fade-in"
          onClick={() => setActiveLightboxIndex(null)}
          id="lightbox-backdrop"
        >
          {/* Lightbox Header Controller details */}
          <div className="flex justify-between items-center max-w-7xl mx-auto w-full py-4 border-b border-slate-900 z-50">
            <div className="flex items-center gap-2">
              <ImageIcon className="text-amber-400" size={18} />
              <div>
                <h4 className="font-serif font-black text-white text-base tracking-wide uppercase leading-none">
                  {activeLightboxItem.title}
                </h4>
                <p className="text-[10px] text-slate-400 font-sans uppercase mt-1 tracking-widest">
                  File Segment: {activeLightboxItem.category} • Pre-Nursery to Class X CBSE CRM
                </p>
              </div>
            </div>

            <button 
              onClick={() => setActiveLightboxIndex(null)}
              className="bg-slate-900/80 border border-slate-800 text-slate-400 p-2 rounded-full hover:text-white transition cursor-pointer"
              id="close-lightbox-btn"
            >
              <X size={18} />
            </button>
          </div>

          {/* Central Active Media Display */}
          <div className="flex-1 max-w-5xl mx-auto w-full flex items-center justify-center p-2 relative" id="lightbox-body">
            
            {/* Left selector chevron */}
            <button 
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-slate-900/60 border border-slate-800 text-slate-300 p-3.5 rounded-full hover:text-white hover:bg-slate-800/80 transition z-50 cursor-pointer text-sm font-bold"
              id="lightbox-prev-btn"
            >
              ◀
            </button>

            {/* Active Asset Render */}
            <div className="max-h-[60vh] sm:max-h-[65vh] w-full flex justify-center items-center shadow-2xl relative select-none" id="active-lightbox-asset-wrapper">
              {activeLightboxItem.imageUrl.startsWith('/') ? (
                /* CSS RENDER FOR THE RICH MARKETING PRINTS */
                <div 
                  className="bg-slate-900 border-2 border-amber-500/40 rounded-xl p-8 max-w-2xl w-full aspect-[1.8/1] flex flex-col justify-between shadow-2xl text-slate-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-slate-950 border border-amber-400 flex items-center justify-center text-xs text-amber-400 font-serif font-black">
                        P
                      </div>
                      <div>
                        <span className="font-serif font-black tracking-widest text-sm text-white block uppercase">PANCHATANTRA</span>
                        <span className="text-[9px] font-serif tracking-wider font-semibold text-amber-400 block uppercase">Ethics School</span>
                      </div>
                    </div>
                    <span className="bg-slate-950 border border-slate-800 text-slate-400 text-[10px] font-mono py-1 px-2.5 rounded font-semibold uppercase">
                      {activeLightboxItem.id === 'banner-comparative' ? '85"x48" Graphic Board' : '6X4 Feet PVC Banner'}
                    </span>
                  </div>

                  <div className="space-y-4 text-center my-2">
                    <h3 className="font-serif font-black text-white text-2xl sm:text-3xl tracking-tight uppercase leading-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-300">
                      {activeLightboxItem.id === 'banner-comparative' ? 'CURRICULA COMPARATIVE MATRIX' : 'ADMISSIONS OPEN 2026-27'}
                    </h3>
                    <p className="font-sans text-xs italic text-slate-300 max-w-md mx-auto">
                      "Moral Learning For A Changing World • English Medium CBSE Program"
                    </p>
                  </div>

                  {activeLightboxItem.id === 'banner-comparative' ? (
                    <div className="bg-slate-950 border border-slate-850 p-4 rounded-lg text-xs space-y-2 max-w-xl mx-auto w-full">
                      <div className="grid grid-cols-4 gap-2 text-[10px] font-mono text-slate-500 uppercase border-b border-slate-850 pb-1 font-bold">
                        <div>Stage Segment</div>
                        <div>Educational Tool</div>
                        <div>Core Ethics focus</div>
                        <div>Evaluation Metric</div>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-slate-300 border-b border-slate-850/50 pb-1.5 align-middle">
                        <div className="font-bold text-amber-400">Pre-Nursery to UKG</div>
                        <div>Puppetry & Interactive Play</div>
                        <div>Empathy & Trust</div>
                        <div>Observation Based</div>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-slate-300 border-b border-slate-850/50 pb-1.5 align-middle">
                        <div className="font-bold text-amber-400">Class I to VII</div>
                        <div>Storybooks & Drama Assembly</div>
                        <div>Cooperation & Respect</div>
                        <div>Collaborative Projects</div>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-slate-300 align-middle">
                        <div className="font-bold text-amber-400">Class VIII to X</div>
                        <div>Ethics Debates & Case Studies</div>
                        <div>Integrity & Strategy</div>
                        <div>Logic & Reasoning tests</div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-sans text-slate-300 max-w-lg mx-auto bg-slate-950 p-4 rounded-lg border border-slate-850">
                      <div className="text-center sm:text-left space-y-1">
                        <div className="font-bold text-emerald-400 text-sm uppercase">Join Us For Admission</div>
                        <p className="text-slate-400 text-[10.5px]">Neel Kuthi, Amtal, Dhanbad, Jharkhand - 828111</p>
                      </div>
                      <div className="h-px w-full sm:h-10 sm:w-px bg-slate-800" />
                      <div className="text-center sm:text-right space-y-1 font-mono">
                        <div className="text-slate-400 text-[10px]">Hotlines Contact:</div>
                        <div className="text-amber-300 font-bold">8507448779 • 9852194522</div>
                      </div>
                    </div>
                  )}

                  <div className="text-center text-[10px] text-slate-500 font-mono mt-4 uppercase">
                    Panchatantra ethics school campaign brand file. Est. 2026. All Rights Reserved.
                  </div>
                </div>
              ) : (
                /* PHOTO DISPLAY WITH IMAGE LOADER */
                <img 
                  src={activeLightboxItem.imageUrl} 
                  alt={activeLightboxItem.title} 
                  referrerPolicy="no-referrer"
                  className="max-h-[60vh] sm:max-h-[65vh] object-contain rounded-lg border border-slate-850"
                  onClick={(e) => e.stopPropagation()}
                />
              )}
            </div>

            {/* Right selector chevron */}
            <button 
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-slate-900/60 border border-slate-800 text-slate-300 p-3.5 rounded-full hover:text-white hover:bg-slate-800/80 transition z-50 cursor-pointer text-sm font-bold"
              id="lightbox-next-btn-right"
            >
              ▶
            </button>

          </div>

          {/* Lightbox Footer text and action prompts */}
          <div className="max-w-2xl mx-auto text-center w-full py-6 text-slate-300 z-50" onClick={(e) => e.stopPropagation()}>
            <p className="text-sm font-sans leading-relaxed text-slate-300">
              "{activeLightboxItem.description}"
            </p>
            {onOpenConsultationForm && (
              <button
                onClick={() => {
                  setActiveLightboxIndex(null);
                  onOpenConsultationForm();
                }}
                className="mt-4 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold font-sans py-2.5 px-6 rounded-full transition cursor-pointer shadow-lg hover:shadow-amber-500/10"
              >
                Inquire Admission Information about This Program
              </button>
            )}
          </div>

        </div>
      )}

    </section>
  );
}
