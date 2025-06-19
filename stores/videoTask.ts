import { defineStore } from 'pinia'

interface VideoTask {
  taskId: string
  progress: number
  startTime: number
  isGenerating: boolean
  prompt: string
  type: 'text' | 'image'
}

export const useVideoTaskStore = defineStore('videoTask', {
  state: () => ({
    currentTask: null as VideoTask | null,
  }),
  
  actions: {
    setTask(task: VideoTask | null) {
      this.currentTask = task
      if (task) {
        localStorage.setItem('videoTask', JSON.stringify(task))
      } else {
        localStorage.removeItem('videoTask')
      }
    },
    
    getStoredTask(): VideoTask | null {
      const stored = localStorage.getItem('videoTask')
      return stored ? JSON.parse(stored) : null
    },
    
    clearTask() {
      this.currentTask = null
      localStorage.removeItem('videoTask')
      localStorage.removeItem('seedanceFormCache')
    }
  }
}) 