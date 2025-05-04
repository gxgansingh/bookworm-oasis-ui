
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import BookMetadata from './BookMetadata';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type BookDetailsTabProps = {
  description?: string;
  publisher?: string;
  publishedDate?: string;
  pages?: number;
  language?: string;
  status: string;
  isbn?: string;
  format?: string;
  edition?: string;
  dimensions?: string;
  weight?: string;
};

const BookDetailsTab: React.FC<BookDetailsTabProps> = ({
  description,
  publisher,
  publishedDate,
  pages,
  language,
  status,
  isbn,
  format,
  edition,
  dimensions,
  weight,
}) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="font-medium text-lg mb-3">Description</h3>
          <p className="text-gray-700 leading-relaxed">{description || 'No description available.'}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="font-medium text-lg mb-4">Book Information</h3>
          
          <BookMetadata
            publisher={publisher}
            publishedDate={publishedDate}
            pages={pages}
            language={language}
            status={status}
            isbn={isbn}
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="font-medium text-lg mb-4">Additional Information</h3>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Publication Details</AccordionTrigger>
              <AccordionContent>
                <dl className="space-y-2">
                  <div className="flex flex-col sm:flex-row">
                    <dt className="font-semibold sm:w-40">Publisher:</dt>
                    <dd className="text-gray-700">{publisher || 'Not available'}</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row">
                    <dt className="font-semibold sm:w-40">Publication Date:</dt>
                    <dd className="text-gray-700">{publishedDate || 'Not available'}</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row">
                    <dt className="font-semibold sm:w-40">ISBN:</dt>
                    <dd className="text-gray-700">{isbn || 'Not available'}</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row">
                    <dt className="font-semibold sm:w-40">Edition:</dt>
                    <dd className="text-gray-700">{edition || 'Not available'}</dd>
                  </div>
                </dl>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>Physical Attributes</AccordionTrigger>
              <AccordionContent>
                <dl className="space-y-2">
                  <div className="flex flex-col sm:flex-row">
                    <dt className="font-semibold sm:w-40">Format:</dt>
                    <dd className="text-gray-700">{format || 'Not available'}</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row">
                    <dt className="font-semibold sm:w-40">Pages:</dt>
                    <dd className="text-gray-700">{pages || 'Not available'}</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row">
                    <dt className="font-semibold sm:w-40">Dimensions:</dt>
                    <dd className="text-gray-700">{dimensions || 'Not available'}</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row">
                    <dt className="font-semibold sm:w-40">Weight:</dt>
                    <dd className="text-gray-700">{weight || 'Not available'}</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row">
                    <dt className="font-semibold sm:w-40">Language:</dt>
                    <dd className="text-gray-700">{language || 'Not available'}</dd>
                  </div>
                </dl>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookDetailsTab;
