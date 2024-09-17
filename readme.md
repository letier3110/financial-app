# Nestjs + typeorm + remix (react) template

how to run?

<!-- TECH PART -->
0. install nodejs v20 minimum
1. in `./front` run `npm run cert`. Reuse `.env.example` and tweak to your config
2. in `./api` run `npm run cert`.  Reuse `.env.example` and tweak to your config
3. run migrations in `./api` by using `npm run build` and `npm run migration:run`
4. run server using either `npm run start` on local machine in `./api` folder or using same command for remote host
5. run front  using either `npm run dev` on local machine in `./front` folder or using `npm run start` command for remote host
<!-- USER PART -->
6. Upload csv files to left form and xlsx files to right form
7. (reload page?) map accounts using mapper button
8. (reload page?) see the updates in charts