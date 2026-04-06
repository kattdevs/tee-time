
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {setCourse} from '../store/bookingSlice';

export default function CourseCard({ course, compact = false }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSelect = () => {
        dispatch(setCourse(course.id));
        navigate('/book');
    };

    return (
        <div
         className='gold-border'
         style={{
            borderRadius: '20px', overflow:'hidden',
            background:'rgba(255,255,255,0.05)',
            WebkitBackdropFilter: 'blur(1px)',
            transition:'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer',
         }}
         onMouseEnter={e => { e.currentTarget.style.tranform ='translateY(-6px)';
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.3)';}}
            onMouseLeave={e => {e.currentTarget.style.transform ='translateY(0)';
                e.currentTarget.style.boxShadow =''}}
                >
                    {/*Course*/}
                    {!compact && (
                        <div style={{ height:'200px', overflow:'hidden', position:'relative'}}>
                            <img src={course.image || '/image/placeholder.jpg'} alt={course.name}
                            style={{width:'100%', height:'100%', objectFit:'cover'}}/>
                            <div style={{position:'absolute', bottom:0, left:0, right:0, height:'80px', background:'linear-gradient(to top, rgba(13,59,30,0.9),transparent)'}}/>
                            {course.holes && (
                                <span style={{position: 'absolute', top:'12px',right:'12px', background:'rgba(201,168,76,0.9)', color:'#0D3B1E', padding:'4px 12px', borderRadius:'999px', fontSize:'12px', fontWeight:'700'}}>
                                    {course.holes} Holes
                                </span>
                             )}
                         </div>
         )}
         <div style={{padding: compact ? '16px' : '20px'}}>
            <h3 style={{fontFamily: 'PlayFair Display, serif', color:'white', fontSize: compact ? '16px' : '20px', fontWeight:'700', marginBottom:'8px',}}>
                {course.name}
            </h3>
            {compact && (
                <p style={{color:'rgba(255,255,255,0.65)', fontSize:'14px', lineHeight:1.6, marginBottom:'16px'}}>
                    {course.description}
                </p>
            )}
            {course.par && (
                <p style={{color:'#C9A84C', fontSize:'13px', marginBottom:'16px'}}>
                    Par{course.par}
                </p>
            )}
            <button onClick={handleSelect} className='slot-btn' style={{width:'100%'}}>
                Select Course
            </button>
        </div>
    </div>
    );
}