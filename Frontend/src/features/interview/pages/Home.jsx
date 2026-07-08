import React from 'react';
import "../style/home.scss"

const Home = () => {
  return (
    <main className='home'>
        <div class="interview-input-group">
        <div class="left">
            <label htmlFor="jobDescription">Job Description</label>
            <textarea name="jobDescription" id="jobDescription" placeholder='Enter job description here'></textarea>
        </div>
        <div class="right">
            <div class="input-group">
                <p>Resume <small className='highlight'>(Use Resume and self description together for best result)</small></p>
                <label className='file-label' htmlFor="resume">Upload Resume</label>
                <input hidden type="file" name='resume' id='resume' accept='.pdf' />
            </div>
            <div class="input-group">
                <label htmlFor="selfDescription">Self Description</label>
                <textarea name="selfDescription" id="selfDescription" placeholder='Describe yourself here'></textarea>
            </div>
            <button className='button primary-button'>Generate Interview Report</button>
        </div>
        </div>
    </main>
  );
}

export default Home;
