/**
 * TestData - Datos de prueba para las pruebas automatizadas
 * Contiene conjuntos de datos que se utilizan en las pruebas
 */

// Datos de usuarios para pruebas
const USER_DATA = {
  // Usuario válido estándar
  VALID_USER: {
    email: 'test.user@example.com',
    password: 'TestPassword123!',
    confirmPassword: 'TestPassword123!',
    firstName: 'Test',
    lastName: 'User',
    phone: '123-456-7890',
    dateOfBirth: '1990-01-01',
    address: {
      street: '123 Test Street',
      city: 'Test City',
      state: 'Test State',
      zipCode: '12345',
      country: 'United States'
    }
  },

  // Usuario administrador
  ADMIN_USER: {
    email: 'admin@example.com',
    password: 'AdminPassword123!',
    confirmPassword: 'AdminPassword123!',
    firstName: 'Admin',
    lastName: 'User',
    phone: '987-654-3210',
    role: 'admin',
    permissions: ['read', 'write', 'delete', 'admin']
  },

  // Usuario con datos mínimos
  MINIMAL_USER: {
    email: 'minimal@example.com',
    password: 'Minimal123!',
    firstName: 'Minimal',
    lastName: 'User'
  },

  // Usuario con datos inválidos
  INVALID_USER: {
    email: 'invalid-email',
    password: '123', // Contraseña muy corta
    firstName: '', // Nombre vacío
    lastName: '', // Apellido vacío
    phone: 'invalid-phone'
  },

  // Usuario para pruebas de registro
  REGISTRATION_USER: {
    email: 'new.user@example.com',
    password: 'NewUserPassword123!',
    confirmPassword: 'NewUserPassword123!',
    firstName: 'New',
    lastName: 'User',
    phone: '555-123-4567',
    termsAccepted: true,
    newsletterSubscription: false
  }
};

// Datos de productos para pruebas
const PRODUCT_DATA = {
  // Producto válido estándar
  VALID_PRODUCT: {
    name: 'Test Product',
    description: 'This is a comprehensive test product description that includes all necessary details for testing purposes.',
    price: 99.99,
    originalPrice: 129.99,
    category: 'Electronics',
    subcategory: 'Smartphones',
    brand: 'TestBrand',
    sku: 'TEST-001',
    stock: 100,
    weight: 0.5,
    dimensions: {
      length: 15,
      width: 8,
      height: 1
    },
    features: [
      'Feature 1',
      'Feature 2',
      'Feature 3'
    ],
    specifications: {
      color: 'Black',
      material: 'Plastic',
      warranty: '1 year'
    }
  },

  // Producto con descuento
  DISCOUNTED_PRODUCT: {
    name: 'Discounted Product',
    description: 'A product with a discount for testing purposes',
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    category: 'Clothing',
    subcategory: 'T-Shirts',
    brand: 'TestBrand',
    sku: 'TEST-002',
    stock: 50
  },

  // Producto sin stock
  OUT_OF_STOCK_PRODUCT: {
    name: 'Out of Stock Product',
    description: 'A product that is currently out of stock',
    price: 49.99,
    category: 'Books',
    subcategory: 'Fiction',
    brand: 'TestBrand',
    sku: 'TEST-003',
    stock: 0
  },

  // Producto con datos inválidos
  INVALID_PRODUCT: {
    name: '', // Nombre vacío
    description: '', // Descripción vacía
    price: -10, // Precio negativo
    category: '', // Categoría vacía
    sku: '', // SKU vacío
    stock: -5 // Stock negativo
  }
};

// Datos de órdenes para pruebas
const ORDER_DATA = {
  // Orden válida
  VALID_ORDER: {
    items: [
      {
        productId: 'TEST-001',
        quantity: 2,
        price: 99.99
      },
      {
        productId: 'TEST-002',
        quantity: 1,
        price: 79.99
      }
    ],
    shippingAddress: {
      firstName: 'Test',
      lastName: 'User',
      street: '123 Test Street',
      city: 'Test City',
      state: 'Test State',
      zipCode: '12345',
      country: 'United States'
    },
    billingAddress: {
      firstName: 'Test',
      lastName: 'User',
      street: '123 Test Street',
      city: 'Test City',
      state: 'Test State',
      zipCode: '12345',
      country: 'United States'
    },
    paymentMethod: {
      type: 'credit_card',
      cardNumber: '4111111111111111',
      expiryDate: '12/25',
      cvv: '123',
      cardholderName: 'Test User'
    },
    shippingMethod: 'standard',
    notes: 'Test order notes'
  },

  // Orden con datos mínimos
  MINIMAL_ORDER: {
    items: [
      {
        productId: 'TEST-001',
        quantity: 1,
        price: 99.99
      }
    ],
    shippingAddress: {
      firstName: 'Test',
      lastName: 'User',
      street: '123 Test Street',
      city: 'Test City',
      zipCode: '12345'
    }
  }
};

// Datos de formularios para pruebas
const FORM_DATA = {
  // Formulario de contacto
  CONTACT_FORM: {
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test Subject',
    message: 'This is a test message for the contact form.',
    phone: '123-456-7890',
    company: 'Test Company'
  },

  // Formulario de newsletter
  NEWSLETTER_FORM: {
    email: 'newsletter@example.com',
    firstName: 'Newsletter',
    lastName: 'Subscriber',
    interests: ['Technology', 'Business', 'Lifestyle']
  },

  // Formulario de búsqueda
  SEARCH_FORM: {
    query: 'test product',
    category: 'Electronics',
    priceRange: {
      min: 10,
      max: 100
    },
    sortBy: 'price_asc'
  }
};

// Datos de configuración para pruebas
const CONFIG_DATA = {
  // Configuración de navegador
  BROWSER_CONFIG: {
    headless: true,
    slowMo: 0,
    viewport: {
      width: 1280,
      height: 720
    }
  },

  // Configuración de timeouts
  TIMEOUT_CONFIG: {
    default: 10000,
    navigation: 30000,
    action: 10000,
    network: 15000
  },

  // Configuración de reportes
  REPORT_CONFIG: {
    screenshots: true,
    videos: true,
    traces: true,
    html: true,
    json: true
  }
};

// Datos de validación para pruebas
const VALIDATION_DATA = {
  // Emails válidos
  VALID_EMAILS: [
    'test@example.com',
    'user.name@domain.co.uk',
    'test+tag@example.org',
    '123@test.com'
  ],

  // Emails inválidos
  INVALID_EMAILS: [
    'invalid-email',
    '@example.com',
    'test@',
    'test.example.com',
    'test@.com'
  ],

  // Contraseñas válidas
  VALID_PASSWORDS: [
    'Password123!',
    'MySecurePass1@',
    'Test123456$',
    'StrongPass99#'
  ],

  // Contraseñas inválidas
  INVALID_PASSWORDS: [
    '123', // Muy corta
    'password', // Sin números ni caracteres especiales
    'PASSWORD123', // Sin minúsculas ni caracteres especiales
    'Password', // Sin números ni caracteres especiales
    '' // Vacía
  ],

  // Números de teléfono válidos
  VALID_PHONES: [
    '123-456-7890',
    '(123) 456-7890',
    '+1 123 456 7890',
    '123.456.7890'
  ],

  // Números de teléfono inválidos
  INVALID_PHONES: [
    '123', // Muy corto
    'invalid-phone',
    '123-456-789', // Formato incorrecto
    '' // Vacío
  ]
};

// Datos de API para pruebas
const API_DATA = {
  // Endpoints de prueba
  ENDPOINTS: {
    USERS: '/api/users',
    PRODUCTS: '/api/products',
    ORDERS: '/api/orders',
    AUTH: '/api/auth'
  },

  // Headers de prueba
  HEADERS: {
    CONTENT_TYPE: 'application/json',
    ACCEPT: 'application/json',
    AUTHORIZATION: 'Bearer test-token'
  },

  // Códigos de estado HTTP
  STATUS_CODES: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
  }
};

module.exports = {
  USER_DATA,
  PRODUCT_DATA,
  ORDER_DATA,
  FORM_DATA,
  CONFIG_DATA,
  VALIDATION_DATA,
  API_DATA
};
