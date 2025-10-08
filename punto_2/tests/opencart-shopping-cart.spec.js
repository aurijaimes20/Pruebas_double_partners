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

  test('Buscar Samsung Galaxy Tab y agregarla al carrito', async ({ page }) => {
    console.log('🔍 Iniciando prueba de búsqueda y carrito...');
    
    await test.step('Realizar búsqueda de Samsung Galaxy', async () => {
      console.log('📍 Paso 1: Realizando búsqueda de Samsung Galaxy...');
      
      // Llenar el campo de búsqueda y enviar con Enter
      await page.fill('input[name="search"]', 'Samsung Galaxy');
      console.log('✅ Término de búsqueda ingresado: Samsung Galaxy');
      
      // Enviar la búsqueda presionando Enter
      await page.press('input[name="search"]', 'Enter');
      
      // Esperar a que la página cargue
      await page.waitForLoadState('networkidle');
      console.log(`🔗 URL actual: ${page.url()}`);
    });

    await test.step('Buscar y verificar Samsung Galaxy Tab', async () => {
      console.log('📍 Paso 2: Buscando Samsung Galaxy Tab...');
      
      // Intentar encontrar el producto, si no está visible hacer scroll
      let productFound = false;
      let attempts = 0;
      const maxAttempts = 3;
      
      while (!productFound && attempts < maxAttempts) {
        try {
          // Buscar el producto
          await page.waitForSelector('text=Samsung Galaxy Tab 10.1', { timeout: 3000 });
          productFound = true;
          console.log('✅ Samsung Galaxy Tab 10.1 encontrado');
        } catch (error) {
          attempts++;
          console.log(`📍 Intento ${attempts}: Producto no encontrado, haciendo scroll...`);
          await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
          await page.waitForTimeout(1000);
        }
      }
      
      // Verificar que el producto fue encontrado
      expect(productFound).toBe(true);
      
      // Verificar el precio
      const price = await page.textContent('text=$241.99');
      expect(price).toContain('$241.99');
      console.log('✅ Precio verificado:', price);
    });

    await test.step('Agregar Samsung Galaxy Tab al carrito', async () => {
      console.log('📍 Paso 3: Agregando Samsung Galaxy Tab al carrito...');
      
      // Verificar el estado inicial del carrito (debe estar vacío)
      const initialCartText = await page.textContent('button:has-text("0 item(s) - $0.00")');
      expect(initialCartText).toContain('0 item(s) - $0.00');
      console.log('✅ Carrito inicialmente vacío confirmado');
      
      // Hacer clic en el botón "Add to Cart" del Samsung Galaxy Tab
      await page.click('button:has-text("Add to Cart")');
      
      // Esperar a que aparezca el mensaje de éxito
      await page.waitForSelector('text=Success: You have added', { timeout: 10000 });
      
      // Verificar el mensaje de éxito
      const successMessage = await page.textContent('text=Success: You have added');
      expect(successMessage).toContain('Success: You have added');
      expect(successMessage).toContain('Samsung Galaxy Tab 10.1');
      expect(successMessage).toContain('to your shopping cart');
      console.log('✅ Mensaje de éxito confirmado');
    });

    await test.step('Verificar que el carrito se actualizó correctamente', async () => {
      console.log('📍 Paso 4: Verificando actualización del carrito...');
      
      // Verificar que el contador del carrito se actualizó
      const updatedCartText = await page.textContent('button:has-text("1 item(s) - $241.99")');
      expect(updatedCartText).toContain('1 item(s) - $241.99');
      console.log('✅ Carrito actualizado correctamente: 1 item(s) - $241.99');
      
      // Verificar que el botón "Add to Cart" está presente y funcional
      const addToCartButton = page.locator('button:has-text("Add to Cart")');
      await expect(addToCartButton).toBeVisible();
      console.log('✅ Botón Add to Cart está presente y funcional');
    });
    
    console.log('🎉 ¡Prueba de búsqueda y carrito completada exitosamente!');
  });

  test('Eliminar MacBook Pro del carrito (manteniendo Samsung Galaxy Tab)', async ({ page }) => {
    console.log('🗑️ Iniciando prueba de eliminación selectiva del carrito...');
    
    await test.step('Agregar Samsung Galaxy Tab al carrito primero', async () => {
      console.log('📍 Paso 1: Agregando Samsung Galaxy Tab al carrito...');
      
      // Realizar búsqueda de Samsung Galaxy
      await page.fill('input[name="search"]', 'Samsung Galaxy');
      await page.press('input[name="search"]', 'Enter');
      await page.waitForLoadState('networkidle');
      
      // Buscar el producto con scroll si es necesario
      let productFound = false;
      let attempts = 0;
      const maxAttempts = 3;
      
      while (!productFound && attempts < maxAttempts) {
        try {
          await page.waitForSelector('text=Samsung Galaxy Tab 10.1', { timeout: 3000 });
          productFound = true;
        } catch (error) {
          attempts++;
          await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
          await page.waitForTimeout(1000);
        }
      }
      
      // Agregar Samsung Galaxy Tab al carrito
      await page.click('button:has-text("Add to Cart")');
      await page.waitForSelector('text=Success: You have added', { timeout: 10000 });
      
      // Verificar que se agregó correctamente
      const cartText = await page.textContent('button:has-text("1 item(s) - $241.99")');
      expect(cartText).toContain('1 item(s) - $241.99');
      console.log('✅ Samsung Galaxy Tab agregado al carrito:', cartText);
    });

    await test.step('Agregar MacBook Pro al carrito', async () => {
      console.log('📍 Paso 2: Agregando MacBook Pro al carrito...');
      
      // Navegar a Laptops & Notebooks
      await page.click('a:has-text("Laptops & Notebooks")');
      await page.waitForSelector('a:has-text("Show All Laptops & Notebooks")', { timeout: 5000 });
      await page.click('a:has-text("Show All Laptops & Notebooks")');
      await page.waitForLoadState('networkidle');
      
      // Hacer scroll para ver los productos
      await page.evaluate(() => window.scrollTo(0, 800));
      await page.waitForTimeout(1000);
      
      // Agregar MacBook Pro al carrito
      await page.click('button:has-text("Add to Cart") >> nth=3');
      await page.waitForSelector('text=Success: You have added', { timeout: 10000 });
      
      // Verificar que ahora hay 2 items en el carrito
      const cartText = await page.textContent('button:has-text("2 item(s) - $2,241.99")');
      expect(cartText).toContain('2 item(s) - $2,241.99');
      console.log('✅ MacBook Pro agregado al carrito. Total:', cartText);
    });

    await test.step('Abrir el carrito para verificar ambos productos', async () => {
      console.log('📍 Paso 3: Abriendo el carrito para verificar ambos productos...');
      
      // Hacer clic en el botón del carrito para abrirlo
      await page.click('button:has-text("2 item(s) - $2,241.99")');
      
      // Esperar a que aparezca el contenido del carrito
      await page.waitForSelector('text=MacBook Pro', { timeout: 10000 });
      await page.waitForSelector('text=Samsung Galaxy Tab 10.1', { timeout: 10000 });
      console.log('✅ Carrito abierto, ambos productos visibles');
      
      // Verificar que ambos productos están en el carrito
      const macbookVisible = await page.isVisible('text=MacBook Pro');
      const galaxyVisible = await page.isVisible('text=Samsung Galaxy Tab 10.1');
      expect(macbookVisible).toBe(true);
      expect(galaxyVisible).toBe(true);
      console.log('✅ Ambos productos confirmados en el carrito');
    });

    await test.step('Eliminar solo el MacBook Pro del carrito', async () => {
      console.log('📍 Paso 4: Eliminando solo el MacBook Pro del carrito...');
      
      // Buscar el botón de eliminar específicamente del MacBook Pro
      // Usar un selector más específico: buscar la fila que contiene "MacBook Pro" y luego el botón de eliminar
      const macbookRow = page.locator('tr:has-text("MacBook Pro")');
      const deleteButton = macbookRow.locator('button.btn.btn-danger.btn-xs').first();
      await deleteButton.click();
      
      // Esperar un momento para que se procese la eliminación
      await page.waitForTimeout(2000);
      
      console.log('✅ MacBook Pro eliminado del carrito');
    });

    await test.step('Verificar que solo queda el Samsung Galaxy Tab', async () => {
      console.log('📍 Paso 5: Verificando que solo queda el Samsung Galaxy Tab...');
      
      // Verificar que el contador del carrito se actualizó a 1 item
      const updatedCartText = await page.textContent('button:has-text("1 item(s) - $241.99")');
      expect(updatedCartText).toContain('1 item(s) - $241.99');
      console.log('✅ Carrito actualizado correctamente:', updatedCartText);
      
      // Abrir el carrito nuevamente para verificar el contenido
      await page.click('button:has-text("1 item(s) - $241.99")');
      await page.waitForTimeout(1000);
      
      // Verificar que el Samsung Galaxy Tab sigue en el carrito
      const galaxyStillVisible = await page.isVisible('text=Samsung Galaxy Tab 10.1');
      expect(galaxyStillVisible).toBe(true);
      console.log('✅ Samsung Galaxy Tab permanece en el carrito');
      
      
    });
    
    console.log('🎉 ¡Prueba de eliminación del carrito completada exitosamente!');
  });
});
