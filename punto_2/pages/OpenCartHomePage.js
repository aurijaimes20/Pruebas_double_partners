const BasePage = require('./BasePage');

/**
 * OpenCartHomePage - Página principal de OpenCart
 * Hereda de BasePage y contiene métodos específicos para la página de inicio de OpenCart
 */
class OpenCartHomePage extends BasePage {
  constructor(page) {
    super(page);
    
    // Selectores específicos de OpenCart
    this.selectors = {
      // Navegación principal
      logo: 'h1 a',
      searchInput: 'input[name="search"]',
      searchButton: 'button[type="button"]',
      cartButton: 'button[title="Shopping Cart"]',
      
      // Menú de navegación
      myAccountDropdown: 'a[title="My Account"]',
      myAccountMenu: '.dropdown-menu',
      registerLink: 'a[href*="account/register"]',
      loginLink: 'a[href*="account/login"]',
      
      // Categorías de productos
      desktopsLink: 'a[href*="product/category&path=20"]',
      laptopsLink: 'a[href*="product/category&path=18"]',
      componentsLink: 'a[href*="product/category&path=25"]',
      tabletsLink: 'a[href*="product/category&path=57"]',
      softwareLink: 'a[href*="product/category&path=17"]',
      phonesLink: 'a[href*="product/category&path=24"]',
      camerasLink: 'a[href*="product/category&path=33"]',
      mp3PlayersLink: 'a[href*="product/category&path=34"]',
      
      // Productos destacados
      featuredSection: 'h3:has-text("Featured")',
      productLinks: '.product-layout .caption h4 a',
      addToCartButtons: 'button[onclick*="cart.add"]',
      
      // Footer
      footer: '#footer',
      informationLinks: '#footer .col-sm-3:first-child a',
      customerServiceLinks: '#footer .col-sm-3:nth-child(2) a',
      extrasLinks: '#footer .col-sm-3:nth-child(3) a',
      myAccountLinks: '#footer .col-sm-3:last-child a'
    };
  }

  /**
   * Navegar a la página principal de OpenCart
   */
  async navigate() {
    await this.page.goto('https://opencart.abstracta.us/');
    await this.waitForPageLoad();
  }

  /**
   * Verificar que la página de inicio se haya cargado correctamente
   */
  async verifyPageLoaded() {
    // Esperar a que la página cargue completamente
    await this.page.waitForLoadState('networkidle');
    
    // Verificar elementos básicos
    await this.page.waitForSelector('h1', { timeout: 10000 });
    await this.page.waitForSelector('a[title="My Account"]', { timeout: 10000 });
  }

  /**
   * Hacer clic en el dropdown de "My Account"
   */
  async clickMyAccountDropdown() {
    await this.clickElement(this.selectors.myAccountDropdown);
    await this.waitForElement(this.selectors.myAccountMenu);
  }

  /**
   * Navegar a la página de registro
   */
  async navigateToRegister() {
    // Hacer clic en My Account para abrir el dropdown
    await this.page.click('a[title="My Account"]');
    
    // Esperar a que aparezca el menú dropdown
    await this.page.waitForSelector('a[href*="account/register"]', { timeout: 5000 });
    
    // Hacer clic en Register
    await this.page.click('a[href*="account/register"]');
  }

  /**
   * Navegar a la página de login
   */
  async navigateToLogin() {
    // Hacer clic en My Account para abrir el dropdown
    await this.page.click('a[title="My Account"]');
    
    // Esperar a que aparezca el menú dropdown
    await this.page.waitForSelector('a[href*="account/login"]', { timeout: 5000 });
    
    // Hacer clic en Login
    await this.page.click('a[href*="account/login"]');
  }

  /**
   * Realizar una búsqueda de productos
   * @param {string} searchTerm - Término de búsqueda
   */
  async searchProduct(searchTerm) {
    await this.typeText(this.selectors.searchInput, searchTerm);
    await this.clickElement(this.selectors.searchButton);
  }

  /**
   * Navegar a una categoría específica
   * @param {string} category - Categoría a navegar
   */
  async navigateToCategory(category) {
    const categorySelectors = {
      'desktops': this.selectors.desktopsLink,
      'laptops': this.selectors.laptopsLink,
      'components': this.selectors.componentsLink,
      'tablets': this.selectors.tabletsLink,
      'software': this.selectors.softwareLink,
      'phones': this.selectors.phonesLink,
      'cameras': this.selectors.camerasLink,
      'mp3players': this.selectors.mp3PlayersLink
    };

    if (categorySelectors[category.toLowerCase()]) {
      await this.clickElement(categorySelectors[category.toLowerCase()]);
    } else {
      throw new Error(`Categoría no válida: ${category}`);
    }
  }

  /**
   * Verificar que el logo esté visible
   * @returns {Promise<boolean>} True si el logo es visible
   */
  async isLogoVisible() {
    return await this.isElementVisible(this.selectors.logo);
  }

  /**
   * Verificar que la sección de productos destacados esté visible
   * @returns {Promise<boolean>} True si la sección es visible
   */
  async isFeaturedSectionVisible() {
    return await this.isElementVisible(this.selectors.featuredSection);
  }

  /**
   * Obtener el título de la página
   * @returns {Promise<string>} Título de la página
   */
  async getPageTitle() {
    return await this.page.title();
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
   * Hacer clic en el carrito de compras
   */
  async clickCartButton() {
    await this.clickElement(this.selectors.cartButton);
  }

  /**
   * Verificar que el carrito esté vacío
   * @returns {Promise<boolean>} True si el carrito está vacío
   */
  async isCartEmpty() {
    const cartText = await this.getText(this.selectors.cartButton);
    return cartText.includes('0 item(s)');
  }

  /**
   * Obtener el número de items en el carrito
   * @returns {Promise<number>} Número de items en el carrito
   */
  async getCartItemCount() {
    const cartText = await this.getText(this.selectors.cartButton);
    const match = cartText.match(/(\d+) item\(s\)/);
    return match ? parseInt(match[1]) : 0;
  }
}

module.exports = OpenCartHomePage;
