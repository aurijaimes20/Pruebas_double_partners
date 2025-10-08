const BasePage = require('./BasePage');

/**
 * HomePage - Página principal de la aplicación
 * Hereda de BasePage y contiene métodos específicos para la página de inicio
 */
class HomePage extends BasePage {
  constructor(page) {
    super(page);
    
    // Selectores de elementos específicos de la página de inicio
    this.selectors = {
      // Navegación
      logo: '[data-testid="logo"]',
      navigationMenu: '[data-testid="navigation-menu"]',
      homeLink: '[data-testid="home-link"]',
      productsLink: '[data-testid="products-link"]',
      aboutLink: '[data-testid="about-link"]',
      contactLink: '[data-testid="contact-link"]',
      
      // Contenido principal
      heroSection: '[data-testid="hero-section"]',
      heroTitle: '[data-testid="hero-title"]',
      heroSubtitle: '[data-testid="hero-subtitle"]',
      heroButton: '[data-testid="hero-button"]',
      
      // Secciones
      featuresSection: '[data-testid="features-section"]',
      testimonialsSection: '[data-testid="testimonials-section"]',
      footer: '[data-testid="footer"]',
      
      // Formularios
      searchInput: '[data-testid="search-input"]',
      searchButton: '[data-testid="search-button"]',
      newsletterInput: '[data-testid="newsletter-input"]',
      newsletterButton: '[data-testid="newsletter-button"]',
      
      // Botones de acción
      ctaButton: '[data-testid="cta-button"]',
      learnMoreButton: '[data-testid="learn-more-button"]'
    };
  }

  /**
   * Verificar que la página de inicio se haya cargado correctamente
   */
  async verifyPageLoaded() {
    await this.waitForElement(this.selectors.heroSection);
    await this.waitForElement(this.selectors.navigationMenu);
  }

  /**
   * Obtener el título del hero
   * @returns {Promise<string>} Título del hero
   */
  async getHeroTitle() {
    return await this.getText(this.selectors.heroTitle);
  }

  /**
   * Obtener el subtítulo del hero
   * @returns {Promise<string>} Subtítulo del hero
   */
  async getHeroSubtitle() {
    return await this.getText(this.selectors.heroSubtitle);
  }

  /**
   * Hacer clic en el botón del hero
   */
  async clickHeroButton() {
    await this.clickElement(this.selectors.heroButton);
  }

  /**
   * Navegar a la sección de productos
   */
  async navigateToProducts() {
    await this.clickElement(this.selectors.productsLink);
  }

  /**
   * Navegar a la sección "Acerca de"
   */
  async navigateToAbout() {
    await this.clickElement(this.selectors.aboutLink);
  }

  /**
   * Navegar a la sección de contacto
   */
  async navigateToContact() {
    await this.clickElement(this.selectors.contactLink);
  }

  /**
   * Realizar una búsqueda
   * @param {string} searchTerm - Término de búsqueda
   */
  async performSearch(searchTerm) {
    await this.typeText(this.selectors.searchInput, searchTerm);
    await this.clickElement(this.selectors.searchButton);
  }

  /**
   * Suscribirse al newsletter
   * @param {string} email - Email para suscripción
   */
  async subscribeToNewsletter(email) {
    await this.typeText(this.selectors.newsletterInput, email);
    await this.clickElement(this.selectors.newsletterButton);
  }

  /**
   * Hacer clic en el botón CTA principal
   */
  async clickMainCTA() {
    await this.clickElement(this.selectors.ctaButton);
  }

  /**
   * Hacer clic en "Aprender más"
   */
  async clickLearnMore() {
    await this.clickElement(this.selectors.learnMoreButton);
  }

  /**
   * Verificar que el logo esté visible
   * @returns {Promise<boolean>} True si el logo es visible
   */
  async isLogoVisible() {
    return await this.isElementVisible(this.selectors.logo);
  }

  /**
   * Verificar que la sección de características esté visible
   * @returns {Promise<boolean>} True si la sección es visible
   */
  async isFeaturesSectionVisible() {
    return await this.isElementVisible(this.selectors.featuresSection);
  }

  /**
   * Verificar que la sección de testimonios esté visible
   * @returns {Promise<boolean>} True si la sección es visible
   */
  async isTestimonialsSectionVisible() {
    return await this.isElementVisible(this.selectors.testimonialsSection);
  }

  /**
   * Hacer scroll hasta la sección de características
   */
  async scrollToFeatures() {
    await this.scrollToElement(this.selectors.featuresSection);
  }

  /**
   * Hacer scroll hasta la sección de testimonios
   */
  async scrollToTestimonials() {
    await this.scrollToElement(this.selectors.testimonialsSection);
  }

  /**
   * Hacer scroll hasta el footer
   */
  async scrollToFooter() {
    await this.scrollToElement(this.selectors.footer);
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
}

module.exports = HomePage;
