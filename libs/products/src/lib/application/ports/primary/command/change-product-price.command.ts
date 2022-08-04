export class ChangeProductPriceCommand {
  constructor(public readonly id: number, public readonly price: number) {}
}
