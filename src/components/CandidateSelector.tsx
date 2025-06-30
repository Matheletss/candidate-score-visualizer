
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CandidateEvaluation } from "@/types/evaluation";

interface CandidateSelectorProps {
  candidates: CandidateEvaluation[];
  selectedCandidateId: string | null;
  onCandidateSelect: (candidateId: string) => void;
  isLoading?: boolean;
}

const CandidateSelector = ({ 
  candidates, 
  selectedCandidateId, 
  onCandidateSelect,
  isLoading = false 
}: CandidateSelectorProps) => {
  return (
    <div className="w-full max-w-xs">
      <Select 
        value={selectedCandidateId || ""} 
        onValueChange={onCandidateSelect}
        disabled={isLoading}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a candidate..." />
        </SelectTrigger>
        <SelectContent>
          {candidates.map((candidate) => (
            <SelectItem 
              key={candidate._id.$oid} 
              value={candidate._id.$oid}
            >
              {candidate.name} ({candidate.user_email})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CandidateSelector;
