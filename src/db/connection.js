import pkg from 'pg';
const {Client} = pkg;

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    password: 'Criciuma10%',
    database: 'company_db',
    port: 5432
});

client.connect()
.then(() => console.log('Connected successfully'))
.catch(err => console.error('Connection error:', err));

export default client;