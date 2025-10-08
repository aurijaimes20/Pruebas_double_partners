import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'https://fakestoreapi.com';

export const options = {
  scenarios: {
    ramp_list_products: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '1m', target: 100 },
        { duration: '1m', target: 250 },
        { duration: '1m', target: 400 },
        { duration: '1m', target: 550 },
        { duration: '1m', target: 700 },
        { duration: '1m', target: 850 },
        { duration: '1m', target: 1000 },
        { duration: '30s', target: 0 },
      ],
      exec: 'listProducts',
      tags: { endpoint: 'GET /products' },
    },

    ramp_create_product: {
      executor: 'ramping-vus',
      startVUs: 0,
      startTime: '30s',
      stages: [
        { duration: '1m', target: 100 },
        { duration: '1m', target: 250 },
        { duration: '1m', target: 400 },
        { duration: '1m', target: 550 },
        { duration: '1m', target: 700 },
        { duration: '1m', target: 850 },
        { duration: '1m', target: 1000 },
        { duration: '30s', target: 0 },
      ],
      exec: 'createProduct',
      tags: { endpoint: 'POST /products' },
    },
  },

  thresholds: {
    http_req_failed: ['rate<0.02'],          
    'http_req_duration{endpoint:GET /products}': ['p(95)<1200'],
    'http_req_duration{endpoint:POST /products}': ['p(95)<2000'],
  },
};

export function listProducts() {
  const res = http.get(`${BASE_URL}/products`);
  check(res, {
    'GET status 200': (r) => r.status === 200,
    'GET body not empty': (r) => (r.body || '').length > 0,
  });
  sleep(1);
}

export function createProduct() {
  const payload = JSON.stringify({
    title: 'Auritest Portable Speaker',
    price: 99.99,
    description: 'Compact Bluetooth speaker with 10 hours of battery life.',
    image: 'https://example.com/speaker.jpg',
    category: 'electronics',
  });

  const res = http.post(`${BASE_URL}/products`, payload, {
    headers: { 'Content-Type': 'application/json' },
  });

  check(res, {
    'POST status 200/201': (r) => r.status === 200 || r.status === 201,
    'POST returns id': (r) => {
      try { return JSON.parse(r.body).id !== undefined; } catch { return false; }
    },
  });
  sleep(1);
}
