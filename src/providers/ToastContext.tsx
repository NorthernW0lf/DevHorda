import React, { createContext, useContext, useState, useCallback } from 'react'
import Toast from '../components/Toast'

type ToastContextType = {
    showToast: (message: string, color?: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [message, setMessage] = useState('')
    const [visible, setVisible] = useState(false)
    const [backgroundColor, setBackgroundColor] = useState('green')

    const showToast = useCallback((msg: string, color = 'green') => {
        setMessage(msg)
        setBackgroundColor(color)
        setVisible(true)
        setTimeout(() => setVisible(false), 2000)
    }, [])

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <Toast visible={visible} message={message} backgroundColor={backgroundColor} />
        </ToastContext.Provider>
    )
}

export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext)
    if (!context) throw new Error('useToast must be used within ToastProvider')
    return context
}