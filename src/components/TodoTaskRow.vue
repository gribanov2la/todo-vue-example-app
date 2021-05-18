<template>
  <div
    class="app-todo-task-row"
    :class="{'app-todo-task-row--completed': completed}"
  >
    <el-checkbox
      class="app-todo-task-row__complete-checkbox"
      @change="() => $emit('toggle-complete-task')"
      :value="completed"
    />
    <el-form
      ref="editForm"
      v-if="isEdited"
      class="app-todo-task-row__edit-form"
      @submit.native.prevent="() => editableTaskCanBeUpdated && $emit('update-editable-task')"
    >
      <el-input
        class="app-todo-task-row__edit-input"
        ref="editTaskInput"
        :value="editableTitle"
        placeholder="please enter the task name"
        @input="changedTitle => $emit('change-editable-title', changedTitle)"
      />
    </el-form>
    <span
      v-else
      class="app-todo-task-row__title"
      v-text="title"
    />
    <div class="app-todo-task-row__buttons">
      <el-tooltip
        v-if="isEdited"
        content="Save task"
        placement="left"
        effect="light"
      >
        <el-button
          size="mini"
          icon="el-icon-check"
          type="primary"
          :disabled="!editableTaskCanBeUpdated"
          @click="() => $emit('update-editable-task')"
        />
      </el-tooltip>
      <el-tooltip
        v-else
        content="Edit task"
        placement="left"
        effect="light"
      >
        <el-button
          size="mini"
          icon="el-icon-edit"
          type="primary"
          @click="() => $emit('edit-task')"
        />
      </el-tooltip>
      <el-tooltip
        content="Remove task"
        placement="right"
        effect="light"
      >
        <el-button
          size="mini"
          icon="el-icon-delete"
          type="danger"
          @click="() => $emit('remove-task')"
        />
      </el-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppTodoTaskRow',
  props: {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
    editableTitle: {
      type: String,
      default: '',
    },
    editableTaskCanBeUpdated: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    /**
     * @param {Boolean} value
     */
    isEdited(value) {
      if (value) this.$nextTick(() => this.$refs.editTaskInput.focus());
    },
  },
};
</script>

<style lang="scss">
@import "src/styles/variables";

.app-todo-task-row {
  height: 60px;
  padding: 10px 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid $--border-color-base;
  box-sizing: border-box;

  $this: &;

  &__complete-checkbox {
    flex: 0 0;
    display: block;
  }

  &__edit-form {
    display: flex;
    flex: 1 1;
    align-items: center;
    margin: 0 12px;
  }

  &__edit-input {
    flex: 1 1;
  }

  &__buttons {
    display: flex;
    align-items: center;
    flex: 0 0;
  }

  &__title {
    flex: 1 1;
    margin: 0 12px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  &--completed #{$this} {
    &__title {
      text-decoration: line-through;
    }
  }
}
</style>
