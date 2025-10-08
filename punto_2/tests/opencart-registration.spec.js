const { test, expect } = require('@playwright/test');
const OpenCartHomePage = require('../pages/OpenCartHomePage');
const OpenCartRegisterPage = require('../pages/OpenCartRegisterPage');
const OpenCartSuccessPage = require('../pages/OpenCartSuccessPage');
const { userData, appConfig } = require('../fixtures/opencartTestData');

test.describe('OpenCart - Flujo de Registro de Usuario', () => {
  let homePage;
  let registerPage;
  let successPage;

  test.beforeEach(async ({ page }) => {
    homePage = new OpenCartHomePage(page);
    registerPage = new OpenCartRegisterPage(page);
    successPage = new OpenCartSuccessPage(page);
  });

  test('Registro con contraseñas que no coinciden - Debe mostrar error', async ({ page }) => {
    await test.step('Navegar a la página de registro', async () => {
      await homePage.navigate();
      await homePage.navigateToRegister();
      await registerPage.verifyPageLoaded();
    });

    await test.step('Llenar formulario con contraseñas diferentes', async () => {
      await registerPage.fillRegistrationForm(userData.passwordMismatchUser);
      await registerPage.clickContinueButton();
    });

    await test.step('Verificar que se muestre error de contraseñas', async () => {
      const hasErrors = await registerPage.hasErrorMessages();
      expect(hasErrors).toBe(true);
      
      const errorMessages = await registerPage.getErrorMessages();
      expect(errorMessages.length).toBeGreaterThan(0);
    });
  });

  test('Registro sin aceptar política de privacidad - Debe mostrar error', async ({ page }) => {
    await test.step('Navegar a la página de registro', async () => {
      await homePage.navigate();
      await homePage.navigateToRegister();
      await registerPage.verifyPageLoaded();
    });

    await test.step('Llenar formulario sin aceptar política de privacidad', async () => {
      await registerPage.fillRegistrationForm(userData.noPrivacyPolicyUser);
      await registerPage.clickContinueButton();
    });

    await test.step('Verificar que se muestre error de política de privacidad', async () => {
      const hasErrors = await registerPage.hasErrorMessages();
      expect(hasErrors).toBe(true);
      
      const errorMessages = await registerPage.getErrorMessages();
      expect(errorMessages.length).toBeGreaterThan(0);
    });
  });

  test('Registro con campos vacíos - Debe mostrar errores', async ({ page }) => {
    await test.step('Navegar a la página de registro', async () => {
      await homePage.navigate();
      await homePage.navigateToRegister();
      await registerPage.verifyPageLoaded();
    });

    await test.step('Enviar formulario vacío', async () => {
      await registerPage.clickContinueButton();
    });

    await test.step('Verificar que se muestren errores de campos obligatorios', async () => {
      const hasErrors = await registerPage.hasErrorMessages();
      expect(hasErrors).toBe(true);
      
      const errorMessages = await registerPage.getErrorMessages();
      expect(errorMessages.length).toBeGreaterThan(0);
    });
  });

  test('Verificar elementos de la página de registro', async ({ page }) => {
    await test.step('Navegar a la página de registro', async () => {
      await homePage.navigate();
      await homePage.navigateToRegister();
      await registerPage.verifyPageLoaded();
    });

    await test.step('Verificar que todos los elementos estén presentes', async () => {
      const firstNameVisible = await registerPage.isElementVisible(registerPage.selectors.firstNameInput);
      expect(firstNameVisible).toBe(true);
      
      const lastNameVisible = await registerPage.isElementVisible(registerPage.selectors.lastNameInput);
      expect(lastNameVisible).toBe(true);
      
      const emailVisible = await registerPage.isElementVisible(registerPage.selectors.emailInput);
      expect(emailVisible).toBe(true);
      
      const telephoneVisible = await registerPage.isElementVisible(registerPage.selectors.telephoneInput);
      expect(telephoneVisible).toBe(true);
      
      const passwordVisible = await registerPage.isElementVisible(registerPage.selectors.passwordInput);
      expect(passwordVisible).toBe(true);
      
      const confirmPasswordVisible = await registerPage.isElementVisible(registerPage.selectors.confirmPasswordInput);
      expect(confirmPasswordVisible).toBe(true);
      
      const continueButtonVisible = await registerPage.isElementVisible(registerPage.selectors.continueButton);
      expect(continueButtonVisible).toBe(true);
      
      const privacyPolicyVisible = await registerPage.isElementVisible(registerPage.selectors.privacyPolicyCheckbox);
      expect(privacyPolicyVisible).toBe(true);
    });
  });
});
