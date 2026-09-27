# Axis — Contexto do Projeto para Continuidade com Outra IA

## 1. Identidade do projeto

**Nome:** Axis  
**Objetivo:** criar um app pessoal de organização financeira baseado na distribuição percentual da renda.

**Repositório:** `celsortc/Axis`  
**GitHub:** https://github.com/celsortc/Axis

O projeto está em desenvolvimento incremental. O foco é construir um MVP simples, entendível e fácil de evoluir, evitando complexidade prematura.

---

## 2. Regra mais importante para qualquer IA que assumir o projeto

Antes de responder sobre desenvolvimento do Axis, **verifique o estado atual do repositório GitHub**.

Não presuma que o código ou os branches estão iguais ao contexto histórico. O código do repositório é a fonte de verdade para o estado atual da implementação.

Preserve decisões já estabelecidas, a menos que o usuário peça explicitamente para alterá-las.

Quando uma regra de negócio estiver ambígua, **pergunte antes de implementar**.

Não adicione funcionalidades apenas porque seriam tecnicamente interessantes. Priorize o MVP.

---

## 3. Objetivo do MVP

O MVP deve priorizar:

1. Overview
2. Lançamentos
3. Configurações
4. Metas e seus cálculos
5. Categorias
6. Gráficos básicos
7. Histórico de lançamentos

### Fora do MVP neste momento

Não incluir inicialmente:

- Integrações bancárias
- Cartões de crédito
- Automações complexas
- Recursos avançados desnecessários
- Patrimônio na interface

---

## 4. Regras financeiras já definidas

As metas padrão são:

| Meta | Percentual |
| :--- | :--- |
| Investimentos | 25% |
| Custos Fixos | 30% |
| Conforto | 15% |
| Curto/Médio Prazo | 15% |
| Prazeres | 10% |
| Conhecimento | 5% |
| **Total** | **100%** |

A soma dos percentuais deve ser **exatamente 100%**.

### Categoria x Meta

Esses conceitos são diferentes:

- **Categoria:** o que foi gasto (ex: Alimentação, Aluguel).
- **Meta:** para qual objetivo financeiro aquele dinheiro foi destinado (ex: Custos Fixos).

Exemplo conceitual:
- Categoria = Alimentação
- Meta = Custos Fixos

Um investimento reduz o **saldo disponível**, mas não reduz o **patrimônio**.

O patrimônio está fora do MVP atual e não deve ser colocado na interface sem uma decisão explícita.

---

## 5. Ordem de desenvolvimento

A ordem planejada é:

1. Regras financeiras
2. Banco de dados
3. Arquitetura técnica
4. Telas e UX
5. Backend
6. Frontend
7. Testes

Na prática, o projeto atual está evoluindo a estrutura do frontend, lançamentos, filtros e interface.

---

## 6. Forma de trabalho com o usuário

O usuário quer aprender desenvolvendo, e não simplesmente receber o código pronto.

### Regra principal

**O usuário escreve o código. A IA orienta, revisa e ajuda a destravar.**

Não implementar alterações automaticamente, a menos que o usuário peça explicitamente algo como:

- "faz para mim"
- "implemente isso"
- "pode alterar o código"

Quando o usuário estiver resolvendo um exercício:

1. Explicar o objetivo.
2. Dar pistas graduais.
3. Deixar o usuário tentar.
4. Revisar o código enviado.
5. Apontar o que está correto.
6. Apontar o problema específico.
7. Dar a próxima pista.
8. Só entregar a solução completa se o usuário pedir ou estiver realmente travado.

O usuário prefere receber **vários próximos passos de uma vez**, normalmente algo como 4–6 passos, em vez de receber apenas um comando por mensagem.

Os exercícios devem ser **desafiadores, mas realizáveis**.

---

## 7. Estilo de colaboração

Conversar em português brasileiro, de forma informal, direta e prática.

O usuário gosta de uma abordagem "mão na massa".

Evitar explicações excessivamente acadêmicas quando uma explicação prática resolver.

Quando houver uma decisão arquitetural, explicar o motivo, mas manter a solução simples.

Sempre que a IA implementar código a pedido do usuário, mostrar o trecho exato de código que foi modificado para que o usuário acompanhe as mudanças.

---

## 8. Git e branches

O usuário utiliza GitHub, branches, commits semânticos (Conventional Commits) e Issues.

### Regra para commits

A IA deve sugerir a mensagem usando Conventional Commits:

- `feat:` — nova funcionalidade
- `fix:` — correção de bug
- `refactor:` — refatoração sem mudança funcional
- `docs:` — documentação
- `test:` — testes
- `chore:` — manutenção

### Fluxo preferido

```bash
git status
git diff
git diff --check
git add <arquivos>
git commit -m "tipo: mensagem"
git push
```

Commits devem ser atômicos e focados em uma tarefa específica.

---

## 9. GitHub Issue atual

Issue #1: **Backlog — evolução do MVP de lançamentos e Overview**

### Lançamentos e filtros
- [x] Filtro de Tipo (Entradas / Saídas com seleção múltipla).
- [x] Filtro de Categoria (Salário, Renda Extra, Conforto, Investimentos, Custos Fixos, Metas, Prazeres, Conhecimento + opção "Todos" inteligente).
- [x] Filtro de Período (Últimos 7 dias como padrão, Hoje, Este mês, Mês passado, Últimos 30 dias, Este ano, Todos).
- [x] Combinação cruzada simultânea de Tipo + Categoria + Período.
- [x] Padronização em `camelCase` de identificadores e categorias.
- [x] Formatação monetária em Real (`Intl.NumberFormat` BRL).
- [x] Cards modernos de lançamentos com menu de 3 pontinhos (Editar / Excluir).

### Overview e regras financeiras
- [ ] Substituir valores fixos do Overview por cálculos em tempo real.
- [ ] Implementar as metas definidas somando 100%.
- [x] Persistência de dados (localStorage) — `js/modules/storage.js`.
- [x] Botão Excluir funcional (remove do array + localStorage + re-renderiza).
- [x] Fix: ao salvar/excluir uma transação, os filtros ativos são respeitados (event-driven via `axis:transactionchange`).

---

## 10. Arquitetura de módulos JS (estado atual)

```
js/
  script.js                → entrypoint: inicializa nav, transactions e filters
  modules/
    nav.js                 → navegação entre abas
    format.js              → cleanDate(), formatCurrency()
    storage.js             → loadTransactions(), saveTransactions(), clearTransactions()
    transactions.js        → lógica de lançamentos (salvar, deletar, renderizar cards)
    filters.js             → filtros de tipo, categoria e período; escuta "axis:transactionchange"
```

### Fluxo de dados

```
localStorage
     ↓ (ao iniciar)
transactions[]   ←──────────────────────────────────────────────┐
     │                                                           │
     ↓ (ao salvar/deletar)                                      │
saveTransactions()                                              │
     +                                                          │
dispatchEvent("axis:transactionchange")                         │
     ↓                                                          │
filters.js → applyFilters() → showFunc(filtered) → renderiza   │
     │                                                          │
     └── ao alterar filtros (radio/checkbox) → applyFilters() ──┘
```

### Regra de comunicação entre módulos

- `transactions.js` **não importa** `filters.js` (evita dependência circular).
- Quando uma transação muda, `transactions.js` dispara `new CustomEvent("axis:transactionchange")`.
- `filters.js` escuta esse evento e re-aplica os filtros ativos.

---

## 11. Princípios para futuras decisões técnicas

### Simplicidade primeiro
Preferir:
- funções pequenas;
- responsabilidades claras;
- módulos simples (ES Modules);
- estruturas fáceis de entender;
- mudanças incrementais.

Evitar:
- abstrações prematuras;
- bibliotecas desnecessárias;
- sistemas complexos antes de existir necessidade real.

### Regras financeiras vêm antes da implementação
Quando uma mudança afetar dinheiro, metas, categorias, saldo ou cálculos:
1. esclarecer a regra;
2. definir o comportamento esperado;
3. só então pensar na implementação.

### Não confundir categoria com meta
- Categoria responde: *"O que foi gasto?"*
- Meta responde: *"Para qual objetivo financeiro esse dinheiro foi destinado?"*
