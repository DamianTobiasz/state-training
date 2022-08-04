import { NgModule } from '@angular/core';
import { ProductsState } from './products.state';
import { LOAD_PRODUCTS_COMMAND } from '../ports/primary/command/load-products.command-port';
import { GETS_CURRENT_PRODUCT_LIST_QUERY } from '../ports/primary/query/gets-current-product-list.query-port';
import { REMOVE_PRODUCT_COMMAND } from '../ports/primary/command/remove-product.command-port';
import { CREATE_PRODUCT_COMMAND } from '../ports/primary/command/create-product.command-port';
import { SELECT_PRODUCT_COMMAND } from '../ports/primary/command/select-product.command-port';
import { CHANGE_PRODUCT_PRICE_COMMAND } from '../ports/primary/command/change-product-price.command-port';
import { GETS_EDIT_PRODUCT_QUERY } from '../ports/primary/query/gets-edit-product.query-port';
import { UPDATE_PRODUCT_COMMAND } from '../ports/primary/command/update-product.command-port';

@NgModule({
  imports: [],
  declarations: [],
  providers: [
    ProductsState,
    { provide: LOAD_PRODUCTS_COMMAND, useExisting: ProductsState },
    { provide: GETS_CURRENT_PRODUCT_LIST_QUERY, useExisting: ProductsState },
    { provide: REMOVE_PRODUCT_COMMAND, useExisting: ProductsState },
    { provide: CREATE_PRODUCT_COMMAND, useExisting: ProductsState },
    { provide: SELECT_PRODUCT_COMMAND, useExisting: ProductsState },
    { provide: CHANGE_PRODUCT_PRICE_COMMAND, useExisting: ProductsState },
    { provide: GETS_EDIT_PRODUCT_QUERY, useExisting: ProductsState },
    { provide: UPDATE_PRODUCT_COMMAND, useExisting: ProductsState },
  ],
  exports: [],
})
export class ProductsStateModule {}
