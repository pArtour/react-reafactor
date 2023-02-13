import { useEffect, useState } from "react";

/**
 * useModal hook for modal state management and open/close functions
 * @param {boolean} dafaultOpened - default modal state
 * @example const { isModalOpen, openModal, closeModal } = useModal();
 * @returns {object} isModalOpen: boolean, openModal: function, closeModal: function
 */
export const useModal = (dafaultOpened = false) => {
	const [isModalOpen, setIsModalOpen] = useState(dafaultOpened);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	useEffect(() => {
		if (isModalOpen) {
			const handleOutsideClick = (e: MouseEvent) => {			
				const target = e.target as HTMLElement;
				// check if the target is not inside the modal
				if (target.closest(".modal") === null) {
					closeModal();
				}
			};
			document.addEventListener("click", handleOutsideClick);
			return () => {
				document.removeEventListener("click", handleOutsideClick);
			};
		}
	}, [isModalOpen]);

	return { isModalOpen, openModal, closeModal };
}