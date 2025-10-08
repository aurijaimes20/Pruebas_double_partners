const BasePage = require('./BasePage');

/**
 * ProductPage - Página de producto individual
 * Hereda de BasePage y contiene métodos específicos para la página de producto
 */
class ProductPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Selectores de elementos específicos de la página de producto
    this.selectors = {
      // Información del producto
      productTitle: '[data-testid="product-title"]',
      productPrice: '[data-testid="product-price"]',
      productDescription: '[data-testid="product-description"]',
      productImage: '[data-testid="product-image"]',
      productRating: '[data-testid="product-rating"]',
      productReviews: '[data-testid="product-reviews"]',
      
      // Botones de acción
      addToCartButton: '[data-testid="add-to-cart-button"]',
      buyNowButton: '[data-testid="buy-now-button"]',
      wishlistButton: '[data-testid="wishlist-button"]',
      shareButton: '[data-testid="share-button"]',
      
      // Opciones del producto
      sizeSelector: '[data-testid="size-selector"]',
      colorSelector: '[data-testid="color-selector"]',
      quantityInput: '[data-testid="quantity-input"]',
      quantityIncrease: '[data-testid="quantity-increase"]',
      quantityDecrease: '[data-testid="quantity-decrease"]',
      
      // Navegación
      breadcrumb: '[data-testid="breadcrumb"]',
      backButton: '[data-testid="back-button"]',
      nextProductButton: '[data-testid="next-product-button"]',
      previousProductButton: '[data-testid="previous-product-button"]',
      
      // Información adicional
      productDetails: '[data-testid="product-details"]',
      specifications: '[data-testid="specifications"]',
      shippingInfo: '[data-testid="shipping-info"]',
      returnPolicy: '[data-testid="return-policy"]',
      
      // Productos relacionados
      relatedProducts: '[data-testid="related-products"]',
      relatedProductItem: '[data-testid="related-product-item"]',
      
      // Reviews y ratings
      reviewSection: '[data-testid="review-section"]',
      writeReviewButton: '[data-testid="write-review-button"]',
      reviewForm: '[data-testid="review-form"]',
      
      // Notificaciones
      successMessage: '[data-testid="success-message"]',
      errorMessage: '[data-testid="error-message"]',
      loadingSpinner: '[data-testid="loading-spinner"]'
    };
  }

  /**
   * Verificar que la página de producto se haya cargado correctamente
   */
  async verifyPageLoaded() {
    await this.waitForElement(this.selectors.productTitle);
    await this.waitForElement(this.selectors.productPrice);
    await this.waitForElement(this.selectors.addToCartButton);
  }

  /**
   * Obtener el título del producto
   * @returns {Promise<string>} Título del producto
   */
  async getProductTitle() {
    return await this.getText(this.selectors.productTitle);
  }

  /**
   * Obtener el precio del producto
   * @returns {Promise<string>} Precio del producto
   */
  async getProductPrice() {
    return await this.getText(this.selectors.productPrice);
  }

  /**
   * Obtener la descripción del producto
   * @returns {Promise<string>} Descripción del producto
   */
  async getProductDescription() {
    return await this.getText(this.selectors.productDescription);
  }

  /**
   * Obtener la calificación del producto
   * @returns {Promise<string>} Calificación del producto
   */
  async getProductRating() {
    return await this.getText(this.selectors.productRating);
  }

  /**
   * Verificar que la imagen del producto esté visible
   * @returns {Promise<boolean>} True si la imagen es visible
   */
  async isProductImageVisible() {
    return await this.isElementVisible(this.selectors.productImage);
  }

  /**
   * Agregar producto al carrito
   */
  async addToCart() {
    await this.clickElement(this.selectors.addToCartButton);
    await this.waitForElement(this.selectors.successMessage);
  }

  /**
   * Comprar ahora
   */
  async buyNow() {
    await this.clickElement(this.selectors.buyNowButton);
  }

  /**
   * Agregar a lista de deseos
   */
  async addToWishlist() {
    await this.clickElement(this.selectors.wishlistButton);
  }

  /**
   * Compartir producto
   */
  async shareProduct() {
    await this.clickElement(this.selectors.shareButton);
  }

  /**
   * Seleccionar tamaño del producto
   * @param {string} size - Tamaño a seleccionar
   */
  async selectSize(size) {
    await this.page.selectOption(this.selectors.sizeSelector, size);
  }

  /**
   * Seleccionar color del producto
   * @param {string} color - Color a seleccionar
   */
  async selectColor(color) {
    await this.page.selectOption(this.selectors.colorSelector, color);
  }

  /**
   * Establecer cantidad del producto
   * @param {number} quantity - Cantidad deseada
   */
  async setQuantity(quantity) {
    await this.clearField(this.selectors.quantityInput);
    await this.typeText(this.selectors.quantityInput, quantity.toString());
  }

  /**
   * Aumentar cantidad
   */
  async increaseQuantity() {
    await this.clickElement(this.selectors.quantityIncrease);
  }

  /**
   * Disminuir cantidad
   */
  async decreaseQuantity() {
    await this.clickElement(this.selectors.quantityDecrease);
  }

  /**
   * Navegar al producto anterior
   */
  async goToPreviousProduct() {
    await this.clickElement(this.selectors.previousProductButton);
  }

  /**
   * Navegar al siguiente producto
   */
  async goToNextProduct() {
    await this.clickElement(this.selectors.nextProductButton);
  }

  /**
   * Volver a la página anterior
   */
  async goBack() {
    await this.clickElement(this.selectors.backButton);
  }

  /**
   * Hacer scroll hasta la sección de detalles
   */
  async scrollToDetails() {
    await this.scrollToElement(this.selectors.productDetails);
  }

  /**
   * Hacer scroll hasta la sección de especificaciones
   */
  async scrollToSpecifications() {
    await this.scrollToElement(this.selectors.specifications);
  }

  /**
   * Hacer scroll hasta la sección de reviews
   */
  async scrollToReviews() {
    await this.scrollToElement(this.selectors.reviewSection);
  }

  /**
   * Hacer scroll hasta productos relacionados
   */
  async scrollToRelatedProducts() {
    await this.scrollToElement(this.selectors.relatedProducts);
  }

  /**
   * Escribir una reseña
   * @param {Object} review - Objeto con los datos de la reseña
   * @param {number} review.rating - Calificación (1-5)
   * @param {string} review.title - Título de la reseña
   * @param {string} review.comment - Comentario de la reseña
   */
  async writeReview(review) {
    await this.clickElement(this.selectors.writeReviewButton);
    await this.waitForElement(this.selectors.reviewForm);
    
    // Implementar llenado del formulario de reseña
    // Esto dependerá de la estructura específica del formulario
  }

  /**
   * Verificar que el producto se agregó al carrito
   * @returns {Promise<boolean>} True si se muestra mensaje de éxito
   */
  async isProductAddedToCart() {
    return await this.isElementVisible(this.selectors.successMessage);
  }

  /**
   * Verificar que hay productos relacionados
   * @returns {Promise<boolean>} True si hay productos relacionados
   */
  async hasRelatedProducts() {
    return await this.isElementVisible(this.selectors.relatedProducts);
  }

  /**
   * Obtener información de envío
   * @returns {Promise<string>} Información de envío
   */
  async getShippingInfo() {
    return await this.getText(this.selectors.shippingInfo);
  }

  /**
   * Obtener política de devoluciones
   * @returns {Promise<string>} Política de devoluciones
   */
  async getReturnPolicy() {
    return await this.getText(this.selectors.returnPolicy);
  }

  /**
   * Verificar que la página contenga información específica del producto
   * @param {string} productInfo - Información a verificar
   * @returns {Promise<boolean>} True si la información está presente
   */
  async containsProductInfo(productInfo) {
    const pageContent = await this.page.textContent('body');
    return pageContent.includes(productInfo);
  }
}

module.exports = ProductPage;
