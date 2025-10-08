const { test, expect } = require('@playwright/test');
const OpenCartHomePage = require('../pages/OpenCartHomePage');

test.describe('OpenCart - Pruebas de Carrito de Compras', () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new OpenCartHomePage(page);
    
    await homePage.navigate();
    await homePage.verifyPageLoaded();
  });

  test('Navegar a Laptops & Notebooks y agregar MacBook Pro al carrito', async ({ page }) => {
    console.log('🛒 Iniciando prueba de carrito de compras...');
    
    await test.step('Navegar a la sección de Laptops & Notebooks', async () => {
      console.log('📍 Paso 1: Navegando a Laptops & Notebooks...');
      
      // Hacer clic en "Laptops & Notebooks" en el menú principal
      await page.click('a:has-text("Laptops & Notebooks")');
      
      // Esperar a que aparezca el menú desplegable
      await page.waitForSelector('a:has-text("Show All Laptops & Notebooks")', { timeout: 5000 });
      
      // Hacer clic en "Show All Laptops & Notebooks"
      await page.click('a:has-text("Show All Laptops & Notebooks")');
      
      // Verificar que estamos en la página correcta
      await page.waitForLoadState('networkidle');
      expect(page.url()).toContain('product/category&path=18');
      console.log('✅ Navegación a Laptops & Notebooks exitosa');
    });

    await test.step('Verificar que la página de productos se cargó correctamente', async () => {
      console.log('📍 Paso 2: Verificando página de productos...');
      
      // Verificar que el título de la página sea correcto
      const pageTitle = await page.title();
      expect(pageTitle).toContain('Laptops & Notebooks');
      
      // Verificar que los productos estén visibles
      await page.waitForSelector('h4:has-text("MacBook Pro")', { timeout: 10000 });
      console.log('✅ Página de productos cargada correctamente');
    });

    await test.step('Agregar MacBook Pro al carrito', async () => {
      console.log('📍 Paso 3: Agregando MacBook Pro al carrito...');
      
      // Verificar el estado inicial del carrito (debe estar vacío)
      const initialCartText = await page.textContent('button:has-text("0 item(s) - $0.00")');
      expect(initialCartText).toContain('0 item(s) - $0.00');
      console.log('✅ Carrito inicialmente vacío confirmado');
      
      // Hacer scroll hacia abajo para asegurar que el MacBook Pro esté visible
      await page.evaluate(() => window.scrollTo(0, 800));
      await page.waitForTimeout(1000);
      
      // Hacer clic en el botón "Add to Cart" del MacBook Pro
      // El MacBook Pro es el 4to producto (índice 3) en la lista
      await page.click('button:has-text("Add to Cart") >> nth=3');
      
      // Esperar a que aparezca el mensaje de éxito
      await page.waitForSelector('text=Success: You have added', { timeout: 10000 });
      
      // Verificar el mensaje de éxito
      const successMessage = await page.textContent('text=Success: You have added');
      expect(successMessage).toContain('Success: You have added');
      expect(successMessage).toContain('MacBook Pro');
      expect(successMessage).toContain('to your shopping cart');
      console.log('✅ Mensaje de éxito confirmado');
    });

    await test.step('Verificar que el carrito se actualizó correctamente', async () => {
      console.log('📍 Paso 4: Verificando actualización del carrito...');
      
      // Verificar que el contador del carrito se actualizó
      const updatedCartText = await page.textContent('button:has-text("1 item(s) - $2,000.00")');
      expect(updatedCartText).toContain('1 item(s) - $2,000.00');
      console.log('✅ Carrito actualizado correctamente: 1 item(s) - $2,000.00');
      
      // Verificar que el botón "Add to Cart" del MacBook Pro está presente y funcional
      const addToCartButton = page.locator('button:has-text("Add to Cart") >> nth=3');
      await expect(addToCartButton).toBeVisible();
      console.log('✅ Botón Add to Cart del MacBook Pro está presente y funcional');
    });

    console.log('🎉 ¡Prueba de carrito de compras completada exitosamente!');
  });

  test('Verificar elementos de la página de Laptops & Notebooks', async ({ page }) => {
    console.log('🔍 Verificando elementos de la página de productos...');
    
    // Navegar a la página de productos
    await page.click('a:has-text("Laptops & Notebooks")');
    await page.waitForSelector('a:has-text("Show All Laptops & Notebooks")', { timeout: 5000 });
    await page.click('a:has-text("Show All Laptops & Notebooks")');
    await page.waitForLoadState('networkidle');
    
    // Verificar elementos principales
    expect(await page.isVisible('h2:has-text("Laptops & Notebooks")')).toBe(true);
    console.log('✅ Título de la página encontrado');
    
    expect(await page.isVisible('h3:has-text("Refine Search")')).toBe(true);
    console.log('✅ Sección "Refine Search" encontrada');
    
    // Verificar que los productos están presentes
    expect(await page.isVisible('h4:has-text("HP LP3065")')).toBe(true);
    console.log('✅ Producto HP LP3065 encontrado');
    
    expect(await page.isVisible('h4:has-text("MacBook")')).toBe(true);
    console.log('✅ Producto MacBook encontrado');
    
    expect(await page.isVisible('h4:has-text("MacBook Air")')).toBe(true);
    console.log('✅ Producto MacBook Air encontrado');
    
    expect(await page.isVisible('h4:has-text("MacBook Pro")')).toBe(true);
    console.log('✅ Producto MacBook Pro encontrado');
    
    expect(await page.isVisible('h4:has-text("Sony VAIO")')).toBe(true);
    console.log('✅ Producto Sony VAIO encontrado');
    
    // Verificar botones "Add to Cart"
    const addToCartButtons = await page.locator('button:has-text("Add to Cart")').count();
    expect(addToCartButtons).toBe(5);
    console.log('✅ Todos los botones "Add to Cart" encontrados');
    
    console.log('✅ Todos los elementos de la página verificados');
  });

  test('Verificar precios de los productos', async ({ page }) => {
    console.log('💰 Verificando precios de los productos...');
    
    // Navegar a la página de productos
    await page.click('a:has-text("Laptops & Notebooks")');
    await page.waitForSelector('a:has-text("Show All Laptops & Notebooks")', { timeout: 5000 });
    await page.click('a:has-text("Show All Laptops & Notebooks")');
    await page.waitForLoadState('networkidle');
    
    // Verificar precios específicos
    expect(await page.isVisible('text=$122.00')).toBe(true);
    console.log('✅ Precio HP LP3065: $122.00');
    
    expect(await page.isVisible('text=$602.00')).toBe(true);
    console.log('✅ Precio MacBook: $602.00');
    
    expect(await page.isVisible('text=$1,202.00')).toBe(true);
    console.log('✅ Precio MacBook Air: $1,202.00');
    
    expect(await page.isVisible('text=$2,000.00')).toBe(true);
    console.log('✅ Precio MacBook Pro: $2,000.00');
    
    console.log('✅ Todos los precios verificados correctamente');
  });
});
