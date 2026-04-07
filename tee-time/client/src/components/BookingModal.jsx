import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {X} from 'lucide-react';
import {closeModal, showToast, selectSlot} from '../store/uiSlice';
import {createBooking, fetchSlots, selectCourse, selectDate, selectLoading, clearError} from '../store/bookingSlice';

export default function BookingModal () {
    const dispatch = useDispatch();
    const slot = useSelector(selectSlot);
    const course = useSelector(selectCourse);
    const date = useSelector(selectDate);
    const loading = useSelector(selectLoading);

    const [form, setForm] = useState({ name:'', email: '', players: '1'});
    const [errors, setErrors] = useState({});

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = 'Full name is required';
        if (!form.email.trim()) e.mail = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+$/.test(form.email)) e.mail = 'Enter a valid email';
        return e;
    };

    const handleSubmit = async () => {
        const errs = validate();
        if (Object.keys(errs).length) {
            setErrors(errs);
             return;
            }
        const result = await dispatch(createBooking({
            courseId: course, 
            date: date, 
            time:slot, 
            name: form.name,
            email: form.email,
            players: Number(form.players),
        }));
            if (createBooking.fulfilled.match(result)) {
                dispatch(closeModal());
                dispatch(showToast({message:`Tee time ${slot} booked!`, type:'success'}));
                dispatch(fetchSlots({course, date})); //refresh available slots
            } else {
                dispatch(showToast({message:result.payload, type:'error'}));
            }
            };
            const inputStyle = field => ({
                width:'100%', padding:'12px 16px', borderRadius:'10px',
                background: 'rgba(255,255,255,0.6)',
                border: errors[field] ? '1px solid #EF4444' : '1px solid rgba(255,255,255,0.06)',
                color: 'white', fontSize: '15px', outline: 'none', boxSizing:'border-box', });

                return (
                    <div onClick={() => dispatch(closeModal ())}
                    style={{position:'fixed', inset:0, background: 'rgba(0,0,0,0.7)', backdropFilter:'blur(6px)', display:'flex', alignItems:'center', justifyContent:'center', zIndex: 200, padding: '16px'}}
                    >
                    <div onClick={e => e.stopPropagation()} className='gold-border'
                    style={{background:'rgba(13,59,30,0.95)', borderRadius:'24px', padding:'36px', width:'100%', maxWidth:'460px', backdropFilter:'blur(20px)'}}
                    >
                        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'28px'}}>
                            <div>
                                <h2 style={{fontFamily:'Playfair Display serif', color:'white', fontSize:'24px', fontWeight:'700'}}>Confirm Booking</h2>
                                <p style={{color:'#C9A84C', fontSize:'14px', marginTop:'4px'}}>{slot} on {date}</p>
                                </div>
                                <button onClick={() => dispatch(closeModal())} style={{background:'rgba(255,255,255,0.1)', border:'none',borderRadius:'50%', width:'36px', cursor:'pointer', color:'white'}}>
                                    <X size={18} />
                                </button>
                            </div>

                            <div style={{display:'flex', flexDirection:'column', gap:'16px'}}>
                                <div>
                                    <label style={{color:'rgba(255,255,255,0.7)', fontSize:'13px', display:'block', marginBottom:'6px'}}>Full Name</label>
                                    <input value={form.name} onChange={e => {setForm(p => ({...p,name:e.target.value}));
                                    setErrors(p => ({...p,name:''})); }} placeholder='John Smith' style={inputStyle('name')}/>
                                    {errors.name && <p style={{ color:'#EF4444', fontSize:'12px', marginTop: '4px'}}>{errors.name}</p>}
                                </div>
                                <div>
                                <label style={{color:'rgba(255,255,255,0.7)', fontSize:'13px', display:'block', marginBottom:'6px'}}>Email Address</label>
                                <input value={form.email} onChange={e => {setForm(p => ({...p, email:e.target.value})); setErrors(p => ({...p, email:''})); }}
                                 placeholder='john@example.com' type='email' style={inputStyle('email')}/>
                                {errors.email && <p style={{color:'#EF4444', fontSize:'12px', marginTop:'4px'}}>{errors.email}</p>}
                                </div>
                                <div>
                                   
            <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Number of Players</label>
            <select value={form.players} onChange={e => setForm(p => ({...p, players: e.target.value}))} style={{ ...inputStyle('players'), cursor: 'pointer' }}>
              {[1,2,3,4].map(n => <option key={n} value={n}>{n} Player{n > 1 ? 's' : ''}</option>)}
            </select>
          </div>
        </div>
 
        <button onClick={handleSubmit} disabled={loading}
          style={{ marginTop: '28px', width: '100%', padding: '16px', borderRadius: '12px', background: loading ? '#C9A84C88' : 'linear-gradient(135deg, #C9A84C, #E8C87A)', color: '#0D3B1E', fontWeight: '700', fontSize: '16px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', letterSpacing: '0.5px' }}
        >
          {loading ? 'Booking...' : 'Confirm Tee Time'}
        </button>
      </div>
    </div>
  );
}

 
