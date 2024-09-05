Requisitos Previos

Node.js (versión 16 o superior)
MySQL (versión 8 o superior)
Angular 18
Un editor de código o IDE (como Visual Studio Code)

Configuración del Entorno

Instalación de Node.js: Descarga e instala Node.js desde el sitio web oficial de Node.js.
Instalación de MySQL: Descarga e instala MySQL desde el sitio web oficial de MySQL.
Instalación de Angular 18: Ejecuta el comando npm install -g @angular/cli para instalar la CLI de Angular.
Configuración de la Base de Datos

Crear una base de datos: Crea una base de datos en MySQL con un nombre de tu elección (por ejemplo, mydatabase).
Crear un usuario: Crea un usuario en MySQL con permisos de lectura y escritura en la base de datos (por ejemplo, myuser con contraseña mypassword).
Configurar la conexión: Edita el archivo config.js (o el archivo de configuración correspondiente) para establecer la conexión con la base de datos:
javascript



Despliegue de la Aplicación

Clonar el repositorio: Clona el repositorio de la aplicación en un directorio local.
Instalar dependencias: Ejecuta el comando npm install para instalar las dependencias del proyecto.
Compilar la aplicación: Ejecuta el comando ng build para compilar la aplicación Angular.
Iniciar el servidor: Ejecuta el comando node server.js (o el comando correspondiente) para iniciar el servidor Node.js.
Acceder a la aplicación: Accede a la aplicación a través del navegador, utilizando la dirección http://localhost:4200 (o la dirección correspondiente).
