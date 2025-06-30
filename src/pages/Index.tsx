
import { useState, useEffect } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import CandidateSelector from "@/components/CandidateSelector";
import { CandidateEvaluation } from "@/types/evaluation";
import { evaluationService } from "@/services/evaluationService";
import { getIcon } from "@/utils/iconMapper";

const Index = () => {
  const [candidates, setCandidates] = useState<CandidateEvaluation[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateEvaluation | null>(null);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [isLoadingCandidates, setIsLoadingCandidates] = useState(true);
  const [isLoadingEvaluation, setIsLoadingEvaluation] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch candidates on component mount
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setIsLoadingCandidates(true);
        const candidatesData = await evaluationService.getCandidates();
        setCandidates(candidatesData);
        setError(null);
      } catch (err) {
        setError('Failed to load candidates. Please try again.');
        console.error('Error fetching candidates:', err);
      } finally {
        setIsLoadingCandidates(false);
      }
    };

    fetchCandidates();
  }, []);

  // Fetch specific candidate evaluation
  const handleCandidateSelect = async (candidateId: string) => {
    try {
      setIsLoadingEvaluation(true);
      setSelectedCandidateId(candidateId);
      const candidateData = await evaluationService.getCandidateEvaluation(candidateId);
      setSelectedCandidate(candidateData);
      setError(null);
    } catch (err) {
      setError('Failed to load candidate evaluation. Please try again.');
      console.error('Error fetching candidate evaluation:', err);
    } finally {
      setIsLoadingEvaluation(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "from-warmBrown-700 to-warmBrown-800";
    if (score >= 70) return "from-warmBrown-600 to-warmBrown-700";
    if (score >= 50) return "from-brownBeige-500 to-brownBeige-600";
    return "from-gray-400 to-gray-500";
  };

  const getStatusText = (score: number) => {
    if (score >= 85) return "Excellent Candidate";
    if (score >= 70) return "Strong Match";
    if (score >= 50) return "Good Potential";
    return "Needs Review";
  };

  if (isLoadingCandidates) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brownBeige-50 to-cream-100 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading candidates...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brownBeige-50 to-cream-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Resume Evaluation
          </h1>
          <p className="text-xl text-gray-600">
            AI-powered analysis of candidate fit for positions
          </p>
        </div>

        {/* Candidate Selector */}
        <Card className="w-full shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Candidate</h3>
                <CandidateSelector
                  candidates={candidates}
                  selectedCandidateId={selectedCandidateId}
                  onCandidateSelect={handleCandidateSelect}
                  isLoading={isLoadingEvaluation}
                />
              </div>
              {selectedCandidate && (
                <Button 
                  variant="outline" 
                  className="border-warmBrown-600 text-warmBrown-700 hover:bg-brownBeige-50 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Error Display */}
        {error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {isLoadingEvaluation && (
          <Card className="w-full shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>Loading evaluation...</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Candidate Information and Evaluation */}
        {selectedCandidate && !isLoadingEvaluation && (
          <>
            {/* Candidate Information Card */}
            <Card className="w-full shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brownBeige-200 to-brownBeige-300 flex items-center justify-center text-2xl font-bold text-warmBrown-800">
                    {selectedCandidate.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <h2 className="text-3xl font-bold text-gray-900">{selectedCandidate.name}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-600">
                      <p>{selectedCandidate.user_email}</p>
                      <p>Last Evaluated: {new Date(selectedCandidate.last_scored_at.$date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Overall Score Section */}
            <Card className="w-full shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative w-32 h-32">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-brownBeige-100"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - selectedCandidate.score_data.overallScore / 100)}`}
                        className="text-warmBrown-700 transition-all duration-1000 ease-out"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold text-warmBrown-700">{selectedCandidate.score_data.overallScore}%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-gray-900">Overall Match Score</h3>
                    <p className="text-lg font-medium text-warmBrown-700">{getStatusText(selectedCandidate.score_data.overallScore)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Scoring Breakdown */}
            <div className="grid gap-6">
              {selectedCandidate.score_data.evaluation.map((item, index) => {
                const IconComponent = getIcon(item.icon);
                return (
                  <Card key={index} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-brownBeige-100">
                          <IconComponent className="w-6 h-6 text-warmBrown-700" />
                        </div>
                        
                        <div className="flex-1 space-y-4">
                          <div className="flex justify-between items-center">
                            <h4 className="text-xl font-semibold text-gray-900">{item.title}</h4>
                            <span className="text-2xl font-bold text-warmBrown-700">{item.score}%</span>
                          </div>
                          
                          <div className="w-full bg-brownBeige-50 rounded-full h-3 overflow-hidden">
                            <div 
                              className={`h-full bg-gradient-to-r ${getScoreColor(item.score)} transition-all duration-1000 ease-out rounded-full`}
                              style={{ width: `${item.score}%` }}
                            />
                          </div>
                          
                          <p className="text-gray-600">{item.description}</p>
                          
                          <div className="flex flex-wrap gap-2">
                            {item.skills.map((skill, skillIndex) => (
                              <Badge 
                                key={skillIndex} 
                                variant="secondary" 
                                className="bg-brownBeige-100 text-warmBrown-800 hover:bg-brownBeige-200 transition-colors"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>

                          {/* Detailed Analysis */}
                          {item.detailedAnalysis && (
                            <div className="border-l-4 border-warmBrown-300 pl-4 space-y-2">
                              <h6 className="font-medium text-gray-900">Detailed Analysis</h6>
                              <pre className="text-sm text-gray-600 whitespace-pre-wrap bg-brownBeige-25 p-3 rounded">
                                {JSON.stringify(item.detailedAnalysis, null, 2)}
                              </pre>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-warmBrown-700 to-warmBrown-800 hover:from-warmBrown-800 hover:to-warmBrown-900 text-white px-8 py-3 text-lg transition-all duration-200 hover:scale-105"
              >
                Compare Candidates
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-warmBrown-600 text-warmBrown-700 hover:bg-brownBeige-50 px-8 py-3 text-lg transition-all duration-200 hover:scale-105"
              >
                Add Notes
              </Button>
            </div>
          </>
        )}

        {/* Empty State */}
        {!selectedCandidate && !isLoadingEvaluation && candidates.length > 0 && (
          <Card className="w-full shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <p className="text-gray-600">Please select a candidate to view their evaluation.</p>
            </CardContent>
          </Card>
        )}

        {/* No Candidates State */}
        {candidates.length === 0 && !isLoadingCandidates && (
          <Card className="w-full shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <p className="text-gray-600">No candidates found. Please check your backend connection.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
