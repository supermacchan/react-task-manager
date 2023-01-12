import { useSelector } from "react-redux";
import { selectTasks, selectFilter } from "redux/selectors";
import { statusFilters } from "redux/constants";
import { Task } from "components/Task/Task";
import css from "./TaskList.module.css";

// функция для фильтра задач по статусу
const getVisibleTasks = (tasks, statusFilter) => {
  switch (statusFilter) {
    case statusFilters.active:
      return tasks.filter(task => !task.completed);
    case statusFilters.completed:
      return tasks.filter(task => task.completed);
    default:
      return tasks;
  }
}

export const TaskList = () => {
  // получаем все задачи
  const tasks = useSelector(selectTasks);
  // из стейта получаем активное состояние фильтра
  const filterStatus = useSelector(selectFilter);
  // фильтруем задачи в зависимости от выставленного фильтра
  const visibleTasks = getVisibleTasks(tasks, filterStatus);

  return (
    <ul className={css.list}>
      {/* рендерим отфильтрованные задачи */}
      {visibleTasks.map(task => (
        <li className={css.listItem} key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
};