/**
 * A plugin for Vite that generates favicons for your Laravel application.
 *
 * @package @infrasym/laravel-favicon-vite-plugin
 * @author  InfraSym LLC. <noop@infrasym.com>
 * @license MIT
 * @link    https://github.com/infrasym/laravel-favicon-vite-plugin
 */

import {favicons, type FaviconOptions, FaviconImage, FaviconFile, FaviconHtmlElement} from 'favicons';
import fs, {Stats} from 'fs';
import fsPromise from 'fs/promises';
import path from 'path';
import {type PluginOption} from 'vite';
import * as process from 'process';

/**
 * Check if a directory exists.
 *
 * @param path
 */
export const directoryExists = async (path: string): Promise<boolean> => {
	try {
		const stat: Stats = await new Promise((resolve, reject) => {
			fs.stat(path, (err: NodeJS.ErrnoException | null, result: Stats) => {
				err ? reject(err) : resolve(result);
			});
		});

		return stat.isDirectory();
	} catch (e: NodeJS.ErrnoException | unknown) {
		return false;
	}
};

/**
 * The plugin configuration object.
 *
 * @param faviconOutputPath?: string
 * @param templateOutputPath?: string
 */
export interface PluginConfig {
	faviconOutputPath?: string;
	templateOutputPath?: string;
}

/**
 * The favicon configuration object.
 *
 * @extends FaviconOptions
 *
 * @param path: '/favicons/'
 * @param appName?: 'Laravel'
 * @param appShortName?: 'Laravel'
 * @param appDescription?: 'My web app'
 * @param developerName?: 'Laravel'
 * @param developerURL?: 'https://laravel.com'
 * @param cacheBustingQueryParam?: string | null
 * @param dir?: string
 * @param lang?: string
 * @param background?: string
 * @param theme_color?: string
 * @param appleStatusBarStyle?: string
 * @param display?: string
 * @param orientation?: string
 * @param scope?: string
 * @param start_url?: string
 * @param version?: string
 * @param pixel_art?: boolean
 * @param loadManifestWithCredentials?: boolean
 * @param manifestRelativePaths?: boolean
 * @param manifestMaskable?: boolean | string | string[] | Buffer | Buffer[]
 * @param preferRelatedApplications?: boolean
 * @param relatedApplications?: any
 * @param icons?: any
 * @param files?: any
 * @param shortcuts?: any
 * @param output?: any
 */
export type CustomFaviconConfig = FaviconOptions

/**
 * The configuration object for the plugin.
 *
 * @param plugin?: PluginConfig
 * @param favicon?: CustomFaviconConfig
 */
export interface Config {
	plugin?: PluginConfig;
	favicon?: CustomFaviconConfig;
}

/**
 * The favicon plugin for Vite.
 *
 * @param image
 * @param config
 */
export default (image: string, config: Config = {}): PluginOption => ({
	name: 'laravel-vite-favicons',
	async buildStart () {
		const src = path.join(process.cwd(), image);
		let faviconOutputPath = 'public/favicons';

		if (config.plugin) {
			if (config.plugin.faviconOutputPath !== undefined) {
				faviconOutputPath = config.plugin.faviconOutputPath;
			}
		}

		const dest = path.join(process.cwd(), faviconOutputPath);

		const response = await favicons(src, config.favicon);
		await fsPromise.mkdir(dest, {recursive: true});

		/**
		 * Copy all images to the destination directory.
		 */
		await Promise.all(response.images.map(async (image: FaviconImage) => await fsPromise.writeFile(path.join(dest, image.name), image.contents)));

		/**
		 * Copy files to the destination directory.
		 */
		await Promise.all(response.files.map(async (file: FaviconFile) => await fsPromise.writeFile(path.join(dest, file.name), file.contents)));

		await Promise.all(
			response.html
				.map(async (html: FaviconHtmlElement) => {
					let htmlOutput;

					// New-line after each html element.
					if (config.plugin && config.plugin.faviconOutputPath !== undefined) {
						htmlOutput = html
							.replaceAll('>', '>\n');
					} else {
						htmlOutput = html
							.replaceAll('>', '>\n');
					}

					// Write to custom template path if it's defined.
					// Otherwise, write to default template path.
					if (config.plugin && config.plugin.templateOutputPath !== undefined) {
						if (!await directoryExists(path.join(process.cwd(), config.plugin.templateOutputPath))) {
							await fsPromise.mkdir(path.join(process.cwd(), config.plugin.templateOutputPath), {recursive: true});
						}

						// Clear current favicon blade template or create new one if it doesn't exist.
						await fsPromise.writeFile(path.join(process.cwd(), config.plugin.templateOutputPath, 'favicons.blade.php'), '');
						// Write new favicon blade template.
						await fsPromise.appendFile(path.join(process.cwd(), config.plugin.templateOutputPath, 'favicons.blade.php'), htmlOutput);
					} else {
						// Create includes template directory if it doesn't exist.
						if (!await directoryExists(path.join(process.cwd(), 'resources/views/includes'))) {
							await fsPromise.mkdir(path.join(process.cwd(), 'resources/views/includes'), {recursive: true});
						}

						// Clear current favicon blade template or create new one if it doesn't exist.
						await fsPromise.writeFile(path.join(process.cwd(), 'resources/views/includes/favicons.blade.php'), '');
						// Write new favicon blade template.
						await fsPromise.appendFile(path.join(process.cwd(), 'resources/views/includes/favicons.blade.php'), htmlOutput);
					}
				}),
		);
	},
});
