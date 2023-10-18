

function Buttons ({onPrevious,onNext} ) {





    return (
        <>
        <button onClick={onPrevious}>vorige</button>
        <button onClick={onNext}>volgende</button>
        </>
    )
}

export default Buttons;
