// server/server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;

// MongoDB 연결 설정
mongoose.connect('mongodb://localhost:27017/todoapp', { useNewUrlParser: true, useUnifiedTopology: true });

const TodoSchema = new mongoose.Schema({
  date: Date,
  text: String,
  completed: Boolean
});

const Todo = mongoose.model('Todo', TodoSchema);

app.use(bodyParser.json());

// 모든 Todo 가져오기
app.get('/todo', async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todos', error });
  }
});

// 특정 날짜의 Todo 가져오기
app.get('/todo/:date', async (req, res) => {
  const date = new Date(req.params.date);
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + 1);

  try {
    const todos = await Todo.find({ date: { $gte: date, $lt: nextDate } });
    res.status(200).json(todos);
  } catch (error) {
    res.status500().json({ message: 'Error fetching todos for the date', error });
  }
});

// Todo 저장하기 (MongoDB와 파일 시스템에 저장)
app.post('/todo', async (req, res) => {
  const { todos } = req.body;

  try {
    // MongoDB에 저장
    await Todo.deleteMany({});
    const result = await Todo.insertMany(todos);

    // 파일 시스템에 저장
    const filePath = path.join(__dirname, 'todos.json');
    fs.writeFile(filePath, JSON.stringify(todos, null, 2), (err) => {
      if (err) {
        console.error('Error saving data to file:', err);
        return res.status(500).json({ message: 'Failed to save data to file' });
      }
      console.log('Data saved to file successfully');
    });

    res.status(200).json({ message: 'Todos saved successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Error saving todos', error });
  }
});

// JSON 파일 읽어서 클라이언트로 전송하기
app.get('/read-json', (req, res) => {
  const filePath = path.join(__dirname, 'todos.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data from file:', err);
      return res.status(500).json({ message: 'Failed to read data from file' });
    }
    res.status(200).json(JSON.parse(data));
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
