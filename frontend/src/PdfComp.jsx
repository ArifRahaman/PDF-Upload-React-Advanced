

import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf"; // Import pdfjs for PDF download

function PdfComp(props) {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPages, setFilteredPages] = useState([]);
  const [scale, setScale] = useState(1.0); // Initial scale factor
  const [readMode, setReadMode] = useState("readonly"); // Read mode: "readonly" or "select"

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setFilteredPages(Array.from({ length: numPages }, (_, i) => i + 1));
  }

  // Function to handle search input change
  function handleSearchInputChange(event) {
    const query = event.target.value;
    setSearchQuery(query);

    // Filter pages based on the search query
    const filtered = Array.from({ length: numPages }, (_, i) => i + 1).filter(
      (page) =>
        query.trim() === "" ||
        page.toString().includes(query.trim())
    );
    setFilteredPages(filtered);
    setPageNumber(filtered[0] || 1); // Set page number to the first filtered page
  }

  // Function to handle PDF download
  function handleDownload() {
    // Create a new anchor element
    const link = document.createElement('a');
    link.href = props.pdfFile; // Use the PDF file URL as the download link
    link.download = `document_${Date.now()}.pdf`; // Set the download filename
    document.body.appendChild(link); // Append the link to the document body
    link.click(); // Simulate a click event on the link
    document.body.removeChild(link); // Remove the link from the document body after download
  }

  // Function to handle zoom in
  function handleZoomIn() {
    setScale(scale + 0.1); // Increase the scale factor by 0.1
  }

  // Function to handle zoom out
  function handleZoomOut() {
    setScale(scale - 0.1); // Decrease the scale factor by 0.1
  }

  return (
    <div>
      <div className="mt-8 h-32 flex justify-center items-center">
        {/* Search input, button, download button, zoom in button, and zoom out button */}
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchInputChange}
          placeholder="Search Page Number"
          style={{ width: "200px", height: "40px", textAlign: "center", marginRight: "10px" }}
        />
        <button className="mx-2" onClick={() => setPageNumber(1)}>Go to Page</button>
        <button className="mx-2" onClick={handleDownload} style={{ backgroundColor: 'green', color: 'white' }}>Download PDF</button>
        <button className="mx-2" onClick={handleZoomIn} style={{ backgroundColor: 'blue', color: 'white' }}>Zoom In</button>
        <button className="mx-2" onClick={handleZoomOut} style={{ backgroundColor: 'red', color: 'white' }}>Zoom Out</button>
        <select
          className="mx-2"
          value={readMode}
          onChange={(e) => setReadMode(e.target.value)}
        >
          <option value="readonly">Read Only</option>
          <option value="select">Read and Select</option>
        </select>
      </div>
      <div className="pdf-div mt-8 flex justify-center items-center" style={{ overflowX: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Document file={props.pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
            {filteredPages.length > 0 ? (
              filteredPages.map((page) => (
                <div key={`page-${page}`} style={{ margin: '0 10px' }}>
                  <Page
                    pageNumber={page}
                    renderTextLayer={readMode === "select"} // Enable text layer only in "Read and Select" mode
                    renderAnnotationLayer={false}
                    width={800 * scale} // Apply the scale factor to the page width
                  />
                  <p style={{ textAlign: 'center' }}>Page {page}</p>
                </div>
              ))
            ) : (
              Array.from({ length: numPages }, (_, i) => i + 1).map((page) => (
                <div key={`page-${page}`} style={{ margin: '0 10px' }}>
                  <Page
                    pageNumber={page}
                    renderTextLayer={readMode === "select"} // Enable text layer only in "Read and Select" mode
                    renderAnnotationLayer={false}
                    width={800 * scale} // Apply the scale factor to the page width
                  />
                  <p style={{ textAlign: 'center' }}>Page {page}</p>
                </div>
              ))
            )}
          </Document>
        </div>
      </div>
    </div>
  );
}

export default PdfComp;



