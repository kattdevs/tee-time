import {useDispatch, useSelector} from 'react-redux';
import {openModal} from '../store/uiSlice';
import {selectSlots, selectLoading} from '../store/bookingSlice';

export default function SlotGrid() {
    const dispatch = useDispatch();
    const slots = useSelector(selectSlots);
    const loading = useSelector(selectLoading);

    if (loading) return (
        <div style={{textAlign:'center', padding:'40px', color:'#C9A84C'}}>
            <p style={{fontSize: '16px', animation:'pulse 1.5s infinite'}}>
                Loading tee times...
            </p>
        </div>
    );

    if (!slots.length) return (
        <div style={{padding:'32px', textAlign:'center', background:'rgba(255,255,255,0.04)'}}>
            <p style={{color: 'rgba(255,255,255,0.3)', fontSize:'16px'}}>
                No tee times available for this date.
            </p>
            <p style={{color:'rgba(255,255,255,0.3)', fontSize:'13px', marginTop:'8px'}}>
                Try a different date or course.
            </p>
        </div>
    );

    return(
        <div>
            <p style={{color:'#C9A84C', fontSize:'13px', marginBottom:'16px', fontWeight:'600', letterSpacing:'1px', textTransform:'uppercase'}}>
                {slots.length} Tee Times Available
            </p>
            <div style={{display:'flex', flexWrap:'wrap', gap:'10px'}}>
                {slots.map(slot => (
                    <button key={slot} className='slot-btn' onClick={() =>
                        dispatch(openModal(slot))}>
                            {slot}
                        </button>
                ))}
            </div>
        </div>
);
}