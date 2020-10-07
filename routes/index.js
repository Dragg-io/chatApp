const express = require('express');
const router = express.Router();
const path = require('path');

const configs = {
  caminho: '../build', //Aqui será definido a pasta de saída onde contém o index.html e os outros arquivos.
  forcarHTTPS: false, //Defina para true se desejar que o redirecionamento para HTTPS seja forçado (é necessário certificado SSL ativo)
  port: process.env.PORT || 3000,
};

router.get('*', (req, res) => {
  // O wildcard '*' serve para servir o mesmo index.html independente do caminho especificado pelo navegador.
  res.sendFile(path.join(__dirname, configs.caminho, 'index.html'));
});

module.exports = router;
