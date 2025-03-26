import React from 'react';
import Layout from '../components/layout/Layout';
import TextAnalyzer from '../components/analysis/TextAnalyzer';

const AnalysisPage: React.FC = () => {
  return (
    <Layout>
      <TextAnalyzer />
    </Layout>
  );
};

export default AnalysisPage;
