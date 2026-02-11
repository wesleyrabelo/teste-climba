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
