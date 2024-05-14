import React, { useState } from 'react'
import './loanCalculator.scss'
import { Loan } from 'loanjs'
import { IoIosArrowDown } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import clsx from 'clsx';

interface Loaner {
    amount: number,
    capitalSum: number,
    sum: number,
    interestSum: number,
    installments: {capital: number, installment: number, interest: number, interestSum: number, remain: number}[]
}

interface LoanPropType {
    UserStyle?: {
        backgroundColor: string,
        color: string,
        fontFamily: string,
        fontSize: string,
        width: string,
        clearButton: {
            text: string,
            backgroundColor: string,
            color: string,
        },
        calculateButton: {
            text: string,
            backgroundColor: string,
            color: string,
        }

    }
}

export const LoanCalculator = ({UserStyle}: LoanPropType) => {
    const [monthlyPayment, setmonthlyPayment] = useState('')
    const [totalInterest, settotalInterest] = useState('')
    const [totalAmount, settotalAmount] = useState('')
    const [calculatorValues, setcalculatorValues] = useState({principal: '', totalMonths: '', interestRate: '', paymentMethod: ''})
    const [paymentDropdown, setpaymentDropdown] = useState(false)
    const handleChange = (e: string, variable: string) => {
        const numericValue = e.replace(/\D/g, '')
        setcalculatorValues({...calculatorValues, [variable]: e})
    }
    console.log(calculatorValues)
    const calculate = () => {
        const loan: Loaner = new (Loan as any)(parseInt(calculatorValues.principal), 12, parseInt(calculatorValues.interestRate), calculatorValues.paymentMethod === 'Start-of-Period' ? 'annuityDue' : 'annuity');
        setmonthlyPayment(loan.installments[0].installment.toString());
        settotalInterest(loan.interestSum.toString())
        settotalAmount(loan.sum.toString())
        console.log(loan)
    }
    const clearer = () => {
        setcalculatorValues({principal: '', totalMonths: '', interestRate: '', paymentMethod: ''})
        setmonthlyPayment('')
        settotalAmount('')
        settotalInterest('')
    }
    const mainStyle = {
        backgroundColor: UserStyle?.backgroundColor ?? '#F5F6F7', 
        color: UserStyle?.color ?? 'black',
        fontFamily: UserStyle?.fontFamily ?? 'Roboto',
        fontSize: UserStyle?.fontSize ?? '16px',
        width: UserStyle?.width ?? '493px'
    }
    return (
        <div className='loan-main' style={mainStyle}>
            <div className='loan-modal'>
                <div className='loan-sub'>
                    <div style={{textAlign: 'center', fontWeight: '500'}}>Loan Calculator</div>
                    <div className='loan-values'>
                        <span>Loan Amount?:</span>
                        <input type="text" value={calculatorValues.principal} onChange={(e) => handleChange(e.target.value, 'principal')} style={{textAlign: 'right'}} placeholder='$0.00' />
                    </div>
                    <div className='loan-values'>
                        <span>Number of Months?(#):</span>
                        <input type="text" value={calculatorValues.totalMonths} onChange={(e) => handleChange(e.target.value, 'totalMonths')} style={{textAlign: 'right'}} placeholder='0' />
                    </div>
                    <div className='loan-values'>
                        <span>Annual Interest Rate?:</span>
                        <input type="text" value={calculatorValues.interestRate} onChange={(e) => handleChange(e.target.value, 'interestRate')} style={{textAlign: 'right'}} placeholder='0.0%' />
                    </div>
                    <div className='loan-values' style={{cursor: 'default'}}>
                        <span>Payment Method?:</span>
                        <div className='loan-payment-drop-div' onClick={() => setpaymentDropdown(!paymentDropdown)}>
                            <span>{calculatorValues.paymentMethod}</span>
                            <span><IoIosArrowDown /></span>
                            {paymentDropdown&& <div className='loan-payment-dropdown'>
                                <div onClick={() => handleChange('End-of-Period', 'paymentMethod')} className='loan-payment-dropdown-value'>
                                    <span>End-of-Period</span>
                                    {calculatorValues.paymentMethod === 'End-of-Period' && <span><FaCheck /></span>}
                                </div>
                                <div onClick={() => handleChange('Start-of-Period', 'paymentMethod')} className='loan-payment-dropdown-value'>
                                    <span>Start-of-Period</span>
                                    {calculatorValues.paymentMethod === 'Start-of-Period' && <span><FaCheck /></span>}
                                </div>
                            </div>}
                        </div>
                    </div>
                    <div className='loan-horiz-main'><div className='loan-horiz'></div></div>
                    <div className='loan-values'>
                        <span>Monthly Payment:</span>
                        <input type="text" value={monthlyPayment} onChange={(e) => setmonthlyPayment(e.target.value)} style={{textAlign: 'right'}} placeholder='$0.00' />
                    </div>
                    <div className='loan-values'>
                        <span>Total Interest:</span>
                        <input type="text" value={totalInterest} onChange={(e) => settotalInterest(e.target.value)} style={{textAlign: 'right'}} placeholder='$0.00' />
                    </div>
                    <div className='loan-values'>
                        <span>Total Principal & Interest:</span>
                        <input type="text" value={totalAmount} onChange={(e) => settotalAmount(e.target.value)} style={{textAlign: 'right'}} placeholder='$0.00' />
                    </div>
                </div>
                <div className='loan-buttons'>
                    <button className='button' onClick={clearer} style={{backgroundColor: UserStyle?.clearButton.backgroundColor ?? 'white', color: UserStyle?.clearButton.color ?? 'black'}}>{UserStyle?.clearButton.text ?? 'Clear'}</button>
                    <button className='button' onClick={calculate} style={{backgroundColor: UserStyle?.calculateButton.backgroundColor ?? '#FBAF1D', color: UserStyle?.calculateButton.color ?? '#103049'}}>{UserStyle?.calculateButton.text ?? 'Calculate'}</button>
                </div>
            </div>
        </div>
    )
}
