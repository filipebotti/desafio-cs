# Desafio CS
Projeto em node para o desafio CS. O Projeto está hospedado no cloud da [Azure](http://portal.azure.com) e utiliza [MongoDB](https://www.mongodb.com) para persistência de dados.  
Todas as rotas podem ser testada usando o endereço: http://rex-dev.brazilsouth.cloudapp.azure.com:4040

# Instalação
Para instalar o projeto bastar clonar o repositório e executar o comando abaixo para isntalar as dependências antes do uso.
```
npm install
```

# Instruções de uso
Antes de inicializar o servidor certifique-se de que o [MongoDB](https://www.mongodb.com) esteja em execução.

## Para executar no modo de desenvolvimento
Execute o comando

```
npm run dev
````

Esse comando executa os seguintes passos:

```
jshint *.js ./app/*.js ./app/**/*.js && DEBUG='desafio'* supervisor server
```

**Obs.:  
    1. Para executer ese comando é necessário a instalação do supervisor, caso não queira instalar o supervisor troque _supervisor_ por _node_ no comando acima no package.json em scripts > dev  
    2. Certifique-se de que tenha executado o npm install para instalar as devDependencies**

## Para executar em modo de produção

Execute o comando

```
npm start
```

Esse comando execute os seguintes passos:
```
pm2 start pm2-prod-launcher.json
```

**Necessário pm2 instalado para utilizar esse comando**

## Testes

Esse projeto utiliza mocha, chai e sinon para testes.  
Para executar os testes utiliza o comando abaixo:

```
npm test
```

**Necessário ter instalado as devDependencies do package.json**
# Rotas

 Todas as rotas estão disponíveis para teste em um cloud da [Azure](http://portal.azure.com) e pode ser acessado pelo endereço  : http://rex-dev.brazilsouth.cloudapp.azure.com:4040

## Cadastro de usuário
**Rota:** /users/signup  
**Método:** POST  
**Input esperado:**  
 ```json
 {
  "nome": "nome",
  "email": "email@email.com",
  "senha" : "senha"
  "telefones": [
    {
      "numero": "numero",
      "ddd": "ddd"
    }
  ]
}
```

**Retorno esperado:**

```json
{
  "_id": "7cc01219-b2f7-47b9-b1e2-27b0a19960fd",
  "nome": "nome",
  "email": "email@email.com",
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHBpcmF0aW9uVGltZSI6IjIwMTctMDEtMTZUMDQ6MDU6NDkuMTMzWiJ9.tx_j-8cp4JIOvyCLcMniyNWDxxeATYunNuTuz4zx6Cs",
  "ultimo_login": "2017-01-16T03:07:46.667Z",
  "data_atualizacao": "2017-01-16T03:07:46.667Z",
  "data_criacao": "2017-01-16T03:07:46.667Z",
  "telefones": [
    {
      "numero": "numero",
      "ddd": "ddd"
    }
  ]
}
```

## Sign In

**Rota:** /users/signin  
**Método:** POST  
**Input esperado:**  
```json
{
    "email" : "email@email.com",
    "senha" : "senha"
}
```

**Retorno esperado:**  
```json
{
  "_id": "7cc01219-b2f7-47b9-b1e2-27b0a19960fd",
  "nome": "nome",
  "email": "email@email.com",
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHBpcmF0aW9uVGltZSI6IjIwMTctMDEtMTZUMDM6MjY6MzQuOTQwWiJ9.7PYvSrZqUHce6PNP0x9VLn9Jsymp6kWDtPKeHnns_9Q",
  "data_atualizacao": "2017-01-16T02:56:34.940Z",
  "ultimo_login": "2017-01-16T02:56:34.940Z",
  "data_criacao": "2017-01-16T02:45:20.734Z",
  "telefones": [
    {
      "numero": "numero",
      "ddd": "ddd"
    }
  ]
}
```

## Buscar Usuário

**Rota:** /users/:id  
**Método:** GET  
**Header:**
    Authorization: Bearer {token}    
**Retorno esperado:**
```json
{
  "_id": "7cc01219-b2f7-47b9-b1e2-27b0a19960fd",
  "nome": "nome",
  "email": "email@email.com",
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHBpcmF0aW9uVGltZSI6IjIwMTctMDEtMTZUMDM6MjY6MzQuOTQwWiJ9.7PYvSrZqUHce6PNP0x9VLn9Jsymp6kWDtPKeHnns_9Q",
  "data_atualizacao": "2017-01-16T02:56:34.940Z",
  "ultimo_login": "2017-01-16T02:56:34.940Z",
  "data_criacao": "2017-01-16T02:45:20.734Z",
  "telefones": [
    {
      "numero": "numero",
      "ddd": "ddd"
    }
  ]
}
```

# Autor
Filipe Estanieski Botti  
filipebotti@hotmail.com
