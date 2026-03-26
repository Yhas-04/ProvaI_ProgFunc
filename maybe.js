const {
  filtrarPorCategoria,
  filtrarPorValorMinimo,
  totalPorCategoria,
  ordenarPorValor,
} = require('./funcoes');

class Maybe {
  constructor(valor) {
    this.valor = valor;
  }

  static of(valor) {
    return new Maybe(valor);
  }

  isNothing() {
    return (
      this.valor === null ||
      this.valor === undefined ||
      (Array.isArray(this.valor) && this.valor.length === 0)
    );
  }

  chain(fn) {
    return this.isNothing() ? this : fn(this.valor);
  }

  getOrElse(defaultvalor) {
    return this.isNothing() ? defaultvalor : this.valor;
  }

  toString() {
    return this.isNothing()
      ? 'Nothing'
      : `Just(${JSON.stringify(this.valor)})`;
  }
}