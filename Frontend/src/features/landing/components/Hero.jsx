import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./../styles/hero.scss";


const Hero = () => {


return (

<section className="hero">


<div className="hero-content">


<motion.h1
initial={{opacity:0,y:30}}
animate={{opacity:1,y:0}}
>
Ace Your Next Interview
<br/>
With <span>AI</span>
</motion.h1>



<p>

Analyze your resume, generate personalized
interview questions, and build an ATS-friendly
resume using Artificial Intelligence.

</p>



<div className="hero-buttons">

<Link to="/register">
Start Preparing 🚀
</Link>


<Link to="/login">
Login
</Link>

</div>


</div>



<div className="hero-image">

<div className="ai-card">

🤖
<br/>

Gemini AI
<br/>

Resume Analysis

</div>

</div>



</section>

)

}


export default Hero;