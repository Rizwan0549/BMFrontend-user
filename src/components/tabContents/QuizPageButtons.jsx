import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Timer from './Timer';


const QuizPageButtons = ({data}) => {
    const { chapterSlug } = useParams(); // Get the course slug from the URL
    const time = new Date();
  time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
    //Find chapter name by chapter slug
    const findChapterName = () => {
      for (let course of data) {
      for (let chapter of course.chapters) {
          if (chapter.slug === chapterSlug) {
          return chapter.chapter; // Return the quiz array if the chapter is found
          }
      }
      }
      return null; // Return null if the chapter is not found
  };
    let chapterName = findChapterName();
    const navigate = useNavigate();
  return (
    <div className='bm-chapters tab-content'>
      <Timer/>
        <h1 className='heading'>{chapterName}</h1>
        <div className='quiz-buttons'>
            <button onClick={()=>navigate(`/chapter/${chapterSlug}/revision`)}>Revision</button>
            <button onClick={()=>navigate(`/chapter/${chapterSlug}/practise`)}>Practice</button>
            <button onClick={()=>navigate(`/chapter/${chapterSlug}/test`)}>Test</button>

        </div>
    </div>
  )
}

export default QuizPageButtons