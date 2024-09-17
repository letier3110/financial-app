import type { MetaFunction } from '@remix-run/node'
import UploadComponent from '../components/upload'
import FieldMapper from '../components/mapper'
import Charts from '../components/dashboard'
import { useEffect, useState } from 'react'
import { host, port } from '../lib/api'
import { IAccount, ICategory, IReportData, IReportTop5 } from '../lib/interfaces'

export const meta: MetaFunction = () => {
  return [{ title: 'Finance App' }, { name: 'description', content: 'Get your advanced finance reports' }]
}

const handleUploadAccounts = async (formData: FormData) => {
  try {
    const response = await fetch(`https://${host}:${port}/transactions/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Success:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

const handleUploadCategories = async (formData: FormData) => {
  try {
    const response = await fetch(`https://${host}:${port}/best-practice/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Success:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

export default function Index() {
  const [, setTransactions] = useState([]);
  const [plAccounts, setPlAccounts] = useState<IAccount[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [reportData, setReportData] = useState<IReportData | null>(null);
  const [reportTop5Data, setReportTop5Data] = useState<IReportTop5[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await fetch(`https://${host}:${port}/transactions`);
      const data = await response.json();
      setTransactions(data);
    };

    const fetchPlAccounts = async () => {
      const response = await fetch(`https://${host}:${port}/transactions/placcounts`);
      const data = await response.json();
      setPlAccounts(data);
    };

    const fetchCategories = async () => {
      const response = await fetch(`https://${host}:${port}/best-practice`);
      const data = await response.json();
      setCategories(data);
    };

    const fetchReport = async () => {
      const response = await fetch(`https://${host}:${port}/report`);
      const data = await response.json();
      // console.log(data)
      if(data['Unknown']) {
        setReportData(data['Unknown']);
      }
    };

    const fetchTop5 = async () => {
      const response = await fetch(`https://${host}:${port}/report/top5`);
      const data = await response.json();
      setReportTop5Data(data);
    };

    fetchTop5();

    fetchReport();

    fetchCategories();

    fetchPlAccounts();

    fetchTransactions();
  }, []);

  return (
    <div className='flex items-center justify-center bg-gray-50 dark:bg-gray-900 min-h-screen'>
      <div className='flex flex-col items-center gap-16'>
        <header className='flex flex-col items-center gap-9'>
        <div className='h-[144px] w-[434px]'></div>
          <h1 className='leading text-2xl font-bold text-gray-800 dark:text-gray-100'>
            Welcome to
            Finance App
          </h1>
        </header>
        {/* content */}
        <section className='flex flex-col items-center gap-4'>
          <p className='text-lg text-gray-800 dark:text-gray-100'>Get started by uploading a finance documents (and best practices for dev env)</p>
          <p className='text-sm text-gray-500 dark:text-gray-400'>Supported file types: .pdf, .csv, .xls, .xlsx, .csv</p>
          <div className='flex gap-4'>
            <UploadComponent title="Drag & drop or click to upload finance doc" onUpload={handleUploadAccounts} />
            <UploadComponent title="Drag & drop or click to upload best practices" onUpload={handleUploadCategories} />
          </div>
          <FieldMapper accounts={plAccounts} categories={categories} />
          {reportTop5Data && reportData !== null && (<Charts top5={reportTop5Data} monthData={reportData} />)}
        </section>
      </div>
    </div>
  )
}
