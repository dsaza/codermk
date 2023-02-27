<div align='center'>
  <img height="60" src="https://raw.githubusercontent.com/dsaza/codermk/main/code-labs.svg">
  <h1>Codermk</h1>

  <i>Un workflow ideal para maquetar.</i>
</div>

### 📋 Índice

- [Data](#-data)
  - [¿Cómo usar?](#cómo-usar)
  - [Estructura de archivos JSON](#estructura-de-archivos-json)

- [Motor de plantillas](#-motor-de-plantillas)
  - [¿Qué es Nunjucks?](#qué-es-nunjucks)
  - [¿Qué extensión de archivos utilizar?](#qué-extensión-de-archivos-utilizar)
  - [¿Qué extensión de Visual Studio Code instalar?](#qué-extensión-de-visual-studio-code-instalar)
  - [Estructura de archivos](#estructura-de-archivos)
  - [Constantes Nunjucks](#constantes-nunjucks)
  - [Nunjucks mixins](#nunjucks-mixins)

- Preprocesador CSS
  - [¿Qué es SASS?](#qué-es-sass)
  - [Estructura de archivos SCSS](#estructura-de-archivos-scss)
  - [SASS mixins](#sass-mixins)

- ESCMAScript
  - [¿Qúe es Esbuild?](#qué-es-esbuild)
  - [Estructura de archivos JS](#estructura-de-archivos-js)
  - [Constantes JS](#constantes-js)
 
- Font icons
  - [¿Cómo usar iconos SVG?](#cómo-usar-iconos-svg)

## 📀 Data
Para que el uso de información general sea más óptima de utilizar se plantea el uso de archivos JSON que contengan los datos relevantes. El motor de plantillas HTML y javascript tendrán acceso a la información de los JSON mediante constantes.

### ¿Cómo usar?
Cada archivo JSON hará la función de coleccionar los datos, tal como lo hace una tabla en SQL.

### Estructura de archivos JSON
Los archivos JSON serán creados dentro de la carpeta `data`.

Por defecto ya existe una colección creada llamada `site.json`.

```
data  
| site.json
```

La colección `site.json` contiene una propiedad `title` la cual corresponde al título de la página HTML del sitio a maquetar.

**[⬆ Volver al índice](#-índice)**

## 🛵 Motor de plantillas
Al reutilizar HTML en el momento de maquetar se presentan varios problemas, así que `Nunjucks` ayudará a realizar esa tarea.

### ¿Qué es Nunjucks?
Es un motor de plantillas rico y potente para JavaScript muy inspirado en [jinja2](https://jinja.palletsprojects.com/en/3.1.x/) (Motor de plantillas para [Django](https://www.djangoproject.com/)). Permite características como autoescapado, herencia de bloques, macros, control asíncrono y muchos más.  

Se recomienda leer la documentación de Nunjucks [aquí](https://mozilla.github.io/nunjucks/templating.html#variables).

### ¿Qué extensión de archivos utilizar?
Nunjucks es muy inspirado en [jinja2](https://jinja.palletsprojects.com/en/3.1.x/) pero también tiene una gran similitud con un motor de plantillas para PHP llamado [Twig](https://twig.symfony.com/). Cómo la gran mayoría de editores de código desconocen la estensión `.njk` se recomienda utilizar la extensión `.twig` para todos los archivos que se creen.

### ¿Qué extensión de Visual Studio Code instalar?
Se recomienda instalar la extensión [Twig Language](https://marketplace.visualstudio.com/items?itemName=mblode.twig-language) del autor _[mblode](https://marketplace.visualstudio.com/publishers/mblode)_. Esta extensión dará soporte para la sintaxix y varios snippets.

### Constantes Nunjucks
Como se mencionó anteriormente, las colecciones JSON de la carpeta `data` podrán ser usadas en el motor de plantillas, para ello existe una constante `__mkdata` la cual es un objeto que contiene cada colección JSON como propiedad. Por ejemplo, si se desea utilizar la propiedad `title` de la colección `site.json` se puede acceder mediante `__mkdata.site.title`.

### Nunjucks mixins
La manera en que se linkean los assets como imágenes, archivos css, archivos js, páginas HTML locales y demás; se debé hacer mediante mixins ya construidos para su uso. A continuación se listan dichos mixins:

| Mixin | Descripción | Parámetros | Ejemplo |
| ----- | ----------- | ---------- | ------- |
| public | 
- **public**: Se usa para linkear archivos que se encuentren dentro de la carpeta `public`, recibe como parámetro un `string` que será la ruta del archivo tomando como raíz la carpeta `public`. Por ejemplo, `public('favicon.ico')`.
- **style**: Se usa para linkear los archivos `.scss` que serán compilados, recibe como parámetro un `string` que será el nombre del archivo a compilar. Por ejemplo `style('main.scss')`.
- **module**: Se usar para linker los arvhios `.js` que serán compilados, recibe como parámetro un `string` que será el nombre del archivo a compilar. Por ejemplo `module('main.js')`.
- **page**: Se usar para linker páginas `.twig` hermanas. Recibe dos parámetros, el primero `string` será el nombre de la página sin la extensión, por ejemplo, `page('nosotros')`; el segundo parámetro `string` es opcional y servirá para agregarle a la URL de la página información adicional como `#hash` o `?parametros`, por ejemplo, `page('nostros', '#historia')` ó `page('nosotros', '/?lang=en')`
