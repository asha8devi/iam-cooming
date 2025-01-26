import { PatientList } from "../../components/patient-list"

export default function DoctorPatientList({ params }: { params: { doctorName: string } }) {
  return <PatientList doctorName={decodeURIComponent(params.doctorName)} />
}

