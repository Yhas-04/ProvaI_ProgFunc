// AULA 1 — Funções de Transformação
import fs from 'fs';

const vendas = JSON.parse(
  fs.readFileSync('./vendas.json', 'utf-8')
);

// PASSO 2: Funções de filtragem

export const filtrarPorValorMinimo = (min) => (lista) =>
  lista.filter((venda) => venda.valor >= min);

export const filtrarPorVendedor = (vendedor) => (lista) =>
  lista.filter((venda) => venda.vendedor === vendedor);

export const filtrarPorCategoria = (categoria) => (lista) =>
  lista.filter((venda) => venda.categoria === categoria);


// PASSO 3: Transformação e agregação

export const resumir = (lista) =>
  lista.map(({ produto, valor, categoria }) => ({ produto, valor, categoria }));

export const totalPorCategoria = (lista) =>
  lista.reduce((acc, venda) => {
    acc[venda.categoria] = (acc[venda.categoria] || 0) + venda.valor;
    return acc;
  }, {});

export const ordenarPorValor = (lista) =>
  [...lista].sort((a, b) => a.valor - b.valor);

export const pegarTopN = (n) => (lista) => lista.slice(0, n);
