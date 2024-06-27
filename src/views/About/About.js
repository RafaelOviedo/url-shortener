import style from './About.module.css';
import algorithmImage from '../../assets/images/short-id-algorithm.jpeg';
import calculateCollisionProbability from '../../utils/calculateCollisionProbability';
import { useState } from 'react';

function About() {
  const [collisionProbability, setCollisionProbability] = useState(0);
  const [calculationValue, setCalculationValue] = useState('');

  const handleCalculationInputChange = (event) => {
    setCalculationValue(event.target.value);
  }

  const handleCalculateClick = () => {
    const value = parseInt(calculationValue, 10);
    const result = calculateCollisionProbability(value);
    setCollisionProbability(result);
  };

  return (
    <div className={style.aboutView}>
      <div className={style.contentContainer}>
        <h1>About LIT URL</h1>

        <p>This is a project I built to understand how an URL-Shortener works behind the scenes. Here's a bit about what it does and how it works.</p>

        <h2>What it does?</h2>

        <div className={style.whatItDoesContainer}>
          <h3>Shorten Long URLs:</h3>
          
          <p>Got a long, unwieldy link? Turn it into a short, neat one.</p>

          <h3>Retrieve All Your URLs:</h3>

          <p>In the main page you can see all the URLs you've shortened, generally, and also your own if you created an account.</p>

          <h3>User Accounts:</h3> 

          <p>Create an account with your email to store and manage your shortened URLs.</p>
        </div>

        <h2>How it works?</h2>

        <p>The algorithm used to generate short, unique URLs securely is the following:</p>

        <div className={style.exampleContainer}>
          <img src={algorithmImage} className={style.algorithmImage} alt='algorithm' />
        </div>

        <h2>Why is this algorithm a good choice?</h2>

        <div className={style.goodAlgorithmContainer}>

          <h3>Randomness:</h3>
          
          <p>
            The algorithm uses a Cryptographically Secure Pseudo-Random Number Generator (CSPRNG) (crypto.randomInt).
            <br />
            <br />
            This means the short URLs it generates are truly random and secure.
          </p>
          
          <h3>Low Collision Probability:</h3>
          
          <p>
            With a length of 7 characters and 62 characters to choose from [a-z-A-Z-0-9], there are 62^7 possible combinations.
            <br />
            <br />
            That's 3,521,614,606,208 unique URLs!
            <br />
            <br />
            This huge number makes it really unlikely that two identical short URLs will be generated.
            <br />
            <br />
            And besides that, we are checking first if the ID generated
            is not already stored in the database, so if by any luck, we get a repeated ID, it will iterate again until finds one that is not already stored.
          </p>
        </div>

        <h2>A Bit About Collision Probability</h2>

        <div className={style.aboutCollisionProbabilityContainer}>
          <p>
            You might have heard of the 'birthday paradox'. 
            <br />
            <br />
            It's a way to think about how likely it is that two people in a room share the same birthday. 
            For URLs, even as the number of URLs grows, the chance of a collision (two identical short URLs) is really, really small because of the large 
            number of possible combinations.
            <br />
            <br />
            To determine the probability of collisions when generating 7-character long IDs from the given alphabet, we need to analyze the possible combinations and the likelihood of two IDs being the same (colliding).
          </p>
        </div>

        <h2>Step-by-Step Calculation:</h2>

        <div className={style.stepByStepContainer}>
          <h3>1. Number of Possible Characters:</h3>
          <p>The alphabet has 62 characters (26 uppercase letters + 26 lowercase letters + 10 digits).</p>
          <h3>2. Total Possible Combinations:</h3>
          <p>For a 7-character ID, each character can be one of 62 possible characters. Therefore, the total number of unique IDs is: <br /><br /> N = 62^7</p>
          <h3>3. Calculating N:</h3>
            <p>N = 62^7 <br /><br /> N = 62^7 = 3521614606208.</p>
          <p>This means there are 3,521,614,606,208 possible unique IDs.</p>
          <h3>4. Birthday Paradox and Collision Probability:</h3>
          <p>The problem of finding collisions in randomly generated IDs is analogous to the birthday paradox. The probability P(n) of at least one collision after generating n IDs can be approximated using a particular formula.</p>
          
          <p>If you want to know more about the math behind, you can check the following articles:</p>
          <a style={ { wordBreak: 'break-all', color: 'lightblue' } } href='https://en.wikipedia.org/wiki/Birthday_problem' target='_blank' rel='noreferrer'>* https://en.wikipedia.org/wiki/Birthday_problem</a>
          <br />
          <br />
          <a style={ { wordBreak: 'break-all', color: 'lightblue' } } href='https://en.wikipedia.org/wiki/Universally_unique_identifier#Collisions' target='_blank' rel='noreferrer'>* https://en.wikipedia.org/wiki/Universally_unique_identifier#Collisions</a>

          <p>So, the probability with these conditions of at least one collision after generating 1 million IDs, is approximately 13.3%.</p>
        </div>

        <h2>Collision Probability Calculator</h2>

        <div className={style.calculatorContainer}>
          <p>You can try how much can the probability be with the next calculator, just add the quantity of IDs you would like to create and see how much is the collision probability.</p>

          <h3>Unique possible IDs quantity (62^7):</h3>
          <span>3,521,614,606,208</span>
          
          <h3>Quantity of IDs to generate:</h3>
          <div>
            <input onChange={handleCalculationInputChange} className={style.idsToGenerateInput} type='number' value={calculationValue} />
            <button onClick={handleCalculateClick} className={style.calculateButton}>Calculate</button>
          </div>

          <h3>Probability of Collision:</h3>
          <span className={style.calculationResult}>{ `${collisionProbability} %` }</span>
          <br />
          <br />

        </div>
      </div>
    </div>
  )
}

export default About;