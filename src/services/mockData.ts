import { Hospital, Nodule, CTScan, FederatedRound, ModelMetrics, PrivacyStats, AIReport, DashboardStats, Notification } from '@/types'

export const hospitals: Hospital[] = [
  { id: 'H001', name: 'AIIMS Delhi', location: 'New Delhi', city: 'New Delhi', country: 'India', datasetSize: 12480, lastTrainingRound: 18, localAccuracy: 92.3, status: 'active', connectionQuality: 98, joinedDate: '2023-01-15', scansContributed: 3420 },
  { id: 'H002', name: 'Tata Memorial Hospital', location: 'Mumbai', city: 'Mumbai', country: 'India', datasetSize: 9870, lastTrainingRound: 18, localAccuracy: 91.7, status: 'training', connectionQuality: 96, joinedDate: '2023-02-20', scansContributed: 2890 },
  { id: 'H003', name: 'Apollo Chennai', location: 'Chennai', city: 'Chennai', country: 'India', datasetSize: 7650, lastTrainingRound: 17, localAccuracy: 89.4, status: 'syncing', connectionQuality: 94, joinedDate: '2023-03-10', scansContributed: 2100 },
  { id: 'H004', name: 'Fortis Bangalore', location: 'Bangalore', city: 'Bangalore', country: 'India', datasetSize: 6420, lastTrainingRound: 18, localAccuracy: 90.1, status: 'active', connectionQuality: 92, joinedDate: '2023-04-05', scansContributed: 1850 },
  { id: 'H005', name: 'PGIMER Chandigarh', location: 'Chandigarh', city: 'Chandigarh', country: 'India', datasetSize: 5890, lastTrainingRound: 16, localAccuracy: 88.9, status: 'active', connectionQuality: 89, joinedDate: '2023-05-12', scansContributed: 1650 },
  { id: 'H006', name: 'KEM Hospital Pune', location: 'Pune', city: 'Pune', country: 'India', datasetSize: 5210, lastTrainingRound: 18, localAccuracy: 90.8, status: 'training', connectionQuality: 95, joinedDate: '2023-06-18', scansContributed: 1420 },
  { id: 'H007', name: 'CMC Vellore', location: 'Vellore', city: 'Vellore', country: 'India', datasetSize: 4980, lastTrainingRound: 18, localAccuracy: 91.2, status: 'active', connectionQuality: 91, joinedDate: '2023-07-22', scansContributed: 1380 },
  { id: 'H008', name: 'SGPGI Lucknow', location: 'Lucknow', city: 'Lucknow', country: 'India', datasetSize: 4320, lastTrainingRound: 15, localAccuracy: 87.6, status: 'offline', connectionQuality: 0, joinedDate: '2023-08-14', scansContributed: 980 },
  { id: 'H009', name: 'AIIMS Jodhpur', location: 'Jodhpur', city: 'Jodhpur', country: 'India', datasetSize: 3890, lastTrainingRound: 17, localAccuracy: 89.1, status: 'active', connectionQuality: 87, joinedDate: '2023-09-03', scansContributed: 890 },
  { id: 'H010', name: 'NIMS Hyderabad', location: 'Hyderabad', city: 'Hyderabad', country: 'India', datasetSize: 3650, lastTrainingRound: 18, localAccuracy: 90.3, status: 'syncing', connectionQuality: 93, joinedDate: '2023-10-11', scansContributed: 820 },
  { id: 'H011', name: 'Medanta Gurugram', location: 'Gurugram', city: 'Gurugram', country: 'India', datasetSize: 7210, lastTrainingRound: 18, localAccuracy: 92.1, status: 'active', connectionQuality: 97, joinedDate: '2023-11-02', scansContributed: 2050 },
  { id: 'H012', name: 'Kokilaben Mumbai', location: 'Mumbai', city: 'Mumbai', country: 'India', datasetSize: 4120, lastTrainingRound: 17, localAccuracy: 88.5, status: 'training', connectionQuality: 90, joinedDate: '2023-12-08', scansContributed: 1100 },
]

export const sampleNodules: Nodule[] = [
  {
    id: 'N001',
    location: 'Right Upper Lobe',
    lobe: 'RUL',
    diameter: 12.4,
    volume: 1.82,
    confidence: 96.2,
    malignancyProbability: 78,
    risk: 'high',
    x: 124, y: 89, z: 45,
    characteristics: ['Spiculated margins', 'Solid', 'Pleural tag']
  },
  {
    id: 'N002',
    location: 'Left Lower Lobe',
    lobe: 'LLL',
    diameter: 6.8,
    volume: 0.64,
    confidence: 91.7,
    malignancyProbability: 31,
    risk: 'moderate',
    x: 210, y: 156, z: 102,
    characteristics: ['Smooth margins', 'Ground-glass', 'Stable']
  },
]

export const recentScans: CTScan[] = [
  { id: 'CT-2024-1284', patientId: 'P-8842', hospitalId: 'H001', scanDate: '2024-01-15', modality: 'CT Chest', sliceCount: 312, status: 'completed', nodules: sampleNodules, overallRisk: 'high', aiConfidence: 94.2 },
  { id: 'CT-2024-1283', patientId: 'P-8841', hospitalId: 'H002', scanDate: '2024-01-14', modality: 'CT Chest', sliceCount: 298, status: 'completed', nodules: [], overallRisk: 'low', aiConfidence: 96.8 },
  { id: 'CT-2024-1282', patientId: 'P-8840', hospitalId: 'H001', scanDate: '2024-01-14', modality: 'CT Chest', sliceCount: 305, status: 'completed', nodules: [sampleNodules[1]], overallRisk: 'moderate', aiConfidence: 89.3 },
  { id: 'CT-2024-1281', patientId: 'P-8839', hospitalId: 'H003', scanDate: '2024-01-13', modality: 'CT Chest', sliceCount: 287, status: 'processing', nodules: [], overallRisk: 'low', aiConfidence: 0 },
]

export const federatedRounds: FederatedRound[] = [
  { round: 12, accuracy: 88.4, loss: 0.342, participatingHospitals: 18, updatesReceived: 18, timestamp: '2024-01-01', duration: 42 },
  { round: 13, accuracy: 89.7, loss: 0.298, participatingHospitals: 20, updatesReceived: 19, timestamp: '2024-01-03', duration: 38 },
  { round: 14, accuracy: 90.8, loss: 0.267, participatingHospitals: 22, updatesReceived: 21, timestamp: '2024-01-05', duration: 45 },
  { round: 15, accuracy: 91.8, loss: 0.234, participatingHospitals: 22, updatesReceived: 22, timestamp: '2024-01-07', duration: 40 },
  { round: 16, accuracy: 92.7, loss: 0.201, participatingHospitals: 24, updatesReceived: 23, timestamp: '2024-01-09', duration: 44 },
  { round: 17, accuracy: 93.6, loss: 0.178, participatingHospitals: 24, updatesReceived: 24, timestamp: '2024-01-11', duration: 41 },
  { round: 18, accuracy: 94.7, loss: 0.152, participatingHospitals: 24, updatesReceived: 22, timestamp: '2024-01-13', duration: 39 },
]

export const modelMetrics: { single: ModelMetrics, federated: ModelMetrics } = {
  single: {
    sensitivity: 88.4,
    specificity: 86.7,
    rocAuc: 0.91,
    f1Score: 0.87,
    accuracy: 87.9,
    precision: 86.2,
  },
  federated: {
    sensitivity: 93.1,
    specificity: 91.8,
    rocAuc: 0.96,
    f1Score: 0.92,
    accuracy: 94.7,
    precision: 92.4,
  }
}

export const privacyStats: PrivacyStats = {
  epsilon: 2.3,
  delta: 1e-5,
  noiseMultiplier: 1.1,
  attackRiskBefore: 72,
  attackRiskAfter: 18,
}

export const dashboardStats: DashboardStats = {
  totalScans: 1284,
  scansAnalyzed: 1172,
  suspiciousCases: 86,
  federatedHospitals: 24,
  currentRound: 18,
  modelAccuracy: 94.7,
  dailyScans: [
    { date: 'Jan 7', scans: 42, suspicious: 3 },
    { date: 'Jan 8', scans: 38, suspicious: 2 },
    { date: 'Jan 9', scans: 51, suspicious: 4 },
    { date: 'Jan 10', scans: 47, suspicious: 5 },
    { date: 'Jan 11', scans: 62, suspicious: 3 },
    { date: 'Jan 12', scans: 55, suspicious: 6 },
    { date: 'Jan 13', scans: 68, suspicious: 4 },
    { date: 'Jan 14', scans: 59, suspicious: 5 },
  ],
  trainingProgress: federatedRounds,
}

export const sampleReport: AIReport = {
  id: 'RPT-2024-1284',
  scanId: 'CT-2024-1284',
  generatedAt: '2024-01-15T14:32:00Z',
  findings: 'Two pulmonary nodules identified. Nodule 1 in right upper lobe measures 12.4mm with spiculated margins and pleural tagging, volume 1.82 cm³. Nodule 2 in left lower lobe measures 6.8mm with smooth margins, ground-glass opacity.',
  riskAssessment: 'Nodule 1 demonstrates high-risk features with 78% malignancy probability. Nodule 2 shows moderate-risk characteristics with 31% malignancy probability. Overall assessment: suspicious for primary pulmonary pathology requiring further evaluation.',
  summary: 'CT chest analysis via 3D U-Net segmentation identified two pulmonary nodules. The dominant 12.4mm right upper lobe nodule exhibits morphological features concerning for malignancy including spiculation and pleural retraction. Secondary 6.8mm left lower lobe ground-glass nodule likely represents inflammatory or atypical adenomatous change but requires surveillance.',
  recommendation: 'Immediate referral to pulmonology and thoracic oncology for further clinical evaluation. Recommend PET-CT for metabolic characterization of RUL nodule. Consider CT-guided biopsy if PET positive. Short-interval CT follow-up at 3 months for LLL ground-glass nodule per Fleischner guidelines. Multidisciplinary tumor board discussion recommended.',
  language: 'en',
  confidence: 94.2,
}

export const notifications: Notification[] = [
  { id: '1', title: 'Training Round Completed', message: 'Round 18 completed with 94.7% accuracy', type: 'success', timestamp: '2 hours ago', read: false },
  { id: '2', title: 'New Hospital Joined', message: 'KEM Hospital Pune joined federated network', type: 'info', timestamp: '5 hours ago', read: false },
  { id: '3', title: 'Privacy Budget Alert', message: 'Differential privacy epsilon at 2.3 (within limits)', type: 'info', timestamp: '1 day ago', read: true },
  { id: '4', title: 'Model Update Available', message: 'Global model v2.4.1 ready for deployment', type: 'success', timestamp: '1 day ago', read: true },
]

export const datasets = [
  { name: 'LIDC-IDRI', purpose: 'Lung nodule detection research', scans: 1018, patients: 1010, nodules: 2669, status: 'active', usage: 'Training & Validation', description: 'Public lung CT dataset with expert nodule annotations from 4 radiologists' },
  { name: 'LUNA16', purpose: 'Nodule detection benchmark', scans: 888, patients: 888, nodules: 1186, status: 'active', usage: 'Benchmarking', description: 'Subset of LIDC-IDRI curated for nodule detection challenge' },
  { name: 'Hospital De-identified Pool', purpose: 'Federated training', scans: 12480, patients: 8950, nodules: 3420, status: 'federated', usage: 'On-premise only', description: 'De-identified CT scans retained locally at participating hospitals' },
]
