module.exports = {
    apps: [
      {
        name: "gooadmin website",
        script: "node",
        args: "./node_modules/next/dist/bin/next start -p 3310",
        env: {
          NODE_ENV: "production"
        }
      }
    ]
  };
  