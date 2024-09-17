'use client'

import { FC, useState } from 'react'
import { FixedSizeList as List, ListChildComponentProps } from 'react-window'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { ICategory } from '../lib/interfaces'
import { host, port } from '../lib/api'
import { Sparkle } from 'lucide-react'

interface FieldMapperProps {
  accounts: string[]
  categories: ICategory[]
}

export default function FieldMapper({ accounts, categories }: FieldMapperProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [fieldMapping, setFieldMapping] = useState<Record<string, string>>({})

  const handleFieldChange = (targetField: string, uploadedField: string) => {
    setFieldMapping((prev) => ({ ...prev, [targetField]: uploadedField }))
  }

  const handleUploadMapper = async () => {
    if (Object.keys(fieldMapping).length === 0) {
      return
    }
    try {
      const arrayBody = Object.entries(fieldMapping).map(([key, value]) => ({ placcount: key, bestPracticeName: value }))

      const response = await fetch(`https://${host}:${port}/mapper/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ items: arrayBody })
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      setIsOpen(false)
      console.log('Success:', data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleSubmit = () => {
    // console.log('Field Mapping:', fieldMapping)
    setIsOpen(false)
    handleUploadMapper()
    // Here you would typically send the mapping to your backend or process it further
  }

  const handleRandomSubmit = () => {
    const randomMapping: Record<string, string> = {}
    categories.forEach((category) => {
      randomMapping[category.name] = accounts[Math.floor(Math.random() * accounts.length)]
    })
    setFieldMapping(prev => ({ ...prev, ...randomMapping }))
    handleUploadMapper()
  }

  const isEmpty = accounts.length === 0 || categories.length === 0

  return (
    <div className='flex flex-col items-center gap-4'>
      <Button disabled={isEmpty} onClick={() => setIsOpen(true)}>
        Open Field Mapper
      </Button>
      {isEmpty && <p className='text-red-500'>Please provide accounts and categories</p>}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className='sm:max-w-[625px]'>
          <DialogHeader>
            <DialogTitle>Map Fields</DialogTitle>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <MapperForm
              accounts={accounts}
              fieldMapping={fieldMapping}
              categories={categories}
              handleFieldChange={handleFieldChange}
            />
          </div>
          <DialogFooter>
            <Button onClick={handleRandomSubmit}>
              <Sparkle size={24} className='stroke-current mr-2' />
              Save Mapping with AI recommendations
            </Button>
            <Button onClick={handleSubmit}>Save Mapping</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface CategoryItemProps extends ListChildComponentProps {
  categories: ICategory[]
  accounts: string[]
  fieldMapping: Record<string, string>
  index: number
  style: React.CSSProperties
  changeField: (targetField: string, uploadedField: string) => void
}

const CategoryItem: FC<CategoryItemProps> = ({ categories, accounts, fieldMapping, index, style, changeField }) => {
  const category = categories[index]
  return (
    <div key={category.id} style={style} className='grid grid-cols-4 items-center gap-4'>
      <label htmlFor={category.id.toString()} className='text-right col-span-2'>
        {category.name}
      </label>
      <Select onValueChange={(value) => changeField(category.name, value)} value={fieldMapping[category.name]}>
        <SelectTrigger className='col-span-2'>
          <SelectValue placeholder='Select a field' />
        </SelectTrigger>
        <SelectContent>
          {accounts.map((uploadedField) => (
            <SelectItem key={uploadedField} value={uploadedField}>
              {uploadedField}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

interface MapperFormProps {
  accounts: string[]
  categories: ICategory[]
  fieldMapping: Record<string, string>
  handleFieldChange: (targetField: string, uploadedField: string) => void
}

const MapperForm: FC<MapperFormProps> = ({ categories, accounts, fieldMapping, handleFieldChange }) => {
  return (
    <form>
      <div style={{ height: 400, width: '100%' }}>
        <List height={400} itemCount={categories.length} itemSize={60} width={'100%'}>
          {(props) => (
            <CategoryItem
              fieldMapping={fieldMapping}
              accounts={accounts}
              changeField={handleFieldChange}
              categories={categories}
              {...props}
            />
          )}
        </List>
      </div>
    </form>
  )
}
