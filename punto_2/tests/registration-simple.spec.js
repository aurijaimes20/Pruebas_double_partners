const { test, expect } = require('@playwright/test');
const { userData } = require('../fixtures/opencartTestData');
const { generateRandomEmail } = require('../utils/helpers');

test.describe('OpenCart - Registro', () => {
  
  test('Registro exitoso de usuario - Versión simple', async ({ page }) => {
    await page.goto('https://opencart.abstracta.us/');
    await page.waitForLoadState('networkidle');
    
    const pageTitle = await page.title();
    expect(pageTitle).toContain('Your Store');
    
    await page.click('a[title="My Account"]');
    await page.waitForSelector('a[href*="account/register"]', { timeout: 5000 });
    await page.click('a[href*="account/register"]');
    
    await page.waitForLoadState('networkidle');
    const currentUrl = page.url();
    expect(currentUrl).toContain('account/register');
    
    const uniqueEmail = generateRandomEmail();
    
    await page.fill('input[name="firstname"]', userData.validUser.firstName);
    await page.fill('input[name="lastname"]', userData.validUser.lastName);
    await page.fill('input[name="email"]', uniqueEmail);
    await page.fill('input[name="telephone"]', userData.validUser.telephone);
    await page.fill('input[name="password"]', userData.validUser.password);
    await page.fill('input[name="confirm"]', userData.validUser.confirmPassword);
    
    await page.check('input[name="newsletter"][value="0"]');
    
    await page.check('input[name="agree"]');
    
    await page.click('input[type="submit"][value="Continue"]');
    
    const successMessage = await page.textContent('p:has-text("Congratulations!")');
    expect(successMessage).toContain('Congratulations! Your new account has been successfully created!');
    
    console.log('Registro exitoso completado!');
  });

  test('Registro sin aceptar política de privacidad - Debe mostrar error', async ({ page }) => {
    await page.goto('https://opencart.abstracta.us/');
    await page.click('a[title="My Account"]');
    await page.waitForSelector('a[href*="account/register"]', { timeout: 5000 });
    await page.click('a[href*="account/register"]');
    await page.waitForLoadState('networkidle');
    
    await page.fill('input[name="firstname"]', userData.validUser.firstName);
    await page.fill('input[name="lastname"]', userData.validUser.lastName);
    await page.fill('input[name="email"]', userData.validUser.email);
    await page.fill('input[name="telephone"]', userData.validUser.telephone);
    await page.fill('input[name="password"]', userData.validUser.password);
    await page.fill('input[name="confirm"]', userData.validUser.confirmPassword);
    
    await page.click('input[type="submit"][value="Continue"]');
    
    await page.waitForTimeout(2000);
    
    const errorElements = await page.$$('.alert-danger');
    expect(errorElements.length).toBeGreaterThan(0);
    
    console.log('Error de política de privacidad detectado correctamente!');
  });
});
