import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { LoadProductsCommandPort } from '../ports/primary/command/load-products.command-port';
import { GetsCurrentProductListQueryPort } from '../ports/primary/query/gets-current-product-list.query-port';
import { RemoveProductCommandPort } from '../ports/primary/command/remove-product.command-port';
import { CreateProductCommandPort } from '../ports/primary/command/create-product.command-port';
import { SelectProductCommandPort } from '../ports/primary/command/select-product.command-port';
import { ChangeProductPriceCommandPort } from '../ports/primary/command/change-product-price.command-port';
import { GetsEditProductQueryPort } from '../ports/primary/query/gets-edit-product.query-port';
import { UpdateProductCommandPort } from '../ports/primary/command/update-product.command-port';
import {
  GETS_ALL_PRODUCT_DTO,
  GetsAllProductDtoPort,
} from '../ports/secondary/dto/gets-all-product.dto-port';
import {
  SETS_STATE_PRODUCT_CONTEXT,
  SetsStateProductContextPort,
} from '../ports/secondary/context/sets-state-product.context-port';
import {
  SELECTS_PRODUCT_CONTEXT,
  SelectsProductContextPort,
} from '../ports/secondary/context/selects-product.context-port';
import {
  REMOVES_PRODUCT_DTO,
  RemovesProductDtoPort,
} from '../ports/secondary/dto/removes-product.dto-port';
import {
  ADDS_PRODUCT_DTO,
  AddsProductDtoPort,
} from '../ports/secondary/dto/adds-product.dto-port';
import {
  SETS_PRODUCT_DTO,
  SetsProductDtoPort,
} from '../ports/secondary/dto/sets-product.dto-port';
import { LoadProductsCommand } from '../ports/primary/command/load-products.command';
import { ProductListQuery } from '../ports/primary/query/product-list.query';
import { RemoveProductCommand } from '../ports/primary/command/remove-product.command';
import { ProductContext } from '../ports/secondary/context/product.context';
import { CreateProductCommand } from '../ports/primary/command/create-product.command';
import { SelectProductCommand } from '../ports/primary/command/select-product.command';
import { ChangeProductPriceCommand } from '../ports/primary/command/change-product-price.command';
import { ProductDTO } from '../ports/secondary/dto/product.dto';
import { EditProductQuery } from '../ports/primary/query/edit-product.query';
import { UpdateProductCommand } from '../ports/primary/command/update-product.command';
import { mapFromProductContext } from '../state/product-list-query.mapper';

const makeRandomId = (): number =>
  parseInt(`${new Date().getTime()}${Math.ceil(Math.random() * 1000)}`);

@Injectable()
export class ProductsState
  implements
    LoadProductsCommandPort,
    GetsCurrentProductListQueryPort,
    RemoveProductCommandPort,
    CreateProductCommandPort,
    SelectProductCommandPort,
    ChangeProductPriceCommandPort,
    GetsEditProductQueryPort,
    UpdateProductCommandPort
{
  constructor(
    @Inject(GETS_ALL_PRODUCT_DTO)
    private _getsAllProductDto: GetsAllProductDtoPort,
    @Inject(SETS_STATE_PRODUCT_CONTEXT)
    private _setsStateProductContext: SetsStateProductContextPort,
    @Inject(SELECTS_PRODUCT_CONTEXT)
    private _selectsProductContext: SelectsProductContextPort,
    @Inject(REMOVES_PRODUCT_DTO)
    private _removesProductDto: RemovesProductDtoPort,
    @Inject(ADDS_PRODUCT_DTO) private _addsProductDto: AddsProductDtoPort,
    @Inject(SETS_PRODUCT_DTO) private _setsProductDto: SetsProductDtoPort
  ) {}

  loadProducts(command: LoadProductsCommand): Observable<void> {
    return this._getsAllProductDto.getAll().pipe(
      switchMap((products) =>
        this._setsStateProductContext.setState({
          all: products,
          selectedProductId: 0,
        })
      )
    );
  }

  getCurrentProductListQuery(): Observable<ProductListQuery> {
    return this._selectsProductContext
      .select()
      .pipe(map((ctx) => mapFromProductContext(ctx)));
  }

  removeProduct(command: RemoveProductCommand): Observable<void> {
    return this._removesProductDto.remove(command.productId).pipe(
      switchMap(() => this._selectsProductContext.select().pipe(take(1))),
      map((context: ProductContext) => {
        return {
          ...context,
          all: context.all.filter(
            (product) => product.id !== command.productId
          ),
        };
      }),
      switchMap((context) => this._setsStateProductContext.setState(context))
    );
  }

  createProduct(command: CreateProductCommand): Observable<void> {
    const productDto = {
      id: makeRandomId(),
      name: command.name,
      price: command.price,
    };
    return this._addsProductDto.add(productDto).pipe(
      switchMap(() => this._selectsProductContext.select()),
      take(1),
      map((context) => {
        return { ...context, all: [...context.all, productDto] };
      }),
      switchMap((context) => this._setsStateProductContext.setState(context))
    );
  }

  selectProduct(command: SelectProductCommand): Observable<void> {
    return this._selectsProductContext.select().pipe(
      take(1),
      map((context) => {
        return {
          all: [...context.all],
          selectedProductId: command.id,
        };
      }),
      tap(console.log),
      switchMap((context) => this._setsStateProductContext.setState(context))
    );
  }

  changeProductPrice(command: ChangeProductPriceCommand): Observable<void> {
    return this._selectsProductContext.select().pipe(
      take(1),
      switchMap((context) => {
        const currentProduct = context.all.find(
          (product) => product.id === command.id
        ) as ProductDTO;
        const newProduct = { ...currentProduct, price: command.price };
        return this._setsProductDto.set(newProduct).pipe(
          map(
            (): ProductContext => ({
              ...context,
              all: context.all.map((product) =>
                product.id === command.id ? newProduct : product
              ),
            })
          )
        );
      }),
      switchMap((context) => this._setsStateProductContext.setState(context))
    );
  }

  getCurrentEditProductQuery(): Observable<EditProductQuery> {
    return this._selectsProductContext
      .select()
      .pipe(
        map(
          (productContext: ProductContext): EditProductQuery =>
            (productContext.all.find(
              (product) => product.id === productContext.selectedProductId
            ) as ProductDTO) || {}
        )
      );
  }

  updateProduct(command: UpdateProductCommand): Observable<void> {
    return this._selectsProductContext.select().pipe(
      take(1),
      switchMap((context) => {
        const currentProduct = context.all.find(
          (product) => product.id === command.id
        ) as ProductDTO;
        const newProduct = {
          ...currentProduct,
          name: command.name,
          price: command.price,
        };
        return this._setsProductDto.set(newProduct).pipe(
          map(
            (): ProductContext => ({
              ...context,
              all: context.all.map((product) =>
                product.id === command.id ? newProduct : product
              ),
            })
          )
        );
      }),
      switchMap((context) => this._setsStateProductContext.setState(context))
    );
  }
}
