import Swal from 'sweetalert2';

export class SimpleAlerts {
    static showSuccess(message?: string, timer?: number) {
        Swal.fire({
            icon: 'success',
            title: message ?? 'Operation was successful',
            showConfirmButton: false,
            timer: timer ?? 2000
        });
    }

    static async showSuccessWithOptions(message: string = 'Do you want to continue?'): Promise<boolean> {
        const result = await Swal.fire({
            icon: 'success',
            title: message,
            showCancelButton: true,
            confirmButtonColor: '#364574',
            cancelButtonColor: '#D29C40',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            allowOutsideClick: false
        });
        return result.isConfirmed;
    }
    static showError(message?: string, timer?: number) {
        Swal.fire({
            icon: 'error',
            title: message ?? 'Operation was not successful',
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
            allowOutsideClick: false
        });
        return result.isConfirmed;
    }

    static async confirmCloseDialog(text: string = 'Are you sure you want to close this dialog?'): Promise<boolean> {
        const result = await Swal.fire({
            text,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#364574',
            cancelButtonColor: '#D29C40',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            allowOutsideClick: false
        });
        return result.isConfirmed;
    }

    static async confirmDeleteDialog(title?: string, text: string = 'Are you sure you want to proceed with this delete?'): Promise<boolean> {
        const result = await Swal.fire({
            title,
            text,
            icon: 'warning',
            iconColor: '#FF0000',
            showCancelButton: true,
            confirmButtonColor: '#364574',
            cancelButtonColor: '#D29C40',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            allowOutsideClick: false
        });
        return result.isConfirmed;
    }
}