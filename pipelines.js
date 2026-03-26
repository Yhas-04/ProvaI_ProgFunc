import fs from 'fs';

const vendas = JSON.parse(
  fs.readFileSync('./vendas.json', 'utf-8')
);

import {
  filtrarPorValorMinimo,
  filtrarPorCategoria,
  filtrarPorVendedor,
  resumir,
  totalPorCategoria,
  ordenarPorValor,
  pegarTopN
} from './analise.js';

const pipe = (...fns) => (valor) =>
  fns.reduce((resultado, fn) => fn(resultado), valor);

const filtrarPorCategorias = (categorias) => (lista) =>
  lista.filter((venda) => categorias.includes(venda.categoria));

const topProdutos = (categorias) => pipe(
  filtrarPorValorMinimo(500),
  filtrarPorCategorias(categorias),
  ordenarPorValor,
  pegarTopN(5),
  totalPorCategoria
);

const vendasEmFotografiaEAudio = pipe(
  filtrarPorVendedor('Ana'),
  filtrarPorCategorias(['fotografia', 'áudio']),
  ordenarPorValor,
  resumir
);

export { pipe, filtrarPorCategorias, topProdutos, vendasEmFotografiaEAudio };

  const resultado1 = pipe(x => x+1)(10);
  console.log("\npipe usando apenas reduce:", resultado1)
  console.log("_____________________________________")

  const resultado2 = filtrarPorCategorias(["móveis", "fotografia"])(vendas)
  console.log("novo estado\n",resultado2)
  console.log("\n_____________________________________")

  const resultado3 = topProdutos("móveis")(vendas)
  console.log("\nPipeline 1: escolham uma análise\n", resultado3)
  console.log("testee")
  console.log("_____________________________________")

  const resultado4 = vendasEmFotografiaEAudio(vendas)
  console.log("\nPipeline 2: uma análise diferente, que use pelo menos um estágio novo\n", resultado4)

    console.log("_________________TESTES____________________")
  console.log('\npipe');

  const f = x => x + 1
  const g = x => x * 3
  const h = x => x - 2

  console.assert(pipe(f, g, h)(4) === h(g(f(4))),                                     'pipe(f,g,h)(valor) equivale a h(g(f(valor)))')
  console.assert(pipe(x => x * 2)(5) === 10,                                          'pipe: uma função')
  console.assert(pipe(x => x + 1, x => x * 3)(4) === 15,                             'pipe: duas funções encadeadas')
  console.assert(pipe(filtrarPorValorMinimo(1000), pegarTopN(2))(vendas).length === 2, 'pipe: com funções do projeto')
  const antes = vendas.length
  pipe(filtrarPorValorMinimo(100), ordenarPorValor)(vendas)
  console.assert(vendas.length === antes,                                              'pipe: não muta o array original')

  console.log('\nPipeline 1 — topProdutos')
  const r1 = topProdutos(vendas)
  console.assert(typeof r1 === 'object' && r1 !== null,               'retorna um objeto')
  console.assert(!Object.keys(r1).includes('cabos'),                  'exclui categoria "cabos"')

  console.log('\nPipeline 2 — vendasEmFotografiaEAudio')
  const r2 = vendasEmFotografiaEAudio(vendas)
  console.assert(Array.isArray(r2),                                                'retorna array')
  console.assert(r2.every(v => ['fotografia', 'áudio'].includes(v.categoria)),     'só fotografia e áudio')
  console.assert(r2.length === 2,                                                  'deveria ter 3 vendas nessas categorias\n\n')