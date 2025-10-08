#Informe - API FakeStore

##Descripción
Esta carpeta contiene los informes generados a partir de las pruebas realizadas a la API FakeStore.

##Archivos

### `Informe_pruebas_carga_y_estres.pdf`
Informe completo en formato PDF que incluye:
- Análisis de rendimiento de la API
- Resultados de pruebas de carga y estrés
- Tiempos de respuesta promedio
- Comportamiento del API bajo diferentes cargas
- Conclusiones y recomendaciones

##Contenido del Informe

### Secciones Principales:
1. **Tiempos de Respuesta Promedio**
   - Prueba de carga constante (150 usuarios)
   - Prueba de rampa (100-1000 usuarios)
   - Comparación de métricas

2. **Comportamiento del API**
   - Análisis de estabilidad
   - Patrones de degradación
   - Puntos de falla identificados

3. **Conclusiones**
   - Capacidad óptima y máxima
   - Recomendaciones para producción
   - Límites de usuarios concurrentes

##Resultados Clave

### Prueba 1: Carga Constante (150 usuarios)
- **Estado:** EXCELENTE
- **Tiempo promedio:** 0.21-0.22 segundos
- **Tasa de errores:** 0.00%

### Prueba 2: Rampa (100-1000 usuarios)
- **Estado:** CRÍTICO
- **Tiempo promedio:** 1.45 segundos
- **Tasa de errores:** 0.29%

## Recomendaciones
- **Capacidad óptima:** 150 usuarios concurrentes
- **Capacidad máxima:** 400-500 usuarios concurrentes
- **Límite recomendado para producción:** 300-400 usuarios

## Metodología
- **Herramienta:** K6 ejecutado desde terminal
- **Datos:** Resultados reales de pruebas de carga
- **Análisis:** Métricas de rendimiento y comportamiento
- **Formato:** Informe ejecutivo con datos técnicos

## Objetivo
Proporcionar un análisis completo del rendimiento de la API FakeStore para tomar decisiones informadas sobre su uso en producción.
