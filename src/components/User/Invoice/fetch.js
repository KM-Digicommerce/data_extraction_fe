import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';

// Set the worker path (local path or CDN)
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const FileUploadWithPreview = () => {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.type === 'application/pdf') {
      setFile(URL.createObjectURL(uploadedFile));
      setPageNumber(1);
    } else {
      alert('Please upload a PDF file');
    }
  };

  const onLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Upload PDF to Preview</h2>
      <input type="file" accept="application/pdf" onChange={onFileChange} style={{ margin: '10px 0' }} />
      {file && (
        <div style={{ marginTop: '20px', maxWidth: '600px', margin: '0 auto' }}>
          <Document file={file} onLoadSuccess={onLoadSuccess} loading="Loading PDF...">
            <Page pageNumber={pageNumber} />
          </Document>
          {numPages > 1 && (
            <div style={{ marginTop: '10px' }}>
              <button onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber <= 1} style={pageNumber <= 1 ? { backgroundColor: '#ccc' } : { backgroundColor: '#007bff' }}>Prev</button>
              <span>Page {pageNumber} of {numPages}</span>
              <button onClick={() => setPageNumber(pageNumber + 1)} disabled={pageNumber >= numPages} style={pageNumber >= numPages ? { backgroundColor: '#ccc' } : { backgroundColor: '#007bff' }}>Next</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUploadWithPreview;
