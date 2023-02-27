<div align='center'>
  <img height="60" src="https://raw.githubusercontent.com/dsaza/codermk/main/code-labs.svg">
  <h1>Codermk</h1>

  <i>Un workflow ideal para maquetar.</i>
</div>

### 📋 Índice

- [Instalación](#-instalación)
- [Desarrollo](#-desarrollo)
- [Compilación](#-compilación)
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

- [Preprocesador CSS](#-preprocesador-css)
  - [¿Qué es SASS?](#qué-es-sass)
  - [Estructura de archivos SCSS](#estructura-de-archivos-scss)
  - [SASS functions](#sass-functions)
  - [SASS mixins](#sass-mixins)

- ESCMAScript
  - [¿Qúe es Esbuild?](#qué-es-esbuild)
  - [Estructura de archivos JS](#estructura-de-archivos-js)
  - [Constantes JS](#constantes-js)
 
- Font icons
  - [¿Cómo usar iconos SVG?](#cómo-usar-iconos-svg)

<br>

## 🧰 Instalación
- Ejecutar el comando.

```sh
npm create coder-front-app@latest
```

- Escribir el nombre del proyecto.
- Seleccionar la opción `Codermk`.
- Instalar dependencias.

```sh
cd name-project
npm install
```

**[⬆ Volver al índice](#-índice)**

## 💻 Desarrollo
- Ejecutar el comando:

```sh
npm run dev
```

**[⬆ Volver al índice](#-índice)**

## 🪅 Compilación
- Ejecutar el comando:

```sh
npm run build
```

La maqueta final será guardada en la carpeta `dist`, es posible cambiar el nombre de la carpeta en el archivo `codermk.json`.

**[⬆ Volver al índice](#-índice)**

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
Al utilizar HTML en el momento de maquetar se presentan varios problemas, código repetitivo, archivos extensos y desorden. `Nunjucks` aportará super poderes para hacer la estructura de la maqueta más fácil.

### ¿Qué es Nunjucks?
Es un motor de plantillas rico y potente para JavaScript muy inspirado en [jinja2](https://jinja.palletsprojects.com/en/3.1.x/) (Motor de plantillas para [Django](https://www.djangoproject.com/)). Permite características como autoescapado, herencia de bloques, macros, control asíncrono y muchos más.  

Se recomienda leer la documentación de Nunjucks [aquí](https://mozilla.github.io/nunjucks/templating.html#variables).

### ¿Qué extensión de archivos utilizar?
Nunjucks es muy inspirado en [jinja2](https://jinja.palletsprojects.com/en/3.1.x/) pero también tiene una gran similitud con un motor de plantillas para PHP llamado [Twig](https://twig.symfony.com/). Cómo la gran mayoría de editores de código desconocen la estensión `.njk` se recomienda utilizar la extensión `.twig` para todos los archivos que se creen.

### ¿Qué extensión de Visual Studio Code instalar?
Se recomienda instalar la extensión [Twig Language](https://marketplace.visualstudio.com/items?itemName=mblode.twig-language) del autor _[mblode](https://marketplace.visualstudio.com/publishers/mblode)_. Esta extensión dará soporte para la sintaxix y varios snippets.

### Estructura de archivos
```
src
└── views
|   ├── components
|   ├── layouts
|   ├── pages
|   └── partials
```

Todo lo relacionado a `Nunjucks` estará ubicado en la carpeta `src/views` y se distribuirá de la siguiente manera:

- `components`: aquí se ubicarán los macros o componentes dinámicos de la maqueta.
- `layouts`: aquí se ubicarán los esqueletos de la maqueta que heredarán las páginas.
- `pages`: esta es la carpeta principal ya que los archivos que se encuentren allí serán los compilados como HTML y los que conformarán la maqueta.
- `partials`: aquí se guardarán trozos de código HTML los cuales pueden ser reutilizados en cualquier parte.

### Constantes Nunjucks
Como se mencionó anteriormente, las colecciones JSON de la carpeta `data` podrán ser usadas en el motor de plantillas, para ello existe una constante `__mkdata` la cual es un objeto que contiene cada colección JSON como propiedad. Por ejemplo, si se desea utilizar la propiedad `title` de la colección `site.json` se puede acceder mediante `__mkdata.site.title`.

### Nunjucks mixins
La manera en que se linkean los assets como imágenes, archivos css, archivos js, páginas HTML locales y demás; se debé hacer mediante mixins ya construidos para su uso. A continuación se listan los mixins:

| Mixin | Descripción | Parámetros | Ejemplo |
| ----- | ----------- | ---------- | ------- |
| **public** | Se usa para linkear archivos que se encuentren dentro de la carpeta `public`. | - `linkFromPublic`: _(string)_ ruta del archivo tomando como raíz la carpeta `public` | `public('favicon.ico')` |
| **style** | Se usa para linkear los archivos `.scss` que serán compilados. | - `fileScss`: _(string)_ nombre del archivo `.scss` a compilar | `style('main.scss')` |
| **module** | Se usa para linkear los archivos `.js` que serán compilados. | - `fileJs`: _(string)_ nombre del archivo `.js` a compilar | `module('main.js')` |
| **page** | Se usa para linkear páginas `.twig` hermanas. | - `namePage`: _(string)_ nombre de la página sin la extensión <br> - `optionsURL`: _(string)_ _(optional)_ información adicional como `#hash` o `?parameters` | - `page('nosotros')` <br> - `page('nostros', '#historia')` <br> - `page('nosotros', '/?lang=en')`|
| **isDev** | _(Adicional)_ Está funcion retorna un `boolean` y es útil si se desea saber si la maqueta está en desarrollo. | - | `isDev()` |
| **isBuild** | _(Adicional)_ Está funcion retorna un `boolean` y es útil si se desea saber si la maqueta está en producción. | - | `isBuild()` |

**[⬆ Volver al índice](#-índice)**

## 💅 Preprocesador CSS
Las hojas de estilo de un sitio web cada vez son más complejas y difíciles de mantener. En este punto es dónde un preprocesador de CSS puede ser de gran utilidad y SASS permite emplear funcionalidades que no existen en CSS.

## ¿Qué es SASS?
SASS es un preprocesador de CSS compatible con todas sus versiones. Por lo tanto, se trata de una herramienta utilizada por los desarrolladores web para traducir un código de hojas de estilo no estándar a un código CSS estándar, legible por la mayoría de los navegadores. La principal utilidad de SASS es la de hacer más simple la escritura del código CSS, además de brindar diversas utilidades que a día de hoy el CSS no puede ofrecer.

Se recomienda ver su documentación [aquí](https://sass-lang.com/guide).

## Estructura de archivos SCSS
SASS permite crear dos tipos de extensiones para sus archivos: `.sass` y `.scss`. La estructura de archivos en este caso será con la extensión `.scss`. Todo lo relacionado a `SASS` estará ubicado en la carpeta `src/theme`.

```
src
└── theme
|   ├── components
|   ├── config
|   ├── core
|   ├── extends
|   ├── fonts
|   ├── functions
|   ├── mixins
|   └── styles
```

- `components`: aquí se ubicarán los estilos para los componentes.
- `config`: aquí se ubicarán las variables que utilizará el proyecto.
- `core`: contiene los archivos que aplican estilos globales a la maqueta, por defecto ya contiene un [formateador de estilos](https://github.com/sindresorhus/modern-normalize), que es el mismo que utiliza [TailwindCSS](https://tailwindcss.com/).
- `extends`: [Ver documentación](https://sass-lang.com/documentation/at-rules/extend).
- `fonts`: Aquí se guardan todas las importaciones de fuentes que necesite la maqueta.
- `functions`: [Ver documentación](https://sass-lang.com/documentation/at-rules/function).
- `mixins`: [Ver documentación](https://sass-lang.com/documentation/at-rules/mixin).
- `styles`: Esta es la carpeta principal ya que todos los archivos que se encuentren dentro de ella serán los que se compilan.

### SASS functions
Se encuentran `functions` previamente hechos y tienen funcionalidades extras para contruir los estilos de la maqueta de una mejor manera.

| Function | Descripción | Parámetros | Ejemplo |
| ----- | ----------- | ---------- | ------- |
| **public_url** | Reemplazará la función `url` de CSS y esta hará referencia a los archivos ubicados en la carpeta `public`. | - `linkFromPublic`: _(string)_ ruta del archivo tomando como raíz la carpeta `public` | `public_url(favicon.ico)` |
| **rempi** | Se usa para usar formato `rem` como si fuera `px`. | - `sizePx`: _(number)_ valor de píxeles a utilizar | `rempi(20) // 20px` |

### SASS mixins
Se encuentran `mixins` previamente construidos y tienen funcionalidades extras para ahorrar tiempo en el momento de contruir los estilos.

| Mixin | Descripción | Parámetros | Ejemplo |
| ----- | ----------- | ---------- | ------- |
| **icon** | Retorna las propiedades requeridas para utilizar un `icon-font` desde los pseudo-elementos `after` o `before`. | - `idIcon`: _(number)_ id del icono el cual corresponde al número que se le otorgó en el momento de crear el archivo SVG | `@include icon(0) // [00]code-labs.svg` |
| **scrollbar** | Customiza el scrollbar de la página o de un contenedor. | - `colorBar`: CSS Color <br> - `colorBackground`: CSS Color <br> - `size`: _(number)_ CSS Size in pixels | `@include scrollbar(red, white, 10)` |

Existen más `mixins` que facilitan el uso de los `media queries`, estos son:

```scss
@mixin media-min-width($width)...
```
> Ideal para construir css a partir de `first mobile`. Recibe como parámetro un valor en píxeles.
<br>
 
```scss
@mixin media-max-width($width)...
```
> Ideal para construir css a partir de `first desktop`. Recibe como parámetro un valor en píxeles.
<br>

```scss
@mixin media-min-height($height)...
```
> Poco usual pero se recomienda usar cuando el css depende de la altura del disposito, de menor a mayor.
<br>

```scss
@mixin media-max-height($height)...
```
> Poco usual pero se recomienda usar cuando el css depende de la altura del disposito, de mayor a menor.
<br>

Ejemplo:
```scss
@include media-min-width(1800px); // @media (min-width: 1800px)...
```
<br>

Además de los `mixins` ya mencionados también existen otros que funcionan a partir de breakpoints estándar:
```scss
$breaks: (
	xs: 0px,
	sm: 576px,
	md: 768px,
	lg: 992px,
	xl: 1200px,
	xxl: 1400px,
);
```
<br>

> Son dos `mixins`, uno para `first mobile` y otro para `first desktop`:
```scss
@mixin media-break-up($break)... // first mobile
```
```scss
@mixin media-break-down($break)... // first desktop
```

Ejemplos:
```scss
@include media-break-up(md); // @media (min-width: 768px)
```
```scss
@include media-break-down(md); // @media (max-width: 767px)
```
