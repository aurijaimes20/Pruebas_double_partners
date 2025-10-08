import http from 'k6/http';
import { check, sleep } from 'k6';
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.5.0/index.js';

const BASE_URL = __ENV.BASE_URL || 'https://fakestoreapi.com';

export const options = {
  scenarios: {
    list_products: {
      executor: 'constant-vus',
      vus: 75,            
      duration: '2m',
      exec: 'listProducts',
      tags: { endpoint: 'GET /products' },
    },
    create_product: {
      executor: 'constant-vus',
      vus: 75,             
      duration: '2m',
      exec: 'createProduct',
      tags: { endpoint: 'POST /products' },
      startTime: '1s',     
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.02'],                               
    'http_req_duration{endpoint:GET /products}': ['p(95)<800'],   
    'http_req_duration{endpoint:POST /products}': ['p(95)<1200'], 
  },
  summaryTrendStats: ['avg','min','med','p(90)','p(95)','max'],
};

export function listProducts() {
  const res = http.get(`${BASE_URL}/products`, { tags: { name: 'GET /products' }});
  check(res, {
    'GET status 200': (r) => r.status === 200,
    'GET body not empty': (r) => r.body && r.body.length > 2,
  });
  sleep(0.3 + Math.random() * 0.4);
}

export function createProduct() {
  const payload = JSON.stringify({
    title: `LoadTest ${uuidv4().slice(0,8)}`,
    price: Number((50 + Math.random() * 150).toFixed(2)),
    description: 'k6 load test product',
    image: 'https://picsum.photos/seed/k6/400/300',
    category: 'electronics',
  });
  const headers = { 'Content-Type': 'application/json' };

  const res = http.post(`${BASE_URL}/products`, payload, {
    headers, tags: { name: 'POST /products' }
  });

  check(res, {
    'POST status 200/201': (r) => r.status === 200 || r.status === 201,
    'POST returns id': (r) => {
      try { return !!JSON.parse(r.body).id; } catch { return false; }
    },
  });

  sleep(0.3 + Math.random() * 0.4);
}
