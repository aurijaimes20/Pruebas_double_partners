const { test, expect } = require('@playwright/test');
const OpenCartHomePage = require('../pages/OpenCartHomePage');
const OpenCartRegisterPage = require('../pages/OpenCartRegisterPage');
const OpenCartSuccessPage = require('../pages/OpenCartSuccessPage');
const { userData, appConfig } = require('../fixtures/opencartTestData');

/**
 * Pruebas de automatización para el flujo de registro de OpenCart
 * Estas pruebas replican el flujo manual que se ejecutó anteriormente
 */
test.describe('OpenCart - Flujo de Registro de Usuario', () => {
  let homePage;
  let registerPage;
  let successPage;

  test.beforeEach(async ({ page }) => {
    // Inicializar las páginas
    homePage = new OpenCartHomePage(page);
    registerPage = new OpenCartRegisterPage(page);
    successPage = new OpenCartSuccessPage(page);
  });

  test('Registro exitoso de usuario - Flujo completo', async ({ page }) => {
    // Paso 1: Navegar a la página principal de OpenCart
    await test.step('Navegar a la página principal', async () => {
      await homePage.navigate();
      await homePage.verifyPageLoaded();
      
      // Verificar que estamos en la página correcta
      const pageTitle = await homePage.getPageTitle();
      expect(pageTitle).toContain('Your Store');
      
      // Verificar que el logo esté visible
      const isLogoVisible = await homePage.isLogoVisible();
      expect(isLogoVisible).toBe(true);
    });

    // Paso 2: Navegar a la página de registro
    await test.step('Navegar a la página de registro', async () => {
      await homePage.navigateToRegister();
      await registerPage.verifyPageLoaded();
      
      // Verificar que estamos en la página de registro
      const currentUrl = page.url();
      expect(currentUrl).toContain('account/register');
      
      // Verificar que el título de la página sea correcto
      const isTitleCorrect = await registerPage.isPageTitleCorrect();
      expect(isTitleCorrect).toBe(true);
    });

    // Paso 3: Llenar el formulario de registro
    await test.step('Llenar el formulario de registro', async () => {
      // Llenar datos personales
      await registerPage.fillFirstName(userData.validUser.firstName);
      await registerPage.fillLastName(userData.validUser.lastName);
      await registerPage.fillEmail(userData.validUser.email);
      await registerPage.fillTelephone(userData.validUser.telephone);
      
      // Llenar contraseñas
      await registerPage.fillPassword(userData.validUser.password);
      await registerPage.fillConfirmPassword(userData.validUser.confirmPassword);
      
      // Configurar newsletter (No)
      await registerPage.selectNewsletterOption(userData.validUser.subscribeNewsletter);
      
      // Aceptar política de privacidad
      await registerPage.setPrivacyPolicyAgreement(userData.validUser.agreePrivacyPolicy);
      
      // Verificar que todos los campos estén llenos correctamente
      const firstName = await registerPage.getFieldValue('firstName');
      expect(firstName).toBe(userData.validUser.firstName);
      
      const lastName = await registerPage.getFieldValue('lastName');
      expect(lastName).toBe(userData.validUser.lastName);
      
      const email = await registerPage.getFieldValue('email');
      expect(email).toBe(userData.validUser.email);
      
      const telephone = await registerPage.getFieldValue('telephone');
      expect(telephone).toBe(userData.validUser.telephone);
      
      // Verificar que el checkbox de política de privacidad esté marcado
      const isPrivacyPolicyChecked = await registerPage.isPrivacyPolicyChecked();
      expect(isPrivacyPolicyChecked).toBe(true);
      
      // Verificar que la opción de newsletter esté configurada correctamente
      const isNewsletterSelected = await registerPage.isNewsletterOptionSelected(false);
      expect(isNewsletterSelected).toBe(true);
    });

    // Paso 4: Enviar el formulario
    await test.step('Enviar el formulario de registro', async () => {
      await registerPage.clickContinueButton();
      
      // Esperar a que la página cambie
      await page.waitForURL('**/account/success');
    });

    // Paso 5: Verificar el éxito del registro
    await test.step('Verificar el éxito del registro', async () => {
      await successPage.verifyPageLoaded();
      
      // Verificar que estamos en la página de éxito
      const currentUrl = page.url();
      expect(currentUrl).toContain('account/success');
      
      // Verificar que el título de la página sea correcto
      const pageTitle = await successPage.getPageTitle();
      expect(pageTitle).toContain('Your Account Has Been Created!');
      
      // Verificar que todos los mensajes de éxito estén presentes
      const areAllMessagesPresent = await successPage.areAllSuccessMessagesPresent();
      expect(areAllMessagesPresent).toBe(true);
      
      // Verificar mensajes específicos
      const successMessage = await successPage.getSuccessMessage();
      expect(successMessage).toContain('Congratulations! Your new account has been successfully created!');
      
      const memberPrivilegesMessage = await successPage.getMemberPrivilegesMessage();
      expect(memberPrivilegesMessage).toContain('You can now take advantage of member privileges');
      
      const confirmationMessage = await successPage.getConfirmationMessage();
      expect(confirmationMessage).toContain('A confirmation has been sent to the provided e-mail address');
      
      // Verificar que no haya mensajes de error
      const hasNoErrors = await successPage.hasNoErrorMessages();
      expect(hasNoErrors).toBe(true);
      
      // Verificar que el botón Continue esté habilitado
      const isContinueButtonEnabled = await successPage.isContinueButtonEnabled();
      expect(isContinueButtonEnabled).toBe(true);
    });

    // Paso 6: Continuar al panel de cuenta
    await test.step('Continuar al panel de cuenta', async () => {
      await successPage.clickContinueButton();
      
      // Esperar a que la página cambie
      await page.waitForURL('**/account/account');
      
      // Verificar que estamos en la página de cuenta
      const currentUrl = page.url();
      expect(currentUrl).toContain('account/account');
    });
  });

  test('Registro con email inválido - Debe mostrar error', async ({ page }) => {
    await test.step('Navegar a la página de registro', async () => {
      await homePage.navigate();
      await homePage.navigateToRegister();
      await registerPage.verifyPageLoaded();
    });

    await test.step('Llenar formulario con email inválido', async () => {
      await registerPage.fillRegistrationForm(userData.invalidEmailUser);
      await registerPage.clickContinueButton();
    });

    await test.step('Verificar que se muestre error', async () => {
      // Verificar que hay mensajes de error
      const hasErrors = await registerPage.hasErrorMessages();
      expect(hasErrors).toBe(true);
      
      // Verificar que el campo email tiene error
      const emailHasError = await registerPage.fieldHasError('email');
      expect(emailHasError).toBe(true);
      
      // Obtener mensajes de error
      const errorMessages = await registerPage.getErrorMessages();
      expect(errorMessages.length).toBeGreaterThan(0);
    });
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

  test('Navegación entre páginas del flujo de registro', async ({ page }) => {
    await test.step('Navegar desde home a registro', async () => {
      await homePage.navigate();
      await homePage.navigateToRegister();
      
      const currentUrl = page.url();
      expect(currentUrl).toContain('account/register');
    });

    await test.step('Navegar desde registro a login', async () => {
      await registerPage.navigateToLoginFromForm();
      
      const currentUrl = page.url();
      expect(currentUrl).toContain('account/login');
    });

    await test.step('Navegar de vuelta a registro', async () => {
      await page.goBack();
      
      const currentUrl = page.url();
      expect(currentUrl).toContain('account/register');
    });
  });

  test('Verificar elementos de la página de registro', async ({ page }) => {
    await test.step('Navegar a la página de registro', async () => {
      await homePage.navigate();
      await homePage.navigateToRegister();
      await registerPage.verifyPageLoaded();
    });

    await test.step('Verificar que todos los elementos estén presentes', async () => {
      // Verificar campos del formulario
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
      
      // Verificar botón Continue
      const continueButtonVisible = await registerPage.isElementVisible(registerPage.selectors.continueButton);
      expect(continueButtonVisible).toBe(true);
      
      // Verificar checkbox de política de privacidad
      const privacyPolicyVisible = await registerPage.isElementVisible(registerPage.selectors.privacyPolicyCheckbox);
      expect(privacyPolicyVisible).toBe(true);
    });
  });
});
