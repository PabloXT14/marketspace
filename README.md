<h1 align="center">
  <img
    src=".github/marketspace-logo.svg"
    title="Marketspace"
    alt="Marketspace"
  />

  Marketspace
</h1>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/pabloxt14/marketspace">

  <img alt="GitHub Top Language" src="https://img.shields.io/github/languages/top/pabloxt14/marketspace" />

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/pabloxt14/marketspace">
  
  <a href="https://github.com/pabloxt14/marketspace/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/pabloxt14/marketspace">
  </a>
    
   <img alt="License" src="https://img.shields.io/badge/license-MIT-blue">

   <a href="https://github.com/pabloxt14/marketspace/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/pabloxt14/marketspace?style=social">
  </a>
</p>

<p>
  <img src=".github/cover.png" alt="Capa do projeto" />
</p>

<h4 align="center"> 
	🚀 Aplicação finalizada 🚀
</h4>

<p align="center">
 <a href="#-about">About</a> | 
 <a href="#-layout">Layout</a> | 
 <a href="#-setup">Setup</a> | 
 <a href="#-technologies">Technologies</a> | 
 <a href="#-license">License</a>
</p>


## 💻 About

Esta aplicação de nome **Marketspace** consiste basicamente em um aplicativo mobile de compra e venda de itens novos e/ou usados, além de você poder fazer alterações nos seus produtos cadastrados.

Os principais conhecimentos aplicados nesta aplicação foram:
- Utilização da lib de componentes do `Gluestack UI`;
- Consumo de API na aplicação (para `sign-up` e `sign-in`, etc);
- Utilização do `Zustand` para gerenciamento de estados globais na aplicação;

<!-- ## 🔗 Deploy

O deploy da aplicação pode ser acessada através da seguinte URL base: https://pabloxt14-nlw-expert-notes.vercel.app/ -->


## 🎨 Layout

Você pode visualizar o layout do projeto através [desse link](https://www.figma.com/file/CIvhyoji2zASYQKFGeWUEn/Marketspace/duplicate). É necessário ter conta no [Figma](https://www.figma.com/) para acessá-lo.

A seguir, veja uma demonstração das principais telas da aplicação:

### Sign In

<p align="center">
  <img
    src=".github/screens/sign-in.png"
    alt="Sign In Screen"
    title="Sign In Screen"
  />
</p>

### Sign Up

<p align="center">
  <img
    src=".github/screens/sign-up.png"
    alt="Sign Up Screen"
    title="Sign Up Screen"
  />
</p>

### Home

<p align="center">
  <img
    src=".github/screens/home.png"
    alt="Home Screen"
    title="Home Screen"
  />
</p>

### Home Filter

<p align="center">
  <img
    src=".github/screens/home-filter.png"
    alt="Home Filter Screen"
    title="Home Filter Screen"
  />
</p>

### Product Details

<p align="center">
  <img
    src=".github/screens/product-details.png"
    alt="Product Details Screen"
    title="Product Details Screen"
  />
</p>

### My Products

<p align="center">
  <img
    src=".github/screens/my-products.png"
    alt="My Products Screen"
    title="My Products Screen"
  />
</p>

### My Product Details

<p align="center">
  <img
    src=".github/screens/my-product-details.png"
    alt="My Product Details Screen"
    title="My Product Details Screen"
  />
</p>

### My Product Details (deactivated)

<p align="center">
  <img
    src=".github/screens/my-product-details-deactivated.png"
    alt="My Product Details (deactivated) Screen"
    title="My Product Details (deactivated) Screen"
  />
</p>

### Create Product

<p align="center">
  <img
    src=".github/screens/create-product.png"
    alt="Create Product Screen"
    title="Create Product Screen"
  />
</p>

### Create Product (filled)

<p align="center">
  <img
    src=".github/screens/create-product-filled.png"
    alt="Create Product (filled) Screen"
    title="Create Product (filled) Screen"
  />
</p>

### Product Preview

<p align="center">
  <img
    src=".github/screens/product-preview.png"
    alt="Product Preview Screen"
    title="Product Preview Screen"
  />
</p>

### Edit Product

<p align="center">
  <img
    src=".github/screens/edit-product.png"
    alt="Edit Product Screen"
    title="Edit Product Screen"
  />
</p>

## ⚙ Setup

### 📝 Requisites

Antes de baixar o projeto você vai precisar ter instalado na sua máquina as seguintes ferramentas:

* [Git](https://git-scm.com)
* [NodeJS](https://nodejs.org/en/)
* [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/) 
* Para reproduzir o acesso a API back-end com os dados necessários para o front-end, clone o seguinte [repositório](https://github.com/pabloxt14/nlw-journey-node) que contem a API do nosso back-end feita em Node.js e execute na sua máquina.

Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### Cloning and Running

Passo a passo para clonar e executar a aplicação na sua máquina:

```bash
# Clone este repositório
$ git clone git@github.com:pabloxt14/marketspace.git

# Acesse a pasta do projeto no terminal
$ cd marketspace/mobile

# Instale as dependências
$ npm install

# Execute a API back-end
$ cd ../api
$ npm install
$ npm run start

# Execute a aplicação em modo de desenvolvimento
$ npm run start
```


## 🛠 Technologies

As seguintes principais ferramentas foram usadas na construção do projeto:

- **[React Native](https://reactnative.dev/)**
- **[Expo](https://expo.dev/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Phosphor Icons](https://phosphoricons.com/)**
- **[Axios](https://axios-http.com/ptbr/docs/intro)**
- **[Bottom Sheet](https://github.com/gorhom/react-native-bottom-sheet)**
- **[Expo Image Picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)**
- **[Nativewind](https://www.nativewind.dev/)**
- **[Gluestack UI](https://gluestack.io/ui/docs/home/overview/introduction)**
- **[Zod](https://zod.dev/)**
- **[Zustand](https://zustand-demo.pmnd.rs/)**

> Para mais detalhes das dependências gerais da aplicação veja o arquivo [package.json](./mobile/package.json)


## 📝 License

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](./LICENSE) para mais informações

<p align="center">
  Feito com 💜 por Pablo Alan 👋🏽 <a href="https://www.linkedin.com/in/pabloalan/" target="_blank">Entre em contato!</a>  
</p>