# Casos de Prueba Endpoints - API FakeStore

## Descripción
Esta carpeta contiene los casos de prueba en metodología Gherkin para los endpoints de la API FakeStore.

## Archivos

### `Casos de Pruebas Endpoints.csv`
Archivo CSV con casos de prueba estructurados que incluye:
- **Pre Condición:** Condiciones necesarias para ejecutar la prueba
- **Resumen:** Descripción breve del caso de prueba
- **Paso a Paso:** Pasos detallados en formato Gherkin (Dado que... Y... Cuando... Entonces...)
- **Resultado Esperado:** Resultado que se espera obtener

## Endpoints Cubiertos

### 1. **GET /products/{id}** - Consulta de producto específico
- Consultar producto exitosamente
- Consultar producto con ID inexistente
- Consultar producto con ID inválido

### 2. **POST /products** - Creación de producto
- Crear producto exitosamente
- Crear producto sin campo obligatorio
- Crear producto con precio inválido
- Crear producto con categoría inválida

### 3. **PUT /products/{id}** - Actualización de imagen de producto
- Actualizar imagen exitosamente
- Actualizar imagen de producto inexistente
- Actualizar imagen con URL inválida
- Actualizar imagen sin proporcionar datos

### 4. **GET /products/category/{category}** - Consulta por categoría
- Consultar productos por categoría electronics
- Consultar productos por categoría inexistente
- Consultar productos por categoría con caracteres especiales
- Consultar endpoint inexistente

## Estadísticas
- **Total de casos de prueba:** 15
- **Casos positivos:** 4
- **Casos negativos:** 11
- **Endpoints cubiertos:** 4

## Cómo Usar
1. Abrir el archivo CSV en Excel o Google Sheets
2. Cada fila representa un caso de prueba
3. Las columnas están organizadas para facilitar la ejecución manual
4. Los pasos están en formato Gherkin para claridad

## Metodología
- **Formato:** Gherkin (Given-When-Then)
- **Herramienta:** Postman para ejecución
- **Cobertura:** Casos positivos y negativos
- **Validación:** Respuestas HTTP y estructura de datos

## Objetivo
Proporcionar una suite completa de casos de prueba para validar el comportamiento de la API FakeStore en diferentes escenarios, tanto exitosos como de error.
