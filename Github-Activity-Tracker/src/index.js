const https = require('https');

// Obtener argumentos pasados desde la línea de comandos
const args = process.argv.slice(2); // Obtener argumentos después de 'node src/index.js'
let userName = args[0]; // Solo tomar el primer argumento como nombre de usuario
const url = `https://api.github.com/users/${userName}/events`;

// Configurar opciones para la petición HTTP
const options = {
    headers: {
        'User-Agent': 'Node.js'
    }
};

// Realizar la solicitud GET
https.get(url, options, (response) => {
    let data = '';

    // Almacenar los datos recibidos en "data"
    response.on('data', (chunk) => {
        data += chunk;
    });

    // Mostrar los datos recibidos cuando la respuesta finalice
    response.on('end', () => {
        try {
            // Intentar parsear los datos como JSON
            const events = JSON.parse(data);

            // Verificar si se recibieron eventos
            if (events.length === 0) {
                console.log('No se encontraron eventos recientes para este usuario.');
                return;
            }

            // Recorrer los eventos y mostrar el tipo de acción realizada
            events.forEach(event => {
                switch (event.type) {
                    case 'PushEvent':
                        console.log(`- Pushed ${event.payload.commits.length} commits to ${event.repo.name}`);
                        break;
                    case 'IssuesEvent':
                        if (event.payload.action === 'opened') {
                            console.log(`- Opened a new issue in ${event.repo.name}`);
                        }
                        break;
                    case 'WatchEvent':
                        if (event.payload.action === 'started') {
                            console.log(`- Starred ${event.repo.name}`);
                        }
                        break;
                    default:
                        console.log(`- ${event.type} en ${event.repo.name}`);
                }
            });
        } catch (error) {
            console.error('Error al parsear los datos:', error.message);
        }
    });
}).on('error', (error) => {
    console.error('Error al realizar la petición:', error.message);
});
