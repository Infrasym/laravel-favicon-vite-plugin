import { FaviconOptions } from 'favicons';
import { PluginOption } from 'vite';

/**
 * A plugin for Vite that generates favicons for your Laravel application.
 *
 * @package @infrasym/laravel-favicon-vite-plugin
 * @author  InfraSym LLC. <noop@infrasym.com>
 * @license MIT
 * @link    https://github.com/infrasym/laravel-favicon-vite-plugin
 */

/**
 * Check if a directory exists.
 *
 * @param path
 */
declare const directoryExists: (path: string) => Promise<boolean>;
/**
 * The plugin configuration object.
 *
 * @param faviconOutputPath?: string
 * @param templateOutputPath?: string
 */
interface PluginConfig {
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
type CustomFaviconConfig = FaviconOptions;
/**
 * The configuration object for the plugin.
 *
 * @param plugin?: PluginConfig
 * @param favicon?: CustomFaviconConfig
 */
interface Config {
    plugin?: PluginConfig;
    favicon?: CustomFaviconConfig;
}
/**
 * The favicon plugin for Vite.
 *
 * @param image
 * @param config
 */
declare const _default: (image: string, config?: Config) => PluginOption;

export { Config, CustomFaviconConfig, PluginConfig, _default as default, directoryExists };
