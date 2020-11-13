# Dev-Skills

Esta es una prueba de conocimiento en la que se implementa un sistema básico de Login y Signup usando el motor de [Hasura](https://hasura.io/) ([Graphql](https://graphql.org/)), [Node](https://nodejs.org/es/) con [Express](https://expressjs.com/es/)
 y [Postgresql](https://www.postgresql.org/) como base de datos.

## Test

El sistema se encuentra funcionando sombre el API en Hasura:  [https://fine-koi-82.hasura.app/v1/graphql]()

Y los actions se encuentran en Heroku: [https://dev-skils-needzaio.herokuapp.com/]()



## uso

```
path: https://fine-koi-82.hasura.app/v1/graphql
method: POST


-> SignUp Mutation:

mutation signUp{
  signUp (names:"Jhon Doe", username:"jhondoe", password:"JDoe1*"){
    id
    names
    username
  }
}


-> LogIn Mutation

mutation LogIn{
  logIn(username:"jhondoe", password:"JDoe1*"){
    granted
  }
}

```

## Developed By
- Harold Mideros
- harmideros@gmail.com
- (+57) 301 267 0306

## License
[MIT](https://choosealicense.com/licenses/mit/)

[https://img.shields.io/badge/dev-neezaio-brightgreen]