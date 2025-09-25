export type FormDataType = {
  // General settings
  language: string;
  timezone: string;
  dateFormat: string;
  contactEmail: string;
  address: string;
  
  // Security settings
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
  
  // Additional security settings
  security?: {
    twoFactorAuth?: boolean;
    loginNotifications?: boolean;
    activityAlerts?: boolean;
    sessionTimeout?: string;
    shareUsageData?: boolean;
    allowCookies?: boolean;
  };
  
  // Password management
  passwords?: {
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  };
  
  // Notification settings
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
  
  // Appearance settings
  appearance: {
    theme: string;
    fontSize: string;
    reducedMotion: boolean;
    highContrast: boolean;
    compactView: boolean;
  };
  
  // Role-specific settings
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
    acceptReturns?: boolean;
    shippingOptions?: string[];
    offerPickup?: boolean;
    offerInstallation?: boolean;
    offerWarranty?: boolean;
    warrantyPeriod?: string;
    returnsWindow?: number;
    restockingFee?: number;
    autoAcceptOrders?: boolean;
    shippingRadius?: number;
    minOrderValue?: number;
    freeShippingThreshold?: number;
    allowPickups?: boolean;
    offerExpeditedShipping?: boolean;
    showStockLevels?: boolean;
    autoRestock?: boolean;
    lowStockThreshold?: number;
    bulkDiscounts?: boolean;
    partCompatibilityCheck?: boolean;
  };
  vehicleOwnerSettings?: {
    shareMaintenanceHistory?: boolean;
    reminderFrequency?: string;
    autoSchedule?: boolean;
    preferredRepairers?: string[];
    preferredPartsBrands?: string[];
    defaultServiceRadius?: number;
    preferredSellers?: string[];
    automaticServiceReminders?: boolean;
    showPriceEstimates?: boolean;
    shareDrivingData?: boolean;
    receivePartSuggestions?: boolean;
    maintenanceAlerts?: boolean;
  };
  adminSettings?: {
    systemEmail?: string;
    userApprovalRequired?: boolean;
    sellerVerificationRequired?: boolean;
    repairerVerificationRequired?: boolean;
    autoSuspendThreshold?: number;
    maintenanceMode?: boolean;
    maintenanceMessage?: string;
    enableBetaFeatures?: boolean;
    systemLoggingLevel?: string;
    dataRetentionPeriod?: number;
    autoBackupFrequency?: string;
    maxFileUploadSize?: number;
    loggingLevel?: string;
    analyticsEnabled?: boolean;
    backupFrequency?: string;
  };
};