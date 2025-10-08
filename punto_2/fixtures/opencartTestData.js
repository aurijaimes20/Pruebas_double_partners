/**
 * Datos de prueba específicos para OpenCart
 * Contiene datos de usuarios, productos y configuraciones para las pruebas
 */

// Datos de usuarios para registro
const userData = {
  // Usuario válido para registro exitoso
  validUser: {
    firstName: 'Juan',
    lastName: 'Pérez',
    email: 'juan.perez.test@example.com',
    telephone: '1234567890',
    password: 'TestPassword123!',
    confirmPassword: 'TestPassword123!',
    subscribeNewsletter: false,
    agreePrivacyPolicy: true
  },

  // Usuario con datos mínimos válidos
  minimalValidUser: {
    firstName: 'Ana',
    lastName: 'García',
    email: 'ana.garcia.test@example.com',
    telephone: '0987654321',
    password: 'MinimalPass123',
    confirmPassword: 'MinimalPass123',
    subscribeNewsletter: false,
    agreePrivacyPolicy: true
  },

  // Usuario que se suscribe al newsletter
  newsletterSubscriber: {
    firstName: 'Carlos',
    lastName: 'López',
    email: 'carlos.lopez.test@example.com',
    telephone: '5555555555',
    password: 'NewsletterPass123',
    confirmPassword: 'NewsletterPass123',
    subscribeNewsletter: true,
    agreePrivacyPolicy: true
  },

  // Usuario con email inválido
  invalidEmailUser: {
    firstName: 'María',
    lastName: 'Rodríguez',
    email: 'email-invalido',
    telephone: '1111111111',
    password: 'ValidPass123',
    confirmPassword: 'ValidPass123',
    subscribeNewsletter: false,
    agreePrivacyPolicy: true
  },

  // Usuario con contraseñas que no coinciden
  passwordMismatchUser: {
    firstName: 'Pedro',
    lastName: 'Martínez',
    email: 'pedro.martinez.test@example.com',
    telephone: '2222222222',
    password: 'Password123',
    confirmPassword: 'DifferentPassword123',
    subscribeNewsletter: false,
    agreePrivacyPolicy: true
  },

  // Usuario sin aceptar política de privacidad
  noPrivacyPolicyUser: {
    firstName: 'Laura',
    lastName: 'Fernández',
    email: 'laura.fernandez.test@example.com',
    telephone: '3333333333',
    password: 'ValidPass123',
    confirmPassword: 'ValidPass123',
    subscribeNewsletter: false,
    agreePrivacyPolicy: false
  },

  // Usuario con campos vacíos
  emptyFieldsUser: {
    firstName: '',
    lastName: '',
    email: '',
    telephone: '',
    password: '',
    confirmPassword: '',
    subscribeNewsletter: false,
    agreePrivacyPolicy: false
  },

  // Usuario con contraseña débil
  weakPasswordUser: {
    firstName: 'Roberto',
    lastName: 'Sánchez',
    email: 'roberto.sanchez.test@example.com',
    telephone: '4444444444',
    password: '123',
    confirmPassword: '123',
    subscribeNewsletter: false,
    agreePrivacyPolicy: true
  },

  // Usuario con teléfono inválido
  invalidTelephoneUser: {
    firstName: 'Isabel',
    lastName: 'González',
    email: 'isabel.gonzalez.test@example.com',
    telephone: 'abc123def',
    password: 'ValidPass123',
    confirmPassword: 'ValidPass123',
    subscribeNewsletter: false,
    agreePrivacyPolicy: true
  }
};

// Datos de productos para pruebas
const productData = {
  // Productos destacados
  featuredProducts: [
    {
      name: 'MacBook',
      price: '$602.00',
      category: 'Laptops & Notebooks',
      description: 'Intel Core 2 Duo processor'
    },
    {
      name: 'iPhone',
      price: '$123.20',
      category: 'Phones & PDAs',
      description: 'iPhone is a revolutionary new mobile phone'
    },
    {
      name: 'Apple Cinema 30"',
      price: '$110.00',
      category: 'Desktops',
      description: 'The 30-inch Apple Cinema HD Display'
    },
    {
      name: 'Canon EOS 5D',
      price: '$98.00',
      category: 'Cameras',
      description: 'Canon\'s press material for the EOS 5D'
    }
  ],

  // Categorías de productos
  categories: [
    'Desktops',
    'Laptops & Notebooks',
    'Components',
    'Tablets',
    'Software',
    'Phones & PDAs',
    'Cameras',
    'MP3 Players'
  ],

  // Términos de búsqueda
  searchTerms: [
    'MacBook',
    'iPhone',
    'Canon',
    'Apple',
    'Samsung',
    'Nikon',
    'Sony',
    'Dell'
  ]
};

// Configuraciones de la aplicación
const appConfig = {
  // URLs
  baseUrl: 'https://opencart.abstracta.us',
  homePageUrl: 'https://opencart.abstracta.us/',
  registerPageUrl: 'https://opencart.abstracta.us/index.php?route=account/register',
  loginPageUrl: 'https://opencart.abstracta.us/index.php?route=account/login',
  successPageUrl: 'https://opencart.abstracta.us/index.php?route=account/success',
  accountPageUrl: 'https://opencart.abstracta.us/index.php?route=account/account',
  
  // Títulos de página
  pageTitles: {
    home: 'Your Store',
    register: 'Register Account',
    login: 'Account Login',
    success: 'Your Account Has Been Created!',
    account: 'My Account'
  },

  // Mensajes esperados
  expectedMessages: {
    registrationSuccess: 'Congratulations! Your new account has been successfully created!',
    memberPrivileges: 'You can now take advantage of member privileges to enhance your online shopping experience with us.',
    questionsMessage: 'If you have ANY questions about the operation of this online shop, please e-mail the store owner.',
    confirmationEmail: 'A confirmation has been sent to the provided e-mail address.',
    privacyPolicyRequired: 'Warning: You must agree to the Privacy Policy!',
    emailAlreadyExists: 'Warning: E-Mail Address is already registered!',
    passwordMismatch: 'Password confirmation does not match password!',
    loginSuccess: 'My Account',
    passwordResetSuccess: 'An email with a confirmation link has been sent your email address.',
    loginError: 'Warning: No match for E-Mail Address and/or Password.',
    invalidEmail: 'E-Mail Address does not appear to be valid!',
    firstNameRequired: 'First Name must be between 1 and 32 characters!',
    lastNameRequired: 'Last Name must be between 1 and 32 characters!',
    telephoneRequired: 'Telephone must be between 3 and 32 characters!',
    passwordRequired: 'Password must be between 4 and 20 characters!'
  },

  // Timeouts
  timeouts: {
    short: 5000,    // 5 segundos
    medium: 10000,  // 10 segundos
    long: 30000     // 30 segundos
  }
};

// Datos de navegación
const navigationData = {
  // Enlaces del menú principal
  mainMenuLinks: [
    'Desktops',
    'Laptops & Notebooks',
    'Components',
    'Tablets',
    'Software',
    'Phones & PDAs',
    'Cameras',
    'MP3 Players'
  ],

  // Enlaces del footer
  footerLinks: {
    information: [
      'About Us',
      'Delivery Information',
      'Privacy Policy',
      'Terms & Conditions'
    ],
    customerService: [
      'Contact Us',
      'Returns',
      'Site Map'
    ],
    extras: [
      'Brands',
      'Gift Certificates',
      'Affiliate',
      'Specials'
    ],
    myAccount: [
      'My Account',
      'Order History',
      'Wish List',
      'Newsletter'
    ]
  },

  // Enlaces del sidebar de cuenta
  accountSidebarLinks: [
    'My Account',
    'Edit Account',
    'Password',
    'Address Book',
    'Wish List',
    'Order History',
    'Downloads',
    'Recurring payments',
    'Reward Points',
    'Returns',
    'Transactions',
    'Newsletter',
    'Logout'
  ]
};

// Datos de validación
const validationData = {
  // Patrones de validación
  patterns: {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[\d\s\-\+\(\)]+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  },

  // Límites de caracteres
  characterLimits: {
    firstName: { min: 1, max: 32 },
    lastName: { min: 1, max: 32 },
    email: { min: 5, max: 96 },
    telephone: { min: 3, max: 32 },
    password: { min: 4, max: 20 }
  },

  // Mensajes de validación
  validationMessages: {
    required: 'This field is required',
    tooShort: 'must be at least',
    tooLong: 'must not exceed',
    invalidFormat: 'Invalid format',
    alreadyExists: 'already exists'
  }
};

// Datos de prueba para diferentes escenarios
const testScenarios = {
  // Escenarios de registro
  registrationScenarios: [
    {
      name: 'Registro exitoso con datos válidos',
      user: userData.validUser,
      expectedResult: 'success',
      description: 'Usuario se registra exitosamente con todos los datos válidos'
    },
    {
      name: 'Registro con email inválido',
      user: userData.invalidEmailUser,
      expectedResult: 'error',
      description: 'Usuario intenta registrarse con email inválido'
    },
    {
      name: 'Registro con contraseñas que no coinciden',
      user: userData.passwordMismatchUser,
      expectedResult: 'error',
      description: 'Usuario intenta registrarse con contraseñas diferentes'
    },
    {
      name: 'Registro sin aceptar política de privacidad',
      user: userData.noPrivacyPolicyUser,
      expectedResult: 'error',
      description: 'Usuario intenta registrarse sin aceptar política de privacidad'
    },
    {
      name: 'Registro con campos vacíos',
      user: userData.emptyFieldsUser,
      expectedResult: 'error',
      description: 'Usuario intenta registrarse sin llenar campos obligatorios'
    }
  ],

  // Escenarios de navegación
  navigationScenarios: [
    {
      name: 'Navegación a página de registro',
      action: 'navigateToRegister',
      expectedUrl: appConfig.registerPageUrl,
      description: 'Usuario navega desde home a página de registro'
    },
    {
      name: 'Navegación a página de login',
      action: 'navigateToLogin',
      expectedUrl: appConfig.loginPageUrl,
      description: 'Usuario navega desde home a página de login'
    },
    {
      name: 'Navegación a categoría de productos',
      action: 'navigateToCategory',
      category: 'Desktops',
      expectedUrl: 'product/category&path=20',
      description: 'Usuario navega a categoría de productos'
    }
  ]
};

// Datos de login
const loginTestData = {
  validCredentials: {
    email: 'juan.perez.test@example.com',
    password: 'TestPassword123!',
  },
  invalidCredentials: {
    email: 'invalid@example.com',
    password: 'WrongPassword123!',
  },
  emptyCredentials: {
    email: '',
    password: '',
  },
  invalidEmail: {
    email: 'invalid-email',
    password: 'TestPassword123!',
  },
  invalidPassword: {
    email: 'juan.perez.test@example.com',
    password: 'wrongpassword',
  },
};

module.exports = {
  userData,
  productData,
  appConfig,
  navigationData,
  validationData,
  testScenarios,
  loginTestData
};
