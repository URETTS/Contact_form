import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config(); // Загружаем переменные окружения

const app = express();
const port = 5001;

// Подключение к PostgreSQL
const pool = new pg.Pool({
    // eslint-disable-next-line no-undef
    user: process.env.DB_USER,       
    // eslint-disable-next-line no-undef
    host: process.env.DB_HOST,       
    // eslint-disable-next-line no-undef
    database: process.env.DB_NAME,   
    // eslint-disable-next-line no-undef
    password: process.env.DB_PASS,   
    // eslint-disable-next-line no-undef
    port: process.env.DB_PORT,       
});

// Middleware
app.use(cors());
app.use(express.json());

// Создание таблицы (при первом запуске)
pool.query(`
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100),
        email VARCHAR(100) UNIQUE NOT NULL
    )
`);

// Маршрут для сохранения данных
app.post("/users", async (req, res) => {
    const { username, email } = req.body;
    try {
        const newUser = await pool.query(
            "INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *",
            [username, email]
        );
        res.json(newUser.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// **Маршрут для получения всех пользователей**
app.get("/users", async (req, res) => {
    try {
        const users = await pool.query("SELECT * FROM users");
        res.json(users.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер работает на порту http://localhost:${port}`);
});
