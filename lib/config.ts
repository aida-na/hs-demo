interface Guidelines {
  brand: string;
  compliance: string;
}

export const loadGuidelines = (): Guidelines => {
  if (typeof window === 'undefined') return { brand: '', compliance: '' };
  
  const saved = localStorage.getItem('guidelines');
  return saved ? JSON.parse(saved) : { brand: '', compliance: '' };
};

export const saveGuidelines = (guidelines: Guidelines): void => {
  localStorage.setItem('guidelines', JSON.stringify(guidelines));
};