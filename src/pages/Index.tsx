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
      skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
      detailedAnalysis: {
        title: "Technical Skills Analysis",
        subtitle: "Technical skills align well with requirements",
        matchedSkills: ["React.js", "Node.js", "TypeScript", "AWS", "Docker", "PostgreSQL", "GraphQL", "Kubernetes"],
        frontendTechnologies: [
          { name: "React.js", level: "Expert", color: "green" },
          { name: "TypeScript", level: "Advanced", color: "green" },
          { name: "Vue.js", level: "Intermediate", color: "yellow" }
        ],
        backendInfrastructure: [
          { name: "Node.js", level: "Expert", color: "green" },
          { name: "AWS", level: "Advanced", color: "green" },
          { name: "Docker", level: "Advanced", color: "green" }
        ]
      }
    },
    {
      title: "Semantic Scoring",
      score: 85,
      description: "Resume content matches job description context",
      icon: Brain,
      skills: ["Frontend Architecture", "API Integration", "Performance Optimization"],
      detailedAnalysis: {
        title: "Content Analysis",
        subtitle: "Resume content matches job description context",
        keywordAlignment: "Strong correlation between resume terminology and job requirements. Technical vocabulary demonstrates deep understanding of role expectations.",
        highMatchKeywords: ["full-stack development", "scalable architecture", "microservices", "agile methodology", "cloud deployment"],
        partialMatchKeywords: ["team leadership", "performance optimization", "code review", "CI/CD pipeline"],
        contextRelevance: "Resume demonstrates contextual understanding of senior-level responsibilities with appropriate technical depth and business impact focus."
      }
    },
    {
      title: "Project Relevancy",
      score: 78,
      description: "Projects demonstrate applicable experience",
      icon: FileText,
      skills: ["E-commerce Platform", "Real-time Dashboard", "Mobile-first SPA"],
      detailedAnalysis: {
        title: "Experience Analysis",
        subtitle: "Projects demonstrate applicable experience",
        mostRelevantProjects: [
          {
            name: "E-commerce Platform Redesign",
            match: 95,
            description: "Led full-stack development of scalable microservices architecture serving 2M+ users",
            technologies: ["React", "Node.js", "AWS"]
          },
          {
            name: "Real-time Analytics Dashboard",
            match: 82,
            description: "Built high-performance data visualization platform with real-time streaming capabilities",
            technologies: ["TypeScript", "GraphQL", "Docker"]
          },
          {
            name: "Mobile Banking Application",
            match: 75,
            description: "Developed secure financial services app with biometric authentication and fraud detection",
            technologies: ["React Native", "Security", "API Design"]
          }
        ],
        impactAnalysis: "Strong portfolio demonstrating progressive responsibility and technical leadership. Projects show direct relevance to senior engineering role requirements."
      }
    },
    {
      title: "Educational Background",
      score: 90,
      description: "Education meets position requirements",
      icon: GraduationCap,
      skills: ["B.S. Computer Science", "Stanford University", "Machine Learning Coursework"],
      detailedAnalysis: {
        title: "Academic Qualifications",
        subtitle: "Education meets position requirements",
        degrees: [
          {
            degree: "Master of Science in Computer Science",
            institution: "Stanford University",
            period: "2018 - 2020",
            gpa: "3.8/4.0",
            match: "Excellent Match",
            coursework: ["Advanced Algorithms", "Distributed Systems", "Machine Learning", "Software Architecture"]
          },
          {
            degree: "Bachelor of Science in Software Engineering",
            institution: "University of California, Berkeley",
            period: "2014 - 2018",
            gpa: "3.7/4.0",
            match: "Strong Match",
            achievements: ["Dean's List for 6 consecutive semesters", "Senior Capstone Project: Real-time Collaboration Platform", "President, Computer Science Student Association"]
          }
        ],
        certifications: [
          { name: "AWS Solutions Architect", level: "Professional Level", year: "2022" },
          { name: "Google Cloud Professional", level: "Cloud Architect", year: "2023" }
        ]
      }
    },
    {
      title: "Interpersonal Skills",
      score: 72,
      description: "Communication and teamwork indicators present",
      icon: Users,
      skills: ["Team Leadership", "Cross-functional Collaboration", "Mentoring"],
      detailedAnalysis: {
        title: "Soft Skills Assessment",
        subtitle: "Communication and teamwork indicators present",
        identifiedSkills: {
          strongEvidence: [
            { skill: "Leadership", score: 85, description: "Led cross-functional teams of 8+ developers across multiple projects" },
            { skill: "Problem Solving", score: 82, description: "Resolved complex technical challenges and optimized system performance" },
            { skill: "Communication", score: 78, description: "Presented technical solutions to stakeholders and conducted code reviews" }
          ],
          moderateEvidence: [
            { skill: "Teamwork", score: 68, description: "Collaborated effectively in agile development environments" },
            { skill: "Adaptability", score: 65, description: "Successfully adapted to new technologies and methodologies" },
            { skill: "Time Management", score: 62, description: "Managed multiple project deadlines and deliverables" }
          ]
        },
        evidenceSources: [
          {
            skill: "Leadership Experience",
            evidence: "Led cross-functional teams of 8+ developers across multiple projects"
          },
          {
            skill: "Communication Skills",
            evidence: "Presented technical solutions to stakeholders and conducted code reviews"
          },
          {
            skill: "Problem Solving",
            evidence: "Resolved complex technical challenges and optimized system performance"
          }
        ],
        softSkillsPortfolio: ["Team Leadership", "Technical Communication", "Mentoring", "Cross-functional Collaboration", "Stakeholder Management", "Conflict Resolution", "Project Coordination"]
      }
    }
  ]);

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

  const getLevelIndicatorColor = (color: string) => {
    switch(color) {
      case "green": return "bg-green-500";
      case "yellow": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brownBeige-50 to-cream-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Resume Evaluation
          </h1>
          <p className="text-xl text-gray-600">
            AI-powered analysis of candidate fit for{" "}
            <span className="font-semibold text-warmBrown-700">{candidateData.jobTitle}</span> position
          </p>
        </div>

        {/* Candidate Information Card */}
        <Card className="w-full shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brownBeige-200 to-brownBeige-300 flex items-center justify-center text-2xl font-bold text-warmBrown-800">
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
                className="border-warmBrown-600 text-warmBrown-700 hover:bg-brownBeige-50 transition-colors"
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
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - overallScore / 100)}`}
                    className="text-warmBrown-700 transition-all duration-1000 ease-out"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-warmBrown-700">{overallScore}%</span>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900">Overall Match Score</h3>
                <p className="text-lg font-medium text-warmBrown-700">{getStatusText(overallScore)}</p>
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
                  <div className="p-3 rounded-lg bg-brownBeige-100">
                    <item.icon className="w-6 h-6 text-warmBrown-700" />
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xl font-semibold text-gray-900">{item.title}</h4>
                      <span className="text-2xl font-bold text-warmBrown-700">{item.score}%</span>
                    </div>
                    
                    {/* Enhanced sections for all categories */}
                    {item.detailedAnalysis && (
                      <div className="space-y-4 border-l-4 border-warmBrown-300 pl-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-warmBrown-600 flex items-center justify-center">
                            <item.icon className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-900">{item.detailedAnalysis.title}</h5>
                            <p className="text-sm text-gray-600">{item.detailedAnalysis.subtitle}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h6 className="font-medium text-gray-900 mb-2">Match Score</h6>
                          <div className="w-full bg-brownBeige-50 rounded-full h-3 overflow-hidden mb-2">
                            <div 
                              className={`h-full bg-gradient-to-r ${getScoreColor(item.score)} transition-all duration-1000 ease-out rounded-full`}
                              style={{ width: `${item.score}%` }}
                            />
                          </div>
                        </div>

                        {/* Skill Match Details */}
                        {item.title === "Skill Match" && (
                          <>
                            <div>
                              <h6 className="font-medium text-gray-900 mb-3">Matched Skills</h6>
                              <div className="flex flex-wrap gap-2 mb-4">
                                {item.detailedAnalysis.matchedSkills.map((skill, skillIndex) => (
                                  <Badge 
                                    key={skillIndex} 
                                    className="bg-brownBeige-200 text-warmBrown-800 hover:bg-brownBeige-300 transition-colors"
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                              <div className="bg-brownBeige-25 p-4 rounded-lg">
                                <h6 className="font-medium text-gray-900 mb-3">Frontend Technologies</h6>
                                <div className="space-y-2">
                                  {item.detailedAnalysis.frontendTechnologies.map((tech, techIndex) => (
                                    <div key={techIndex} className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${getLevelIndicatorColor(tech.color)}`}></div>
                                        <span className="text-sm text-gray-700">{tech.name}</span>
                                      </div>
                                      <span className="text-xs text-gray-500">({tech.level})</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="bg-brownBeige-25 p-4 rounded-lg">
                                <h6 className="font-medium text-gray-900 mb-3">Backend & Infrastructure</h6>
                                <div className="space-y-2">
                                  {item.detailedAnalysis.backendInfrastructure.map((tech, techIndex) => (
                                    <div key={techIndex} className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${getLevelIndicatorColor(tech.color)}`}></div>
                                        <span className="text-sm text-gray-700">{tech.name}</span>
                                      </div>
                                      <span className="text-xs text-gray-500">({tech.level})</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </>
                        )}

                        {/* Semantic Scoring Details */}
                        {item.title === "Semantic Scoring" && (
                          <div className="space-y-4">
                            <div className="space-y-4">
                              <div className="flex items-center justify-between mb-2">
                                <h6 className="font-medium text-gray-900">Keyword Alignment Analysis</h6>
                                <Badge className="bg-blue-100 text-blue-800">Division</Badge>
                              </div>
                              <p className="text-sm text-gray-700 mb-4">{item.detailedAnalysis.keywordAlignment}</p>
                              
                              <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                  <h6 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    High Match Keywords
                                  </h6>
                                  <div className="flex flex-wrap gap-1">
                                    {item.detailedAnalysis.highMatchKeywords.map((keyword, idx) => (
                                      <Badge key={idx} className="bg-green-100 text-green-800 text-xs">
                                        {keyword}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                
                                <div>
                                  <h6 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                    Partial Match Keywords
                                  </h6>
                                  <div className="flex flex-wrap gap-1">
                                    {item.detailedAnalysis.partialMatchKeywords.map((keyword, idx) => (
                                      <Badge key={idx} className="bg-yellow-100 text-yellow-800 text-xs">
                                        {keyword}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="mt-4 p-3 bg-warmBrown-50 rounded-lg">
                                <h6 className="font-medium text-warmBrown-800 mb-1">Context Relevance</h6>
                                <p className="text-sm text-warmBrown-700">{item.detailedAnalysis.contextRelevance}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Project Relevancy Details */}
                        {item.title === "Project Relevancy" && (
                          <div className="space-y-4">
                            <div>
                              <h6 className="font-medium text-gray-900 mb-3">Most Relevant Projects</h6>
                              <div className="space-y-4">
                                {item.detailedAnalysis.mostRelevantProjects.map((project, projIndex) => (
                                  <div key={projIndex} className="border-l-4 border-warmBrown-200 pl-4 py-2">
                                    <div className="flex items-center justify-between mb-2">
                                      <h6 className="font-semibold text-gray-900">{project.name}</h6>
                                      <Badge className={`${project.match >= 90 ? 'bg-green-100 text-green-800' : project.match >= 80 ? 'bg-yellow-100 text-yellow-800' : 'bg-orange-100 text-orange-800'}`}>
                                        {project.match}% Match
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                                    <div className="flex flex-wrap gap-1">
                                      {project.technologies.map((tech, techIdx) => (
                                        <Badge key={techIdx} className="bg-brownBeige-100 text-warmBrown-800 text-xs">
                                          {tech}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="bg-brownBeige-50 p-4 rounded-lg">
                              <h6 className="font-medium text-warmBrown-800 mb-2">Project Impact Analysis</h6>
                              <p className="text-sm text-warmBrown-700">{item.detailedAnalysis.impactAnalysis}</p>
                            </div>
                          </div>
                        )}

                        {/* Educational Background Details */}
                        {item.title === "Educational Background" && (
                          <div className="space-y-4">
                            <div className="space-y-4">
                              {item.detailedAnalysis.degrees.map((degree, degIndex) => (
                                <div key={degIndex} className="border-l-4 border-warmBrown-200 pl-4 py-3">
                                  <div className="flex items-center justify-between mb-2">
                                    <h6 className="font-semibold text-gray-900">{degree.degree}</h6>
                                    <Badge className={`${degree.match === 'Excellent Match' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                      {degree.match}
                                    </Badge>
                                  </div>
                                  <div className="text-sm text-warmBrown-700 font-medium mb-1">{degree.institution}</div>
                                  <div className="text-sm text-gray-600 mb-2">{degree.period} • GPA: {degree.gpa}</div>
                                  
                                  {degree.coursework && (
                                    <div className="mb-2">
                                      <div className="text-sm font-medium text-gray-700 mb-1">Relevant Coursework</div>
                                      <div className="flex flex-wrap gap-1">
                                        {degree.coursework.map((course, courseIdx) => (
                                          <Badge key={courseIdx} className="bg-brownBeige-100 text-warmBrown-800 text-xs">
                                            {course}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                  
                                  {degree.achievements && (
                                    <div>
                                      <div className="text-sm font-medium text-gray-700 mb-1">Key Achievements</div>
                                      <ul className="text-xs text-gray-600 space-y-1">
                                        {degree.achievements.map((achievement, achIdx) => (
                                          <li key={achIdx} className="flex items-center gap-2">
                                            <div className="w-1 h-1 rounded-full bg-warmBrown-500"></div>
                                            {achievement}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                            
                            <div className="bg-brownBeige-50 p-4 rounded-lg">
                              <h6 className="font-medium text-warmBrown-800 mb-3">Professional Certifications</h6>
                              <div className="grid md:grid-cols-2 gap-3">
                                {item.detailedAnalysis.certifications.map((cert, certIdx) => (
                                  <div key={certIdx} className="flex items-center gap-3 p-2 bg-white rounded border">
                                    <div className="w-6 h-6 rounded-full bg-warmBrown-600 flex items-center justify-center">
                                      <span className="text-white text-xs">✓</span>
                                    </div>
                                    <div>
                                      <div className="text-sm font-semibold text-gray-900">{cert.name}</div>
                                      <div className="text-xs text-gray-600">{cert.level} • {cert.year}</div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Interpersonal Skills Details */}
                        {item.title === "Interpersonal Skills" && (
                          <div className="space-y-4">
                            <div>
                              <h6 className="font-medium text-gray-900 mb-3">Identified Soft Skills</h6>
                              <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                  <h6 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    Strong Evidence
                                  </h6>
                                  <div className="space-y-2">
                                    {item.detailedAnalysis.identifiedSkills.strongEvidence.map((skill, skillIdx) => (
                                      <div key={skillIdx} className="flex items-center justify-between p-2 bg-green-50 rounded">
                                        <div>
                                          <div className="text-sm font-medium text-gray-900">{skill.skill}</div>
                                          <div className="text-xs text-gray-600">{skill.description}</div>
                                        </div>
                                        <div className="text-sm font-bold text-green-700">{skill.score}%</div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                
                                <div>
                                  <h6 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                    Moderate Evidence
                                  </h6>
                                  <div className="space-y-2">
                                    {item.detailedAnalysis.identifiedSkills.moderateEvidence.map((skill, skillIdx) => (
                                      <div key={skillIdx} className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                                        <div>
                                          <div className="text-sm font-medium text-gray-900">{skill.skill}</div>
                                          <div className="text-xs text-gray-600">{skill.description}</div>
                                        </div>
                                        <div className="text-sm font-bold text-yellow-700">{skill.score}%</div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-brownBeige-50 p-4 rounded-lg">
                              <h6 className="font-medium text-warmBrown-800 mb-3">Evidence Sources</h6>
                              <div className="space-y-2">
                                {item.detailedAnalysis.evidenceSources.map((source, sourceIdx) => (
                                  <div key={sourceIdx} className="p-2 bg-cream-50 rounded border-l-3 border-warmBrown-400">
                                    <div className="text-sm font-medium text-warmBrown-800">{source.skill}</div>
                                    <div className="text-xs text-warmBrown-600">{source.evidence}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h6 className="font-medium text-gray-900 mb-3">Soft Skills Portfolio</h6>
                              <div className="flex flex-wrap gap-2">
                                {item.detailedAnalysis.softSkillsPortfolio.map((skill, skillIdx) => (
                                  <Badge key={skillIdx} className="bg-brownBeige-200 text-warmBrown-800">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {!item.detailedAnalysis && (
                      <>
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
                      </>
                    )}
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
      </div>
    </div>
  );
};

export default Index;
