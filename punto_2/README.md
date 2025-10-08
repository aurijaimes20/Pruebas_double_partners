# 🎭 Pruebas Automatizadas con Playwright
## Page Object Model - Estructura Completa

Este proyecto contiene la estructura completa para crear pruebas automatizadas usando Playwright con el patrón Page Object Model (POM) en JavaScript.

## 📋 Descripción

Este setup proporciona una base sólida para desarrollar pruebas automatizadas de UI/UX usando:
- **Playwright** como framework de pruebas
- **JavaScript** como lenguaje de programación
- **Page Object Model** como patrón de diseño
- **Estructura modular** para fácil mantenimiento

## 🗂️ Estructura del Proyecto

```
punto_2/
├── pages/                    # Clases de páginas (Page Objects)
│   ├── BasePage.js          # Página base con métodos comunes
│   ├── HomePage.js          # Página principal
│   └── ProductPage.js       # Página de productos
├── tests/                   # Casos de prueba
│   └── example.spec.js      # Ejemplo de pruebas
├── utils/                   # Utilidades y constantes
│   ├── helpers.js           # Funciones auxiliares
│   └── constants.js         # Constantes del proyecto
├── fixtures/                # Datos de prueba
│   └── testData.js          # Conjuntos de datos para pruebas
├── playwright.config.js     # Configuración de Playwright
├── package.json             # Dependencias y scripts
├── env.example              # Variables de entorno de ejemplo
├── .gitignore              # Archivos a ignorar en Git
└── README.md               # Este archivo
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
# Ejecutar un archivo específico
npx playwright test tests/example.spec.js

# Ejecutar pruebas con un patrón
npx playwright test --grep "should load home page"

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

#### HomePage.js
Página específica para la página principal:
- Selectores específicos
- Métodos de navegación
- Funcionalidades de búsqueda
- Verificaciones de contenido

#### ProductPage.js
Página específica para productos:
- Información de productos
- Funcionalidades de carrito
- Navegación entre productos
- Formularios de producto

### Ejemplo de Uso

```javascript
const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');

test('should load home page', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateTo('https://example.com');
  await homePage.verifyPageLoaded();
  
  const isLogoVisible = await homePage.isLogoVisible();
  expect(isLogoVisible).toBe(true);
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

### testData.js
Datos de prueba organizados por:
- Usuarios
- Productos
- Órdenes
- Formularios
- Configuraciones

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
BASE_URL=https://your-app.com
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

1. **Personalizar** las páginas según tu aplicación
2. **Agregar** más Page Objects según necesidades
3. **Crear** casos de prueba específicos
4. **Configurar** CI/CD para ejecución automática
5. **Integrar** con herramientas de reporte

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
