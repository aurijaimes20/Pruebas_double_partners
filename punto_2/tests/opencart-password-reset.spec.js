const { test, expect } = require('@playwright/test');
const OpenCartHomePage = require('../pages/OpenCartHomePage');
const OpenCartLoginPage = require('../pages/OpenCartLoginPage');
const OpenCartForgottenPasswordPage = require('../pages/OpenCartForgottenPasswordPage');

test.describe('OpenCart - Pruebas de Restablecimiento de Contraseña Simplificadas', () => {
  let homePage;
  let loginPage;
  let forgottenPasswordPage;

  test.beforeEach(async ({ page }) => {
    homePage = new OpenCartHomePage(page);
    loginPage = new OpenCartLoginPage(page);
    forgottenPasswordPage = new OpenCartForgottenPasswordPage(page);
    
    await homePage.navigate();
    await homePage.verifyPageLoaded();
  });

  test('Navegación a página de restablecimiento de contraseña', async ({ page }) => {
    console.log('🔑 Probando navegación a restablecimiento de contraseña...');
    
    await homePage.navigateToLogin();
    await loginPage.verifyPageLoaded();
    
    await page.click('a[href*="account/forgotten"]');
    await forgottenPasswordPage.verifyPageLoaded();
    
    expect(page.url()).toContain('account/forgotten');
    console.log('✅ Navegación a restablecimiento de contraseña exitosa');
  });

  test('Verificar elementos de la página de restablecimiento', async ({ page }) => {
    console.log('🔍 Verificando elementos de restablecimiento...');
    
    await homePage.navigateToLogin();
    await loginPage.verifyPageLoaded();
    await page.click('a[href*="account/forgotten"]');
    await forgottenPasswordPage.verifyPageLoaded();
    
    // Verificar elementos principales
    expect(await page.isVisible('input[name="email"]')).toBe(true);
    console.log('✅ Campo de email encontrado');
    
    expect(await page.isVisible('input[type="submit"][value="Continue"]')).toBe(true);
    console.log('✅ Botón Continue encontrado');
    
    expect(await page.isVisible('a[href*="account/login"]:has-text("Back")')).toBe(true);
    console.log('✅ Botón Back encontrado');
    
    console.log('✅ Todos los elementos de restablecimiento verificados');
  });

  test('Restablecimiento con campo vacío - No debe navegar', async ({ page }) => {
    console.log('🔑 Probando restablecimiento con campo vacío...');
    
    await homePage.navigateToLogin();
    await loginPage.verifyPageLoaded();
    await page.click('a[href*="account/forgotten"]');
    await forgottenPasswordPage.verifyPageLoaded();
    
    const initialUrl = page.url();
    
    // No llenar el campo de email
    await page.click('input[type="submit"][value="Continue"]');
    
    await page.waitForTimeout(1000);
    
    const finalUrl = page.url();
    expect(finalUrl).toBe(initialUrl);
    console.log('✅ Restablecimiento con campo vacío no navegó - Validación funcionando');
  });

  test('Restablecimiento con email inválido - No debe navegar', async ({ page }) => {
    console.log('🔑 Probando restablecimiento con email inválido...');
    
    await homePage.navigateToLogin();
    await loginPage.verifyPageLoaded();
    await page.click('a[href*="account/forgotten"]');
    await forgottenPasswordPage.verifyPageLoaded();
    
    const initialUrl = page.url();
    
    await page.fill('input[name="email"]', 'email-invalido-sin-formato');
    await page.click('input[type="submit"][value="Continue"]');
    
    await page.waitForTimeout(1000);
    
    const finalUrl = page.url();
    expect(finalUrl).toBe(initialUrl);
    console.log('✅ Restablecimiento con email inválido no navegó - Validación funcionando');
  });

  test('Navegación de vuelta al login desde restablecimiento', async ({ page }) => {
    console.log('🔑 Probando navegación de vuelta al login...');
    
    await homePage.navigateToLogin();
    await loginPage.verifyPageLoaded();
    await page.click('a[href*="account/forgotten"]');
    await forgottenPasswordPage.verifyPageLoaded();
    
    // Hacer clic en el botón Back
    await page.click('a[href*="account/login"]:has-text("Back")');
    await page.waitForLoadState('networkidle');
    
    expect(page.url()).toContain('account/login');
    console.log('✅ Navegación de vuelta al login exitosa');
  });
});
