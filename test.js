"use strict";
require('dotenv').config();
const prettyJs = require('pretty-js');
const Sync = require('./sync');
const PG_APIKEY = process.env.PG_APIKEY;

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

// LISTAR USUARIOS
async function getUsers(filter) {
    let users = await Sync.run({api_key: PG_APIKEY}, '/users', filter, 'GET');
    return users;
}

// CREAR USUARIO
async function createUser(payload) {
    let user = await Sync.run({api_key: PG_APIKEY}, '/users', payload, 'POST');
    return user;
}

// ACTUALIZAR USUARIO
async function updateUser(id_user, payload) {
    let user = Sync.run({api_key: PG_APIKEY}, `/users/${id_user}`, payload, 'UPDATE');
    return user;
}

// ELIMINAR USUARIO
async function deleteUser(id_user) {
    let response = Sync.run({api_key: PG_APIKEY}, `/users/${id_user}`, {}, 'DELETE');
    return response;
}

// CREAR SESION
async function createSession(id_user) {
    let session = Sync.auth({api_key: PG_APIKEY}, {id_user: id_user});
    return session;
}

// VERIFICAR SESION
async function verifySession(token) {
    let session = Sync.run({}, `/sessions/${token}/verify`, {}, 'GET');
    return session;
}

// ELIMINAR SESION
async function deleteSession(token) {
    let response = Sync.run({}, `/sessions/${token}`, {}, 'DELETE');
    return response;
}

// CONSULTAR CATALOGO
async function getCatalogs(token) {
    let catalog = await Sync.run({token: token}, '/catalogues/organizations/sites', {}, 'GET');
    return catalog;
}

// CREAR CREDENCIALES NORMALES
async function createCredentials(token, payload) {
    let normalCredentials = await Sync.run({token: token}, '/credentials', payload, 'POST');
    return normalCredentials;
}

// CONSULTA CREDENCIALES
async function getCredentials(token) {
    let resp = await Sync.run({token: token}, '/credentials', {}, 'GET');
    return resp;
}

// CONSULTA ESTADO DE CREDENCIALES
async function getCredentialsStatus(token, id_job) {
    let resp = await Sync.run({token: token}, `/jobs/${id_job}/status`, {token: token}, 'GET');
    return resp;
}

// ELIMINA CREDENCIALES
async function deleteCredential(token, id_credential) {
    let resp = await Sync.run({token: token}, `/credentials/${id_credential}`, {}, 'DELETE');
    return resp;
}
// CONSULTA CUENTAS
async function getAccounts(token, payload) {
    let accounts = Sync.run({token: token}, '/accounts', payload, 'GET');
    return accounts;
}

// CONSULTA TRANSACCIONES
async function getTransactions(token, payload) {
    let accounts = Sync.run({token: token}, '/transactions', payload, 'GET');
    return accounts;
}
async function main() {
    try {
        // Consultar un usuario por id_externo
        console.log('->Consulta usuario');
        let users = await getUsers({id_external: 'EOOA989602'});
        debug(users);
        // Crear un usuario nuevo
        console.log('-> Crea usuario');
        let newUser = await createUser({
            id_external: 'ORTO7890',
            name: 'Randy Ort'
        });
        debug(newUser);
        // Actualizar el ususario previamente creado
        console.log('-> Actualiza usuario');
        let id_user = newUser.id_user;
        newUser = await updateUser(id_user, {name: 'Randy Orton'});
        debug(newUser);
        // Crear una sesión para ese usuario
        console.log('-> Crea sesion');
        id_user = newUser.id_user;
        let session = await createSession(id_user);
        debug(session);
        // Verificar la sesión
        console.log('-> Verificar sesion');
        let token = session.token;
        let resp = await verifySession(token);
        debug(resp);
        // Consultar catalogos
        console.log('-> Consultar catalogo');
        let catalogs = await getCatalogs(token);
        debug(catalogs);
        // Crear credenciales normal
        console.log('-> Crear credeciales normales');
        let siteNormal = catalogs[0].sites[0];
        let payload = {}; 
        payload['id_site'] = siteNormal.id_site;
        let credentials = {};
        credentials[siteNormal.credentials[0].name] = 'test';
        credentials[siteNormal.credentials[1].name] = 'test';
        payload['credentials'] = credentials;
        let credenciales = await createCredentials(token, payload);
        debug(credenciales);
        let id_credentialNormal = credenciales.id_credential;
        await sleep(30000);
        // Consultar Credenciales normal
        console.log('-> Consulta credenciales normal');
        let checkCredentials = await getCredentials(token);
        debug(checkCredentials);
        // Consulta Status Credenciales normal
        console.log('-> Consulta Status de credenciales');
        let id_job = credenciales.id_job;
        let status = await getCredentialsStatus(token, id_job);
        debug(status);
        // Consultar cuentas normal
        console.log('-> Consulta cuentas normal');
        let accounts = await getAccounts(token, {id_credential: id_credentialNormal});
        debug(accounts);
        // Consulta transacciones Normal
        console.log('-> Consulta transacciones Normal');
        let normalTranssactions = await getTransactions(token, {id_credential: id_credentialNormal});
        debug(normalTranssactions);
        // Eliminar Credenciales Normal
        console.log('-> Elimina credenciales normal');
        resp = await deleteCredential(token, id_credentialNormal)
        debug(resp);
        // Crear credenciales SAT
        console.log('-> Crear credenciales SAT');
        let siteSAT = catalogs[0].sites[11];
        payload = {}; 
        payload['id_site'] = siteSAT.id_site;
        credentials = {};
        credentials[siteSAT.credentials[0].name] = 'ACM010101ABC';
        credentials[siteSAT.credentials[1].name] = 'test';
        payload['credentials'] = credentials;
        credenciales = await createCredentials(token, payload);
        debug(credenciales);
        let id_credentialSAT = credenciales.id_credential;
        await sleep(30000);
        // Consultar Credenciales SAT
        console.log('-> Consulta credenciales SAT');
        checkCredentials = await getCredentials(token);
        debug(checkCredentials);
        // Consulta Status Credenciales SAT
        console.log('-> Consulta Status de credenciales');
        id_job = credenciales.id_job;
        status = await getCredentialsStatus(token, id_job);
        debug(status);
        // Consultar cuentas SAT
        console.log('-> Consulta cuentas SAT');
        accounts = await getAccounts(token, {id_credential: id_credentialSAT});
        debug(accounts);
        // Consulta transacciones SAT
        console.log('-> Consulta transacciones SAT');
        let satTranssactions = await getTransactions(token, {id_credential: id_credentialSAT});
        debug(satTranssactions);
        // Consulta archivos adjuntos SAT
        let attachment = satTranssactions[0].attachments;
        debug(attachment);
        // Descarga archivos adjuntos SAT

        // Eliminar Credenciales SAT
        console.log('-> Elimina credenciales SAT');
        resp = await deleteCredential(token, id_credentialSAT)
        debug(resp);
        // Eliminar la sesión
        console.log('-> Elimina sesion');
        resp = await deleteSession(token);
        debug(resp);
        // Eliminar usuario
        console.log('-> Elimina usuario');
        resp = await deleteUser(id_user);
        debug(resp);
    } catch (error) {
        console.error(error);
        console.error(prettyJs(JSON.stringify(error)));
        process.exit();
    }
}

function debug(code) {
    let toPrint = prettyJs(JSON.stringify(code));
    if(toPrint === {}) { 
        console.error(code);
    }else{
        console.log(toPrint);
    }
}
main();