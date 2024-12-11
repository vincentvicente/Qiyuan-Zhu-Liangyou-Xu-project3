import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';

  return {
    root: "./frontend", 
    plugins: [react()],
    ...(isDev && {
      server: {
        proxy: {
          '/api': {
            target: 'http://localhost:3000/', 
            changeOrigin: true,
          },
        },
      },
    }),
  };
});
