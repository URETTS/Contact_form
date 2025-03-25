# Используем Node.js образ
FROM node:18

# Создаем рабочую директорию
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем весь код сервера
COPY . .

# Указываем порт
EXPOSE 5001

# Запускаем сервер
CMD ["node", "server.js"]
