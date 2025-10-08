const BasePage = require('./BasePage');

/**
 * OpenCartLoginPage - Página de login de OpenCart
 * Hereda de BasePage y contiene métodos específicos para el formulario de login
 */
class OpenCartLoginPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Selectores específicos del formulario de login
    this.selectors = {
      // Título y navegación
      pageTitle: 'h1',
      breadcrumbHome: 'a[href*="common/home"]',
      breadcrumbAccount: 'a[href*="account/account"]',
      breadcrumbLogin: 'a[href*="account/login"]',
      
      // Sección New Customer
      newCustomerSection: 'h2:has-text("New Customer")',
      newCustomerDescription: 'p:has-text("By creating an account")',
      registerContinueButton: 'a[href*="account/register"]:has-text("Continue")',
      
      // Sección Returning Customer
      returningCustomerSection: 'h2:has-text("Returning Customer")',
      returningCustomerDescription: 'p:has-text("I am a returning customer")',
      
      // Formulario de login
      emailInput: 'input[name="email"]',
      passwordInput: 'input[name="password"]',
      loginButton: 'input[type="submit"][value="Login"]',
      forgottenPasswordLink: 'a[href*="account/forgotten"]',
      
      // Mensajes de error
      loginError: '.alert-danger',
      emailError: '#input-email + .text-danger',
      passwordError: '#input-password + .text-danger',
      
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
   * Verificar que la página de login se haya cargado correctamente
   */
  async verifyPageLoaded() {
    // Esperar a que la página cargue completamente
    await this.page.waitForLoadState('networkidle');
    
    // Verificar elementos básicos
    await this.page.waitForSelector('h1', { timeout: 10000 });
    await this.page.waitForSelector('input[name="email"]', { timeout: 10000 });
    await this.page.waitForSelector('input[type="submit"][value="Login"]', { timeout: 10000 });
  }

  /**
   * Llenar el formulario de login
   * @param {string} email - Correo electrónico
   * @param {string} password - Contraseña
   */
  async fillLoginForm(email, password) {
    await this.page.fill(this.selectors.emailInput, email);
    await this.page.fill(this.selectors.passwordInput, password);
  }

  /**
   * Llenar solo el campo de email
   * @param {string} email - Correo electrónico
   */
  async fillEmail(email) {
    await this.page.fill(this.selectors.emailInput, email);
  }

  /**
   * Llenar solo el campo de contraseña
   * @param {string} password - Contraseña
   */
  async fillPassword(password) {
    await this.page.fill(this.selectors.passwordInput, password);
  }

  /**
   * Hacer clic en el botón Login
   */
  async clickLoginButton() {
    await this.page.click(this.selectors.loginButton);
  }

  /**
   * Hacer clic en el enlace "Forgotten Password"
   */
  async clickForgottenPasswordLink() {
    await this.page.click(this.selectors.forgottenPasswordLink);
  }

  /**
   * Hacer clic en el botón "Continue" para registro
   */
  async clickRegisterContinueButton() {
    await this.page.click(this.selectors.registerContinueButton);
  }

  /**
   * Completar el proceso de login
   * @param {string} email - Correo electrónico
   * @param {string} password - Contraseña
   */
  async performLogin(email, password) {
    await this.fillLoginForm(email, password);
    await this.clickLoginButton();
  }

  /**
   * Obtener el texto del mensaje de error de login
   * @returns {Promise<string|null>} Mensaje de error o null si no existe
   */
  async getLoginError() {
    return await this.getText(this.selectors.loginError);
  }

  /**
   * Obtener el texto del mensaje de error del email
   * @returns {Promise<string|null>} Mensaje de error o null si no existe
   */
  async getEmailError() {
    return await this.getText(this.selectors.emailError);
  }

  /**
   * Obtener el texto del mensaje de error de la contraseña
   * @returns {Promise<string|null>} Mensaje de error o null si no existe
   */
  async getPasswordError() {
    return await this.getText(this.selectors.passwordError);
  }

  /**
   * Verificar que el título de la página sea correcto
   * @returns {Promise<boolean>} True si el título es correcto
   */
  async isPageTitleCorrect() {
    const title = await this.page.textContent('h1');
    return title && (title.includes('Account') || title.includes('Login'));
  }

  /**
   * Verificar que la sección "New Customer" esté visible
   * @returns {Promise<boolean>} True si la sección es visible
   */
  async isNewCustomerSectionVisible() {
    return await this.isElementVisible(this.selectors.newCustomerSection);
  }

  /**
   * Verificar que la sección "Returning Customer" esté visible
   * @returns {Promise<boolean>} True si la sección es visible
   */
  async isReturningCustomerSectionVisible() {
    return await this.isElementVisible(this.selectors.returningCustomerSection);
  }

  /**
   * Verificar que el enlace "Forgotten Password" esté visible
   * @returns {Promise<boolean>} True si el enlace es visible
   */
  async isForgottenPasswordLinkVisible() {
    return await this.isElementVisible(this.selectors.forgottenPasswordLink);
  }

  /**
   * Limpiar todos los campos del formulario
   */
  async clearAllFields() {
    await this.page.fill(this.selectors.emailInput, '');
    await this.page.fill(this.selectors.passwordInput, '');
  }

  /**
   * Navegar a la página de registro desde el sidebar
   */
  async navigateToRegisterFromSidebar() {
    await this.clickElement(this.selectors.registerSidebarLink);
  }

  /**
   * Navegar a la página de restablecimiento de contraseña desde el sidebar
   */
  async navigateToForgottenPasswordFromSidebar() {
    await this.clickElement(this.selectors.forgottenPasswordSidebarLink);
  }
}

module.exports = OpenCartLoginPage;
