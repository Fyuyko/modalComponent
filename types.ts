export type ModalButton = {
    text: string;
    color: string;
    disabled?: boolean;
};

export type ModalConfigType = {
    header: {
        title: string;
        crossButton?: boolean;
        timer?: number;
    };
    backlight?: string;
    icon?: string;
    title?: {
        text: string;
        type: string;
    };
    text: string;
    input?: {
        type: string;
        placeholder: string;
    };
    buttons?: ModalButton[];
} | null;

export type DataModalConfigType = {
    [key: string]: ModalConfigType;
};