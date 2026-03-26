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

// PASSO 4: Testes com console.assert

console.assert(
  filtrarPorValorMinimo(1000)(vendas).length === 16,
  "ERRO: deveria retornar 17 vendas acima de 1000"
);
console.assert(
  filtrarPorValorMinimo(9999)(vendas).length === 0,
  "ERRO: lista vazia quando nenhum valor bate"
);
console.assert(
  filtrarPorValorMinimo(100)([]).length === 0,
  "ERRO: lista vazia como entrada deve retornar vazia"
);

// filtrarPorCategoria
console.assert(
  filtrarPorCategoria("periféricos")(vendas).length === 4,
  "ERRO: deveria retornar 4 itens de periféricos"
);
console.assert(
  filtrarPorCategoria("inexistente")(vendas).length === 0,
  "ERRO: categoria inexistente deve retornar vazia"
);

// resumir
const resumido = resumir(vendas);
console.assert(
  Object.keys(resumido[0]).join(",") === "produto,valor,categoria",
  "ERRO: resumir deve retornar só produto, valor e categoria"
);
console.assert(
  resumir([]).length === 0,
  "ERRO: resumir de lista vazia deve retornar vazia"
);

// totalPorCategoria
const totais = totalPorCategoria(vendas);
console.assert(
  totais["tech"] === 7700,
  "ERRO: total de tech deveria ser 7700"
);
console.assert(
  totais["periféricos"] === 1000,
  "ERRO: total de periféricos deveria ser 1000"
);

// ordenarPorValor
const ordenada = ordenarPorValor(vendas);
console.assert(
  ordenada[0].valor === 45,
  "ERRO: primeiro item deveria ser o de menor valor (45)"
);
console.assert(
  ordenada[ordenada.length - 1].valor === 4500,
  "ERRO: último item deveria ser o de maior valor (4500)"
);

// Verifica que o array original não foi mutado
console.assert(
  vendas[0].produto === "Notebook",
  "ERRO: o array original foi mutado!"
);

console.log("Todos os testes passaram!");

