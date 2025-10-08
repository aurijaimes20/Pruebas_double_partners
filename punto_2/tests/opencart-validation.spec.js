const { test, expect } = require('@playwright/test');

/**
 * Pruebas de validación del formulario de registro de OpenCart
 * Estas pruebas verifican que el formulario no se envíe cuando faltan datos obligatorios
 */
test.describe('OpenCart - Validaciones de Formulario', () => {
  
  test('Formulario vacío - Botón no debe navegar', async ({ page }) => {
    console.log('🔍 Probando formulario vacío...');
    
    // Navegar al registro
    await page.goto('https://opencart.abstracta.us/');
    await page.click('a[title="My Account"]');
    await page.waitForSelector('a[href*="account/register"]', { timeout: 5000 });
    await page.click('a[href*="account/register"]');
    await page.waitForLoadState('networkidle');
    
    const initialUrl = page.url();
    console.log('📍 URL inicial:', initialUrl);
    
    // Intentar enviar formulario vacío
    console.log('🚫 Enviando formulario vacío...');
    await page.click('input[type="submit"][value="Continue"]');
    
    // Esperar un momento para ver si hay navegación
    await page.waitForTimeout(3000);
    
    const finalUrl = page.url();
    console.log('📍 URL final:', finalUrl);
    
    // Verificar que no hubo navegación
    expect(finalUrl).toBe(initialUrl);
    console.log('✅ Formulario vacío no navegó - Validación funcionando');
  });

  test('Solo nombre - Botón no debe navegar', async ({ page }) => {
    console.log('🔍 Probando solo con nombre...');
    
    // Navegar al registro
    await page.goto('https://opencart.abstracta.us/');
    await page.click('a[title="My Account"]');
    await page.waitForSelector('a[href*="account/register"]', { timeout: 5000 });
    await page.click('a[href*="account/register"]');
    await page.waitForLoadState('networkidle');
    
    const initialUrl = page.url();
    console.log('📍 URL inicial:', initialUrl);
    
    // Llenar solo el nombre
    await page.fill('input[name="firstname"]', 'Juan');
    console.log('📝 Solo nombre llenado');
    
    // Intentar enviar
    await page.click('input[type="submit"][value="Continue"]');
    await page.waitForTimeout(3000);
    
    const finalUrl = page.url();
    console.log('📍 URL final:', finalUrl);
    
    // Verificar que no hubo navegación
    expect(finalUrl).toBe(initialUrl);
    console.log('✅ Solo nombre no navegó - Validación funcionando');
  });

  test('Sin política de privacidad - Botón no debe navegar', async ({ page }) => {
    console.log('🔍 Probando sin política de privacidad...');
    
    // Navegar al registro
    await page.goto('https://opencart.abstracta.us/');
    await page.click('a[title="My Account"]');
    await page.waitForSelector('a[href*="account/register"]', { timeout: 5000 });
    await page.click('a[href*="account/register"]');
    await page.waitForLoadState('networkidle');
    
    const initialUrl = page.url();
    console.log('📍 URL inicial:', initialUrl);
    
    // Llenar todos los campos excepto política de privacidad
    await page.fill('input[name="firstname"]', 'Juan');
    await page.fill('input[name="lastname"]', 'Pérez');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="telephone"]', '1234567890');
    await page.fill('input[name="password"]', 'TestPassword123!');
    await page.fill('input[name="confirm"]', 'TestPassword123!');
    await page.check('input[name="newsletter"][value="0"]');
    
    console.log('📝 Todos los campos llenados excepto política de privacidad');
    
    // Intentar enviar sin marcar política de privacidad
    await page.click('input[type="submit"][value="Continue"]');
    await page.waitForTimeout(3000);
    
    const finalUrl = page.url();
    console.log('📍 URL final:', finalUrl);
    
    // Verificar que no hubo navegación
    expect(finalUrl).toBe(initialUrl);
    console.log('✅ Sin política de privacidad no navegó - Validación funcionando');
  });

  test('Contraseñas diferentes - Botón no debe navegar', async ({ page }) => {
    console.log('🔍 Probando contraseñas diferentes...');
    
    // Navegar al registro
    await page.goto('https://opencart.abstracta.us/');
    await page.click('a[title="My Account"]');
    await page.waitForSelector('a[href*="account/register"]', { timeout: 5000 });
    await page.click('a[href*="account/register"]');
    await page.waitForLoadState('networkidle');
    
    const initialUrl = page.url();
    console.log('📍 URL inicial:', initialUrl);
    
    // Llenar formulario con contraseñas diferentes
    await page.fill('input[name="firstname"]', 'Juan');
    await page.fill('input[name="lastname"]', 'Pérez');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="telephone"]', '1234567890');
    await page.fill('input[name="password"]', 'Password123');
    await page.fill('input[name="confirm"]', 'DifferentPassword123'); // Contraseña diferente
    await page.check('input[name="newsletter"][value="0"]');
    await page.check('input[name="agree"]');
    
    console.log('📝 Formulario llenado con contraseñas diferentes');
    
    // Intentar enviar
    await page.click('input[type="submit"][value="Continue"]');
    await page.waitForTimeout(3000);
    
    const finalUrl = page.url();
    console.log('📍 URL final:', finalUrl);
    
    // Verificar que no hubo navegación
    expect(finalUrl).toBe(initialUrl);
    console.log('✅ Contraseñas diferentes no navegó - Validación funcionando');
  });

  test('Email inválido - Botón no debe navegar', async ({ page }) => {
    console.log('🔍 Probando email inválido...');
    
    // Navegar al registro
    await page.goto('https://opencart.abstracta.us/');
    await page.click('a[title="My Account"]');
    await page.waitForSelector('a[href*="account/register"]', { timeout: 5000 });
    await page.click('a[href*="account/register"]');
    await page.waitForLoadState('networkidle');
    
    const initialUrl = page.url();
    console.log('📍 URL inicial:', initialUrl);
    
    // Llenar formulario con email inválido
    await page.fill('input[name="firstname"]', 'Juan');
    await page.fill('input[name="lastname"]', 'Pérez');
    await page.fill('input[name="email"]', 'email-invalido-sin-arroba'); // Email inválido
    await page.fill('input[name="telephone"]', '1234567890');
    await page.fill('input[name="password"]', 'TestPassword123!');
    await page.fill('input[name="confirm"]', 'TestPassword123!');
    await page.check('input[name="newsletter"][value="0"]');
    await page.check('input[name="agree"]');
    
    console.log('📝 Formulario llenado con email inválido');
    
    // Intentar enviar
    await page.click('input[type="submit"][value="Continue"]');
    await page.waitForTimeout(3000);
    
    const finalUrl = page.url();
    console.log('📍 URL final:', finalUrl);
    
    // Verificar que no hubo navegación
    expect(finalUrl).toBe(initialUrl);
    console.log('✅ Email inválido no navegó - Validación funcionando');
  });

  test('Verificar que el botón está habilitado', async ({ page }) => {
    console.log('🔍 Verificando que el botón Continue está habilitado...');
    
    // Navegar al registro
    await page.goto('https://opencart.abstracta.us/');
    await page.click('a[title="My Account"]');
    await page.waitForSelector('a[href*="account/register"]', { timeout: 5000 });
    await page.click('a[href*="account/register"]');
    await page.waitForLoadState('networkidle');
    
    // Verificar que el botón existe y está habilitado
    const continueButton = await page.$('input[type="submit"][value="Continue"]');
    expect(continueButton).toBeTruthy();
    
    const isEnabled = await continueButton.isEnabled();
    expect(isEnabled).toBe(true);
    
    console.log('✅ Botón Continue está presente y habilitado');
  });

  test('Verificar campos obligatorios están presentes', async ({ page }) => {
    console.log('🔍 Verificando campos obligatorios...');
    
    // Navegar al registro
    await page.goto('https://opencart.abstracta.us/');
    await page.click('a[title="My Account"]');
    await page.waitForSelector('a[href*="account/register"]', { timeout: 5000 });
    await page.click('a[href*="account/register"]');
    await page.waitForLoadState('networkidle');
    
    // Verificar que todos los campos obligatorios están presentes
    const requiredFields = [
      'input[name="firstname"]',
      'input[name="lastname"]',
      'input[name="email"]',
      'input[name="telephone"]',
      'input[name="password"]',
      'input[name="confirm"]',
      'input[name="agree"]'
    ];
    
    for (const field of requiredFields) {
      const element = await page.$(field);
      expect(element).toBeTruthy();
      console.log(`✅ Campo encontrado: ${field}`);
    }
    
    console.log('✅ Todos los campos obligatorios están presentes');
  });
});
