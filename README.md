


<div align="center">
  <img src="https://github.com/FormBee/FormBee/blob/main/client/FormBee/src/assets/FormBee%20(1).png" alt="FormBee" width="200" style="margin-left:200px;"/>
<h1>Form Data Handling Made Easy.</h1>
<h3>The open-source form backend for data privacy conscious developers.</h3>
</div>

---

<h1>Notice: The hosted formbee.dev site is now offline as of July 2026. This repository remains open source for anyone to continue to self host the service.</h1>

<h2>🐝 Overview</h2>

<p>FormBee is an easy way to send form data that is submitted on your website to your email, Telegram, Webhooks, Etc. It is a "Form Backend" which means it allows you to have functional forms that send places without having to write any server side code yourself!</p>

---

## Table of Contents
- ✨ [Features](#-features)
- 🏠 [Self Hosting](#-self-hosting)
- 🔧 [Installation/Run Locally](#-installationrun-locally)
   - 👨‍💻 [Client Side](#-client-side)
   - 🖥 [Server Side](#-server-side)
- 🌱 [Contributing](#-contributing)
- 🛠 [Tech Stack](#-tech-stack)
- 📜 [License](#-license)

---

<h2>✨ Features</h2>

<ul>
  <li>🌍 <b>Open Source</b>: Free to use, modify, and contribute.</li>
  <li>🔌 <b>Plugins</b>: Easily send your form data to email, <a>Make.com</a>, <a>Telegram</a>, <a>n8n</a>, <a>Discord</a>, or <a>Webhooks</a></li>
  <li>🔒 <b>Captcha</b>: Protect your forms from spam with our (PoW) Proof Of Work captchas.</li>
  <li>🔑 <b>White List Domains</b>: Prevent others from using your form backend by whitelisting domains.</li>
  <li>↩️ <b>Automatic return emails </b>: Automatically send return emails to people who submit your forms.</li>
  <li>➕ <b>More Features </b>: FormBee has more to offer than we can fit in here! This is a work in progress passion project!</li>
</ul>

---

<h2>🏠 Self Hosting</h2>
<p>We want to make it as easy as possible to self host! In the <code>docker-images</code> folder of the project you will find many variations of the backend you can host, so you can host just what you want, without the bloat of the things you don't want. This is a work in progress, and we're constantly working on adding more. You can read more about self hosting in the <a href="https://docs.formbee.dev/docs/category/self-hosting">Official Formbee self-hosting docs</a>. The docs will walk you through pulling the docker images, and running them with the correct environmental variables, then you can host them wherever you like to host your containers!</p>

<h3>🚆 Railway</h3>
<p>Formbee has official templates on Railway to make self hosting different Formbee backends as simple as clicking deploy and typing in a few environmental variables.</p>
<ul>
  <li>📧 <b><a href="https://railway.app/template/NR9kSH">Email Only Template</a></b>: Host just a backend for recieving form data to your email.</li>
</ul>

---

<h2>🔧 Installation/Run Locally</h2>

Clone the repo: 
```bash
git clone https://github.com/FormBee/FormBee.git
```

FormBee is a monorepo, here are instructions for both the frontend and the backend.

## 👨‍💻 Client Side

Enter client directory: 
```bash
cd FormBee\client\FormBee
```

Install dependencies: 
```bash
npm install
```

Make your way to ```src/app/global-vars.ts``` and change fetchUrl to ```http://localhost:3000```

Run client side: 
``` bash
ng serve
```

**With that, the client side should be running, go to [localhost:4200](http://localhost:4200).**
## 🖥 Server Side

Enter server directory: 
```bash
cd FormBee/server/formbee
```

Install Dependencies: 
```bash
npm install
```

Copy .env.example: 
```bash
cp .env.example .env
```

Configure your .env with your test database credentials (modify the ```DEV_DB``` env variables.)
The EMAIL env variables you see are for configuring the email which sends submission emails.

Make your way to ```src/data-source.ts``` and comment out the second AppDataSource (Prod env vars), and uncomment the first AppDataSource (Dev env vars).
Lastly, make your way to ```src/index.ts``` and change the redirectUrl variable to ```http://localhost:4200```, this is for CORS.

Finally 
```bash
npm run dev
```

**With that the server should be running.**

---

<h2>🛠 Tech Stack</h2>
<table> 
  <tr> 
    <td>
      <b>Frontend</b>
    </td> 
    <td>Angular</td> 
  </tr> <tr> <td><b>Backend</b></td> 
    <td>Node.js/Express</td> </tr> <tr> 
      <td><b>Database</b></td> 
      <td>Postgres/TypeORM</td> </tr> <tr> 
        <td><b>Styling</b></td> 
        <td>SCSS/CSS</td> </tr> 
</table>

---



<h2>📜 License</h2> <p>This project is licensed under the MIT License.</p>

---

<div align="center"> <a href="https://github.com/Formbee/Formbee/issues"> <img alt="Issues" src="https://img.shields.io/github/issues/Formbee/Formbee?color=brightgreen"/> </a> <a href="https://github.com/Formbee/Formbee"> <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/Formbee/Formbee?style=social"/> </a> </div>
<p align="center"><i>Give it a go and recieve your form submissions easier than you ever have before.</i></p>
