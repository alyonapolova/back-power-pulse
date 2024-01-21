# Power Pulse 2.0

Backend для додатку про спорт та харчування.

Даний репозиторій містить бекенд-частину додатку, яка допомагає авторизованому
користувачу контролювати своє харчування та активність.

## Структура проекту

- `/controllers`: Папка з файлами-контролерами, які відповідають за обробку
  запитів від клієнта.
- `/helpers`: Папка з допоміжними функціями, які використовуються в інших
  частинах проекту.
- `/middlewares`: Папка з файлами з middleware, які використовуються для
  обробки запитів до сервера на шляху до того, як вони досягнуть основного
  обробника запиту.
- `/routes/api`: Папка з файлами, які містять реалізацію маршрутів API. Тут
  визначаються URL-шляхи та відповідні обробники, які відповідають на запити.
- `app.js`: Файл, в якому налаштовується та створюється екземпляр
  Express-додатку. Тут імпортуються необхідні модулі, налаштовуються
  middleware та підключаються роутери.
- `server.js`: Файл налаштування самого сервера. Відбувається підключення до
  бази даних та налаштування Express-сервера.

## Вимоги та Залежності

- Node.js версії v18.16.0. [Скачай і встанови](https://nodejs.org/en/) її якщо необхідно.
- npm для управління пакетами.

## Інструкції з запуску

1. Встановіть залежності: `npm install`.
2. Налаштуйте змінні середовища у файлі `.env`, з прикладу `.env.example`.
3. Запустіть сервер: `npm run start`.

## Корисні посилання

1.  [Документація API проєкту](https://power-4vwy.onrender.com/api/v1/api-docs/):
    Перегляньте документацію для отримання інформації про доступні маршрути, параметри та приклади викликів.
2.  [GitHub Репозиторій - Frontend](https://github.com/SaltyUA/power-pulse-fs):
    Ознайомтеся з вихідним кодом Frontend-частини проєкту, в якому ви знаходите веб-інтерфейс та відповідний клієнтський код.
