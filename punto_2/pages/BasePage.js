/**
 * BasePage - Clase base para todas las páginas
 * Contiene métodos comunes que pueden ser utilizados por todas las páginas
 */
class BasePage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navegar a una URL específica
   * @param {string} url - URL a la cual navegar
   */
  async navigateTo(url) {
    await this.page.goto(url);
    await this.waitForPageLoad();
  }

  /**
   * Esperar a que la página termine de cargar
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Tomar una captura de pantalla
   * @param {string} name - Nombre del archivo de captura
   */
  async takeScreenshot(name) {
    await this.page.screenshot({ 
      path: `screenshots/${name}.png`,
      fullPage: true 
    });
  }

  /**
   * Esperar a que un elemento sea visible
   * @param {string} selector - Selector del elemento
   * @param {number} timeout - Tiempo de espera en milisegundos
   */
  async waitForElement(selector, timeout = 10000) {
    await this.page.waitForSelector(selector, { 
      state: 'visible', 
      timeout 
    });
  }

  /**
   * Hacer clic en un elemento
   * @param {string} selector - Selector del elemento
   */
  async clickElement(selector) {
    await this.page.click(selector);
  }

  /**
   * Escribir texto en un campo
   * @param {string} selector - Selector del campo
   * @param {string} text - Texto a escribir
   */
  async typeText(selector, text) {
    await this.page.fill(selector, text);
  }

  /**
   * Obtener texto de un elemento
   * @param {string} selector - Selector del elemento
   * @returns {Promise<string>} Texto del elemento
   */
  async getText(selector) {
    return await this.page.textContent(selector);
  }

  /**
   * Verificar si un elemento es visible
   * @param {string} selector - Selector del elemento
   * @returns {Promise<boolean>} True si es visible
   */
  async isElementVisible(selector) {
    try {
      await this.page.waitForSelector(selector, { 
        state: 'visible', 
        timeout: 5000 
      });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Obtener el título de la página
   * @returns {Promise<string>} Título de la página
   */
  async getPageTitle() {
    return await this.page.title();
  }

  /**
   * Obtener la URL actual
   * @returns {Promise<string>} URL actual
   */
  async getCurrentUrl() {
    return this.page.url();
  }

  /**
   * Esperar a que aparezca un texto específico
   * @param {string} text - Texto a esperar
   * @param {number} timeout - Tiempo de espera en milisegundos
   */
  async waitForText(text, timeout = 10000) {
    await this.page.waitForFunction(
      (text) => document.body.innerText.includes(text),
      text,
      { timeout }
    );
  }

  /**
   * Ejecutar JavaScript en la página
   * @param {string} script - Script JavaScript a ejecutar
   * @returns {Promise<any>} Resultado del script
   */
  async executeScript(script) {
    return await this.page.evaluate(script);
  }

  /**
   * Hacer scroll hasta un elemento
   * @param {string} selector - Selector del elemento
   */
  async scrollToElement(selector) {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

  /**
   * Presionar una tecla
   * @param {string} key - Tecla a presionar
   */
  async pressKey(key) {
    await this.page.keyboard.press(key);
  }

  /**
   * Limpiar un campo de texto
   * @param {string} selector - Selector del campo
   */
  async clearField(selector) {
    await this.page.fill(selector, '');
  }

  /**
   * Verificar que la URL contenga un texto específico
   * @param {string} text - Texto a verificar en la URL
   * @returns {Promise<boolean>} True si la URL contiene el texto
   */
  async urlContains(text) {
    const currentUrl = await this.getCurrentUrl();
    return currentUrl.includes(text);
  }
}

module.exports = BasePage;
