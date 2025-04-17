
import React from 'react';
import { useResume } from '@/context/ResumeContext';
import { v4 as uuidv4 } from 'uuid';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, GripVertical } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const CertificatesForm = () => {
  const { resumeData, updateSection } = useResume();
  const { certificates = [] } = resumeData;

  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedCertificates = [...certificates];
    updatedCertificates[index] = {
      ...updatedCertificates[index],
      [field]: value,
    };
    updateSection('certificates', updatedCertificates);
  };

  const addCertificate = () => {
    const newCertificate = {
      id: uuidv4(),
      name: '',
      issuer: '',
      issueDate: '',
      expiryDate: '',
      url: '',
    };
    updateSection('certificates', [...certificates, newCertificate]);
  };

  const removeCertificate = (index: number) => {
    const updatedCertificates = [...certificates];
    updatedCertificates.splice(index, 1);
    updateSection('certificates', updatedCertificates);
  };

  return (
    <div className="space-y-6">
      <Accordion type="multiple" defaultValue={['0']} className="space-y-4">
        {certificates.map((certificate, certIndex) => (
          <AccordionItem
            key={certificate.id}
            value={certIndex.toString()}
            className="border rounded-md overflow-hidden"
          >
            <div className="flex items-center px-4 py-2 bg-muted/30">
              <GripVertical className="h-5 w-5 text-muted-foreground mr-2 cursor-move" />
              <AccordionTrigger className="flex-1 hover:no-underline py-0">
                <span className="text-sm font-medium">
                  {certificate.name || 'New Certificate'}{certificate.issuer ? ` - ${certificate.issuer}` : ''}
                </span>
              </AccordionTrigger>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive"
                onClick={() => removeCertificate(certIndex)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <AccordionContent className="px-4 pb-4 pt-2">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`cert-name-${certificate.id}`}>Certificate Name</Label>
                    <Input
                      id={`cert-name-${certificate.id}`}
                      value={certificate.name}
                      onChange={(e) => handleInputChange(certIndex, 'name', e.target.value)}
                      placeholder="AWS Certified Solutions Architect, etc."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`cert-issuer-${certificate.id}`}>Issuing Organization</Label>
                    <Input
                      id={`cert-issuer-${certificate.id}`}
                      value={certificate.issuer}
                      onChange={(e) => handleInputChange(certIndex, 'issuer', e.target.value)}
                      placeholder="Amazon Web Services, Google, etc."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`cert-issue-date-${certificate.id}`}>Issue Date</Label>
                    <Input
                      id={`cert-issue-date-${certificate.id}`}
                      type="month"
                      value={certificate.issueDate}
                      onChange={(e) => handleInputChange(certIndex, 'issueDate', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`cert-expiry-date-${certificate.id}`}>Expiry Date (Optional)</Label>
                    <Input
                      id={`cert-expiry-date-${certificate.id}`}
                      type="month"
                      value={certificate.expiryDate || ''}
                      onChange={(e) => handleInputChange(certIndex, 'expiryDate', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`cert-url-${certificate.id}`}>Certificate URL (Optional)</Label>
                  <Input
                    id={`cert-url-${certificate.id}`}
                    value={certificate.url || ''}
                    onChange={(e) => handleInputChange(certIndex, 'url', e.target.value)}
                    placeholder="https://credential-url.com"
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Button variant="outline" className="w-full" onClick={addCertificate}>
        <Plus className="mr-2 h-4 w-4" />
        Add Certificate
      </Button>
    </div>
  );
};

export default CertificatesForm;
