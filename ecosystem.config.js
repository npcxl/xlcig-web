module.exports = {
  apps: [
    {
      name: "pc-guide-backend",
      script: "./backend/app.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
        PORT: 3001
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3001
      },
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      log_file: "./logs/combined.log",
      time: true
    }
  ],

  deploy: {
    production: {
      user: "ubuntu",
      host: "your-server-ip",
      ref: "origin/main",
      repo: "git@github.com:yourusername/computer-installation-guide.git",
      path: "/var/www/computer-installation-guide",
      "pre-deploy-local": "",
      "post-deploy": "npm run install:all && npm run build && pm2 reload ecosystem.config.js --env production",
      "pre-setup": ""
    }
  }
}; 