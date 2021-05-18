<template>
  <div class="app-todo-header">
    <el-form
      class="app-todo-header__form"
      @submit.native.prevent="() => $emit('create-new-task')"
    >
      <el-input
        class="app-todo-header__input"
        :value="newTaskTitle"
        clearable
        placeholder="Enter task name"
        @input="title => $emit('change-new-task-title', title)"
      />
      <el-tooltip
        content="Add task"
        placement="right"
        effect="light"
      >
        <el-button
          class="app-todo-header__submit-button"
          native-type="submit"
          :disabled="!newTaskCanBeAdded"
          icon="el-icon-plus"
          type="primary"
          circle
        />
      </el-tooltip>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AppTodoHeader',
  props: {
    newTaskTitle: {
      type: String,
      required: true,
    },
    newTaskCanBeAdded: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss">
.app-todo-header {
  &__form {
    display: flex;
  }

  &__input {
    flex: 1 1;
  }

  &__submit-button {
    margin-left: 12px;
    flex: 0 0;
  }
}
</style>
