#Carga y Estrés - API FakeStore

##Descripción
Esta carpeta contiene las pruebas de carga y estrés realizadas a la API FakeStore utilizando la herramienta K6.

## Estructura de Carpetas

### `/querys/`
Contiene los scripts de K6 para las pruebas de carga:
- **`k6_fakestore_load.js`** - Prueba de carga constante con 150 usuarios concurrentes
- **`k6_ramp_both.js`** - Prueba de rampa escalando de 100 a 1000 usuarios

### `/evidencias/`
Contiene las capturas de pantalla de los resultados de las pruebas:
- **`Captura de pantalla 2025-10-07 a la(s) 3.44.19 p.m..png`** - Resultados prueba de rampa
- **`Captura de pantalla 2025-10-07 a la(s) 7.00.48 p.m..png`** - Resultados prueba de rampa
- **`Captura de pantalla 2025-10-07 a la(s) 7.00.51 p.m..png`** - Resultados prueba de carga constante

## Cómo Ejecutar las Pruebas

### Prerequisitos
- K6 instalado en el sistema
- Terminal/Command Line

### Comandos de Ejecución
```bash
# Prueba de carga constante (150 usuarios)
k6 run k6_fakestore_load.js

# Prueba de rampa (100-1000 usuarios)
k6 run k6_ramp_both.js
```

## 📊 Resultados Principales

### Prueba 1: Carga Constante (150 usuarios)
- **Estado:** EXCELENTE
- **Tiempo promedio:** 0.21-0.22 segundos
- **Tasa de errores:** 0.00%
- **Throughput:** 207 requests/s

### Prueba 2: Rampa (100-1000 usuarios)
- **Estado:** CRÍTICO
- **Tiempo promedio:** 1.45 segundos
- **Tasa de errores:** 0.29%
- **Throughput:** 404 requests/s

## Conclusiones
- **Capacidad óptima:** 150 usuarios concurrentes
- **Capacidad máxima:** 400-500 usuarios concurrentes
- **Punto de falla:** 700+ usuarios concurrentes
- **Recomendación:** No exceder 300-400 usuarios en producción

## Notas
- Las pruebas se ejecutaron desde terminal
- Se probaron endpoints GET y POST de productos
- Los resultados muestran degradación significativa en carga alta
