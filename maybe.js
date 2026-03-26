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

const safePipe1 = (...fns) => (valor) =>
  fns.reduce(
    (maybe, fn) => maybe.chain(v => Maybe.of(fn(v))),
    Maybe.of(valor)
  );


const safePipe2 = (categoria, valorMinimo) =>
  safePipe1(
    filtrarPorCategoria(categoria),
    filtrarPorValorMinimo(valorMinimo),
    totalPorCategoria
  );


if (require.main === module) {
  const vendas = require('./vendas.json')

  console.log('\ncategoria que existe')
  const r1 = safePipe2('móveis', 500)(vendas)
  console.log('resultado:', r1.toString())
  console.log('valor:', r1.getOrElse({}))

  console.log('\ncategoria que não existe')
  const r2 = safePipe2('cabos', 500)(vendas)
  console.log('resultado:', r2.toString())
  console.log('valor:', r2.getOrElse({}))
}