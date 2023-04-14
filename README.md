# movies-explorer-api

Бэкенд для моего дипломного проекта в Яндекс Практикуме

[Ссылка на GitHub репозиторий](https://github.com/chepash/movies-explorer-api)

## Хостинг:

- IP 158.160.26.221
- https://api.chepamovies.nomoredomains.monster

## Директории

- `/controllers` — папка с файлами контроллеров пользователя и фильмов;
- `/errors` — папка с файлами кастомных классов ошибок;
- `/middlewares` — папка с модулем проверки авторизации пользователя, логгером и обработчиком ошибок;
- `/models` — папка с файлами описания схем пользователя и фильмов;
- `/routes` — папка с файлами роутера;
- `/utils` — папка с файлами используемых констант в проекте и функций валидации.

## Запуск проекта

- `npm run start` — запускает сервер [localhost:3000](http://localhost:3000/)
- `npm run dev` — запускает сервер [localhost:3000](http://localhost:3000/) с `hot reload`;

## Работа приложения:

- При успешном ответе сервера возвращается `json` ;
- При разных запросах сервер не падает и в консоли нет ошибок;
- При запуске приложение подключается к серверу `mongo` по адресу: `mongodb://127.0.0.1:27017/bitfilmsdb`;
- В приложении описана схема пользователя с полями (все поля обязательны):

  - `name` — строка от 2 до 30 символов;
  - `email` — строка, уникальное поле;
  - `password` — строка.

- В приложении описана схема фильма с полями (все поля обязательны):

  - `country` — строка;
  - `director` — строка;
  - `duration` — число;
  - `year` — строка;
  - `description` — строка;
  - `image` — строка;
  - `trailerLink` — строка;
  - `thumbnail` — строка;
  - `owner` — `ObjectId`;
  - `movieId` — число;
  - `nameRU` — строка;
  - `nameEN` — строка;

- Все поля схем пользователя и фильма валидируются;
- В файлах схем создаются и экспортируются модели с именами `user` и `movie` ;
- При обновлении данных пользователя в `options` передаётся `new: true` ;
- Ответ сервера на запрос отправляется только один раз;
- Поле `password` не ограничено в длину, так как пароль хранится в виде хеша.
- В контроллере `createUser` почта и хеш пароля записываются в базу;
- Создание пользователя в контроллере производится вызовом метода `create` модели, без дополнительной проверки на существование пользователя, так как поле `email` в схеме отмечено как уникальное;
- Есть контроллер `login` , который проверяет полученные в теле запроса почту и пароль;
- Если почта и пароль верные, контроллер `login` создаёт `JWT`, в `payload` которого записано свойство `_id` с идентификатором пользователя.
- `JWT-токен` выпускается на определённый срок (7 дней), а не даётся бессрочно.
- В ответ на успешную авторизацию контроллер `login` возвращает клиенту созданный токен через заголовок `Set-Cookie`;
- Есть файл `middlewares/auth.js` , в нём `middleware` авторизации для проверки `JWT`.
- Роуты `/signin` и `/signup` не обрабатываются `middleware` авторизации.
- При правильном `JWT` авторизационный `middleware` добавляет в объект запроса `payload` токена и пропускает запрос дальше;
- Пользователь не может удалить фильм из избранного чужого пользователя;
- Один и тот же пользователь не может добавить новый фильм с одним и тем же `movieId`.

## Валидация данных:

- Поле `email` пользователя валидируется на соответствие паттерну почты, используются пакеты `validator` и `celebrate`;
- Поля `image`, `trailerLink` и `thumbnail` проверяются регулярным выражением как url.
- Тела запросов и, где необходимо, параметры запроса и заголовки валидируются по определённым схемам с помощью `celebrate`;
- Если запрос не соответствует схеме, обработка не должна передаётся контроллеру, клиент получает ошибку валидации;
- В контроллере отсутсвует валидации данных, если она описана с помощью `celebrate`;

## Приложение корректно обрабатывает запросы по следующим роутам:

- `POST /signin` — создаёт `JWT` и возвращает его в куки;
- `GET /signout` — чистит куки клиента;
- `POST /signup` — создаёт пользователя с переданными в теле запроса данными (все поля обязательны):

  - `email`
  - `password`,
  - `name`,

- `PATCH /users/me` — обновляет профиль пользователя;
- `GET /users/me` — возвращает данные авторизованного пользователя;

- `GET /movies` — возвращает все фильмы, добавленные в избранное, авторизованного пользователя;
- `POST /movies` — устанавливает поле `owner` для фильма равного `_id` всзятых из `payload`, создаёт фильм с переданными в теле запроса полями (все поля обязательны):

  - `country`,
  - `director`,
  - `duration`,
  - `year`,
  - `description`,
  - `image`,
  - `trailerLink`,
  - `thumbnail`,
  - `owner`,
  - `movieId`,
  - `nameRU`,
  - `nameEN`,

- `DELETE /movies/:_id` — удаляет фильм из избранного по `_id`;

## Обработка ошибок в приложении:

- Если в любом из запросов что-то идёт не так, сервер возвращает ответ с ошибкой и соответствующим ей статусом:

  - `400` — переданы некорректные данные в методы создания фильма, пользователя, обновления профиля;
  - `401` — передан неверный логин или пароль. Также эту ошибку возвращает авторизационный `middleware`, если передан неверный `JWT`;
  - `403` — попытка удалить фильм из чужой коллекции избранного;
  - `404` — фильм или пользователь не найден или был запрошен несуществующий роут;
  - `409` — при регистрации или обновлении профиля указан `email`, который уже существует на сервере;
  - `500` — ошибка по умолчанию. Сопровождается сообщением: «General problem with the server».

- Статусы ошибок и тексты ответов вынесены в константы;
- Для всех, перечисленных выше, ошибок созданы классы конструкторы ошибок, наследуемые от `Error`;
- Не дублируются классы конструкторы ошибок с одинаковым статус-кодом;
- Во всех контроллерах предусмотрена гарантированная отправка сообщения об ошибке;
- Реализована централизованная обработка ошибок в единой `middleware`. Все ошибки проходят через централизованный обработчик `appErrorHandler`;
- Ошибки валидация входных данных отлавливаются встроенным в `celebrate` обработчиком ошибок `celebrate.error()`;
- При обработке ошибок в блоке `catch` они не выбрасываются через `throw` , а передаются в централизованный обработчик ошибок с помощью `next`.

## Дополнительные нюансы

- При написании кода проекта использовался `eslint`;
- Настройки `eslint` расширяют конфигурацию `airbnb-base`;
- Используется модуль `Helmet` для установки заголовков, связанных с безопасностью;
- Настроен `rate limiter`: число запросов с одного `IP` в единицу времени ограничено (максимум 100 запросов в 15 минут);
- Настроено логгирование:
  - запросы и ответы записываются в файл `request.log` до использования `rate limiter`;
  - ошибки записываются в файл `error.log`;
  - момент запуска сервера и режим работы("production" или "development") фиксируются в файл app.log;
  - логи ограничены размером в 1мб;
  - при достижения ограничения по размеру, создаётся новый файл логов. Максимум 5 файлов;
  - файлы логов не добавляются в репозиторий.
