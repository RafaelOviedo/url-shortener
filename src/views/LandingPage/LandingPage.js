import { useCallback, useEffect, useState } from 'react';
import EmailModal from '../../components/Auth/EmailModal/EmailModal';
import style from './LandingPage.module.css';
import axios from 'axios';

import { ProgressSpinner } from 'primereact/progressspinner';
import { useSelector } from 'react-redux';

function LandingPage() {
  const [urlsList, setUrlsList] = useState([]);
  const [urlInput, setUrlInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentUser = useSelector((state) => state.auth.user);

  const handleUrlInputChange = (event) => {
    setUrlInput(event.target.value)
  }

  const addUrl = useCallback(async(event) => {
    event.preventDefault();
    setIsLoading(true);

    const data = {}

    if (currentUser) {
      data.longUrl = urlInput;
      data.userId = currentUser._id;
    } else {
      data.longUrl = urlInput;
    }

    try {
      await axios.post('/url/shorten', data);
      setUrlInput('');
      setIsLoading(false);
    } 
    catch (error) {
      setIsLoading(false);
      throw new Error(error);  
    }
  }, [urlInput, currentUser]);

  const getAllUrls = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`/url?${currentUser ? `userId=${currentUser._id}` : ''}`);
      setUrlsList(response.data.urls);
      setIsLoading(false);
    } 
    catch (error) {
      setIsLoading(false);
      throw new Error(error);  
    }
  }, [currentUser]);

  const openEmailModal = () => {
    setIsModalOpen(true);
  }

  const closeEmailModal = (data) => {
    setIsModalOpen(data);
  }

  useEffect(() => {
    getAllUrls();
  }, [getAllUrls, addUrl, currentUser])
  
  return (
    <div className={style.landingPageView}>
      <div className={style.landingContainer}>
        <p className={style.mainText}>
          <span>LIT URL</span>
        </p>

        <div className={style.inputButtonContainer}>
          <div className={style.inputContainer}>
            <input onChange={handleUrlInputChange} className={style.addUrlInput} value={urlInput} type='text' placeholder='Long url...' />
            <button onClick={addUrl} className={style.addUrlButton}>ADD</button>
          </div>
          <p className={style.addEmailMessage}>The URL's below can be seen by anyone, if you want to store your own URL's please <span onClick={openEmailModal} className={style.addAnEmailLink}>add an email.</span></p>
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

        {
          isModalOpen ?
            <EmailModal onModalClose={closeEmailModal} />
        : ''
        }
      </div>
    </div>
  )
}

export default LandingPage;