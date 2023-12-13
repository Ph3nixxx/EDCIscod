module.exports = {
  apps: [
    {
      name: "app",
      script: "./www/app.js",
      env_production: {
        NODE_ENV: "production",
      },
      max_memory_restart: "200M",
      log_file: "./logs/err.log"
    },
  ],
};
