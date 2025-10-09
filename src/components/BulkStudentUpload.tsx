import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle } from 'lucide-react';
import { bulkAddStudents, Student } from '@/lib/data-service';
import { useToast } from '@/hooks/use-toast';

const BulkStudentUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<{ success: boolean; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const parseCSV = (text: string): Omit<Student, 'id'>[] => {
    const lines = text.split('\n').filter(line => line.trim());
    const students: Omit<Student, 'id'>[] = [];
    
    // Skip header row if it exists
    const startIndex = lines[0].toLowerCase().includes('pin') ? 1 : 0;
    
    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const values = line.split(',').map(v => v.trim());
      if (values.length >= 5) {
        students.push({
          pin: values[0],
          name: values[1],
          branch: values[2],
          year: values[3],
          section: values[4],
        });
      }
    }
    
    return students;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const isCSV = file.name.endsWith('.csv') || file.type === 'text/csv';
    const isExcel = file.name.endsWith('.xlsx') || file.name.endsWith('.xls');
    
    if (!isCSV && !isExcel) {
      setUploadResult({
        success: false,
        message: 'Please upload a CSV or Excel file'
      });
      return;
    }

    setUploading(true);
    setUploadResult(null);

    try {
      const text = await file.text();
      const students = parseCSV(text);

      if (students.length === 0) {
        setUploadResult({
          success: false,
          message: 'No valid student records found in file'
        });
        setUploading(false);
        return;
      }

      const success = await bulkAddStudents(students);

      if (success) {
        setUploadResult({
          success: true,
          message: `Successfully uploaded ${students.length} student records`
        });
        toast({
          title: 'Upload Successful',
          description: `${students.length} students added to database`,
        });
      } else {
        setUploadResult({
          success: false,
          message: 'Failed to upload students. Some records may already exist.'
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadResult({
        success: false,
        message: 'Error processing file. Please check the format.'
      });
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5" />
          Bulk Upload Students
        </CardTitle>
        <CardDescription>
          Upload a CSV or Excel file with student details (PIN, Name, Branch, Year, Section)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
          <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground mb-4">
            CSV format: PIN, Name, Branch, Year, Section (one student per line)
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button asChild disabled={uploading}>
              <span>
                {uploading ? 'Uploading...' : 'Choose File'}
              </span>
            </Button>
          </label>
        </div>

        {uploadResult && (
          <Alert variant={uploadResult.success ? 'default' : 'destructive'}>
            {uploadResult.success ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <AlertDescription>{uploadResult.message}</AlertDescription>
          </Alert>
        )}

        <div className="text-sm text-muted-foreground space-y-2">
          <p className="font-medium">Example CSV format:</p>
          <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
{`PIN,Name,Branch,Year,Section
21A51A0501,John Doe,CSE,2,A
21A51A0502,Jane Smith,CSE,2,B
21A51A0503,Bob Johnson,IT,3,A`}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
};

export default BulkStudentUpload;
