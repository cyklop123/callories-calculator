import {ChevronLeft,ChevronRight} from 'react-bootstrap-icons'
import Button from 'react-bootstrap/Button'

const DatePicker = ({clickLeft, clickRight, date}) => {

    return (
        <div className='text-center'>
            <Button variant="primary" onClick={clickLeft}>
                <ChevronLeft />
            </Button>

            <Button variant="primary" disabled className="m-1">
                {date}
            </Button>
            
            <Button variant="primary" onClick={clickRight}>
                <ChevronRight />
            </Button>
        </div>
    )
}

export default DatePicker