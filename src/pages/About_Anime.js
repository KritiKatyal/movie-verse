import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect ,useRef} from 'react';
import { useCallback } from 'react'
import axios from 'axios';

const Anime_info = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const theme1 = useRef(null);
  const theme2 = useRef(null);
  const info_url = `https://api.gdriveplayer.us/v1/animes/id/${id}`;
  const anime_video = `https:\/\/database.gdriveplayer.us\/player.php?type=anime&id=${id}&episode=1`;
  const [datas , setDatas] = useState([{}]);
  const [titles, setTitles] = useState("");
  const [value, setValue] = useState("");

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setTitles(value);
    navigate(`/anime`)
  };

  const handleKeypress = e => {
    if (e.key === 'Enter') {
      setTitles(value);
    }
  };

  const showInfo = useCallback(async () => {
    const result = await fetch(info_url);
    const movies = await result.json();
    setDatas(movies);
    console.log(datas);
  },[info_url])
  // showInfo();

  const handleThemeChange = () => {
    var themeToggleDarkIcon = theme1.current;
    var themeToggleLightIcon = theme2.current;

    // Change the icons inside the button based on previous settings
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        themeToggleLightIcon.classList.remove('hidden');
    } else {
        themeToggleDarkIcon.classList.remove('hidden');
    }

    var themeToggleBtn = document.getElementById('theme-toggle');

    themeToggleBtn.addEventListener('click', function() {

        themeToggleDarkIcon.classList.toggle('hidden');
        themeToggleLightIcon.classList.toggle('hidden');

        if (localStorage.getItem('color-theme')) {
            if (localStorage.getItem('color-theme') === 'light') {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            }

        } else {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            }
        }
        
    });
}

  useEffect(() => {
    handleThemeChange();
    showInfo();
  }, [info_url])

  return (
  <div className='transition-all bg-black dark:bg-black h-full overflow-x-hidden'>
    <div className='bg-purple-900'>
      <div className='sm:pb-2 md:pb-10 xl:pb-2 pb-28'>
        <nav className="bg-purple-900 dark:bg-teal-800 p-5 py-2.5 transition-all ease-in-out absolute w-full z-10">
          <div className="container flex flex-wrap justify-between items-center transition-all ease-in-out">
            <a href="/" className="flex py-2 mx-auto sm:mx-0 transition-all ease-in-out">
              <img src="https://seeklogo.com/images/R/rolo-pelicula-cinema-logo-F4B8380CD3-seeklogo.com.png" className="mr-3 h-8 sm:h-9" alt="Flowbite Logo" />
              <span className="transition-all ease-in-out self-center text-xl font-semibold whitespace-nowrap text-white">Movies</span>
            </a>

            <a href="/anime" className="flex py-2 mx-auto sm:mx-0 transition-all ease-in-out">
              <img src="https://seeklogo.com/images/R/rolo-pelicula-cinema-logo-F4B8380CD3-seeklogo.com.png" className="mr-3 h-8 sm:h-9" alt="Flowbite Logo" />
              <span className="transition-all ease-in-out self-center text-xl font-semibold whitespace-nowrap text-white">Anime</span>
            </a>

            <a href="/series" className="flex py-2 mx-auto sm:mx-0 transition-all ease-in-out">
              <img src="https://seeklogo.com/images/R/rolo-pelicula-cinema-logo-F4B8380CD3-seeklogo.com.png" className="mr-3 h-8 sm:h-9" alt="Flowbite Logo" />
              <span className="transition-all ease-in-out self-center text-xl font-semibold whitespace-nowrap text-white">Series</span>
            </a>
            <div className='flex w-full xl:w-2/4'>
              <div className="relative w-full transition-all ease-in-out rounded-xl px-6">
                <button onClick={handleSubmit} className=' rounded-l-xl absolute bg-yellow-300 hover:bg-yellow-300'>
                  <div className="flex inset-y-0 left-2 items-center pointer-events-none">
                    <svg className="m-[8px] w-5 h-5 text-stone-700" fill='currentColor' aria-hidden="true" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                  </div>
                </button>
                <input type="text" id="search-navbar" onChange={handleChange} onKeyPress={handleKeypress} className="p-2 pl-10 w-full text-white rounded-xl outline-0 text-sm outline-none" placeholder="Search..." />
              </div>
              <button onAuxClick={handleThemeChange} id="theme-toggle" className="transition-all transform text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-100 rounded-lg text-sm scale-125 p-1">
                <svg ref={theme2} id="theme-toggle-dark-icon" className="hidden w-5 h-5 -translate-y-[2px] translate-x-[2px]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
                <svg ref={theme1} id="theme-toggle-light-icon" className="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>
    <div className='w-fit m-10 mt-24 rounded-3xl inset-0 transform hover:scale-105 hover:translate-y-5 hover:translate-x-5 transition duration-700'>
      <a href={anime_video}>
        <img src={datas[0].poster} className='shadow-xl hover:shadow-lg shadow-black transition-all overflow-hidden rounded-2xl h-96 hover:scale-105' alt="cant load" />
      </a>
    </div>
    {datas &&
      datas.map((records) => {
        const ids = records.id;

        return (
          <div className="px-12 py-4 text-white">
            <p className="font-bold text-xl leading-10 dark:text-yellow-200">
              Title : <span className='font-medium'>{records.title}</span>
            </p>
            <p className="font-bold text-xl leading-10 dark:text-yellow-200">
              Genre : <span className='font-medium'>{records.genre}</span>
            </p>
            <p className="font-bold text-xl leading-8 dark:text-yellow-200">
              Summary : <span className='font-medium'>{records.summary}</span>
            </p>
            <p className="font-bold text-xl leading-10 dark:text-yellow-200">
              Type : <span className='font-medium'>{records.type}</span>
            </p>
            <p className="font-bold text-xl leading-10 dark:text-yellow-200">
              Status : <span className='font-medium'>{records.status}</span>
            </p>
            <p className="font-bold text-xl leading-10 dark:text-yellow-200">
              Total Episodes : <span className='font-medium'>{records.total_episode}</span>
            </p>
            <p className="font-bold text-xl leading-10 dark:text-yellow-200">
              Subtitle : <span className='font-medium'>{records.sub}</span>
            </p>
          </div>
        );
      })}
  </div>
);
}

export default Anime_info