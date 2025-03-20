import Swal from 'sweetalert2';

export class SimpleAlerts {
    static showSuccess(message?: string) {
        Swal.fire({
            icon: 'success',
            title: 'Operation was successful',
            text: message,
            showConfirmButton: false,
            timer: 1500
        });
    }
    static showError(message?: string) {
        Swal.fire({
            icon: 'error',
            title: 'Operation was unsuccessful',
            text: message,
            showConfirmButton: false,
            timer: 1500
        });
    }
}