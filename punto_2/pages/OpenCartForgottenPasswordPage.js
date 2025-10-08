const BasePage = require('./BasePage');

/**
 * OpenCartForgottenPasswordPage - Página de restablecimiento de contraseña de OpenCart
 * Hereda de BasePage y contiene métodos específicos para el formulario de restablecimiento de contraseña
 */
class OpenCartForgottenPasswordPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Selectores específicos del formulario de restablecimiento de contraseña
    this.selectors = {
      // Título y navegación
      pageTitle: 'h1',
      breadcrumbHome: 'a[href*="common/home"]',
      breadcrumbAccount: 'a[href*="account/account"]',
      breadcrumbForgottenPassword: 'a[href*="account/forgotten"]',
      
      // Instrucciones
      instructionsText: 'p:has-text("Enter the e-mail address associated with your account")',
      
      // Formulario de restablecimiento
      emailInput: 'input[name="email"]',
      continueButton: 'input[type="submit"][value="Continue"]',
      backButton: 'a[href*="account/login"]:has-text("Back")',
      
      // Mensajes de éxito/error
      successMessage: '.alert-success',
      errorMessage: '.alert-danger',
      emailError: '#input-email + .text-danger',
      
      // Enlaces del sidebar
      loginSidebarLink: '#column-right a[href*="account/login"]',
      registerSidebarLink: '#column-right a[href*="account/register"]',
      forgottenPasswordSidebarLink: '#column-right a[href*="account/forgotten"]',
      myAccountSidebarLink: '#column-right a[href*="account/account"]',
      addressBookLink: '#column-right a[href*="account/address"]',
      wishListSidebarLink: '#column-right a[href*="account/wishlist"]',
      orderHistoryLink: '#column-right a[href*="account/order"]',
      downloadsLink: '#column-right a[href*="account/download"]',
      recurringPaymentsLink: '#column-right a[href*="account/recurring"]',
      rewardPointsLink: '#column-right a[href*="account/reward"]',
      returnsLink: '#column-right a[href*="account/return"]',
      transactionsLink: '#column-right a[href*="account/transaction"]',
      newsletterSidebarLink: '#column-right a[href*="account/newsletter"]'
    };
  }

  /**
   * Verificar que la página de restablecimiento de contraseña se haya cargado correctamente
   */
  async verifyPageLoaded() {
    // Esperar a que la página cargue completamente
    await this.page.waitForLoadState('networkidle');
    
    // Verificar elementos básicos
    await this.page.waitForSelector('h1', { timeout: 10000 });
    await this.page.waitForSelector('input[name="email"]', { timeout: 10000 });
    await this.page.waitForSelector('input[type="submit"][value="Continue"]', { timeout: 10000 });
  }

  /**
   * Llenar el campo de email
   * @param {string} email - Correo electrónico
   */
  async fillEmail(email) {
    await this.page.fill(this.selectors.emailInput, email);
  }

  /**
   * Hacer clic en el botón Continue
   */
  async clickContinueButton() {
    await this.page.click(this.selectors.continueButton);
  }

  /**
   * Hacer clic en el botón Back
   */
  async clickBackButton() {
    await this.page.click(this.selectors.backButton);
  }

  /**
   * Completar el proceso de restablecimiento de contraseña
   * @param {string} email - Correo electrónico
   */
  async requestPasswordReset(email) {
    await this.fillEmail(email);
    await this.clickContinueButton();
  }

  /**
   * Obtener el texto del mensaje de éxito
   * @returns {Promise<string|null>} Mensaje de éxito o null si no existe
   */
  async getSuccessMessage() {
    return await this.getText(this.selectors.successMessage);
  }

  /**
   * Obtener el texto del mensaje de error
   * @returns {Promise<string|null>} Mensaje de error o null si no existe
   */
  async getErrorMessage() {
    return await this.getText(this.selectors.errorMessage);
  }

  /**
   * Obtener el texto del mensaje de error del email
   * @returns {Promise<string|null>} Mensaje de error o null si no existe
   */
  async getEmailError() {
    return await this.getText(this.selectors.emailError);
  }

  /**
   * Verificar que el título de la página sea correcto
   * @returns {Promise<boolean>} True si el título es correcto
   */
  async isPageTitleCorrect() {
    const title = await this.page.textContent('h1');
    return title && (title.includes('Account') || title.includes('Forgot'));
  }

  /**
   * Verificar que las instrucciones estén visibles
   * @returns {Promise<boolean>} True si las instrucciones son visibles
   */
  async areInstructionsVisible() {
    return await this.isElementVisible(this.selectors.instructionsText);
  }

  /**
   * Verificar que el campo de email esté visible
   * @returns {Promise<boolean>} True si el campo es visible
   */
  async isEmailFieldVisible() {
    return await this.isElementVisible(this.selectors.emailInput);
  }

  /**
   * Verificar que el botón Continue esté visible
   * @returns {Promise<boolean>} True si el botón es visible
   */
  async isContinueButtonVisible() {
    return await this.isElementVisible(this.selectors.continueButton);
  }

  /**
   * Verificar que el botón Back esté visible
   * @returns {Promise<boolean>} True si el botón es visible
   */
  async isBackButtonVisible() {
    return await this.isElementVisible(this.selectors.backButton);
  }

  /**
   * Limpiar el campo de email
   */
  async clearEmailField() {
    await this.page.fill(this.selectors.emailInput, '');
  }

  /**
   * Navegar a la página de login desde el sidebar
   */
  async navigateToLoginFromSidebar() {
    await this.clickElement(this.selectors.loginSidebarLink);
  }

  /**
   * Navegar a la página de registro desde el sidebar
   */
  async navigateToRegisterFromSidebar() {
    await this.clickElement(this.selectors.registerSidebarLink);
  }
}

module.exports = OpenCartForgottenPasswordPage;
