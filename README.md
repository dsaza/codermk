<div align='center'>
  <img height="60" src="https://raw.githubusercontent.com/dsaza/codermk/main/code-labs.svg">
  <h1>Codermk</h1>

  <i>Un workflow ideal para maquetar.</i>
</div>

### 📋 Índice

- [Data](#data)
  - [¿Cómo usar?](#cómo-usar)
  - [Estructura de archivos JSON](#estructura-de-archivos-json)

- Motor de plantillas
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
Los archivos JSON serán creados dentro de la carpeta `./data`.

Por defecto ya existe una colección creada llamada `site.json`.

```
data  
| site.json
```

La colección `site.json` contiene una propiedad llamada `title` la cual corresponde al título de la página HTML del sitio a maquetar.

## Motor de plantillas
