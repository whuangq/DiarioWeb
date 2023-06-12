# DiarioWeb

- Wilson Huang Quan B93929
- Yuan Isa Wu Liang B98621

## Ejecución

- modo debug: SET DEBUG=publicaciones:* ; npm start
- npm start

## Undo migration

- npx sequelize-cli db:migrate:undo
- npx sequelize-cli db:migrate:undo:all
- db:migrate:undo --name 20180704124934-create-branch.js
