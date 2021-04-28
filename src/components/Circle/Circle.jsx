import './style.scss';

const Circle = ({id, bg, position,index}) => {
    return (
        <div id={`circle-${id}`} defaultValue={position} style={{background: `rgb(${bg},${bg},${bg})`, left: `${position}px`}} className="circle">
            
        </div>
    );
}
 
export default Circle;