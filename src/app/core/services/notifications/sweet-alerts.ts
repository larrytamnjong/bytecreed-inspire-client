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

    static async confirmDialog(title?: string, text: string = 'Are you sure you want to proceed with this action?'): Promise<boolean> {
        const result = await Swal.fire({
            title,
            text,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#364574',
            cancelButtonColor: '#D29C40',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        });
        return result.isConfirmed;
    }
}