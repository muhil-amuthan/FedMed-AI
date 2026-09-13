# FedMed AI — Privacy-Preserving Generative AI for Early Cancer Detection

**FedMed AI** is a premium, professional, responsive web platform that demonstrates how hospitals can collaboratively improve lung cancer detection without sharing sensitive patient data.

> **Research Prototype Disclaimer:** FedMed AI is an AI-assisted research prototype. It is not intended to replace professional medical diagnosis or clinical judgment. All results shown are simulated/demo data.

## 🌟 Core Message
**Better AI through collaboration, without sharing patient data.**

## 🏗️ Architecture Highlights

- **Federated Learning**: Hospitals train locally, share only encrypted model updates
- **3D U-Net**: Lung nodule detection & segmentation from CT volumes
- **Generative AI**: Structured, clinician-friendly diagnostic summaries
- **Secure Aggregation**: Cryptographically combines encrypted updates
- **Differential Privacy**: ε=2.3, δ=1e-5 — reduces membership inference risk 72% → 18%
- **Multilingual Reporting**: EN, HI, TA support
- **Privacy by Architecture**: Patient CT scans never leave the hospital

## 🚀 Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui (custom implementation)
- Lucide React Icons
- Recharts
- Framer Motion
- React Router v6

## 📁 Project Structure

```
src/
  components/
    ui/ - Button, Card, Badge, Input, Toast
    Navbar.tsx, Sidebar.tsx, StatCard.tsx, ScanViewer.tsx
    NoduleCard.tsx, ReportCard.tsx, HospitalCard.tsx
    FederatedNetwork.tsx, TrainingChart.tsx, AIChat.tsx
  pages/
    Home.tsx, Login.tsx, Dashboard.tsx, ScanAnalysis.tsx
    Reports.tsx, FederatedLearning.tsx, Hospitals.tsx
    Performance.tsx, Privacy.tsx, Datasets.tsx, Settings.tsx, Patients.tsx
  services/
    api.ts - Mock API abstraction ready for FastAPI
    mockData.ts - Realistic simulated data
  types/index.ts
  lib/utils.ts
  App.tsx, main.tsx, index.css
```

## 🖥️ Routes

- `/` - Premium Landing Page (Hero, Problem/Solution, How it Works, Tech, Privacy, India Scale)
- `/login` - Secure login with Demo Login
- `/dashboard` - Clinical Overview (stats, charts, recent activity)
- `/scan-analysis` - CT upload + local AI analysis + nodule results + AI report
- `/reports` - AI-generated clinical summaries
- `/federated-learning` - Network visualization, training rounds, aggregation status
- `/hospitals` - 24 fictional hospitals with status, dataset size, accuracy
- `/performance` - Federated vs Single-hospital metrics, ROC, radar
- `/privacy` - Privacy by Architecture + Membership Inference Attack Simulation
- `/datasets` - LIDC-IDRI, LUNA16, Hospital De-identified Pool
- `/patients` - De-identified demo patient list
- `/settings` - Hospital node config

## 🔒 Privacy Guarantee

```
Traditional: Hospital → Patient Data → Central Server ⚠️
FedMed AI:   Hospital → Local Training → Encrypted Update → Secure Aggregator ✓
```

- 100% Local Data Processing
- Encrypted Model Updates
- Differential Privacy ON
- Audit logs
- No raw CT transfer

## 🧪 Demo Flow

1. Landing Page → Launch Clinical Dashboard
2. Upload CT Scan (DICOM/ZIP/NIfTI demo)
3. Local AI Analysis (6 steps simulated)
4. Nodule Detection (RUL 12.4mm high risk, LLL 6.8mm moderate)
5. Malignancy Risk Score + AI Report
6. Federated Learning Dashboard → Encrypted update → Global model 94.7%
7. Privacy Center → Attack simulation toggle

## 🛠️ Development

```bash
npm install
npm run dev     # http://localhost:5173
npm run build
npm run preview
```

## 🔌 FastAPI Integration Ready

`src/services/api.ts` provides abstraction:

```ts
GET /api/dashboard
POST /api/scan/analyze
GET /api/scans
GET /api/federated/status
GET /api/federated/rounds
GET /api/hospitals
GET /api/model/metrics
GET /api/privacy
POST /api/report/generate
```

Replace mock implementations with real fetch calls to `VITE_API_URL`.

## 📊 Mock Data

All data in `mockData.ts` is fictional and clearly labeled as demo/simulated:
- 12 hospitals (AIIMS Delhi, Tata Memorial, etc - fictional demo)
- 24 federated nodes
- 1,284 total scans
- 86 suspicious cases
- Model accuracy 94.7% federated vs 87.9% single
- Privacy ε=2.3

## 🎨 Design Language

- Premium medical AI, clean, futuristic but trustworthy
- Dark navy/blue/white, subtle cyan/teal accents
- Rounded cards (2xl), soft shadows, excellent spacing
- Glassmorphism minimal, no cartoon graphics
- Fully responsive, dark/light, keyboard accessible

## 🤖 AI Assistant

Floating **FedMed Assistant** answers questions about federated learning, 3D U-Net, privacy architecture, etc. No medical diagnosis.

## 📄 License

Research prototype for educational purposes.
