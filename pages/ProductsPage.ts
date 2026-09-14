import { Page } from '@playwright/test';

// Clase que representa la página/listado de productos.
// Aquí colocamos las acciones relacionadas con los productos.
export class ProductsPage {

  // Referencia a la página de Playwright.
  readonly page: Page;

  // Constructor de la clase.
  constructor(page: Page) {
    this.page = page;
  }

  // Método para agregar un producto al carrito.
  // Recibe el ID del producto que queremos agregar.
  async addProduct(productId: number) {

    // Busca el botón "Agregar al carrito"
    // utilizando el ID del producto.
    await this.page
      .getByTestId(`add-to-cart-${productId}`)
      .click();
  }

  // Método para obtener el precio de un producto.
  // Devuelve el precio como texto, por ejemplo "$1299.00".
  async getProductPrice(productId: number): Promise<string> {

    // Busca el producto por su ID.
    // Dentro del producto busca el elemento que contiene el precio.
    // innerText() obtiene el texto visible del precio.
    return await this.page
      .getByTestId(`product-${productId}`)
      .getByTestId('product-price')
      .innerText();
  }
}
