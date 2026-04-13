'use client';

import { useCallback, useState } from 'react';
import { Upload, FileText, X, CheckCircle } from 'lucide-react';

export default function FileUpload({ onDataParsed, isLoading }) {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [error, setError] = useState(null);
  const [rowCount, setRowCount] = useState(0);

  const handleFile = useCallback(
    async (file) => {
      if (!file) return;

      if (!file.name.endsWith('.csv')) {
        setError('Please upload a CSV file');
        return;
      }

      setError(null);
      setFileName(file.name);

      const Papa = (await import('papaparse')).default;

      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors.length > 0) {
            setError('Error parsing CSV: ' + results.errors[0].message);
            return;
          }
          setRowCount(results.data.length);
          onDataParsed(results.data);
        },
        error: (err) => {
          setError('Error reading file: ' + err.message);
        },
      });
    },
    [onDataParsed]
  );

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0]);
      }
    },
    [handleFile]
  );

  const handleChange = useCallback(
    (e) => {
      if (e.target.files && e.target.files[0]) {
        handleFile(e.target.files[0]);
      }
    },
    [handleFile]
  );

  const clearFile = useCallback(() => {
    setFileName(null);
    setError(null);
    setRowCount(0);
    onDataParsed(null);
  }, [onDataParsed]);

  return (
    <div className="w-full">
      <div
        className={`relative rounded-xl border-2 border-dashed p-10 transition-all duration-300 ${
          dragActive
            ? 'border-primary bg-primary/5 scale-[1.02]'
            : 'border-border hover:border-primary/50 hover:bg-card/50'
        } ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".csv"
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isLoading}
        />

        <div className="flex flex-col items-center justify-center gap-4 text-center">
          {fileName ? (
            <>
              <div className="relative">
                <div className="absolute inset-0 bg-success/20 blur-xl rounded-full" />
                <div className="relative w-14 h-14 rounded-xl bg-success/10 border border-success/20 flex items-center justify-center">
                  <CheckCircle className="h-7 w-7 text-success" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 justify-center">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="font-medium text-foreground">{fileName}</span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      clearFile();
                    }}
                    className="p-1 hover:bg-secondary rounded-full transition-colors text-muted-foreground hover:text-foreground"
                    disabled={isLoading}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {isLoading ? 'Processing...' : `${rowCount} rows loaded`}
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="relative">
                <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full" />
                <div className="relative w-14 h-14 rounded-xl bg-card border border-border flex items-center justify-center group-hover:border-primary/50 transition-colors">
                  <Upload className="h-7 w-7 text-muted-foreground" />
                </div>
              </div>
              <div>
                <p className="font-medium text-foreground text-lg">
                  Drop your CSV file here
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  or click to browse your files
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}
    </div>
  );
}
