#Postman - API FakeStore

##Descripción
Esta carpeta contiene la documentación y evidencias de las pruebas manuales realizadas con Postman para los endpoints de la API FakeStore.

##Estructura de Carpetas

### `/producto_especifico/`
Pruebas para consultar un producto específico por ID:
- **`consulta_producto.md`** - Documentación del endpoint GET /products/{id}
- **`respuesta_producto.png`** - Captura de pantalla de la respuesta

### `/creacion_producto/`
Pruebas para crear un nuevo producto:
- **`consulta_creacion_producto.md`** - Documentación del endpoint POST /products
- **`Captura de pantalla 2025-10-08 a la(s) 9.02.18 a.m..png`** - Evidencia de la prueba

### `/actualizar_imagen_producto/`
Pruebas para actualizar la imagen de un producto:
- **`consulta_actualizar_imagen_producto.md`** - Documentación del endpoint PUT /products/{id}
- **`Captura de pantalla 2025-10-08 a la(s) 9.02.35 a.m..png`** - Evidencia de la prueba

### `/producto_por_categoria_electronics/`
Pruebas para consultar productos por categoría:
- **`consulta_categoria_electronics.md`** - Documentación del endpoint GET /products/category/{category}
- **`respuesta_electronics.png`** - Captura de pantalla de la respuesta

##Endpoints Documentados

### 1. **GET /products/{id}**
- **URL:** `https://fakestoreapi.com/products/9`
- **Método:** GET
- **Descripción:** Consulta un producto específico por su ID
- **Ejemplo:** Consulta del producto con ID 9

### 2. **POST /products**
- **URL:** `https://fakestoreapi.com/products`
- **Método:** POST
- **Headers:** Content-Type: application/json
- **Body:** JSON con datos del producto (title, price, description, image, category)
- **Descripción:** Crea un nuevo producto

### 3. **PUT /products/{id}**
- **URL:** `https://fakestoreapi.com/products/21`
- **Método:** PUT
- **Headers:** Content-Type: application/json
- **Body:** JSON con datos actualizados del producto
- **Descripción:** Actualiza un producto existente

### 4. **GET /products/category/{category}**
- **URL:** `https://fakestoreapi.com/products/category/electronics`
- **Método:** GET
- **Descripción:** Consulta productos por categoría específica
- **Ejemplo:** Consulta de productos de la categoría "electronics"

##Datos de Prueba Utilizados

### Producto de Ejemplo:
```json
{
  "title": "Auritest Portable Speaker",
  "price": 79.99,
  "description": "Compact Bluetooth speaker with 10 hours of battery life.",
  "image": "https://example.com/speaker.jpg",
  "category": "electronics"
}
```

##Cómo Usar
1. Abrir Postman
2. Importar las colecciones o crear las peticiones manualmente
3. Seguir la documentación en cada archivo .md
4. Verificar las respuestas con las capturas de pantalla

##Metodología
- **Herramienta:** Postman
- **Tipo:** Pruebas manuales
- **Cobertura:** 4 endpoints principales
- **Evidencias:** Capturas de pantalla de respuestas
- **Documentación:** Archivos markdown con instrucciones

##Objetivo
Proporcionar documentación completa y evidencias de las pruebas manuales realizadas a la API FakeStore para validar su funcionamiento correcto.
