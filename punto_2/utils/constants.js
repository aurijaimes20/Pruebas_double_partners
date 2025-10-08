/**
 * Constants - Constantes utilizadas en las pruebas
 * Contiene valores fijos que se utilizan en múltiples lugares
 */

// URLs de la aplicación
const URLS = {
  BASE_URL: process.env.BASE_URL || 'https://example.com',
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:id',
  CART: '/cart',
  CHECKOUT: '/checkout',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  ABOUT: '/about',
  CONTACT: '/contact',
  HELP: '/help',
  FAQ: '/faq'
};

// Timeouts en milisegundos
const TIMEOUTS = {
  DEFAULT: 10000,
  SHORT: 5000,
  LONG: 30000,
  VERY_LONG: 60000,
  NAVIGATION: 30000,
  ACTION: 10000,
  NETWORK: 15000
};

// Selectores comunes
const COMMON_SELECTORS = {
  // Navegación
  LOGO: '[data-testid="logo"]',
  NAVIGATION_MENU: '[data-testid="navigation-menu"]',
  BURGER_MENU: '[data-testid="burger-menu"]',
  SEARCH_INPUT: '[data-testid="search-input"]',
  SEARCH_BUTTON: '[data-testid="search-button"]',
  
  // Botones comunes
  SUBMIT_BUTTON: '[data-testid="submit-button"]',
  CANCEL_BUTTON: '[data-testid="cancel-button"]',
  SAVE_BUTTON: '[data-testid="save-button"]',
  DELETE_BUTTON: '[data-testid="delete-button"]',
  EDIT_BUTTON: '[data-testid="edit-button"]',
  CLOSE_BUTTON: '[data-testid="close-button"]',
  
  // Formularios
  FORM: '[data-testid="form"]',
  INPUT_FIELD: '[data-testid="input-field"]',
  TEXTAREA: '[data-testid="textarea"]',
  SELECT_DROPDOWN: '[data-testid="select-dropdown"]',
  CHECKBOX: '[data-testid="checkbox"]',
  RADIO_BUTTON: '[data-testid="radio-button"]',
  
  // Mensajes
  SUCCESS_MESSAGE: '[data-testid="success-message"]',
  ERROR_MESSAGE: '[data-testid="error-message"]',
  WARNING_MESSAGE: '[data-testid="warning-message"]',
  INFO_MESSAGE: '[data-testid="info-message"]',
  
  // Loading
  LOADING_SPINNER: '[data-testid="loading-spinner"]',
  LOADING_OVERLAY: '[data-testid="loading-overlay"]',
  
  // Modal
  MODAL: '[data-testid="modal"]',
  MODAL_OVERLAY: '[data-testid="modal-overlay"]',
  MODAL_TITLE: '[data-testid="modal-title"]',
  MODAL_CONTENT: '[data-testid="modal-content"]',
  
  // Footer
  FOOTER: '[data-testid="footer"]',
  FOOTER_LINKS: '[data-testid="footer-links"]',
  SOCIAL_LINKS: '[data-testid="social-links"]'
};

// Datos de prueba
const TEST_DATA = {
  // Usuarios de prueba
  USERS: {
    VALID_USER: {
      email: 'test@example.com',
      password: 'TestPassword123!',
      firstName: 'Test',
      lastName: 'User',
      phone: '123-456-7890'
    },
    INVALID_USER: {
      email: 'invalid@example.com',
      password: 'wrongpassword',
      firstName: 'Invalid',
      lastName: 'User'
    },
    ADMIN_USER: {
      email: 'admin@example.com',
      password: 'AdminPassword123!',
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin'
    }
  },
  
  // Productos de prueba
  PRODUCTS: {
    VALID_PRODUCT: {
      name: 'Test Product',
      description: 'This is a test product description',
      price: 99.99,
      category: 'Electronics',
      sku: 'TEST-001'
    },
    INVALID_PRODUCT: {
      name: '',
      description: '',
      price: -10,
      category: '',
      sku: ''
    }
  },
  
  // Direcciones de prueba
  ADDRESSES: {
    VALID_ADDRESS: {
      street: '123 Test Street',
      city: 'Test City',
      state: 'Test State',
      zipCode: '12345',
      country: 'Test Country'
    },
    INVALID_ADDRESS: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    }
  }
};

// Configuración de navegadores
const BROWSER_CONFIG = {
  CHROME: {
    name: 'chromium',
    headless: process.env.HEADLESS !== 'false',
    slowMo: parseInt(process.env.SLOW_MO) || 0
  },
  FIREFOX: {
    name: 'firefox',
    headless: process.env.HEADLESS !== 'false',
    slowMo: parseInt(process.env.SLOW_MO) || 0
  },
  SAFARI: {
    name: 'webkit',
    headless: process.env.HEADLESS !== 'false',
    slowMo: parseInt(process.env.SLOW_MO) || 0
  }
};

// Configuración de reportes
const REPORT_CONFIG = {
  HTML_REPORT: {
    outputFolder: 'playwright-report',
    open: 'never'
  },
  JSON_REPORT: {
    outputFile: 'test-results/results.json'
  },
  JUNIT_REPORT: {
    outputFile: 'test-results/results.xml'
  },
  SCREENSHOTS: {
    path: 'screenshots',
    fullPage: true,
    type: 'png'
  },
  VIDEOS: {
    path: 'videos',
    mode: 'retain-on-failure'
  }
};

// Mensajes de error comunes
const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error occurred',
  TIMEOUT_ERROR: 'Operation timed out',
  ELEMENT_NOT_FOUND: 'Element not found',
  ELEMENT_NOT_VISIBLE: 'Element not visible',
  INVALID_INPUT: 'Invalid input provided',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Access forbidden',
  NOT_FOUND: 'Resource not found',
  SERVER_ERROR: 'Internal server error'
};

// Estados de la aplicación
const APP_STATES = {
  LOADING: 'loading',
  LOADED: 'loaded',
  ERROR: 'error',
  SUCCESS: 'success',
  IDLE: 'idle'
};

// Tipos de datos
const DATA_TYPES = {
  STRING: 'string',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  OBJECT: 'object',
  ARRAY: 'array',
  DATE: 'date',
  EMAIL: 'email',
  URL: 'url',
  PHONE: 'phone'
};

// Configuración de API
const API_CONFIG = {
  BASE_URL: process.env.API_BASE_URL || 'https://api.example.com',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

// Configuración de base de datos
const DB_CONFIG = {
  HOST: process.env.DB_HOST || 'localhost',
  PORT: process.env.DB_PORT || 5432,
  NAME: process.env.DB_NAME || 'test_db',
  USER: process.env.DB_USER || 'test_user',
  PASSWORD: process.env.DB_PASSWORD || 'test_password',
  TIMEOUT: 10000
};

module.exports = {
  URLS,
  TIMEOUTS,
  COMMON_SELECTORS,
  TEST_DATA,
  BROWSER_CONFIG,
  REPORT_CONFIG,
  ERROR_MESSAGES,
  APP_STATES,
  DATA_TYPES,
  API_CONFIG,
  DB_CONFIG
};
