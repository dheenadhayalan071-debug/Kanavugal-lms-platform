import React from 'react';
import { CbtExamAttemptPage } from './attempt/page';

interface ExamEnginePageProps {
  examId: string;
}

export const ExamEnginePage: React.FC<ExamEnginePageProps> = ({ examId }) => {
  return <CbtExamAttemptPage examId={examId} />;
};

export default ExamEnginePage;
