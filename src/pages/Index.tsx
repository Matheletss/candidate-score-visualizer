
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Download, BadgeCheck, User, Mail, Building, Calendar, TrendingUp, Star, Award, Users, BookOpen, Target, Briefcase } from "lucide-react";
import { evaluationService } from "@/services/evaluationService";
import { CandidateEvaluation } from "@/types/evaluation";
import CandidateSelector from "@/components/CandidateSelector";
import { getIcon } from "@/utils/iconMapper";

const Index: React.FC = () => {
  const { toast } = useToast();
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateEvaluation | null>(null);

  const weightMap: Record<string, number> = {
    "Skill Match": 30,
    "Work Experience": 20,
    "Semantic Scoring": 15,
    "Project Relevancy": 15,
    "Educational Background": 10,
    "Interpersonal Skills": 10,
  };

  const getIconForCategory = (title: string) => {
    const iconMap: Record<string, any> = {
      "Skill Match": Target,
      "Work Experience": Briefcase,
      "Semantic Scoring": TrendingUp,
      "Project Relevancy": Star,
      "Educational Background": BookOpen,
      "Interpersonal Skills": Users,
    };
    return iconMap[title] || BadgeCheck;
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-emerald-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-500";
  };

  const getScoreBg = (percentage: number) => {
    if (percentage >= 80) return "bg-emerald-50 border-emerald-200";
    if (percentage >= 60) return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
  };

  // Fetch candidates list
  const { data: candidates = [], isLoading, error } = useQuery({
    queryKey: ['candidates'],
    queryFn: evaluationService.getCandidates,
  });

  const handleCandidateSelect = (candidateId: string) => {
    const candidate = candidates.find(c => c._id.$oid === candidateId);
    if (candidate) {
      setSelectedCandidate(candidate);
    }
  };

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to load candidates",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-lg text-slate-600">Loading candidates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm flex-shrink-0">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Building className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Candidate Evaluation</h1>
              <p className="text-slate-600">
                Review and evaluate candidate profiles
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto p-6 flex gap-6 min-h-0">
        {/* Left Panel - Candidates List */}
        <div className="w-1/3 flex flex-col min-h-0">
          <Card className="flex-1 bg-white/80 backdrop-blur-sm shadow-xl border-0 flex flex-col">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200 flex-shrink-0">
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <Users className="w-5 h-5" />
                Candidates ({candidates.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex-1 min-h-0">
              <div className="mb-4">
                <CandidateSelector
                  candidates={candidates}
                  selectedCandidateId={selectedCandidate?._id.$oid || null}
                  onCandidateSelect={handleCandidateSelect}
                  isLoading={isLoading}
                />
              </div>
              <div className="h-full overflow-y-auto">
                {candidates.length === 0 ? (
                  <div className="p-8 text-center">
                    <User className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500">No candidates yet.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {candidates.map((candidate) => (
                      <div
                        key={candidate._id.$oid}
                        className={`p-4 cursor-pointer transition-all duration-200 hover:bg-slate-50 ${
                          selectedCandidate?._id.$oid === candidate._id.$oid 
                            ? "bg-blue-50 border-r-4 border-blue-500" 
                            : ""
                        }`}
                        onClick={() => setSelectedCandidate(candidate)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-slate-900 truncate">
                              {candidate.name}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
                              <Mail className="w-3 h-3" />
                              <span className="truncate">{candidate.user_email}</span>
                            </div>
                            <div className="mt-2">
                              <Badge variant="default" className="text-xs">
                                Score: {candidate.score_data.overallScore}%
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Evaluation Details */}
        <div className="flex-1 flex flex-col min-h-0">
          <Card className="flex-1 bg-white/80 backdrop-blur-sm shadow-xl border-0 flex flex-col min-h-0">
            <CardContent className="p-0 flex-1 min-h-0 overflow-hidden">
              <div className="h-full overflow-y-auto">
                {!selectedCandidate ? (
                  <div className="flex flex-col items-center justify-center h-full text-center p-8">
                    <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                      <User className="w-12 h-12 text-slate-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-700 mb-2">Select a Candidate</h3>
                    <p className="text-slate-500">Choose a candidate from the list to view their evaluation details.</p>
                  </div>
                ) : (
                  <div className="p-6 space-y-6">
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                          {selectedCandidate.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1 space-y-3">
                          <h2 className="text-3xl font-bold text-slate-900">{selectedCandidate.name}</h2>
                          <div className="flex flex-wrap gap-4 text-slate-600">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              <span>{selectedCandidate.user_email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>Last scored: {new Date(selectedCandidate.last_scored_at.$date).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          className="bg-white hover:bg-slate-50 border-slate-300 shadow-sm"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Resume
                        </Button>
                      </div>
                    </div>

                    {/* Overall Score Card */}
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
                      <div className="flex items-center gap-6">
                        <div className="relative">
                          <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-2xl font-bold text-white">
                              {selectedCandidate.score_data.overallScore}%
                            </span>
                          </div>
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                            <Award className="w-4 h-4 text-yellow-800" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-slate-900 mb-2">Overall Match Score</h3>
                          <p className="text-slate-600">
                            This candidate shows a {selectedCandidate.score_data.overallScore >= 80 ? 'strong' : selectedCandidate.score_data.overallScore >= 60 ? 'good' : 'moderate'} match for the position requirements.
                          </p>
                          <div className="mt-3">
                            <Progress 
                              value={selectedCandidate.score_data.overallScore} 
                              className="h-3 bg-white/50"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Evaluation Breakdown */}
                    <div className="grid gap-4">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">Detailed Evaluation</h3>
                      {selectedCandidate.score_data.evaluation.map((item) => {
                        const maxScore = weightMap[item.title] || 100;
                        const percentage = Math.round((item.score / maxScore) * 100);
                        const IconComponent = getIconForCategory(item.title);

                        return (
                          <Card
                            key={item.title}
                            className={`border-l-4 transition-all duration-200 hover:shadow-lg ${getScoreBg(percentage)}`}
                          >
                            <CardHeader className="pb-3">
                              <CardTitle className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className={`w-10 h-10 rounded-lg bg-white/70 flex items-center justify-center ${getScoreColor(percentage)}`}>
                                    <IconComponent className="w-5 h-5" />
                                  </div>
                                  <span className="text-slate-900">{item.title}</span>
                                </div>
                                <div className={`text-2xl font-bold ${getScoreColor(percentage)}`}>
                                  {percentage}%
                                </div>
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <p className="text-slate-600">{item.description}</p>

                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm text-slate-500">
                                  <span>Score Progress</span>
                                  <span>{item.score}/{maxScore}</span>
                                </div>
                                <Progress
                                  value={percentage}
                                  className="h-2 bg-white/50"
                                />
                              </div>

                              {item.skills.length > 0 && (
                                <div>
                                  <div className="font-semibold mb-2 text-slate-700">Matched Skills:</div>
                                  <div className="flex flex-wrap gap-2">
                                    {item.skills.map((skill) => (
                                      <Badge
                                        variant="secondary"
                                        key={skill}
                                        className="bg-white/70 text-slate-700 border border-slate-200 hover:bg-white transition-colors"
                                      >
                                        {skill}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}

                              <details className="group">
                                <summary className="cursor-pointer text-slate-700 hover:text-slate-900 font-medium list-none flex items-center gap-2">
                                  <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-xs group-open:rotate-90 transition-transform">
                                    ▶
                                  </div>
                                  Detailed Analysis
                                </summary>
                                <div className="mt-3 bg-white/50 rounded-lg p-4 border border-slate-200">
                                  <pre className="text-xs text-slate-600 overflow-x-auto whitespace-pre-wrap">
                                    {JSON.stringify(item.detailedAnalysis, null, 2)}
                                  </pre>
                                </div>
                              </details>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
