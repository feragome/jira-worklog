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

### Access Token de Jira
  1. Login en Jira.
  2. Ingresar a URL: https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/#Create-an-API-token
  3. Click sobre el botón azul "Crear token de API".
  4. Agregar etiqueta al access token. Sugerencia: Cualquier nombre fácil de recordar y que indique el contexto del token. Ej: pc-trabajo-win11.
  5. Copiar el token y pegar en la variable indicada más arriba.

### Ejemplo de archivo `.env` 
Datos de referencia. Reemplazar por las que correspondan.
```env
JIRA_URL = https://cafecool.atlassian.net/
JIRA_EMAIL = jperez@cafecool.com.ar
JIRA_API_TOKEN = WTWTI3dFfGF0wwc1o6GCYRc-_mCgHIG_4QlGvT2ZSiLf1_Z_GT1lQv-j62Q...
WORKLOG_PATH = c:\Users\jperez\Documents\Planilla_2023.csv
```
## Uso

Para cargar los worklogs, ejecuta el siguiente comando:

```
npm start
```

El script leerá el archivo CSV especificado en `WORKLOG_PATH` y cargará los worklogs en Jira.

### Formato del archivo CSV

El archivo CSV debe tener las siguientes columnas:

- `issueKey`: clave de la tarea en Jira
- `date`: fecha en la que se realizó el trabajo, en formato `YYYY-MM-DD HH:mm:ss`. Por defecto toma la zona horaria del usuario
- `timeSpentHours`: cantidad de horas trabajadas en la tarea
- `comment`: comentario sobre el trabajo realizado. Si el contenido es un texto que va separando ítems entre "puntos y comas" (;), el contenido final del worklog será un listado en viñetas. Si no posee puntos y comas, será solamente 1 párrafo de contenido.

Ejemplo de un archivo CSV válido:

```
issueKey,date,timeSpentHours,comment
PROJ-123,2023-04-25 08:00:00,4,Realicé algunas tareas;Actualicé la documentación
PROJ-456,2023-04-25 10:30:00,2,Hice algunas pruebas
```

## Contribuir

Si deseas contribuir al proyecto, puedes hacer un fork del repositorio y enviar un pull request con tus cambios.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más información.
