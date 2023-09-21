<script setup lang="ts">
  import {PropType} from "@vue/runtime-core";

  import {ModalButton, ModalConfigType} from "~/types";
  import ModalTimer from "~/components/modal/modalTimer.vue";
  const props = defineProps({
    modalConfig: {
      type: Object as PropType<ModalConfigType>
    }
  });
  const emits = defineEmits(["button-click", "modal-hide"]);

  const num = ref(props.modalConfig?.header.timer);
  function updateTimer() {
    if (num.value > 0) {
      num.value -= 1;
    } else if (num.value === 0) {
      emits("modal-hide");
    }
  }

  function handleButtonClick(button: ModalButton) {
    emits("button-click", button);
  }

  const overlay = ref(null);
  function closeOnClickOutside(e: Event) {
    const eventTarget = e.target;

    if (eventTarget === overlay.value) {
      emits("modal-hide");
    }
  }
  onMounted(() => {
    window.addEventListener("click", e => {
      closeOnClickOutside(e);
    });

    setInterval(updateTimer, 1000);
  });
</script>

<template>
  <div class="modal">
    <div class="modal-overlay" ref="overlay">
      <div class="modal-inner">
        <div class="modal-header">
          <h4 class="modal-header__title">{{modalConfig.header?.title}}</h4>
          <span class="modal-header__close" v-if="modalConfig?.header.crossButton" @click="emits('modal-hide')">×</span>
          <div class="modal-header__timer" v-if="modalConfig?.header?.timer">
            <modal-timer :num="num"/>
          </div>
        </div>
        <div class="modal-body">
          <div class="modal-body__img" v-if="modalConfig?.icon">
            <img :src="`_nuxt/assets/img/${modalConfig.icon}`" alt="">
          </div>
          <div v-if="modalConfig?.title">
            <h2 :style="{color: modalConfig.title.type}">{{modalConfig.title.text}}</h2>
          </div>
          <p>{{ modalConfig.text }}</p>
          <div v-if="modalConfig?.input">
            <input :type="modalConfig.input.type" :placeholder="modalConfig.input.placeholder">
          </div>
        </div>
        <div class="modal-footer" v-if="modalConfig?.buttons">
          <button
              v-for="(button, index) in modalConfig.buttons"
              :key="index"
              :class="button.color"
              class="modal-footer__button"
              @click="e => handleButtonClick(button)"
              :disabled="button.disabled"
          >
            {{button.text}}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .modal {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    &-overlay {
      position: fixed;
      height: 100%;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.6);
    }

    &-inner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      border-radius: 15px;
      background-color: #1B1B35;
      color: white;

      width: fit-content;
      max-width: 400px;
    }

    &-header {
      position: relative;
      background-color: #1f2a42;
      padding: 10px;
      border-radius: 15px 15px 0 0;

      &__title {
        margin: 0 auto;
        text-align: center;
        max-width: 80%;
      }

      &__timer,
      &__close {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);

        padding: 10px;
      }

      &__close {
        cursor: pointer;
      }
    }

    &-body {
      padding: 10px;
      text-align: center;

      &__img img {
        width: 30px;
        height: auto;
      }
    }

    &-footer {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;

      background-color: #1f2a42;
      padding: 20px;
      border-radius: 0 0 15px 15px;

      &__button {
        margin-top: 0;

        &.danger {
          background-color: red;
        }
        &.primary {
          background-color: green;
        }

        &:disabled {
          filter: grayscale(1);
          cursor: not-allowed;
        }
      }
    }
  }
</style>