import express from 'express';
import { router } from './routes/puclicApi.js';
import { userRouter } from './routes/api.js';
export const app = express();
app.disable('x-powered-by');
app.use(express.json());
const allowedRoutes = ['/api/user/register', '/api/user/login', '/api/user/current', '/api/user/logout', '/api/user/contact', '/api/user/address'];

app.use((req, res, next) => {
    if (allowedRoutes.includes(req.path)) {
        return next();
    }
    return res.status(404).json({ error: 'Not found' });
});


app.use(router);
app.use(userRouter);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
})