<script setup lang="ts">
  import {PropType} from "@vue/runtime-core";

  type ModalButton = {
    text: string;
    color: "primary" | "danger" | "success";
    disabled?: boolean;
  };
  defineProps({
    modalConfig: {
      type: Object as PropType<{
        header: {
          title: "Заголовок модального окна",
          crossButton?: boolean,
          timer?: number,
        },
        backlight?: "primary" | "danger",
        icon?:  string,
        title?: {
          text: string;
          type: "danger" | "primary" | "success";
        };
        text: string;
        input?: {
          type: string,
          placeholder: string;
        };
        buttons?: ModalButton[];
      }>,
      required: true,
    },
  });
  const emits = defineEmits(["button-click", "modal-hide"]);
  function handleButtonClick(button: ModalButton) {
    emits("button-click", button);
  }
</script>

<template>
  <div class="modal">
    <div class="modal-header">
      <h2>{{modalConfig.header?.title}}</h2>
      <button v-if="modalConfig.header.crossButton" @click="emits('modal-hide')">×</button>
    </div>
    <div class="modal-body">
      <div v-if="modalConfig.header?.timer">
        {{modalConfig.header.timer}}
        <!-- Здесь добавить таймер -->
      </div>
      <div v-if="modalConfig.icon">
        <img :src="modalConfig.icon" alt="">
      </div>
      <div v-if="modalConfig.title">
        <p :style="{color: modalConfig.title.type}">{{modalConfig.title.text}}</p>
      </div>
      <p>{{ modalConfig.text }}</p>
      <div v-if="modalConfig.input">
        <input :type="modalConfig.type" :placeholder="modalConfig.input.placeholder">
      </div>
    </div>
    <div class="modal-footer" v-if="modalConfig.buttons">
      <button
          v-for="(button, index) in modalConfig.buttons"
          :key="index"
          :class="button.color"
          @click="handleButtonClick(button)"
      >
        {{button.text}}
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>