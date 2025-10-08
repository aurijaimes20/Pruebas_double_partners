/**
 * Helpers - Funciones auxiliares para las pruebas
 * Contiene utilidades comunes que pueden ser utilizadas en cualquier prueba
 */

/**
 * Generar un email aleatorio para pruebas
 * @returns {string} Email aleatorio
 */
function generateRandomEmail() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `test.user.${timestamp}.${random}@example.com`;
}

/**
 * Generar un nombre aleatorio para pruebas
 * @returns {string} Nombre aleatorio
 */
function generateRandomName() {
  const firstNames = ['Juan', 'María', 'Carlos', 'Ana', 'Luis', 'Carmen', 'Pedro', 'Laura'];
  const lastNames = ['García', 'Rodríguez', 'González', 'Fernández', 'López', 'Martínez', 'Sánchez', 'Pérez'];
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  return `${firstName} ${lastName}`;
}

/**
 * Generar un número de teléfono aleatorio
 * @returns {string} Número de teléfono aleatorio
 */
function generateRandomPhone() {
  const areaCode = Math.floor(Math.random() * 900) + 100;
  const number = Math.floor(Math.random() * 9000000) + 1000000;
  return `${areaCode}-${number}`;
}

/**
 * Generar una dirección aleatoria
 * @returns {string} Dirección aleatoria
 */
function generateRandomAddress() {
  const streets = ['Calle Principal', 'Avenida Central', 'Carrera 7', 'Calle 80', 'Avenida 68'];
  const street = streets[Math.floor(Math.random() * streets.length)];
  const number = Math.floor(Math.random() * 200) + 1;
  return `${street} #${number}`;
}

/**
 * Esperar un tiempo específico
 * @param {number} milliseconds - Tiempo en milisegundos
 * @returns {Promise} Promise que se resuelve después del tiempo especificado
 */
function wait(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

/**
 * Generar un string aleatorio de longitud específica
 * @param {number} length - Longitud del string
 * @returns {string} String aleatorio
 */
function generateRandomString(length = 10) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

/**
 * Formatear fecha en formato específico
 * @param {Date} date - Fecha a formatear
 * @param {string} format - Formato deseado (YYYY-MM-DD, DD/MM/YYYY, etc.)
 * @returns {string} Fecha formateada
 */
function formatDate(date, format = 'YYYY-MM-DD') {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  switch (format) {
    case 'YYYY-MM-DD':
      return `${year}-${month}-${day}`;
    case 'DD/MM/YYYY':
      return `${day}/${month}/${year}`;
    case 'MM/DD/YYYY':
      return `${month}/${day}/${year}`;
    default:
      return `${year}-${month}-${day}`;
  }
}

/**
 * Generar una fecha aleatoria entre dos fechas
 * @param {Date} startDate - Fecha de inicio
 * @param {Date} endDate - Fecha de fin
 * @returns {Date} Fecha aleatoria
 */
function generateRandomDate(startDate, endDate) {
  const start = startDate.getTime();
  const end = endDate.getTime();
  const randomTime = start + Math.random() * (end - start);
  return new Date(randomTime);
}

/**
 * Validar formato de email
 * @param {string} email - Email a validar
 * @returns {boolean} True si el email es válido
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validar formato de teléfono
 * @param {string} phone - Teléfono a validar
 * @returns {boolean} True si el teléfono es válido
 */
function isValidPhone(phone) {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

/**
 * Limpiar string de caracteres especiales
 * @param {string} str - String a limpiar
 * @returns {string} String limpio
 */
function cleanString(str) {
  return str.replace(/[^\w\s]/gi, '').trim();
}

/**
 * Capitalizar primera letra de cada palabra
 * @param {string} str - String a capitalizar
 * @returns {string} String capitalizado
 */
function capitalizeWords(str) {
  return str.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

/**
 * Generar un ID único
 * @returns {string} ID único
 */
function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Convertir string a slug (URL-friendly)
 * @param {string} str - String a convertir
 * @returns {string} Slug
 */
function stringToSlug(str) {
  return str
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

/**
 * Verificar si un número está en un rango específico
 * @param {number} num - Número a verificar
 * @param {number} min - Valor mínimo
 * @param {number} max - Valor máximo
 * @returns {boolean} True si está en el rango
 */
function isInRange(num, min, max) {
  return num >= min && num <= max;
}

/**
 * Generar un array de números aleatorios
 * @param {number} length - Longitud del array
 * @param {number} min - Valor mínimo
 * @param {number} max - Valor máximo
 * @returns {Array<number>} Array de números aleatorios
 */
function generateRandomNumbers(length, min = 0, max = 100) {
  const numbers = [];
  for (let i = 0; i < length; i++) {
    numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return numbers;
}

/**
 * Obtener un elemento aleatorio de un array
 * @param {Array} array - Array del cual obtener el elemento
 * @returns {*} Elemento aleatorio
 */
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Shuffle (mezclar) un array
 * @param {Array} array - Array a mezclar
 * @returns {Array} Array mezclado
 */
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

module.exports = {
  generateRandomEmail,
  generateRandomName,
  generateRandomPhone,
  generateRandomAddress,
  wait,
  generateRandomString,
  formatDate,
  generateRandomDate,
  isValidEmail,
  isValidPhone,
  cleanString,
  capitalizeWords,
  generateUniqueId,
  stringToSlug,
  isInRange,
  generateRandomNumbers,
  getRandomElement,
  shuffleArray
};
