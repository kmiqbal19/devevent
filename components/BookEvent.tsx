'use client';
import {useState} from 'react';
const BookEvent = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault();
        setTimeout(() => {
            setSubmitted(true);         
        }, 1000);
    };

  return (
    <div id="book-event">
        {submitted ? (  
        <p className="text-sm">
            Thank you for signing up!
        </p>
        ) : (
            <form onSubmit = {handleSubmit}>
                <div>

             
            <label htmlFor="email">Email Address</label>
            <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
               </div>
            <button type="submit" className="mt-1">
                Book My Spot
            </button>
            </form>
        
        )}
    </div>
  )
}

export default BookEvent