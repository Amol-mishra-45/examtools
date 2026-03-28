import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title, 
  description = "Free online tools to resize photos, compress PDFs, and prepare application forms for students and exam applicants.", 
  keywords = "resize image to 50kb, compress pdf for ssc form, online free tool, exam tools, resize signature", 
  url = "https://examtools.in" 
}) {
  return (
    <Helmet>
      {/* Standard SEO */}
      <title>{title ? `${title} | ExamTools.in` : 'ExamTools.in | Free Exam Preparation Tools'}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Social */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title ? `${title} | ExamTools.in` : 'ExamTools.in | Free Exam Preparation Tools'} />
      <meta property="og:description" content={description} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title ? `${title} | ExamTools.in` : 'ExamTools.in | Free Exam Preparation Tools'} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
