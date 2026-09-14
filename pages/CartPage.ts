
import { Page } from '@playwright/test';

// Clase que representa el carrito de compras.
// Aquí colocamos todas las acciones relacionadas con el carrito.
export class CartPage {

  // Referencia a la página de Playwright.
  readonly page: Page;

  // Constructor de la clase.
  constructor(page: Page) {
    this.page = page;
  }

  // Abre el carrito de compras.
  async openCart() {

    // Hace clic en el botón que muestra el carrito.
    await this.page
      .getByTestId('cart-toggle')
      .click();
  }

  // Cierra el carrito haciendo clic sobre el fondo
  // (overlay) que aparece detrás del carrito.
  async closeCart() {

    // El cart-overlay es la zona exterior del carrito.
    await this.page
      .getByTestId('cart-overlay')
      .click();
  }

  // Elimina todos los productos que hayan quedado
  // en el carrito de ejecuciones anteriores.
  async clearCart() {

    // Busca todos los botones cuyo testId comienza
    // con "remove-from-cart-".
    const removeButtons =
      this.page.getByTestId(/remove-from-cart-/);

    // Mientras existan productos para eliminar...
    while (await removeButtons.count() > 0) {

      // Hace clic en el primer botón "Quitar".
      // Después vuelve a comprobar si quedan más.
      await removeButtons.first().click();
    }
  }

  // Obtiene el total actual del carrito.
  // 
  async getCartTotal(): Promise<string> {

    // innerText() obtiene el texto visible del total.
    return await this.page
      .getByTestId('cart-total')
      .innerText();
  }

  // Finaliza la compra.
  async checkout() {

    // Hace clic en "Finalizar compra".
    await this.page
      .getByTestId('checkout-button')
      .click();
  }

  // Elemento que muestra la confirmación del pedido.
  // Lo dejamos como getter para poder utilizarlo
  // directamente desde el archivo de prueba.
  get orderConfirmation() {

    return this.page
      .getByTestId('order-confirmation');
  }
}