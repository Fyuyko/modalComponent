import { ref } from "vue";

//Вынести типы
type ModalButton = {
    text: string;
    color: "primary" | "danger" | "success";
    disabled?: boolean;
};
type modalConfigType = {
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
};

export const useModal = (config: modalConfigType) => {

    const showModal = ref(false);
    const modalConfig = ref<modalConfigType | null>(config);

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