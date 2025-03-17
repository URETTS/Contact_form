import { useState } from "react";
import "./Form.css";

const Form = () => {
    const [user, setUser] = useState({ username: "", email: "" });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });
        if (response.ok) {
            alert("Данные сохранены!");
            setUser({ username: "", email: "" });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                placeholder="Введите имя"
                required
            />
            <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Введите email"
                required
            />
            <button type="submit">Отправить</button>
        </form>
    );
};

export default Form;
