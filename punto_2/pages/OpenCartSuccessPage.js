const BasePage = require('./BasePage');

/**
 * OpenCartSuccessPage - Página de éxito del registro de OpenCart
 * Hereda de BasePage y contiene métodos específicos para la página de confirmación de registro
 */
class OpenCartSuccessPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Selectores específicos de la página de éxito
    this.selectors = {
      // Título y navegación
      pageTitle: 'h1',
      breadcrumbHome: 'a[href*="common/home"]',
      breadcrumbAccount: 'a[href*="account/account"]',
      breadcrumbSuccess: 'a[href*="account/success"]',
      
      // Mensajes de éxito
      successMessage: 'p:has-text("Congratulations! Your new account has been successfully created!")',
      memberPrivilegesMessage: 'p:has-text("You can now take advantage of member privileges")',
      questionsMessage: 'p:has-text("If you have ANY questions about the operation")',
      confirmationMessage: 'p:has-text("A confirmation has been sent to the provided e-mail address")',
      
      // Enlaces en los mensajes
      contactUsLink: 'a[href*="information/contact"]',
      
      // Botón de continuación
      continueButton: 'a[href*="account/account"]:has-text("Continue")',
      
      // Sidebar de cuenta
      accountSidebar: '#column-right',
      myAccountSidebarLink: '#column-right a[href*="account/account"]',
      editAccountLink: '#column-right a[href*="account/edit"]',
      passwordLink: '#column-right a[href*="account/password"]',
      addressBookLink: '#column-right a[href*="account/address"]',
      wishListLink: '#column-right a[href*="account/wishlist"]',
      orderHistoryLink: '#column-right a[href*="account/order"]',
      downloadsLink: '#column-right a[href*="account/download"]',
      recurringPaymentsLink: '#column-right a[href*="account/recurring"]',
      rewardPointsLink: '#column-right a[href*="account/reward"]',
      returnsLink: '#column-right a[href*="account/return"]',
      transactionsLink: '#column-right a[href*="account/transaction"]',
      newsletterSidebarLink: '#column-right a[href*="account/newsletter"]',
      logoutLink: '#column-right a[href*="account/logout"]'
    };
  }

  /**
   * Verificar que la página de éxito se haya cargado correctamente
   */
  async verifyPageLoaded() {
    // Esperar a que la página cargue completamente
    await this.page.waitForLoadState('networkidle');
    
    // Verificar elementos básicos
    await this.page.waitForSelector('h1', { timeout: 10000 });
    await this.page.waitForSelector('p:has-text("Congratulations!")', { timeout: 10000 });
    await this.page.waitForSelector('a[href*="account/account"]:has-text("Continue")', { timeout: 10000 });
  }

  /**
   * Verificar que el mensaje de éxito esté presente
   * @returns {Promise<boolean>} True si el mensaje de éxito está presente
   */
  async isSuccessMessagePresent() {
    return await this.isElementVisible(this.selectors.successMessage);
  }

  /**
   * Verificar que el mensaje de privilegios de miembro esté presente
   * @returns {Promise<boolean>} True si el mensaje está presente
   */
  async isMemberPrivilegesMessagePresent() {
    return await this.isElementVisible(this.selectors.memberPrivilegesMessage);
  }

  /**
   * Verificar que el mensaje de preguntas esté presente
   * @returns {Promise<boolean>} True si el mensaje está presente
   */
  async isQuestionsMessagePresent() {
    return await this.isElementVisible(this.selectors.questionsMessage);
  }

  /**
   * Verificar que el mensaje de confirmación por email esté presente
   * @returns {Promise<boolean>} True si el mensaje está presente
   */
  async isConfirmationMessagePresent() {
    return await this.isElementVisible(this.selectors.confirmationMessage);
  }

  /**
   * Obtener el texto del mensaje de éxito
   * @returns {Promise<string>} Texto del mensaje de éxito
   */
  async getSuccessMessage() {
    return await this.getText(this.selectors.successMessage);
  }

  /**
   * Obtener el texto del mensaje de privilegios de miembro
   * @returns {Promise<string>} Texto del mensaje
   */
  async getMemberPrivilegesMessage() {
    return await this.getText(this.selectors.memberPrivilegesMessage);
  }

  /**
   * Obtener el texto del mensaje de preguntas
   * @returns {Promise<string>} Texto del mensaje
   */
  async getQuestionsMessage() {
    return await this.getText(this.selectors.questionsMessage);
  }

  /**
   * Obtener el texto del mensaje de confirmación por email
   * @returns {Promise<string>} Texto del mensaje
   */
  async getConfirmationMessage() {
    return await this.getText(this.selectors.confirmationMessage);
  }

  /**
   * Hacer clic en el botón Continue
   */
  async clickContinueButton() {
    await this.page.click('a[href*="account/account"]:has-text("Continue")');
  }

  /**
   * Hacer clic en el enlace "contact us"
   */
  async clickContactUsLink() {
    await this.clickElement(this.selectors.contactUsLink);
  }

  /**
   * Navegar a "My Account" desde el sidebar
   */
  async navigateToMyAccountFromSidebar() {
    await this.clickElement(this.selectors.myAccountSidebarLink);
  }

  /**
   * Navegar a "Edit Account" desde el sidebar
   */
  async navigateToEditAccountFromSidebar() {
    await this.clickElement(this.selectors.editAccountLink);
  }

  /**
   * Navegar a "Password" desde el sidebar
   */
  async navigateToPasswordFromSidebar() {
    await this.clickElement(this.selectors.passwordLink);
  }

  /**
   * Navegar a "Address Book" desde el sidebar
   */
  async navigateToAddressBookFromSidebar() {
    await this.clickElement(this.selectors.addressBookLink);
  }

  /**
   * Navegar a "Wish List" desde el sidebar
   */
  async navigateToWishListFromSidebar() {
    await this.clickElement(this.selectors.wishListLink);
  }

  /**
   * Navegar a "Order History" desde el sidebar
   */
  async navigateToOrderHistoryFromSidebar() {
    await this.clickElement(this.selectors.orderHistoryLink);
  }

  /**
   * Navegar a "Downloads" desde el sidebar
   */
  async navigateToDownloadsFromSidebar() {
    await this.clickElement(this.selectors.downloadsLink);
  }

  /**
   * Navegar a "Recurring payments" desde el sidebar
   */
  async navigateToRecurringPaymentsFromSidebar() {
    await this.clickElement(this.selectors.recurringPaymentsLink);
  }

  /**
   * Navegar a "Reward Points" desde el sidebar
   */
  async navigateToRewardPointsFromSidebar() {
    await this.clickElement(this.selectors.rewardPointsLink);
  }

  /**
   * Navegar a "Returns" desde el sidebar
   */
  async navigateToReturnsFromSidebar() {
    await this.clickElement(this.selectors.returnsLink);
  }

  /**
   * Navegar a "Transactions" desde el sidebar
   */
  async navigateToTransactionsFromSidebar() {
    await this.clickElement(this.selectors.transactionsLink);
  }

  /**
   * Navegar a "Newsletter" desde el sidebar
   */
  async navigateToNewsletterFromSidebar() {
    await this.clickElement(this.selectors.newsletterSidebarLink);
  }

  /**
   * Hacer logout desde el sidebar
   */
  async logoutFromSidebar() {
    await this.clickElement(this.selectors.logoutLink);
  }

  /**
   * Verificar que el título de la página sea correcto
   * @returns {Promise<boolean>} True si el título es correcto
   */
  async isPageTitleCorrect() {
    const title = await this.getText(this.selectors.pageTitle);
    return title.includes('Account') || title.includes('Success') || title.includes('Created');
  }

  /**
   * Verificar que todos los mensajes de éxito estén presentes
   * @returns {Promise<boolean>} True si todos los mensajes están presentes
   */
  async areAllSuccessMessagesPresent() {
    const successMessage = await this.isSuccessMessagePresent();
    const memberPrivilegesMessage = await this.isMemberPrivilegesMessagePresent();
    const questionsMessage = await this.isQuestionsMessagePresent();
    const confirmationMessage = await this.isConfirmationMessagePresent();
    
    return successMessage && memberPrivilegesMessage && questionsMessage && confirmationMessage;
  }

  /**
   * Verificar que el sidebar de cuenta esté visible
   * @returns {Promise<boolean>} True si el sidebar es visible
   */
  async isAccountSidebarVisible() {
    return await this.isElementVisible(this.selectors.accountSidebar);
  }

  /**
   * Verificar que el botón Continue esté visible y habilitado
   * @returns {Promise<boolean>} True si el botón está visible y habilitado
   */
  async isContinueButtonEnabled() {
    const isVisible = await this.isElementVisible(this.selectors.continueButton);
    const isEnabled = await this.isElementEnabled(this.selectors.continueButton);
    return isVisible && isEnabled;
  }

  /**
   * Obtener el título de la página
   * @returns {Promise<string>} Título de la página
   */
  async getPageTitle() {
    return await this.page.title();
  }

  /**
   * Verificar que la URL sea correcta para la página de éxito
   * @returns {Promise<boolean>} True si la URL es correcta
   */
  async isUrlCorrect() {
    const currentUrl = this.page.url();
    return currentUrl.includes('account/success');
  }

  /**
   * Verificar que no haya mensajes de error
   * @returns {Promise<boolean>} True si no hay mensajes de error
   */
  async hasNoErrorMessages() {
    const errorSelectors = [
      '.text-danger',
      '.alert-danger',
      '.alert-error',
      '.error'
    ];
    
    for (const selector of errorSelectors) {
      const elements = await this.page.$$(selector);
      if (elements.length > 0) {
        return false;
      }
    }
    
    return true;
  }

  /**
   * Completar el flujo de éxito - hacer clic en Continue
   */
  async completeSuccessFlow() {
    await this.clickContinueButton();
  }

  /**
   * Verificar que la página contenga texto específico
   * @param {string} text - Texto a verificar
   * @returns {Promise<boolean>} True si el texto está presente
   */
  async pageContainsText(text) {
    const pageContent = await this.page.textContent('body');
    return pageContent.includes(text);
  }

  /**
   * Obtener todos los enlaces del sidebar de cuenta
   * @returns {Promise<Array<string>>} Array de URLs de los enlaces
   */
  async getAccountSidebarLinks() {
    const links = [];
    const linkSelectors = [
      this.selectors.myAccountSidebarLink,
      this.selectors.editAccountLink,
      this.selectors.passwordLink,
      this.selectors.addressBookLink,
      this.selectors.wishListLink,
      this.selectors.orderHistoryLink,
      this.selectors.downloadsLink,
      this.selectors.recurringPaymentsLink,
      this.selectors.rewardPointsLink,
      this.selectors.returnsLink,
      this.selectors.transactionsLink,
      this.selectors.newsletterSidebarLink,
      this.selectors.logoutLink
    ];

    for (const selector of linkSelectors) {
      const element = await this.page.$(selector);
      if (element) {
        const href = await element.getAttribute('href');
        if (href) {
          links.push(href);
        }
      }
    }

    return links;
  }
}

module.exports = OpenCartSuccessPage;
