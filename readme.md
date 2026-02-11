## Relato

A aplicação é dividida front-end e back-end. Foram utilizadas dependências para agilizar o desenvolvimento e evitar boilerplate code, como Axios, Zod, Express e Cors.  
No front, foram utilizados React, Bootstrap, Axios e Zod. Apesar de simples, ainda preferi dividir as responsabilidades em arquivos separados, cada um responsável por um aspecto:

1. **main.jsx**: Arquivo principal do front-end.
2. **App.jsx**: Componente que possui o formulário.
3. **registerService.js**: Serviço que faz a requisição para o back-end.

No back-end, foram utilizados Node, Express, MySql12 e Cors, assim como no front, também contando com três arquivos, cada um responsável por algo:

1. **server.js**: Arquivo principal do back-end.
2. **connection.js**: Arquivo responsável pela conexão com a base de dados.
3. **registerService.js**: Serviço responsável por realizar o _insert_ na DB.

Além deles, utilizei o _Lovable_ para criar o design da interface e o _Docker_ para rodar a base de dados MySQL. Abaixo, estão os comandos utilizados em cada tecnologia para fazer o programa funcionar.

## Comandos:

### Docker

```docker
docker run --name teste-climba -e MYSQL_ROOT_PASSWORD=senha123 -e MYSQL_DATABASE=teste-climba -p 3306:3306 -d mysql:8
```

### SQL

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    data_nascimento DATE NOT NULL,
    profissao ENUM('programador', 'consultor_de_vendas', 'sdr', 'suporte_ao_cliente') NOT NULL,
    observacoes TEXT
);
```
