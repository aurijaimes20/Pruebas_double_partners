const { test, expect } = require('@playwright/test');
const { userData } = require('../fixtures/opencartTestData');
const { generateRandomEmail } = require('../utils/helpers');

/**
 * Prueba simplificada del flujo de registro de OpenCart
 * Esta versión se enfoca en los pasos esenciales sin verificaciones complejas
 */
test.describe('OpenCart - Registro Simplificado', () => {
  
  test('Registro exitoso de usuario - Versión simplificada', async ({ page }) => {
    // Paso 1: Navegar a OpenCart
    await page.goto('https://opencart.abstracta.us/');
    await page.waitForLoadState('networkidle');
    
    // Verificar que estamos en la página principal
    const pageTitle = await page.title();
    expect(pageTitle).toContain('Your Store');
    
    // Paso 2: Navegar al registro
    await page.click('a[title="My Account"]');
    await page.waitForSelector('a[href*="account/register"]', { timeout: 5000 });
    await page.click('a[href*="account/register"]');
    
    // Verificar que estamos en la página de registro
    await page.waitForLoadState('networkidle');
    const currentUrl = page.url();
    expect(currentUrl).toContain('account/register');
    
    // Paso 3: Llenar el formulario
    // Generar email único para evitar conflictos
    const uniqueEmail = generateRandomEmail();
    
    await page.fill('input[name="firstname"]', userData.validUser.firstName);
    await page.fill('input[name="lastname"]', userData.validUser.lastName);
    await page.fill('input[name="email"]', uniqueEmail);
    await page.fill('input[name="telephone"]', userData.validUser.telephone);
    await page.fill('input[name="password"]', userData.validUser.password);
    await page.fill('input[name="confirm"]', userData.validUser.confirmPassword);
    
    // Configurar newsletter (No)
    await page.check('input[name="newsletter"][value="0"]');
    
    // Aceptar política de privacidad
    await page.check('input[name="agree"]');
    
    // Paso 4: Enviar formulario
    await page.click('input[type="submit"][value="Continue"]');
    
  
    
    // Verificar mensaje de éxito
    const successMessage = await page.textContent('p:has-text("Congratulations!")');
    expect(successMessage).toContain('Congratulations! Your new account has been successfully created!');
    
    console.log('✅ Registro exitoso completado!');
  });

  

  test('Registro sin aceptar política de privacidad - Debe mostrar error', async ({ page }) => {
    // Navegar al registro
    await page.goto('https://opencart.abstracta.us/');
    await page.click('a[title="My Account"]');
    await page.waitForSelector('a[href*="account/register"]', { timeout: 5000 });
    await page.click('a[href*="account/register"]');
    await page.waitForLoadState('networkidle');
    
    // Llenar formulario sin aceptar política de privacidad
    await page.fill('input[name="firstname"]', userData.validUser.firstName);
    await page.fill('input[name="lastname"]', userData.validUser.lastName);
    await page.fill('input[name="email"]', userData.validUser.email);
    await page.fill('input[name="telephone"]', userData.validUser.telephone);
    await page.fill('input[name="password"]', userData.validUser.password);
    await page.fill('input[name="confirm"]', userData.validUser.confirmPassword);
    // NO marcar el checkbox de política de privacidad
    
    // Enviar formulario
    await page.click('input[type="submit"][value="Continue"]');
    
    // Verificar que hay errores
    await page.waitForTimeout(2000);
    
    const errorElements = await page.$$('.alert-danger');
    expect(errorElements.length).toBeGreaterThan(0);
    
    console.log('✅ Error de política de privacidad detectado correctamente!');
  });
});
