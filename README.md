# Descritivo da solução:
Um comerciante precisa controle o seu fluxo de caixa diário com os lançamentos (débito e
Crédito), também precisa de um relatório que disponibilize o saldo diário consolidado.

# Requisitos de negócio:
* Serviço que faça o controle de lançamentos
  * Serviço para o lançamento de debito e credito foi executado respeitando o objeto abaixo na rota POST /lancamento
    ``` 
    {
      "tipo": "Debito || Credito",
      "conta": "1",
      "valor": "1601.09"
    }
    ```
* Serviço do consolidado diário
  * A consolidação pode ser feita por períodos com retorno separado por conta e data exemplificado abaixo

  ```
    [
      {
          "data": "2022-05-16T00:00:00.000Z",
          "conta": 1,
          "debito": "17833280.90",
          "credito": "97871026.90",
          "total": "80037746.00"
      },
      {
          "data": "2023-05-16T00:00:00.000Z",
          "conta": 1,
          "debito": "2177626.35",
          "credito": "146806540.35",
          "total": "144628914.00"
      }
  ]
  ```

# Requisitos técnicos:

* Desenho da solução

![Diagrama](/anexos/Diagrama.jpg)
* Pode ser feito na linguagem que voc e domina:
  * Foi feito em JavaScript(ECMAScript)
* Boas praticas são bem vindas (Design Patterns, padrões de Arquitetura, SOLID e etc)
* Readme com instruções de como subir a aplicação local, container e utilização dos serviços.
  * Basta executar o comando no repositório

  ```
  docker compose up -d
  ```

http://localhost/docs

![comando docker compo up -d](/anexos/Carrefour.gif)
  
* Hospedar em repositório publico (GitHub)