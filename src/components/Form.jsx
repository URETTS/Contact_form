import { useState } from "react";
import "./Form.css"; // Подключаем стили

const Form = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(""); // Для отображения результата

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = { username, email };

        try {
            const response = await fetch("http://localhost:5001/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Успешно сохранено в БД:", data);
                setMessage("Данные успешно отправлены!");
                setUsername("");
                setEmail("");
            } else {
                throw new Error("Ошибка при сохранении данных");
            }
        } catch (error) {
            console.error("Ошибка:", error);
            setMessage("Ошибка при отправке данных!");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Имя пользователя:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <button type="submit">Отправить</button>
            </form>

            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default Form;
