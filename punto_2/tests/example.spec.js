/**
 * Example Test - Ejemplo de prueba automatizada
 * Este archivo muestra cómo estructurar las pruebas usando el Page Object Model
 */

const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');
const ProductPage = require('../pages/ProductPage');
const { TEST_DATA } = require('../fixtures/testData');
const { URLS, TIMEOUTS } = require('../utils/constants');

test.describe('Example Test Suite', () => {
  let homePage;
  let productPage;

  test.beforeEach(async ({ page }) => {
    // Inicializar las páginas
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    
    // Navegar a la página de inicio
    await homePage.navigateTo(URLS.BASE_URL + URLS.HOME);
  });

  test('should load home page successfully', async () => {
    // Verificar que la página se cargó correctamente
    await homePage.verifyPageLoaded();
    
    // Verificar que el logo es visible
    const isLogoVisible = await homePage.isLogoVisible();
    expect(isLogoVisible).toBe(true);
    
    // Verificar que el título del hero es visible
    const heroTitle = await homePage.getHeroTitle();
    expect(heroTitle).toBeTruthy();
  });

  test('should navigate to products page', async () => {
    // Verificar que la página se cargó
    await homePage.verifyPageLoaded();
    
    // Navegar a la página de productos
    await homePage.navigateToProducts();
    
    // Verificar que se navegó correctamente
    const currentUrl = await homePage.getCurrentUrl();
    expect(currentUrl).toContain('/products');
  });

  test('should perform search functionality', async () => {
    // Verificar que la página se cargó
    await homePage.verifyPageLoaded();
    
    // Realizar una búsqueda
    const searchTerm = 'test product';
    await homePage.performSearch(searchTerm);
    
    // Verificar que se realizó la búsqueda
    const currentUrl = await homePage.getCurrentUrl();
    expect(currentUrl).toContain('search');
  });

  test('should subscribe to newsletter', async () => {
    // Verificar que la página se cargó
    await homePage.verifyPageLoaded();
    
    // Suscribirse al newsletter
    const testEmail = TEST_DATA.USER_DATA.VALID_USER.email;
    await homePage.subscribeToNewsletter(testEmail);
    
    // Verificar que se mostró mensaje de éxito
    // (Esto dependería de la implementación específica)
  });

  test('should display product information correctly', async () => {
    // Navegar directamente a una página de producto
    const productUrl = URLS.BASE_URL + URLS.PRODUCT_DETAIL.replace(':id', '1');
    await productPage.navigateTo(productUrl);
    
    // Verificar que la página del producto se cargó
    await productPage.verifyPageLoaded();
    
    // Verificar que la información del producto es visible
    const productTitle = await productPage.getProductTitle();
    const productPrice = await productPage.getProductPrice();
    
    expect(productTitle).toBeTruthy();
    expect(productPrice).toBeTruthy();
  });

  test('should add product to cart', async () => {
    // Navegar a una página de producto
    const productUrl = URLS.BASE_URL + URLS.PRODUCT_DETAIL.replace(':id', '1');
    await productPage.navigateTo(productUrl);
    
    // Verificar que la página se cargó
    await productPage.verifyPageLoaded();
    
    // Agregar producto al carrito
    await productPage.addToCart();
    
    // Verificar que se agregó al carrito
    const isAdded = await productPage.isProductAddedToCart();
    expect(isAdded).toBe(true);
  });

  test('should handle product quantity changes', async () => {
    // Navegar a una página de producto
    const productUrl = URLS.BASE_URL + URLS.PRODUCT_DETAIL.replace(':id', '1');
    await productPage.navigateTo(productUrl);
    
    // Verificar que la página se cargó
    await productPage.verifyPageLoaded();
    
    // Aumentar cantidad
    await productPage.increaseQuantity();
    
    // Disminuir cantidad
    await productPage.decreaseQuantity();
    
    // Establecer cantidad específica
    await productPage.setQuantity(3);
  });

  test('should scroll through product sections', async () => {
    // Navegar a una página de producto
    const productUrl = URLS.BASE_URL + URLS.PRODUCT_DETAIL.replace(':id', '1');
    await productPage.navigateTo(productUrl);
    
    // Verificar que la página se cargó
    await productPage.verifyPageLoaded();
    
    // Hacer scroll a diferentes secciones
    await productPage.scrollToDetails();
    await productPage.scrollToSpecifications();
    await productPage.scrollToReviews();
    await productPage.scrollToRelatedProducts();
  });

  test('should handle responsive design', async ({ page }) => {
    // Probar en diferentes tamaños de pantalla
    const viewports = [
      { width: 1920, height: 1080 }, // Desktop
      { width: 768, height: 1024 },  // Tablet
      { width: 375, height: 667 }    // Mobile
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await homePage.navigateTo(URLS.BASE_URL + URLS.HOME);
      await homePage.verifyPageLoaded();
      
      // Verificar que el logo sigue siendo visible
      const isLogoVisible = await homePage.isLogoVisible();
      expect(isLogoVisible).toBe(true);
    }
  });

  test('should handle network errors gracefully', async ({ page }) => {
    // Simular error de red
    await page.route('**/*', route => route.abort());
    
    try {
      await homePage.navigateTo(URLS.BASE_URL + URLS.HOME);
    } catch (error) {
      // Verificar que se maneja el error correctamente
      expect(error).toBeDefined();
    }
  });

  test.afterEach(async ({ page }) => {
    // Limpiar después de cada prueba
    await page.close();
  });
});
