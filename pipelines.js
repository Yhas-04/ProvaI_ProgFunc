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
