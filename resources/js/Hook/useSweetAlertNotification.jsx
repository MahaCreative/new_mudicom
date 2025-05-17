import { useCallback } from "react";
import Swal from "sweetalert2";

const useSweetAlertNotification = () => {
    const showNotification = useCallback((type, title, text) => {
        Swal.fire({
            icon: type, // 'success', 'error', 'warning', 'info'
            title: title,
            text: text,
            confirmButtonText: "OK", // teks tombol konfirmasi
        });
    }, []);

    return showNotification;
};

export default useSweetAlertNotification;
