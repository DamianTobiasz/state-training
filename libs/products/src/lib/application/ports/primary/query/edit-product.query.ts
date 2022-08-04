export class EditProductQuery {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly price: number
  ) {}
}
