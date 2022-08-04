export class ProductListQuery {
  constructor(public readonly items: { id: number; text: string }[]) {}
}
