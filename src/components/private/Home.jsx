import React from 'react'
import Image1 from '../../assets/img/bubble-1.png';
import Image2 from '../../assets/img/bubble-2.png';
import Image3 from '../../assets/img/bubble-13.png';
import Image4 from '../../assets/img/bubble-14.png';
import Image5 from '../../assets/img/bubble-15.png';
import Image6 from '../../assets/img/image-1.png';
import Image7 from '../../assets/img/image-2.png';

const Home = () => {
  return (
    <div className='mx-auto my-8 main__container'>
      <h1 className="text-5xl font-bold dark:text-slate-200">Hola! Bienvenido TO CREATIVA</h1>

      <div className='home__bubbles'>
        <ul className='bubbles__list'>
          <li className='list__item list__item-bubble-1'>
            <div className='item__container'>
              <img src={Image1} alt="" className='bubble-img' />
            </div>
          </li>
          <li className='list__item list__item-bubble-2'>
            <div className='item__container'>
              <img src={Image2} alt="" className='bubble-img' />
            </div>
          </li>

          <li className='list__item list__item-bubble-3'>
            <div className='item__container'>
              <img src={Image3} alt="" className='bubble-img' />
            </div>
          </li>

          <li className='list__item list__item-bubble-4'>
            <div className='item__container'>
              <img src={Image4} alt="" className='bubble-img' />
            </div>
          </li>

          <li className='list__item list__item-bubble-5'>
            <div className='item__container'>
              <img src={Image5} alt="" className='bubble-img' />
            </div>
          </li>
        </ul>

        <div className='img__panel'>
          <img src={Image6} className="panel__img panel__img--left" alt="left-panel-img" />
          <img src={Image7} className="panel__img plants--img" alt="left-panel-img" />
        </div>

      </div>
    </div>


  )
}

export default Home