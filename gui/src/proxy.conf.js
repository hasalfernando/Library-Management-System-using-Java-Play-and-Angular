const PROXY_CONFIG = {
  "**": {
    "target": "http://localhost:9000",
    "secure": false,
    "bypass": function (req) {
      if (req && req.headers && req.headers.accept && req.headers.accept.indexOf("html") !== -1) {
        console.log("Connecting to the browser.");
        return "/index.html";
      }
    }
  }
};

module.exports = PROXY_CONFIG;
