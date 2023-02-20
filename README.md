# Laravel Vite Favicon Plugin
A basic plugin to generate favicons and Blade template for your Laravel Vite application.

This will do two things:
1. Generate favicons for your application.
   1. By default, the favicons will be generated in the `public/favicons` folder.
2. Generate a Blade template for your application.
   1. By default, the Blade template will be generated in the `resources/views/partials/favicons.blade.php` file.

## Installation
Install with NPM:
```bash
npm i @infrasym/laravel-vite-favicon-plugin -D
```
Yarn:
```bash
yarn add @infrasym/laravel-vite-favicon-plugin -D
```
PNPM:
```bash
pnpm i @infrasym/laravel-vite-favicon-plugin -D
```

## Usage
Import the plugin to your `vite.config.js` file:
```js
import favicons from '@infrasym/laravel-vite-favicon-plugin';
```
Add the plugin to your `vite.config.js` file.

```js
export default defineConfig({
    plugins: [
        /**
         * Laravel Vite Favicon Plugin
         * 
         * [1] Path to your base favicon image.
         * [2] Configuration options for the favicons plugin.
         */
        favicons('/resources/images/favicons/favicon.png' /** [1] */, {
            /** [2] */
            favicon: {
                // Path to the favicon image in the `public` folder.
                path: '/favicons/',
                // Your application name.
                appName: 'Laravel Vite',
                // Your application short name.
                appShortName: 'Laravel Vite',
                // Your application description.
                appDescription: 'This is a Laravel Vite project',
                // Your application author.
                developerName: 'Laravel Vite',
                // Your application Start URL.
                start_url: '/',
                // Your application theme color.
                theme_color: '#1a1065',
                // Your application background color.
                background_color: '#1a1065',
                // Your application background color.
                background: '#1a1065',
            }
        })
    ],
});
```
### Blade Template
The Blade template will be generated in the `resources/views/partials/favicons.blade.php` file.
You can now use this like so:
```html
<head>
    @include('includes.favicons')
</head>
```

And that's it! You can now run `npm run dev` or `npm run build` to generate the favicons and Blade template.

## License
MIT License. See [LICENSE](LICENSE) file.

## Roadmap

- [x] Generate favicons.
- [x] Generate Blade template.
- [ ] Add support for custom Blade template and folder.
- [ ] Add support for custom favicons folder.
- [ ] Clean up the configuration options.
- [ ] Better testing scalability.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

To set up the project, run the following commands:
```bash
git clone https://github.com/Infrasym/laravel-vite-favicon-plugin.git
cd laravel-vite-favicon-plugin
npm install
npm run husky
npm run build
```
Now use the build directory as your local package.

## Bugs and Issues
If you encounter any bugs or issues, please open an issue.

## Release History
* 1.0.0
	* Initial release.
