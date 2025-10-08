# 🎭 Pruebas Automatizadas con Playwright
## Page Object Model - OpenCart Automation

Este proyecto contiene el framework de automatización de pruebas web para **OpenCart** (https://opencart.abstracta.us) usando Playwright con el patrón Page Object Model (POM) en JavaScript.

## 🎯 Objetivo

Automatizar los flujos de prueba más críticos de la tienda OpenCart para reducir el tiempo de ejecución y mejorar la cobertura de pruebas, incluyendo:
- ✅ **Flujo de registro de usuario** (completado)
- 🔄 Flujo de login
- 🔄 Navegación de productos
- 🔄 Proceso de compra
- 🔄 Gestión de cuenta

## 📋 Descripción

Este setup proporciona una base sólida para desarrollar pruebas automatizadas de UI/UX usando:
- **Playwright** como framework de pruebas
- **JavaScript** como lenguaje de programación
- **Page Object Model** como patrón de diseño
- **Estructura modular** para fácil mantenimiento

## 🗂️ Estructura del Proyecto

```
punto_2/
├── pages/                           # Clases de páginas (Page Objects)
│   ├── BasePage.js                 # Página base con métodos comunes
│   ├── HomePage.js                 # Ejemplo genérico de Page Object
│   ├── ProductPage.js              # Ejemplo genérico de Page Object
│   ├── OpenCartHomePage.js         # Page Object para la página principal de OpenCart
│   ├── OpenCartRegisterPage.js     # Page Object para el formulario de registro
│   └── OpenCartSuccessPage.js      # Page Object para la página de éxito del registro
├── tests/                          # Casos de prueba automatizadas
│   ├── example.spec.js             # Ejemplo genérico de pruebas
│   └── opencart-registration.spec.js # Pruebas del flujo de registro de OpenCart
├── utils/                          # Utilidades y constantes
│   ├── helpers.js                  # Funciones auxiliares
│   └── constants.js                # Constantes del proyecto
├── fixtures/                       # Datos de prueba específicos para OpenCart
│   ├── testData.js                 # Datos de prueba genéricos
│   └── opencartTestData.js         # Datos específicos para OpenCart (usuarios, productos, configuraciones)
├── playwright.config.js            # Configuración de Playwright para OpenCart
├── package.json                    # Dependencias y scripts
├── env.example                     # Variables de entorno de ejemplo
├── .gitignore                     # Archivos a ignorar en Git
└── README.md                      # Este archivo
```

## 🚀 Instalación y Configuración

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Instalar Navegadores
```bash
npm run install:browsers
```

### 3. Configurar Variables de Entorno
```bash
cp env.example .env
# Editar .env con tus configuraciones
# BASE_URL=https://opencart.abstracta.us
```

## 🎯 Uso

### Scripts Disponibles

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas con interfaz visual
npm run test:ui

# Ejecutar pruebas en modo debug
npm run test:debug

# Ejecutar pruebas con navegador visible
npm run test:headed

# Ejecutar pruebas en navegador específico
npm run test:chrome
npm run test:firefox
npm run test:safari

# Ver reporte de pruebas
npm run test:report
```

### Ejecutar Pruebas Específicas

```bash
# Ejecutar el flujo de registro de OpenCart
npx playwright test tests/opencart-registration.spec.js

# Ejecutar un archivo específico
npx playwright test tests/example.spec.js

# Ejecutar pruebas con un patrón
npx playwright test --grep "Registro exitoso de usuario"

# Ejecutar pruebas en paralelo
npx playwright test --workers=4
```

## 🏗️ Page Object Model

### Estructura de Clases

#### BasePage.js
Clase base que contiene métodos comunes para todas las páginas:
- Navegación
- Esperas
- Screenshots
- Interacciones básicas

#### OpenCartHomePage.js
Página específica para la página principal de OpenCart:
- Selectores específicos de OpenCart
- Métodos de navegación (My Account, categorías)
- Funcionalidades de búsqueda
- Verificaciones de contenido y productos destacados

#### OpenCartRegisterPage.js
Página específica para el formulario de registro:
- Campos del formulario de registro
- Validaciones de campos
- Manejo de errores
- Navegación entre páginas

#### OpenCartSuccessPage.js
Página específica para la confirmación de registro:
- Mensajes de éxito
- Navegación al panel de cuenta
- Verificaciones de estado
- Enlaces del sidebar

### Ejemplo de Uso - Flujo de Registro

```javascript
const { test, expect } = require('@playwright/test');
const OpenCartHomePage = require('../pages/OpenCartHomePage');
const OpenCartRegisterPage = require('../pages/OpenCartRegisterPage');
const { userData } = require('../fixtures/opencartTestData');

test('Registro exitoso de usuario', async ({ page }) => {
  const homePage = new OpenCartHomePage(page);
  const registerPage = new OpenCartRegisterPage(page);
  
  // Navegar a la página principal
  await homePage.navigate();
  await homePage.navigateToRegister();
  
  // Llenar formulario de registro
  await registerPage.fillRegistrationForm(userData.validUser);
  await registerPage.clickContinueButton();
  
  // Verificar éxito
  const currentUrl = page.url();
  expect(currentUrl).toContain('account/success');
});
```

## 🛠️ Utilidades

### helpers.js
Funciones auxiliares para:
- Generación de datos aleatorios
- Validaciones
- Formateo de datos
- Operaciones comunes

### constants.js
Constantes para:
- URLs de la aplicación
- Timeouts
- Selectores comunes
- Configuraciones

### opencartTestData.js
Datos de prueba específicos para OpenCart:
- **userData**: Usuarios válidos e inválidos para registro
- **productData**: Productos destacados y categorías
- **appConfig**: URLs, títulos y mensajes esperados
- **navigationData**: Enlaces de menú y footer
- **validationData**: Patrones y límites de validación
- **testScenarios**: Escenarios de prueba predefinidos

## 📊 Configuración de Reportes

El proyecto está configurado para generar:
- **Reporte HTML** - Interfaz visual de resultados
- **Reporte JSON** - Datos estructurados
- **Reporte JUnit** - Compatible con CI/CD
- **Screenshots** - Capturas en caso de fallo
- **Videos** - Grabaciones de pruebas fallidas
- **Traces** - Información detallada de ejecución

## 🌐 Navegadores Soportados

- **Chromium** (Chrome/Edge)
- **Firefox**
- **WebKit** (Safari)
- **Mobile Chrome** (Android)
- **Mobile Safari** (iOS)

## ⚙️ Configuración Avanzada

### Variables de Entorno
```bash
BASE_URL=https://opencart.abstracta.us
HEADLESS=true
SLOW_MO=0
```

### Configuración de Playwright
Editar `playwright.config.js` para:
- Cambiar timeouts
- Configurar navegadores
- Ajustar reportes
- Modificar paralelización

## 🔧 Mejores Prácticas

### 1. Nomenclatura
- Usar nombres descriptivos para métodos y variables
- Seguir convenciones de JavaScript
- Documentar métodos complejos

### 2. Selectores
- Usar `data-testid` cuando sea posible
- Evitar selectores frágiles (clases CSS, IDs)
- Mantener selectores en constantes

### 3. Esperas
- Usar esperas explícitas
- Evitar `sleep()` cuando sea posible
- Esperar por estados específicos

### 4. Datos de Prueba
- Usar datos realistas
- Separar datos de la lógica
- Reutilizar datos cuando sea apropiado

### 5. Mantenimiento
- Mantener Page Objects actualizados
- Refactorizar código duplicado
- Documentar cambios importantes

## 🐛 Debugging

### Modo Debug
```bash
npm run test:debug
```

### Screenshots Automáticas
Se toman automáticamente en caso de fallo

### Traces
Habilitados para análisis detallado de fallos

### Logs de Consola
Capturados automáticamente durante las pruebas

## 📝 Próximos Pasos

1. ✅ **Flujo de registro de usuario** - Completado
2. 🔄 **Flujo de login** - En desarrollo
3. 🔄 **Navegación de productos** - Pendiente
4. 🔄 **Proceso de compra** - Pendiente
5. 🔄 **Gestión de cuenta** - Pendiente
6. 🔄 **Configurar CI/CD** para ejecución automática
7. 🔄 **Integrar** con herramientas de reporte

## 🤝 Contribución

Para contribuir al proyecto:
1. Seguir las convenciones establecidas
2. Documentar nuevos métodos
3. Agregar pruebas para nuevas funcionalidades
4. Mantener la estructura del Page Object Model

## 📚 Recursos Adicionales

- [Documentación de Playwright](https://playwright.dev/)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Mejores Prácticas](https://playwright.dev/docs/best-practices)
- [Configuración Avanzada](https://playwright.dev/docs/test-configuration)

---

**Desarrollado con ❤️ usando Playwright y Page Object Model**
