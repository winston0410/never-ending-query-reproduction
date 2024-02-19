import { Surreal } from 'surrealdb.node'

(async () => {
    // Start Surreal with the following command
    // surreal start --user root --pass root file:database.db --auth
    const db = new Surreal();

    const connector = {
        id: 'default',
        provider: 'surrealDB',
        namespace: 'test',
        dbName: 'test',
        url: 'ws://127.0.0.1:8000',
        username: 'root',
        password: 'root'
    }

    await db.connect(connector.url)
    // reproducing the 'Select either namespace or database to use', error
    await db.use({ database: connector.dbName})

    await db.signin({
        namespace: connector.namespace,
        database: connector.dbName,
        username: connector.username,
        password: connector.password,
    })

    try {
        console.log('before query')

        await db.query(`
        DEFINE TABLE foobar SCHEMALESS;
        DEFINE FIELD name ON TABLE foobar TYPE string;
        DEFINE FIELD email ON TABLE foobar TYPE string;
        `)

        console.log('after query')
    } catch (e) {
        console.error(e)
    }
})()