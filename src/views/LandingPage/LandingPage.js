import { useNavigate } from 'react-router-dom';
import style from './LandingPage.module.css';

function LandingPage() {
  const navigate = useNavigate();

  const handleGroupInputChange = (event) => {
    console.log('VALUE', event.target.value);
  }
  const searchGroup = () => {
    console.log('searching...')
  }
  
  return (
    <div className={style.landingPageView}>
      <div className={style.landingContainer}>
        <p className={style.mainText}>
          <span>LIT URL</span>
        </p>

        <div className={style.inputButtonContainer}>
          <label style={ { color: '#fff', fontSize: '15px' } }>Add an URL</label>
          <div className={style.inputContainer}>
            <input onChange={handleGroupInputChange} className={style.addUrlInput} type='text' placeholder='Long url...' />
            <button onClick={searchGroup} className={style.addUrlButton}>ADD</button>
          </div>
        </div>
      </div>

      <div className={style.urlsList}>
        Url's List
      </div>
    </div>
  )
}

export default LandingPage;