## Arquivos

- `analise.js` — funções de filtragem, transformação e agregação
- `pipelines.js` — função `pipe` e os dois pipelines de análise
- `maybe.js` — tratamento funcional de erros com o padrão Maybe
- `index.html` — visualização no navegador
- `vendas.json` — dataset com as vendas

## Como rodar

### No navegador (com interface para filtrar os top itens de cada categoria)

npx serve .
```

Depois abra o end. que irá rodar (provavelmente `http://localhost:3000`).
```
### No Node

```terminal:
node analise.js     # roda as funções e os testes da aula 1
node pipelines.js   # roda os pipelines e os testes da aula 2
node maybe.js       # roda o exemplo de tratamento de erro
```


## O que cada pipeline faz

**Pipeline 1 — `topProdutos`**
Filtra vendas acima de R$ 500, dentro de categorias específicas, ordena por valor, pega os 5 maiores e retorna o total por categoria.

**Pipeline 2 — `vendasEmFotografiaEAudio`**
Filtra vendas de um vendedor específico nas categorias do parâmetro, ordena por valor e retorna o resumo com produto, valor e categoria.

## Decisões tomadas

As funções recebem a lista como último argumento para funcionar com currying pois isso permite passá-las diretamente para o pipe sem precisar criar funções intermediárias.

`ordenarPorValor` usa `[...lista].sort()` em vez de `lista.sort()` para não mutar o array original.

O `Maybe` em `maybe.js` evita `try/catch`: cada estágio do pipeline só executa se o valor anterior não for vazio. Se `filtrarPorCategoria` não encontrar nada, o resto da cadeia é ignorado e `getOrElse` devolve um valor padrão.

## O que pesquisamos

- Diferença entre `pipe` e `compose` e por que a ordem importa
- Como implementar `pipe` só com `reduce`
- Padrão Maybe e tratamento funcional de erros ("Maybe monad javascript")
- Por que `sort()` muta e como evitar isso

Sites: StackOverflow, Reddit, Medium, Youtube, Material do prof no Sigaa, entre muitos outros
