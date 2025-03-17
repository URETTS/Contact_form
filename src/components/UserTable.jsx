import { useEffect, useState } from "react";
import "./UserTable.css"; 

const UserTable = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5001/users")
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error("Ошибка при загрузке данных:", error));
    }, []);

    return (
        <div>
            <h2>Список пользователей</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Имя пользователя</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
