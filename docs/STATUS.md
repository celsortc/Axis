# Axis — Status do projeto

> Atualizado em 28/09/2026, com base no commit `212a8d1` da branch `main`.

Este arquivo serve como ponto de retomada rápida para uma nova sessão ou outro computador. As regras de negócio, preferências de colaboração e decisões mais detalhadas estão em [`../contexto.md`](../contexto.md).

## Objetivo atual

Construir um MVP de organização financeira pessoal baseado na distribuição percentual da renda, mantendo a implementação simples e didática.

O foco atual está no frontend de lançamentos. O projeto usa HTML, CSS e JavaScript com ES Modules, sem framework, backend ou banco de dados.

## Estado atual

- A navegação alterna entre Overview, Lançamentos e Configurações.
- É possível cadastrar entradas e saídas com descrição, categoria, valor e data.
- Os campos obrigatórios e o valor maior que zero são validados antes do cadastro.
- As transações são armazenadas no `localStorage` do navegador.
- O histórico é agrupado por data e ordenado das datas mais recentes para as mais antigas.
- Os filtros de tipo, categoria e período funcionam em conjunto.
- Os filtros ativos continuam aplicados depois de salvar ou excluir uma transação.
- O menu de ações permite excluir uma transação.
- A opção **Editar** já aparece na interface, mas ainda não possui comportamento.

## Arquitetura atual

```text
index.html
css/
  global.css
  aside.css
  overview.css
  transactions.css
  filters.css
  style.css
js/
  script.js                 # inicialização da aplicação
  modules/
    nav.js                  # navegação entre seções
    format.js               # formatação de datas e valores
    storage.js              # leitura e gravação no localStorage
    transactions.js         # cadastro, listagem e exclusão
    filters.js              # filtros combinados do histórico
```

Quando uma transação é criada ou excluída, `transactions.js` dispara o evento `axis:transactionchange`. O módulo `filters.js` escuta esse evento, reaplica os filtros selecionados e solicita uma nova renderização. Isso evita uma dependência circular entre os módulos.

## Limitações conhecidas

- Os cards do Overview ainda exibem valores fixos, sem relação com as transações cadastradas.
- Os percentuais mostrados no HTML do Overview não estão todos alinhados às metas definidas em `contexto.md`.
- A tela de Configurações ainda é apenas um placeholder.
- Editar uma transação ainda não foi implementado.
- Não há testes automatizados nem configuração de lint ou formatação.
- Não existe backend ou banco de dados.
- O `localStorage` pertence ao navegador e ao computador atual. Os lançamentos cadastrados não são enviados ao GitHub nem aparecem automaticamente em outro PC.
- O código usa `Object.groupBy`, que pode exigir um navegador atualizado.

## Próximos passos sugeridos

### 1. Tornar o Overview dinâmico

Calcular a partir de `transactions`:

- total de entradas;
- total de saídas;
- saldo disponível (`entradas - saídas`);
- total destinado a investimentos.

Critério de conclusão: os quatro cards devem reagir imediatamente ao cadastro e à exclusão de lançamentos.

### 2. Centralizar categorias e metas

Criar uma única fonte de verdade para nomes, tipos e percentuais das categorias. As metas definidas atualmente são:

| Categoria | Meta |
| --- | ---: |
| Investimentos | 25% |
| Custos Fixos | 30% |
| Conforto | 15% |
| Curto/Médio Prazo | 15% |
| Prazeres | 10% |
| Conhecimento | 5% |

Critério de conclusão: os percentuais somam exatamente 100% e não ficam duplicados em HTML e JavaScript.

Antes de implementar, decidir como a categoria de lançamento `metas` será relacionada à meta **Curto/Médio Prazo**.

### 3. Calcular o realizado por categoria

Comparar as saídas de cada categoria com a renda do período e mostrar o percentual realizado ao lado da meta.

Antes de implementar, definir qual renda será usada como base e como o período do Overview será escolhido.

### 4. Implementar edição de lançamentos

Reaproveitar o formulário existente para carregar uma transação, salvar as alterações no array e no `localStorage` e preservar os filtros ativos.

Critério de conclusão: editar tipo, descrição, categoria, valor ou data atualiza o histórico sem criar uma nova transação.

### 5. Criar as Configurações do MVP

Permitir alterar os percentuais das metas, validando que a soma seja exatamente 100% antes de salvar.

### 6. Adicionar testes para as regras centrais

Priorizar testes de:

- cálculo de saldo e totais;
- cálculo dos percentuais por categoria;
- filtros de período;
- validação da soma das metas;
- criação, edição e exclusão de transações.

## Como executar localmente

O projeto não possui etapa de build. Como utiliza ES Modules, abra a pasta por meio de um servidor HTTP local, por exemplo a extensão Live Server do VS Code, e acesse `index.html`.

## Como retomar em outro computador

```powershell
git clone https://github.com/celsortc/Axis.git
cd Axis
```

Se o repositório já estiver clonado:

```powershell
git pull
```

Prompt sugerido para uma nova conversa no Codex:

> Leia `contexto.md` e `docs/STATUS.md`, confira o estado atual do repositório e continue pelo primeiro próximo passo ainda não concluído. Antes de implementar regras financeiras ambíguas, confirme a decisão comigo.

## Cuidados antes de trocar de computador

1. Execute `git status` e confira os arquivos alterados.
2. Faça um commit focado usando Conventional Commits.
3. Execute `git push`.
4. No outro computador, execute `git pull` antes de começar.
5. Se precisar levar também os lançamentos de teste, exporte-os separadamente: eles estão no `localStorage` e não fazem parte do repositório.
