

```markdown
# GitHub User Events

Esta aplicación en Node.js permite obtener y mostrar los eventos recientes de un usuario de GitHub. Los eventos incluyen actividades como pushes de commits, apertura de issues, y la adición de estrellas a repositorios, entre otros.

## Características

- Muestra eventos recientes de un usuario de GitHub, como:
  - Commits empujados a un repositorio.
  - Issues abiertos en un repositorio.
  - Repositorios a los que se ha dado estrella.
- La información se muestra en la consola con un formato claro y legible.

## Requisitos

- [Node.js](https://nodejs.org/) v12 o superior.

## Instalación

1. Clona este repositorio en tu máquina local.

   ```bash
   git clone https://github.com/JotaceCode/JotaceCode.git
   ```

2. Navega al directorio del proyecto.

   ```bash
   cd tu-repositorio
   ```

## Uso

1. Ejecuta la aplicación usando Node.js, proporcionando el nombre de usuario de GitHub cuyo historial de eventos deseas ver.

   ```bash
   node src/index.js <nombre_de_usuario>
   ```

   Por ejemplo:

   ```bash
   node src/index.js JotaceCode
   ```

2. La aplicación mostrará en la consola una lista de eventos recientes del usuario especificado, como:

   ```
   - Pushed 3 commits to JotaceCode/Portfolio.io
   - Opened a new issue in JotaceCode/Portfolio.io
   - Starred JotaceCode/Portfolio.io
   ```

## Notas

- La aplicación realiza solicitudes a la API pública de GitHub, que tiene límites de uso. Si ejecutas la aplicación repetidamente en un corto periodo de tiempo, podrías llegar al límite de solicitudes.

- La aplicación utiliza el encabezado `User-Agent` en la solicitud HTTP, como lo requiere la API de GitHub.

## Personalización

Puedes añadir más tipos de eventos a la aplicación modificando el bloque de `switch` en el archivo `src/index.js`. Consulta la [documentación de la API de GitHub](https://docs.github.com/en/rest/activity/events) para conocer todos los tipos de eventos disponibles.

## Licencia

Este proyecto está licenciado bajo la [MIT License](LICENSE).

## Contribuciones

Las contribuciones son bienvenidas. Siéntete libre de abrir un issue o enviar un pull request.

```

### Explicación:

- **Sección de Características:** Describe las funciones clave de la aplicación.
- **Requisitos:** Enumera los requisitos para ejecutar la aplicación.
- **Instalación:** Instrucciones para clonar el repositorio e instalar dependencias.
- **Uso:** Cómo ejecutar la aplicación y un ejemplo de la salida esperada.
- **Notas:** Información adicional sobre el uso de la API de GitHub.
- **Personalización:** Sugerencias sobre cómo modificar la aplicación para adaptarse a tus necesidades.
- **Licencia y Contribuciones:** Información sobre la licencia del proyecto y cómo contribuir. 

Este `README.md` debería proporcionar a los usuarios toda la información que necesitan para entender, instalar, y usar tu aplicación.