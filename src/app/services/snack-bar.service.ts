import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {


  constructor() {
    this.addCSS();
  }

  private addCSS(): void {
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'https://cdn.jsdelivr.net/npm/tailwindcss@^2.0/dist/tailwind.min.css'; 
    document.head.appendChild(linkElement);
  }

  success(message: string): void {
    this.showSnackbar('Success!', message, 'green');
  }

  error(message: string): void {
    this.showSnackbar('Error!', message, 'red');
  }

  warning(message: string): void {
    this.showSnackbar('Warning!', message, 'yellow');
  }


  private showSnackbar(title: string, message: string, color: string): void {
    const alertDiv = document.createElement('div');
    alertDiv.id = 'alert-1'; // Set unique ID
    alertDiv.className = `fixed top-5 left-1/2 transform -translate-x-1/2 flex items-center justify-between p-4 text-sm rounded-lg bg-${color}-50 dark:bg-gray-800 dark:text-${color}-400 shadow-md w-80`;
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = `
        <svg class="flex-shrink-0 w-6 h-6 mx-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        <div class="flex-grow max-w-full">
            <span class="font-medium">${title}</span>
            <span class="ml-2">${message}</span>
        </div>
        <button type="button" class="-mx-1.5 -my-1.5 bg-${color}-50 text-${color}-500 rounded-lg focus:ring-2 focus:ring-${color}-400 p-1.5 hover:bg-${color}-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-${color}-400 dark:hover:bg-gray-700" aria-label="Close">
            <span class="sr-only">Close</span>
            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
        </button>
    `;
    document.body.appendChild(alertDiv);
    
    const closeButton = alertDiv.querySelector('button');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            document.body.removeChild(alertDiv);
        });
    }

    setTimeout(() => {
      document.body.removeChild(alertDiv);
    }, 3000);
    
}

}
