<template>
  <div>
    <h1>Welcome to the homepage</h1>
    <button @click="modal.show()">Открыть модальное окно</button>
    <Transition>
      <modal-dialog :modalConfig="modal.modalConfig.value" v-if="modal.showModal.value" @modal-hide="modal.hide" @button-click="handleButtonClick"/>
    </Transition>
  </div>
</template>

<script setup lang="ts">

  const modalConfig = {
    header: {
      title: "Заголовок модального окна",
      crossButton: true,
      // timer: 20,
    },
    // backlight: "primary" || "danger",
    // icon: "/assets",
    title: {
      // text: "Заголовок",
      // type: "danger" || "primary" || "success",
    },
    text: "Текст модального окна",
    input: {
      // type: "email",
      // placeholder: "example@mail.ru",
    },
    buttons: [
      {
        text: "Кнопка 1",
        color: "primary",
        disabled: false,
      },
      // другие кнопки
    ],
  };
  const modal = useModal(modalConfig);

  const handleButtonClick = (button: { label: string }) => {
    console.log('Кликнули по кнопке:', button);
    modal.hide();
  };

</script>

<style lang="scss">
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>