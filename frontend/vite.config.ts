import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        define: {
            'process.env.API': JSON.stringify(env.API),
            'process.env.TOKENIZATIONKEYBRAINTREE': JSON.stringify(env.TOKENIZATIONKEYBRAINTREE),
        },
        plugins: [react()],
        server: {
            host: true,
        },
        base: './',
    };
});
