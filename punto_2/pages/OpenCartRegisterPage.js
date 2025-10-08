const BasePage = require('./BasePage');

/**
 * OpenCartRegisterPage - Página de registro de OpenCart
 * Hereda de BasePage y contiene métodos específicos para el formulario de registro
 */
class OpenCartRegisterPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Selectores específicos del formulario de registro
    this.selectors = {
      // Título y navegación
      pageTitle: 'h1',
      breadcrumbHome: 'a[href*="common/home"]',
      breadcrumbAccount: 'a[href*="account/account"]',
      breadcrumbRegister: 'a[href*="account/register"]',
      
      // Formulario de registro
      personalDetailsSection: 'fieldset legend:has-text("Your Personal Details")',
      firstNameInput: 'input[name="firstname"]',
      lastNameInput: 'input[name="lastname"]',
      emailInput: 'input[name="email"]',
      telephoneInput: 'input[name="telephone"]',
      
      // Sección de contraseña
      passwordSection: 'fieldset legend:has-text("Your Password")',
      passwordInput: 'input[name="password"]',
      confirmPasswordInput: 'input[name="confirm"]',
      
      // Sección de newsletter
      newsletterSection: 'fieldset legend:has-text("Newsletter")',
      newsletterYesRadio: 'input[name="newsletter"][value="1"]',
      newsletterNoRadio: 'input[name="newsletter"][value="0"]',
      
      // Términos y condiciones
      privacyPolicyCheckbox: 'input[name="agree"]',
      privacyPolicyLink: 'a[href*="information/information/agree&information_id=3"]',
      
      // Botones
      continueButton: 'input[type="submit"][value="Continue"]',
      
      // Mensajes de error
      errorMessages: '.text-danger',
      alertDanger: '.alert-danger',
      
      // Enlaces de ayuda
      loginPageLink: 'a[href*="account/login"]',
      
      // Sidebar de cuenta
      accountSidebar: '#column-right',
      loginSidebarLink: '#column-right a[href*="account/login"]',
      registerSidebarLink: '#column-right a[href*="account/register"]',
      forgottenPasswordLink: '#column-right a[href*="account/forgotten"]',
      myAccountSidebarLink: '#column-right a[href*="account/account"]',
      addressBookLink: '#column-right a[href*="account/address"]',
      wishListLink: '#column-right a[href*="account/wishlist"]',
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
   * Verificar que la página de registro se haya cargado correctamente
   */
  async verifyPageLoaded() {
    // Esperar a que la página cargue completamente
    await this.page.waitForLoadState('networkidle');
    
    // Verificar elementos básicos
    await this.page.waitForSelector('h1', { timeout: 10000 });
    await this.page.waitForSelector('input[name="firstname"]', { timeout: 10000 });
    await this.page.waitForSelector('input[type="submit"][value="Continue"]', { timeout: 10000 });
  }

  /**
   * Llenar el formulario de registro completo
   * @param {Object} userData - Datos del usuario
   * @param {string} userData.firstName - Nombre
   * @param {string} userData.lastName - Apellido
   * @param {string} userData.email - Email
   * @param {string} userData.telephone - Teléfono
   * @param {string} userData.password - Contraseña
   * @param {string} userData.confirmPassword - Confirmación de contraseña
   * @param {boolean} userData.subscribeNewsletter - Suscribirse al newsletter
   * @param {boolean} userData.agreePrivacyPolicy - Aceptar política de privacidad
   */
  async fillRegistrationForm(userData) {
    // Llenar datos personales
    await this.page.fill('input[name="firstname"]', userData.firstName);
    await this.page.fill('input[name="lastname"]', userData.lastName);
    await this.page.fill('input[name="email"]', userData.email);
    await this.page.fill('input[name="telephone"]', userData.telephone);
    
    // Llenar contraseñas
    await this.page.fill('input[name="password"]', userData.password);
    await this.page.fill('input[name="confirm"]', userData.confirmPassword);
    
    // Configurar newsletter
    if (userData.subscribeNewsletter) {
      await this.page.check('input[name="newsletter"][value="1"]');
    } else {
      await this.page.check('input[name="newsletter"][value="0"]');
    }
    
    // Aceptar política de privacidad
    if (userData.agreePrivacyPolicy) {
      await this.page.check('input[name="agree"]');
    }
  }

  /**
   * Llenar solo el campo de nombre
   * @param {string} firstName - Nombre
   */
  async fillFirstName(firstName) {
    await this.typeText(this.selectors.firstNameInput, firstName);
  }

  /**
   * Llenar solo el campo de apellido
   * @param {string} lastName - Apellido
   */
  async fillLastName(lastName) {
    await this.typeText(this.selectors.lastNameInput, lastName);
  }

  /**
   * Llenar solo el campo de email
   * @param {string} email - Email
   */
  async fillEmail(email) {
    await this.typeText(this.selectors.emailInput, email);
  }

  /**
   * Llenar solo el campo de teléfono
   * @param {string} telephone - Teléfono
   */
  async fillTelephone(telephone) {
    await this.typeText(this.selectors.telephoneInput, telephone);
  }

  /**
   * Llenar solo el campo de contraseña
   * @param {string} password - Contraseña
   */
  async fillPassword(password) {
    await this.typeText(this.selectors.passwordInput, password);
  }

  /**
   * Llenar solo el campo de confirmación de contraseña
   * @param {string} confirmPassword - Confirmación de contraseña
   */
  async fillConfirmPassword(confirmPassword) {
    await this.typeText(this.selectors.confirmPasswordInput, confirmPassword);
  }

  /**
   * Seleccionar opción de newsletter
   * @param {boolean} subscribe - True para suscribirse, false para no suscribirse
   */
  async selectNewsletterOption(subscribe) {
    if (subscribe) {
      await this.clickElement(this.selectors.newsletterYesRadio);
    } else {
      await this.clickElement(this.selectors.newsletterNoRadio);
    }
  }

  /**
   * Marcar/desmarcar el checkbox de política de privacidad
   * @param {boolean} agree - True para marcar, false para desmarcar
   */
  async setPrivacyPolicyAgreement(agree) {
    const isChecked = await this.isElementChecked(this.selectors.privacyPolicyCheckbox);
    if (agree && !isChecked) {
      await this.clickElement(this.selectors.privacyPolicyCheckbox);
    } else if (!agree && isChecked) {
      await this.clickElement(this.selectors.privacyPolicyCheckbox);
    }
  }

  /**
   * Hacer clic en el botón Continue
   */
  async clickContinueButton() {
    await this.page.click('input[type="submit"][value="Continue"]');
  }

  /**
   * Completar el proceso de registro
   * @param {Object} userData - Datos del usuario
   */
  async completeRegistration(userData) {
    await this.fillRegistrationForm(userData);
    await this.clickContinueButton();
  }

  /**
   * Verificar si hay mensajes de error
   * @returns {Promise<boolean>} True si hay mensajes de error
   */
  async hasErrorMessages() {
    const errorElements = await this.page.$$(this.selectors.errorMessages);
    const alertElements = await this.page.$$(this.selectors.alertDanger);
    return errorElements.length > 0 || alertElements.length > 0;
  }

  /**
   * Obtener todos los mensajes de error
   * @returns {Promise<Array<string>>} Array de mensajes de error
   */
  async getErrorMessages() {
    const errorMessages = [];
    
    // Obtener mensajes de error de campos individuales
    const errorElements = await this.page.$$(this.selectors.errorMessages);
    for (const element of errorElements) {
      const text = await element.textContent();
      if (text.trim()) {
        errorMessages.push(text.trim());
      }
    }
    
    // Obtener alertas de error
    const alertElements = await this.page.$$(this.selectors.alertDanger);
    for (const element of alertElements) {
      const text = await element.textContent();
      if (text.trim()) {
        errorMessages.push(text.trim());
      }
    }
    
    return errorMessages;
  }

  /**
   * Verificar si un campo específico tiene error
   * @param {string} fieldName - Nombre del campo
   * @returns {Promise<boolean>} True si el campo tiene error
   */
  async fieldHasError(fieldName) {
    const fieldSelector = this.selectors[`${fieldName}Input`];
    if (!fieldSelector) return false;
    
    const fieldElement = await this.page.$(fieldSelector);
    if (!fieldElement) return false;
    
    const parentElement = await fieldElement.$('..');
    const errorElement = await parentElement.$(this.selectors.errorMessages);
    return errorElement !== null;
  }

  /**
   * Obtener el valor de un campo específico
   * @param {string} fieldName - Nombre del campo
   * @returns {Promise<string>} Valor del campo
   */
  async getFieldValue(fieldName) {
    const fieldSelector = this.selectors[`${fieldName}Input`];
    if (!fieldSelector) return '';
    
    return await this.getInputValue(fieldSelector);
  }

  /**
   * Verificar si el checkbox de política de privacidad está marcado
   * @returns {Promise<boolean>} True si está marcado
   */
  async isPrivacyPolicyChecked() {
    return await this.isElementChecked(this.selectors.privacyPolicyCheckbox);
  }

  /**
   * Verificar si la opción de newsletter está seleccionada
   * @param {boolean} subscribe - True para verificar "Yes", false para verificar "No"
   * @returns {Promise<boolean>} True si está seleccionada
   */
  async isNewsletterOptionSelected(subscribe) {
    const selector = subscribe ? this.selectors.newsletterYesRadio : this.selectors.newsletterNoRadio;
    return await this.isElementChecked(selector);
  }

  /**
   * Navegar a la página de login desde el enlace en el formulario
   */
  async navigateToLoginFromForm() {
    await this.clickElement(this.selectors.loginPageLink);
  }

  /**
   * Navegar a la página de login desde el sidebar
   */
  async navigateToLoginFromSidebar() {
    await this.clickElement(this.selectors.loginSidebarLink);
  }

  /**
   * Verificar que el título de la página sea correcto
   * @returns {Promise<boolean>} True si el título es correcto
   */
  async isPageTitleCorrect() {
    const title = await this.page.textContent('h1');
    return title && (title.includes('Account') || title.includes('Register'));
  }

  /**
   * Limpiar todos los campos del formulario
   */
  async clearAllFields() {
    await this.clearInput(this.selectors.firstNameInput);
    await this.clearInput(this.selectors.lastNameInput);
    await this.clearInput(this.selectors.emailInput);
    await this.clearInput(this.selectors.telephoneInput);
    await this.clearInput(this.selectors.passwordInput);
    await this.clearInput(this.selectors.confirmPasswordInput);
    
    // Desmarcar checkbox de política de privacidad
    await this.setPrivacyPolicyAgreement(false);
    
    // Seleccionar "No" para newsletter
    await this.selectNewsletterOption(false);
  }
}

module.exports = OpenCartRegisterPage;
