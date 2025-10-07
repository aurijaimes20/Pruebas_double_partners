# Pruebas de rendimiento con k6

Este repositorio reúne ejercicios de pruebas de carga y estrés sobre la API pública de FakeStore para el proceso de Double Partners.

## Estructura actual
- `punto_1/k6_fakestore_load.js`: doble escenario `constant-vus` para listar y crear productos en paralelo con 75 VUs cada uno, validaciones básicas y métricas de latencia (p95) y errores globales (<2%).
- `punto_1/k6_ramp_both.js`: dos escenarios `ramping-vus` que escalan de 0 a 1000 VUs para los endpoints GET y POST, con umbrales diferenciados (p95 de 1200 ms y 2000 ms respectivamente) y solapamiento parcial de carga.
- `punto_2/`: reservado para los siguientes puntos del reto (aún sin contenido).

## Requisitos
- [k6](https://k6.io/docs/get-started/installation/) instalado en la máquina local.
- Conexión a internet para alcanzar `https://fakestoreapi.com` (se puede sobreescribir con `BASE_URL`).

## Cómo ejecutar los scripts
Desde la raíz del proyecto:

```bash
# Ejecución de la prueba de carga constante
k6 run punto_1/k6_fakestore_load.js

# Ejecución de la prueba con rampas simultáneas
k6 run punto_1/k6_ramp_both.js
```

Puede definirse un endpoint alternativo:

```bash
BASE_URL="https://mi-api-interna.test" k6 run punto_1/k6_ramp_both.js
```

## Próximos pasos sugeridos
- Incorporar resultados o métricas obtenidas tras ejecutar los scripts.
- Completar las actividades pendientes en `punto_2/`.
- Añadir automatización (por ejemplo, GitHub Actions) para ejecutar las pruebas en un entorno controlado.
