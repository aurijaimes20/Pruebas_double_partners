# Pruebas Double Partners

Repositorio con las entregas del reto técnico divididas en dos pasos: validación integral de la API pública FakeStore y automatización end-to-end del e-commerce OpenCart.

## Paso 1 – API FakeStore

**Objetivo:** documentar, probar manualmente y someter a carga los endpoints de la API FakeStore para definir su capacidad operativa.

- `punto_1/postman/` documenta las ejecuciones manuales en Postman (markdown + capturas) para consultas de producto, creación, actualización y búsqueda por categoría.
- `punto_1/casos_de_prueba_endpoints/` consolida en un CSV los casos de prueba en formato Gherkin (positivos y negativos) para los cuatro endpoints evaluados.
- `punto_1/carga_y_estres/` incluye los scripts de k6 (`k6_fakestore_load.js`, `k6_ramp_both.js`), instrucciones de uso y evidencias de los resultados de carga y estrés.
- `punto_1/informe/` concentra el informe ejecutivo en PDF con métricas, hallazgos y recomendaciones derivadas de las ejecuciones.

**Ejecución rápida de k6**

```bash
# Prueba de carga constante (75 VUs por escenario GET/POST)
k6 run punto_1/carga_y_estres/querys/k6_fakestore_load.js

# Prueba de rampas combinadas (0-1000 VUs)
k6 run punto_1/carga_y_estres/querys/k6_ramp_both.js

# Variar el endpoint bajo prueba
BASE_URL="https://api-alternativa.test" k6 run punto_1/carga_y_estres/querys/k6_ramp_both.js
```

## Paso 2 – Automatización OpenCart

**Objetivo:** construir un framework Playwright (JS) con patrón Page Object Model para automatizar los flujos críticos de OpenCart.

- `punto_2/tests/` alberga los suites automatizadas (por ejemplo, `opencart-registration.spec.js`, flujo de registro completo, casos de recuperación de contraseña y carrito).
- `punto_2/pages/` define los Page Objects reutilizables (`OpenCartHomePage.js`, `OpenCartRegisterPage.js`, etc.) y la clase base compartida.
- `punto_2/fixtures/` y `punto_2/utils/` centralizan datos de prueba, helpers y constantes.
- `punto_2/playwright.config.js` configura navegadores, timeouts, generación de reportes (`playwright-report/`, `test-results/`).
- `punto_2/env.example` provee la plantilla de variables de entorno (`BASE_URL`, flags de ejecución).

**Comandos principales**

```bash
cd punto_2
npm install
npm run install:browsers

# Ejecutar toda la suite en headless
npm test

# Ejecutar una prueba específica
npx playwright test tests/opencart-registration.spec.js

# Analizar resultados
npm run test:report
```

## Requisitos generales
- [k6](https://k6.io/docs/get-started/installation/) para las pruebas de rendimiento.
- Node.js 18+ y npm para la automatización con Playwright.
- Acceso a internet para consumir `https://fakestoreapi.com` y `https://opencart.abstracta.us`.

## Próximos pasos sugeridos
- Desarrollar nuevos flujos automatizados en Playwright (login, checkout, navegación).
- Integrar las suites a una pipeline CI/CD con ejecución programada y publicación de reportes.
- Documentar métricas históricas de k6 en el repositorio o tablero compartido.
