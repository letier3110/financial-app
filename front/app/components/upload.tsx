/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client'

import { useState, useRef } from 'react'
import { FileIcon } from 'lucide-react'
import { Button } from './ui/button';

interface FileUploadProps {
  title: string
  onUpload: (file: FormData) => void
}

export default function Component({ title, onUpload }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [fileName, setFileName] = useState('')
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      setFileName(files[0].name)
      setFile(files[0]);
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setFileName(files[0].name)
      setFile(files[0]);
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    onUpload(formData);
  };

  return (
    <div className="flex items-center justify-center flex-col gap-4">
      <div
        className={`w-64 h-64 border-2 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors
          ${
            fileName !== '' ? 'border-blue-500 bg-blue-50 border-solid' : 
            isDragging
              ? 'border-blue-500 bg-blue-50 border-dashed'
              : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50 border-dashed'
          }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <FileIcon className="w-12 h-12 text-gray-400 mb-4 group-hover:text-blue-500" />
        <p className="text-sm text-gray-500 text-center px-4 group-hover:text-blue-600">
          {fileName ? fileName : title}
        </p>
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileInput}
          accept=".pdf,.doc,.docx,.xls,.xlsx,.csv"
        />
      </div>
      <form onSubmit={handleSubmit}>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  )
}