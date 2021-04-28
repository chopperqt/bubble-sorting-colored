import './style.scss';

const Circle = ({id, bg, position,index}) => {
    return (
        <div id={`circle-${id}`} defaultValue={position} style={{color: `rgb(${bg[0]},${bg[1]},${bg[2]}`,background: `rgb(${bg[0]},${bg[1]},${bg[2]})`, left: `${position}px`}} className="circle">
            {/* {
                bg[0] > bg[1] ? `${'3'+bg[0]}` : bg[1] > bg[2] ? `${'2'+bg[1]}` : `${'1'+bg[2]}`
            } */}
            {bg[0]+bg[1]+bg[2]}
        </div>
    );
}
 
export default Circle;