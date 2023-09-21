<script setup lang="ts">
  import {DataModalConfigType} from "@/types";
  import dataModalConfigs from "~/static/data.json";

  const modalConfig = ref<DataModalConfigType | null>(dataModalConfigs);

  // описание полей
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

  const defaultModal = useModal(modalConfig?.value.defaultModal);
  const alarmModal = useModal(modalConfig?.value.alarmModal);

  const modals = [defaultModal, alarmModal];

  const handleButtonClick = (button: string) => {
    console.log("Кликнули по кнопке:", button);

    modals.forEach(modal => {
      modal.hide();
    })
  };
</script>

<template>
  <div>To open a modal window - click on the button below</div>
  <div class="buttons">
    <button @click="defaultModal.show()">Открыть обычное модальное окно</button>
    <button @click="alarmModal.show()">Открыть модальное окно с ошибкой</button>
  </div>
  <Transition>
    <modal-dialog :modalConfig="defaultModal.modalConfig.value" v-if="defaultModal.showModal.value" @modal-hide="defaultModal.hide" @button-click="handleButtonClick"/>
  </Transition>
  <Transition>
    <modal-dialog :modalConfig="alarmModal.modalConfig.value" v-if="alarmModal.showModal.value" @modal-hide="alarmModal.hide" @button-click="handleButtonClick"/>
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

  .buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;

    margin-top: 30px;
  }

  button {
    background-color: lightblue;
  }
</style>