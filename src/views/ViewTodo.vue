<template>
  <div class="app-view-todo">
    <el-card class="app-view-todo__card">
      <app-todo-header
        :new-task-can-be-added="newTaskCanBeAdded"
        :new-task-title="newTaskTitle"
        @create-new-task="onCreateNewTask"
        @change-new-task-title="onChangeNewTaskTitle"
      />
      <template v-if="sortedTasks.length">
        <app-todo-task-row
          v-for="task in sortedTasks"
          :key="task.id"
          :id="task.id"
          :title="task.title"
          :completed="task.completed"
          :editable-title="checkTaskIsEditable(task.id) ? editableTask.title : ''"
          :is-edited="checkTaskIsEditable(task.id)"
          :editable-task-can-be-updated="editableTaskCanBeUpdated"
          @update-editable-task="() => onUpdateEditableTask(task.id)"
          @change-editable-title="onChangeEditableTitle"
          @edit-task="() => onEditTask(task.id, task.title)"
          @remove-task="() => onRemoveTask(task.id)"
          @toggle-complete-task="() => onToggleCompleteTask(task.id)"
        />
      </template>
      <div
        v-else
        class="app-view-todo__no-tasks-text"
        v-text="'There are no tasks'"
      />
    </el-card>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapState } from 'vuex';
import AppTodoHeader from '@/components/TodoHeader.vue';
import AppTodoTaskRow from '@/components/TodoTaskRow.vue';

export default {
  name: 'AppViewTodo',
  components: { AppTodoTaskRow, AppTodoHeader },
  computed: {
    ...mapState([
      'newTaskTitle',
      'editableTask',
    ]),

    ...mapGetters([
      'sortedTasks',
      'newTaskCanBeAdded',
      'editableTaskCanBeUpdated',
    ]),
  },
  methods: {
    ...mapMutations([
      'addTask',
      'removeTask',
      'changeNewTaskTitle',
      'changeTaskTitle',
      'toggleTaskComplete',
      'setEditableTaskId',
      'setEditableTaskTitle',
    ]),

    /**
     * @param {Number} id
     * @returns {boolean}
     */
    checkTaskIsEditable(id) {
      return this.editableTask.id === id;
    },

    /**
     * @param {String} title
     */
    onChangeNewTaskTitle(title) {
      this.changeNewTaskTitle({ title });
    },

    onCreateNewTask() {
      this.addTask();
    },

    /**
     * @param {Number} id
     */
    onUpdateEditableTask(id) {
      this.changeTaskTitle({ id, title: this.editableTask.title });
      this.setEditableTaskId({ id: null });
      this.setEditableTaskTitle({ title: '' });
    },

    /**
     * @param {String} title
     */
    onChangeEditableTitle(title) {
      this.setEditableTaskTitle({ title });
    },

    /**
     * @param {Number} id
     * @param {String} title
     */
    onEditTask(id, title) {
      this.setEditableTaskId({ id });
      this.setEditableTaskTitle({ title });
    },

    /**
     * @param {Number} id
     */
    onRemoveTask(id) {
      this.removeTask({ id });
    },

    /**
     * @param {Number} id
     */
    onToggleCompleteTask(id) {
      this.toggleTaskComplete({ id });
    },
  },
};
</script>

<style lang="scss">
.app-view-todo {
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;

  &__no-tasks-text {
    text-align: center;
    height: 60px;
    line-height: 60px;
  }

  &__card {
    margin: 100px 0 0;
    max-width: 1000px;
    width: 100%;
  }
}
</style>
