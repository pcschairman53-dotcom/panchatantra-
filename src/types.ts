/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Lead {
  id: string;
  timestamp: string;
  studentName: string;
  parentName: string;
  mobile: string;
  email: string;
  classApplying: string;
  address: string;
  message: string;
  leadSource: string;
  status: 'New' | 'Contacted' | 'Interview Scheduled' | 'Admitted' | 'Closed';
  notes?: string;
}

export interface WebhookSettings {
  googleAppsScriptUrl: string;
  makeWhatsappWebhookUrl: string;
  adminEmail: string;
}

export interface EducationalProgram {
  id: string;
  title: string;
  ageGroup: string;
  highlights: string[];
  learningMethod: string;
  bannerColor: string;
}

export interface SchoolFeature {
  title: string;
  description: string;
  iconName: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'campus' | 'classroom' | 'activities' | 'sports' | 'banner';
  imageUrl: string;
  description: string;
}
