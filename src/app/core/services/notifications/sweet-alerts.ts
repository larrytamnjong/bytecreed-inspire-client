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

     static showWarning(message?: string, timer?: number, details?: string) {
        Swal.fire({
            icon: 'warning',
            title: message ?? 'Please check the information provided',
            text: details,
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
            cancelButtonColor: '#CED4DA',
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
            cancelButtonColor: '#CED4DA',
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
            cancelButtonColor: '#CED4DA',
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
            icon: 'question',
            iconColor: '#FF0000',
            showCancelButton: true,
            confirmButtonColor: '#FF0000',
            cancelButtonColor: '#CED4DA',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            allowOutsideClick: false
        });
        return result.isConfirmed;
    }
}