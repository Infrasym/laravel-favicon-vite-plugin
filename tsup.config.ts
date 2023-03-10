import type { Options } from 'tsup';

export const tsup: Options = {
    clean: true,
    dts: true,
    target: 'node18',
    splitting: true,
    format: ['esm', 'cjs'],
    external: [
        'vite',
    ],
}
