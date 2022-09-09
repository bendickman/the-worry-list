import { makeAutoObservable } from "mobx"

interface IModal {
    isOpen: boolean,
    body: JSX.Element | null,
}

export default class ModalStore {
    modal: IModal = {
        isOpen: false,
        body: null,
    }

    constructor() {
        makeAutoObservable(this);
    }

    openModal = (content: JSX.Element) => {
        this.modal.isOpen = true;
        this.modal.body = content;
    }

    closeModal = () => {
        this.modal.isOpen = false;
        this.modal.body = null;
    }
}