declare class CalcLeap {
  constructor(options?: { baseUrl?: string; timeout?: number });
  
  mortgage(principal: number, rate: number, years: number): Promise<any>;
  bmi(weight: number, height: number, unit?: 'imperial' | 'metric'): Promise<any>;
  compound(principal: number, rate: number, years: number, compound?: string): Promise<any>;
  loan(amount: number, rate: number, months: number): Promise<any>;
  retirement(currentAge: number, retireAge: number, savings: number, monthlyContribution: number, rate: number): Promise<any>;
  tip(bill: number, percent: number, people?: number): Promise<any>;
  percentage(value: number, total: number): Promise<any>;
  insurance(age: number, coverage: number, type?: string, term?: number): Promise<any>;
}

export = CalcLeap;
