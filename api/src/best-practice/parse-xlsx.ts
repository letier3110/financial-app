import * as XLSX from 'xlsx';

export const parseXlsx = async (buffer: Buffer) => {
  // const bufferArray = new Uint8Array(buffer);
  const wb = XLSX.read(buffer, {
    type: 'buffer',
  });
  const wsname = wb.SheetNames[0];
  const ws = wb.Sheets[wsname];
  const data = XLSX.utils.sheet_to_json(ws);
  console.log('[debig] xlsx', data);
  return data;
};
