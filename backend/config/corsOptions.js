export const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:3001', 'https://messmanagement.vercel.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'x-auth-token'],
    optionsSuccessStatus: 200
}
