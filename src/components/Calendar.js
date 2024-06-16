import React from 'react';
import { useAppContext } from '../context/AppContext';
import './Calendar.css';

function Calendar() {
  const { selectedDate, setSelectedDate, todos } = useAppContext();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysInMonth = (month, year) => {
    let days = [];
    let firstDayOfMonth = new Date(year, month, 1);
    let lastDayOfMonth = new Date(year, month + 1, 0);

    // 이전 달의 날짜 채우기
    for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
      days.unshift(new Date(year, month, -i).setHours(0, 0, 0, 0));
    }

    // 이번 달의 날짜 채우기
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      days.push(new Date(year, month, day).setHours(0, 0, 0, 0));
    }

    // 다음 달의 날짜 채우기
    for (let i = 1; i < 7 - lastDayOfMonth.getDay(); i++) {
      days.push(new Date(year, month + 1, i).setHours(0, 0, 0, 0));
    }

    return days;
  };

  const monthDays = daysInMonth(selectedDate.getMonth(), selectedDate.getFullYear());

  return (
      <div className="calendar-container">
        <table className="calendar-table">
          <thead>
          <tr>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <th key={day}>{day}</th>)}
          </tr>
          </thead>
          <tbody>
          {Array.from({ length: 6 }, (_, week) => (
              <tr key={week}>
                {monthDays.slice(week * 7, (week + 1) * 7).map((day, index) => {
                  const dayDate = new Date(day);
                  const isToday = today.getTime() === dayDate.getTime();
                  const isSelectedDay = selectedDate.getTime() === dayDate.getTime();
                  const isCurrentMonth = dayDate.getMonth() === selectedDate.getMonth();
                  const mainCount = todos.filter(todo => new Date(todo.date).getTime() === dayDate.getTime()).length;
                  const subCount = todos.reduce((acc, todo) => {
                    const todoDate = new Date(todo.date);
                    todoDate.setHours(0, 0, 0, 0);
                    if (todoDate.getTime() > dayDate.getTime() && dayDate.getTime() >= today.getTime()) {
                      return acc + 1;
                    }
                    return acc;
                  }, 0);

                  const dayClass = `calendar-day ${isToday ? "today" : ""} ${isSelectedDay ? "selected" : ""} ${!isCurrentMonth ? "not-current-month" : ""}`;

                  return (
                      <td key={index} className={dayClass} onClick={() => setSelectedDate(dayDate)}>
                        <div>
                          <div>{`${dayDate.getMonth() + 1}월 ${dayDate.getDate()}일`}</div>
                          <div className="todo-counts">Main: {mainCount}, Sub: {subCount}</div>
                        </div>
                      </td>
                  );
                })}
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
}

export default Calendar;
