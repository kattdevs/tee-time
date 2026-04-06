import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCourses, selectCourses} from '../store/bookingSlice';
import Hero from '../components/Hero';
import CourseCard from '../components/CourseCard';

export default function Home() {
    const dispatch = useDispatch();
    const course = useSelector(selectCourses);

    useEffect(() => {dispatch(fetchCourses()); }, []);

    return (
        <div style={{background:'#0D3B1E', minHeight:'100vh'}}>
            <Hero />

            {/*Courses section*/}
            <section style={{padding:'100px 24px', maxWidth:'1200px', margin:'0 auto'}}>
                <div style={{textAlign:'center', marginBottom:'64px'}}>
                   <p style={{ color:'#C9A84C', letterSpacing:'3px', fontSize:'12px', fontWeight:'700', textTransform:'uppercase', marginBottom:'12px'}}>Our Courses</p>
                   
          <h2 style={{ fontFamily: 'Playfair Display, serif', color: 'white', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '700', lineHeight: 1.2 }}>
            World-Class Venues
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {courses.map(c => <CourseCard key={c.id} course={c} />)}
        </div>
      </section>
    </div>
  );
}


          