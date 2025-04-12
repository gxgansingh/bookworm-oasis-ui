
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
};

const BookDetailsTab: React.FC<BookDetailsTabProps> = ({
  description,
  publisher,
  publishedDate,
  pages,
  language,
  status,
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
                <p className="text-gray-700">
                  Published by {publisher} on {publishedDate}
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>Physical Attributes</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-700">
                  This book contains {pages} pages and is published in {language}.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookDetailsTab;
