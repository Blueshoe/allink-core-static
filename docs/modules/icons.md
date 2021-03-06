# Icon Font

Our `allink-boilerplate` comes with a default icon set. Adding or updating is done pretty quick and straight forward.

## Preparing Custom Icons

When designing custom icons, make sure to:

- Simplify the icon paths and layers using e.g. the `Compound Path` tool in Illustrator
- Outline all strokes

## Workflow: How to update an icon set

1. Open <a href="https://icomoon.io/app/" target="_blank">https://icomoon.io/app/</a> in a browser.
2. Go to the folder `static/icomoon/` in your file explorer and drag and drop the file `selection.json` into the browser.
3. Adjust the icons as required.
4. Hit the `Generate Font` button on the bottom right and then click on `Download`.
5. Extract the ZIP file in the download folder and <strong>copy</strong> only the folder `fonts` and the files `selection.json` and `style.css`.
6. Browse to the folder `static/icomoon/`, delete its content and <strong>paste</strong> the new files.
7. Open `style.css` in remove the the hashes to the font files. So e.g. `fonts/icomoon.woff?q6h7ay` becomes `fonts/icomoon.woff`.

## Usage

Once the icons set is updated, there are two main situations you will use it.

Most of the time we work with the <strong>code</strong> (e.g. `\e90b`) instead of setting classes (more flexible when dealing with `allink-core` modules).

To get the codes, you can either load the `selection.json` in <a href="https://icomoon.io/app/" target="_blank">https://icomoon.io/app/</a>, or you can check the file `static/icomoon/style.css`.

### Core Modules

Some core modules such e.g. [To The Top](../modules/ttt.md) have settings in `static/scss/base/_variables.scss`.

For example:

```SCSS
$ttt-icon:           '\e90b';
```

### Custom Modules

In your custom module, you could do something like this:

```SCSS
.example-module {
  &__link {
    &::after {
      @include icomoon();
      content: '\e90b';
    }
  }
}
```
