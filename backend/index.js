import app from './src/app.js';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' })

const PORT = process.env.APP_PORT || 3001;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});