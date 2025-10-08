# Actualización de imagen de producto

```bash
curl --location --request PUT 'https://fakestoreapi.com/products/21' \
--header 'Content-Type: application/json' \
--data '{
  "title": "Auritest Portable Speaker",
  "price": 79.99,
  "description": "Compact Bluetooth speaker with 10 hours of battery life.",
  "image": "https://example.com/new-speaker-image.jpg",
  "category": "electronics"
}'
```

![Respuesta de ejemplo](./respuesta_actualizacion.png)


