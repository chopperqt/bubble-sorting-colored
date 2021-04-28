import {useState, useEffect} from 'react';

import'./style.scss';

import {
    
} from '../../components'
import Circle from '../Circle';



const Interface = () => {

    const [countCircles, setCountCircles] = useState(10);
    const [colors,setCollors] = useState([]);
    const [isSorted, setIsSorted] = useState(false);
    const [increase, setIncrease] = useState(false);
    const [decrease, setDecrease] = useState(false);
    const [sortedBtn, setSortedBtn] = useState(false);
    const [clearBtn, setClearBtn] = useState(false);

    

    const generationColors = (number = 3) => {
        let min = 1;
        let max = 255;
        
        const createColor = () => {
            let color = [];

            for (let i = 0; i < 3; i++) {
                color.push(Math.round(min - 0.5 + Math.random() * (max - min + 1)));
            }

            return color;
        }

        for (let i = 0; i < number; i++) {
            let randomColor = Math.round(min - 0.5 + Math.random() * (max - min + 1)); //Генерация цветов от 0 до 255;
            setCollors(prev => [...prev, createColor()])
        }
    }

    const clearColors = () => {
        setCollors(prev => []);
        setIncrease(false);

        if (countCircles > 3) {
            setDecrease(false);
        }
    }

    const clickGeneration = () => {
        setIncrease(true);
        setDecrease(true);
        setSortedBtn(false);
        generationColors(countCircles);

    };

    const clickSort = async () => {
        setSortedBtn(true)
        setClearBtn(true);
        let newArray = colors.slice(0);
        let lists = [...document.querySelectorAll('.circle')].map((el,index) => ({
            el,
            index,
            number:parseInt(el.textContent, 10)
        }));

        for (let i = colors.length - 1; i > 0 ; i--) {
            for (let j = 0; j < i; j++) {
                if (lists[j + 1] !== undefined && lists[j].number > lists[j + 1].number) {
                    
                    setIncrease(true);
                    setDecrease(true);

                    let swap = newArray[j];
                    newArray[j] = newArray[j + 1];
                    newArray[j + 1] = swap;

                    await animationSwap (j ,j + 1,lists)

                    


                }
            }
        }
        lists = [...document.querySelectorAll('.circle')].map((el,index) => ({
            el,
            index,
            number:parseInt(el.textContent, 10)
        }));

        setClearBtn(false);
        return;
    }

    const animationSwap = (a, b,arr) => {
        const itemA = arr[a];
        const itemB = arr[b];

        itemA.index = a;
        itemB.index = b;

        arr[a] = itemB;
        arr[b] = itemA;
        
        itemA.el.style.left = `${itemB.index * 50}px`;
        itemA.el.style.transition = `0.5s ease-in-out`;

        itemB.el.style.left = `${itemA.index * 50}px`;
        itemB.el.style.transition = `0.5s ease-in-out`;

        return new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, 500)
        })
    }

    const interfaceCount =  {
        increaseCount() {
            setCountCircles(prev => prev + 1)
        },
        decreaseCount() {
            setCountCircles(prev => prev - 1)
        }
    }
    
    useEffect(() => {
        colors.length === 0 ? setSortedBtn(true) : setSortedBtn(false);

        console.log(colors)
    }, [colors])

    useEffect(() => {
        if (countCircles < 4) {
            setDecrease(true)
        }
        if (countCircles > 3 ) {
            setDecrease(false)
        }
    }, [countCircles])

    return (
        <section className="interface">
           <div className="interface-wrap">
                <h5>Кол-во окружностей</h5>
                <div className="interface-input">
                    <button disabled={decrease}  onClick={interfaceCount.decreaseCount}>-</button>
                    <input disabled={true} onChange={e => setCountCircles(e.target.value)} type="text" value={countCircles} name="circles-count" />
                    <button disabled={increase} onClick={interfaceCount.increaseCount}>+</button>
                </div>
                <div className="interface-wrap-btns">
                    {colors.length !== 0 ? 
                        <button disabled={clearBtn} onClick={clearColors}>Очистить</button>
                        : <button onClick={clickGeneration}>Генерировать</button>
                    }
                    
                    <button disabled={sortedBtn} onClick={() => clickSort(colors)}>Отсортировать</button>
                </div>
                
           </div>
           <div className="circles-wrap" style={{width: `${colors.length * 50 - 15}px`}}>
               {colors ? colors.map((item,index) => 
                    <Circle key={index} id={index} index={index} position={index === 0 ? 0 : index * 50} bg={item} />) 
                : null}
           </div>
        </section>
    );
}
 
export default Interface;