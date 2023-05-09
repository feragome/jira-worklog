# Jira Worklog

Jira Worklog es un script de Node.js que permite cargar worklogs en Jira a través de la API versión 3 de Jira.

## Instalación

Para utilizar el proyecto, debes tener instalado Node.js y ejecutar los siguientes comandos:

```
git clone <URL del repositorio>
cd jira-worklog
npm install
```

## Configuración

El proyecto utiliza variables de entorno para conectarse a Jira y leer el archivo CSV con los worklogs.

Antes de ejecutar el script, debes crear un archivo `.env` en el directorio raíz del proyecto con las siguientes variables:

- `JIRA_URL`: URL de Jira
- `JIRA_EMAIL`: correo electrónico del usuario de Jira que realizará las operaciones
- `JIRA_API_TOKEN`: token de API de Jira generado para el usuario
- `WORKLOG_PATH`: ruta del archivo CSV que contiene los worklogs a cargar

## Uso

Para cargar los worklogs, ejecuta el siguiente comando:

```
npm start
```

El script leerá el archivo CSV especificado en `WORKLOG_PATH` y cargará los worklogs en Jira.

### Formato del archivo CSV

El archivo CSV debe tener las siguientes columnas:

- `issueKey`: clave de la tarea en Jira
- `date`: fecha en la que se realizó el trabajo, en formato `YYYY-MM-DD HH:mm:ss`
- `timeSpentHours`: cantidad de horas trabajadas en la tarea
- `comment`: comentario sobre el trabajo realizado. Si el contenido es un texto que va separando ítems entre "puntos y comas" (;), el contenido final del worklog será un listado en viñetas. Si no posee puntos y comas, será solamente 1 párrafo de contenido.

Ejemplo de un archivo CSV válido:

```
issueKey,date,timeSpentHours,comment
PROJ-123,2023-05-09,4,Realicé algunas tareas;Actualicé la documentación
PROJ-456,2023-05-10,2,Hice algunas pruebas
```

## Contribuir

Si deseas contribuir al proyecto, puedes hacer un fork del repositorio y enviar un pull request con tus cambios.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más información.