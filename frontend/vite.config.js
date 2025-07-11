import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server:{
    proxy:{
      '/api':{
        target:"https://campuspay-hlgr.onrender.com/",
        changeOrigin: true,
        secure:false,
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            // Forward cookies from the original request
            if (req.headers.cookie) {
              proxyReq.setHeader('cookie', req.headers.cookie);
            }
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            // Forward Set-Cookie headers from the backend
            if (proxyRes.headers['set-cookie']) {
              res.setHeader('set-cookie', proxyRes.headers['set-cookie']);
            }
          });
        }
      }
    }
  }
})
