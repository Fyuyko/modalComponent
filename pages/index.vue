<script setup lang="ts">
  import {DataModalConfigType} from "@/types";
  import dataModalConfigs from "~/static/data.json";

  const modalConfig = ref<DataModalConfigType | null>(dataModalConfigs);

  // const modalConfig = {
  //   header: {
  //     title: "Заголовок модального окна",
  //     crossButton: true,
  //     // timer: 20,
  //   },
  //   // backlight: "primary" || "danger",
  //   // icon: "/assets",
  //   //title: {
  //     // text: "Заголовок",
  //     // type: "danger" || "primary" || "success",
  //   //},
  //   text: "Текст модального окна",
  //   //input: {
  //     // type: "email",
  //     // placeholder: "example@mail.ru",
  //   //},
  //   buttons: [
  //     {
  //       text: "Кнопка 1",
  //       color: "primary",
  //       disabled: false,
  //     },
  //     // другие кнопки
  //   ],
  // };

  const defaultModal = useModal(modalConfig?.value.alarmModal);

  const handleButtonClick = (button: { label: string }) => {
    console.log("Кликнули по кнопке:", button);
    defaultModal.hide();
  };
</script>

<template>
  <div>To open a modal window - click on the button below</div>
  <button @click="defaultModal.show()">Открыть модальное окно</button>
  <Transition>
    <modal-dialog :modalConfig="defaultModal.modalConfig.value" v-if="defaultModal.showModal.value" @modal-hide="defaultModal.hide" @button-click="handleButtonClick"/>
  </Transition>
</template>

<style scoped lang="scss">
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }

  button {
    background-color: lightblue;
  }
</style>