# SAC API

## Description

<p>
  This project uses nodeJs, express and PostgresSql as a database
</p>

Node version: 14.10.1 Yarn version: 1.22.17

### Run Project

1. First install all deps 'npm install' or 'yarn';
2. 'npm run dev' or 'yarn dev';

### Utils Links

  <ul>
    <li>
      How to configure postgresSql: https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-20-04-pt
    </li>
  </ul>

### Explanations

#### rootDir and outDir config

  <p align="left">Passamos esses dois parametros dentro do json de configuração do TS, para que quando o server for renderizar ele indentifique aonde está localizado o codigo Ts nesse caso está './src', que deve ser transcrito em Js e armazenado no outDir que seria o './dist'.</p>
