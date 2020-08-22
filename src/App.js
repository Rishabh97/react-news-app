import React, { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web'
import wordsToNumbers from 'words-to-numbers';
import NewsCards from './components/NewsCards/NewsCards'
const alanKey = '57e3632147487b9ecc3b70dea030eb9e2e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {
    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);
    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles,number }) => {
                if (command === 'newHeadlines') {
                    setNewsArticles(articles)
                    setActiveArticle(-1)
                }else if (command === 'highlight') {
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                }else if (command === 'open') {
                    const parsedNumber = number.length > 2 ? wordsToNumbers(number) : number;
                    const article = articles[parsedNumber -1];

                    if (parsedNumber > 20) {
                        alanBtn().playText('Please try that again. ')
                    }else {
                        console.log(article);
                        window.open(article.url, '_blank');
                        alanBtn().playText('Opening...')


                    }
                }
            }
        })
    }, [])
    // the second parameter tells when should hs function be called , if empty array , it means on cpmponent mount just once . 

    return(
        <div>
            <h1>Your Daily Newspaper.</h1>
            <NewsCards articles={newsArticles} activeArticle={activeArticle} />
            <h3>Made with &hearts; by Rishabh</h3>
        </div>
    )
}

export default App