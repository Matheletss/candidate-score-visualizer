
import { useState } from "react";
import { Brain, GraduationCap, Users, Download, FileText, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const [overallScore] = useState(87);
  const [candidateData] = useState({
    name: "Sarah Chen",
    email: "sarah.chen@email.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    experience: "5+ years",
    jobTitle: "Senior Frontend Developer"
  });

  const [scoringData] = useState([
    {
      title: "Skill Match",
      score: 92,
      description: "Technical skills align well with requirements",
      icon: Target,
      skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"]
    },
    {
      title: "Semantic Scoring",
      score: 85,
      description: "Resume content matches job description context",
      icon: Brain,
      skills: ["Frontend Architecture", "API Integration", "Performance Optimization"]
    },
    {
      title: "Project Relevancy",
      score: 78,
      description: "Projects demonstrate applicable experience",
      icon: FileText,
      skills: ["E-commerce Platform", "Real-time Dashboard", "Mobile-first SPA"]
    },
    {
      title: "Educational Background",
      score: 90,
      description: "Education meets position requirements",
      icon: GraduationCap,
      skills: ["B.S. Computer Science", "Stanford University", "Machine Learning Coursework"]
    },
    {
      title: "Interpersonal Skills",
      score: 72,
      description: "Communication and teamwork indicators present",
      icon: Users,
      skills: ["Team Leadership", "Cross-functional Collaboration", "Mentoring"]
    }
  ]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return "from-amber-700 to-amber-800";
    if (score >= 70) return "from-amber-600 to-amber-700";
    if (score >= 50) return "from-amber-500 to-amber-600";
    return "from-gray-400 to-gray-500";
  };

  const getStatusText = (score: number) => {
    if (score >= 85) return "Excellent Candidate";
    if (score >= 70) return "Strong Match";
    if (score >= 50) return "Good Potential";
    return "Needs Review";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-cream-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Resume Evaluation
          </h1>
          <p className="text-xl text-gray-600">
            AI-powered analysis of candidate fit for{" "}
            <span className="font-semibold text-amber-700">{candidateData.jobTitle}</span> position
          </p>
        </div>

        {/* Candidate Information Card */}
        <Card className="w-full shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-200 to-amber-300 flex items-center justify-center text-2xl font-bold text-amber-800">
                {candidateData.name.split(' ').map(n => n[0]).join('')}
              </div>
              
              <div className="flex-1 space-y-2">
                <h2 className="text-3xl font-bold text-gray-900">{candidateData.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-600">
                  <p>{candidateData.email}</p>
                  <p>{candidateData.phone}</p>
                  <p>{candidateData.location}</p>
                  <p>{candidateData.experience} experience</p>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="border-amber-600 text-amber-700 hover:bg-amber-50 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </Button>
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
                    className="text-amber-100"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - overallScore / 100)}`}
                    className="text-amber-700 transition-all duration-1000 ease-out"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-amber-700">{overallScore}%</span>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900">Overall Match Score</h3>
                <p className="text-lg font-medium text-amber-700">{getStatusText(overallScore)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Scoring Breakdown */}
        <div className="grid gap-6">
          {scoringData.map((item, index) => (
            <Card key={index} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-amber-100">
                    <item.icon className="w-6 h-6 text-amber-700" />
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xl font-semibold text-gray-900">{item.title}</h4>
                      <span className="text-2xl font-bold text-amber-700">{item.score}%</span>
                    </div>
                    
                    <div className="w-full bg-amber-50 rounded-full h-3 overflow-hidden">
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
                          className="bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white px-8 py-3 text-lg transition-all duration-200 hover:scale-105"
          >
            Compare Candidates
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-amber-600 text-amber-700 hover:bg-amber-50 px-8 py-3 text-lg transition-all duration-200 hover:scale-105"
          >
            Add Notes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
