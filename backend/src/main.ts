import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
const app = await NestFactory.create(AppModule);

console.log(
'FRONTEND_URL:',
process.env.FRONTEND_URL,
);

app.enableCors({
origin: [
'http://localhost:3000',
'https://property-listing-platform-ten.vercel.app',
],
methods: [
'GET',
'POST',
'PUT',
'PATCH',
'DELETE',
'OPTIONS',
],
credentials: true,
});

app.useGlobalPipes(
new ValidationPipe({
whitelist: true,
forbidNonWhitelisted: true,
transform: true,
}),
);

const swaggerConfig =
new DocumentBuilder()
.setTitle('Property Listing API')
.setDescription(
'Multi-tenant property listing platform API',
)
.setVersion('1.0')
.addBearerAuth()
.build();

const document =
SwaggerModule.createDocument(
app,
swaggerConfig,
);

SwaggerModule.setup(
'api',
app,
document,
);

const port =
Number(process.env.PORT) || 5000;

await app.listen(port);

console.log(
`Server running on port ${port}`,
);

console.log(
`Swagger docs available at /api`,
);
}

bootstrap();
