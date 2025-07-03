
import { CandidateEvaluation, ApiResponse } from '@/types/evaluation';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

export const evaluationService = {
  // Fetch all candidates
  async getCandidates(): Promise<CandidateEvaluation[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/candidates`);
      if (!response.ok) {
        throw new Error('Failed to fetch candidates');
      }
      const data: ApiResponse = await response.json();
      return data.candidates || [];
    } catch (error) {
      console.error('Error fetching candidates:', error);
      throw error;
    }
  },

  // Fetch specific candidate evaluation
  async getCandidateEvaluation(candidateId: string): Promise<CandidateEvaluation> {
    try {
      const response = await fetch(`${API_BASE_URL}/candidates/${candidateId}/evaluation`);
      if (!response.ok) {
        throw new Error('Failed to fetch candidate evaluation');
      }
      const data: CandidateEvaluation = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching candidate evaluation:', error);
      throw error;
    }
  }
};
