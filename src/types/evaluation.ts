
export interface CandidateEvaluation {
  _id: {
    $oid: string;
  };
  user_email: string;
  last_scored_at: {
    $date: string;
  };
  name: string;
  score_data: {
    overallScore: number;
    evaluation: EvaluationSection[];
  };
  user_id: string;
}

export interface EvaluationSection {
  title: string;
  score: number;
  description: string;
  icon: string;
  skills: string[];
  detailedAnalysis: any; // This will vary based on section type
}

export interface ApiResponse {
  candidates: CandidateEvaluation[];
}
