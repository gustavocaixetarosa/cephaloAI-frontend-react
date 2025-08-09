import { Card } from "../components/ui/card"

type AiDiagnosisProps = {
  diagnosis?: string | null;
}

export default function AiDiagnosis({ diagnosis }: AiDiagnosisProps) {
  const displayDiagnosis = diagnosis || "Based on the cephalometric analysis, the patient presents with a Class I skeletal relationship with normal facial proportions. All angular medicaos fall within normal limits, indicating balanced craniofacial growth and development.";

  return (
    <>
      <Card className="p-6">
        <div>
          <h3 className="mb-3">AI Diagnostic Summary</h3>
          <Card className="p-4 bg-muted/50">
            <p className="text-sm leading-relaxed">
              {displayDiagnosis}
            </p>
          </Card>
        </div>
        <div>
          <h4 className="mb-3">Clinical Recommendations</h4>
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li>• Continue regular orthodontic monitoring</li>
            <li>• Consider growth assessment at 6-month intervals</li>
            <li>• Monitor for any changes in facial asymmetry</li>
            <li>• Evaluate occlusal relationships clinically</li>
          </ul>
        </div>
      </Card>

    </>
  )

}
