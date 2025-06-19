interface Toast {
  show: (message: string, type: 'success' | 'error' | 'warning' | 'info', duration?: number) => void
  success: (message: string, duration?: number) => void
  error: (message: string, duration?: number) => void
  warning: (message: string, duration?: number) => void
  info: (message: string, duration?: number) => void
}

declare module '#app' {
  interface NuxtApp {
    $toast: Toast
  }
} 