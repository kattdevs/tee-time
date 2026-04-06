import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {hideToast, selectToast} from '../store/uiSlice';
import {CheckCircle, XCircle} from 'lucide-react';

export default function Toast() {
    const dispatch = useDispatch();
    const toast = useSelector(selectToast);

    useEffect(() => {
        if (toast.visible) {
            const t = setTimeout(() => dispatch(hideToast()), 3500);
            return () => clearTimeout(t);
        }
    }, [toast.visible]);

    if (!toast.visible) return null;

    const isSucess = toast.type === 'success';
    return (
        <div style={{
            position:'fixed', bottom:'32px', right: '32px', zIndex: 300,
            background: isSuccess ? 'rgba(13,59,30,0.95)' : 'rgba(127,29,29,0.95)',
            border: `1px solid ${isSuccess ? '#C9A84C' : '#EF4444'}`,
            borderRadius: '14px', padding: '16px 24px',
            display: 'flex', alignItems:'center', gap:'12px',
            backdropFilter: 'blur(12px)', boxShadow:'0 8px 32px rgba(0,0,0,0.03)',
            animation: 'slideIn 0.3 ease',
            maxWidth: '380px',
        }}>
            {isSuccess ? <CheckCircle size={20} color='#C9A84C' /> : <XCircle size{20} color='#EF4444' />}
            <span style={{color:'white', fontsize:'14px', fontWeight:'500'}}>
                {toast.message}
            </span>
            </div>
    );
}