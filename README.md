# Team1

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ Your new, shiny [Nx workspace](https://nx.dev) is almost ready ✨.

[Learn more about this workspace setup and its capabilities](https://nx.dev/nx-api/next?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!

## Finish your CI setup

[Click here to finish setting up your workspace!](https://cloud.nx.app/connect/Amb5xOBUat)


## Run tasks

To run the dev server for your app, use:

```sh
npx nx dev team1
```

To create a production bundle:

```sh
npx nx build team1
```

To see all available targets to run for a project, run:

```sh
npx nx show project team1
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
npx nx g @nx/next:app demo
```

To generate a new library, use:

```sh
npx nx g @nx/react:lib mylib
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)


[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/nx-api/next?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:
- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Cloudflare D1 холболт (`team1-backend`)

1. D1 database үүсгэнэ:

```sh
npx wrangler d1 create team1-db
```

2. Гарч ирсэн `database_id`-г `apps/team1-backend/wrangler.toml` доторх `database_id = "..."` дээр солино.
3. Туршилтын query ажиллуулна:

```sh
npx wrangler d1 execute team1-db --command "SELECT 1"
```

4. `team1-backend` API endpoint:
`/api/hello` нь D1 рүү `SELECT datetime('now')` хийж холболт амжилттай эсэхийг JSON-оор буцаана.

Анхаарах зүйл:
- `apps/team1-backend/src/app/api/hello/route.ts` нь `binding = "DB"` гэж тохируулсан байхыг шаарддаг.
- Local Next dev дээр Cloudflare binding байхгүй үед endpoint нь алдааны тайлбар буцаана (энэ нь хэвийн).

## Cloudflare R2 холболт (`team1-backend`)

1. R2 bucket үүсгэнэ:

```sh
npx wrangler r2 bucket create team1-files
```

2. `apps/team1-backend/wrangler.toml` дотор:
`[[r2_buckets]]`, `binding = "FILES"`, `bucket_name = "team1-files"` байгаа эсэхийг шалгана.

3. Объект upload хийх:

```sh
curl -X POST http://localhost:3000/api/r2 \
  -H "Content-Type: application/json" \
  -d '{"key":"test.txt","content":"hello r2"}'
```

4. Объект унших:

```sh
curl "http://localhost:3000/api/r2?key=test.txt"
```

Анхаарах зүйл:
- Endpoint файл: `apps/team1-backend/src/app/api/r2/route.ts`
- Энэ endpoint нь `binding = "FILES"` гэж тохируулсан байхыг шаарддаг.

## Cloudflare Workers Deploy (`team1-backend`)

1. Deploy хэрэгслүүд суулгана:

```sh
npm i -D wrangler @opennextjs/cloudflare
```

2. Build:

```sh
npx opennextjs-cloudflare build
```

3. Cloudflare руу deploy:

```sh
npx opennextjs-cloudflare deploy
```

Тэмдэглэл:
- Deploy хийхээс өмнө `apps/team1-backend/wrangler.toml` доторх `name`, D1/R2 bindings зөв эсэхийг шалгана.
- `npx wrangler login` хийж Cloudflare account-даа нэвтэрсэн байх шаардлагатай.

Нэг командаар ажиллуулах script:

```sh
npm run worker:build
npm run worker:deploy
```

Тус тусад нь ажиллуулах:

```sh
npm run worker:build:backend
npm run worker:deploy:backend
npm run worker:build:frontend
npm run worker:deploy:frontend
```

## GraphQL (`team1-backend`)

Endpoint: `POST /api/graphql`
Sandbox (GraphiQL): `GET /api/graphql`

Жишээ хүсэлт:

```sh
curl -X POST http://localhost:3000/api/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"query { getHello }"}'
```

Хариу:

```json
{
  "data": {
    "getHello": "hello"
  }
}
```
