import { useCallback, useEffect, useState } from 'react';
import style from './LandingPage.module.css';
import axios from 'axios';

import { ProgressSpinner } from 'primereact/progressspinner';

function LandingPage() {
  const [urlsList, setUrlsList] = useState([]);
  const [urlInput, setUrlInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleUrlInputChange = (event) => {
    setUrlInput(event.target.value)
  }

  const addUrl = async () => {
    setIsLoading(true);

    try {
      await axios.post('/url/shorten', { longUrl: urlInput });
      setUrlInput('');
      setIsLoading(false);
    } 
    catch (error) {
      setIsLoading(false);
      throw new Error(error);  
    }
  }

  const getAllUrls = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await axios.get('/url');
      setUrlsList(response.data.urls);
      setIsLoading(false);
    } 
    catch (error) {
      setIsLoading(false);
      throw new Error(error);  
    }
  }, []);

  useEffect(() => {
    getAllUrls();
  }, [getAllUrls])
  
  return (
    <div className={style.landingPageView}>
      <div className={style.landingContainer}>
        <p className={style.mainText}>
          <span>LIT URL</span>
        </p>

        <div className={style.inputButtonContainer}>
          <label style={ { color: '#fff', fontSize: '15px' } }>Add an URL</label>
          <div className={style.inputContainer}>
            <input onChange={handleUrlInputChange} className={style.addUrlInput} value={urlInput} type='text' placeholder='Long url...' />
            <button onClick={addUrl} className={style.addUrlButton}>ADD</button>
          </div>
        </div>
      </div>

      <div className={style.urlsList}>
        <div className={style.listHeader}>
          <div className={style.longUrlHeader}>Long Url</div>
          <div className={style.shortUrlHeader}>Short Url</div>
          <div className={style.clicksHeader}>Clicks</div>
        </div>

        {
          isLoading ? (
            <ProgressSpinner style={{width: '50px', height: '50px', marginTop: '10px'}} strokeWidth="4" />
          ) : (
            <div className={style.urlsListContainer}>
              {
                !urlsList?.length ? (
                  <div className={style.noUrlsDisplayed}>No URL's have been added yet</div>
                ) : (
                urlsList && urlsList.map((url) => (
                  <div key={url._id} className={style.urlRow}>
                    <div className={style.longUrlColumn}>{ url.longUrl }</div>
                    <div className={style.shortUrlColumn}>
                      <a className={style.urlLink} href={url.shortUrl}>{ url.shortUrl }</a>
                    </div>
                    <div className={style.clicksColumn}>{ url.clicks }</div>
                  </div>
                ))
              )}
            </div>
          )
        }
      </div>
    </div>
  )
}

export default LandingPage;