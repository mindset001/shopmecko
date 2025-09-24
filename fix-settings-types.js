// This script adds proper type definitions to settings components
const fs = require('fs');
const path = require('path');

// Define a properly typed FormDataType that can be used across settings components
const formDataTypeDefinition = `
// Define FormData type based on the state structure
type FormDataType = {
  language: string;
  timezone: string;
  dateFormat: string;
  contactEmail: string;
  address: string;
  twoFactorEnabled: boolean;
  loginNotifications: boolean;
  sessionTimeout: string;
  deviceManagement: {
    currentDevice: {
      name: string;
      lastActive: string;
      location: string;
    }
  };
  notifications: {
    account: { email: boolean; push: boolean; sms: boolean };
    updates: { email: boolean; push: boolean; sms: boolean };
    promotions: { email: boolean; push: boolean; sms: boolean };
    security: { email: boolean; push: boolean; sms: boolean };
    serviceUpdates: { email: boolean; push: boolean; sms: boolean };
  };
  notificationPreferences: {
    digestEmails: boolean;
    quietHours: boolean;
  };
  appearance: {
    theme: string;
    fontSize: string;
    reducedMotion: boolean;
    highContrast: boolean;
    compactView: boolean;
  };
  repairerSettings?: {
    serviceArea: number;
    autoAcceptBookings: boolean;
    showAvailableSlots: boolean;
    offerMobileService: boolean;
    offerPickupService: boolean;
    autoOrderParts: boolean;
    instantQuotes: boolean;
    diagnosticToolIntegration: boolean;
    blockBookingSlots: number;
    minimumLeadTime: number;
  };
  sellerSettings?: {
    acceptReturns: boolean;
    shippingOptions: string[];
    offerPickup: boolean;
    offerInstallation: boolean;
    offerWarranty: boolean;
    warrantyPeriod: string;
    returnsWindow: number;
    restockingFee: number;
    autoAcceptOrders: boolean;
  };
  vehicleOwnerSettings?: {
    shareMaintenanceHistory: boolean;
    reminderFrequency: string;
    autoSchedule: boolean;
    preferredRepairers: string[];
    preferredPartsBrands: string[];
  };
  // Admin specific settings
  adminSettings?: {
    systemEmail: string;
    maintenanceMode: boolean;
    loggingLevel: string;
    analyticsEnabled: boolean;
    backupFrequency: string;
  };
};
`;

// Function to add the FormDataType to a file and fix any types
function addFormDataTypeAndFixAny(filePath) {
  const fullPath = path.join(process.cwd(), filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`File not found: ${fullPath}`);
    return;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Check if the file already has a type definition
  if (!content.includes('type FormDataType')) {
    // Add the type definition after the imports
    const importsEnd = content.indexOf("';") + 2;
    const nextLineBreak = content.indexOf('\n', importsEnd);
    
    content = content.slice(0, nextLineBreak + 1) + 
             formDataTypeDefinition +
             content.slice(nextLineBreak + 1);
  }
  
  // Replace any with FormDataType
  content = content.replace(/data: any/g, 'data: FormDataType');
  content = content.replace(/formData: any/g, 'formData: FormDataType');
  content = content.replace(/onChange: any/g, 'onChange: (data: FormDataType) => void');
  content = content.replace(/onUpdate: any/g, 'onUpdate: (data: FormDataType) => void');
  
  fs.writeFileSync(fullPath, content);
  console.log(`Fixed 'any' types in: ${filePath}`);
}

// List of settings files to process
const settingsFiles = [
  'src/app/seller/settings/page.tsx',
  'src/app/vehicle-owner/settings/page.tsx',
  'src/components/settings/admin-settings.tsx',
  'src/components/settings/appearance-settings.tsx',
  'src/components/settings/general-settings.tsx',
  'src/components/settings/notification-settings.tsx',
  'src/components/settings/repairer-settings.tsx',
  'src/components/settings/security-settings.tsx',
  'src/components/settings/seller-settings.tsx',
  'src/components/settings/vehicle-owner-settings.tsx',
];

// Process all the settings files
settingsFiles.forEach(addFormDataTypeAndFixAny);

console.log('\nScript execution complete. Please review changes before committing.');