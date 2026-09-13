import { dashboardStats, federatedRounds, hospitals, modelMetrics, privacyStats, recentScans, sampleReport, notifications, datasets } from './mockData'

// Mock API abstraction - ready to connect to FastAPI backend
class ApiService {
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async getDashboard() {
    await this.delay(600)
    return dashboardStats
  }

  async getScans() {
    await this.delay(500)
    return recentScans
  }

  async analyzeScan(file: File, onProgress?: (step: string, progress: number) => void) {
    const steps = [
      'Loading CT volume',
      'Preprocessing & Normalization',
      '3D U-Net Segmentation',
      'Nodule Detection',
      'Risk Scoring',
      'Generating Clinical Summary'
    ]
    
    for (let i = 0; i < steps.length; i++) {
      onProgress?.(steps[i], ((i + 1) / steps.length) * 100)
      await this.delay(800 + Math.random() * 400)
    }

    return {
      scanId: `CT-2024-${Math.floor(1000 + Math.random() * 9000)}`,
      nodules: (await import('./mockData')).sampleNodules,
      report: sampleReport,
    }
  }

  async getFederatedStatus() {
    await this.delay(400)
    return {
      currentRound: 18,
      totalRounds: 25,
      progress: 72,
      participating: 24,
      status: 'training' as const,
      rounds: federatedRounds,
    }
  }

  async getFederatedRounds() {
    await this.delay(400)
    return federatedRounds
  }

  async getHospitals() {
    await this.delay(500)
    return hospitals
  }

  async getModelMetrics() {
    await this.delay(400)
    return modelMetrics
  }

  async getPrivacyStats() {
    await this.delay(400)
    return privacyStats
  }

  async generateReport(scanId: string, language = 'en') {
    await this.delay(800)
    return { ...sampleReport, scanId, language }
  }

  async getNotifications() {
    await this.delay(300)
    return notifications
  }

  async getDatasets() {
    await this.delay(400)
    return datasets
  }
}

export const api = new ApiService()

// For future FastAPI integration:
// const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'
// export const realApi = {
//   get: (path: string) => fetch(`${API_BASE}${path}`).then(r => r.json()),
//   post: (path: string, body: any) => fetch(`${API_BASE}${path}`, { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } }).then(r => r.json())
// }
