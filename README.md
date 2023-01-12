# Epic-Movie-Quotes App

---

Before getting started checkout [Epic-Movie-Quotes-Api](https://github.com/LevaniBulatsashvili/Epic-Movie-Quotes-Api) for backend implementation <br>
Epic-Movie-Quotes App allows users to sign up and view, create, edit or even delete movies and their quotes. additionally users can also view, comment or even like quotes made by other people!

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Development](#development)

---

## Prerequisites

- vue@3.2.41 and up
- npm@v14.20.0 and up
- pinia@2.0.23 and up
- vee-validate@4.7.2 and up
- vue-i18n@9.2.2 and up
- laravel-echo@1.14.2 and up

---

## Tech Stack

- [vue@3.x](https://vuejs.org/) front framework
- [Laravel@9.x](https://laravel.com/docs/9.x) backend framework
- [Vee-Validate](https://vee-validate.logaretm.com/v4/) - package for validation
- [vue-i18n](https://vue-i18n.intlify.dev/guide/) - package for translations
- [laravel-echo](https://www.npmjs.com/package/laravel-echo) - package for broadcasting

---

## Getting Started

1. First of all you need to clone Epic-Movie-Quotes repository from github:

```
git clone https://github.com/RedberryInternship/levan-bulatsashvili-epic-movie-quotes
```

2. And now you should provide .env file all the necessary environment variables:

```
cp .env.example .env
```

> VITE_PUSHER_APP_KEY=

> VITE_PUSHER_APP_CLUSTER=

> VITE_BACKEND_API_BASE_URL=

> VITE_BACKEND_URL=

3. after setting up .env file, it's time to install all the JS dependencies:

```
npm install
```

and also:

```
npm run build
```

## Development

finally:

run Vue's built-in development server by executing:

```
npm run dev
```
