module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run serve',
      url: ['http://localhost:4200'],
    },
    upload: {
      target: "filesystem",
      githubToken: process.env.accessToken,
      outputDir: "/tmp/artifacts"
    }
  },
};
