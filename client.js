import liveServer from 'live-server'

const params = {
  port: 8080,
  root: "./",
  file: "index.html",
  wait: 1000,
};

liveServer.start(params);
