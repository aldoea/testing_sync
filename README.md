<center>

![node-v11.5.0][node-badge]
![npm-6.7.0][npm-badge]

</center>

# SYNC NODE LIB

### **Sync** recupera información de las cuentas y sus transacciones, de instituciones financieras autorizados por el usuario, y lo regresa a soluciones de terceros en un formato organizado, muy fácil de utilizar.

## Opciones de instalación

1. __Instalar mediante NPM:__
```bash
  npm install sync-paybook
```
2. __Descargar la librería:__
```bash
  git clone https://github.com/Paybook/sync-rest.git 
```
## Requerimientos

1. **API Key:**

  Cuando creamos una cuenta de [Paybook Sync] se nos proporcionó una API Key, por ejemplo:
  ```
  api_key = 7767a4a04f990e9231bafc949e8ca08a
  ```
  Este API key lo podemos visualizar como la contraseña o llave de acceso a los servicios de [Paybook Sync]. Únicamente a través de ella podremos consultar la información de las instituciones que sincronicemos.
## Implementación

La librería incluye los metodos:
1. `Sync.auth()`
  + _Nota: Para realizar la autenticación es necesario tener creado un usuario, de donde se obtiene el id_user, vease este [ejemplo]()._
2. `Sync.run()` _Vease el apartado de [recursos]() disponibles_


Por ejemplo:
```javascript
const API_KEY = TU_API_KEY;

// Crear una sesión para un usuario
let token = await Sync.auth(
  {api_key: API_KEY}, // Tu API KEY
  {id_user: id_user} // ID de usuario
);

// Consumir un recurso de Sync
let response = await Sync.run(
  {token: token}, // Autenticación
  '/credentials', // Recurso
  {}, // Parametros
  'GET' // Método HTTP
);
```
**_¡Importante!:_** No escribas tu API KEY directamente en tu código o en texto plano, ya que es una mala práctica de seguridad, te recomiendo que revises [la libreria Dotenv][dotenv].

## Autenticación

### Obtener un Token de sesión:
```javascript
  let token = await Sync.auth(
    {api_key: API_KEY}, 
    {id_user: id_user}
  );

```
### Respuesta:
```javascript
  console.log(token);
  // #Imprime: { token: "d5b33dcf996ac34fd2fa56782d72bff6"}
```
## Recursos y Ejemplos

### Usuarios:
<table>
<thead>
  <tr>
    <th width="30%">Recurso</th>
    <th>Acción</th>
    <th>Método</th>
    <th>Autenticación</th>
    <th width="40%">Parametros</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td rowspan="2">/users</td>
    <td>Consultar</td>
    <td>GET</td>
<td rowspan="4">

```javascript
{ api_key: API_KEY }
```
</td>
<td>

```javascript
{
    "id_external", // Opcional
    "fields", // Opcional
    "limit", // Opcional
    "skip", // Opcional
    "order" // Opcional
}
```
</td>
  </tr>
  <tr>
    <td>Crear</td>
    <td>POST</td>
  <td>

|Campo|Tipo|Descripción|
|:-----|:-----:|:----------|
|id_external (opcional)|String|ID externo, este campo puede ser null y puede usarse para llevar dar seguimiento al usuario con un ID externo.|
|name|String|Nombre del usuario.|

  </td>
  </tr>
  <tr>
    <td rowspan="2">/users/:id_user</td>
    <td>Actualizar</td>
    <td>PUT</td>
    <td>{}</td>
  </tr>
  <tr>
    <td>Eliminar</td>
    <td>DELETE</td>
    <td>{}</td>
  </tr>
</tbody>
</table>

#### Consultar usuarios
```javascript
let users = await Sync.run(
  {api_key: API_KEY}, 
  '/users', 
  {}, 
  'GET'
);
console.log(users);
```
Devuelve:
```json
[
  {
      "id_user": "5df859c4a7a6442757726ef4",
      "id_external": "ELSAN090909",
      "name": "El Santo",
      "dt_create": 1576556996,
      "dt_modify": 1576557005
  },
  {
      "id_user": "5e061a673e0acd77bf7d3c7b",
      "id_external": "BLDM140389",
      "name": "Blue Demon",
      "dt_create": 1577458279,
      "dt_modify": 1577458279
  }
]
```

### Consultar un usuario en especifico
```javascript
let user = await Sync.run(
  {api_key: API_KEY}, 
  '/users', 
  {id_external: 'ELSAN090909'}, 
  'GET'
);
console.log(users);
```
## Entorno
---

## Enlaces de interes
---

 [//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

[Paybook Sync]: <https://www.paybook.com/sync/es/>
[sync-doc]: <https://www.paybook.com/sync/es/docs/intro>
[dotenv]: <https://www.npmjs.com/package/dotenv>
[request]: <github.com/request/request>
[logo]: /images/syncLogo.svg
[node-badge]: https://img.shields.io/badge/node-v11.5.0-green
[npm-badge]: https://img.shields.io/badge/npm-6.7.0-blue
