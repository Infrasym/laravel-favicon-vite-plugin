import {expectTypeOf, suite, test} from 'vitest'
import laravelViteFaviconsPlugin, {directoryExists} from '../plugin/index';

/**
 * The test suite for the plugin.
 */
suite('laravel-vite-favicon-plugin', () => {
	// [1] The plugin is a type of function.
	test('The laravelViteFaviconsPlugin is a type of function', () => {
		expectTypeOf(laravelViteFaviconsPlugin).toBeFunction();
	});

	// [1] The directoryExists constant is a type of function.
	test('The directoryExists constant is a type of function', () => {
		expectTypeOf(directoryExists).toBeFunction();
	});
});

