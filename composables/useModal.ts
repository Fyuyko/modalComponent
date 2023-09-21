import { ref } from "vue";

import { ModalConfigType } from "@/types";

export const useModal = (config: ModalConfigType) => {

    const showModal = ref(false);
    const modalConfig = ref<ModalConfigType | null>(config);

    const show = () => {
        showModal.value = true;
    };
    const hide = () => {
        showModal.value = false;
    };

    const handleOutsideClick = (event: Event) => {
        // сделать закрытие модалки при клике вне
    };

    onMounted(() => {
        document.addEventListener("click", handleOutsideClick);
    });
    onUnmounted(() => {
        document.removeEventListener("click", handleOutsideClick);
    });

    return {
        show,
        hide,
        showModal,
        modalConfig,
    };
}