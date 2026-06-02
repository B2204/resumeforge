import { Resume } from './index';

export interface BoostRequest {
  resume: Resume;
  targetRole?: string;
}

export interface BoostResponse {
  boostedResume: Resume;
  keywords?: string[];
  confidence?: number;
}
