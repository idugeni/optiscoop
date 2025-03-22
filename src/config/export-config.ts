/**
 * Export configuration for content formats
 */

export const EXPORT_CONFIG = {
  // Available export formats
  formats: {
    // Document formats
    pdf: {
      enabled: true,
      template: 'default',
      options: {
        pageSize: 'A4',
        margins: { top: 40, bottom: 40, left: 40, right: 40 },
        header: true,
        footer: true
      }
    },
    docx: {
      enabled: true,
      template: 'default',
      options: {
        margins: { top: 2.54, bottom: 2.54, left: 3.17, right: 3.17 },
        header: true,
        footer: true
      }
    },
    
    // Web formats
    html: {
      enabled: true,
      template: 'responsive',
      options: {
        styles: true,
        images: true,
        metadata: true
      }
    },
    markdown: {
      enabled: true,
      flavor: 'github',
      options: {
        frontMatter: true,
        tableOfContents: true
      }
    },
    
    // Data formats
    json: {
      enabled: true,
      options: {
        pretty: true,
        metadata: true
      }
    },
    csv: {
      enabled: true,
      options: {
        delimiter: ',',
        headers: true
      }
    }
  },
  
  // Export settings
  settings: {
    // Default format
    defaultFormat: 'pdf',
    
    // Export settings
    export: {
      enabled: true,
      maxItems: 50
    },
    
    // File naming
    fileNaming: {
      pattern: '{date}_{title}_{format}',
      dateFormat: 'YYYY-MM-DD'
    },
    
    // Storage settings
    storage: {
      local: true,
      cloud: false,
      retentionDays: 30
    }
  }
};