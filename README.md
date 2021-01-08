<h1 align="center">
    🛠🛠 VUTTR 🛠🛠
</h1>

<p align="center">
 <img src="https://img.shields.io/static/v1?label=PRs&message=welcome&color=217EEB&labelColor=000000" alt="PRs welcome!" />
 <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=217EEB&labelColor=000000">
 
 <img src="https://img.shields.io/github/issues/willian2s/vuttr?color=217EEB&&labelColor=000000" alt="Issues" />
 <img src="https://img.shields.io/github/forks/willian2s/vuttr?color=217EEB&&labelColor=000000" alt="Forks" />
 <img src="https://img.shields.io/github/stars/willian2s/vuttr?color=217EEB&&labelColor=000000" alt="Stars" /> 
</p>

<p align="center">
  <a href="#rocket-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-como-testar">Como testar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-contribuir">Como contribuir</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

<br>

## :rocket: Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

💻 [Node.js](https://nodejs.org/)

🧰 [Typescript](https://www.typescriptlang.org/)

✅ [Jest](https://jestjs.io/)

📦 [MongoDB](https://www.mongodb.com/)

🛠 [Github Actions](https://github.com/features/actions)

:electric_plug: [Heroku](https://www.heroku.com/home)

## 💻 Projeto

Aplicação contruida para gerenciar ferramentas de produtividade, onde é possivel cadastralas com seu respectivo nome, link de acesso, descrição e tags. Utiliza autenticação JWT para maior segurança nas requisições.
O projeto está todo coberto por testes e antes do deploy ser feito, passa pelo Github Actions onde certifica que os testes estão passando e assim autoriza o deploy através do Heroku.

## :rocket: Como testar

- Clone o repositório: `git clone https://github.com/willian2s/vuttr.git`
- Instale as dependencias: `yarn install`
- Adicione as váriaveis de ambiente em: `.env`
- Caso deseje rodar os testes: `yarn test`
- Gere o build: `yarn build`
- Inicie o servidor: `yarn start`; ou
- Inicie o servidor como desenvolvedor: `yarn start:dev`
- Caso deseje, importe o arquivo `vuttr-request.json` para o insomina/postman, para ter acesso as requisições.
  - Para adicinar uma nova ferramenta, é preciso criar um novo usuário e autentica-lo, assim será gerado um token que deverá ser setado no headers da seguite forma: `x-access-token: {token}`.

## 🤔 Como contribuir

- Faça um fork desse repositório;
- Cria uma branch com a sua feature: `git checkout -b feature/minha-feature`;
- Faça commit das suas alterações: `git commit -m 'feat: Minha nova feature'`;
- Faça push para a sua branch: `git push origin feature/minha-feature`.

Depois que o merge da sua pull request for feito, você pode deletar a sua branch.

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

---

<h5 align="center">Feito com ♥ by Willian Silva</h5>
