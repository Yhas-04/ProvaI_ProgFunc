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

                                                  'deveria ter 3 vendas nessas categorias\n\n')
