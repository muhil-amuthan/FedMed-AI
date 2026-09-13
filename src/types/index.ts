export interface Hospital {
  id: string
  name: string
  location: string
  city: string
  country: string
  datasetSize: number
  lastTrainingRound: number
  localAccuracy: number
  status: 'active' | 'training' | 'syncing' | 'offline'
  connectionQuality: number
  joinedDate: string
  scansContributed: number
}

export interface Nodule {
  id: string
  location: string
  lobe: string
  diameter: number
  volume: number
  confidence: number
  malignancyProbability: number
  risk: 'low' | 'moderate' | 'high'
  x: number
  y: number
  z: number
  characteristics: string[]
}

export interface CTScan {
  id: string
  patientId: string
  hospitalId: string
  scanDate: string
  modality: string
  sliceCount: number
  status: 'pending' | 'processing' | 'completed' | 'failed'
  nodules: Nodule[]
  overallRisk: 'low' | 'moderate' | 'high'
  aiConfidence: number
}

export interface FederatedRound {
  round: number
  accuracy: number
  loss: number
  participatingHospitals: number
  updatesReceived: number
  timestamp: string
  duration: number
}

export interface ModelMetrics {
  sensitivity: number
  specificity: number
  rocAuc: number
  f1Score: number
  accuracy: number
  precision: number
}

export interface PrivacyStats {
  epsilon: number
  delta: number
  noiseMultiplier: number
  attackRiskBefore: number
  attackRiskAfter: number
}

export interface AIReport {
  id: string
  scanId: string
  generatedAt: string
  findings: string
  riskAssessment: string
  summary: string
  recommendation: string
  language: string
  confidence: number
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  timestamp: string
  read: boolean
}

export interface DashboardStats {
  totalScans: number
  scansAnalyzed: number
  suspiciousCases: number
  federatedHospitals: number
  currentRound: number
  modelAccuracy: number
  dailyScans: { date: string; scans: number; suspicious: number }[]
  trainingProgress: FederatedRound[]
}
