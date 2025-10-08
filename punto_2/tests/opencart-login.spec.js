const { test, expect } = require('@playwright/test');
const OpenCartHomePage = require('../pages/OpenCartHomePage');
const OpenCartLoginPage = require('../pages/OpenCartLoginPage');

test.describe('OpenCart - Pruebas de Login Simplificadas', () => {
  let homePage;
  let loginPage;

  test.beforeEach(async ({ page }) => {
    homePage = new OpenCartHomePage(page);
    loginPage = new OpenCartLoginPage(page);
    
    await homePage.navigate();
    await homePage.verifyPageLoaded();
  });

  test('Navegación a página de login', async ({ page }) => {
    console.log('Probando navegación a login...');
    
    await homePage.navigateToLogin();
    await loginPage.verifyPageLoaded();
    
    expect(page.url()).toContain('account/login');
    console.log('Navegación a login exitosa');
  });

  test('Verificar elementos de la página de login', async ({ page }) => {
    console.log('Verificando elementos de login...');
    
    await homePage.navigateToLogin();
    await loginPage.verifyPageLoaded();
    
    expect(await page.isVisible('input[name="email"]')).toBe(true);
    console.log('Campo de email encontrado');
    
    expect(await page.isVisible('input[name="password"]')).toBe(true);
    console.log('Campo de contraseña encontrado');
    
    expect(await page.isVisible('input[type="submit"][value="Login"]')).toBe(true);
    console.log('Botón de login encontrado');
    
    expect(await page.isVisible('a[href*="account/forgotten"]')).toBe(true);
    console.log('Enlace "Forgotten Password" encontrado');
    
    console.log('Todos los elementos de login verificados');
  });

  test('Login con campos vacíos - No debe navegar', async ({ page }) => {
    console.log('Probando login con campos vacíos...');
    
    await homePage.navigateToLogin();
    await loginPage.verifyPageLoaded();
    
    const initialUrl = page.url();
    
    await page.fill('input[name="email"]', '');
    await page.fill('input[name="password"]', '');
    await page.click('input[type="submit"][value="Login"]');
    
    await page.waitForTimeout(1000);
    
    const finalUrl = page.url();
    expect(finalUrl).toBe(initialUrl);
    console.log('Login con campos vacíos no navegó - Validación funcionando');
  });

  test('Login con credenciales inválidas - No debe navegar', async ({ page }) => {
    console.log('Probando login con credenciales inválidas...');
    
    await homePage.navigateToLogin();
    await loginPage.verifyPageLoaded();
    
    const initialUrl = page.url();
    
    await page.fill('input[name="email"]', 'usuario.inexistente@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('input[type="submit"][value="Login"]');
    
    await page.waitForTimeout(2000);
    
    const finalUrl = page.url();
    expect(finalUrl).toBe(initialUrl);
    console.log('Login con credenciales inválidas no navegó - Validación funcionando');
  });

  test('Navegación a restablecimiento de contraseña', async ({ page }) => {
    console.log('Probando navegación a restablecimiento de contraseña...');
    
    await homePage.navigateToLogin();
    await loginPage.verifyPageLoaded();
    
    await page.click('a[href*="account/forgotten"]');
    await page.waitForLoadState('networkidle');
    
    expect(page.url()).toContain('account/forgotten');
    console.log('Navegación a restablecimiento de contraseña exitosa');
  });
});
