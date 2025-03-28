import Swal from 'sweetalert2';

export class SimpleAlerts {
    static showSuccess(message?: string, timer?: number) {
        Swal.fire({
            icon: 'success',
            title: message ?? 'Operation was successful',
           // text: message,
            showConfirmButton: false,
            timer: timer ?? 2000
        });
    }
    static showError(message?: string, timer?: number) {
        Swal.fire({
            icon: 'error',
            title: message ?? 'Operation was not successful',
           // text: message,
            showConfirmButton: false,
            timer: timer ?? 1500
        });
    }
}