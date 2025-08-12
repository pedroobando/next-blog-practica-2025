This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Blog

Una apps de ejercicio de un blog, esto es parte del curso de Fernando Herrera, adactada a Julio 2025. Esta aplicacion va ser algo sencillo:

- Prisma
- SQLite
- Authenticacion Auth.js

## Instalacion de [shadcn](https://ui.shadcn.com/docs/installation/next)

```
pnpm dlx shadcn@latest init
```

## Instalacion de prisma

Todo esta es sacado de la guia de instalacion de prima a [next with prisma](https://www.prisma.io/docs/guides/nextjs)

1.- Instalacion de [Prisma ORM](https://www.prisma.io/docs/guides/nextjs)

```
pnpm add prisma tsx --save-dev
pnpm add @prisma/client
```

```
pnpx prisma init --datasource-provider sqlite --output ../src/prisma/gen

```

- Esto generara un archivo `.env` con la siguiente variable `DATABASE_URL`, para colocar la direccion de la base de datos

  2.- Creacion de la base de datos, mediante el archivo docker-compose.yml

```
sudo docker compose up -d
```

3.- Configurar los datos para la variable `DATABASE_URL`

```
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```

4.- Ejecutar el comando `prisma migrate`, para asi realizar la migracion del schema que se encuentra en schema de prisma a la base de datos.

```
pnpx prisma migrate dev --name init
```

Generar el cliente de prisma, es como nos vamos a conectar a la base de datos y utilizarla dentro de la aplicacion

```
pnpx prisma generate
```

Una vez generado el prismaCliente con el anterior comando. [Set up Prisma Client](https://www.prisma.io/docs/guides/nextjs#25-set-up-prisma-client) dependiendo si es postgres u otra base de datos esto cambia.

**lib/prisma.ts**

```
import { PrismaClient } from '../app/generated/prisma'
import { withAccelerate } from '@prisma/extension-accelerate'

const globalForPrisma = global as unknown as {
    prisma: PrismaClient
}

const prisma = globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate())

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
```

_Con este clientePrisma, es el que utilizaremos para conectarnos a la base de datos._

---

Con este comando se reinicia todo, desde cero o desde el principio **Mucho cuidado** `prisma migrate reset`

```
pnpx prisma migrate reset

```

5.- Poblar la base de datos de postgres, en apirest seed

```
http://localhost:5173/api/seed
```

## Instalacion de Auth.js o [Next-Auth ](https://www.npmjs.com/package/next-auth)

Todo esto es estraido de la instalacion para [next.js](https://authjs.dev/getting-started/installation?framework=pnpm)

Hasta el momento la mejor libreria de Authentication & Autorization, open source & free. Pagina oficial [Auth.js](https://authjs.dev)

1. Instalacion, a pesar que es beta, funciona muy bien

```
pnpm add next-auth@beta
```

### Configuracion del ambiente

2. Creacion de la variable `AUTH_SECRET` en **.env.local** y asignacion la variable al archivo **.env**, esto se crea con el siguiente comando:

```
pnpx auth secret
```

### Configuracion de rutas y archivos

> [!note] Dentro de la carpeta **lib**, cree una carpeta llamada **auth** y ahi, coloque los dos archivos _auth.ts_ y _middleware.ts_, luego agrege un archivo index.ts para exponer sus metodos y/o propiedades. Es parecido a lo que hace fernando herrera en su curso, pero ha cambiado un poco.

3. Creacion del archivo `src/lib/auth.ts` con el siguiente contenido:

```
import NextAuth, { NextAuthConfig } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

export const authOptions: NextAuthConfig = {
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID ?? '',
      clientSecret: process.env.AUTH_GITHUB_SECRET ?? '',
    }),
  ],
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
```

4. Creacion del archivo `/middleware.ts`

```
export { auth as middleware } from "@/lib/auth"
```

5. Agregar el manejador de ruta bajo la carpeta `/app/api/auth/[...nextauth]/route.ts`
   > [!info] \[...nextauth\] esto indica que cualquier ruta que provenga de api/auth, va se manejada por aqui o pasara por aqui.

```
import { handlers } from "@/lib/auth" // Referring to the auth.ts we just created
export const { GET, POST } = handlers
```

### Dependiendo del proveedor de autenticacion, google, github, facebook, se va creado o asignando las variables. Para esta caso se realizara con `GitHub`

Agregando estas variables a archivo **.env** y configurando las variables con su proveedor.

```
AUTH_GITHUB_ID={CLIENT_ID}
AUTH_GITHUB_SECRET={CLIENT_SECRET}
```

Una vez que tenemos las llaves de GitHub, existe una opcion llamada `Authorization callback URL`, en ese cuadro de texto vamos a colocar:

```
http://localhost:3000/api/auth/callback/github
```

> [!tip] Regularmente vamos a cambiar el proveedor, porque la ruta es la misma `http://localhost:3000/api/auth/callback/`, githbub, google, facebook, etc.

Para [Google](https://console.cloud.google.com/apis/credentials), la configuracion ser realiza en esta pagina

### Conectando los adaptadore a [Auth.js](https://authjs.dev/getting-started/adapters/prisma)

Como estamos trabajando con prisma, conectaremos prisma.

1. instalacion de paquetes

```
pnpm add @prisma/client @auth/prisma-adapter
pnpm add prisma --save-dev
```

> [!note] La contrase~na del usuario que se creea en seed =\> email: test1@gmail.com, password: 123456
