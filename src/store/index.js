import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';

Vue.use(Vuex);

const findTaskById = (tasks, id) => tasks.find((task) => task.id === id);

export default new Vuex.Store({
  state: {
    taskIdIncrement: 0,
    newTaskTitle: '',
    editableTask: {
      id: null,
      title: '',
    },
    tasks: [],
  },
  getters: {
    /**
     * @param state
     * @returns {Object[]}
     */
    sortedTasks(state) {
      return _.orderBy(state.tasks, 'title', 'desc');
    },

    /**
     * @param state
     * @returns {boolean}
     */
    newTaskCanBeAdded(state) {
      return state.newTaskTitle !== '';
    },

    /**
     * @param state
     * @returns {boolean}
     */
    editableTaskCanBeUpdated(state) {
      return state.editableTask.title !== '';
    },
  },
  mutations: {
    /**
     * @param state
     */
    addTask(state) {
      state.taskIdIncrement += 1;
      state.tasks.push({
        id: state.taskIdIncrement,
        title: state.newTaskTitle,
        completed: false,
      });
      state.newTaskTitle = '';
    },

    /**
     * @param state
     * @param {Number} id
     */
    removeTask(state, { id }) {
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },

    /**
     * @param state
     * @param {Number} id
     */
    toggleTaskComplete(state, { id }) {
      const task = findTaskById(state.tasks, id);

      if (task) task.completed = !task.completed;
    },

    /**
     * @param state
     * @param {Number} id
     * @param {String} title
     */
    changeTaskTitle(state, { id, title }) {
      const task = findTaskById(state.tasks, id);

      if (task) task.title = title;
    },

    /**
     * @param state
     * @param {String} title
     */
    changeNewTaskTitle(state, { title }) {
      state.newTaskTitle = title;
    },

    /**
     * @param state
     * @param {Number} id
     */
    setEditableTaskId(state, { id }) {
      state.editableTask.id = id;
    },

    /**
     * @param state
     * @param {String} title
     */
    setEditableTaskTitle(state, { title }) {
      state.editableTask.title = title;
    },
  },
});
