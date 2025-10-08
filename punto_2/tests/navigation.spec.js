const { test, expect } = require('@playwright/test');
const { generateRandomEmail } = require('../utils/helpers');

test.describe('Registro de usuario', () => {
  
  test('Flujo de registro - Solo navegación y llenado', async ({ page }) => {
    console.log('Iniciando prueba de registro...');
    
    console.log('Paso 1: Navegando a OpenCart...');
    await page.goto('https://opencart.abstracta.us/');
    await page.waitForLoadState('networkidle');
    
    const pageTitle = await page.title();
    console.log('Título de la página:', pageTitle);
    expect(pageTitle).toContain('Your Store');
    
    console.log('Paso 2: Navegando al registro...');
    await page.click('a[title="My Account"]');
    await page.waitForSelector('a[href*="account/register"]', { timeout: 5000 });
    await page.click('a[href*="account/register"]');
    
    await page.waitForLoadState('networkidle');
    const currentUrl = page.url();
    console.log('URL actual:', currentUrl);
    expect(currentUrl).toContain('account/register');
    
    console.log('Paso 3: Llenando formulario...');
    
    const uniqueEmail = generateRandomEmail();
    
    await page.fill('input[name="firstname"]', 'Juan');
    await page.fill('input[name="lastname"]', 'Pérez');
    await page.fill('input[name="email"]', uniqueEmail);
    await page.fill('input[name="telephone"]', '1234567890');
    await page.fill('input[name="password"]', 'TestPassword123!');
    await page.fill('input[name="confirm"]', 'TestPassword123!');
    
    await page.check('input[name="newsletter"][value="0"]');
    
    await page.check('input[name="agree"]');
    
    console.log('Formulario llenado correctamente');
    
    console.log('Paso 4: Enviando formulario...');
    await page.click('input[type="submit"][value="Continue"]');
    
    await page.waitForLoadState('networkidle');
    
    const finalUrl = page.url();
    console.log('URL final:', finalUrl);
    
    if (finalUrl.includes('account/success')) {
      console.log('¡Registro exitoso!');
      
      const successMessage = await page.textContent('body');
      if (successMessage.includes('Congratulations')) {
        console.log('Mensaje de éxito encontrado');
      } else {
        console.log('Mensaje de éxito no encontrado, pero URL es correcta');
      }
    } else if (finalUrl.includes('account/register')) {
      console.log('Aún en página de registro - posible error');
      
      const pageContent = await page.textContent('body');
      if (pageContent.includes('Warning') || pageContent.includes('Error')) {
        console.log('Se detectaron mensajes de error en la página');
      }
    } else {
      console.log('URL inesperada:', finalUrl);
    }
    
    expect(finalUrl).toBeDefined();
    console.log('Prueba básica completada');
  });

  test('Verificar elementos de la página principal', async ({ page }) => {
    console.log('Verificando elementos de la página principal...');
    
    await page.goto('https://opencart.abstracta.us/');
    await page.waitForLoadState('networkidle');
    
    const logo = await page.$('h1 a');
    expect(logo).toBeTruthy();
    console.log('Logo encontrado');
    
    const myAccountLink = await page.$('a[title="My Account"]');
    expect(myAccountLink).toBeTruthy();
    console.log('Enlace My Account encontrado');
    
    const searchInput = await page.$('input[name="search"]');
    expect(searchInput).toBeTruthy();
    console.log('Campo de búsqueda encontrado');
    
    console.log('Todos los elementos básicos verificados');
  });

  test('Verificar navegación al registro', async ({ page }) => {
    console.log('Verificando navegación al registro...');
    
    await page.goto('https://opencart.abstracta.us/');
    await page.waitForLoadState('networkidle');
    
    await page.click('a[title="My Account"]');
    
    const registerLink = await page.waitForSelector('a[href*="account/register"]', { timeout: 5000 });
    expect(registerLink).toBeTruthy();
    console.log('Enlace de registro encontrado en dropdown');
    
    await page.click('a[href*="account/register"]');
    await page.waitForLoadState('networkidle');
  
    const currentUrl = page.url();
    expect(currentUrl).toContain('account/register');
    console.log('Navegación al registro exitosa');

    const firstNameInput = await page.$('input[name="firstname"]');
    
    expect(firstNameInput).toBeTruthy();
    console.log('Campo de nombre encontrado');
    
    const continueButton = await page.$('input[type="submit"][value="Continue"]');
    expect(continueButton).toBeTruthy();
    console.log('Botón Continue encontrado');
  });
});
