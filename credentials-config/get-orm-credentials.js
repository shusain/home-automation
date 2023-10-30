const prompt = require('prompt-sync')();
const fs = require('fs');
const path = require('path');

// Prompt the user for their database credentials
const username = prompt('Enter your database username: ');
const password = prompt.hide('Enter your database password: ');

let ormConfig;

// Construct the paths to the ormconfig.json and .env files
const ormConfigPath = path.join(__dirname, '../home-automation-backend/ormconfig.json');
const envPath = path.join(__dirname, '../.env');

// Try to read and parse the existing ormconfig.json file
try {
    const data = fs.readFileSync(ormConfigPath, 'utf8');
    ormConfig = JSON.parse(data);
} catch (error) {
    // If an error occurs, create a default configuration object
    ormConfig = {
        type: "postgres",  // Adjust as necessary
        host: "localhost",  // Adjust as necessary
        port: 5432,  // Adjust as necessary
        database: "homeAutomationDB",  // Adjust as necessary
        synchronize: true,
        logging: false,
        entities: [
            "src/entity/**/*.ts"  // Adjust as necessary
        ],
        migrations: [
            "src/migration/**/*.ts"  // Adjust as necessary
        ],
        subscribers: [
            "src/subscriber/**/*.ts"  // Adjust as necessary
        ],
        cli: {
          entitiesDir: "src/entity",
          migrationsDir: "src/migration",
          subscribersDir: "src/subscriber"
        }
    };
}

// Update the username and password fields
ormConfig.username = username;
ormConfig.password = password;

// Write the updated ORM configuration object to ormconfig.json
fs.writeFileSync(ormConfigPath, JSON.stringify(ormConfig, null, 2));

let envContent;

// Try to read the existing .env file
try {
    envContent = fs.readFileSync(envPath, 'utf8');
} catch (error) {
    // If an error occurs, create default content for .env file
    envContent = 'POSTGRES_DB=homeAutomationDB\n';
}

// Update the POSTGRES_USER and POSTGRES_PASSWORD lines in the .env file
envContent = envContent.replace(/(?<=POSTGRES_USER=).*$/m, username);
envContent = envContent.replace(/(?<=POSTGRES_PASSWORD=).*$/m, password);

// If the lines don't exist, append them
if (!envContent.includes('POSTGRES_USER=')) {
    envContent += `POSTGRES_USER=${username}\n`;
}
if (!envContent.includes('POSTGRES_PASSWORD=')) {
    envContent += `POSTGRES_PASSWORD=${password}\n`;
}

// Write the updated content to the .env file
fs.writeFileSync(envPath, envContent);

console.log('Credentials saved to ormconfig.json and .env');
