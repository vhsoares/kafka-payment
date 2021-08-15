# Kafka Payment (Projeto de estudo)

## Objetivo: Simular sistema de transferência de dinheiro com Kafka

Temos 2 tipos de usuários, os comuns e lojistas, ambos têm carteira com dinheiro e realizam transferências entre eles. Vamos nos atentar somente ao fluxo de transferência entre dois usuários.

Para ambos tipos de usuário, precisamos do Nome Completo, CPF, e-mail e Senha. CPF/CNPJ e e-mails devem ser únicos no sistema. Sendo assim, seu sistema deve permitir apenas um cadastro com o mesmo CPF ou endereço de e-mail.

Usuários podem enviar dinheiro (efetuar transferência) para lojistas e entre usuários.

Lojistas só recebem transferências, não enviam dinheiro para ninguém.

## Kafka como meio de comunicação
O usuário deve solicitar a transferência e o fluxo deve ser gerenciado utilizando kafka

### Métodos que o sistema deve simular/atender
- Notificação ao enviante via e-mail
- Validação dos dados do enviante
- Validação dos valores nas contas
- Criação de Log de acompanhamento
- Sistema de Retry no envio das mensagens
- Autorização de sistemas externo de fraude: https://run.mocky.io/v3/63d722e5-da06-4a7a-85ba-0633cb38b390
- Validação do saldo 
- Efetuar a transação
- Notificar o recebedor

A operação de transferência deve ser uma transação (ou seja, revertida em qualquer caso de inconsistência) e o dinheiro deve voltar para a carteira do usuário que envia.

### Fluxo que deve simular para a transação de rowback
- Efetuar o rollback
- Enviar e-mail para os dois usuários

API Payloads
~~~ typescript
/transfer
{
    Authentication-Token: 09##88dEE@d##as-0923, // string
    Value: 200, //number
    Receiver: 01234567800 //cnpj/cpf number
}
~~~