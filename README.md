# FAST FOOD API

![Badge em Desenvolvimento](https://img.shields.io/badge/STATUS-EM%20DESENVOLVIMENTO-brightgreen)

## SOBRE O PROJETO

- Essa é uma API com o propósito de simular uma aplicação de pedidos e entregas de alimentos.
- O propósito do projeto é aprender e praticar conceitos da arquitetura de software e tecnologias do desenvolvimento back-end.

## CASOS DE USO

### USUÁRIO FINAL

1. Registrar novos usuário
2. Autenticação de usuários
3. Buscar comidas com filtro de categoria, restaurante
4. Realizar um pedido que contenha uma ou mais comidas de um mesmo restaurante
5. Pagamento do pedido
6. Dar uma nota para o restaurante baseado na experiência do pedido
7. Ver o histórico de pedidos anteriores

### RESTAURANTE

1. Adicionar novas opções no cardápio do restaurante
2. Atualizar uma opção do cardápio
3. Remover uma opção do cardápio
4. Atualizar status de entrega de um pedido

### NÃO FUNCIONAL

1. Usuários finais não podem pedir comidas de restaurantes diferentes no mesmo pedido
2. Usuários finais só podem realizar avaliações sobre restaurantes após ter feito um pedido nele
3. Usuários finais devem registrar 1 cartão de crédito para realizar compras
4. Toda nova opção de um restaurante deve conter 1 foto
5. O pedido só é entregue ao restaurante após a confirmação do pagamento
6. Pedidos que ultrapassarem 1 hora sem o pagamento serão cancelados automáticamente
7. Usuários finais que cancelarem o pedido após confirmação do pagamento, terão uma cobrança adicional de 50% do valor do pedido
