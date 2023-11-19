const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerJSDocs = YAML.load('./api.yml');

const options = {
    //customCss: ` img {content:url(\'../logo.svg\'); height:auto;} `,
    //customfavIcon: "../favicon.ico",
    customSiteTitle: "Social Media API"
}; 

module.exports = {
    swaggerServe: swaggerUI.serve, 
    swaggerSetup: swaggerUI.setup(swaggerJSDocs,options)
}