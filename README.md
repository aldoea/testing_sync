<center>

![Paybook-logo][logo]

![node-v11.5.0][node-badge]
![npm-6.7.0][npm-badge]

</center>

# SYNC NODE LIB

**Sync** recupera información de las cuentas y sus transacciones, de instituciones financieras autorizados por el usuario, y lo regresa a soluciones de terceros en un formato organizado, muy fácil de utilizar.

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
  >_Nota: Para realizar la autenticación es necesario tener creado un usuario, de donde se obtiene el **id_user**, vease este [ejemplo]()._
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

Puedes consultar más información acerca de los parametros de cada recurso en la [documentación oficial de paybook][sync-doc-endpoint].

### Usuarios:
<table>
<thead>
  <tr>
    <th>Recurso</th>
    <th>Acción</th>
    <th>Método</th>
    <th>Autenticación</th>
    <th>Parametros</th>
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
  <td rowspan="2">

```javascript
{
  "id_external", // Opcional
  "name"
}
```
  </td>
  </tr>
  <tr>
    <td rowspan="2">/users/:id_user</td>
    <td>Actualizar</td>
    <td>PUT</td>
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
```
Devuelve:
```json
[
  {
      "id_user": "5df859c4a7a6442757726ef4",
      "id_external": "ELSAN090909",
      "name": "El Santo",
      "dt_create": 1576556996,
      "dt_modify": null
  },
  {
      "id_user": "5e061a673e0acd77bf7d3c7b",
      "id_external": "BLDM140389",
      "name": "Blue Demon",
      "dt_create": 1577458279,
      "dt_modify": null
  }
]
```

#### Consultar un usuario en especifico
```javascript
let user = await Sync.run(
  {api_key: API_KEY}, 
  '/users', 
  {id_external: 'ELSAN090909'}, 
  'GET'
);
```
Devuelve:
```json
[
  {
      "id_user": "5df859c4a7a6442757726ef4",
      "id_external": "ELSAN090909",
      "name": "El Santo",
      "dt_create": 1576556996,
      "dt_modify": null
  }
]
```
#### Crear un Usuario
```javascript
let user = await Sync.run(
  {api_key: API_KEY}, 
  '/users', 
  {
    id_external: 'MIST030794',
    name: 'Rey Misterio'
  }, 
  'POST'
);
let {id_user} = user;
```
Devuleve:
```json
{
    "id_user": "5e06694b93f4a91cb218f28f",
    "id_external": "MIST030794",
    "name": "Rey Misterio",
    "dt_create": 1577478475,
    "dt_modify": null
}
```
#### Actualizar un Usuario

```javascript
let user = await Sync.run(
  {api_key: API_KEY}, 
  `/users/${id_user}`, 
  {name: 'El Santo Jr.'}, 
  'PUT'
);
```
Devuelve:
```json
  {
      "id_user": "5df859c4a7a6442757726ef4",
      "id_external": "ELSAN090909",
      "name": "El Santo Jr.",
      "dt_create": 1576556996,
      "dt_modify": 1576557005
  }
```

#### Eliminar un usuario
>_**Nota:** Esto eliminará toda la información del usuario._

```javascript
let response = Sync.run(
  {api_key: API_KEY}, 
  `/users/${id_user}`, 
  {}, 
  'DELETE'
);
```
Devuelve:
```json
{
  "rid": "d337e963-680f-4009-85dc-ab439bfdc771",
  "code": 200,
  "errors": null,
  "status": true,
  "message": null,
  "response": true
}
```


## Entorno
1. [NodeJs][nodejs]: 11.5.0
2. [NPM][npm]: 6.7.0
3. [Request][request]: 2.88.0
4. [Request-promise][request-promise]: 4.2.5

## Enlaces de interes
1. [Documentación][sync-doc-intro] oficial de Paybook Sync.
2. [Consumiendo el API REST de Sync vía Postman paso a paso](https://github.com/Paybook/sync-rest#api_key). Ampliamente recomendado para entender la estructura de una cuenta.

---
_Made with love by Paybook family._

 [//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

[Paybook Sync]: <https://www.paybook.com/sync/es/>
[sync-doc-intro]: <https://www.paybook.com/sync/es/docs/intro>
[sync-doc-endpoint]: <https://www.paybook.com/sync/es/docs#es&endpoints.users>
[dotenv]: <https://www.npmjs.com/package/dotenv>
[request]: <https://www.npmjs.com/package/request>
[request-promise]: <https://www.npmjs.com/package/request-promise>
[nodejs]: <https://nodejs.org/>
[npm]: <https://www.npmjs.com/>
[logo]: /images/syncLogo.svg
[node-badge]: https://img.shields.io/badge/node-v11.5.0-green
[npm-badge]: https://img.shields.io/badge/npm-6.7.0-blue