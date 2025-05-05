
import React from 'react';
import FieldEditor from '../components/editor/FieldEditor';
import { Tag } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container py-4 flex items-center gap-3">
          <Tag className="h-6 w-6 text-field" />
          <h1 className="text-xl font-semibold">Field Flow Editor</h1>
        </div>
      </header>
      
      <main className="container py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Rich Text Field Editor</h2>
          <p className="text-gray-600">
            Create templates with dynamic fields. Type <code className="px-1.5 py-0.5 bg-gray-100 rounded text-sm">{{field_id}}</code> or use the field selector to insert fields.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <FieldEditor />
        </div>
      </main>
      
      <footer className="border-t py-6 mt-12">
        <div className="container text-center text-sm text-gray-500">
          Field Flow Editor - Built with Plate.js and React
        </div>
      </footer>
    </div>
  );
};

export default Index;
